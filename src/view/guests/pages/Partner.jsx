import { Link } from "react-router-dom";
import "../../../assets/css/partner.css";

export default function Partner() {
  const doctorImage =
    "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1200";

  return (
    <>
      {/* ================= HERO ================= */}

      <section className="partner-hero">
        <div className="container">
          <div className="row align-items-center gy-5">

            <div className="col-lg-6">

              <span className="partner-badge">
                PARTNER WITH BADANIX
              </span>

              <h1 className="partner-title">
                Grow Your Healthcare Practice
                <span> Digitally.</span>
              </h1>

              <p className="partner-description">
                Join BADANIX and connect your hospital, clinic,
                pharmacy or medical practice with thousands of
                patients seeking trusted healthcare services.
                Offer online consultations, manage appointments,
                build credibility and grow your practice from
                anywhere.
              </p>

              <div className="partner-buttons">

                <Link
                  to="/doctor/register"
                  className="btn partner-btn-primary"
                >
                  Register as Doctor
                </Link>

                <Link
                  to="/institution/register"
                  className="btn partner-btn-outline"
                >
                  Register Institution
                </Link>

              </div>

              <div className="partner-stats">

                <div className="partner-stat">
                  <h3>24/7</h3>
                  <p>Platform Access</p>
                </div>

                <div className="partner-stat">
                  <h3>100%</h3>
                  <p>Secure Records</p>
                </div>

                <div className="partner-stat">
                  <h3>Online</h3>
                  <p>Consultations</p>
                </div>

              </div>

            </div>

            <div className="col-lg-6">

              <div className="partner-image-wrapper">

                <img
                  src={doctorImage}
                  alt="Doctor"
                  className="img-fluid partner-main-image"
                />

                <div className="floating-card card-one">
                  👨‍⚕️ Verified Doctors
                </div>

                <div className="floating-card card-two">
                  🏥 Trusted Institutions
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= WHY PARTNER ================= */}

      <section className="partner-benefits">

        <div className="container">

          <div className="section-title text-center">

            <span>WHY PARTNER WITH US</span>

            <h2>
              Everything You Need To Grow Your Practice
            </h2>

            <p>
              BADANIX provides powerful digital healthcare
              solutions designed to help healthcare providers
              serve patients efficiently while expanding
              their reach.
            </p>

          </div>

          <div className="row g-4 mt-2">

            <div className="col-lg-4 col-md-6">

              <div className="benefit-card">

                <div className="benefit-icon">
                  🩺
                </div>

                <h4>Reach More Patients</h4>

                <p>
                  Get discovered by patients looking for
                  qualified healthcare professionals and
                  institutions.
                </p>

              </div>

            </div>

            <div className="col-lg-4 col-md-6">

              <div className="benefit-card">

                <div className="benefit-icon">
                  💻
                </div>

                <h4>Virtual Consultation</h4>

                <p>
                  Conduct secure online consultations from
                  anywhere using the BADANIX platform.
                </p>

              </div>

            </div>

            <div className="col-lg-4 col-md-6">

              <div className="benefit-card">

                <div className="benefit-icon">
                  📅
                </div>

                <h4>Appointment Booking</h4>

                <p>
                  Patients can schedule appointments easily
                  while you manage your availability in one
                  dashboard.
                </p>

              </div>

            </div>

            <div className="col-lg-4 col-md-6">

              <div className="benefit-card">

                <div className="benefit-icon">
                  📈
                </div>

                <h4>Practice Growth</h4>

                <p>
                  Increase your visibility and build your
                  reputation with verified patient reviews.
                </p>

              </div>

            </div>

            <div className="col-lg-4 col-md-6">

              <div className="benefit-card">

                <div className="benefit-icon">
                  🔒
                </div>

                <h4>Secure Platform</h4>

                <p>
                  Protect patient records using secure
                  technologies designed for modern
                  healthcare.
                </p>

              </div>

            </div>

            <div className="col-lg-4 col-md-6">

              <div className="benefit-card">

                <div className="benefit-icon">
                  🌍
                </div>

                <h4>Nationwide Presence</h4>

                <p>
                  Make your services accessible to patients
                  across Nigeria through one trusted
                  healthcare platform.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

            {/* ================= REGISTER OPTIONS ================= */}

      <section className="partner-register-section">

        <div className="container">

          <div className="section-title text-center">

            <span>CHOOSE YOUR ACCOUNT</span>

            <h2>Join BADANIX Today</h2>

            <p>
              Whether you're an individual healthcare professional or a
              healthcare institution, BADANIX provides the tools you need
              to serve more patients and grow your practice.
            </p>

          </div>

          <div className="row g-4 mt-3">

            <div className="col-lg-6">

              <div className="register-card">

                <img
                  src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  className="img-fluid register-image"
                  alt="Doctor"
                />

                <div className="register-content">

                  <span className="register-label">
                    FOR HEALTH PROFESSIONALS
                  </span>

                  <h3>Doctor Registration</h3>

                  <p>
                    Create your professional profile, receive appointment
                    requests, provide online consultations and build trust
                    with thousands of patients.
                  </p>

                  <ul className="partner-list">

                    <li>✔ Professional Profile</li>
                    <li>✔ Appointment Scheduling</li>
                    <li>✔ Video Consultation</li>
                    <li>✔ Patient Reviews</li>
                    <li>✔ Digital Prescription</li>

                  </ul>

                  <Link
                    to="/doctor/register"
                    className="btn partner-btn-primary mt-3"
                  >
                    Register as Doctor
                  </Link>

                </div>

              </div>

            </div>

            <div className="col-lg-6">

              <div className="register-card">

                <img
                  src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  className="img-fluid register-image"
                  alt="Institution"
                />

                <div className="register-content">

                  <span className="register-label">
                    FOR ORGANIZATIONS
                  </span>

                  <h3>Institution Registration</h3>

                  <p>
                    Register your hospital, clinic, laboratory,
                    pharmacy or diagnostic centre and manage your
                    healthcare services from one platform.
                  </p>

                  <ul className="partner-list">

                    <li>✔ Multiple Doctors</li>
                    <li>✔ Staff Management</li>
                    <li>✔ Appointment Dashboard</li>
                    <li>✔ Online Visibility</li>
                    <li>✔ Secure Patient Records</li>

                  </ul>

                  <Link
                    to="/institution/register"
                    className="btn partner-btn-primary mt-3"
                  >
                    Register Institution
                  </Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= STATISTICS ================= */}

      <section className="partner-counter">

        <div className="container">

          <div className="row text-center">

            <div className="col-md-3 col-6">

              <div className="counter-box">

                <h2>24/7</h2>

                <p>Platform Availability</p>

              </div>

            </div>

            <div className="col-md-3 col-6">

              <div className="counter-box">

                <h2>100%</h2>

                <p>Secure Platform</p>

              </div>

            </div>

            <div className="col-md-3 col-6">

              <div className="counter-box">

                <h2>Easy</h2>

                <p>Appointment Booking</p>

              </div>

            </div>

            <div className="col-md-3 col-6">

              <div className="counter-box">

                <h2>Fast</h2>

                <p>Online Registration</p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CALL TO ACTION ================= */}

      <section className="partner-cta">

        <div className="container">

          <div className="cta-box text-center">

            <span>START TODAY</span>

            <h2>
              Become Part Of Nigeria's Digital Healthcare Future
            </h2>

            <p>
              Join doctors, clinics, pharmacies and hospitals using
              BADANIX to provide better healthcare experiences for
              patients.
            </p>

            <div className="mt-4">

              <Link
                to="/doctor/register"
                className="btn partner-btn-primary me-3"
              >
                Register as Doctor
              </Link>

              <Link
                to="/institution/register"
                className="btn partner-btn-outline"
              >
                Register Institution
              </Link>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}