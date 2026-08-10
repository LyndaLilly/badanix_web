import { Link } from "react-router-dom";
import "../assets/css/home.css";
import logo from "../assets/img/badanixlogo.png";
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg badanix-navbar sticky-top">
      <div className="container">
        {/* Logo */}

        <Link className="navbar-brand" to="/">
          <img src={logo} alt="BADANIX" className="logo" />
        </Link>

        {/* Mobile Toggle */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarMenu"
        >
          <ul className="navbar-nav align-items-lg-center">
            <li className="nav-item">
              <a href="about" className="nav-link">
                About Us
              </a>
            </li>

            <li className="nav-item">
              <a href="contacts" className="nav-link">
                Contact Us
              </a>
            </li>

            <li className="nav-item">
              <a href="services" className="nav-link">
                Services
              </a>
            </li>

            <li className="nav-item">
              <a href="testimonial" className="nav-link">
                Testimonials
              </a>
            </li>

            <li className="nav-item dropdown partner-dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                role="button"
              >
                Partner With Us
              </Link>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/doctor/register">
                    👨‍⚕️ Register as Doctor
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/institution/register">
                    🏥 Register as Institution
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="ms-lg-auto navbar-buttons">
            <Link to="/patient/register" className="btn btn-get-started">
              e-Patient Registration
            </Link>

            <Link to="/universallogin" className="btn btn-login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
