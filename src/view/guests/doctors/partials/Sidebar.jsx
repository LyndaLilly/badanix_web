import { NavLink, useNavigate } from "react-router-dom";

import { FaTimes, FaKey, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import PatientIcon from "../../../../assets/icons/patient.png";
import scheduleIcon from "../../../../assets/icons/schedule.png";
import walletIcon from "../../../../assets/icons/wallet.png";

import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";

import "../../../../assets/css/sidebar.css";

export default function DoctorSidebar({ doctor, sidebarOpen, closeSidebar }) {
  const { logout, profileCompleted } = useDoctorAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    navigate("/doctor/login", {
      replace: true,
    });
  };

  const handleBlockedClick = (e) => {
    if (!profileCompleted) {
      e.preventDefault();

      Swal.fire({
        icon: "warning",

        title: "Complete Profile First",

        text: "You need to update your doctor profile before accessing the dashboard.",

        confirmButtonText: "Update Profile",

        allowOutsideClick: false,

        allowEscapeKey: false,
      }).then(() => {
        navigate("/doctor/profilefill", {
          replace: true,
        });
      });
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div className="doctor-sidebar-overlay" onClick={closeSidebar} />
      )}

      <aside
        className={`doctor-sidebar ${sidebarOpen ? "doctor-sidebar-open" : ""}`}
      >
        <div className="doctor-sidebar-header">
          <h3>BADANIX</h3>

          <button className="doctor-sidebar-close" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>

        <nav className="doctor-sidebar-nav">
          <NavLink to="/doctor/dashboard" onClick={handleBlockedClick}>
            <img
              src={walletIcon}
              alt="Dashboard"
              className="sidebar-menu-image"
            />

            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/doctor/appointments" onClick={handleBlockedClick}>
            <img
              src={scheduleIcon}
              alt="Appointments"
              className="sidebar-menu-image"
            />

            <span>Appointments</span>
          </NavLink>

          <NavLink to="/doctor/patients" onClick={handleBlockedClick}>
            <img
              src={PatientIcon}
              alt="Patients"
              className="sidebar-menu-image"
            />

            <span>Patients</span>
          </NavLink>

          <NavLink to="/doctor/patientehr" onClick={handleBlockedClick}>
            <img
              src={PatientIcon}
              alt="Patient EHR"
              className="sidebar-menu-image"
            />

            <span>Patient EHR</span>
          </NavLink>

          <NavLink to="/doctor/wallet" onClick={handleBlockedClick}>
            <img src={walletIcon} alt="Wallet" className="sidebar-menu-image" />

            <span>Wallet</span>
          </NavLink>

          <NavLink to="/doctor/documentupload" onClick={handleBlockedClick}>
            <img src={walletIcon} alt="Document Upload" className="sidebar-menu-image" />

            <span>Document Upload</span>
          </NavLink>

          <NavLink to="/doctor/settings" onClick={handleBlockedClick}>
            <FaKey />

            <span>Settings</span>
          </NavLink>

          <button className="doctor-sidebar-logout" onClick={handleLogout}>
            <FaSignOutAlt />

            <span>Logout</span>
          </button>
        </nav>
      </aside>
    </>
  );
}
