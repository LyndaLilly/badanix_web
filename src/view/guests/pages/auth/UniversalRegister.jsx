import { useNavigate } from "react-router-dom";
import {
  FaUserInjured,
  FaUserMd,
  FaHospital,
  FaArrowLeft,
} from "react-icons/fa";

import "../../../assets/css/universallogin.css";

export default function UniversalRegister() {
  const navigate = useNavigate();

  const registerTypes = [
    {
      type: "E-Patient",
      description:
        "Create your account to access electronic health records, appointments and healthcare services.",
      icon: <FaUserInjured />,
      path: "/patient/register",
    },
    {
      type: "Doctor",
      description:
        "Create your professional account to manage consultations, patients and appointments.",
      icon: <FaUserMd />,
      path: "/doctor/register",
    },
    {
      type: "Institution",
      description:
        "Register your hospital, laboratory, pharmacy or other healthcare institution.",
      icon: <FaHospital />,
      path: "/institution/register",
    },
  ];

  return (
    <div className="universal-login-page">
      <div className="universal-login-container">

        {/* LEFT SIDE */}
        <div className="universal-login-visual">
          <div className="universal-login-overlay">
            <div className="universal-login-brand">
              <h1>BADANIX</h1>

              <p>
                Join the Secure Digital Healthcare Platform
                Connecting Patients, Doctors and Healthcare
                Institutions.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="universal-login-content">

          <button
            type="button"
            className="universal-login-back"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>

          <div className="universal-login-header">
            <h2>Create Your Account</h2>

            <p>
              Select your account type to get started
            </p>
          </div>

          <div className="universal-login-options">
            {registerTypes.map((item) => (
              <button
                key={item.type}
                type="button"
                className="universal-login-option"
                onClick={() => navigate(item.path)}
              >
                <div className="universal-login-icon">
                  {item.icon}
                </div>

                <div className="universal-login-option-content">
                  <h3>{item.type}</h3>

                  <p>{item.description}</p>

                  <span>
                    Create Account →
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* LOGIN */}
          <div className="universal-login-footer">
            <p>
              Already have an account?
            </p>

            <button
              type="button"
              className="universal-login-link-button"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}