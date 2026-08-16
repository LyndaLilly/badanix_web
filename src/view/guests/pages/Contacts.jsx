import "../../../assets/css/contact.css";

const Contacts = () => {
  return (
    <main className="bdx-contact-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bdx-contact-hero">

        <div className="bdx-contact-hero-pattern"></div>

        <div className="bdx-contact-container">

          <a href="/" className="bdx-contact-back">
            <span>←</span>
            Back to Home
          </a>

          <div className="bdx-contact-hero-content">

            <div className="bdx-contact-hero-label">
              <span></span>
              GET IN TOUCH
            </div>

            <h1>
              Let's Start a
              <strong> Conversation.</strong>
            </h1>

            <p>
              Whether you need support, have a question, or want to
              build something meaningful with BADANIX, our team is
              ready to hear from you.
            </p>

            <div className="bdx-contact-hero-points">

              <div>
                <span>✓</span>
                Quick response
              </div>

              <div>
                <span>✓</span>
                Dedicated support
              </div>

              <div>
                <span>✓</span>
                Partnership opportunities
              </div>

            </div>

          </div>

        </div>

        <div className="bdx-contact-hero-shape bdx-contact-shape-one"></div>
        <div className="bdx-contact-hero-shape bdx-contact-shape-two"></div>

      </section>


      {/* =====================================================
          CONTACT INTRO
      ===================================================== */}

      <section className="bdx-contact-directory">

        <div className="bdx-contact-container">

          <div className="bdx-contact-section-heading">

            <div>
              <span className="bdx-contact-mini-label">
                CONTACT DIRECTORY
              </span>

              <h2>
                We're here to
                <span> help.</span>
              </h2>
            </div>

            <p>
              Choose the department that best matches your enquiry
              and connect directly with the right BADANIX team.
            </p>

          </div>


          {/* =================================================
              CONTACT GRID
          ================================================= */}

          <div className="bdx-contact-grid">

            {/* GENERAL */}

            <article className="bdx-contact-card">

              <div className="bdx-contact-card-top">

                <div className="bdx-contact-card-icon">
                  <span>✉</span>
                </div>

                <span className="bdx-contact-card-number">
                  01
                </span>

              </div>

              <div className="bdx-contact-card-content">

                <span className="bdx-contact-card-label">
                  GENERAL
                </span>

                <h3>
                  General Inquiries
                </h3>

                <p>
                  Have a question about BADANIX, our platform,
                  services or how we can help?
                </p>

              </div>

              <div className="bdx-contact-card-footer">

                <div>
                  <small>Email us</small>

                  <a href="mailto:info@badanix.com">
                    info@badanix.com
                  </a>
                </div>

                <a
                  href="mailto:info@badanix.com"
                  className="bdx-contact-arrow"
                >
                  →
                </a>

              </div>

            </article>


            {/* SUPPORT */}

            <article className="bdx-contact-card bdx-contact-card-featured">

              <div className="bdx-contact-card-top">

                <div className="bdx-contact-card-icon">
                  <span>?</span>
                </div>

                <span className="bdx-contact-card-number">
                  02
                </span>

              </div>

              <div className="bdx-contact-card-content">

                <span className="bdx-contact-card-label">
                  SUPPORT
                </span>

                <h3>
                  Customer Support
                </h3>

                <p>
                  Experiencing a problem or need assistance with
                  one of our digital healthcare services?
                </p>

              </div>

              <div className="bdx-contact-card-footer">

                <div>
                  <small>Support team</small>

                  <a href="mailto:support@badanix.com">
                    support@badanix.com
                  </a>
                </div>

                <a
                  href="mailto:support@badanix.com"
                  className="bdx-contact-arrow"
                >
                  →
                </a>

              </div>

            </article>


            {/* PARTNERSHIPS */}

            <article className="bdx-contact-card bdx-contact-partnership-card">

              <div className="bdx-contact-card-top">

                <div className="bdx-contact-card-icon">
                  <span>↗</span>
                </div>

                <span className="bdx-contact-card-number">
                  03
                </span>

              </div>

              <div className="bdx-contact-card-content">

                <span className="bdx-contact-card-label">
                  PARTNERSHIPS
                </span>

                <h3>
                  Let's Build Together
                </h3>

                <p>
                  Looking to collaborate, advertise or bring your
                  healthcare organization onto BADANIX?
                </p>

              </div>

              <div className="bdx-contact-card-footer">

                <div>
                  <small>Partnerships</small>

                  <a href="mailto:partnerships@badanix.com">
                    partnerships@badanix.com
                  </a>
                </div>

                <a
                  href="mailto:partnerships@badanix.com"
                  className="bdx-contact-arrow"
                >
                  →
                </a>

              </div>

            </article>

          </div>

        </div>

      </section>


      {/* =====================================================
          WEBSITE / QUICK INFO
      ===================================================== */}

      <section className="bdx-contact-info-section">

        <div className="bdx-contact-container">

          <div className="bdx-contact-info-box">

            <div className="bdx-contact-info-main">

              <span className="bdx-contact-mini-label">
                MORE FROM BADANIX
              </span>

              <h2>
                One platform.
                <br />
                <span>Better connected healthcare.</span>
              </h2>

              <p>
                Explore BADANIX and discover how our digital healthcare
                ecosystem connects patients, healthcare professionals
                and institutions.
              </p>

            </div>


            <div className="bdx-contact-info-links">

              <a
                href="https://www.badanix.com"
                target="_blank"
                rel="noreferrer"
                className="bdx-contact-info-link"
              >

                <span className="bdx-contact-link-icon">
                  ↗
                </span>

                <span>
                  <small>VISIT WEBSITE</small>
                  <strong>www.badanix.com</strong>
                </span>

              </a>


              <a
                href="/services"
                className="bdx-contact-info-link"
              >

                <span className="bdx-contact-link-icon">
                  →
                </span>

                <span>
                  <small>EXPLORE</small>
                  <strong>Our Services</strong>
                </span>

              </a>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="bdx-contact-cta">

        <div className="bdx-contact-container">

          <div className="bdx-contact-cta-inner">

            <div className="bdx-contact-cta-decoration"></div>

            <div className="bdx-contact-cta-content">

              <span className="bdx-contact-cta-label">
                READY WHEN YOU ARE
              </span>

              <h2>
                Have something
                <br />
                <span>to talk about?</span>
              </h2>

              <p>
                From healthcare support to strategic partnerships,
                we're always open to meaningful conversations.
              </p>

            </div>

            <a
              href="mailto:info@badanix.com"
              className="bdx-contact-cta-button"
            >
              Contact Our Team
              <span>→</span>
            </a>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Contacts;