import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaArrowLeft, FaEnvelopeOpenText } from "react-icons/fa";

import "../../../../assets/css/verify-email.css";
import ApiUrl from "../../../../constants/ApiUrl";

const TESTING_MODE = true;

export default function DoctorVerifyEmail() {
  const navigate = useNavigate();

  const email = localStorage.getItem("doctor_verify_email") || "";

  const maskEmail = (email) => {
    if (!email) return "";

    const [username, domain] = email.split("@");

    if (!domain) return email;

    const maskedUsername =
      username.length <= 2
        ? username[0] + "***"
        : username.slice(0, 2) + "***";

    const domainName = domain.split(".")[0];
    const domainExtension = domain.split(".").slice(1).join(".");

    const maskedDomain =
      domainName.length <= 1
        ? domainName + "***"
        : domainName[0] + "***";

    return `${maskedUsername}@${maskedDomain}.${domainExtension}`;
  };

  const [loading, setLoading] = useState(false);

  const [resending, setResending] = useState(false);

  const [seconds, setSeconds] = useState(
    TESTING_MODE ? 10 : 600
  );

  const [code, setCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/doctor/register");
    }
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...code];

    updated[index] = value;

    setCode(updated);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !code[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const digits = pasted.split("");

    const updated = [...code];

    digits.forEach((digit, i) => {
      updated[i] = digit;
    });

    setCode(updated);

    const lastIndex = Math.min(digits.length, 5);

    inputRefs.current[lastIndex].focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const otp = code.join("");

    if (otp.length !== 6) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Code",
        text: "Please enter the 6-digit verification code.",
        confirmButtonColor: "#14361D",
      });

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        ApiUrl.VERIFY_EMAIL_DOCTOR,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code: otp,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("doctor_verify_email");

        localStorage.setItem(
          "doctor_token",
          data.token
        );

        localStorage.setItem(
          "doctor",
          JSON.stringify(data.doctor)
        );

        await Swal.fire({
          icon: "success",
          title: "Email Verified",
          text: data.message,
          confirmButtonColor: "#14361D",
        });

        navigate("/doctor/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: data.message,
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

  const handleResend = async () => {
    if (!TESTING_MODE && seconds > 0) return;

    setResending(true);

    try {
      const response = await fetch(
        ApiUrl.RESEND_VERIFICATION_DOCTOR,
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
        setSeconds(TESTING_MODE ? 10 : 600);

        setCode(["", "", "", "", "", ""]);

        Swal.fire({
          icon: "success",
          title: "Code Sent",
          text: data.message,
          confirmButtonColor: "#14361D",
        });

        inputRefs.current[0].focus();
      } else {
        Swal.fire({
          icon: "error",
          title: "Unable to Resend",
          text: data.message,
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
      setResending(false);
    }
  };
    return (
    <div className="patient-verify-page">
      <div className="container">
        <div className="patient-verify-container">
          <div className="row g-0">

            {/* LEFT SIDE */}

            <div className="col-lg-6 d-none d-lg-block">
              <div className="patient-verify-image-section">
                <img
                  src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1200"
                  alt="Healthcare"
                  className="patient-verify-image"
                />

                <div className="patient-verify-overlay">
                  <div>
                    <h1>BADANIX</h1>

                    <p>
                      Secure Digital Healthcare Platform for Doctors and Medical
                      Professionals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="col-lg-6">
              <div className="patient-verify-form-wrapper">
                <div className="patient-verify-card">

                  <button
                    type="button"
                    className="patient-verify-back-btn"
                    onClick={() => navigate("/doctor/register")}
                  >
                    <FaArrowLeft />
                  </button>

                  <div className="patient-verify-icon">
                    <FaEnvelopeOpenText />
                  </div>

                  <h2>Verify Email</h2>

                  <p className="patient-verify-subtitle">
                    We have sent a verification code to
                    <br />
                    <strong>{maskEmail(email)}</strong>
                  </p>

                  <form onSubmit={handleVerify}>
                    <div
                      className="patient-otp-container"
                      onPaste={handlePaste}
                    >
                      {code.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          maxLength="1"
                          className="patient-otp-input"
                          value={digit}
                          onChange={(e) =>
                            handleChange(e.target.value, index)
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, index)
                          }
                        />
                      ))}
                    </div>

                    <div className="text-center mt-3">
                      <small className="text-muted">
                        Code expires in
                        <span className="patient-countdown ms-2">
                          {formatTime()}
                        </span>
                      </small>
                    </div>

                    <button
                      type="submit"
                      className="btn patient-verify-btn w-100 mt-4"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Verifying...
                        </>
                      ) : (
                        "Verify Email"
                      )}
                    </button>
                  </form>

                  <div className="text-center mt-4">
                    <p className="mb-2">
                      Didn't receive the code?
                    </p>

                    <button
                      type="button"
                      className="btn btn-link patient-resend-btn"
                      disabled={
                        (!TESTING_MODE && seconds > 0) ||
                        resending
                      }
                      onClick={handleResend}
                    >
                      {resending ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Sending...
                        </>
                      ) : (
                        "Resend Code"
                      )}
                    </button>
                  </div>

                  <hr className="my-4" />

                  <div className="text-center">
                    <Link
                      to="/doctor/login"
                      className="patient-register-login-link"
                    >
                      Back to Login
                    </Link>
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