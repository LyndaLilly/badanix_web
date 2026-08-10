import { useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaPills,
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

export default function Pharmacies() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [pharmacies, setPharmacies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  useEffect(() => {
    loadPharmacies();
  }, []);

  const loadPharmacies = async () => {
    try {
      const response = await fetch(ApiUrl.GET_INSTITUTIONS, {
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        const pharmacyList = data.institutions.filter(
          (institution) =>
            institution.institution_type?.toLowerCase() === "pharmacy",
        );

        setPharmacies(pharmacyList);
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
        text: "Unable to load pharmacies.",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredPharmacies = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return pharmacies;

    return pharmacies.filter((pharmacy) => {
      return (
        pharmacy.institution_name?.toLowerCase().includes(keyword) ||
        pharmacy.profile?.city?.toLowerCase().includes(keyword) ||
        pharmacy.profile?.state?.toLowerCase().includes(keyword) ||
        pharmacy.profile?.country?.toLowerCase().includes(keyword) ||
        pharmacy.profile?.services?.toLowerCase().includes(keyword)
      );
    });
  }, [search, pharmacies]);

  const getPharmacyImage = (pharmacy) => {
    if (!pharmacy.profile?.profile_image) {
      return hospitalImage;
    }

    const image = pharmacy.profile.profile_image;

    if (image.startsWith("http")) {
      return image;
    }

    return `${ApiUrl.IMAGE_BASE_URL}/${image.replace(/^uploads\//, "")}`;
  };

  const openPharmacy = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    document.body.style.overflow = "hidden";
  };

  const closePharmacy = () => {
    setSelectedPharmacy(null);
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
              <FaPills />
              Verified Pharmacies
            </span>

            <h1>Find Trusted Pharmacies</h1>

            <p>
              Browse verified pharmacies, compare services, and view pharmacy
              information before requesting medications or healthcare products.
            </p>

            <div className="hospital-search-box">
              <FaSearch />

              <input
                type="text"
                placeholder="Search pharmacy, city, state or services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="hospital-stat">
              {filteredPharmacies.length} Verified{" "}
              {filteredPharmacies.length === 1 ? "Pharmacy" : "Pharmacies"}
            </div>
          </div>
        </section>

        {loading ? (
          <div className="hospital-loading">Loading pharmacies...</div>
        ) : filteredPharmacies.length === 0 ? (
          <div className="hospital-empty">
            <FaPills />

            <h3>No Pharmacies Found</h3>

            <p>Try another search keyword.</p>
          </div>
        ) : (
          <div className="hospital-grid">
            {filteredPharmacies.map((pharmacy) => (
              <div
                key={pharmacy.id}
                className="hospital-card"
                onClick={() => openPharmacy(pharmacy)}
              >
                <div className="hospital-image-area">
                  <img
                    src={getPharmacyImage(pharmacy)}
                    alt={pharmacy.institution_name}
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
                  <h3>{pharmacy.institution_name}</h3>

                  <div className="hospital-location">
                    <FaMapMarkerAlt />

                    <span>
                      {pharmacy.profile?.city || "Unknown City"}
                      {pharmacy.profile?.state && `, ${pharmacy.profile.state}`}
                    </span>
                  </div>

                  <p className="hospital-about">
                    {shortAbout(pharmacy.profile?.about)}
                  </p>

                  <div className="hospital-services-preview">
                    {formatServices(pharmacy.profile?.services).map(
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

      {selectedPharmacy && (
        <div className="hospital-modal-overlay" onClick={closePharmacy}>
          <div className="hospital-modal" onClick={(e) => e.stopPropagation()}>
            <button className="hospital-modal-close" onClick={closePharmacy}>
              <FaTimes />
            </button>

            <div className="hospital-modal-banner">
              <img
                src={getPharmacyImage(selectedPharmacy)}
                alt={selectedPharmacy.institution_name}
                onError={(e) => {
                  e.target.src = hospitalImage;
                }}
              />

              <div className="hospital-modal-badge">
                <FaCheckCircle />
                Verified Pharmacy
              </div>
            </div>
            <div className="hospital-modal-content">
              <h2>{selectedPharmacy.institution_name}</h2>

              <div className="hospital-modal-location">
                <FaMapMarkerAlt />

                <span>
                  {selectedPharmacy.profile?.address || ""}

                  {selectedPharmacy.profile?.city &&
                    `, ${selectedPharmacy.profile.city}`}

                  {selectedPharmacy.profile?.state &&
                    `, ${selectedPharmacy.profile.state}`}

                  {selectedPharmacy.profile?.country &&
                    `, ${selectedPharmacy.profile.country}`}
                </span>
              </div>

              <div className="hospital-modal-grid">
                <div className="hospital-section">
                  <h4>About</h4>

                  <p>
                    {selectedPharmacy.profile?.about ||
                      "No information available."}
                  </p>
                </div>

                <div className="hospital-section">
                  <h4>Phone</h4>

                  <p>
                    <FaPhone />
                    {selectedPharmacy.profile?.phone || "Not Available"}
                  </p>
                </div>

                <div className="hospital-section">
                  <h4>Website</h4>

                  <p>
                    <FaGlobe />

                    {selectedPharmacy.profile?.website ? (
                      <a
                        href={selectedPharmacy.profile.website}
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
                    {selectedPharmacy.profile?.ownership_type ||
                      "Not Available"}
                  </p>
                </div>

                <div className="hospital-section full">
                  <h4>Services</h4>

                  <div className="hospital-services">
                    {formatServices(selectedPharmacy.profile?.services).length >
                    0 ? (
                      formatServices(selectedPharmacy.profile?.services).map(
                        (service, index) => <span key={index}>{service}</span>,
                      )
                    ) : (
                      <p>No services listed.</p>
                    )}
                  </div>
                </div>

                <div className="hospital-section full">
                  <h4>Accreditations</h4>

                  <p>
                    {selectedPharmacy.profile?.accreditations ||
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
