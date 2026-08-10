import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

function PageNotFound() {
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
      }}
    >
      <div
        className="card shadow-lg border-0 text-center p-5"
        style={{ maxWidth: "480px", width: "100%", borderRadius: "20px" }}
      >
        <div className="mb-4">
          <FaExclamationTriangle size={60} className="text-warning" />
        </div>

        <h1 className="display-4 fw-bold text-danger mb-2">404</h1>
        <h4 className="fw-semibold mb-3">Page Not Found</h4>

        <p className="text-muted mb-4">
          Oops! The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <Link
          to="/"
          className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2"
          style={{ borderRadius: "30px" }}
        >
          <FaHome />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
