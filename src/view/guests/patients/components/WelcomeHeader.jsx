import { usePatientAuth } from "../../../../contexts/PatientAuthContext";

export default function WelcomeHeader() {
  const { patient, stats } = usePatientAuth();

  const hour = new Date().getHours();

  let greeting = "Good Morning";

  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17) {
    greeting = "Good Evening";
  }

  const upcomingAppointments = stats?.upcoming_appointments ?? 0;

  return (
    <div className="patient-welcome">
      <h3>
        {greeting}, {patient?.fullname}!
      </h3>

      <p>
        Welcome back. You have{" "}
        <strong>{upcomingAppointments} upcoming appointment{upcomingAppointments !== 1 && "s"}</strong>{" "}
        scheduled.
      </p>
    </div>
  );
}