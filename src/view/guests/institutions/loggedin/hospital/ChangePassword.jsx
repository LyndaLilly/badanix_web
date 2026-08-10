import { useState } from "react";
import Swal from "sweetalert2";

import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../../../../../assets/css/login.css";

import ApiUrl from "../../../../../constants/ApiUrl";

export default function ChangePassword() {
  const token = localStorage.getItem("institution_token");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    current_password: "",

    password: "",

    password_confirmation: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setErrors({});

    try {
      const response = await fetch(
        ApiUrl.CHANGE_PASSWORD_INSTITUTION,

        {
          method: "POST",

          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setFormData({
          current_password: "",

          password: "",

          password_confirmation: "",
        });

        await Swal.fire({
          icon: "success",

          title: "Password Changed",

          text: data.message,

          confirmButtonColor: "#14361D",
        });

        navigate("/institution/dashboard");
      } else if (response.status === 422) {
        setErrors(data.errors || {});
      } else {
        Swal.fire({
          icon: "error",

          title: "Error",

          text: data.message || "Something went wrong.",

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
           <div className="col-lg-12 col-md-12 mx-auto">

            <div style={{width: "100%"}} className="patient-login-card patient-login-card3 bg-white p-3 p-md-5 shadow-sm rounded-3">
              <h2>Change Password</h2>

              <p className="patient-login-subtitle">
                Update your institution account password. Your current session
                will remain active.
              </p>

              <form onSubmit={handleSubmit}>
                {/* CURRENT PASSWORD */}

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>

                    <input
                      type={showCurrent ? "text" : "password"}
                      className="form-control"
                      placeholder="Current Password"
                      name="current_password"
                      value={formData.current_password}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => setShowCurrent(!showCurrent)}
                    >
                      {showCurrent ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {errors.current_password && (
                    <small className="patient-login-error">
                      {errors.current_password[0]}
                    </small>
                  )}
                </div>

                {/* NEW PASSWORD */}

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>

                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="New Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="btn btn-light"
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

                {/* CONFIRM PASSWORD */}

                <div className="mb-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>

                    <input
                      type={showConfirm ? "text" : "password"}
                      className="form-control"
                      placeholder="Confirm New Password"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {errors.password_confirmation && (
                    <small className="patient-login-error">
                      {errors.password_confirmation[0]}
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
                      Updating...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
