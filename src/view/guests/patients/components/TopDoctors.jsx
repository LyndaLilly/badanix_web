import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaUserMd,
  FaStar,
  FaCalendarCheck,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import ApiUrl from "../../../../constants/ApiUrl";
import "../../../../assets/css/topdoctors.css";

export default function TopDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopDoctors();
  }, []);

  const fetchTopDoctors = async () => {
    try {
      const response = await fetch(ApiUrl.GET_TOP_RATED_DOCTORS);
      const data = await response.json();

      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.error("Error fetching top doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDoctorImage = (doctor) => {
    if (!doctor?.profile?.profile_image) {
      return null;
    }

    return `${ApiUrl.IMAGE_BASE_URL}/${doctor.profile.profile_image.replace(
      /^uploads\//,
      "",
    )}`;
  };

  return (
    <div className="dashboard-box top-doctors-widget">
      {/* HEADER */}
      <div className="top-doctors-header">
        <div className="top-doctors-title">
          <h5>Top E-Specialists</h5>
          <small>Highest rated doctors on BADANIX</small>
        </div>

        <Link to="/patient/doctors" className="top-doctors-view-all">
          View All
          <FaArrowRight />
        </Link>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="top-doctors-loading">
          <div
            className="spinner-border spinner-border-sm text-success"
            role="status"
          />

          <div>Loading specialists...</div>
        </div>
      ) : doctors.length === 0 ? (
        /* EMPTY */
        <div className="top-doctors-empty">
          <div className="top-doctors-empty-icon">
            <FaUserMd />
          </div>

          <h6>No Top Specialists Yet</h6>

          <p>
            Doctors will appear here after receiving patient ratings.
          </p>
        </div>
      ) : (
        <>
          {/* ==========================================
              DESKTOP TABLE
          ========================================== */}

          <div className="top-doctors-desktop">
            <table className="doctor-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Specialty</th>
                  <th>Rating</th>
                  <th>Reviews</th>
                  <th>Book</th>
                </tr>
              </thead>

              <tbody>
                {doctors.map((doctor) => {
                  const profileImage = getDoctorImage(doctor);

                  return (
                    <tr key={doctor.id}>
                      <td>
                        <div className="doctor-profile">
                          <div className="doctor-avatar">
                            {profileImage ? (
                              <img
                                src={profileImage}
                                alt={doctor.fullname}
                              />
                            ) : (
                              <FaUserMd />
                            )}
                          </div>

                          <div className="doctor-info">
                            <h6>{doctor.fullname}</h6>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="doctor-specialization">
                          {doctor.specialization ||
                            "General Practitioner"}
                        </span>
                      </td>

                      <td>
                        <div className="doctor-rating">
                          <FaStar />
                          <span>
                            {Number(
                              doctor.average_rating || 0,
                            ).toFixed(1)}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className="review-count">
                          {doctor.rating_count || 0}
                        </span>
                      </td>

                      <td>
                        <Link
                          to="/patient/bookappointment"
                          state={{ doctor }}
                          className="doctor-book-btn"
                        >
                          <FaCalendarCheck />
                          <span>Book</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ==========================================
              MOBILE CARDS
          ========================================== */}

          <div className="top-doctors-mobile">
            {doctors.map((doctor) => {
              const profileImage = getDoctorImage(doctor);

              return (
                <div className="doctor-mobile-card" key={doctor.id}>
                  {/* TOP */}
                  <div className="doctor-mobile-top">
                    <div className="doctor-profile">
                      <div className="doctor-avatar">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt={doctor.fullname}
                          />
                        ) : (
                          <FaUserMd />
                        )}
                      </div>

                      <div className="doctor-info">
                        <h6>{doctor.fullname}</h6>

                        <span>
                          {doctor.specialization ||
                            "General Practitioner"}
                        </span>
                      </div>
                    </div>

                    {/* RATING */}
                    <div className="doctor-mobile-rating">
                      <FaStar />

                      <span>
                        {Number(
                          doctor.average_rating || 0,
                        ).toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* BOTTOM */}
                  <div className="doctor-mobile-bottom">
                    <div className="doctor-mobile-reviews">
                      <span>Reviews</span>

                      <strong>
                        {doctor.rating_count || 0}
                      </strong>
                    </div>

                    <Link
                      to="/patient/bookappointment"
                      state={{ doctor }}
                      className="doctor-book-btn"
                    >
                      <FaCalendarCheck />
                      <span>Book Appointment</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}