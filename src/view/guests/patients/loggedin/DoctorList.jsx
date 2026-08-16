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
  FaCheckCircle,
} from "react-icons/fa";

import { MdVerified } from "react-icons/md";

import "../../../../assets/css/doctorlist.css";

import ApiUrl from "../../../../constants/ApiUrl";

import doctorImage from "../../../../assets/icons/doctor.png";

export default function DoctorList() {
  const navigate = useNavigate();
  const location = useLocation();

  const specializationId = location.state?.specializationId;
  const specializationName =
    location.state?.specialization || "Doctors";

  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [category, setCategory] = useState(null);

  /*
  ==========================================================
  FETCH DOCTORS BY SPECIALIZATION
  ==========================================================
  */

  useEffect(() => {
    console.log("======================================");
    console.log("DOCTOR LIST DEBUG START");
    console.log("======================================");

    console.log("specializationId:", specializationId);
    console.log("specializationName:", specializationName);

    if (!specializationId) {
      console.error("❌ NO SPECIALIZATION ID FOUND");
      navigate(-1);
      return;
    }

    const url = `${ApiUrl.GET_DOCTORS_BY_SPECIALIZATION}/${specializationId}/doctors`;

    console.log("API URL:", url);

    setLoading(true);

    fetch(url)
      .then(async (response) => {
        console.log("HTTP STATUS:", response.status);
        console.log("HTTP OK:", response.ok);

        const data = await response.json();

        console.log("RAW API RESPONSE:");
        console.log(data);

        console.log("SUCCESS:", data.success);
        console.log("SPECIALIZATION:", data.specialization);
        console.log("TOTAL DOCTORS:", data.total_doctors);
        console.log("DOCTORS:", data.doctors);

        if (!data.success) {
          console.error("❌ API returned success=false");
          console.error("Message:", data.message);
          return;
        }

        if (!data.doctors) {
          console.error("❌ data.doctors does not exist");
          return;
        }

        console.log("NUMBER OF DOCTORS:", data.doctors.length);

        data.doctors.forEach((doctor, index) => {
          console.log(`DOCTOR ${index + 1}:`, {
            id: doctor.id,
            fullname: doctor.fullname,
            status: doctor.status,
            verified: doctor.verified,
            can_book: doctor.can_book,
            average_rating: doctor.average_rating,
            profile: doctor.profile,
            specialization: doctor.specialization,
          });
        });

        /*
        ======================================================
        SORT BY HIGHEST RATING FIRST
        ======================================================
        */

        const sortedDoctors = [...(data.doctors || [])].sort(
          (a, b) => {
            const ratingA = Number(a.average_rating ?? 0);
            const ratingB = Number(b.average_rating ?? 0);

            return ratingB - ratingA;
          },
        );

        setDoctors(sortedDoctors);
        setCategory(data.specialization);
      })
      .catch((error) => {
        console.error("❌ FETCH DOCTORS ERROR:");
        console.error(error);
      })
      .finally(() => {
        console.log("======================================");
        console.log("DOCTOR LIST DEBUG END");
        console.log("======================================");

        setLoading(false);
      });
  }, [specializationId, navigate]);

  /*
  ==========================================================
  LOADING
  ==========================================================
  */

  if (loading) {
    return (
      <div className="doctor-list-page loading-page">
        <h3>Loading Doctors...</h3>
      </div>
    );
  }

  /*
  ==========================================================
  RENDER
  ==========================================================
  */

  return (
    <div className="doctor-list-page">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="doctor-list-header">

        <button
          type="button"
          className="doctor-back-btn"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
        </button>

        <div>
          <h2>
            {category?.name || specializationName}
          </h2>

          <span>
            {doctors.length} Doctor
            {doctors.length !== 1 ? "s" : ""} Available
          </span>
        </div>

      </div>


      {/* ==================================================
          EMPTY STATE
      ================================================== */}

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

          {doctors.map((doctor) => {

            /*
            ==================================================
            REAL RATING
            ==================================================
            */

            const rating = Number(
              doctor.average_rating ?? 0,
            );

            const safeRating = Number.isFinite(rating)
              ? Math.max(0, Math.min(5, rating))
              : 0;


            /*
            ==================================================
            DOCTOR IMAGE
            ==================================================
            */

            const image = doctor.profile?.profile_image
              ? `${ApiUrl.IMAGE_BASE_URL}/${doctor.profile.profile_image.replace(
                  /^uploads\//,
                  "",
                )}`
              : doctorImage;


            /*
            ==================================================
            BOOKING STATUS
            ==================================================
            */

            const canBook = Boolean(doctor.can_book);


            return (

              <div
                key={doctor.id}
                className={`doctor-card ${
                  canBook ? "" : "doctor-disabled"
                }`}
                onClick={() => {

                  if (!canBook) return;

                  navigate(
                    "/patient/doctordetails",
                    {
                      state: {
                        doctor,
                      },
                    },
                  );

                }}
              >

                {/* ==================================================
                    TOP SECTION
                ================================================== */}

                <div className="doctor-card-top">


                  {/* ==================================================
                      IMAGE
                  ================================================== */}

                  <div className="doctor-image-section">

                    <div className="doctor-image-wrapper">

                      <img
                        src={image}
                        alt={doctor.fullname}
                        className="doctor-image"
                      />


                      {/* ==================================================
                          SMALL AVAILABILITY BADGE
                      ================================================== */}

                      <span
                        className={`doctor-badge ${
                          canBook
                            ? "available"
                            : "unavailable"
                        }`}
                      >
                        {canBook
                          ? "Available"
                          : "Unavailable"}
                      </span>

                    </div>


                    {/* ==================================================
                        GENDER
                    ================================================== */}

                    {doctor.profile?.gender && (

                      <div className="doctor-gender">

                        <span>
                          {doctor.profile.gender
                            .charAt(0)
                            .toUpperCase() +
                            doctor.profile.gender.slice(1)}
                        </span>

                      </div>

                    )}

                  </div>


                  {/* ==================================================
                      DOCTOR DETAILS
                  ================================================== */}

                  <div className="doctor-main-details">


                    {/* ==================================================
                        NAME + VERIFIED
                    ================================================== */}

                    <div className="doctor-name-row">

                      <div className="doctor-name-wrapper">

                        <h3>
                          {doctor.fullname
                            ?.toLowerCase()
                            .startsWith("dr")
                            ? doctor.fullname
                            : `Dr. ${doctor.fullname}`}
                        </h3>


                        {/* VERIFIED CHECK */}

                        {canBook && (

                          <MdVerified
                            className="doctor-verified-icon"
                            title="Verified Doctor"
                          />

                        )}

                      </div>

                    </div>


                    {/* ==================================================
                        RATING
                    ================================================== */}

                    <div className="doctor-rating">

                      <div className="stars">

                        {[1, 2, 3, 4, 5].map(
                          (star) => {

                            const isFilled =
                              star <=
                              Math.floor(
                                safeRating,
                              );

                            return (

                              <FaStar
                                key={star}
                                className={
                                  isFilled
                                    ? "filled-star"
                                    : "empty-star"
                                }
                              />

                            );
                          },
                        )}

                      </div>


                      <span className="rating-number">

                        {safeRating > 0
                          ? safeRating.toFixed(1)
                          : "No rating"}

                      </span>

                    </div>


                    {/* ==================================================
                        SPECIALIZATION
                    ================================================== */}

                    <span className="doctor-specialization">

                      {doctor.specialization ||
                        "Not specified"}

                    </span>


                    {/* ==================================================
                        LOCATION
                    ================================================== */}

                    {(doctor.profile?.city ||
                      doctor.profile?.state) && (

                      <div className="doctor-info-row">

                        <FaMapMarkerAlt />

                        <span>

                          {doctor.profile?.city}

                          {doctor.profile?.city &&
                            doctor.profile?.state &&
                            ", "}

                          {doctor.profile?.state}

                        </span>

                      </div>

                    )}

                  </div>

                </div>


                {/* ==================================================
                    STATS
                ================================================== */}

                <div className="doctor-card-middle">


                  {/* EXPERIENCE */}

                  {doctor.profile?.experience && (

                    <div className="doctor-stat">

                      <FaBriefcase />

                      <div>

                        <small>
                          Experience
                        </small>

                        <strong>
                          {doctor.profile.experience} yrs
                        </strong>

                      </div>

                    </div>

                  )}


                  {/* LANGUAGE */}

                  {doctor.profile?.pref_language && (

                    <div className="doctor-stat">

                      <FaLanguage />

                      <div>

                        <small>
                          Language
                        </small>

                        <strong>
                          {doctor.profile.pref_language}
                        </strong>

                      </div>

                    </div>

                  )}

                </div>


                {/* ==================================================
                    FOOTER
                ================================================== */}

                <div className="doctor-card-footer">

                  <button
                    type="button"
                    disabled={!canBook}
                    className={`view-profile-btn ${
                      canBook
                        ? ""
                        : "disabled"
                    }`}
                    onClick={(e) => {

                      e.stopPropagation();

                      if (!canBook) return;

                      navigate(
                        "/patient/doctordetails",
                        {
                          state: {
                            doctor,
                          },
                        },
                      );

                    }}
                  >

                    {canBook
                      ? "View Profile"
                      : "Unavailable"}

                    {canBook && (
                      <FaChevronRight />
                    )}

                  </button>

                </div>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
}