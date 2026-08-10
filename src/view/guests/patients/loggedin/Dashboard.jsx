import { usePatientAuth } from "../../../../contexts/PatientAuthContext";

import WelcomeHeader from "../components/WelcomeHeader";
import DashboardStats from "../components/DashboardStats";
import TopDoctors from "../components/TopDoctors";
import Institutions from "../components/Institutions";
import UpcomingAppointment from "../components/UpcomingAppointment";
import AppointmentHistory from "../components/AppointmentHistory";
import DiamondCollection from "../components/DiamondCollection";

import "../../../../assets/css/patientdashboard.css";

export default function Dashboard() {
  const { patient, wallet, stats } = usePatientAuth();

  if (!patient) return null;

  return (
    <div className="patient-dashboard">
      {/* Welcome */}
      <WelcomeHeader patient={patient} stats={stats} />

      {/* Top Statistics */}
      <DashboardStats wallet={wallet} stats={stats} />

      {/* Middle Row */}
      <div className="row g-3 mt-2">
        <div className="col-lg-6">
          <AppointmentHistory />
        </div>

        <div className="col-lg-6">
          <UpcomingAppointment />
        </div>
      </div>

      {/*Bottom Row */}
      <div className="row g-3 mt-2">
        <div className="col-lg-6">
          <TopDoctors />
        </div>

        <div className="col-lg-6">
          <Institutions />
        </div>
      </div>

      <div className="row g-3 mt-2">
        <div className="col-lg-12">
          <DiamondCollection />
        </div>
      </div>
    </div>
  );
}
