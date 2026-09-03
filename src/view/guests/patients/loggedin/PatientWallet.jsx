import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

import "../../../../assets/css/wallet.css";

import ApiUrl from "../../../../constants/ApiUrl";
import { usePatientAuth } from "../../../../contexts/PatientAuthContext";
import { Link } from "react-router-dom";

export default function PatientWallet() {
  const { token, wallet, refreshWallet } = usePatientAuth();

  const [transactions, setTransactions] = useState([]);

  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const formatDateTime = (dateString) => {
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

    const formattedDate = `${day}${getOrdinal(day)} ${date.toLocaleString(
      "en-GB",
      {
        month: "long",
        year: "numeric",
      },
    )}`;

    const formattedTime = date.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} • ${formattedTime}`;
  };

  useEffect(() => {
    loadWallet();

    const params = new URLSearchParams(window.location.search);

    const reference = params.get("reference");

    const alreadyVerified = localStorage.getItem("payment_verified");

    if (reference && alreadyVerified !== reference) {
      verifyPayment(reference);
    }
  }, []);

  const loadWallet = async () => {
    try {
      const response = await fetch(ApiUrl.PATIENT_ME, {
        method: "GET",

        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setWallet({
          balance: data.wallet.balance,
        });

        setTransactions(data.wallet.transactions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const continuePayment = () => {
    if (!amount || Number(amount) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Amount",
        text: "Please enter an amount greater than ₦0.",
      });

      return;
    }

    if (Number(amount) < 100) {
      Swal.fire({
        icon: "error",
        title: "Minimum Deposit",
        text: "Minimum deposit is ₦100.",
      });

      return;
    }

    setShowPaymentModal(true);
  };

  const closeModal = () => {
    setShowPaymentModal(false);
  };

  const payWithPaystack = async () => {
    try {
      setLoading(true);

      const response = await fetch(ApiUrl.INITIALIZE_PAYMENT, {
        method: "POST",

        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          amount: Number(amount),
          platform: "web",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",

          title: "Payment Error",

          text: data.message || "Unable to initialize payment.",
        });

        setLoading(false);

        return;
      }

      // remove previous verification

      localStorage.removeItem("payment_verified");

      // save current payment reference

      localStorage.setItem("payment_reference", data.reference);

      // redirect to paystack

      window.location.href = data.authorization_url;
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",

        title: "Payment Failed",

        text: "Unable to initialize payment.",
      });

      setLoading(false);
    }
  };

  const verifyPayment = async (reference) => {
    try {
      const response = await fetch(ApiUrl.VERIFY_PAYMENT, {
        method: "POST",

        headers: {
          Accept: "application/json",

          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          reference,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",

          title: "Verification Failed",

          text: data.message || "Payment verification failed.",
        });

        return;
      }

      // mark this payment as verified

      localStorage.setItem("payment_verified", reference);

      localStorage.removeItem("payment_reference");

      // remove reference from URL

      window.history.replaceState({}, document.title, window.location.pathname);

      Swal.fire({
        icon: "success",

        title: "Payment Successful",

        text: "Your wallet has been funded successfully.",
      });

      setShowPaymentModal(false);

      setAmount("");

      // loadWallet();
      await refreshWallet();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="patient-wallet-page">
      {/* Wallet Section */}

      <div className="wallet-left">
        <div className="wallet-card">
          <h2>Wallet Balance</h2>

          <h1>₦{Number(wallet.balance).toLocaleString()}</h1>
        </div>

        <div className="transaction-header">
          <h3 className="transaction-title">Recent Transactions</h3>

          {transactions.length > 2 && (
            <Link to="/patient/transactions" className="see-more-btn">
              See All
            </Link>
          )}
        </div>

        <div className="transaction-list">
          {transactions.length === 0 ? (
            <div className="empty-transactions">No transactions found.</div>
          ) : (
            transactions.slice(0, 10).map((item) => (
              <div key={item.id} className="transaction-card">
                <div>
                  <h4>{item.description}</h4>

                  <p>{formatDateTime(item.created_at)}</p>
                </div>

                <strong className={item.type === "credit" ? "credit" : "debit"}>
                  {item.type === "credit" ? "+" : "-"}₦
                  {Number(item.amount).toLocaleString()}
                </strong>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Money */}

      <div className="wallet-right">
        <div className="add-money-card">
          <h2>Add Money</h2>

          <input
            type="number"
            min="1"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;

              if (value >= 0) {
                setAmount(value);
              }
            }}
          />

          <button onClick={continuePayment} disabled={loading}>
            Continue
          </button>
        </div>
      </div>

      {/* Payment Modal */}

      {showPaymentModal && (
        <div className="wallet-modal">
          <div className="wallet-modal-content">
            <button className="back-btn" onClick={closeModal}>
              <FaArrowLeft />
            </button>

            <h2>Payment Method</h2>

            <p>
              Choose one of the following payment methods to add funds to your
              wallet
            </p>

            <button
              className="paystack-btn"
              onClick={payWithPaystack}
              disabled={loading}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk7pkVlAhrrwFQ5Eq1QOdvUk6nuxnmPnQJv8VD8qmc-Q&s"
                alt="Paystack"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
