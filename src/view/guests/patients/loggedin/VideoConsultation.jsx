import AgoraRTC from "agora-rtc-sdk-ng";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

import createAgoraClient from "../../../../services/agora";

import {
  createVideoCall,
  getVideoCall,
  getAgoraToken,
  startCall,
  leaveCall,
  endCall,
} from "../../../../services/videoCallService";

import {
  FaPhoneSlash,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaExpand,
  FaSyncAlt,
} from "react-icons/fa";

import { usePatientAuth } from "../../../../contexts/PatientAuthContext";

export default function VideoConsultation() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteContainerRef = useRef(null);
  const client = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { appointmentId } = useParams();
  const autoEndedRef = useRef(false);
  const warningShownRef = useRef({
    10: false,
    5: false,
    2: false,
  });

  const { token, patient } = usePatientAuth();

  const uid = patient?.id ? Number(patient.id) : null;
  const appointment = location.state?.appointment;

  const [localTracks, setLocalTracks] = useState([]);
  const [joined, setJoined] = useState(false);
  const [remoteJoined, setRemoteJoined] = useState(false);
  const [muted, setMuted] = useState(false);
  const toggleMute = async () => {
    if (!localTracksRef.current[0]) return;

    await localTracksRef.current[0].setEnabled(muted);

    setMuted(!muted);
  };

  const toggleCamera = async () => {
    if (!localTracksRef.current[1]) return;

    const newState = !cameraOn;

    await localTracksRef.current[1].setEnabled(newState);

    setCameraOn(newState);
  };
  const [cameraOn, setCameraOn] = useState(true);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [warning, setWarning] = useState("");

  const [loading, setLoading] = useState(true);

  const [videoCall, setVideoCall] = useState(null);

  const [channelName, setChannelName] = useState("");

  const [agoraToken, setAgoraToken] = useState("");

  const [appId, setAppId] = useState("");

  const initialized = useRef(false);

  const localTracksRef = useRef([]);

  // =========================
  // VIDEO CALL CONFIG
  // =========================

  const MIN_COMPLETED_MINUTES = 15;
  const WARNING_1_MINUTES = 5;
  const WARNING_2_MINUTES = 1;
  const GRACE_SECONDS = 10;
  const AUTO_END_CALL = true;
  const COMPLETE_ONLY_IF_TIME_REACHED = true;
  const TIMER_INTERVAL = 1000;
  const WARNING_DURATION = 5000;

  const switchCamera = async () => {
    try {
      if (localTracksRef.current[1]?.setDevice) {
        const devices = await AgoraRTC.getCameras();

        if (devices.length < 2) return;

        const current = localTracksRef.current[1].getTrackLabel?.() || "";

        const nextDevice = devices.find((d) => d.label !== current);

        if (nextDevice) {
          await localTracksRef.current[1].setDevice(nextDevice.deviceId);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toggleFullscreen = () => {
    if (!remoteContainerRef.current) return;

    if (!document.fullscreenElement) {
      // remoteContainerRef.current.requestFullscreen();
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    client.current = createAgoraClient();

    client.current.on("user-published", async (user, mediaType) => {
      console.log("USER PUBLISHED", user.uid, mediaType);

      await client.current.subscribe(user, mediaType);

      if (mediaType === "video") {
        if (remoteVideoRef.current) {
          user.videoTrack.play(remoteVideoRef.current);
        }
        setRemoteJoined(true);
      }

      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    });

    client.current.on("user-left", () => {
      setRemoteJoined(false);
    });

    return () => {
      if (client.current) {
        client.current.removeAllListeners();
        client.current.leave();
      }
    };
  }, []);

  const joinCall = async (appId, channel, token, agoraUid) => {
    try {
      console.log("BEFORE JOIN", {
        appId,
        channel,
        agoraUid,
        state: client.current.connectionState,
      });

      if (client.current.connectionState !== "DISCONNECTED") {
        await client.current.leave();
      }

      await client.current.join(appId, channel, token, agoraUid);

      console.log("JOINED SUCCESSFULLY", agoraUid);

      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();

      console.log("TRACKS CREATED");

      localTracksRef.current = tracks;
      setLocalTracks(tracks);

      await client.current.publish(tracks);

      console.log("TRACKS PUBLISHED");

      tracks[1].play(localVideoRef.current);

      setJoined(true);
    } catch (e) {
      console.error("JOIN ERROR", e);
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hrs, mins, secs].map((v) => String(v).padStart(2, "0")).join(":");
  };

  const getRemainingSeconds = () => {
    console.log("===== TIMER DEBUG =====");
    console.log("Appointment object:", appointment);

    if (!appointment?.appointment_date || !appointment?.end_time) {
      console.log("Missing appointment date/end time");
      return 0;
    }

    const [year, month, day] = appointment.appointment_date
      .substring(0, 10)
      .split("-")
      .map(Number);

    const [hour, minute, second] = appointment.end_time.split(":").map(Number);

    const end = new Date(year, month - 1, day, hour, minute, second);

    const now = new Date();

    console.log("appointment_date:", appointment.appointment_date);
    console.log("start_time:", appointment.start_time);
    console.log("end_time:", appointment.end_time);
    console.log("END:", end);
    console.log("NOW:", now);
    console.log("Difference (seconds):", Math.floor((end - now) / 1000));

    return Math.max(0, Math.floor((end - now) / 1000));
  };

  useEffect(() => {
    if (!joined) return;

    const updateTimer = async () => {
      const remaining = getRemainingSeconds();
      console.log("Timer Remaining:", remaining);

      setRemainingSeconds(remaining);

      const minutesLeft = Math.ceil(remaining / 60);

      // 10 minute warning
      if (minutesLeft <= 10 && !warningShownRef.current[10]) {
        warningShownRef.current[10] = true;

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "warning",
          title: "Consultation will end in 10 minutes.",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
        });
      }

      // 5 minute warning
      if (minutesLeft <= 5 && !warningShownRef.current[5]) {
        warningShownRef.current[5] = true;

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "warning",
          title: "Only 5 minutes remaining.",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
        });
      }

      // 2 minute warning
      if (minutesLeft <= 2 && !warningShownRef.current[2]) {
        warningShownRef.current[2] = true;

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "warning",
          title: "Only 2 minutes remaining.",
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
        });
      }

      // Timer finished
      if (remaining <= 0 && !autoEndedRef.current) {
        autoEndedRef.current = true;

        try {
          if (videoCall?.id) {
            await endCall(videoCall.id, token);
          }
        } catch (e) {
          console.error("Auto leave failed", e);
        }

        localTracksRef.current.forEach((track) => {
          track.stop();
          track.close();
        });

        if (client.current) {
          await client.current.leave();
        }

        setJoined(false);
        setRemoteJoined(false);

        await Swal.fire({
          icon: "info",
          title: "Consultation Ended",
          text: "The consultation has ended because the allotted time has expired.",
          confirmButtonColor: "#14361D",
        });
       redirectAfterConsultation();
      }
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [joined, appointment, videoCall]);

  const initializeCall = async () => {
    try {
      const callResponse = await getVideoCall(appointmentId, token);
      console.log("API appointment", callResponse.appointment);
      console.log("Location appointment", location.state?.appointment);
      console.log("CALL RESPONSE", callResponse);
      console.log("APPOINTMENT FROM API", callResponse.appointment);
      console.log("VIDEO CALL", callResponse.video_call);

      if (!callResponse.video_call) {
        throw new Error("Video room not found.");
      }

      const call = callResponse.video_call;

      setVideoCall(call);
      autoEndedRef.current = false;
      warningShownRef.current = {
        10: false,
        5: false,
        2: false,
      };

      const agora = await getAgoraToken(appointmentId, token);

      console.log("AGORA DATA", {
        appId: agora.app_id,
        channel: agora.channel_name,
        uid: agora.uid,
        token: agora.token,
      });

      if (!agora.token || !agora.app_id) {
        throw new Error(agora.message || "Failed to generate Agora token");
      }

      await startCall(call.id, token);

      await joinCall(agora.app_id, agora.channel_name, agora.token, agora.uid);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!appointmentId) return;

    if (initialized.current) return;

    initialized.current = true;

    initializeCall();
  }, [appointmentId]);

  useEffect(() => {
    return () => {
      localTracksRef.current.forEach((track) => {
        track.stop();
        track.close();
      });

      if (client.current) {
        client.current.leave();
      }
    };
  }, []);

  const redirectAfterConsultation = () => {
    if (patient) {
      navigate(`/patient/ratedoctor/${appointmentId}`, {
        state: {
          appointment,
        },
      });
    } else {
      navigate("/doctor/appointments");
    }
  };

  const leaveConsultation = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to leave this consultation?",
    );

    if (!confirmed) return;

    try {
      // inform backend first
      if (videoCall?.id) {
        await leaveCall(videoCall.id, token);
      }

      localTracksRef.current.forEach((track) => {
        track.stop();
        track.close();
      });

      await client.current.leave();

      setJoined(false);
      setRemoteJoined(false);

      redirectAfterConsultation();
    } catch (e) {
      console.error(e);
    }
  };

  const circleBtn = (bg) => ({
    width: 58,
    height: 58,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    background: bg,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    transition: ".25s",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#0f172a",
        overflow: "hidden",
      }}
    >
      <div
        ref={remoteContainerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#000",
        }}
      >
        {/* Remote Video */}
        <div
          ref={remoteVideoRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        />

        {/* Waiting Screen */}
        {!remoteJoined && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              background: "linear-gradient(180deg,#111827,#0f172a)",
              color: "#fff",
              zIndex: 5,
            }}
          >
            <div
              style={{
                fontSize: 70,
                marginBottom: 20,
              }}
            >
              👨‍⚕️
            </div>

            <h2
              style={{
                marginBottom: 10,
              }}
            >
              Waiting for Doctor
            </h2>

            <p
              style={{
                opacity: 0.75,
                textAlign: "center",
                maxWidth: 400,
              }}
            >
              Your consultation will begin automatically once your doctor joins
              the room.
            </p>
          </div>
        )}

        {/* ================= TIMER ================= */}

        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 999999,
            background: "rgba(15,23,42,.92)",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: 14,
            minWidth: 230,
            border:
              remainingSeconds <= 600
                ? "2px solid #ef4444"
                : "1px solid rgba(255,255,255,.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,.45)",
          }}
        >
          <div
            style={{
              fontSize: 12,
              opacity: 0.7,
              marginBottom: 5,
            }}
          >
            Consultation Remaining
          </div>

          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 2,
              color: remainingSeconds <= 600 ? "#ef4444" : "#22c55e",
            }}
          >
            {formatTime(remainingSeconds)}
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: 12,
              opacity: 0.8,
            }}
          >
            {remoteJoined ? "Doctor Connected" : "Waiting for Doctor"}
          </div>
        </div>

        {/* ================= LOCAL VIDEO ================= */}

        <div
          ref={localVideoRef}
          style={{
            position: "absolute",
            right: 20,
            bottom: 110,
            width: 190,
            height: 140,
            borderRadius: 14,
            overflow: "hidden",
            border: "2px solid #fff",
            background: "#333",
            zIndex: 999999,
            boxShadow: "0 10px 30px rgba(0,0,0,.5)",
          }}
        />

        {/* ================= CONTROLS ================= */}

        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 20px",
            borderRadius: 60,
            background: "rgba(15,23,42,.88)",
            backdropFilter: "blur(14px)",
            boxShadow: "0 12px 30px rgba(0,0,0,.45)",
            zIndex: 999999,
          }}
        >
          {/* Mute */}
          <button
            onClick={toggleMute}
            style={circleBtn(muted ? "#ff9800" : "#333")}
          >
            {muted ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>

          {/* Camera */}
          <button
            onClick={toggleCamera}
            style={circleBtn(cameraOn ? "#333" : "#ff9800")}
          >
            {cameraOn ? <FaVideo /> : <FaVideoSlash />}
          </button>

          {/* Switch Camera */}
          <button onClick={switchCamera} style={circleBtn("#333")}>
            <FaSyncAlt />
          </button>

          {/* Fullscreen */}
          <button onClick={toggleFullscreen} style={circleBtn("#333")}>
            <FaExpand />
          </button>

          {/* Leave */}
          <button onClick={leaveConsultation} style={circleBtn("#d32f2f")}>
            <FaPhoneSlash />
          </button>
        </div>
      </div>
    </div>
  );
}
