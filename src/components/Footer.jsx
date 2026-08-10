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
} from "react-icons/fa";

export default function Footer() {
  return (
    <>
      {/* CTA */}
      <section className="footer-cta">
        <div className="container text-center">
          <span className="section-tag">CONNECT WITH US</span>

          <h2>Let's Build a Healthier Future Together</h2>

          <p>
            Follow BADANIX on social media to stay updated on healthcare
            innovations, medical tips, events and platform updates.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row gy-5">
            {/* Logo */}
            <div className="col-lg-4">
              <img src="/logo.png" alt="BADANIX" className="footer-logo" />

              <p className="footer-about">
                Building innovative digital healthcare solutions that connect
                patients, doctors, pharmacies, laboratories and hospitals in one
                secure ecosystem.
              </p>

              <div className="store-buttons">
                <a href="#" className="store-btn">
                  <FaGooglePlay className="store-icon" />

                  <div>
                    <small>GET IT ON</small>
                    <span>Google Play</span>
                  </div>
                </a>

                <a href="#" className="store-btn">
                  <FaApple className="store-icon" />

                  <div>
                    <small>Download on the</small>
                    <span>App Store</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Company */}

            <div className="col-lg-2 col-md-4">
              <h5>Company</h5>

              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Testimonials</a>
                </li>
                <li>
                  <a href="#">Partner With Us</a>
                </li>
              </ul>
            </div>

            {/* Links */}

            <div className="col-lg-2 col-md-4">
              <h5>Useful Links</h5>

              <ul>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}

            <div className="col-lg-4">
              <h5>Stay Updated</h5>

              <p>
                Subscribe to receive healthcare news, platform updates and
                exclusive announcements.
              </p>

              <div className="newsletter">
                <input type="email" placeholder="Enter your email" />

                <button>Subscribe</button>
              </div>
            </div>
          </div>

          <hr />

          <div className="footer-bottom">
            <div className="socials">
              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaTwitter />
              </a>

              <a href="#">
                <FaLinkedinIn />
              </a>

              <a href="#">
                <FaEnvelope />
              </a>

              <a href="#">
                <FaPhoneAlt />
              </a>
            </div>

            <p>
              © {new Date().getFullYear()} BADANIX Digital Healthcare. All
              Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
