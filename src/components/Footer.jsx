import "../assets/css/footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaGooglePlay,
  FaApple,
  FaArrowRight,
} from "react-icons/fa";

import logo from "../assets/img/badanixlogo.png";

export default function Footer() {
  return (
    <>
      {/* =====================================================
          FOOTER CTA
      ===================================================== */}
      <section className="badanix-footer-cta">
        <div className="badanix-footer-cta-glow badanix-footer-cta-glow-one"></div>
        <div className="badanix-footer-cta-glow badanix-footer-cta-glow-two"></div>

        <div className="badanix-footer-container">
          <div className="badanix-footer-cta-content">
            <span className="badanix-footer-cta-label">
              CONNECT WITH US
            </span>

            <h2>
              Let's Build a Healthier
              <span> Future Together</span>
            </h2>

            <p>
              Follow BADANIX on social media to stay updated on healthcare
              innovations, medical tips, events and platform updates.
            </p>

            <div className="badanix-footer-cta-socials">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>

              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>

              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}
      <footer className="badanix-footer">
        <div className="badanix-footer-background-shape badanix-footer-shape-one"></div>
        <div className="badanix-footer-background-shape badanix-footer-shape-two"></div>

        <div className="badanix-footer-container">
          <div className="badanix-footer-main">

            {/* =================================================
                BRAND
            ================================================= */}
            <div className="badanix-footer-brand">

              <a href="/" className="badanix-footer-logo-link">
                <img
                  src={logo}
                  alt="BADANIX"
                  className="badanix-footer-logo"
                />
              </a>

              <p className="badanix-footer-about">
                Building innovative digital healthcare solutions that connect
                patients, doctors, pharmacies, laboratories and hospitals in
                one secure ecosystem.
              </p>

              {/* App buttons */}
              <div className="badanix-footer-apps">

                <a href="#" className="badanix-footer-app-button">
                  <FaGooglePlay className="badanix-footer-app-icon" />

                  <span className="badanix-footer-app-content">
                    <small>GET IT ON</small>
                    <strong>Google Play</strong>
                  </span>
                </a>

                <a href="#" className="badanix-footer-app-button">
                  <FaApple className="badanix-footer-app-icon" />

                  <span className="badanix-footer-app-content">
                    <small>DOWNLOAD ON THE</small>
                    <strong>App Store</strong>
                  </span>
                </a>

              </div>
            </div>


            {/* =================================================
                COMPANY
            ================================================= */}
            <div className="badanix-footer-links-column">

              <h3>Company</h3>

              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>

                <li>
                  <a href="#">Our Services</a>
                </li>

                <li>
                  <a href="#">Testimonials</a>
                </li>

                <li>
                  <a href="#">Partner With Us</a>
                </li>
              </ul>

            </div>


            {/* =================================================
                USEFUL LINKS
            ================================================= */}
            <div className="badanix-footer-links-column">

              <h3>Useful Links</h3>

              <ul>
              

                <li>
                  <a href="/privacypolicy">Privacy Policy</a>
                </li>

                <li>
                  <a href="/terms">Terms & Conditions</a>
                </li>

                  <li>
                  <a href="/cookies">Cookies Policy</a>
                </li>

                <li>
                  <a href="/contacts">Contact Us</a>
                </li>
              </ul>

            </div>


            {/* =================================================
                NEWSLETTER
            ================================================= */}
            <div className="badanix-footer-newsletter">

              <div className="badanix-footer-newsletter-heading">
                <span className="badanix-footer-newsletter-icon">
                  <FaEnvelope />
                </span>

                <div>
                  <h3>Stay Updated</h3>

                  <span>
                    Healthcare news & updates
                  </span>
                </div>
              </div>

              <p>
                Subscribe to receive healthcare news, platform updates and
                exclusive announcements.
              </p>

              <form
                className="badanix-footer-newsletter-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                />

                <button type="submit">
                  <span>Subscribe</span>
                  <FaArrowRight />
                </button>
              </form>

              <small className="badanix-footer-newsletter-note">
                We respect your privacy. No spam.
              </small>

            </div>

          </div>


          {/* =================================================
              FOOTER DIVIDER
          ================================================= */}
          <div className="badanix-footer-divider"></div>


          {/* =================================================
              FOOTER BOTTOM
          ================================================= */}
          <div className="badanix-footer-bottom">

            <p>
              © {new Date().getFullYear()} BADANIX Digital Healthcare.
              All Rights Reserved.
            </p>

            <div className="badanix-footer-contact">

              <a href="mailto:support@badanix.com">
                <FaEnvelope />
                <span>support@badanix.com</span>
              </a>

              <a href="tel:+2340000000000">
                <FaPhoneAlt />
                <span>Contact Support</span>
              </a>

            </div>


            <div className="badanix-footer-bottom-socials">

              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>

              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>

              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>

            </div>

          </div>

        </div>
      </footer>
    </>
  );
}