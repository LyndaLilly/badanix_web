import React, { useEffect } from "react";
import { FaBars, FaUserCircle } from "react-icons/fa";
import Notification from "../loggedin/Notification";
import doctorLogo from "../../../../assets/icons/doctor.png";
import ApiUrl from "../../../../constants/ApiUrl";

export default function DoctorNavbar({ doctor, toggleSidebar }) {
  useEffect(() => {
    console.log("Doctor object:", doctor);
    console.log("Doctor profile:", doctor?.profile);
    console.log("Profile image:", doctor?.profile?.profile_image);
  }, [doctor]);

  const imageUrl = doctor?.profile?.profile_image
    ? `${ApiUrl.IMAGE_BASE_URL}/${doctor.profile.profile_image.replace(/^uploads\//, "")}`
    : doctorLogo;

  console.log("Image URL:", imageUrl);

  return (
    <header className="doctor-navbar">
      <div className="doctor-navbar-left">
        <button className="doctor-navbar-menu-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <h4 className="doctor-navbar-title">Doctor Dashboard</h4>
      </div>

      <div className="doctor-navbar-right">
        <Notification />

        <div className="doctor-navbar-user">
          <img
            src={imageUrl}
            alt={doctor?.fullname || "Doctor"}
            className="doctor-navbar-avatar"
          />

          <div>
            <span className="doctor-navbar-name">Dr. {doctor?.fullname}</span>

            <small className="doctor-navbar-role">
              {doctor?.specialization}
            </small>
          </div>
        </div>
      </div>
    </header>
  );
}
