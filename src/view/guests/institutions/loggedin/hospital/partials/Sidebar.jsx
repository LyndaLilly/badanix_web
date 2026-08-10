import { NavLink, useNavigate } from "react-router-dom";
import { FaTimes, FaKey, FaSignOutAlt, FaFileUpload} from "react-icons/fa";
import Swal from "sweetalert2";

import { FaGear } from "react-icons/fa6";

import dashboardIcon from "../../../../../../assets/icons/wallet.png";
import orderIcon from "../../../../../../assets/icons/schedule.png";
import profileIcon from "../../../../../../assets/icons/patient.png";
import patientIcon from "../../../../../../assets/icons/patient.png";
import { useInstitutionAuth } from "../../../../../../contexts/InstitutionAuthContext";

import "../../../../../../assets/css/sidebar.css";

export default function HospitalSidebar({
  institution,
  sidebarOpen,
  closeSidebar,
}) {
  const { logout, institution: authInstitution } = useInstitutionAuth();

  const navigate = useNavigate();

  const profileCompleted = authInstitution?.profile_updated === 1;

  const handleLogout = async () => {
    await logout();

    navigate("/institution/login", {
      replace: true,
    });
  };

  const handleBlockedClick = (e) => {
    if (!profileCompleted) {
      e.preventDefault();

      Swal.fire({
        icon: "warning",
        title: "Complete Profile First",
        text: "You need to complete your hospital profile before accessing the dashboard.",
        confirmButtonText: "Complete Profile",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(() => {
        navigate("/institution/profilefill", {
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
          <NavLink to="/hospital/dashboard" onClick={handleBlockedClick}>
            <img
              src={dashboardIcon}
              alt="Dashboard"
              className="sidebar-menu-image"
            />

            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/hospital/patientehr" onClick={handleBlockedClick}>
            <img src={orderIcon} alt="Orders" className="sidebar-menu-image" />

            <span>Patient EHR</span>
          </NavLink>

          
          <NavLink to="/hospital/patients" onClick={handleBlockedClick}>
            <img src={patientIcon} alt="Patients" className="sidebar-menu-image" />

            <span>Patients</span>
          </NavLink>

          <NavLink to="/hospital/documentupload" onClick={handleBlockedClick}>
            <FaFileUpload className="sidebar-fa-icon" />

            <span>Documents</span>
          </NavLink>

          <NavLink  to="/hospital/settings" onClick={handleBlockedClick}>
            <FaGear className="sidebar-fa-icon"/>

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
