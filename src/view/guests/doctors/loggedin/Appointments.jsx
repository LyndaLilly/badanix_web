import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaVideo,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";
import Swal from "sweetalert2";

import "../../../../assets/css/appointments.css";

import ApiUrl from "../../../../constants/ApiUrl";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";
import PatientIcon from "../../../../assets/icons/patient.png";

export default function Appointments() {
  const navigate = useNavigate();
  const { token } = useDoctorAuth();

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
      const response = await fetch(ApiUrl.GET_DOCTOR_APPOINTMENTS, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();
      console.log("Appointments:", data.appointments);

      if (response.ok) {
        setAppointments(data.appointments || []);
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
        text: "Unable to load appointments.",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.status === activeTab,
  );

  const count = (status) =>
    appointments.filter((a) => a.status === status).length;

  const confirmAppointment = async (appointmentId) => {
    const START_HOUR = 6;
    const END_HOUR = 22;
    const SLOT_MINUTES = 30;

    const timeOptions = {};

    for (let hour = START_HOUR; hour < END_HOUR; hour++) {
      for (let minute = 0; minute < 60; minute += SLOT_MINUTES) {
        const value = `${String(hour).padStart(2, "0")}:${String(
          minute,
        ).padStart(2, "0")}`;

        const display = new Date(`2000-01-01T${value}:00`).toLocaleTimeString(
          [],
          {
            hour: "numeric",
            minute: "2-digit",
          },
        );

        timeOptions[value] = display;
      }
    }

    const { value: startTime } = await Swal.fire({
      title: "Select Consultation Time",
      input: "select",
      inputOptions: timeOptions,
      inputPlaceholder: "Choose a time",
      showCancelButton: true,
      confirmButtonText: "Confirm Appointment",
      confirmButtonColor: "#14361D",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "Please select a consultation time.";
        }
      },
    });

    if (!startTime) return;

    try {
      const response = await fetch(
        `${ApiUrl.CONFIRM_DOCTOR_APPOINTMENT}/${appointmentId}/confirm`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start_time: startTime,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Appointment Confirmed",
          html: `
          <div style="font-size:16px">
            <b>Consultation Time</b><br><br>
            <span style="font-size:18px;color:#14361D">
              ${data.appointment.start_time} - ${data.appointment.end_time}
            </span>
          </div>
        `,
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
        text: "Unable to confirm appointment.",
      });
    }
  };

  const rejectAppointment = async (appointmentId) => {
    const { value: rejectionReason } = await Swal.fire({
      title: "Reject Appointment",

      html: `
      <div style="text-align: left;">
        <p style="
          margin: 0 0 18px;
          color: #666;
          font-size: 14px;
          line-height: 1.5;
        ">
          Please tell the patient why you are unable to accept this appointment.
        </p>

        <label style="
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #14361D;
        ">
          Select a reason <span style="color: #d33;">*</span>
        </label>

        <select 
          id="rejection-reason-select"
          class="swal2-select"
          style="
            display: block;
            width: 100%;
            margin: 0;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
          "
        >
          <option value="">-- Select a rejection reason --</option>

          <option value="I am unavailable on the requested date">
            I am unavailable on the requested date
          </option>

          <option value="I am unavailable at the requested time">
            I am unavailable at the requested time
          </option>

          <option value="I have a scheduling conflict">
            I have a scheduling conflict
          </option>

          <option value="The appointment time is no longer available">
            The appointment time is no longer available
          </option>

          <option value="The appointment is outside my area of practice">
            The appointment is outside my area of practice
          </option>

          <option value="I am unable to provide the requested consultation">
            I am unable to provide the requested consultation
          </option>

          <option value="I need the patient to select another available time">
            I need the patient to select another available time
          </option>

          <option value="other">
            Other
          </option>
        </select>

        <div 
          id="other-rejection-reason-container"
          style="display: none; margin-top: 16px;"
        >
          <label style="
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #14361D;
          ">
            Enter your reason <span style="color: #d33;">*</span>
          </label>

          <textarea
            id="other-rejection-reason"
            class="swal2-textarea"
            placeholder="Please type your reason for rejecting this appointment..."
            style="
              display: block;
              width: 100%;
              min-height: 100px;
              margin: 0;
              padding: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              resize: vertical;
              box-sizing: border-box;
            "
          ></textarea>
        </div>
      </div>
    `,

      showCancelButton: true,

      confirmButtonText: "Reject Appointment",
      cancelButtonText: "Cancel",

      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#14361D",

      focusConfirm: false,

      didOpen: () => {
        const select = document.getElementById("rejection-reason-select");

        const otherContainer = document.getElementById(
          "other-rejection-reason-container",
        );

        select.addEventListener("change", () => {
          if (select.value === "other") {
            otherContainer.style.display = "block";
          } else {
            otherContainer.style.display = "none";
          }
        });
      },

      preConfirm: () => {
        const selectedReason = document
          .getElementById("rejection-reason-select")
          .value.trim();

        const otherReason = document
          .getElementById("other-rejection-reason")
          ?.value.trim();

        // Doctor must select a reason
        if (!selectedReason) {
          Swal.showValidationMessage(
            "Please select a reason for rejecting the appointment.",
          );

          return false;
        }

        // If Other is selected, doctor must provide a reason
        if (selectedReason === "other") {
          if (!otherReason) {
            Swal.showValidationMessage(
              "Please type your reason for rejecting the appointment.",
            );

            return false;
          }

          return otherReason;
        }

        // Return selected reason
        return selectedReason;
      },
    });

    // Doctor clicked Cancel or closed the modal
    if (!rejectionReason) return;

    try {
      const response = await fetch(
        `${ApiUrl.REJECT_DOCTOR_APPOINTMENT}/${appointmentId}/reject`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            rejection_reason: rejectionReason,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Appointment Rejected",
          text:
            data.message || "The appointment has been rejected successfully.",
          confirmButtonColor: "#14361D",
        });

        loadAppointments();
      } else {
        Swal.fire({
          icon: "error",
          title: "Unable to Reject",
          text: data.message || "Something went wrong. Please try again.",
          confirmButtonColor: "#14361D",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to reject appointment. Please try again.",
        confirmButtonColor: "#14361D",
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
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button className="doctor-back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <h2>Patient Appointments</h2>
      </div>

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
          className={activeTab === "rejected" ? "active" : ""}
          onClick={() => setActiveTab("rejected")}
        >
          Rejected ({count("rejected")})
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
                  <div className="appointment-avatar">
                    <img
                      src={
                        appointment.patient?.profile?.profile_image
                          ? `${ApiUrl.IMAGE_BASE_URL}/${appointment.patient.profile.profile_image.replace(/^uploads\//, "")}`
                          : PatientIcon
                      }
                      alt={appointment.patient_fullname || "Patient"}
                      onError={(e) => {
                        console.error(
                          "Patient profile image failed:",
                          e.currentTarget.src,
                        );

                        e.currentTarget.src = PatientIcon;
                      }}
                    />
                  </div>

                  <div>
                    <h3>{appointment.patient_fullname}</h3>

                    <span>{appointment.patient_age} years old</span>
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
                    <small>Appointment Date</small>

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

                {appointment.status === "rejected" && (
                  <div className="cancel-reason-box">
                    <span>Rejection Reason</span>

                    <p>
                      {appointment.rejection_reason || "No reason provided"}
                    </p>
                  </div>
                )}

                {appointment.status === "pending" && (
                  <div className="appointment-action-buttons">
                    <button
                      className="confirm-appointment-btn"
                      onClick={() => confirmAppointment(appointment.id)}
                    >
                      <FaCheckCircle />
                      <div>
                        <small>Accept</small>
                      </div>
                    </button>

                    <button
                      className="reject-appointment-btn"
                      onClick={() => rejectAppointment(appointment.id)}
                    >
                      <FaTimesCircle />
                      <div>
                        <span>Reject</span>
                      </div>
                    </button>
                  </div>
                )}

                {appointment.status === "confirmed" && (
                  <div className="appointment-action-buttons">
                    <button
                      className="patient-record-btn"
                      onClick={() =>
                        navigate(`/doctor/patientnotes/${appointment.id}`)
                      }
                    >
                      <FaUser />
                      Patient Record
                    </button>

                    {canStartConsultation(appointment) ? (
                      <button
                        className="join-video-btn"
                        onClick={() =>
                          navigate(`/doctor/videocall/${appointment.id}`, {
                            state: {
                              appointment,
                            },
                          })
                        }
                      >
                        <FaVideo />

                        {appointment.video_call?.patient_joined
                          ? "Join Video Consultation"
                          : appointment.video_call?.doctor_joined
                            ? "Resume Video Consultation"
                            : "Start Video Consultation"}
                      </button>
                    ) : (
                      <button className="join-video-disabled-btn" disabled>
                        <FaVideo />
                        Available at {formatTime(appointment.start_time)}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
