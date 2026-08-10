import { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import Notification from "../loggedin/Notification";

import patientLogo from "../../../../assets/icons/patient.png";
import ApiUrl from "../../../../constants/ApiUrl";

export default function PatientNavbar({
  patient,
  toggleSidebar,
}) {
  useEffect(() => {
    console.log("Patient object:", patient);
    console.log("Patient profile:", patient?.profile);
    console.log(
      "Profile image:",
      patient?.profile?.profile_image
    );
  }, [patient]);

  console.log("Patient prop:", patient);
console.log("Patient profile:", patient?.profile);
console.log("Profile image:", patient?.profile?.profile_image);

  const imageUrl = patient?.profile?.profile_image
    ? `${ApiUrl.IMAGE_BASE_URL}/${patient.profile.profile_image.replace(
        /^uploads\//,
        ""
      )}`
    : patientLogo;

  console.log("Patient Image URL:", imageUrl);

  return (
    <header className="doctor-navbar">
      <div className="doctor-navbar-left">
        <button
          className="doctor-navbar-menu-btn"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <h4 className="doctor-navbar-title">
          Patient Dashboard
        </h4>
      </div>

      <div className="doctor-navbar-right">
        <Notification />

        <div className="doctor-navbar-user">
          <img
            src={imageUrl}
            alt={patient?.fullname || "Patient"}
            className="doctor-navbar-avatar"
            onLoad={() =>
              console.log("Patient image loaded successfully")
            }
            onError={(e) => {
              console.log("Image failed to load:", imageUrl);
              console.log("Profile image value:", patient?.profile?.profile_image);

              e.target.src = patientLogo;
            }}
          />

          <div>
            <span className="doctor-navbar-name">
              {patient?.fullname}
            </span>

            <small className="doctor-navbar-role">
              {patient?.ehr_number}
            </small>
          </div>
        </div>
      </div>
    </header>
  );
}