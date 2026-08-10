import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import "../../../../assets/css/doctordashboard.css";

export default function AvailabilityCard() {
  const navigate = useNavigate();

  return (
    <button
      className="availability-card"
      onClick={() => navigate("/doctor/calendar")}
      type="button"
    >
      <div className="availability-left">
        <div className="availability-icon">
          <FaCalendarAlt />
        </div>

        <div className="availability-text">
          <h5>Set Your Availability</h5>
          <p>
            Manage your consultation schedule and choose the days and times
            patients can book appointments.
          </p>
        </div>
      </div>

      <FaArrowRight className="availability-arrow" />
    </button>
  );
}