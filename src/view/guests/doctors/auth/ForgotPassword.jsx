import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaArrowLeft,
  FaEnvelope,
} from "react-icons/fa";

import "../../../../assets/css/login.css";
import ApiUrl from "../../../../constants/ApiUrl";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setLoading(true);

    try {
      const response = await fetch(
        ApiUrl.FORGOT_PASSWORD_DOCTOR,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
       localStorage.setItem("doctor_reset_email", email);

        await Swal.fire({
          icon: "success",
          title: "Code Sent",
          text: data.message,
          confirmButtonColor: "#14361D",
        });

        navigate("/doctor/verify-reset-code");
      } else if (response.status === 422) {
        setErrors(data.errors || {});
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: data.message,
          confirmButtonColor: "#14361D",
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to connect to the server.",
        confirmButtonColor: "#14361D",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="patient-login-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-lg-5 col-md-7">
            <div className="patient-login-card bg-white p-0 p-md-5 shadow-sm rounded-3">

              <button
                className="patient-login-back-btn"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft />
              </button>

              <h2>Forgot Password</h2>

              <p className="patient-login-subtitle">
                Enter your registered email address and we'll send you a
                verification code to reset your password.
              </p>

              <form onSubmit={handleSubmit}>

                <div className="mb-4">

                  <div className="input-group">

                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                  </div>

                  {errors.email && (
                    <small className="patient-login-error">
                      {errors.email[0]}
                    </small>
                  )}

                </div>

                <button
                  className="btn patient-login-btn w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Sending...
                    </>
                  ) : (
                    "Send Reset Code"
                  )}
                </button>

              </form>

              <hr className="my-4" />

              <div className="text-center">

                <Link
                  to="/doctor/login"
                  className="patient-login-register-link"
                >
                  Back to Login
                </Link>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}