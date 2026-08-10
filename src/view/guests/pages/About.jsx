import "../../../assets/css/about.css";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>

        <div className="container hero-content">
          <a href="/" className="back-home">
            ← Back to Home
          </a>

          <div className="hero-title">
            <h1>About Us</h1>
          </div>
        </div>
      </section>

      {/* About Intro */}
      <section className="about-intro py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h2 className="section-title">
                About BADANIX Digital Healthcare
              </h2>

              <p className="section-text mt-4">
                At BADANIX Digital Healthcare, we are committed in transforming
                to e-healthcare through the power of technology. Our mission is
                to deliver innovative, accessible, and reliable digital
                healthcare solutions that enhance well-being, streamline
                e-clinical workflows, and empower e-healthcare providers to
                offer high-quality care.
              </p>

              <p className="section-text mt-4">
                With a focus on the future, BADANIX bridges the gap between
                cutting-edge technology and compassionate care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left Image */}
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80"
                alt="Doctor consultation"
                className="img-fluid values-image"
              />
            </div>

            {/* Right Content */}
            <div className="col-lg-6">
              <h2 className="core-title">Our Core Values</h2>

              <ul className="values-list">
                <li>
                  <strong>Innovation:</strong> Harnessing the latest
                  technologies to develop groundbreaking e-healthcare solutions.
                </li>

                <li>
                  <strong>Compassion:</strong> Our solutions prioritize the
                  e-patient experience, ensuring that technology enhances
                  empathy in care delivery.
                </li>

                <li>
                  <strong>Accessibility:</strong> We believe that everyone
                  deserves access to quality e-healthcare, regardless of
                  location or financial status globally.
                </li>

                <li>
                  <strong>Integrity:</strong> Transparency, privacy, and data
                  security are at the core of everything we do.
                </li>

                <li>
                  <strong>Collaboration:</strong> We work closely with
                  e-healthcare providers, e-patients, and technology partners to
                  create impactful solutions.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="vision-mission py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">WHO WE ARE</span>
            <h2 className="section-heading">Our Purpose</h2>
            <p className="section-subtitle">
              Building the future of digital healthcare through innovation,
              accessibility and compassionate care.
            </p>
          </div>

          <div className="row g-4">
            {/* Vision */}
            <div className="col-lg-6">
              <div className="purpose-card h-100">
                <div className="purpose-icon">👁️</div>

                <h3>Our Vision</h3>

                <p>
                  To become a global leader in digital healthcare, reshaping the
                  delivery of medical services through seamless,
                  e-patient-centered solutions and enabling healthier lives for
                  all.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="col-lg-6">
              <div className="purpose-card h-100">
                <div className="purpose-icon">🚀</div>

                <h3>Our Mission</h3>

                <p>
                  We aim to empower e-healthcare providers and e-patients with
                  intuitive digital tools that enhance accessibility,
                  transparency, and efficiency in e-healthcare delivery. By
                  integrating advanced technologies into every touchpoint of
                  care, we are committed to making high-quality e-healthcare
                  services available and affordable to all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}

      <section className="offer-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">OUR SERVICES</span>

            <h2 className="section-heading">What We Offer</h2>

            <p className="section-subtitle">
              Innovative digital healthcare solutions designed to improve
              patient care, streamline operations and empower healthcare
              providers.
            </p>
          </div>

          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="offer-card">
                <img
                  src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80"
                  className="offer-image"
                  alt=""
                />

                <div className="offer-body">
                  <div className="offer-icon">💻</div>

                  <h4>Telemedicine Services</h4>

                  <p>
                    BADANIX offers secure, virtual consultations with licensed
                    e-healthcare professionals, enabling e-patients to access
                    care from the comfort of their homes. Our telemedicine
                    platform supports video consultations, remote monitoring,
                    and e-prescriptions, ensuring that care is just a click
                    away.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="offer-card">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80"
                  className="offer-image"
                  alt=""
                />

                <div className="offer-body">
                  <div className="offer-icon">📋</div>

                  <h4>Electronic Health Records (EHR)</h4>

                  <p>
                    Our EHR solution enables healthcare facilities to store,
                    manage, and access e-patient data efficiently. It improves
                    clinical decision-making through real-time access to medical
                    histories, lab results, and medication records, ensuring
                    seamless coordination across departments and providers.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-lg-4 col-md-6">
              <div className="offer-card">
                <img
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80"
                  className="offer-image"
                  alt=""
                />

                <div className="offer-body">
                  <div className="offer-icon">🤖</div>

                  <h4>AI-powered Diagnostics and Monitoring</h4>

                  <p>
                    With Artificial Intelligence integrated into our diagnostic
                    tools, e-healthcare providers can make faster and more
                    accurate diagnoses. Our AI algorithms assist in predicting
                    e-health risks, interpreting medical images, and monitoring
                    chronic conditions, reducing human error and enhancing care
                    quality.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-lg-4 col-md-6">
              <div className="offer-card">
                <img
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80"
                  className="offer-image"
                  alt=""
                />

                <div className="offer-body">
                  <div className="offer-icon">📱</div>

                  <h4>E-Health Management Apps</h4>

                  <p>
                    BADANIX offers mobile apps that help e-patients track their
                    e-health metrics, book appointments, manage prescriptions,
                    and stay informed through personalized e-health content.
                    These apps empower users to take control of their well-being
                    and maintain healthier lifestyles.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="col-lg-4 col-md-6">
              <div className="offer-card">
                <img
                  src="https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=900&q=80"
                  className="offer-image"
                  alt=""
                />

                <div className="offer-body">
                  <div className="offer-icon">🏥</div>

                  <h4>Hospital Management Systems (HMS)</h4>

                  <p>
                    Our advanced HMS simplifies administrative tasks such as
                    billing, inventory management, and e-patient scheduling.
                    With our solutions, e-healthcare institutions can improve
                    operational efficiency, reduce costs, and ensure better
                    e-patient outcomes.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="col-lg-4 col-md-6">
              <div className="offer-card">
                <img
                  src="https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=900&q=80"
                  className="offer-image"
                  alt=""
                />

                <div className="offer-body">
                  <div className="offer-icon">⌚</div>

                  <h4>Wearable Technology Integration</h4>

                  <p>
                    We partner with wearable device manufacturers to collect
                    real-time e-health data, including heart rate, blood
                    pressure, and glucose levels etc. This integration supports
                    preventive care and provides valuable insights to
                    e-healthcare professionals for continuous e-patient
                    monitoring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}

