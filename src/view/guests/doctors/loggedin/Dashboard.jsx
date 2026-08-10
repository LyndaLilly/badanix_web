import { FaFileUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";

import WelcomeHeader from "../components/WelcomeHeader";
import AvailabilityCard from "../components/AvailabilityCard";
import DashboardStats from "../components/DashboardStats";
import AppointmentRequests from "../components/AppointmentRequests";
import WalletOverview from "../components/WalletOverview";
import RecentPatients from "../components/RecentPatients";

import "../../../../assets/css/doctordashboard.css";
import TodaysAppointments from "../components/TodaysAppointments";
import UpcomingAppointment from "../components/UpcomingAppointment";

export default function Dashboard() {
  const navigate = useNavigate();
  const { doctor, wallet, stats } = useDoctorAuth();
  const documentsApproved = doctor?.documentsApproved;

  if (!doctor) return null;

  return (
    <div className="doctor-dashboard">
      <WelcomeHeader doctor={doctor} stats={stats} />

      {!documentsApproved && (
        <div className="document-warning-box">
          <div>
            <h5>Documents Required</h5>

            <p>
              Upload your verification documents and wait for approval before
              accepting appointments, creating availability or providing
              consultations.
            </p>
          </div>

          <button onClick={() => navigate("/doctor/documentupload")}>
            <FaFileUpload />
            Upload Documents
          </button>
        </div>
      )}

      <AvailabilityCard />

      <UpcomingAppointment />

      <DashboardStats wallet={wallet} stats={stats} />

      <div className="row g-3 mt-2">
        <div className="col-md-6">
          <AppointmentRequests />
        </div>

        <div className="col-md-6">
          <RecentPatients />
        </div>
      </div>

      <div className="row g-3 mt-2">
        <div className="col-md-6">
          <TodaysAppointments />
        </div>

        <div className="col-md-6">
          <WalletOverview />
        </div>
      </div>
    </div>
  );
}
