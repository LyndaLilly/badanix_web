import "../assets/css/works.css";
import { FaSearch, FaCalendarAlt, FaUserMd, FaPills } from "react-icons/fa";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: <FaSearch />,
    title: "SEARCH FOR AN E-DOCTOR",
    text: "Find an e-specialist who is right for you based on your needs and preferences.",
  },
  {
    icon: <FaCalendarAlt />,
    title: "SCHEDULE DATE AND TIME",
    text: "Select a date and time convenient for you within the green tags and make payment.",
  },
  {
    icon: <FaUserMd />,
    title: "SPEAK WITH A DOCTOR",
    text: "Once the e-doctor confirms your appointment, start the conversation once your date and time reaches.",
  },
  {
    icon: <FaPills />,
    title: "GET PRESCRIPTIONS",
    text: "Take your prescribed e-medication as a QR code/code to any nearby pharmacy registered with BADANIX.",
  },
];

export default function HowItWorks() {
  return (
    <section className="works-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Left */}

          <div className="col-lg-5 mb-5 mb-lg-0">
            <div className="works-heading">
              <span className="works-eyebrow">SIMPLE. SMART. SEAMLESS.</span>

              <h2 className="works-title">
                Your Health,
                <br />
                <span>Simplified.</span>
              </h2>

              <div className="works-heading-line"></div>
            </div>

            <p className="works-description">
              Introducing BADANIX, your dedicated online telemedicine platform
              designed to prioritize your health and wellbeing. With a
              user-centered approach, our platform offers a seamless 4-step
              booking process, ensuring that taking care of your health is both
              convenient and effective.
            </p>

            <Link style={{ textDecoration: "none" }} to="/patient/register" className="works-btn2">
              Book Now on BADANIX
            </Link>
          </div>

          {/* Right */}

          <div className="col-lg-7">
            <div className="row g-4">
              {steps.map((item, index) => (
                <div className="col-md-6" key={index}>
                  <div className="step-box">
                    <div className="step-icon">{item.icon}</div>

                    <div>
                      <h5>{item.title}</h5>

                      <p>{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
