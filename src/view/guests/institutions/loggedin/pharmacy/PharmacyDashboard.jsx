import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaPills,
  FaBoxes,
  FaPrescriptionBottleAlt,
  FaKey,
  FaUserEdit,
  FaFileUpload,
} from "react-icons/fa";

import "../../../../../assets/css/institutiondashboard.css";
import pharmacyLogo from "../../../../../assets/icons/pharmacy.png";
import ApiUrl from "../../../../../constants/ApiUrl";
import { useInstitutionAuth } from "../../../../../contexts/InstitutionAuthContext";
import WelcomeHeader from "./components/WelcomeHeader";

export default function PharmacyDashboard() {
  const navigate = useNavigate();

  const { institution } = useInstitutionAuth();
  const documentsApproved = institution?.documentsApproved;

  if (!institution) return null;

  const imageUrl = institution?.profile?.profile_image
    ? `${ApiUrl.IMAGE_BASE_URL}/${institution.profile.profile_image.replace(
        /^uploads\//,
        "",
      )}`
    : pharmacyLogo;

  return (
    <div className="pharmacy-dashboard-page">
      <div className="container">
        <WelcomeHeader institution={institution} />
        {!documentsApproved && (
          <div className="document-warning-box">
            <div>
              <h5>Documents Required</h5>

              <p>
                Upload your pharmacy documents and wait for approval before
                accessing patient orders.
              </p>
            </div>

            <button onClick={() => navigate("/pharmacy/documentupload")}>
              <FaFileUpload />
              Upload Documents
            </button>
          </div>
        )}

        {/* HERO */}

        <div className="pharmacy-dashboard-hero">
          <div>
            <h2>View Patient Order List</h2>

            <p>
              You can scan or enter the prescription code written by the doctor
              to access patient prescriptions.
            </p>

            <button
              className="pharmacy-primary-btn"
              onClick={() => navigate("/pharmacy/orders")}
            >
              <FaClipboardList className="me-2" />
              View Order Note
            </button>
          </div>
        </div>

        {/* PROFILE */}

        {/* QUICK ACTIONS */}

        <div className="row g-4 mt-2">
          <div className="col-lg-3 col-md-6">
            <div
              className="pharmacy-card"
              onClick={() => navigate("/pharmacy/changepassword")}
            >
              <FaKey className="pharmacy-card-icon" />
              <h5>Change Password</h5>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div
              className="pharmacy-card"
              onClick={() => navigate("/pharmacy/profileupdate")}
            >
              <FaUserEdit className="pharmacy-card-icon" />
              <h5>Update Profile</h5>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div
              className="pharmacy-card"
              onClick={() => navigate("/pharmacy/documentupload")}
            >
              <FaFileUpload className="pharmacy-card-icon" />
              <h5>Documents</h5>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div
              className="pharmacy-card"
              onClick={() => navigate("/pharmacy/orders")}
            >
              <FaPrescriptionBottleAlt className="pharmacy-card-icon" />
              <h5>Orders</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
