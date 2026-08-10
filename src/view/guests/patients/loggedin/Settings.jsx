import {
  FaUserEdit,
  FaLock,
  FaWallet,
  FaBell,
  FaGlobe,
  FaShieldAlt,
  FaQuestionCircle,
  FaChevronRight,
  FaArrowLeft,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "../../../../assets/css/settings.css";

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
          to="/patient/dashboard"
          className="settings-back"
        >
          <FaArrowLeft />
          Back
        </Link>

        <div className="settings-header">
          <h2>Settings</h2>

          <p>
            Manage your account, security and preferences.
          </p>
        </div>

        {/* Account */}
        <div className="settings-section">
          <h4>Account</h4>

          <Item
            icon={<FaUserEdit />}
            title="Update Profile"
            subtitle="Personal and health information"
            to="/patient/profileupdate"
          />

          <Item
            icon={<FaLock />}
            title="Change Password"
            subtitle="Update your account password"
            to="/patient/changepassword"
          />
        </div>

        {/* Finance */}
        <div className="settings-section">
          <h4>Finance</h4>

          <Item
            icon={<FaWallet />}
            title="Wallet"
            subtitle="View balance and transactions"
            to="/patient/wallet"
          />
        </div>

        {/* Preferences */}
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

        {/* Security */}
        <div className="settings-section">
          <h4>Security</h4>

          <Item
            icon={<FaShieldAlt />}
            title="Privacy & Security"
            subtitle="Coming Soon"
            to="#"
          />
        </div>

        {/* Support */}
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