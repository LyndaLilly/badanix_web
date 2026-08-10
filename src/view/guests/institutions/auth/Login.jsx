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

import { useInstitutionAuth } from "../../../../contexts/InstitutionAuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useInstitutionAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    institution_type: "",
    email: "",
    password: "",
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
      const response = await fetch(
        ApiUrl.LOGIN_INSTITUTION,

        {
          method: "POST",

          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("institution", JSON.stringify(data.institution));

        await login(data.token, data.institution);

        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: data.message,
          confirmButtonColor: "#14361D",
        });

        const type = data.institution.institution_type;

        if (type === "hospital") {
          navigate("/hospital/dashboard", {
            replace: true,
          });
        } else if (type === "pharmacy") {
          navigate("/pharmacy/dashboard", {
            replace: true,
          });
        } else if (type === "laboratory") {
          navigate("/laboratory/dashboard", {
            replace: true,
          });
        }
      } else if (response.status === 422) {
        setErrors(data.errors || {});
      } else if (response.status === 403) {
        localStorage.setItem(
          "institution_verify_email",

          data.email,
        );

        await Swal.fire({
          icon: "warning",

          title: "Email Not Verified",

          text: data.message,

          confirmButtonColor: "#14361D",
        });

        navigate("/institution/verifyemail");
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
            {/* LEFT IMAGE */}

            <div className="col-lg-6 d-none d-lg-block">
              <div className="patient-login-image-section">
                <img
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200"
                  alt="Institution"
                  className="patient-login-image"
                />

                <div className="patient-login-overlay">
                  <div>
                    <h1>BADANIX</h1>

                    <p>
                      Secure Institution Portal for managing patients, doctors,
                      appointments and Electronic Health Records.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}

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

                  <h2>Institution Login</h2>

                  <p className="patient-login-subtitle">
                    Sign in to manage your healthcare institution.
                  </p>

                  <form onSubmit={handleLogin}>
                    {/* INSTITUTION TYPE */}

                    <div className="mb-3">
                      <select
                        className="form-select"
                        name="institution_type"
                        value={formData.institution_type}
                        onChange={handleChange}
                      >
                        <option value="">Select Institution Type</option>

                        <option value="hospital">Hospital</option>

                        <option value="pharmacy">Pharmacy</option>

                        <option value="laboratory">Laboratory</option>
                      </select>

                      {errors.institution_type && (
                        <small className="patient-login-error">
                          {errors.institution_type[0]}
                        </small>
                      )}
                    </div>
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
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />

                        <button
                          type="button"
                          className="btn btn-light border-start-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
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
                        to="/institution/forgotpassword"
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
                        to="/institution/register"
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
