import React from "react";
import { FaBars } from "react-icons/fa";
import Notification from "../../Notification";
import hospitalLogo from "../../../../../../assets/icons/hospital.png";
import ApiUrl from "../../../../../../constants/ApiUrl";

export default function HospitalNavbar({ institution, toggleSidebar }) {
  const imageUrl = institution?.profile?.profile_image
    ? `${ApiUrl.IMAGE_BASE_URL}/${institution.profile.profile_image.replace(
        /^uploads\//,
        "",
      )}`
    : hospitalLogo;

  return (
    <header className="doctor-navbar">
      <div className="doctor-navbar-left">
        <button className="doctor-navbar-menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <h4 className="doctor-navbar-title">Hospital Dashboard</h4>
      </div>

      <div className="doctor-navbar-right">
        <Notification />

        <div className="doctor-navbar-user">
          <img
            src={imageUrl}
            alt={institution?.institution_name || "Hospital"}
            className="doctor-navbar-avatar"
          />

          <div>
            <span className="doctor-navbar-name">
              {institution?.institution_name}
            </span>
            <small className="doctor-navbar-role">
              EHR: {institution?.ehr_number}
            </small>
          </div>
        </div>
      </div>
    </header>
  );
}
