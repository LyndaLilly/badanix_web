import { useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaFlask,
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

import hospitalImage from "../../../../assets/icons/laboratory.png";

export default function Laboratories() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [laboratories, setLaboratories] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedLaboratory, setSelectedLaboratory] = useState(null);

  useEffect(() => {
    loadLaboratories();
  }, []);

  const loadLaboratories = async () => {
    try {
      const response = await fetch(ApiUrl.GET_INSTITUTIONS, {
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        const laboratoryList = data.institutions.filter(
          (institution) =>
            institution.institution_type.toLowerCase() === "laboratory"
        );

        setLaboratories(laboratoryList);
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
        text: "Unable to load laboratories.",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredLaboratories = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return laboratories;

    return laboratories.filter((laboratory) => {
      return (
        laboratory.institution_name?.toLowerCase().includes(keyword) ||
        laboratory.profile?.city?.toLowerCase().includes(keyword) ||
        laboratory.profile?.state?.toLowerCase().includes(keyword) ||
        laboratory.profile?.country?.toLowerCase().includes(keyword) ||
        laboratory.profile?.services?.toLowerCase().includes(keyword)
      );
    });
  }, [search, laboratories]);

  const getLaboratoryImage = (laboratory) => {
    if (!laboratory.profile?.profile_image) {
      return hospitalImage;
    }

    const image = laboratory.profile.profile_image;

    if (image.startsWith("http")) {
      return image;
    }

    return `${ApiUrl.IMAGE_BASE_URL}/${image.replace(/^uploads\//, "")}`;
  };

  const openLaboratory = (laboratory) => {
    setSelectedLaboratory(laboratory);
    document.body.style.overflow = "hidden";
  };

  const closeLaboratory = () => {
    setSelectedLaboratory(null);
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

        <section className="hospital-hero">
          <div className="hospital-hero-content">
            <span className="hospital-hero-tag">
              <FaFlask />
              Verified Laboratories
            </span>

            <h1>Find Trusted Laboratories</h1>

            <p>
              Browse verified laboratories, compare services, and view
              laboratory information before booking diagnostic tests.
            </p>

            <div className="hospital-search-box">
              <FaSearch />

              <input
                type="text"
                placeholder="Search laboratory, city, state or services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="hospital-stat">
              {filteredLaboratories.length} Verified Laboratory
              {filteredLaboratories.length !== 1 && "ies"}
            </div>
          </div>
        </section>

        {loading ? (
          <div className="hospital-loading">Loading laboratories...</div>
        ) : filteredLaboratories.length === 0 ? (
          <div className="hospital-empty">
            <FaFlask />

            <h3>No Laboratories Found</h3>

            <p>Try another search keyword.</p>
          </div>
        ) : (
          <div className="hospital-grid">
            {filteredLaboratories.map((laboratory) => (
              <div
                key={laboratory.id}
                className="hospital-card"
                onClick={() => openLaboratory(laboratory)}
              >
                <div className="hospital-image-area">
                  <img
                    src={getLaboratoryImage(laboratory)}
                    alt={laboratory.institution_name}
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
                  <h3>{laboratory.institution_name}</h3>

                  <div className="hospital-location">
                    <FaMapMarkerAlt />

                    <span>
                      {laboratory.profile?.city || "Unknown City"}
                      {laboratory.profile?.state &&
                        `, ${laboratory.profile.state}`}
                    </span>
                  </div>

                  <p className="hospital-about">
                    {shortAbout(laboratory.profile?.about)}
                  </p>

                  <div className="hospital-services-preview">
                    {formatServices(laboratory.profile?.services).map(
                      (service, index) => (
                        <span key={index}>{service}</span>
                      )
                    )}
                  </div>

                  <button className="hospital-view-btn">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedLaboratory && (
        <div className="hospital-modal-overlay" onClick={closeLaboratory}>
          <div
            className="hospital-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="hospital-modal-close"
              onClick={closeLaboratory}
            >
              <FaTimes />
            </button>

            <div className="hospital-modal-banner">
              <img
                src={getLaboratoryImage(selectedLaboratory)}
                alt={selectedLaboratory.institution_name}
                onError={(e) => {
                  e.target.src = hospitalImage;
                }}
              />

              <div className="hospital-modal-badge">
                <FaCheckCircle />
                Verified Laboratory
              </div>
            </div>

            <div className="hospital-modal-content">
              <h2>{selectedLaboratory.institution_name}</h2>

              <div className="hospital-modal-location">
                <FaMapMarkerAlt />

                <span>
                  {selectedLaboratory.profile?.address}

                  {selectedLaboratory.profile?.city &&
                    `, ${selectedLaboratory.profile.city}`}

                  {selectedLaboratory.profile?.state &&
                    `, ${selectedLaboratory.profile.state}`}

                  {selectedLaboratory.profile?.country &&
                    `, ${selectedLaboratory.profile.country}`}
                </span>
              </div>

              <div className="hospital-modal-grid">
                <div className="hospital-section">
                  <h4>About</h4>

                  <p>
                    {selectedLaboratory.profile?.about ||
                      "No information available."}
                  </p>
                </div>

                <div className="hospital-section">
                  <h4>Phone</h4>

                  <p>
                    <FaPhone />
                    {selectedLaboratory.profile?.phone || "Not Available"}
                  </p>
                </div>

                <div className="hospital-section">
                  <h4>Website</h4>

                  <p>
                    <FaGlobe />

                    {selectedLaboratory.profile?.website ? (
                      <a
                        href={selectedLaboratory.profile.website}
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
                    {selectedLaboratory.profile?.ownership_type ||
                      "Not Available"}
                  </p>
                </div>

                <div className="hospital-section full">
                  <h4>Services</h4>

                  <div className="hospital-services">
                    {formatServices(
                      selectedLaboratory.profile?.services
                    ).map((service, index) => (
                      <span key={index}>{service}</span>
                    ))}
                  </div>
                </div>

                <div className="hospital-section full">
                  <h4>Accreditations</h4>

                  <p>
                    {selectedLaboratory.profile?.accreditations ||
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