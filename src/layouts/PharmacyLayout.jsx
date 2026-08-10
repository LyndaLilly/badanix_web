import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../assets/css/layout.css";

import { useInstitutionAuth } from "../contexts/InstitutionAuthContext";

import PharmacyNavbar from "../view/guests/institutions/loggedin/pharmacy/partials/Navbar"
import PharmacySidebar from "../view/guests/institutions/loggedin/pharmacy/partials/Sidebar";

export default function PharmacyLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { institution } = useInstitutionAuth();

  const profileCompleted = institution?.profile_updated === 1;

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!institution) return;

    const isProfilePage =
      location.pathname === "/institution/profilefill";

    if (!profileCompleted && !isProfilePage) {
      Swal.fire({
        icon: "warning",

        title: "Complete Your Profile",

        text: "Please complete your pharmacy profile before continuing.",

        confirmButtonText: "Complete Profile",

        allowOutsideClick: false,

        allowEscapeKey: false,
      }).then(() => {
        navigate("/institution/profilefill", {
          replace: true,
        });
      });
    }
  }, [
    institution,
    profileCompleted,
    location.pathname,
    navigate,
  ]);

  return (
    <div className="layout">
      <PharmacySidebar
        institution={institution}
        sidebarOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <div className="layout-main">
        <PharmacyNavbar
          institution={institution}
          toggleSidebar={() => setSidebarOpen(true)}
        />

        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}