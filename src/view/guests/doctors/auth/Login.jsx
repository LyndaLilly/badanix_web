import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";

import "../../../../assets/css/login.css";
import ApiUrl from "../../../../constants/ApiUrl";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";


export default function Login() {
  const navigate = useNavigate();

  const { login } = useDoctorAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "lilianlynda22@gmail.com",
    password: "Password@27",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    setErrors({});

    try {
      const response = await fetch(ApiUrl.LOGIN_DOCTOR, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        await login(data.token);

        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: data.message,
          confirmButtonColor: "#14361D",
        });

        navigate("/doctor/dashboard", {
          replace: true,
        });
      } else if (response.status === 422) {
        setErrors(data.errors || {});
      } else if (response.status === 403) {
        localStorage.setItem(
          "doctor_verify_email",
          data.email
        );

        await Swal.fire({
          icon: "warning",
          title: "Email Not Verified",
          text: data.message,
          confirmButtonColor: "#14361D",
        });

        navigate("/doctor/verifyemail");
      } else if (response.status === 401) {
        setErrors(data.errors || {});
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Something went wrong.",
          confirmButtonColor: "#14361D",
        });
      }
    } catch (error) {
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
      <div className="container py-5">
        <div className="patient-login-container">
          <div className="row g-0">
            {/* LEFT */}

            <div className="col-lg-6 d-none d-lg-block">
              <div className="patient-login-image-section">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200"
                  alt="Doctor"
                  className="patient-login-image"
                />

                <div className="patient-login-overlay">
                  <div>
                    <h1>BADANIX</h1>

                    <p>
                      Secure Doctor Portal for managing patients,
                      appointments and Electronic Health Records.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}

            <div className="col-lg-6">
              <div className="patient-login-form-wrapper">
                <div className="patient-login-card">
                  <button
                    type="button"
                    className="patient-login-back-btn"
                    onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft />
                  </button>

                  <h2>Doctor Login</h2>

                  <p className="patient-login-subtitle">
                    Sign in to access your doctor dashboard.
                  </p>

                  <form onSubmit={handleLogin}>
                    {/* EMAIL */}

                    <div className="mb-3">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaEnvelope />
                        </span>

                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>

                      {errors.email && (
                        <small className="patient-login-error">
                          {errors.email[0]}
                        </small>
                      )}
                    </div>

                    {/* PASSWORD */}

                    <div className="mb-4">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLock />
                        </span>

                        <input
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />

                        <button
                          type="button"
                          className="btn btn-light border-start-0"
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                        >
                          {showPassword ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button>
                      </div>

                      {errors.password && (
                        <small className="patient-login-error">
                          {errors.password[0]}
                        </small>
                      )}
                    </div>

                    <div className="text-end mb-4">
                      <Link
                        to="/doctor/forgotpassword"
                        className="patient-login-link"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className="btn patient-login-btn w-100"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Signing In...
                        </>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </form>

                  <hr className="my-4" />

                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account?
                      <Link
                        to="/doctor/register"
                        className="patient-login-link ms-2"
                      >
                        Create Account
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}