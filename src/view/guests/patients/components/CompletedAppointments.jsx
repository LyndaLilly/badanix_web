import { FaCheckCircle } from "react-icons/fa";
import { usePatientAuth } from "../../../../contexts/PatientAuthContext";
import "../../../../assets/css/patientsummarycard.css";

export default function CompletedAppointments() {
  const { stats } = usePatientAuth();

  const completed = stats?.completed_appointments ?? 0;

  return (
    <div className="summary-card completed-card">
      <div className="summary-title">
        <h5>COMPLETED APPOINTMENTS</h5>
      </div>

      <div className="summary-body">
        <div className="summary-icon">
          <FaCheckCircle />
        </div>

        <div className="summary-content">
          <h3>{completed}</h3>
          <p>
            {completed === 1
              ? "Appointment Completed"
              : "Appointments Completed"}
          </p>
        </div>
      </div>
    </div>
  );
}