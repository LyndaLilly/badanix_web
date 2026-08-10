import "../assets/css/care.css";

import {
  FaStethoscope,
  FaCapsules,
  FaRegBookmark,
  FaBriefcaseMedical,
  FaPills,
  FaFileMedical,
  FaArrowRight,
} from "react-icons/fa";

const services = [
  {
    icon: <FaStethoscope />,
    title: "E-Specialist Diagnostic",
    description: "Connect with qualified medical specialists from anywhere.",
  },
  {
    icon: <FaCapsules />,
    title: "Online Medication",
    description: "Get your prescribed medications through a secure platform.",
  },
  {
    icon: <FaRegBookmark />,
    title: "E-Medical AI Assistant",
    description: "Access intelligent assistance for your everyday healthcare needs.",
  },
  {
    icon: <FaBriefcaseMedical />,
    title: "E-Emergency Response",
    description: "Get connected to emergency healthcare support when needed.",
  },
  {
    icon: <FaPills />,
    title: "Online Prescribed Delivery",
    description: "Have prescribed medications delivered conveniently to you.",
  },
  {
    icon: <FaFileMedical />,
    title: "Electronic Health Record",
    description: "Keep your medical history secure and accessible in one place.",
  },
];

export default function CareSection() {
  return (
    <section className="care-section">
      <div className="container">

        <div className="care-layout">

          {/* =========================
              LEFT CONTENT
          ========================= */}

          <div className="care-content">

            <span className="care-eyebrow">
              <span className="care-eyebrow-dot"></span>
              COMPLETE DIGITAL HEALTHCARE
            </span>

            <h2 className="care-title">
              Professional Care,
              <span> Made Simple.</span>
            </h2>

            <p className="care-description">
              BADANIX brings essential healthcare services together in one
              secure digital platform. Connect with healthcare professionals,
              manage your records and access the care you need wherever you are.
            </p>

            <div className="care-action">
              <button className="care-button">
                <span>Get Started</span>
                <FaArrowRight />
              </button>
            </div>

            <div className="care-trust">
              <div className="care-trust-line"></div>

              <span>
                Healthcare designed around you
              </span>
            </div>

          </div>


          {/* =========================
              RIGHT SERVICES
          ========================= */}

          <div className="care-services">

            {services.map((item, index) => (
              <div className="care-service-card" key={index}>

                <div className="care-service-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="care-service-icon">
                  {item.icon}
                </div>

                <div className="care-service-content">

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                </div>

                <div className="care-service-arrow">
                  <FaArrowRight />
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}