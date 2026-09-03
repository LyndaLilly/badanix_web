import "../../../assets/css/about.css";
import {
  FaArrowRight,
  FaCheck,
  FaHeartbeat,
  FaLaptopMedical,
  FaShieldAlt,
  FaUsers,
  FaLightbulb,
  FaHandHoldingHeart,
  FaGlobe,
  FaLock,
  FaChartLine,
  FaHospital,
  FaMobileAlt,
  FaBrain,
  FaClock,
  FaStethoscope,
  FaBullseye,
  FaEye,
} from "react-icons/fa";

import img1 from "../../../assets/img/img29.jpg"


import img4 from "../../../assets/img/img20.jpg"
import img5 from "../../../assets/img/img24.jpg"
import img6 from "../../../assets/img/wear.jpg"
import what from "../../../assets/img/institution.webp"
import img2 from "../../../assets/img/elet.webp"


const values = [
  {
    icon: <FaLightbulb />,
    title: "Innovation",
    text: "Harnessing modern technologies to create smarter and more effective digital healthcare solutions.",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Compassion",
    text: "Putting the e-patient experience first and ensuring technology never replaces the human side of care.",
  },
  {
    icon: <FaGlobe />,
    title: "Accessibility",
    text: "Making quality digital healthcare accessible to people regardless of location.",
  },
  {
    icon: <FaLock />,
    title: "Integrity",
    text: "Building trust through transparency, privacy and responsible handling of healthcare information.",
  },
  {
    icon: <FaUsers />,
    title: "Collaboration",
    text: "Connecting e-patients, healthcare professionals, institutions and technology partners.",
  },
];

const services = [
  {
    icon: <FaLaptopMedical />,
    number: "01",
    title: "Telemedicine Services",
    image: img1,
    text: "Secure virtual consultations with licensed healthcare professionals from wherever you are.",
  },
  {
    icon: <FaHeartbeat />,
    number: "02",
    title: "Electronic Health Records",
    image: img2,
    text: "Efficiently manage medical histories, laboratory results, prescriptions and other healthcare information.",
  },
  {
    icon: <FaBrain />,
    number: "03",
    title: "AI-powered Diagnostics",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80",
    text: "Technology-assisted diagnostic tools designed to support healthcare professionals in making informed decisions.",
  },
  {
    icon: <FaMobileAlt />,
    number: "04",
    title: "E-Health Applications",
    image: img4,
    text: "Digital tools that allow e-patients to manage appointments, prescriptions and healthcare information.",
  },
  {
    icon: <FaHospital />,
    number: "05",
    title: "Hospital Management",
    image: img5,
    text: "Digital solutions that help healthcare institutions improve operational efficiency and patient management.",
  },
  {
    icon: <FaClock />,
    number: "06",
    title: "Remote Monitoring",
    image: img6,
    text: "Connected healthcare technology that supports continuous monitoring and better preventive care.",
  },
];

const features = [
  "E-Patient-Centered Solutions",
  "End-to-End Healthcare Support",
  "Advanced Security Measures",
  "Scalable Digital Infrastructure",
  "Connected Healthcare Ecosystem",
  "Accessible Digital Care",
];

