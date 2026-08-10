import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import ApiUrl from "../../../../constants/ApiUrl";
import { usePatientAuth } from "../../../../contexts/PatientAuthContext";

import "../../../../assets/css/rate.css";

export default function DoctorRating() {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointmentId } = useParams();

  const { token } = usePatientAuth();

  const appointment = location.state?.appointment;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const submitRating = async (e) => {
    e.preventDefault();

    if (!rating) {
      Swal.fire({
        icon: "warning",
        title: "Rating Required",
        text: "Please rate your doctor before submitting.",
        confirmButtonColor: "#14361D",
      });

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(ApiUrl.RATE_DOCTOR, {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          appointment_id: appointmentId,
          rating,
          review,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit rating.");
      }

      await Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your rating has been submitted successfully.",
        confirmButtonColor: "#14361D",
      });

      navigate("/patient/appointments");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message,
        confirmButtonColor: "#14361D",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-rating-page">
      <div className="container">
        <div className="doctor-rating-card">
          <div className="doctor-rating-header">
            <div className="doctor-rating-icon">❤️</div>

            <h2>Consultation Completed</h2>

            <p>
              Thank you for using BADANIX. Your feedback helps other patients
              choose the best specialists.
            </p>
          </div>

          <div className="doctor-summary">
            <div className="doctor-summary-avatar">👨‍⚕️</div>

            <div>
              <h4>{appointment?.doctor?.fullname || "Doctor"}</h4>

              <span>
                {appointment?.doctor?.specialization?.name ||
                  "Medical Specialist"}
              </span>
            </div>
          </div>

          <form onSubmit={submitRating}>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className={star <= (hover || rating) ? "active-star" : ""}
                />
              ))}
            </div>

            <textarea
              className="form-control doctor-review"
              rows="5"
              placeholder="Tell us about your consultation (optional)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />

            <div className="doctor-rating-actions">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => navigate("/patient/appointments")}
              >
                Skip
              </button>

              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Rating"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
