import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaUser, FaVideo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import ApiUrl from "../../../../constants/ApiUrl";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";

export default function UpcomingAppointment() {
  const { token } = useDoctorAuth();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canStart, setCanStart] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");

    const date = new Date();

    date.setHours(Number(hour), Number(minute), 0);

    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // CHECK IF CONSULTATION CAN START

  const checkStartTime = (data) => {
    if (!data?.start_time || !data?.appointment_date) {
      return false;
    }

    const now = new Date();

    const startDateTime = new Date(
      `${data.appointment_date}T${data.start_time}`,
    );

    return now >= startDateTime;
  };

  const loadUpcomingAppointment = async () => {
    try {
      const response = await fetch(ApiUrl.GET_DOCTOR_APPOINTMENTS, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        const now = new Date();

        const upcoming = (data.appointments || [])

          .filter((item) => item.status === "confirmed")

          .filter((item) => {
            if (!item.start_time || !item.end_time) {
              return false;
            }

            const endDateTime = new Date(
              `${item.appointment_date}T${item.end_time}`,
            );

            return endDateTime >= now;
          })

          .sort((a, b) => {
            const dateA = new Date(`${a.appointment_date}T${a.start_time}`);

            const dateB = new Date(`${b.appointment_date}T${b.start_time}`);

            return dateA - dateB;
          });

        const nextAppointment = upcoming[0] || null;

        setAppointment(nextAppointment);

        setCanStart(checkStartTime(nextAppointment));
      }
    } catch (error) {
      console.log("Upcoming appointment error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUpcomingAppointment();

    const interval = setInterval(() => {
      loadUpcomingAppointment();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getProfileImage = () => {
    const image = appointment?.patient?.profile?.profile_image;

    if (!image) {
      return null;
    }

    const cleanImage = image.replace(/^uploads\//, "");

    return `${ApiUrl.IMAGE_BASE_URL}/${cleanImage}`;
  };

  if (loading) {
    return <div className="dashboard-box">Loading upcoming appointment...</div>;
  }

  return (
    <div className="dashboard-box upcoming-appointment">
      <div className="box-title">
        <h5>UPCOMING APPOINTMENT</h5>

        <button
          className="see-all-btn"
          onClick={() => navigate("/doctor/appointments")}
        >
          See All
        </button>
      </div>

      {!appointment ? (
        <div className="empty-dashboard">No upcoming appointments.</div>
      ) : (
        <div className="upcoming-card">
          <div className="consultation-badge">NEXT CONSULTATION</div>

          <div className="upcoming-header">
            <div className="appointment-avatar">
              {appointment?.patient?.profile?.profile_image ? (
                <img
                  src={getProfileImage()}
                  alt={appointment.patient_fullname}
                />
              ) : (
                <FaUser />
              )}
            </div>

            <div>
              <h4>{appointment.patient_fullname}</h4>

              <span>{appointment.patient_age} years old</span>
            </div>
          </div>

          <div className="upcoming-info">
            <div>
              <FaCalendarAlt />

              <span>{formatDate(appointment.appointment_date)}</span>
            </div>

            <div>
              <FaClock />

              <span>
                {formatTime(appointment.start_time)}

                {" - "}

                {formatTime(appointment.end_time)}
              </span>
            </div>
          </div>

          {canStart ? (
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
              Start Consultation
            </button>
          ) : (
            <button className="join-video-btn disabled" disabled>
              <FaClock />
              Available at {formatTime(appointment.start_time)}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
