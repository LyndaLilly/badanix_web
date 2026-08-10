import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../assets/css/layout.css";

import { usePatientAuth } from "../contexts/PatientAuthContext";

import Navbar from "../view/guests/patients/partials/Navbar";
import Sidebar from "../view/guests/patients/partials/Sidebar";

export default function PatientLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { patient, profileCompleted } = usePatientAuth();

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!patient) return;

    const isProfilePage =
      location.pathname === "/patient/profilefill";

    if (!profileCompleted && !isProfilePage) {
      Swal.fire({
        icon: "warning",
        title: "Complete Your Profile",
        text: "Please update your patient profile before continuing.",
        confirmButtonText: "Update Profile",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        navigate("/patient/profilefill", {
          replace: true,
        });
      });
    }
  }, [patient, profileCompleted, location.pathname, navigate]);

  return (
    <div className="layout">
      <Sidebar
        patient={patient}
        sidebarOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="layout-main">
        <Navbar
          patient={patient}
          toggleSidebar={() => setSidebarOpen(true)}
        />

        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}