
import { Navigate, Outlet } from "react-router-dom";
import { useInstitutionAuth } from "../contexts/InstitutionAuthContext";

export default function InstitutionProtectedRoute({
  allowedType = null,
}) {
  const {
    loading,
    authenticated,
    institution,
  } = useInstitutionAuth();

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

  // Not logged in
  if (!authenticated || !institution) {
    return (
      <Navigate
        to="/institution/login"
        replace
      />
    );
  }

  // Wrong institution type
  if (
    allowedType &&
    institution.institution_type !== allowedType
  ) {
    return (
      <Navigate
        to="/institution/login"
        replace
      />
    );
  }

  return <Outlet />;
}

