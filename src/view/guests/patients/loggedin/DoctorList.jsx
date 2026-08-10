import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaStar,
  FaBriefcase,
  FaLanguage,
  FaChevronRight,
  FaUserMd,
  FaVenusMars,
} from "react-icons/fa";

import "../../../../assets/css/doctorlist.css";

import ApiUrl from "../../../../constants/ApiUrl";

import doctorImage from "../../../../assets/icons/doctor.png";

export default function DoctorList() {
  const navigate = useNavigate();
  const location = useLocation();

  const specializationId = location.state?.specializationId;
  const specializationName = location.state?.specialization || "Doctors";

  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (!specializationId) {
      navigate(-1);
      return;
    }

    fetch(`${ApiUrl.GET_DOCTORS_BY_SPECIALIZATION}/${specializationId}/doctors`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.doctors);
        if (data.success) {
          setDoctors(data.doctors);
          setCategory(data.specialization);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [specializationId, navigate]);

  if (loading) {
    return (
      <div className="doctor-list-page loading-page">
        <h3>Loading Doctors...</h3>
      </div>
    );
  }

  return (
    <div className="doctor-list-page">
      {/* Header */}

      <div className="doctor-list-header">
        <button className="doctor-back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <div>
          <h2>{category?.name || specializationName}</h2>

          <span>
            {doctors.length} Doctor
            {doctors.length !== 1 ? "s" : ""} Available
          </span>
        </div>
      </div>

      {/* Empty State */}

      {doctors.length === 0 ? (
        <div className="doctor-empty-state">
          <FaUserMd />

          <h3>No Doctors Found</h3>

          <p>
            There are currently no doctors registered under{" "}
            <strong>{specializationName}</strong>.
          </p>
        </div>
      ) : (
        <div className="doctor-list-container">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="doctor-card"
              onClick={() =>
                navigate("/patient/doctordetails", {
                  state: { doctor },
                })
              }
            >
              {/* Top Section */}

              <div className="doctor-card-top">
                <div>
                  <img
                    src={
                      doctor.profile?.profile_image
                        ? `${ApiUrl.IMAGE_BASE_URL}/${doctor.profile.profile_image.replace(
                            "uploads/",
                            "",
                          )}`
                        : doctorImage
                    }
                    alt={doctor.fullname}
                    className="doctor-image"
                  />

                  {doctor.profile?.gender && (
                    <div className="doctor-stat">
                  

                      <div>
                      

                        <strong>
                          {doctor.profile.gender.charAt(0).toUpperCase() +
                            doctor.profile.gender.slice(1)}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>

                <div className="doctor-main-details">
                  <div className="doctor-name-row">
                    <h3>
                      {doctor.fullname?.toLowerCase().startsWith("dr")
                        ? doctor.fullname
                        : `Dr. ${doctor.fullname}`}
                    </h3>

                    {doctor.profile?.rating && (
                      <div className="doctor-rating">
                        <FaStar />

                        <span>{doctor.profile.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className="doctor-rating">
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={
                            star <=
                            Math.round(Number(doctor.profile?.rating || 4.5))
                              ? "filled-star"
                              : "empty-star"
                          }
                        />
                      ))}
                    </div>

                    <span>({doctor.profile?.rating || "4.5"})</span>
                  </div>

                  <span className="doctor-specialization">
                    {doctor.specialization}
                  </span>

                  {(doctor.profile?.city || doctor.profile?.state) && (
                    <div className="doctor-info-row">
                      <FaMapMarkerAlt />

                      <span>
                        {doctor.profile?.city}

                        {doctor.profile?.city && doctor.profile?.state && ", "}

                        {doctor.profile?.state}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}

              <div className="doctor-card-middle">
                {doctor.profile?.experience && (
                  <div className="doctor-stat">
                    <FaBriefcase />

                    <div>
                      <small>Experience</small>

                      <strong>{doctor.profile.experience} yrs</strong>
                    </div>
                  </div>
                )}

                {doctor.profile?.pref_language && (
                  <div className="doctor-stat">
                    <FaLanguage />

                    <div>
                      <small>Language</small>

                      <strong>{doctor.profile.pref_language}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}

              <div className="doctor-card-footer">
                <button
                  className="view-profile-btn"
                  onClick={(e) => {
                    e.stopPropagation();

                    navigate("/patient/doctordetails", {
                      state: { doctor },
                    });
                  }}
                >
                  View Profile
                  <FaChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
