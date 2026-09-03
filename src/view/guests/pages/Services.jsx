import React from "react";

import "../../../assets/css/services.css";
import howItWorksVideo from "../../../../public/video/video.mp4";


import img1 from "../../../assets/img/img29.jpg";
import img2 from "../../../assets/img/img27.jpg";
import img3 from "../../../assets/img/img69.jpg";
import img4 from "../../../assets/img/ai.jpg";
import img5 from "../../../assets/img/online.jpg";
import img6 from "../../../assets/img/elet.webp";
import img7 from "../../../assets/img/img28.jpg";
import img8 from "../../../assets/img/img101.jpg";
import img9 from "../../../assets/img/img102.webp";

const Services = () => {
  const services = [
    {
      image: img1,
      number: "01",
      title: "Telemedicine & Remote Healthcare",
      description:
        "Connect with licensed healthcare professionals through secure digital consultations and remote care.",
      points: [
        "Seamless virtual consultations with licensed healthcare professionals.",
        "Remote patient monitoring with real-time medical feedback.",
        "24/7 access to medical advice and follow-ups from the comfort of home.",
      ],
    },
    {
      image: img2,
      number: "02",
      title: "Electronic Health Records (EHR) Management",
      description:
        "Keep important medical information organized, secure and accessible across healthcare facilities.",
      points: [
        "Secure cloud-based medical record repository.",
        "Centralized patient history accessible across healthcare facilities.",
        "Fast retrieval of laboratory reports and prescriptions.",
      ],
    },
    {
      image: img3,
      number: "03",
      title: "Personalized e-Medicine & Genomic Care",
      description:
        "Support personalized healthcare through digital insights and intelligent treatment planning.",
      points: [
        "Tailored treatment plans using digital health insights.",
        "AI-assisted healthcare recommendations.",
        "Medication plans personalized for every patient.",
      ],
    },
    {
      image: img4,
      number: "04",
      title: "AI-powered Diagnostics & Wearable Support",
      description:
        "Use intelligent technology and connected devices to support better healthcare decisions.",
      points: [
        "AI-driven clinical decision support.",
        "Continuous monitoring using smart wearable devices.",
        "Predictive alerts for health risks.",
      ],
    },
    {
      image: img5,
      number: "05",
      title: "Online Appointment Scheduling & Virtual Visits",
      description:
        "Make healthcare appointments easier with convenient digital scheduling and virtual visits.",
      points: [
        "Easy appointment booking.",
        "Virtual consultations with healthcare providers.",
        "Automated appointment reminders.",
      ],
    },
    {
      image: img6,
      number: "06",
      title: "Digital Prescription & Medication Management",
      description:
        "Simplify prescriptions and medication management through connected digital healthcare services.",
      points: [
        "Electronic prescriptions.",
        "Medication reminders and refill alerts.",
        "Connected pharmacy integration.",
      ],
    },
    {
      image: img7,
      number: "07",
      title: "Advanced Remote Monitoring Solutions",
      description:
        "Monitor important health information remotely and provide timely insights when they matter.",
      points: [
        "Real-time monitoring of vital signs.",
        "Automatic emergency alerts.",
        "Health trend analytics dashboard.",
      ],
    },
    {
      image: img8,
      number: "08",
      title: "Health Education, Awareness & Wellness Programs",
      description:
        "Give communities access to useful health information, wellness resources and educational programs.",
      points: [
        "Interactive healthcare education.",
        "Mental wellness and nutrition resources.",
        "Community awareness initiatives.",
      ],
    },
    {
      image: img9,
      number: "09",
      title: "Wearable Device Integration & Data Sync",
      description:
        "Connect smart devices and synchronize useful health information for continuous digital monitoring.",
      points: [
        "Connect fitness trackers and smartwatches.",
        "Real-time health synchronization.",
        "Actionable analytics for healthier lifestyles.",
      ],
    },
  ];

  return (
    <main className="bdx-services-page">
      {/* =========================================
          HERO
      ========================================= */}

      <section className="bdx-services-hero">
        <div className="bdx-services-hero-overlay"></div>

        <div className="bdx-services-hero-pattern">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="bdx-services-hero-inner">
          <a href="/" className="bdx-services-back">
            <span>←</span>
            Back to Home
          </a>

          <div className="bdx-services-hero-content">
            <div className="bdx-services-eyebrow">
              <span></span>
              DIGITAL HEALTHCARE SOLUTIONS
            </div>

            <h1>
              Healthcare
              <br />
              <strong>Without Boundaries.</strong>
            </h1>

            <p>
              From virtual consultations to intelligent health monitoring,
              BADANIX brings modern healthcare services together in one
              connected digital ecosystem.
            </p>

            <div className="bdx-services-hero-actions">
              <a href="#bdx-services-list" className="bdx-services-primary-btn">
                Explore Our Services
                <span>→</span>
              </a>

              <a href="/contacts" className="bdx-services-secondary-btn">
                Talk to Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          INTRO
      ========================================= */}

      <section className="bdx-services-intro">
        <div className="bdx-services-container">
          <div className="bdx-services-intro-grid">
            <div className="bdx-services-intro-label">
              <span>WHAT WE DO</span>
              <div></div>
            </div>

            <div className="bdx-services-intro-content">
              <h2>
                Digital healthcare designed
                <span> around people.</span>
              </h2>

              <p>
                BADANIX combines healthcare expertise with digital technology to
                create solutions that make healthcare more connected, accessible
                and efficient.
              </p>
            </div>
          </div>

          <div className="bdx-services-intro-stats">
            <div className="bdx-services-stat">
              <strong>09</strong>
              <span>Core Services</span>
            </div>

            <div className="bdx-services-stat">
              <strong>24/7</strong>
              <span>Digital Access</span>
            </div>

            <div className="bdx-services-stat">
              <strong>01</strong>
              <span>Connected Ecosystem</span>
            </div>

            <div className="bdx-services-stat">
              <strong>∞</strong>
              <span>Possibilities</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SERVICES
      ========================================= */}

      <section className="bdx-services-list" id="bdx-services-list">
        <div className="bdx-services-container">
          <div className="bdx-services-section-heading">
            <div>
              <span className="bdx-services-small-label">OUR SERVICES</span>

              <h2>
                Everything you need
                <br />
                for smarter healthcare.
              </h2>
            </div>

            <p>
              Explore our range of digital healthcare solutions built to connect
              patients, providers, pharmacies, laboratories and healthcare
              institutions.
            </p>
          </div>

          <div className="bdx-services-grid">
            {services.map((service) => (
              <article className="bdx-service-card" key={service.number}>
                <div className="bdx-service-image-wrapper">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="bdx-service-image"
                  />

                  <span className="bdx-service-number">{service.number}</span>
                </div>

                <div className="bdx-service-card-body">
                  <div className="bdx-service-card-top">
                    <span className="bdx-service-line"></span>

                    <span className="bdx-service-label">BADANIX SOLUTION</span>
                  </div>

                  <h3>{service.title}</h3>

                  <p className="bdx-service-description">
                    {service.description}
                  </p>

                  <ul>
                    {service.points.map((point, index) => (
                      <li key={index}>
                        <span className="bdx-service-check">✓</span>

                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


            {/* =========================================
          HOW IT WORKS
      ========================================= */}

      <section className="bdx-services-how-it-works">
        <div className="bdx-services-container">

          <div className="bdx-how-it-works-grid">

            {/* TEXT */}
            <div className="bdx-how-it-works-content">

              <span className="bdx-how-it-works-label">
                HOW IT WORKS
              </span>

              <div className="bdx-how-it-works-line"></div>

              <h2>
                Healthcare made
                <span> simple and connected.</span>
              </h2>

              <p className="bdx-how-it-works-intro">
                BADANIX brings patients, healthcare professionals and
                healthcare institutions together through one seamless
                digital healthcare experience.
              </p>

              <div className="bdx-how-it-works-steps">

                <div className="bdx-how-step">
                  <div className="bdx-how-step-number">01</div>

                  <div>
                    <h3>Connect</h3>

                    <p>
                      Access doctors, pharmacies, laboratories and
                      healthcare services from one connected platform.
                    </p>
                  </div>
                </div>

                <div className="bdx-how-step">
                  <div className="bdx-how-step-number">02</div>

                  <div>
                    <h3>Choose Your Service</h3>

                    <p>
                      Book appointments, access medical records,
                      manage prescriptions or connect with healthcare
                      professionals remotely.
                    </p>
                  </div>
                </div>

                <div className="bdx-how-step">
                  <div className="bdx-how-step-number">03</div>

                  <div>
                    <h3>Experience Better Care</h3>

                    <p>
                      Stay connected to your healthcare journey with
                      secure digital tools and real-time access to
                      important health information.
                    </p>
                  </div>
                </div>

              </div>

            </div>


            {/* VIDEO */}
            <div className="bdx-how-it-works-video">

              <div className="bdx-video-frame">

                <video
                  src={howItWorksVideo}
                  controls
                  playsInline
                  preload="metadata"
                  className="bdx-how-video"
                />

                <div className="bdx-video-overlay-shape"></div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================
          ECOSYSTEM
      ========================================= */}

      <section className="bdx-services-ecosystem">
        <div className="bdx-services-container">
          <div className="bdx-services-ecosystem-box">
            <div className="bdx-services-ecosystem-content">
              <span className="bdx-services-small-label">
                ONE CONNECTED ECOSYSTEM
              </span>

              <h2>
                Healthcare works better
                <span> when everything connects.</span>
              </h2>

              <p>
                BADANIX brings the different sides of healthcare together,
                creating a connected experience for patients, healthcare
                professionals and institutions.
              </p>
            </div>

            <div className="bdx-services-ecosystem-orbit">
              <div className="bdx-ecosystem-center">BADANIX</div>

              <div className="bdx-ecosystem-node bdx-node-one">Patients</div>

              <div className="bdx-ecosystem-node bdx-node-two">Doctors</div>

              <div className="bdx-ecosystem-node bdx-node-three">Hospitals</div>

              <div className="bdx-ecosystem-node bdx-node-four">Pharmacies</div>

              <div className="bdx-ecosystem-node bdx-node-five">
                Laboratories
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
