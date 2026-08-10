import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaArrowLeft,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "../../../../assets/css/login.css";
import ApiUrl from "../../../../constants/ApiUrl";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [email] = useState(
    localStorage.getItem("doctor_reset_email") || ""
  );

  const [code] = useState(
    localStorage.getItem("doctor_reset_code") || ""
  );

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (!email || !code) {
      navigate("/doctor/forgotpassword", {
        replace: true,
      });
    }
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setErrors({});

    try {
      const response = await fetch(
        ApiUrl.RESET_PASSWORD_DOCTOR,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code,
            password: formData.password,
            password_confirmation:
              formData.password_confirmation,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Password Reset Successful",
          text: data.message,
          confirmButtonColor: "#14361D",
        });

        localStorage.removeItem("doctor_reset_email");
        localStorage.removeItem("doctor_reset_code");

        navigate("/doctor/login", {
          replace: true,
        });
      } else if (response.status === 422) {
        setErrors(data.errors || {});
      } else {
        Swal.fire({
          icon: "error",
          title: "Reset Failed",
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
    }

    setLoading(false);
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

              <h2>Reset Password</h2>

              <p className="patient-login-subtitle">
                Create a strong new password for your
                BADANIX Doctor account.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
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
                      placeholder="New Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="btn btn-light"
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

                <div className="mb-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      className="form-control"
                      placeholder="Confirm Password"
                      name="password_confirmation"
                      value={
                        formData.password_confirmation
                      }
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>

                  {errors.password_confirmation && (
                    <small className="patient-login-error">
                      {
                        errors
                          .password_confirmation[0]
                      }
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
                      Resetting...
                    </>
                  ) : (
                    "Reset Password"
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