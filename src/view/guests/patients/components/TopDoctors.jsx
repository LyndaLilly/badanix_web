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

  return (
    <div className="dashboard-box top-doctors-widget">
      <div className="dashboard-box-header top-doctors-header">
        <div>
          <h5>Top E-Specialists</h5>
          <small>Highest rated doctors on BADANIX</small>
        </div>

        <Link to="/patient/doctors" className="top-doctors-view-all">
          View All
          <FaArrowRight />
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div
            className="spinner-border spinner-border-sm text-success"
            role="status"
          ></div>

          <div className="mt-2 small text-muted">Loading specialists...</div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table doctor-table align-middle mb-0">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialty</th>
                <th>Rating</th>
                <th>Reviews</th>
                <th className="text-end">Book</th>
              </tr>
            </thead>

            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doctor) => {
                  const profileImage = doctor.profile?.profile_image
                    ? `${ApiUrl.IMAGE_BASE_URL}/${doctor.profile.profile_image.replace(
                        /^uploads\//,
                        "",
                      )}`
                    : null;

                  return (
                    <tr key={doctor.id}>
                      <td>
                        <div className="doctor-profile">
                          <div className="doctor-avatar">
                            {profileImage ? (
                              <img src={profileImage} alt={doctor.fullname} />
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
                          {doctor.specialization}
                        </span>
                      </td>

                      <td>
                        <div className="doctor-rating">
                          <FaStar />

                          <span>
                            {Number(doctor.average_rating || 0).toFixed(1)}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className="review-count">
                          {doctor.rating_count || 0}
                        </span>
                      </td>

                      <td className="text-end">
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
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <FaUserMd size={34} className="text-muted mb-2" />

                    <div className="fw-semibold">No Top Specialists Yet</div>

                    <small className="text-muted">
                      Doctors will appear here after receiving patient ratings.
                    </small>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
