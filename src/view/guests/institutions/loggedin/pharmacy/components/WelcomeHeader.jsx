export default function WelcomeHeader({ institution }) {
  const hour = new Date().getHours();

  let greeting = "Good Morning";

  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17) {
    greeting = "Good Evening";
  }

  return (
    <div className="doctor-welcome">
      <h3>
        {greeting}, {institution?.institution_name}!
      </h3>

      <p>
        Welcome back to your pharmacy dashboard. Manage patient prescriptions
      </p>
    </div>
  );
}