export default function About() {
  return (
    <main className="badanix-about-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="badanix-about-hero">

        <div className="badanix-about-hero-overlay"></div>

        <div className="badanix-about-hero-pattern"></div>

        <div className="badanix-about-container">

          <a href="/" className="badanix-about-back">
            <span>←</span>
            Back to Home
          </a>

          <div className="badanix-about-hero-content">

            <div className="badanix-about-hero-badge">
              <FaHeartbeat />
              DIGITAL HEALTHCARE
            </div>

            <h1>
              Healthcare,
              <span> Reimagined.</span>
            </h1>

            <p>
              Connecting people, healthcare professionals and institutions
              through intelligent digital healthcare solutions.
            </p>

            <div className="badanix-about-hero-actions">

              <a href="/services" className="badanix-about-primary-btn">
                Explore Our Services
                <FaArrowRight />
              </a>

              <a href="#about-introduction" className="badanix-about-outline-btn">
                Discover BADANIX
              </a>

            </div>

          </div>

          <div className="badanix-about-hero-card">

            <div className="badanix-about-hero-card-icon">
              <FaStethoscope />
            </div>

            <div>
              <strong>Digital Healthcare</strong>
              <span>Connected. Accessible. Patient-focused.</span>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section
        className="badanix-about-introduction"
        id="about-introduction"
      >

        <div className="badanix-about-container">

          <div className="badanix-about-intro-layout">

            <div className="badanix-about-intro-label">

              <span>01</span>

              <div></div>

              <strong>WHO WE ARE</strong>

            </div>

            <div className="badanix-about-intro-content">

              <h2>
                Transforming the way
                <span> healthcare connects.</span>
              </h2>

              <div className="badanix-about-intro-text">

                <p>
                  At BADANIX Digital Healthcare, we are committed to
                  transforming healthcare through the power of technology.
                  Our platform brings together e-patients, doctors,
                  hospitals, pharmacies and laboratories within a connected
                  digital healthcare ecosystem.
                </p>

                <p>
                  We combine innovation with compassionate care to make
                  healthcare more accessible, convenient and efficient while
                  empowering healthcare professionals with the digital tools
                  they need to deliver better services.
                </p>

              </div>

              <div className="badanix-about-intro-highlight">

                <FaHeartbeat />

                <div>
                  <strong>Technology with a human purpose.</strong>
                  <span>
                    We believe better technology should lead to better care.
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CORE VALUES
      ===================================================== */}

      <section className="badanix-about-values">

        <div className="badanix-about-container">

          <div className="badanix-about-section-header">

            <div>
              <span className="badanix-about-eyebrow">
                OUR FOUNDATION
              </span>

              <h2>
                The values behind
                <span> BADANIX.</span>
              </h2>
            </div>

            <p>
              Every solution we create is guided by principles that keep
              people, trust and better healthcare at the center.
            </p>

          </div>


          <div className="badanix-about-values-layout">

            <div className="badanix-about-values-image">

              <img
  src={what}
  alt="Black healthcare professional"
/>

              <div className="badanix-about-values-overlay">

                <FaShieldAlt />

                <strong>
                  Healthcare you can trust.
                </strong>

                <span>
                  Built around people, privacy and accessibility.
                </span>

              </div>

            </div>


            <div className="badanix-about-values-list">

              {values.map((value, index) => (

                <div
                  className="badanix-about-value"
                  key={index}
                >

                  <div className="badanix-about-value-number">
                    0{index + 1}
                  </div>

                  <div className="badanix-about-value-icon">
                    {value.icon}
                  </div>

                  <div className="badanix-about-value-content">

                    <h3>{value.title}</h3>

                    <p>{value.text}</p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          VISION / MISSION
      ===================================================== */}

      <section className="badanix-about-purpose">

        <div className="badanix-about-container">

          <div className="badanix-about-purpose-heading">

            <span className="badanix-about-eyebrow">
              OUR PURPOSE
            </span>

            <h2>
              Where we are going
              <span> and why.</span>
            </h2>

            <p>
              Our vision and mission guide the products, partnerships and
              healthcare experiences we build.
            </p>

          </div>


          <div className="badanix-about-purpose-grid">

            <article className="badanix-about-purpose-card">

              <div className="badanix-about-purpose-top">

                <div className="badanix-about-purpose-icon">
                  <FaEye />
                </div>

                <span>01</span>

              </div>

              <h3>Our Vision</h3>

              <p>
                To become a global leader in digital healthcare, reshaping
                the delivery of medical services through seamless,
                e-patient-centered solutions and enabling healthier lives
                for all.
              </p>

              <div className="badanix-about-purpose-line"></div>

              <span className="badanix-about-purpose-caption">
                A healthier digital future
              </span>

            </article>


            <article className="badanix-about-purpose-card badanix-about-purpose-card-accent">

              <div className="badanix-about-purpose-top">

                <div className="badanix-about-purpose-icon">
                  <FaBullseye />
                </div>

                <span>02</span>

              </div>

              <h3>Our Mission</h3>

              <p>
                We aim to empower e-healthcare providers and e-patients with
                intuitive digital tools that enhance accessibility,
                transparency and efficiency in healthcare delivery.
              </p>

              <div className="badanix-about-purpose-line"></div>

              <span className="badanix-about-purpose-caption">
                Technology that empowers care
              </span>

            </article>

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="badanix-about-services">

        <div className="badanix-about-container">

          <div className="badanix-about-services-heading">

            <div>

              <span className="badanix-about-eyebrow">
                WHAT WE DO
              </span>

              <h2>
                One ecosystem.
                <span> Many healthcare possibilities.</span>
              </h2>

            </div>

            <p>
              BADANIX combines digital healthcare services and technology
              into one connected experience for patients and providers.
            </p>

          </div>


          <div className="badanix-about-services-grid">

            {services.map((service) => (

              <article
                className="badanix-about-service-card"
                key={service.number}
              >

                <div className="badanix-about-service-image">

                  <img
                    src={service.image}
                    alt={service.title}
                  />

                  <span className="badanix-about-service-number">
                    {service.number}
                  </span>

                </div>

                <div className="badanix-about-service-body">

                  <div className="badanix-about-service-icon">
                    {service.icon}
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.text}</p>


                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY BADANIX
      ===================================================== */}

      <section className="badanix-about-why">

        <div className="badanix-about-container">

          <div className="badanix-about-why-wrapper">

            <div className="badanix-about-why-content">

              <span className="badanix-about-eyebrow">
                WHY BADANIX
              </span>

              <h2>
                Healthcare should feel
                <span> simpler.</span>
              </h2>

              <p>
                We are building an ecosystem where accessing healthcare,
                managing medical information and connecting with healthcare
                professionals can happen through one trusted digital
                platform.
              </p>

              <a
                href="/services"
                className="badanix-about-why-button"
              >
                Explore BADANIX
                <FaArrowRight />
              </a>

            </div>


            <div className="badanix-about-feature-grid">

              {features.map((feature, index) => (

                <div
                  className="badanix-about-feature"
                  key={index}
                >

                  <span>
                    <FaCheck />
                  </span>

                  <strong>{feature}</strong>

                </div>

              ))}

            </div>


            <div className="badanix-about-stat-row">

              <div className="badanix-about-stat">

                <FaClock />

                <div>
                  <strong>24/7</strong>
                  <span>Digital access</span>
                </div>

              </div>

              <div className="badanix-about-stat">

                <FaShieldAlt />

                <div>
                  <strong>Secure</strong>
                  <span>Healthcare ecosystem</span>
                </div>

              </div>

              <div className="badanix-about-stat">

                <FaUsers />

                <div>
                  <strong>Connected</strong>
                  <span>Healthcare community</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="badanix-about-final">

        <div className="badanix-about-container">

          <div className="badanix-about-final-card">

            <div className="badanix-about-final-decoration"></div>

            <div className="badanix-about-final-content">

              <span className="badanix-about-eyebrow">
                THE FUTURE OF HEALTHCARE
              </span>

              <h2>
                Let's build a
                <span> healthier future.</span>
              </h2>

              <p>
                Whether you're looking for convenient digital healthcare or
                want to bring your healthcare practice into the digital
                future, BADANIX is building the ecosystem to make it happen.
              </p>

              <div className="badanix-about-final-actions">

                <a
                  href="/patient/register"
                  className="badanix-about-final-primary"
                >
                  Get Started
                  <FaArrowRight />
                </a>

                <a
                  href="/services"
                  className="badanix-about-final-secondary"
                >
                  View Services
                </a>

              </div>

            </div>

            <div className="badanix-about-final-icon">
              <FaHeartbeat />
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}