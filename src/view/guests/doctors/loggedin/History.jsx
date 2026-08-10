import { useEffect, useState } from "react";
import { FaArrowLeft, FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import "../../../../assets/css/wallet.css";

import ApiUrl from "../../../../constants/ApiUrl";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";

export default function History() {
  const navigate = useNavigate();

  const { token } = useDoctorAuth();

  const [withdrawals, setWithdrawals] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWithdrawals();
  }, []);

  const loadWithdrawals = async () => {
    try {
      const response = await fetch(ApiUrl.DOCTOR_WITHDRAWALS, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setWithdrawals(data.withdrawals || []);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Unable to load withdrawal history.",
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to load withdrawal history.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    const day = date.getDate();

    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return "th";

      switch (n % 10) {
        case 1:
          return "st";

        case 2:
          return "nd";

        case 3:
          return "rd";

        default:
          return "th";
      }
    };

    return `${day}${getOrdinal(day)} ${date.toLocaleString("en-GB", {
      month: "long",
      year: "numeric",
    })} • ${date.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  };

  const badgeClass = (status) => {
    switch (status) {
      case "approved":
        return "approved";

      case "paid":
        return "paid";

      case "rejected":
        return "rejected";

      default:
        return "pending";
    }
  };

  return (
    <div className="patient-wallet-page">
      <div className="wallet-left">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>

          <h2>Withdrawal History</h2>
        </div>

        <div className="wallet-card">
          <FaHistory className="wallet-icon" />

          <h2>Withdrawal Requests</h2>

          <p>Track all your withdrawal requests from BADANIX.</p>
        </div>

        <div className="transaction-list">
          {loading ? (
            <div className="empty-transactions">
              Loading withdrawal history...
            </div>
          ) : withdrawals.length === 0 ? (
            <div className="empty-transactions">
              No withdrawal requests yet.
            </div>
          ) : (
            withdrawals.map((item) => (
              <div key={item.id} className="transaction-card">
                <div>
                  <h4>₦{Number(item.amount).toLocaleString()}</h4>

                  <p>{formatDateTime(item.created_at)}</p>

                  <small>{item.bank_name}</small>

                  <br />

                  <small>{item.account_name}</small>
                </div>

                <span className={`withdraw-status ${badgeClass(item.status)}`}>
                  {item.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
