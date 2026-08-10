import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaVideo,
  FaTimesCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";

import "../../../../assets/css/appointments.css";

import ApiUrl from "../../../../constants/ApiUrl";
import { usePatientAuth } from "../../../../contexts/PatientAuthContext";

export default function Appointments() {
  const navigate = useNavigate();
  const { token } = usePatientAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  const formatTime = (time) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0);

    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const response = await fetch(ApiUrl.GET_PATIENT_APPOINTMENTS, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();
      console.log("Appointments:", data.appointments);

      if (response.ok) {
        setAppointments(data.appointments);
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Unable to load appointments.", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.status === activeTab,
  );

  const count = (status) =>
    appointments.filter((a) => a.status === status).length;

  const cancelAppointment = async (appointmentId) => {
    const { value: cancelReason } = await Swal.fire({
      title: "Cancel Appointment",
      input: "textarea",
      inputLabel: "Reason for cancellation (optional)",
      inputPlaceholder: "Tell us why you are cancelling this appointment...",
      showCancelButton: true,
      confirmButtonText: "Cancel Appointment",
      cancelButtonText: "Go Back",
      confirmButtonColor: "#14361D",
      cancelButtonColor: "#d33",
    });
    if (cancelReason === undefined) return;

    try {
      const response = await fetch(
        `${ApiUrl.CANCEL_APPOINTMENT}/${appointmentId}/cancel`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cancel_reason: cancelReason?.trim() || null,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Appointment Cancelled",
          text: data.message,
          confirmButtonColor: "#14361D",
        });

        loadAppointments();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to cancel appointment.",
      });
    }
  };

  const formatAppointmentDate = (date) => {
    const d = new Date(date);

    const day = d.getDate();

    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";

    const month = d.toLocaleString("en-US", {
      month: "long",
    });

    const year = d.getFullYear();

    return `${day}${suffix} ${month}, ${year}`;
  };

  useEffect(() => {
    loadAppointments();

    const interval = setInterval(() => {
      loadAppointments();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const canStartConsultation = (appointment) => {
    if (!appointment.start_time || !appointment.appointment_date) {
      return false;
    }

    const now = new Date();

    const startDateTime = new Date(
      `${appointment.appointment_date}T${appointment.start_time}`,
    );

    return now >= startDateTime;
  };

  return (
    <div className="appointments-page">
      <button className="doctor-back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>

      <h2>My Appointments</h2>

      <div className="appointment-tabs">
        <button
          className={activeTab === "pending" ? "active" : ""}
          onClick={() => setActiveTab("pending")}
        >
          Pending ({count("pending")})
        </button>

        <button
          className={activeTab === "confirmed" ? "active" : ""}
          onClick={() => setActiveTab("confirmed")}
        >
          Confirmed ({count("confirmed")})
        </button>

        <button
          className={activeTab === "completed" ? "active" : ""}
          onClick={() => setActiveTab("completed")}
        >
          Completed ({count("completed")})
        </button>

        <button
          className={activeTab === "cancelled" ? "active" : ""}
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled ({count("cancelled")})
        </button>
      </div>

      {loading ? (
        <div className="appointment-loading">Loading appointments...</div>
      ) : filteredAppointments.length === 0 ? (
        <div className="appointment-empty">
          No {activeTab} appointments found.
        </div>
      ) : (
        <div className="appointments-list">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-card-header">
                <div className="doctor-profile">
                  <img
                    src={
                      appointment.doctor?.profile?.profile_image
                        ? `${ApiUrl.IMAGE_BASE_URL}/${appointment.doctor.profile.profile_image.replace(
                            /^uploads\//,
                            "",
                          )}`
                        : "/default-doctor.png"
                    }
                    alt=""
                    className="appointment-image"
                  />

                  <div>
                    <h3>
                      Dr.{" "}
                      {appointment.doctor?.fullname
                        ?.replace(/^dr\.?\s*/i, "")
                        .trim()}
                    </h3>
                    <span>{appointment.doctor?.specialization}</span>
                  </div>
                </div>

                <div className={`appointment-status ${appointment.status}`}>
                  {appointment.status}
                </div>
              </div>

              <div className="appointment-body">
                <div className="appointment-item">
                  <FaCalendarAlt />
                  <div>
                    <small>Date</small>
                    <strong>
                      {formatAppointmentDate(appointment.appointment_date)}
                    </strong>
                  </div>
                </div>

                {(appointment.start_time || appointment.end_time) && (
                  <div className="appointment-item">
                    <FaCalendarAlt />

                    <div>
                      <small>Consultation Time</small>

                      <strong>
                        {appointment.start_time
                          ? formatTime(appointment.start_time)
                          : "--:--"}

                        {appointment.end_time &&
                          ` - ${formatTime(appointment.end_time)}`}
                      </strong>
                    </div>
                  </div>
                )}

                <div className="appointment-purpose">
                  <span>Purpose</span>
                  <p>{appointment.purpose}</p>
                </div>

                {appointment.status === "cancelled" && (
                  <div className="cancel-reason-box">
                    <div>
                      <span>Cancelled By</span>
                      <p>{appointment.cancelled_by || "Unknown"}</p>
                    </div>

                    <div>
                      <span>Cancellation Reason</span>
                      <p>
                        {appointment.cancel_reason
                          ? appointment.cancel_reason
                          : "No reason provided"}
                      </p>
                    </div>
                  </div>
                )}
                {appointment.status === "pending" && (
                  <button
                    className="cancel-appointment-btn"
                    onClick={() => cancelAppointment(appointment.id)}
                  >
                    <FaTimesCircle />
                    Cancel Appointment
                  </button>
                )}

                {appointment.status === "confirmed" && (
                  <>
                    {canStartConsultation(appointment) ? (
                      <button
                        className="join-video-btn"
                        onClick={() =>
                          navigate(`/patient/videocall/${appointment.id}`, {
                            state: {
                              appointment,
                            },
                          })
                        }
                      >
                        <FaVideo />

                        {appointment.video_call?.doctor_joined
                          ? "Join Video Consultation"
                          : appointment.video_call?.patient_joined
                            ? "Resume Video Consultation"
                            : "Start Video Consultation"}
                      </button>
                    ) : (
                      <button className="join-video-disabled-btn" disabled>
                        <FaVideo />
                        Available at {formatTime(appointment.start_time)}
                      </button>
                    )}
                  </>
                )}

                {appointment.status === "completed" && (
                  <button
                    className="rate-doctor-btn"
                    onClick={() =>
                      navigate(`/patient/ratedoctor/${appointment.id}`, {
                        state: {
                          appointment,
                        },
                      })
                    }
                  >
                    ⭐ Rate Doctor
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
