import "../assets/css/downloadapp.css";
import {
  FaGooglePlay,
  FaApple,
  FaCheckCircle,
} from "react-icons/fa";

export default function DownloadApp() {
  return (
    <section className="download-section">

      <div className="container">

        <div className="download-box">

          <div className="row align-items-center">

            <div className="col-lg-6 text-center">

              <div className="phone-wrapper">

                <div className="circle-bg"></div>

                <img
                  src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=900"
                  alt=""
                  className="phone-image"
                />

              </div>

            </div>

            <div className="col-lg-6">

              <span className="section-tag">
                MOBILE APP
              </span>

              <h2>
                Download BADANIX &
                <br />
                Get Quality Healthcare Anywhere
              </h2>

              <p>
                Access certified doctors, hospitals, pharmacies,
                laboratories and your Electronic Health Record all
                from one secure mobile application.
              </p>

              <div className="feature-list">

                <div>
                  <FaCheckCircle />
                  Instant Video Consultation
                </div>

                <div>
                  <FaCheckCircle />
                  Secure Electronic Health Records
                </div>

                <div>
                  <FaCheckCircle />
                  Book Hospitals & Laboratories
                </div>

                <div>
                  <FaCheckCircle />
                  Prescription & Pharmacy Services
                </div>

              </div>

              <div className="store-buttons">

                <button className="store-btn">
                  <FaGooglePlay />
                  Google Play
                </button>

                <button className="store-btn">
                  <FaApple />
                  App Store
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}