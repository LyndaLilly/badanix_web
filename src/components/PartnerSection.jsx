import "../assets/css/partner.css";
import { FaCheckCircle, FaArrowRight, FaUserMd } from "react-icons/fa";
import { Link } from "react-router-dom";
import partnerImage from "../assets/img/img14.jpg";

const benefits = [
  "Attend to aligned e-patients",
  "Write e-medical reports",
  "Give medical advice to e-patients",
  "Prescribe e-medicine",
  "Make money on every e-consultation",
];

export default function PartnerSection() {
  return (
    <section className="partner-section">
      <div className="container">
        <div className="row align-items-center g-5">
          {/* ================================
              CONTENT
          ================================= */}

          <div className="col-lg-6">
            <div className="partner-content">
              <div className="partner-label">
                <span className="partner-label-dot"></span>
                PARTNER WITH US
              </div>

              <h2 className="partner-title">
                Grow Your Practice.
                <span> Reach More Patients.</span>
              </h2>

              <p className="partner-text">
                Join BADANIX and become part of a growing network of healthcare
                professionals delivering trusted digital healthcare to patients
                anytime, anywhere.
              </p>

              {/* Benefits */}

              <div className="benefits">
                {benefits.map((item, index) => (
                  <div className="benefit" key={index}>
                    <span className="benefit-icon">
                      <FaCheckCircle />
                    </span>

                    <span className="benefit-text">{item}</span>
                  </div>
                ))}
              </div>

              {/* Button */}

              <div className="partner-btn">
        
                <Link style={{ textDecoration: 'none', color: 'white' }} to="/universallogin">
                  Partner With BADANIX
                </Link>
                <span className="partner-btn-icon">
                  <FaArrowRight />
                </span>
              </div>
            </div>
          </div>

          {/* ================================
              IMAGE AREA
          ================================= */}

          <div className="col-lg-6">
            <div className="partner-visual">
              {/* Decorative background */}

              <div className="partner-orb partner-orb-one"></div>
              <div className="partner-orb partner-orb-two"></div>

              {/* Image */}

              <div className="partner-image">
                <img
                  src={partnerImage}
                  alt="Healthcare professional"
                />
              </div>

              {/* Floating experience card */}

              <div className="experience-card">
                <div className="experience-icon">
                  <FaUserMd />
                </div>

                <div className="experience-content">
                  <strong>500+</strong>
                  <span>Healthcare Professionals</span>
                </div>
              </div>

              {/* Small floating card */}

              <div className="partner-mini-card">
                <FaCheckCircle />

                <div>
                  <strong>Trusted Network</strong>
                  <span>Growing every day</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
