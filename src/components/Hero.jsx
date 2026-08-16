import "../assets/css/hero.css";

import { useEffect, useRef, useState } from "react";

import {
  FaGooglePlay,
  FaApple,
  FaUserMd,
  FaHospital,
  FaShieldAlt,
  FaHeartbeat,
  FaCheckCircle,
  FaCalendarAlt,
  FaFileMedical,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import badanixApp from "../assets/img/img1.jpg";
import badanixCare from "../assets/img/img63.jpg";
import badanixDoctor from "../assets/img/img28.jpg";


const slides = [
  {
    id: 1,

    tag: "DIGITAL HEALTHCARE PLATFORM",

    title: (
      <>
        Your Health.
        <br />
        <span>Our Priority.</span>
      </>
    ),

    text:
      "Welcome to BADANIX, your trusted digital healthcare platform connecting you with quality healthcare services from the comfort of your home.",

    image: badanixCare,

    // Background image for this slide
    bgImage: badanixCare,

    topIcon: <FaHeartbeat />,
    topTitle: "Healthcare",
    topText: "Made for you",

    bottomIcon: <FaShieldAlt />,
    bottomTitle: "Trusted Care",
    bottomText: "Your health matters",

    features: [
      [<FaUserMd />, "Trusted Doctors"],
      [<FaHospital />, "Healthcare Institutions"],
      [<FaShieldAlt />, "Secure Platform"],
    ],
  },

  {
    id: 2,

    tag: "CONNECT WITH THE RIGHT DOCTOR",

    title: (
      <>
        Healthcare
        <br />
        <span>Within Reach.</span>
      </>
    ),

    text:
      "Find the right doctor for your needs, explore healthcare professionals, and schedule appointments conveniently whenever and wherever you need care.",

    image: badanixDoctor,

    // Background image for this slide
    bgImage: badanixDoctor,

    topIcon: <FaUserMd />,
    topTitle: "Find a Doctor",
    topText: "Care that fits you",

    bottomIcon: <FaCalendarAlt />,
    bottomTitle: "Easy Booking",
    bottomText: "Schedule with ease",

    features: [
      [<FaUserMd />, "Find Specialists"],
      [<FaCalendarAlt />, "Book Appointments"],
      [<FaHeartbeat />, "Quality Healthcare"],
    ],
  },

  {
    id: 3,

    tag: "YOUR HEALTH, ALL IN ONE PLACE",

    title: (
      <>
        Stay Connected
        <br />
        <span>With Your Health.</span>
      </>
    ),

    text:
      "Keep track of your healthcare journey, appointments, prescriptions and important health information in one secure and convenient platform.",

    image: badanixApp,

    // Background image for this slide
    bgImage: badanixApp,

    topIcon: <FaFileMedical />,
    topTitle: "Health Records",
    topText: "All in one place",

    bottomIcon: <FaCheckCircle />,
    bottomTitle: "Secure EHR",
    bottomText: "Your records protected",

    features: [
      [<FaFileMedical />, "Electronic Health Records"],
      [<FaHeartbeat />, "Track Your Health"],
      [<FaShieldAlt />, "Private & Secure"],
    ],
  },
];


export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);

  const startX = useRef(0);
  const currentX = useRef(0);

  const slideCount = slides.length;


  /* =========================================================
     NEXT
  ========================================================= */

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slideCount - 1 ? 0 : prev + 1
    );
  };


  /* =========================================================
     PREVIOUS
  ========================================================= */

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slideCount - 1 : prev - 1
    );
  };


  /* =========================================================
     AUTO PLAY
  ========================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, []);


  /* =========================================================
     POINTER DOWN
  ========================================================= */

  const handlePointerDown = (e) => {
    startX.current = e.clientX;
    currentX.current = e.clientX;

    setDragging(true);

    e.currentTarget.setPointerCapture?.(e.pointerId);
  };


  /* =========================================================
     POINTER MOVE
  ========================================================= */

  const handlePointerMove = (e) => {
    if (!dragging) return;

    currentX.current = e.clientX;

    const movement = currentX.current - startX.current;

    setDragX(movement);
  };


  /* =========================================================
     POINTER UP
  ========================================================= */

  const handlePointerUp = () => {
    if (!dragging) return;

    const distance = currentX.current - startX.current;

    const threshold = 70;

    setDragging(false);
    setDragX(0);

    if (Math.abs(distance) > threshold) {
      if (distance < 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }
  };


  /* =========================================================
     POINTER CANCEL
  ========================================================= */

  const handlePointerCancel = () => {
    setDragging(false);
    setDragX(0);
  };


  /*
   * Track translation.
   *
   * Each slide occupies 100% of the carousel viewport.
   */

  const translatePercentage = currentSlide * 100;

  const dragPercentage =
    typeof window !== "undefined" && window.innerWidth
      ? (dragX / window.innerWidth) * 100
      : 0;


  return (
    <section className="hero-section">

      {/* =====================================================
          DECORATIONS
      ===================================================== */}

      <div className="hero-decoration hero-decoration-one"></div>

      <div className="hero-decoration hero-decoration-two"></div>

      <div className="hero-decoration hero-decoration-three"></div>


      {/* =====================================================
          CAROUSEL VIEWPORT
      ===================================================== */}

      <div
        className="hero-carousel-viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >

        {/* ===================================================
            TRACK
        =================================================== */}

        <div
          className={`hero-carousel-track ${
            dragging ? "is-dragging" : ""
          }`}
          style={{
            transform: `
              translateX(
                calc(
                  -${translatePercentage}% +
                  ${dragPercentage}%
                )
              )
            `,
          }}
        >

          {slides.map((slide, index) => (

            <div
              className={`hero-carousel-slide ${
                index === currentSlide
                  ? "active"
                  : ""
              }`}
              key={slide.id}
            >

              {/* =================================================
                  SLIDE BACKGROUND IMAGE
              ================================================= */}

              <div
                className="hero-slide-background"
                style={{
                  backgroundImage: `url(${slide.bgImage})`,
                }}
              ></div>


              {/* =================================================
                  DARK/GREEN OVERLAY
              ================================================= */}

              <div className="hero-slide-overlay"></div>


              {/* =================================================
                  EXTRA BACKGROUND GRADIENT
              ================================================= */}

              <div className="hero-slide-gradient"></div>


              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="container position-relative">

                <div className="row align-items-center min-vh-100">


                  {/* =================================================
                      LEFT CONTENT
                  ================================================= */}

                  <div className="col-lg-7">

                    <div className="hero-content">

                      <span className="hero-tag">

                        <FaHeartbeat />

                        {slide.tag}

                      </span>


                      <h1 className="hero-title">

                        {slide.title}

                      </h1>


                      <p className="hero-text">

                        {slide.text}

                      </p>


                      {/* =================================================
                          STORE BUTTONS
                      ================================================= */}

                      <div className="hero-buttons">

                        <button className="store-btn-hero">

                          <FaGooglePlay className="store-icon" />

                          <div className="store-text">

                            <small>
                              GET IT ON
                            </small>

                            <h6>
                              Google Play
                            </h6>

                          </div>

                        </button>


                        <button className="store-btn-hero">

                          <FaApple className="store-icon" />

                          <div className="store-text">

                            <small>
                              DOWNLOAD ON THE
                            </small>

                            <h6>
                              App Store
                            </h6>

                          </div>

                        </button>

                      </div>


                      {/* =================================================
                          FEATURES
                      ================================================= */}

                      <div className="hero-features">

                        {slide.features.map(
                          ([icon, text], featureIndex) => (

                            <div
                              key={featureIndex}
                            >

                              {icon}

                              <span>
                                {text}
                              </span>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  </div>


                  {/* =================================================
                      RIGHT SIDE
                  ================================================= */}

                  <div className="col-lg-5">

                    <div className="hero-app-area">

                      <div className="hero-app-glow"></div>


                      {/* TOP CARD */}

                      <div className="hero-floating-card hero-card-top">

                        <div className="floating-icon">

                          {slide.topIcon}

                        </div>

                        <div>

                          <strong>
                            {slide.topTitle}
                          </strong>

                          <span>
                            {slide.topText}
                          </span>

                        </div>

                      </div>


                      {/* PHONE */}

                      <div className="hero-phone-wrapper">

                        <div className="hero-phone">

                          <div className="phone-speaker"></div>

                          <img
                            src={slide.image}
                            alt="BADANIX Healthcare"
                            className="hero-app-image"
                            draggable="false"
                          />

                        </div>

                      </div>


                      {/* BOTTOM CARD */}

                      <div className="hero-floating-card hero-card-bottom">

                        <div className="floating-icon">

                          {slide.bottomIcon}

                        </div>

                        <div>

                          <strong>
                            {slide.bottomTitle}
                          </strong>

                          <span>
                            {slide.bottomText}
                          </span>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* =====================================================
          CAROUSEL CONTROLS
      ===================================================== */}

      <div className="hero-carousel-controls">

        <button
          className="hero-carousel-arrow"
          onClick={previousSlide}
          aria-label="Previous slide"
        >

          <FaChevronLeft />

        </button>


        <div className="hero-carousel-dots">

          {slides.map((slide, index) => (

            <button
              key={slide.id}
              className={`hero-carousel-dot ${
                index === currentSlide
                  ? "active"
                  : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            >

              <span></span>

            </button>

          ))}

        </div>


        <button
          className="hero-carousel-arrow"
          onClick={nextSlide}
          aria-label="Next slide"
        >

          <FaChevronRight />

        </button>

      </div>


      {/* =====================================================
          SLIDE COUNTER
      ===================================================== */}

      <div className="hero-counter">

        <strong>
          0{currentSlide + 1}
        </strong>

        <span>/</span>

        <span>
          0{slideCount}
        </span>

      </div>


      {/* =====================================================
          DRAG HINT
      ===================================================== */}

      <div className="hero-drag-hint">

        DRAG OR SWIPE

      </div>

    </section>
  );
}