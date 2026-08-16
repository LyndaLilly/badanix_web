import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaArrowRight,
  FaVideo,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import ApiUrl from "../../../../constants/ApiUrl";
import { usePatientAuth } from "../../../../contexts/PatientAuthContext";
import "../../../../assets/css/upcomingappointment.css"

export default function UpcomingAppointment() {
  const { token } = usePatientAuth();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [canJoin, setCanJoin] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";

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

  const checkJoinTime = (data) => {
    if (!data?.start_time || !data?.appointment_date) {
      return false;
    }

    const now = new Date();

    const startDateTime = new Date(
      `${data.appointment_date}T${data.start_time}`,
    );

    return now >= startDateTime;
  };

  const getDoctorImage = () => {
    const image = appointment?.doctor?.profile?.profile_image;

    if (!image) {
      return null;
    }

    const cleanImage = image.replace(/^uploads\//, "");

    return `${ApiUrl.IMAGE_BASE_URL}/${cleanImage}`;
  };

  const loadUpcomingAppointment = async () => {
    try {
      const response = await fetch(ApiUrl.GET_PATIENT_APPOINTMENTS, {
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
            if (!item.appointment_date || !item.start_time || !item.end_time) {
              return false;
            }

            const end = new Date(`${item.appointment_date}T${item.end_time}`);

            return end >= now;
          })

          .sort((a, b) => {
            const first = new Date(`${a.appointment_date}T${a.start_time}`);

            const second = new Date(`${b.appointment_date}T${b.start_time}`);

            return first - second;
          });

        const nextAppointment = upcoming[0] || null;

        setAppointment(nextAppointment);

        setCanJoin(checkJoinTime(nextAppointment));
      }
    } catch (error) {
      console.log("Patient upcoming appointment error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUpcomingAppointment();

    const interval = setInterval(loadUpcomingAppointment, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="dashboard-box">Loading upcoming appointment...</div>;
  }

  return (
    <div className="dashboard-box upcoming-appointment">
      <div className="box-title">
        <h5>UPCOMING APPOINTMENT</h5>

        <Link to="/patient/appointments" className="see-all-btn">
          See All
          <FaArrowRight />
        </Link>
      </div>

      {!appointment ? (
        <div className="empty-dashboard">No upcoming appointments.</div>
      ) : (
        <div className="upcoming-card">
          {/* <div className="consultation-badge">NEXT CONSULTATION</div> */}

          <div className="upcoming-header">
            <div className="appointment-avatar">
              {getDoctorImage() ? (
                <img src={getDoctorImage()} alt="Doctor" />
              ) : (
                <FaUserMd />
              )}
            </div>

            <div>
              <h4>{appointment?.doctor?.fullname || "Doctor"}</h4>

              <span>
                {appointment?.doctor?.specialization || "Medical Specialist"}
              </span>
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

          {canJoin ? (
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
              Join Video Consultation
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
