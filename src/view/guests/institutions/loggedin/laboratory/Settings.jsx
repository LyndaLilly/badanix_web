import {
  FaUserEdit,
  FaLock,
  FaBell,
  FaGlobe,
  FaShieldAlt,
  FaQuestionCircle,
  FaFileUpload,
  FaChevronRight,
  FaArrowLeft,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "../../../../../assets/css/settings.css";

export default function Settings() {
  const Item = ({ icon, title, subtitle, to }) => (
    <Link to={to} className="settings-item">
      <div className="settings-left">
        <div className="settings-icon">
          {icon}
        </div>

        <div>
          <h5>{title}</h5>
          <p>{subtitle}</p>
        </div>
      </div>

      <FaChevronRight className="settings-arrow" />
    </Link>
  );

  return (
    <div className="settings-page">
      <div className="settings-container">
        <Link
          to="/laboratory/dashboard"
          className="settings-back"
        >
          <FaArrowLeft />
          Back
        </Link>

        <div className="settings-header">
          <h2>Settings</h2>

          <p>
            Manage your laboratory account, security and preferences.
          </p>
        </div>

        <div className="settings-section">
          <h4>Account</h4>

          <Item
            icon={<FaUserEdit />}
            title="Update Profile"
            subtitle="Update laboratory information"
            to="/laboratory/profileupdate"
          />

          <Item
            icon={<FaFileUpload />}
            title="Document Upload"
            subtitle="Manage laboratory verification documents"
            to="/laboratory/documentupload"
          />

          <Item
            icon={<FaLock />}
            title="Change Password"
            subtitle="Update your account password"
            to="/laboratory/changepassword"
          />
        </div>

        <div className="settings-section">
          <h4>Preferences</h4>

          <Item
            icon={<FaBell />}
            title="Notifications"
            subtitle="Coming Soon"
            to="#"
          />

          <Item
            icon={<FaGlobe />}
            title="Language"
            subtitle="Coming Soon"
            to="#"
          />
        </div>

        <div className="settings-section">
          <h4>Security</h4>

          <Item
            icon={<FaShieldAlt />}
            title="Privacy & Security"
            subtitle="Coming Soon"
            to="#"
          />
        </div>

        <div className="settings-section">
          <h4>Support</h4>

          <Item
            icon={<FaQuestionCircle />}
            title="Help Center"
            subtitle="FAQs and support"
            to="#"
          />
        </div>
      </div>
    </div>
  );
}