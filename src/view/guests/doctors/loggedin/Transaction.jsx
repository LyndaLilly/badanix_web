import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../../../assets/css/transaction.css";

import ApiUrl from "../../../../constants/ApiUrl";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";

export default function Transaction() {
  const { token } = useDoctorAuth();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const response = await fetch(ApiUrl.DOCTOR_WALLET_TRANSACTIONS, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setTransactions(data.transactions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();

    const suffix = (n) => {
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

    return `${day}${suffix(day)} ${date.toLocaleString("en-GB", {
      month: "long",
      year: "numeric",
    })} • ${date.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  };

  const statusClass = (status) => {
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
    <div className="transaction-page">
      <div className="transaction-page-header">
        <h2>Transaction History</h2>

        <Link to="/doctor/wallet" className="back-link">
          Back to Wallet
        </Link>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-transactions">No transactions found.</div>
      ) : (
        <div className="transaction-history">
          {transactions.map((item) => (
            <div key={item.id} className="transaction-row">
              <div>
                <h4>{item.description}</h4>

                <p>{formatDateTime(item.created_at)}</p>

                <small>{item.reference}</small>

                {item.withdrawal_status && (
                  <div
                    className={`withdraw-status ${statusClass(
                      item.withdrawal_status,
                    )}`}
                  >
                    {item.withdrawal_status}
                  </div>
                )}
              </div>

              <strong className={item.type === "credit" ? "credit" : "debit"}>
                {item.type === "credit" ? "+" : "-"}₦
                {Number(item.amount).toLocaleString()}
              </strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
