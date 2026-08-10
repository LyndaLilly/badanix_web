import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { FaArrowLeft, FaKey } from "react-icons/fa";

import "../../../../assets/css/login.css";

import ApiUrl from "../../../../constants/ApiUrl";

export default function VerifyResetCode() {
  const navigate = useNavigate();

  const email = localStorage.getItem("institution_reset_email") || "";

  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);

  const [resending, setResending] = useState(false);

  const [seconds, setSeconds] = useState(10);

  const [errors, setErrors] = useState({});

  const maskEmail = (email) => {
    if (!email) return "";

    const [name, domain] = email.split("@");

    if (!domain) return email;

    let maskedName;

    if (name.length <= 2) {
      maskedName = name[0] + "*";
    } else {
      maskedName =
        name.substring(0, 2) + "*".repeat(Math.max(name.length - 2, 3));
    }

    const domainParts = domain.split(".");

    const domainName = domainParts[0];

    const extension = domainParts.slice(1).join(".");

    const maskedDomain =
      domainName[0] + "*".repeat(Math.max(domainName.length - 1, 2));

    return `${maskedName}@${maskedDomain}.${extension}`;
  };

  useEffect(() => {
    if (!email) {
      navigate("/institution/forgotpassword");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  const verifyCode = async (e) => {
    e.preventDefault();

    setLoading(true);

    setErrors({});

    try {
      const response = await fetch(
        ApiUrl.VERIFY_PASSWORD_CODE_INSTITUTION,

        {
          method: "POST",

          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,

            code,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(
          "institution_reset_code",

          code,
        );

        await Swal.fire({
          icon: "success",

          title: "Verified",

          text: data.message,

          confirmButtonColor: "#14361D",
        });

        navigate("/institution/resetpassword");
      } else if (response.status === 422) {
        setErrors(data.errors || {});
      } else {
        Swal.fire({
          icon: "error",

          title: "Verification Failed",

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

  const resendCode = async () => {
    setResending(true);

    try {
      const response = await fetch(
        ApiUrl.RESEND_PASSWORD_CODE_INSTITUTION,

        {
          method: "POST",

          headers: {
            Accept: "application/json",

            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",

          title: "Code Sent",

          text: data.message,

          confirmButtonColor: "#14361D",
        });

        setSeconds(60);
      } else {
        Swal.fire({
          icon: "error",

          title: "Error",

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

    setResending(false);
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

              <h2>Verify Reset Code</h2>

              <p className="patient-login-subtitle">
                Enter the 6-digit verification code sent to
                <br />
                <strong>{maskEmail(email)}</strong>
              </p>

              <form onSubmit={verifyCode}>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaKey />
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Verification Code"
                      maxLength={6}
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);

                        if (errors.code) {
                          setErrors((prev) => ({
                            ...prev,

                            code: null,
                          }));
                        }
                      }}
                    />
                  </div>

                  {errors.code && (
                    <small className="patient-login-error">
                      {errors.code[0]}
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
                      Verifying...
                    </>
                  ) : (
                    "Verify Code"
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                {seconds > 0 ? (
                  <small>Resend code in {seconds}s</small>
                ) : (
                  <button
                    className="btn btn-link"
                    disabled={resending}
                    onClick={resendCode}
                  >
                    {resending ? "Sending..." : "Resend Code"}
                  </button>
                )}
              </div>

              <hr />

              <div className="text-center">
                <Link
                  to="/institution/login"
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
