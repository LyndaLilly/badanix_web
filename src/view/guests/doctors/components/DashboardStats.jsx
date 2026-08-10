import {
  FaWallet,
  FaUsers,
} from "react-icons/fa";

import "../../../../assets/css/doctordashboard.css";

export default function DashboardStats({ wallet, stats }) {

  const balance = wallet?.balance ?? 0;

  const patientsCount = stats?.completed_appointments ?? 0;


  return (
    <div className="row g-3 dashboard-stats">

      <div className="col-md-6">
        <div className="stat-card balance-card">

          <div className="stat-icon">
            <FaWallet />
          </div>


          <div className="stat-content">

            <p>
              Total Available Balance
            </p>


            <h3>
              ₦ {Number(balance).toLocaleString()}
            </h3>


            <span>
              Wallet earnings
            </span>

          </div>

        </div>
      </div>



      <div className="col-md-6">
        <div className="stat-card patients-card">

          <div className="stat-icon">
            <FaUsers />
          </div>


          <div className="stat-content">

            <p>
              Total Patients Count
            </p>


            <h3>
              {patientsCount}
            </h3>


            <span>
              Completed consultations
            </span>

          </div>

        </div>
      </div>

    </div>
  );
}