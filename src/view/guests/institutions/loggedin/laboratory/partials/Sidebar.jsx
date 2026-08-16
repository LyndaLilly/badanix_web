import { NavLink, useNavigate } from "react-router-dom";
import { FaTimes, FaSignOutAlt, FaFileUpload } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaGear } from "react-icons/fa6";

import dashboardIcon from "../../../../../../assets/icons/wallet.png";
import orderIcon from "../../../../../../assets/icons/schedule.png";
import patientIcon from "../../../../../../assets/icons/patient.png";

import { useInstitutionAuth } from "../../../../../../contexts/InstitutionAuthContext";

import "../../../../../../assets/css/sidebar.css";

export default function LaboratorySidebar({
  institution,
  sidebarOpen,
  closeSidebar,
}) {
  const { logout, institution: authInstitution } = useInstitutionAuth();

  const navigate = useNavigate();

  const profileCompleted = authInstitution?.profile_updated === 1;

  const handleLogout = async () => {
    // Close sidebar
    closeSidebar();

    const logoutPromise = logout();

    navigate("/universallogin", {
      replace: true,
    });

    await logoutPromise;
  };

  const handleBlockedClick = (e) => {
    if (!profileCompleted) {
      e.preventDefault();

      // Close sidebar before showing warning
      closeSidebar();

      Swal.fire({
        icon: "warning",
        title: "Complete Profile First",
        text: "You need to complete your Laboratory profile before accessing the dashboard.",
        confirmButtonText: "Complete Profile",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        navigate("/institution/profilefill", {
          replace: true,
        });
      });

      return;
    }

    // Close sidebar when navigation is allowed
    closeSidebar();
  };

  return (
    <>
      {/* Click outside sidebar to close */}
      {sidebarOpen && (
        <div
          className="doctor-sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`doctor-sidebar ${
          sidebarOpen ? "doctor-sidebar-open" : ""
        }`}
      >
        <div className="doctor-sidebar-header">
          <h3>BADANIX</h3>

          <button
            type="button"
            className="doctor-sidebar-close"
            onClick={closeSidebar}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="doctor-sidebar-nav">
          {/* Dashboard */}
          <NavLink
            to="/laboratory/dashboard"
            onClick={handleBlockedClick}
          >
            <img
              src={dashboardIcon}
              alt="Dashboard"
              className="sidebar-menu-image"
            />

            <span>Dashboard</span>
          </NavLink>

          {/* Orders */}
          <NavLink
            to="/laboratory/orders"
            onClick={handleBlockedClick}
          >
            <img
              src={orderIcon}
              alt="Orders"
              className="sidebar-menu-image"
            />

            <span>Orders</span>
          </NavLink>

          {/* Patients */}
          <NavLink
            to="/laboratory/patients"
            onClick={handleBlockedClick}
          >
            <img
              src={patientIcon}
              alt="Patients"
              className="sidebar-menu-image"
            />

            <span>Patients</span>
          </NavLink>

          {/* Documents */}
          <NavLink
            to="/laboratory/documentupload"
            onClick={handleBlockedClick}
          >
            <FaFileUpload className="sidebar-fa-icon" />

            <span>Documents</span>
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/laboratory/settings"
            onClick={handleBlockedClick}
          >
            <FaGear className="sidebar-fa-icon" />

            <span>Settings</span>
          </NavLink>

          {/* Logout */}
          <button
            type="button"
            className="doctor-sidebar-logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt />

            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
}