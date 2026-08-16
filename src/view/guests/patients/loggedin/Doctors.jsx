import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUserMd, FaSpinner, FaStar } from "react-icons/fa";

import "../../../../assets/css/doctorslist.css";

import ApiUrl from "../../../../constants/ApiUrl";
import doctorImage from "../../../../assets/icons/doctor.png";

export default function Doctors() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");

  useEffect(() => {
    fetchDoctors();
  }, []);

  /*
  ==========================================================
  FETCH DOCTORS
  ==========================================================
  */

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const response = await fetch(ApiUrl.GET_ALL_DOCTORS);

      const data = await response.json();

      if (data.success) {
        console.log(data.doctors);
        setDoctors(data.doctors || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /*
  ==========================================================
  SPECIALIZATIONS
  ==========================================================
  */

  const specializations = useMemo(() => {
    return [
      "All",
      ...new Set(
        doctors.map((doctor) => doctor.specialization).filter(Boolean),
      ),
    ];
  }, [doctors]);

  /*
  ==========================================================
  FILTER DOCTORS
  ==========================================================
  */

  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((doctor) => {
        const keyword = search.toLowerCase();

        const matchesSearch =
          doctor.fullname?.toLowerCase().includes(keyword) ||
          doctor.specialization?.toLowerCase().includes(keyword);

        const matchesSpecialization =
          selectedSpecialization === "All" ||
          doctor.specialization === selectedSpecialization;

        return matchesSearch && matchesSpecialization;
      })
      .sort((a, b) => {
        const ratingA = Number(a.average_rating ?? 0);
        const ratingB = Number(b.average_rating ?? 0);

        return ratingB - ratingA;
      });
  }, [doctors, search, selectedSpecialization]);

  /*
  ==========================================================
  LOADING
  ==========================================================
  */

  if (loading) {
    return (
      <div className="doctor-page">
        <div className="doctor-loading">
          <FaSpinner className="spin" />
          <h4>Loading Doctors...</h4>
          <p>Please wait...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="doctor-page">
      {/* Header */}

      <div className="doctor-page-header">
        <div>
          <h2>Doctors</h2>

          <p>
            Browse all registered doctors. Only verified doctors with approved
            documents are available for appointments.
          </p>
        </div>
      </div>

      {/* Search */}

      <div className="doctor-search-wrapper">
        <FaSearch className="doctor-search-icon" />

        <input
          type="text"
          placeholder="Search doctor or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}

      <div className="doctor-filter-wrapper">
        {specializations.map((item) => (
          <button
            key={item}
            className={`doctor-filter-btn ${
              selectedSpecialization === item ? "active" : ""
            }`}
            onClick={() => setSelectedSpecialization(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Count */}

      <div className="doctor-result-bar">
        <div className="doctor-result-count">
          <FaUserMd />

          <span>
            {filteredDoctors.length} Doctor
            {filteredDoctors.length !== 1 ? "s" : ""} Found
          </span>
        </div>
      </div>

      {/* Doctors */}

      <div className="row g-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => {
            const image = doctor.profile?.profile_image
              ? `${ApiUrl.IMAGE_BASE_URL}/${doctor.profile.profile_image.replace(
                  /^uploads\//,
                  "",
                )}`
              : doctorImage;

            return (
              <div className="col-xl-4 col-lg-4 col-md-6" key={doctor.id}>
                <div
                  className={`doctor-card ${
                    doctor.can_book ? "" : "doctor-disabled"
                  }`}
                >
                  {/* Image */}

                  <div className="doctor-card-image">
                    <img src={image} alt={doctor.fullname} />

                    <span
                      className={`doctor-badge ${
                        doctor.can_book ? "available" : "unavailable"
                      }`}
                    >
                      {doctor.can_book ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  {/* Body */}

                  <div className="doctor-card-body">
                    <h5>
                      {doctor.fullname?.toLowerCase().startsWith("dr")
                        ? doctor.fullname
                        : `Dr. ${doctor.fullname}`}
                    </h5>

                    <p className="doctor-specialization">
                      {doctor.specialization || "Not specified"}
                    </p>

                    {/* Verification */}

                    <div className="doctor-status">
                      {doctor.can_book ? (
                        <span className="verified-text">✓ Verified</span>
                      ) : (
                        <span className="not-verified-text">
                          ✕ Not Verified
                        </span>
                      )}
                    </div>

                    {/* Rating */}

                    <div className="doctor-rating">
                      <div className="doctor-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={
                              star <=
                              Math.round(Number(doctor.average_rating ?? 0))
                                ? "filled-star"
                                : "empty-star"
                            }
                          />
                        ))}
                      </div>

                      <span className="doctor-rating-value">
                        {Number(doctor.average_rating ?? 0).toFixed(1)}
                      </span>
                    </div>

                    {/* Button */}

                    <button
                      disabled={!doctor.can_book}
                      className={`doctor-view-btn ${
                        doctor.can_book ? "" : "disabled"
                      }`}
                      onClick={() =>
                        navigate("/patient/doctordetails", {
                          state: {
                            doctor,
                          },
                        })
                      }
                    >
                      {doctor.can_book ? "View Profile" : "Unavailable"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12">
            <div className="doctor-empty">
              <FaUserMd />

              <h3>No Doctors Found</h3>

              <p>No doctor matches your search.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
