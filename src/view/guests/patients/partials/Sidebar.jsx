import { NavLink, useNavigate } from "react-router-dom";
import { FaTimes, FaKey, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import DoctorIcon from "../../../../assets/icons/doctor.png";
import PatientIcon from "../../../../assets/icons/patient.png";
import scheduleIcon from "../../../../assets/icons/schedule.png";
import walletIcon from "../../../../assets/icons/wallet.png";
import PharmacyIcon from "../../../../assets/icons/pharmacy.png";
import logo2 from "../../../../assets/img/logo2.png";

import { usePatientAuth } from "../../../../contexts/PatientAuthContext";
import "../../../../assets/css/sidebar.css";

export default function PatientSidebar({
  patient,
  sidebarOpen,
  closeSidebar,
}) {
  const { logout, profileCompleted } = usePatientAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
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

      closeSidebar();

      Swal.fire({
        icon: "warning",
        title: "Complete Profile First",
        text: "You need to update your patient profile before accessing the dashboard.",
        confirmButtonText: "Update Profile",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        navigate("/patient/profilefill", {
          replace: true,
        });
      });

      return;
    }

    // Close sidebar when a valid menu item is clicked
    closeSidebar();
  };

  return (
    <>
      {/* Click outside sidebar */}
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
             <img
            src={logo2}
            alt="BADANIX"
            className="doctor-sidebar-logo"
          />
  

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
            to="/patient/dashboard"
            onClick={handleBlockedClick}
          >
            <img
              src={walletIcon}
              alt="Dashboard"
              className="sidebar-menu-image"
            />
            <span>Dashboard</span>
          </NavLink>

          {/* Doctors Categories */}
          <NavLink
            to="/patient/doctorcategories"
            onClick={handleBlockedClick}
          >
            <img
              src={DoctorIcon}
              alt="Doctors"
              className="sidebar-menu-image"
            />
            <span>Book Appointment</span>
          </NavLink>

          {/* Doctors */}
          <NavLink
            to="/patient/doctors"
            onClick={handleBlockedClick}
          >
            <img
              src={DoctorIcon}
              alt="Doctors"
              className="sidebar-menu-image"
            />
            <span>Doctors</span>
          </NavLink>

          {/* Appointments */}
          <NavLink
            to="/patient/appointments"
            onClick={handleBlockedClick}
          >
            <img
              src={scheduleIcon}
              alt="Appointments"
              className="sidebar-menu-image"
            />
            <span>Appointments</span>
          </NavLink>

          {/* Pharmacies */}
          <NavLink
            to="/patient/pharmacies"
            onClick={handleBlockedClick}
          >
            <img
              src={PharmacyIcon}
              alt="Pharmacies"
              className="sidebar-menu-image"
            />
            <span>Pharmacies</span>
          </NavLink>

          {/* Hospitals */}
          <NavLink
            to="/patient/hospitals"
            onClick={handleBlockedClick}
          >
            <img
              src={PatientIcon}
              alt="Hospitals"
              className="sidebar-menu-image"
            />
            <span>Hospitals</span>
          </NavLink>

          {/* Laboratories */}
          <NavLink
            to="/patient/laboratories"
            onClick={handleBlockedClick}
          >
            <img
              src={PatientIcon}
              alt="Laboratories"
              className="sidebar-menu-image"
            />
            <span>Laboratories</span>
          </NavLink>

          {/* Wallet */}
          <NavLink
            to="/patient/wallet"
            onClick={handleBlockedClick}
          >
            <img
              src={walletIcon}
              alt="Wallet"
              className="sidebar-menu-image"
            />
            <span>Wallet</span>
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/patient/settings"
            onClick={handleBlockedClick}
          >
            <FaKey />
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