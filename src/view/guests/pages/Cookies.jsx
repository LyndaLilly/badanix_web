import "../../../assets/css/cookies.css";

const Cookies = () => {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="bdx-policy-hero">
        <div className="bdx-policy-hero-overlay"></div>

        <div className="container bdx-policy-hero-content">
          <a href="/" className="bdx-policy-back">
            ← Back to Home
          </a>

          <div className="bdx-policy-hero-inner">
            <span className="bdx-policy-hero-label">
              BADANIX DIGITAL HEALTHCARE
            </span>

            <h1>Cookies Policy</h1>

            <p>
              How we use cookies and similar technologies to improve your
              experience, enhance our services, and keep our website running
              smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* ================= POLICY CONTENT ================= */}
      <main className="bdx-policy-page">
        <div className="container">
          <div className="row g-5">

            {/* ================= SIDEBAR ================= */}
            <div className="col-lg-3">
              <aside className="bdx-policy-sidebar">

                <div className="bdx-policy-sidebar-title">
                  On This Page
                </div>

                <a href="#introduction">
                  Introduction
                </a>

                <a href="#what-are-cookies">
                  What are Cookies?
                </a>

                <a href="#types">
                  Types of Cookies
                </a>

                <a href="#how-we-use">
                  How We Use Cookies
                </a>

                <a href="#managing">
                  Managing Cookies
                </a>

                <a href="#third-party">
                  Third-Party Cookies
                </a>

                <a href="#updates">
                  Updates to this Policy
                </a>

                <a href="#contact">
                  Contact Us
                </a>

              </aside>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="col-lg-9">
              <article className="bdx-policy-content">

                {/* Introduction */}
                <section
                  id="introduction"
                  className="bdx-policy-section bdx-policy-introduction"
                >
                  <span className="bdx-policy-section-number">
                    COOKIE POLICY
                  </span>

                  <h2>Welcome to BADANIX Digital Healthcare</h2>

                  <p>
                    Welcome to BADANIX Digital Healthcare! This Cookie Policy
                    explains how we use cookies and similar technologies on
                    our website to enhance your experience, improve our
                    services, and ensure smooth operation.
                  </p>

                  <p>
                    By continuing to use our website, you agree to our use of
                    cookies as described in this policy.
                  </p>
                </section>

                {/* What are Cookies */}
                <section
                  id="what-are-cookies"
                  className="bdx-policy-section"
                >
                  <div className="bdx-policy-section-heading">
                    <span>01</span>
                    <h2>What are Cookies?</h2>
                  </div>

                  <p>
                    Cookies are small text files that websites store on your
                    device (computer, smartphone, tablet) to track information
                    about your interaction with the website.
                  </p>

                  <p>
                    They help websites function properly, provide personalized
                    experiences, and gather analytics to enhance performance.
                  </p>
                </section>

                {/* Types */}
                <section
                  id="types"
                  className="bdx-policy-section"
                >
                  <div className="bdx-policy-section-heading">
                    <span>02</span>
                    <h2>Types of Cookies We Use</h2>
                  </div>

                  <div className="bdx-cookie-list">

                    {/* Necessary */}
                    <div className="bdx-cookie-item">
                      <div className="bdx-cookie-number">
                        A
                      </div>

                      <div>
                        <h3>Strictly Necessary Cookies</h3>

                        <p>
                          These cookies are essential for the basic
                          functionality of our website. They enable features
                          like secure logins, load balancing, and page
                          navigation.
                        </p>

                        <p>
                          Without these cookies, certain services on the site
                          may not work.
                        </p>

                        <div className="bdx-cookie-example">
                          <strong>Example:</strong>
                          <span>Login authentication cookies</span>
                        </div>
                      </div>
                    </div>

                    {/* Analytics */}
                    <div className="bdx-cookie-item">
                      <div className="bdx-cookie-number">
                        B
                      </div>

                      <div>
                        <h3>Performance and Analytics Cookies</h3>

                        <p>
                          These cookies collect anonymous data to understand
                          how users interact with our site, including which
                          pages are visited and any errors encountered.
                        </p>

                        <p>
                          This helps us improve performance and usability.
                        </p>

                        <div className="bdx-cookie-example">
                          <strong>Example:</strong>
                          <span>Google Analytics</span>
                        </div>
                      </div>
                    </div>

                    {/* Functional */}
                    <div className="bdx-cookie-item">
                      <div className="bdx-cookie-number">
                        C
                      </div>

                      <div>
                        <h3>Functional Cookies</h3>

                        <p>
                          These cookies allow us to remember your preferences,
                          such as language or region settings, for a more
                          personalized experience.
                        </p>

                        <div className="bdx-cookie-example">
                          <strong>Example:</strong>
                          <span>Remembering your login credentials</span>
                        </div>
                      </div>
                    </div>

                    {/* Advertising */}
                    <div className="bdx-cookie-item">
                      <div className="bdx-cookie-number">
                        D
                      </div>

                      <div>
                        <h3>Targeting and Advertising Cookies</h3>

                        <p>
                          These cookies track your online activities to
                          deliver personalized ads and measure the
                          effectiveness of our campaigns.
                        </p>

                        <p>
                          They may be placed by third-party advertisers with
                          our permission.
                        </p>

                        <div className="bdx-cookie-example">
                          <strong>Example:</strong>
                          <span>Facebook Pixel</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* How We Use */}
                <section
                  id="how-we-use"
                  className="bdx-policy-section"
                >
                  <div className="bdx-policy-section-heading">
                    <span>03</span>
                    <h2>How We Use Cookies</h2>
                  </div>

                  <div className="bdx-policy-check-list">

                    <div>
                      <span>✓</span>
                      <p>
                        To provide essential website functionality
                      </p>
                    </div>

                    <div>
                      <span>✓</span>
                      <p>
                        To improve user experience and site performance
                      </p>
                    </div>

                    <div>
                      <span>✓</span>
                      <p>
                        To gather analytics for internal purposes
                      </p>
                    </div>

                    <div>
                      <span>✓</span>
                      <p>
                        To deliver personalized content and advertisements
                      </p>
                    </div>

                  </div>
                </section>

                {/* Managing */}
                <section
                  id="managing"
                  className="bdx-policy-section"
                >
                  <div className="bdx-policy-section-heading">
                    <span>04</span>
                    <h2>Managing Cookies</h2>
                  </div>

                  <p>
                    You can manage or delete cookies through your browser
                    settings. Most browsers allow you to block or delete
                    cookies, but please note that certain parts of our site
                    may not function properly if you disable them.
                  </p>

                  <div className="bdx-policy-note">
                    <div className="bdx-policy-note-icon">
                      ⚙
                    </div>

                    <div>
                      <h4>Manage Your Preferences</h4>

                      <p>
                        You can control how cookies are stored on your device
                        through your browser settings.
                      </p>

                      <a
                        href="http://www.allaboutcookies.org"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Learn more about managing cookies →
                      </a>
                    </div>
                  </div>
                </section>

                {/* Third Party */}
                <section
                  id="third-party"
                  className="bdx-policy-section"
                >
                  <div className="bdx-policy-section-heading">
                    <span>05</span>
                    <h2>Third-Party Cookies</h2>
                  </div>

                  <p>
                    Some of the cookies used on our website may be set by
                    third parties, such as analytics providers or advertising
                    partners.
                  </p>

                  <p>
                    We do not control these cookies and recommend reviewing
                    the cookie policies of the respective third parties for
                    more information.
                  </p>
                </section>

                {/* Updates */}
                <section
                  id="updates"
                  className="bdx-policy-section"
                >
                  <div className="bdx-policy-section-heading">
                    <span>06</span>
                    <h2>Updates to this Policy</h2>
                  </div>

                  <p>
                    We may update this Cookie Policy from time to time to
                    reflect changes in our practices or for legal and
                    regulatory reasons.
                  </p>

                  <p>
                    Please review this page periodically to stay informed
                    about how we use cookies.
                  </p>
                </section>

                {/* Contact */}
                <section
                  id="contact"
                  className="bdx-policy-contact"
                >
                  <div className="bdx-policy-contact-content">

                    <span className="bdx-policy-contact-label">
                      HAVE QUESTIONS?
                    </span>

                    <h2>Contact Us</h2>

                    <p>
                      If you have any questions or concerns about this Cookie
                      Policy, please contact us at:
                    </p>

                    <div className="bdx-policy-contact-details">
                      <strong>
                        BADANIX Digital Healthcare
                      </strong>

                      <a href="mailto:info@badanix.com">
                        info@badanix.com
                      </a>
                    </div>

                  </div>
                </section>

              </article>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default Cookies;