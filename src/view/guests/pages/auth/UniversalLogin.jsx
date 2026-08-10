
import { useNavigate } from "react-router-dom";
import {
  FaUserInjured,
  FaUserMd,
  FaHospital,
  FaArrowLeft,
} from "react-icons/fa";

import "../../../assets/css/universallogin.css";

export default function UniversalLogin() {
  const navigate = useNavigate();

  const loginTypes = [
    {
      type: "E-Patient",
      description:
        "Access your electronic health records, appointments and healthcare services.",
      icon: <FaUserInjured />,
      path: "/patient/login",
    },
    {
      type: "Doctor",
      description:
        "Access your consultations, patients, appointments and professional dashboard.",
      icon: <FaUserMd />,
      path: "/doctor/login",
    },
    {
      type: "Institution",
      description:
        "Manage your hospital, laboratory, pharmacy or other healthcare institution.",
      icon: <FaHospital />,
      path: "/institution/login",
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
                Secure Digital Healthcare Platform for Patients,
                Doctors and Healthcare Institutions.
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
            <h2>Welcome Back</h2>

            <p>
              Select your account type to continue
            </p>
          </div>

          <div className="universal-login-options">
            {loginTypes.map((item) => (
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
                    Continue →
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* REGISTRATION */}
          <div className="universal-login-footer">
            <p>Don't have an account?</p>

            <div className="universal-register-links">

              <button
                type="button"
                onClick={() => navigate("/patient/register")}
              >
                Patient Registration
              </button>

              <button
                type="button"
                onClick={() => navigate("/doctor/register")}
              >
                Doctor Registration
              </button>

              <button
                type="button"
                onClick={() => navigate("/institution/register")}
              >
                Institution Registration
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

