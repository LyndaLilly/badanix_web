import { useNavigate } from "react-router-dom";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";
import "../../../../assets/css/doctordashboard.css";

export default function WalletOverview() {
  const navigate = useNavigate();

  const { wallet } = useDoctorAuth();

  const balance = wallet?.balance ?? 0;

  return (
    <div className="dashboard-box">
      <div className="box-title">
        <h5>WALLET OVERVIEW</h5>
      </div>

      <div className="wallet-income">
        <h3>
          ₦{Number(balance).toLocaleString()}
        </h3>

        <p>Total Income</p>
      </div>

      <div className="wallet-footer">
        <span>Total Money made in BADANIX</span>
      </div>

      <div className="wallet-actions">

        <button
          onClick={() => navigate("/doctor/wallet")}
        >
          See Wallet
        </button>


        <button
          onClick={() => navigate("/doctor/history")}
        >
          Withdrawal History
        </button>

      </div>
    </div>
  );
}