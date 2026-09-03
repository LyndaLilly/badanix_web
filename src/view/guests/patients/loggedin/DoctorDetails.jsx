import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaStar,
  FaStarHalfAlt,
  FaMapMarkerAlt,
  FaBriefcase,
  FaLanguage,
  FaPhone,
  FaIdCard,
  FaCheck,
} from "react-icons/fa";

import "../../../../assets/css/doctordetails.css";

import ApiUrl from "../../../../constants/ApiUrl";
import doctorImage from "../../../../assets/icons/doctor.png";

function DoctorCalendarAvailable({ availabilities }) {
  const availableDates =
    availabilities?.map((item) => item.available_date.split("T")[0]) || [];

  // Get months that contain available dates
  const availableMonths = [
    ...new Set(
      availableDates.map((date) => {
        const [year, month] = date.split("-").map(Number);

        return `${year}-${month - 1}`;
      }),
    ),
  ].sort((a, b) => {
    const [ay, am] = a.split("-").map(Number);
    const [by, bm] = b.split("-").map(Number);

    return ay === by ? am - bm : ay - by;
  });

  const [currentMonth, setCurrentMonth] = useState(() => {
    if (availableDates.length > 0) {
      const [year, month] = availableDates[0].split("-").map(Number);

      return new Date(year, month - 1, 1);
    }

    return new Date();
  });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const previousMonth = () => {
    const currentKey = `${year}-${month}`;

    const currentIndex = availableMonths.indexOf(currentKey);

    if (currentIndex > 0) {
      const [y, m] = availableMonths[currentIndex - 1].split("-").map(Number);

      setCurrentMonth(new Date(y, m, 1));
    }
  };

  const nextMonth = () => {
    const currentKey = `${year}-${month}`;

    const currentIndex = availableMonths.indexOf(currentKey);

    if (currentIndex < availableMonths.length - 1) {
      const [y, m] = availableMonths[currentIndex + 1].split("-").map(Number);

      setCurrentMonth(new Date(y, m, 1));
    }
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button onClick={previousMonth}>←</button>

        <h3>
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <button onClick={nextMonth}>→</button>
      </div>

      <div className="calendar-week">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

     <div className="calendar-grid2">
  {calendarDays.map((day, index) => {
    if (!day) {
      return <div key={index} className="empty-day" />;
    }

    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const available = availableDates.includes(dateString);

    return (
      <div
        key={`${year}-${month}-${day}-${index}`}
        className={
          available
            ? "calendar-day available"
            : "calendar-day unavailable"
        }
      >
        {day}
      </div>
    );
  })}
</div>

{/* Calendar Legend */}
<div className="calendar-legend">
  <div className="calendar-legend-item">
    <span className="legend-dot available-dot"></span>
    <span>Available</span>
  </div>

  <div className="calendar-legend-item">
    <span className="legend-dot unavailable-dot"></span>
    <span>Unavailable</span>
  </div>
</div>
    </div>
  );
}

export default function DoctorDetails() {
  const navigate = useNavigate();

  const location = useLocation();

  const [showFullAbout, setShowFullAbout] = useState(false);

  const doctor = location.state?.doctor;
  const rating = Number(doctor.average_rating || 0);

  console.log("Doctor:", doctor);
  console.log("Doctor availabilities:", doctor?.availabilities);

  if (!doctor) {
    return (
      <div className="doctor-details-page">
        <h3>No Doctor Information Found</h3>
      </div>
    );
  }

  const profile = doctor.profile;

  const image = profile?.profile_image
    ? `${ApiUrl.IMAGE_BASE_URL}/${profile.profile_image.replace(
        "uploads/",
        "",
      )}`
    : doctorImage;

  return (
    <div className="doctor-details-page">
      <button className="doctor-back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>

      <div className="doctor-profile-card">
        <img
          src={image}
          className="doctor-profile-image"
          alt={doctor.fullname}
        />

        <div className="doctor-profile-info">
          <h1 className="doctor-name-with-verification">
            <span>
              {doctor.fullname?.toLowerCase().startsWith("dr")
                ? doctor.fullname
                : `Dr. ${doctor.fullname}`}
            </span>

            {doctor.can_book && (
              <span
                className="doctor-verified-badge"
                title="Verified Doctor"
                aria-label="Verified Doctor"
              >
                <FaCheck />
              </span>
            )}
          </h1>

          <h3>{doctor.specialization}</h3>

          <div className="doctor-stars">
            {[1, 2, 3, 4, 5].map((star) => {
              if (rating >= star) {
                return <FaStar key={star} className="active-star" />;
              }

              if (rating >= star - 0.5) {
                return <FaStarHalfAlt key={star} className="active-star" />;
              }

              return <FaStar key={star} className="inactive-star" />;
            })}

            <span>({rating.toFixed(1)})</span>
          </div>

          <div className="doctor-location">
            <FaMapMarkerAlt />
            {profile?.city}, {profile?.state}
          </div>
        </div>
      </div>

      <div className="doctor-section">
        <h2>About Doctor</h2>

        {profile?.about ? (
          <>
            <p>
              {showFullAbout
                ? profile.about
                : profile.about.length > 500
                  ? `${profile.about.substring(0, 500)}...`
                  : profile.about}
            </p>

            {profile.about.length > 500 && (
              <p
                className="show-more-btn btn btn-primary text-white"
                onClick={() => setShowFullAbout(!showFullAbout)}
                style={{
                  marginTop: "10px",
                  textAlign: "justify",
                  width: "fit-content",
                  cursor: "pointer",
                }}
              >
                {showFullAbout ? "Show Less" : "Show More"}
              </p>
            )}
          </>
        ) : (
          <p>No information available</p>
        )}
      </div>

      <div className="doctor-info-grid">
        <div>
          <FaBriefcase />

          <span>Experience</span>

          <strong>{profile?.experience}</strong>
        </div>

        <div>
          <FaLanguage />

          <span>Language</span>

          <strong>{profile?.pref_language}</strong>
        </div>
      </div>

      <div className="doctor-section">
        <h2>Available Dates</h2>

        <DoctorCalendarAvailable availabilities={doctor.availabilities} />
      </div>

      <button
        className="book-btn"
        onClick={() =>
          navigate("/patient/bookappointment", {
            state: {
              doctor,
            },
          })
        }
      >
        Book{" "}
        {doctor.fullname?.toLowerCase().startsWith("dr")
          ? doctor.fullname
          : `Dr. ${doctor.fullname}`}
      </button>
    </div>
  );
}
