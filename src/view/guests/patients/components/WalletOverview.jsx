import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { usePatientAuth } from "../../../../contexts/PatientAuthContext";

import "../../../../assets/css/patientwalletoverview.css";

export default function WalletOverview() {
  const navigate = useNavigate();

  const { wallet } = usePatientAuth();

  const balance = wallet?.balance ?? 0;

  return (
    <div className="patient-wallet-card">
      <div className="patient-wallet-header">
        <div>
          <h5>Available Balance</h5>
        </div>

      </div>

      <div className="patient-wallet-body">
        <h2>₦{Number(balance).toLocaleString()}</h2>

      
      </div>
        <p className="ptag">
          Funds available for appointments services.
        </p>

   
    </div>
  );
}