<section className="why-badanix py-5">

    <div className="container">

        <div className="why-wrapper">

            <div className="row align-items-center g-5">

                {/* Left */}

                <div className="col-lg-5">

                    <span className="section-badge">
                        WHY CHOOSE US
                    </span>

                    <h2 className="why-title">
                        Why Choose BADANIX?
                    </h2>

                    <p className="why-description">
                        At BADANIX Digital Healthcare, we believe in a future
                        where technology and medicine intersect to create
                        healthier communities.
                    </p>

                    <div className="row g-3 mt-4">

                        <div className="col-6">
                            <div className="stat-box">
                                <h3>24/7</h3>
                                <span>Digital Care</span>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="stat-box">
                                <h3>100%</h3>
                                <span>Secure</span>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="col-lg-7">

                    <div className="row g-4">

                        <div className="col-md-6">
                            <div className="feature-box">
                                ✔ E-Patient-Centered Solutions
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="feature-box">
                                ✔ End-to-End Support
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="feature-box">
                                ✔ Advanced Security Measures
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="feature-box">
                                ✔ Scalable Solutions
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="feature-box">
                                ✔ Global Reach
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="feature-box">
                                ✔ Impactful Change
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <hr className="my-5" />

            <div className="text-center">

                <h2 className="join-title">
                    Join Us in Shaping the Future of E-Healthcare
                </h2>

                <p className="join-text">
                    At BADANIX Digital Healthcare, we believe in a future
                    where technology and medicine intersect to create
                    healthier communities. Whether you're a provider looking
                    to digitize your practice or an e-patient seeking more
                    accessible care, join us on this journey.
                </p>

                <a href="#" className="download-btn">
                    Download Our App
                </a>

            </div>

        </div>

    </div>

</section>
    </>
  );
};

export default About;
