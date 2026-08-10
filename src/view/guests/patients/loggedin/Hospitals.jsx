import { useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaHospital,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaTimes,
  FaSearch,
  FaCheckCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "../../../../assets/css/hospital.css";

import ApiUrl from "../../../../constants/ApiUrl";

import hospitalImage from "../../../../assets/icons/hospital.png";

export default function Hospitals() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [hospitals, setHospitals] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {
    try {
      const response = await fetch(ApiUrl.GET_INSTITUTIONS, {
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        const hospitalList = data.institutions.filter(
          (institution) =>
            institution.institution_type.toLowerCase() === "hospital",
        );

        setHospitals(hospitalList);
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
        text: "Unable to load hospitals.",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredHospitals = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return hospitals;

    return hospitals.filter((hospital) => {
      return (
        hospital.institution_name?.toLowerCase().includes(keyword) ||
        hospital.profile?.city?.toLowerCase().includes(keyword) ||
        hospital.profile?.state?.toLowerCase().includes(keyword) ||
        hospital.profile?.country?.toLowerCase().includes(keyword) ||
        hospital.profile?.services?.toLowerCase().includes(keyword)
      );
    });
  }, [search, hospitals]);

  const getHospitalImage = (hospital) => {
    if (!hospital.profile?.profile_image) {
      return hospitalImage;
    }

    const image = hospital.profile.profile_image;

    if (image.startsWith("http")) {
      return image;
    }

    return `${ApiUrl.IMAGE_BASE_URL}/${image.replace(/^uploads\//, "")}`;
  };

  const openHospital = (hospital) => {
    setSelectedHospital(hospital);
    document.body.style.overflow = "hidden";
  };

  const closeHospital = () => {
    setSelectedHospital(null);
    document.body.style.overflow = "auto";
  };

  const formatServices = (services) => {
    if (!services) return [];

    return services
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 5);
  };

  const shortAbout = (text) => {
    if (!text) return "No description available.";

    if (text.length <= 170) return text;

    return text.substring(0, 170) + "...";
  };
  return (
    <>
      <div className="hospital-page">
        <button className="hospital-back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        {/* HERO */}

        <section className="hospital-hero">
          <div className="hospital-hero-content">
            <span className="hospital-hero-tag">
              <FaHospital />
              Verified Healthcare
            </span>

            <h1>Find Trusted Hospitals</h1>

            <p>
              Browse verified hospitals, compare services, and view institution
              information before booking an appointment.
            </p>

            <div className="hospital-search-box">
              <FaSearch />

              <input
                type="text"
                placeholder="Search hospital, city, state or services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="hospital-stat">
              {filteredHospitals.length} Verified Hospital
              {filteredHospitals.length !== 1 && "s"}
            </div>
          </div>
        </section>

        {loading ? (
          <div className="hospital-loading">Loading hospitals...</div>
        ) : filteredHospitals.length === 0 ? (
          <div className="hospital-empty">
            <FaHospital />

            <h3>No Hospitals Found</h3>

            <p>Try another search keyword.</p>
          </div>
        ) : (
          <div className="hospital-grid">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="hospital-card"
                onClick={() => openHospital(hospital)}
              >
                <div className="hospital-image-area">
                  <img
                    src={getHospitalImage(hospital)}
                    alt={hospital.institution_name}
                    className="hospital-image"
                    onError={(e) => {
                      e.target.src = hospitalImage;
                    }}
                  />

                  <div className="hospital-overlay">
                    <span>
                      <FaCheckCircle />
                      Verified
                    </span>
                  </div>
                </div>

                <div className="hospital-card-body">
                  <h3>{hospital.institution_name}</h3>

                  <div className="hospital-location">
                    <FaMapMarkerAlt />

                    <span>
                      {hospital.profile?.city || "Unknown City"}
                      {hospital.profile?.state && `, ${hospital.profile.state}`}
                    </span>
                  </div>

                  <p className="hospital-about">
                    {shortAbout(hospital.profile?.about)}
                  </p>

                  <div className="hospital-services-preview">
                    {formatServices(hospital.profile?.services).map(
                      (service, index) => (
                        <span key={index}>{service}</span>
                      ),
                    )}
                  </div>

                  <button className="hospital-view-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}

      {selectedHospital && (
        <div className="hospital-modal-overlay" onClick={closeHospital}>
          <div className="hospital-modal" onClick={(e) => e.stopPropagation()}>
            <button className="hospital-modal-close" onClick={closeHospital}>
              <FaTimes />
            </button>

            <div className="hospital-modal-banner">
              <img
                src={getHospitalImage(selectedHospital)}
                alt={selectedHospital.institution_name}
                onError={(e) => {
                  e.target.src = hospitalImage;
                }}
              />

              <div className="hospital-modal-badge">
                <FaCheckCircle />
                Verified Hospital
              </div>
            </div>

            <div className="hospital-modal-content">
              <h2>{selectedHospital.institution_name}</h2>

              <div className="hospital-modal-location">
                <FaMapMarkerAlt />

                <span>
                  {selectedHospital.profile?.address}

                  {selectedHospital.profile?.city &&
                    `, ${selectedHospital.profile.city}`}

                  {selectedHospital.profile?.state &&
                    `, ${selectedHospital.profile.state}`}

                  {selectedHospital.profile?.country &&
                    `, ${selectedHospital.profile.country}`}
                </span>
              </div>

              <div className="hospital-modal-grid">
                <div className="hospital-section">
                  <h4>About</h4>

                  <p>
                    {selectedHospital.profile?.about ||
                      "No information available."}
                  </p>
                </div>

                <div className="hospital-section">
                  <h4>Phone</h4>

                  <p>
                    <FaPhone />

                    {selectedHospital.profile?.phone || "Not Available"}
                  </p>
                </div>

                <div className="hospital-section">
                  <h4>Website</h4>

                  <p>
                    <FaGlobe />

                    {selectedHospital.profile?.website ? (
                      <a
                        href={selectedHospital.profile.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit Website
                      </a>
                    ) : (
                      "Not Available"
                    )}
                  </p>
                </div>

                <div className="hospital-section">
                  <h4>Ownership</h4>

                  <p>
                    {selectedHospital.profile?.ownership_type ||
                      "Not Available"}
                  </p>
                </div>

                <div className="hospital-section full">
                  <h4>Services</h4>

                  <div className="hospital-services">
                    {formatServices(selectedHospital.profile?.services).map(
                      (service, index) => (
                        <span key={index}>{service}</span>
                      ),
                    )}
                  </div>
                </div>

                <div className="hospital-section full">
                  <h4>Accreditations</h4>

                  <p>
                    {selectedHospital.profile?.accreditations ||
                      "Not Available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
