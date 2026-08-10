import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarDay,
  FaChevronRight,
  FaClock,
  FaVideo,
} from "react-icons/fa";
import Swal from "sweetalert2";

import ApiUrl from "../../../../constants/ApiUrl";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";

import doctorImage from "../../../../assets/icons/doctor.png";
import "../../../../assets/css/todaysappointments.css";

export default function TodaysAppointments() {
  const navigate = useNavigate();
  const { token } = useDoctorAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

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

      if (response.ok) {
        const today = new Date().toISOString().split("T")[0];

        const todaysAppointments = (data.appointments || [])
          .filter((appointment) => appointment.appointment_date === today)
          .sort((a, b) => {
            return (
              new Date(`2000-01-01T${a.start_time}`) -
              new Date(`2000-01-01T${b.start_time}`)
            );
          });

        setAppointments(todaysAppointments);
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
        text: "Unable to load today's appointments.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time) => {
    if (!time) return "--";

    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

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

  const getProfileImage = (appointment) => {
    const image = appointment?.patient?.profile?.profile_image;

    if (!image) return doctorImage;

    if (image.startsWith("uploads/")) {
      return `${ApiUrl.IMAGE_BASE_URL}/${image.replace("uploads/", "")}`;
    }

    return `${ApiUrl.IMAGE_BASE_URL}/${image}`;
  };

  const totalAppointments = useMemo(() => appointments.length, [appointments]);
  return (
    <div className="dashboard-box todays-appointments-box">
      <div className="dashboard-box-header">
        <div>
          <h5>
            <FaCalendarDay className="me-2" />
            Today's Appointments
          </h5>

          <small>
            {totalAppointments} Appointment
            {totalAppointments !== 1 ? "s" : ""} Today
          </small>
        </div>

        <button
          className="todays-view-btn"
          onClick={() => navigate("/doctor/appointments")}
        >
          View All
          <FaChevronRight />
        </button>
      </div>

      {loading ? (
        <div className="todays-loading">Loading today's appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="todays-empty">
          <FaCalendarDay className="empty-icon" />

          <h6>No Appointments Today</h6>

          <p>
            You're all caught up. There are no appointments scheduled for today.
          </p>
        </div>
      ) : (
        <div className="todays-list">
          {appointments.slice(0, 5).map((appointment) => (
            <div key={appointment.id} className="todays-appointment-card">
              <div className="todays-left">
                <img
                  src={getProfileImage(appointment)}
                  alt={appointment.patient_fullname}
                  className="todays-avatar"
                  onError={(e) => {
                    e.target.src = doctorImage;
                  }}
                />

                <div className="todays-details">
                  <h6>{appointment.patient_fullname}</h6>

                  <small>{appointment.patient_age} years old</small>

                  <div className="todays-time">
                    <FaClock />

                    <span>
                      {formatTime(appointment.start_time)}

                      {appointment.end_time &&
                        ` - ${formatTime(appointment.end_time)}`}
                    </span>
                  </div>

                  {/* <div className="todays-purpose">
                    {appointment.purpose}
                  </div> */}
                </div>
              </div>

              <div className="todays-right">
                <span className={`todays-status ${appointment.status}`}>
                  {appointment.status}
                </span>
                {appointment.status === "confirmed" && (
                  <>
                    {canStartConsultation(appointment) ? (
                      <button
                        className="todays-join-btn"
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
                          ? "Join"
                          : appointment.video_call?.doctor_joined
                            ? "Resume"
                            : "Start"}
                      </button>
                    ) : (
                      <button className="todays-disabled-btn" disabled>
                        <FaClock />

                        {formatTime(appointment.start_time)}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
