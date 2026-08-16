import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaUserPlus,
  FaSignInAlt,
  FaUserMd,
  FaHospital,
} from "react-icons/fa";

import "../assets/css/navbarhome.css";
import logo from "../assets/img/badanixlogo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("badanix-nav-menu-active");
    } else {
      document.body.classList.remove("badanix-nav-menu-active");
    }

    return () => {
      document.body.classList.remove("badanix-nav-menu-active");
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setPartnerOpen(false);
  };

  const togglePartner = (e) => {
    e.preventDefault();
    setPartnerOpen((prev) => !prev);
  };

  return (
    <header
      className={`badanix-nav-header ${
        scrolled ? "badanix-nav-scrolled" : ""
      }`}
    >
      <nav className="badanix-nav-container">

        {/* =========================================
            LOGO
        ========================================= */}

        <Link
          to="/"
          className="badanix-nav-logo-link"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="BADANIX"
            className="badanix-nav-logo"
          />
        </Link>


        {/* =========================================
            DESKTOP / MOBILE MENU
        ========================================= */}

        <div
          className={`badanix-nav-menu ${
            menuOpen ? "badanix-nav-menu-open" : ""
          }`}
        >

          {/* =========================================
              NAVIGATION LINKS
          ========================================= */}

          <div className="badanix-nav-links">

            <Link
              to="/about"
              className="badanix-nav-link"
              onClick={closeMenu}
            >
              About Us
            </Link>

            <Link
              to="/contacts"
              className="badanix-nav-link"
              onClick={closeMenu}
            >
              Contact Us
            </Link>

            <Link
              to="/services"
              className="badanix-nav-link"
              onClick={closeMenu}
            >
              Services
            </Link>

            <Link
              to="/testimonial"
              className="badanix-nav-link"
              onClick={closeMenu}
            >
              Testimonials
            </Link>


            {/* =========================================
                PARTNER DROPDOWN
            ========================================= */}

            <div
              className={`badanix-nav-partner ${
                partnerOpen
                  ? "badanix-nav-partner-open"
                  : ""
              }`}
            >

              <button
                type="button"
                className="badanix-nav-link badanix-nav-partner-trigger"
                onClick={togglePartner}
              >
                <span>Partner With Us</span>

                <FaChevronDown />
              </button>


              <div className="badanix-nav-dropdown">

                <Link
                  to="/doctor/register"
                  className="badanix-nav-dropdown-item"
                  onClick={closeMenu}
                >
                  <span className="badanix-nav-dropdown-icon">
                    <FaUserMd />
                  </span>

                  <span className="badanix-nav-dropdown-content">
                    <strong>Register as Doctor</strong>
                    <small>Join our e-specialist network</small>
                  </span>
                </Link>


                <Link
                  to="/institution/register"
                  className="badanix-nav-dropdown-item"
                  onClick={closeMenu}
                >
                  <span className="badanix-nav-dropdown-icon">
                    <FaHospital />
                  </span>

                  <span className="badanix-nav-dropdown-content">
                    <strong>Register as Institution</strong>
                    <small>Partner your healthcare facility</small>
                  </span>
                </Link>

              </div>

            </div>

          </div>


          {/* =========================================
              ACTION BUTTONS
          ========================================= */}

          <div className="badanix-nav-actions">

            <Link
              to="/patient/register"
              className="badanix-nav-register"
              onClick={closeMenu}
            >
              <FaUserPlus />

              <span>
                e-Patient Registration
              </span>
            </Link>


            <Link
              to="/universallogin"
              className="badanix-nav-login"
              onClick={closeMenu}
            >
              <FaSignInAlt />

              <span>
                Login
              </span>
            </Link>

          </div>

        </div>


        {/* =========================================
            MOBILE TOGGLE
        ========================================= */}

        <button
          type="button"
          className={`badanix-nav-toggle ${
            menuOpen ? "badanix-nav-toggle-active" : ""
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </nav>
    </header>
  );
}