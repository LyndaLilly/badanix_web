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
  const { value: formValues } = await Swal.fire({
    title: "Cancel Appointment",

    html: `
      <div style="text-align: left;">
        <p style="
          margin: 0 0 18px;
          color: #666;
          font-size: 14px;
          line-height: 1.5;
        ">
          Please tell us why you want to cancel this appointment.
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
          id="cancel-reason-select"
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
          <option value="">-- Select a cancellation reason --</option>

          <option value="I no longer need the appointment">
            I no longer need the appointment
          </option>

          <option value="I booked the appointment by mistake">
            I booked the appointment by mistake
          </option>

          <option value="I found another healthcare provider">
            I found another healthcare provider
          </option>

          <option value="The appointment date is no longer convenient">
            The appointment date is no longer convenient
          </option>

          <option value="The appointment time is no longer convenient">
            The appointment time is no longer convenient
          </option>

          <option value="I have a scheduling conflict">
            I have a scheduling conflict
          </option>

          <option value="My health issue has improved">
            My health issue has improved
          </option>

          <option value="I want to reschedule instead">
            I want to reschedule instead
          </option>

          <option value="other">
            Other
          </option>
        </select>

        <div 
          id="other-reason-container"
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
            id="other-cancel-reason"
            class="swal2-textarea"
            placeholder="Please type your reason for cancelling..."
            style="
              display: block;
              width: 100%;
              min-height: 100px;
              margin: 0;
              padding: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              resize: vertical;
            "
          ></textarea>
        </div>
      </div>
    `,

    showCancelButton: true,

    confirmButtonText: "Yes, Cancel Appointment",
    cancelButtonText: "Go Back",

    confirmButtonColor: "#14361D",
    cancelButtonColor: "#d33",

    focusConfirm: false,

    didOpen: () => {
      const select = document.getElementById("cancel-reason-select");
      const otherContainer = document.getElementById(
        "other-reason-container",
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
        .getElementById("cancel-reason-select")
        .value.trim();

      const otherReason = document
        .getElementById("other-cancel-reason")
        ?.value.trim();

      // Patient must select a reason
      if (!selectedReason) {
        Swal.showValidationMessage(
          "Please select a reason for cancelling the appointment.",
        );
        return false;
      }

      // If Other is selected, typing a reason is compulsory
      if (selectedReason === "other") {
        if (!otherReason) {
          Swal.showValidationMessage(
            "Please type your reason for cancelling the appointment.",
          );
          return false;
        }

        return otherReason;
      }

      // Return selected dropdown reason
      return selectedReason;
    },
  });

  // User clicked Go Back or closed the modal
  if (!formValues) return;

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
          cancel_reason: formValues,
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      await Swal.fire({
        icon: "success",
        title: "Appointment Cancelled",
        text: data.message || "Your appointment has been cancelled.",
        confirmButtonColor: "#14361D",
      });

      loadAppointments();
    } else {
      Swal.fire({
        icon: "error",
        title: "Unable to Cancel",
        text: data.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#14361D",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Unable to cancel appointment. Please try again.",
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
