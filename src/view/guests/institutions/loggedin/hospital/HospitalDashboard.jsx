import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaHospital,
  FaKey,
  FaUserEdit,
  FaFileUpload,
  FaUsers,
} from "react-icons/fa";

import "../../../../../assets/css/institutiondashboard.css";
import hospitalLogo from "../../../../../assets/icons/hospital.png";
import ApiUrl from "../../../../../constants/ApiUrl";
import { useInstitutionAuth } from "../../../../../contexts/InstitutionAuthContext";
import WelcomeHeader from "./components/WelcomeHeader";

export default function HospitalDashboard() {
  const navigate = useNavigate();

  const { institution } = useInstitutionAuth();
  const documentsApproved = institution?.documentsApproved;

  if (!institution) return null;

  const imageUrl = institution?.profile?.profile_image
    ? `${ApiUrl.IMAGE_BASE_URL}/${institution.profile.profile_image.replace(
        /^uploads\//,
        "",
      )}`
    : hospitalLogo;

  return (
    <div className="pharmacy-dashboard-page">
      <div className="container-fluid">
        <WelcomeHeader institution={institution} />

        {!documentsApproved && (
          <div className="document-warning-box">
            <div>
              <h5>Documents Required</h5>

              <p>
                Upload your hospital documents and wait for approval before
                accessing patient orders.
              </p>
            </div>

            <button onClick={() => navigate("/hospital/documentupload")}>
              <FaFileUpload />
              Upload Documents
            </button>
          </div>
        )}

        {/* HERO */}

        <div className="pharmacy-dashboard-hero">
          <div>
            <h2>Manage Hospital Services</h2>

            <p>
              Manage your hospital information, documents and healthcare
              services from your hospital dashboard.
            </p>

            <button
              className="pharmacy-primary-btn"
              onClick={() => navigate("/hospital/patientehr")}
            >
              <FaClipboardList className="me-2" />
              Manage Patients Record
            </button>
          </div>
        </div>

        {/* PROFILE */}

        {/* QUICK ACTIONS */}

        <div className="row g-4 mt-2">
          <div className="col-lg-4 col-md-6">
            <div
              className="pharmacy-card"
              onClick={() => navigate("/hospital/changepassword")}
            >
              <FaKey className="pharmacy-card-icon" />

              <h5>Change Password</h5>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div
              className="pharmacy-card"
              onClick={() => navigate("/hospital/profileupdate")}
            >
              <FaUserEdit className="pharmacy-card-icon" />

              <h5>Update Profile</h5>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div
              className="pharmacy-card"
              onClick={() => navigate("/hospital/documentupload")}
            >
              <FaFileUpload className="pharmacy-card-icon" />

              <h5>Documents</h5>
            </div>
          </div>

      
        </div>
      </div>
    </div>
  );
}
