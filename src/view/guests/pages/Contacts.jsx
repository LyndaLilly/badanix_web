import "../../../assets/css/contact.css";

const Contacts = () => {
  return (
    <>
      {/* ================= HERO ================= */}

      <section className="bdx-contact-hero">
        <div className="bdx-contact-overlay"></div>

        <div className="container bdx-contact-hero-content">

          <a href="/" className="bdx-contact-back">
            ← Back to Home
          </a>

          <div className="row justify-content-center">

            <div className="col-lg-10 text-center">

              <h1 className="bdx-contact-title">
                Contact Us
              </h1>

              <p className="bdx-contact-text">
                We'd love to hear from you! Whether you have inquiries,
                need support, or want to explore partnership opportunities,
                feel free to reach out. Our team is here to assist you and
                provide the best solutions for your needs.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CONTACT DETAILS ================= */}

      <section className="bdx-contact-section">

        <div className="container">

          <div className="text-center mb-5">

            <span className="bdx-contact-tag">
              Get in Touch
            </span>

            <h2 className="bdx-contact-heading">
              We're Always Ready to Help
            </h2>

            <p className="bdx-contact-subtext">
              Choose the appropriate department below and our team will
              respond as quickly as possible.
            </p>

          </div>

          <div className="row g-4">

            {/* General */}

            <div className="col-lg-4 col-md-6">

              <div className="bdx-contact-card">

                <div className="bdx-contact-icon">
                  📩
                </div>

                <h4>General Inquiries</h4>

                <p>
                  For general questions about BADANIX Digital Healthcare.
                </p>

                <div className="bdx-contact-info">

                  <strong>Email</strong>

                  <a href="mailto:info@badanix.com">
                    info@badanix.com
                  </a>

                </div>

                <div className="bdx-contact-info">

                  <strong>Website</strong>

                  <a
                    href="https://www.badanix.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.badanix.com
                  </a>

                </div>

              </div>

            </div>

            {/* Support */}

            <div className="col-lg-4 col-md-6">

              <div className="bdx-contact-card">

                <div className="bdx-contact-icon">
                  💬
                </div>

                <h4>Customer Support</h4>

                <p>
                  For product support, service requests or troubleshooting.
                </p>

                <div className="bdx-contact-info">

                  <strong>Support Email</strong>

                  <a href="mailto:support@badanix.com">
                    support@badanix.com
                  </a>

                </div>

              </div>

            </div>

            {/* Partnerships */}

            <div className="col-lg-4 col-md-6">

              <div className="bdx-contact-card">

                <div className="bdx-contact-icon">
                  🤝
                </div>

                <h4>
                  Partnerships, Collaborations & Adverts
                </h4>

                <p>
                  Interested in partnering with us to build innovative
                  healthcare solutions?
                </p>

                <div className="bdx-contact-info">

                  <strong>Email</strong>

                  <a href="mailto:partnerships@badanix.com">
                    partnerships@badanix.com
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="bdx-contact-cta">

        <div className="container">

          <div className="bdx-contact-cta-box">

            <h2>
              Let's Build Better Healthcare Together
            </h2>

            <p>
              Whether you're a healthcare provider, organization or
              technology partner, BADANIX is ready to help you transform
              healthcare through innovative digital solutions.
            </p>

            <a
              href="mailto:info@badanix.com"
              className="bdx-contact-btn"
            >
              Contact Our Team
            </a>

          </div>

        </div>

      </section>

    </>
  );
};

export default Contacts;