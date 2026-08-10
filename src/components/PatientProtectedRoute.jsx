import { Navigate, Outlet } from "react-router-dom";
import { usePatientAuth } from "../contexts/PatientAuthContext";

export default function PatientProtectedRoute() {
  const { loading, authenticated } = usePatientAuth();

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="spinner-border"
          style={{ color: "#14361D" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/patient/login" replace />;
  }

  return <Outlet />;
}