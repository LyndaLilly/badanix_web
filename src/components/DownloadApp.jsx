import "../assets/css/downloadapp.css";

import {
  FaGooglePlay,
  FaApple,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

import appImage from "../assets/img/img1.jpg";

export default function DownloadApp() {
  return (
    <section className="download-section">

      <div className="container-fluid">

        <div className="download-box">

          {/* =========================================
              DECORATIVE ELEMENTS
          ========================================= */}

          <div className="download-decoration download-decoration-one"></div>
          <div className="download-decoration download-decoration-two"></div>


          <div className="row align-items-center g-5">

            {/* =========================================
                APP IMAGE
            ========================================= */}

            <div className="col-lg-5">

              <div className="download-visual">

                <div className="download-glow"></div>

                <div className="download-circle"></div>

                <div className="download-image-card">

                  <img
                    src={appImage}
                    alt="BADANIX mobile application"
                    className="download-app-image"
                  />

                </div>


                {/* Floating badge */}

                <div className="download-floating-badge">

                  <FaCheckCircle />

                  <div>
                    <strong>Healthcare</strong>
                    <span>at your fingertips</span>
                  </div>

                </div>


                {/* Floating mini badge */}

                <div className="download-floating-mini">
                  <span className="mini-dot"></span>
                  Secure & Reliable
                </div>

              </div>

            </div>


            {/* =========================================
                CONTENT
            ========================================= */}

            <div className="col-lg-7">

              <div className="download-content">

                <span className="download-tag">
                  <span className="download-tag-dot"></span>
                  BADANIX MOBILE APP
                </span>


                <h2 className="download-title">
                  Your healthcare,
                  <span> wherever you go.</span>
                </h2>


                <p className="download-description">
                  Take BADANIX with you wherever you go. Connect with
                  certified healthcare professionals, manage your health
                  records and access essential healthcare services from
                  one secure mobile application.
                </p>


                {/* =========================================
                    FEATURES
                ========================================= */}

                <div className="download-features">

                  <div className="download-feature">
                    <span className="download-feature-icon">
                      <FaCheckCircle />
                    </span>

                    <span>Instant Video Consultation</span>
                  </div>


                  <div className="download-feature">
                    <span className="download-feature-icon">
                      <FaCheckCircle />
                    </span>

                    <span>Secure Electronic Health Records</span>
                  </div>


                  <div className="download-feature">
                    <span className="download-feature-icon">
                      <FaCheckCircle />
                    </span>

                    <span>Book Hospitals & Laboratories</span>
                  </div>


                  <div className="download-feature">
                    <span className="download-feature-icon">
                      <FaCheckCircle />
                    </span>

                    <span>Prescription & Pharmacy Services</span>
                  </div>

                </div>


                {/* =========================================
                    DOWNLOAD AREA
                ========================================= */}

                <div className="download-actions">

                  <div className="download-actions-title">
                    Download the app and get started
                  </div>


                  <div className="download-store-buttons">

                    <button className="download-store-btn">

                      <FaGooglePlay />

                      <span>
                        <small>GET IT ON</small>
                        Google Play
                      </span>

                      <FaArrowRight className="download-store-arrow" />

                    </button>


                    <button className="download-store-btn">

                      <FaApple />

                      <span>
                        <small>DOWNLOAD ON THE</small>
                        App Store
                      </span>

                      <FaArrowRight className="download-store-arrow" />

                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}