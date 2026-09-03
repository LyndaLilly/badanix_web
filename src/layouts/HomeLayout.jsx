import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../assets/css/home.css";

import logo from "../assets/img/logo2.png"

function HomeLayout() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Give the page enough time to load before revealing the content
    const timer = setTimeout(() => {
      setFadeOut(true);

      // Remove loader after fade animation
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div
          className={`bdx-loader ${fadeOut ? "bdx-loader-fade-out" : ""}`}
        >
          <div className="bdx-loader-background"></div>

          <div className="bdx-loader-content">

            {/* Animated Logo */}
            <div className="bdx-loader-logo-wrapper">

              <div className="bdx-loader-ring bdx-loader-ring-one"></div>

              <div className="bdx-loader-ring bdx-loader-ring-two"></div>

              <div className="bdx-loader-orbit">
                <span></span>
              </div>

              <div className="bdx-loader-logo">
                <img
                  src={logo}
                  alt="BADANIX"
                />
              </div>

            </div>

            {/* Brand */}
            <div className="bdx-loader-brand">
              <h2>BADANIX</h2>

              <span>
                DIGITAL HEALTHCARE
              </span>
            </div>

            {/* Loading text */}
            <div className="bdx-loader-status">
              <span>Connecting you to better healthcare</span>
            </div>

            {/* Loading bar */}
            <div className="bdx-loader-progress">
              <div className="bdx-loader-progress-bar"></div>
            </div>

            {/* Loading dots */}
            <div className="bdx-loader-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>
        </div>
      )}

      <div className="home-page">
        <Navbar />

        <div>
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default HomeLayout;