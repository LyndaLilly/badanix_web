import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaUserMd,
} from "react-icons/fa";

import "../../../../assets/css/register.css";
import ApiUrl from "../../../../constants/ApiUrl";
import img1 from "../../../../assets/img/elet.webp"

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [specializations, setSpecializations] = useState([]);
  const [loadingSpecializations, setLoadingSpecializations] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await fetch(ApiUrl.GET_DOCTOR_SPECIALIZATIONS);

        const data = await response.json();

        if (response.ok && data.success) {
          setSpecializations(data.data);
        }
      } catch (error) {
        console.error("Failed to load doctor specializations:", error);
      } finally {
        setLoadingSpecializations(false);
      }
    };

    fetchSpecializations();
  }, []);

  const [formData, setFormData] = useState({
    fullname: "",
    doctor_specialization_id: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [agree, setAgree] = useState(false);

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

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!agree) {
      setErrors({
        terms: ["You must agree to the Terms of Use and Privacy Policy."],
      });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(ApiUrl.REGISTER_DOCTOR, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("doctor_verify_email", data.email);

        await Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: data.message,
          confirmButtonColor: "#14361D",
        });

        navigate("/doctor/verifyemail");
      } else if (response.status === 422) {
        setErrors(data.errors || {});
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
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
    <div className="patient-register-page">
      <div className="container">
        <div className="patient-register-container">
          <div className="row g-0">
            {/* LEFT SIDE */}

            <div className="col-lg-6 d-none d-lg-block">
              <div className="patient-register-image-section">
                <img
                  src={img1}
                  alt="Healthcare"
                  className="patient-register-image"
                />

                <div className="patient-register-overlay">
                  <div>
                    <h1>BADANIX</h1>

                    <p>
                      Secure Digital Healthcare Platform for Patients and
                      Medical Professionals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="col-lg-6">
              <div className="patient-register-form-wrapper">
                <div className="patient-register-card">
                  <button
                    type="button"
                    className="patient-register-back-btn"
                    onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft />
                  </button>

          

                  <h2>Create Doctor Account</h2>

                  <p className="patient-register-subtitle">
                    Register as a licensed medical practitioner on BADANIX.
                  </p>

                  <form onSubmit={handleRegister}>
                    {/* FULL NAME */}

                    <div className="mb-3">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUser />
                        </span>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleChange}
                        />
                      </div>

                      {errors.fullname && (
                        <small className="patient-register-error">
                          {errors.fullname[0]}
                        </small>
                      )}
                    </div>

                    {/* SPECIALIZATION */}

                    <div className="mb-3">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaUserMd />
                        </span>

                        <select
                          className="form-control"
                          name="doctor_specialization_id"
                          value={formData.doctor_specialization_id}
                          onChange={handleChange}
                          disabled={loadingSpecializations}
                        >
                          <option value="">
                            {loadingSpecializations
                              ? "Loading Specializations..."
                              : "Select Specialization"}
                          </option>

                          {specializations.map((specialization) => (
                            <option
                              key={specialization.id}
                              value={specialization.id}
                            >
                              {specialization.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {errors.doctor_specialization_id && (
                        <small className="patient-register-error">
                          {errors.doctor_specialization_id[0]}
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
                        <small className="patient-register-error">
                          {errors.email[0]}
                        </small>
                      )}
                    </div>
                    {/* PASSWORD */}

                    <div className="mb-3">
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
                        <small className="patient-register-error">
                          {errors.password[0]}
                        </small>
                      )}
                    </div>

                    {/* CONFIRM PASSWORD */}

                    <div className="mb-4">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLock />
                        </span>

                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Confirm Password"
                          name="password_confirmation"
                          value={formData.password_confirmation}
                          onChange={handleChange}
                        />

                        <button
                          type="button"
                          className="btn btn-light border-start-0"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>

                      {errors.password_confirmation && (
                        <small className="patient-register-error">
                          {errors.password_confirmation[0]}
                        </small>
                      )}
                    </div>

                    {/* TERMS */}

                    <div className="form-check mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="agree"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                      />

                      <label className="form-check-label" htmlFor="agree">
                        I agree to the{" "}
                        <Link to="/terms" className="patient-register-link">
                          Terms of Use
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="patient-register-link">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    {errors.terms && (
                      <small className="patient-register-error d-block mb-3">
                        {errors.terms[0]}
                      </small>
                    )}

                    {/* REGISTER BUTTON */}

                    <button
                      type="submit"
                      className="btn patient-register-btn w-100"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Creating Account...
                        </>
                      ) : (
                        "Create Doctor Account"
                      )}
                    </button>
                  </form>

                  <hr className="my-4" />

                  <div className="text-center">
                    <p className="mb-0">
                      Already have an account?
                      <Link
                        to="/doctor/login"
                        className="patient-register-login-link ms-2"
                      >
                        Login
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
