import { FaClock } from "react-icons/fa";
import "../../../../assets/css/patientpendingcard.css";

export default function PendingAppointments({ stats }) {
  const pending = stats?.pending_appointments ?? 0;

  return (
    <div className="pending-summary-card">
      <div className="pending-summary-header">
  

        <h5>Pending Appointments</h5>
      </div>

      <div className="pending-summary-body">
        <div className="pending-summary-icon">
          <FaClock />
        </div>

        <div className="pending-summary-content">
          <h3>{pending}</h3>

          <span>
            {pending === 1
              ? "Pending Appointment"
              : "Pending Appointments"}
          </span>
        </div>
      </div>
    </div>
  );
}