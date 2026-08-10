export default function WelcomeHeader({ doctor, stats }) {
  const hour = new Date().getHours();

  let greeting = "Good Morning";

  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17) {
    greeting = "Good Evening";
  }

  const confirmedPatients = stats?.confirmed_appointments ?? 0;

  return (
    <div className="doctor-welcome">
      <h3>
        {greeting}, Dr. {doctor.fullname}!
      </h3>

      <p>
        How are you doing today? You have{" "}
        <strong>{confirmedPatients} patients</strong>{" "}
        scheduled for consultation.
      </p>
    </div>
  );
}