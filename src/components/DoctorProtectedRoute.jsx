import { Navigate, Outlet } from "react-router-dom";
import { useDoctorAuth } from "../contexts/DoctorAuthContext";

export default function DoctorProtectedRoute() {
  const { loading, authenticated } = useDoctorAuth();

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
          <span className="visually-hidden">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/doctor/login" replace />;
  }

  return <Outlet />;
}