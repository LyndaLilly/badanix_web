import "../../../assets/css/services.css";

const Services = () => {
  return (
    <>
      {/* ================= HERO ================= */}

      <section className="bdx-services-hero">
        <div className="bdx-services-overlay"></div>

        <div
          className="container text-center bdx-services-content"
          style={{ padding: "40px" }}
        >
          <h1 className="bdx-services-title">
            Comprehensive Healthcare Solutions
          </h1>

          <p className="bdx-services-text">
            At BADANIX, we leverage cutting-edge digital technology to
            revolutionize healthcare delivery.
          </p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}

      <section className="bdx-services-grid" id="services">
        <div className="container">
          <div className="row g-4">
            {/* Card 1 */}

            <div className="col-lg-4 col-md-6">
              <div className="bdx-service-card">
                <img
                  src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80"
                  className="bdx-service-image"
                  alt="Telemedicine"
                />

                <div className="bdx-service-content">
                  <h4>Telemedicine & Remote Healthcare</h4>

                  <ul>
                    <li>
                      Seamless virtual consultations with licensed healthcare
                      professionals.
                    </li>

                    <li>
                      Remote patient monitoring with real-time medical
                      feedback.
                    </li>

                    <li>
                      24/7 access to medical advice and follow-ups from the
                      comfort of home.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 2 */}

            <div className="col-lg-4 col-md-6">
              <div className="bdx-service-card">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80"
                  className="bdx-service-image"
                  alt="EHR"
                />

                <div className="bdx-service-content">
                  <h4>Electronic Health Records (EHR) Management</h4>

                  <ul>
                    <li>Secure cloud-based medical record repository.</li>

                    <li>
                      Centralized patient history accessible across healthcare
                      facilities.
                    </li>

                    <li>
                      Fast retrieval of laboratory reports and prescriptions.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 3 */}

            <div className="col-lg-4 col-md-6">
              <div className="bdx-service-card">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80"
                  className="bdx-service-image"
                  alt="Personalized Care"
                />

                <div className="bdx-service-content">
                  <h4>Personalized e-Medicine & Genomic Care</h4>

                  <ul>
                    <li>
                      Tailored treatment plans using digital health insights.
                    </li>

                    <li>AI-assisted healthcare recommendations.</li>

                    <li>Medication plans personalized for every patient.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 4 */}

            <div className="col-lg-4 col-md-6">
              <div className="bdx-service-card">
                <img
                  src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=900&q=80"
                  className="bdx-service-image"
                  alt="AI Diagnostics"
                />

                <div className="bdx-service-content">
                  <h4>AI-powered Diagnostics & Wearable Support</h4>

                  <ul>
                    <li>AI-driven clinical decision support.</li>

                    <li>
                      Continuous monitoring using smart wearable devices.
                    </li>

                    <li>Predictive alerts for health risks.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 5 */}

            <div className="col-lg-4 col-md-6">
              <div className="bdx-service-card">
                <img
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80"
                  className="bdx-service-image"
                  alt="Appointments"
                />

                <div className="bdx-service-content">
                  <h4>Online Appointment Scheduling & Virtual Visits</h4>

                  <ul>
                    <li>Easy appointment booking.</li>

                    <li>
                      Virtual consultations with healthcare providers.
                    </li>

                    <li>Automated appointment reminders.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 6 */}

            <div className="col-lg-4 col-md-6">
              <div className="bdx-service-card">
                <img
                  src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=900&q=80"
                  className="bdx-service-image"
                  alt="Prescription"
                />

                <div className="bdx-service-content">
                  <h4>Digital Prescription & Medication Management</h4>

                  <ul>
                    <li>Electronic prescriptions.</li>

                    <li>Medication reminders and refill alerts.</li>

                    <li>Connected pharmacy integration.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 7 */}

            <div className="col-lg-4 col-md-6">
              <div className="bdx-service-card">
                <img
                  src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=900&q=80"
                  className="bdx-service-image"
                  alt="Remote Monitoring"
                />

                <div className="bdx-service-content">
                  <h4>Advanced Remote Monitoring Solutions</h4>

                  <ul>
                    <li>Real-time monitoring of vital signs.</li>

                    <li>Automatic emergency alerts.</li>

                    <li>Health trend analytics dashboard.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 8 */}

            <div className="col-lg-4 col-md-6">
              <div className="bdx-service-card">
                <img
                  src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=900&q=80"
                  className="bdx-service-image"
                  alt="Health Education"
                />

                <div className="bdx-service-content">
                  <h4>Health Education, Awareness & Wellness Programs</h4>

                  <ul>
                    <li>Interactive healthcare education.</li>

                    <li>Mental wellness and nutrition resources.</li>

                    <li>Community awareness initiatives.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 9 */}

            <div className="col-lg-4 col-md-6">
              <div className="bdx-service-card">
                <img
                  src="https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=900&q=80"
                  className="bdx-service-image"
                  alt="Wearables"
                />

                <div className="bdx-service-content">
                  <h4>Wearable Device Integration & Data Sync</h4>

                  <ul>
                    <li>Connect fitness trackers and smartwatches.</li>

                    <li>Real-time health synchronization.</li>

                    <li>
                      Actionable analytics for healthier lifestyles.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="bdx-services-cta">
        <div className="container">
          <div className="bdx-services-cta-box">
            <h2>Ready to Transform Healthcare?</h2>

            <p>
              Join healthcare providers and organizations embracing the future
              of digital healthcare with BADANIX.
            </p>

            <a href="/contact" className="bdx-services-btn">
              Contact Us Today
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;