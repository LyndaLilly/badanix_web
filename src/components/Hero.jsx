import "../assets/css/hero.css";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import {
  FaUserMd,
  FaHospital,
  FaShieldAlt,
  FaHeartbeat,
  FaCheckCircle,
} from "react-icons/fa";

import badanixApp from "../assets/img/img1.jpg";

export default function Hero() {
  return (
    <section className="hero-section">

      <div className="hero-overlay"></div>

      {/* Decorative Shapes */}
      <div className="hero-decoration hero-decoration-one"></div>
      <div className="hero-decoration hero-decoration-two"></div>
      <div className="hero-decoration hero-decoration-three"></div>

      <div className="container position-relative">

        <div className="row align-items-center min-vh-100">

          {/* ================= LEFT ================= */}

          <div className="col-lg-7">

            <div className="hero-content">

              <span className="hero-tag">
                <FaHeartbeat />
                Digital Healthcare Platform
              </span>

              <h1 className="hero-title">
                The Future of
                 Healthcare 
                is in Your Pocket.
              </h1>

              <p className="hero-text">
                Connect with certified doctors, hospitals, pharmacies,
                laboratories and manage your Electronic Health Records
                anytime, anywhere from one secure platform.
              </p>

              {/* App Buttons */}

              <div className="hero-buttons">

                <button className="store-btn-hero">

                  <FaGooglePlay className="store-icon" />

                  <div className="store-text">
                    <small>GET IT ON</small>
                    <h6>Google Play</h6>
                  </div>

                </button>

                <button className="store-btn-hero">

                  <FaApple className="store-icon" />

                  <div className="store-text">
                    <small>DOWNLOAD ON THE</small>
                    <h6>App Store</h6>
                  </div>

                </button>

              </div>

              {/* Features */}

              <div className="hero-features">

                <div>
                  <FaUserMd />
                  <span>Certified Doctors</span>
                </div>

                <div>
                  <FaHospital />
                  <span>Certified Institutions</span>
                </div>

                <div>
                  <FaShieldAlt />
                  <span>Secure EHR</span>
                </div>

              </div>

            </div>

          </div>


          {/* ================= RIGHT ================= */}

          <div className="col-lg-5">

            <div className="hero-app-area">

              {/* Background Glow */}

              <div className="hero-app-glow"></div>

              {/* Floating Card */}

              <div className="hero-floating-card hero-card-top">

                <div className="floating-icon">
                  <FaCheckCircle />
                </div>

                <div>
                  <strong>Healthcare</strong>
                  <span>Made Simple</span>
                </div>

              </div>


              {/* Phone */}

              <div className="hero-phone-wrapper">

                <div className="hero-phone">

                  <div className="phone-speaker"></div>

                  <img
                    src={badanixApp}
                    alt="BADANIX Mobile App"
                    className="hero-app-image"
                  />

                </div>

              </div>


              {/* Bottom Floating Card */}

              <div className="hero-floating-card hero-card-bottom">

                <div className="floating-icon">
                  <FaShieldAlt />
                </div>

                <div>
                  <strong>Secure EHR</strong>
                  <span>Your records, protected</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}