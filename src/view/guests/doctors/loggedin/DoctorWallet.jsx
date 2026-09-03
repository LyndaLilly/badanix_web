import { useEffect, useState } from "react";
import { FaArrowLeft, FaWallet, FaMoneyBillWave } from "react-icons/fa";
import Swal from "sweetalert2";

import "../../../../assets/css/wallet.css";

import ApiUrl from "../../../../constants/ApiUrl";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";
import { Link } from "react-router-dom";

export default function DoctorWallet() {
  const { token, wallet, refreshWallet } = useDoctorAuth();
  const [doctor, setDoctor] = useState(null);

  const [transactions, setTransactions] = useState([]);

  const [withdrawals, setWithdrawals] = useState([]);

  const [amount, setAmount] = useState("");

  const [bankName, setBankName] = useState("");

  const [accountName, setAccountName] = useState("");

  const [accountNumber, setAccountNumber] = useState("");

  const [loading, setLoading] = useState(false);

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amountError, setAmountError] = useState("");

  const openWithdrawModal = () => {
    if (!bankName || !accountName || !accountNumber) {
      Swal.fire({
        icon: "warning",
        title: "Bank Details Missing",
        text: "Please update your bank details in your profile before requesting a withdrawal.",
      });

      return;
    }

    setShowWithdrawModal(true);
  };

  useEffect(() => {
    loadWallet();
    loadWithdrawals();
    loadDoctor();
  }, []);

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

  const loadWallet = async () => {
    try {
      const response = await fetch(ApiUrl.DOCTOR_WALLET, {
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

        setTransactions(data.wallet.transactions || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadWithdrawals = async () => {
    try {
      const response = await fetch(ApiUrl.DOCTOR_WITHDRAWALS, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setWithdrawals(data.withdrawals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeWithdrawModal = () => {
    setShowWithdrawModal(false);
    setAmount("");
    setAmountError("");
  };

  const submitWithdrawal = async () => {
    setAmountError("");

    if (!amount.trim()) {
      setAmountError("Withdrawal amount is required.");
      return;
    }

    if (Number(amount) <= 0) {
      setAmountError("Please enter a valid amount.");
      return;
    }

    if (Number(amount) < 100) {
      setAmountError("Minimum withdrawal amount is ₦100.");
      return;
    }

    if (Number(amount) > Number(wallet.balance)) {
      setAmountError("Withdrawal amount cannot exceed your wallet balance.");
      return;
    }

    if (!bankName.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Bank Required",
        text: "Please enter your bank name.",
      });
    }

    if (!accountName.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Account Name Required",
        text: "Please enter your account name.",
      });
    }

    if (!accountNumber.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Account Number Required",
        text: "Please enter your account number.",
      });
    }

    setLoading(true);

    try {
      const response = await fetch(ApiUrl.DOCTOR_WITHDRAW, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
          bank_name: bankName,
          account_name: accountName,
          account_number: accountNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors?.amount) {
          setAmountError(data.errors.amount[0]);
          setLoading(false);
          return;
        }

        if (
          data.message &&
          data.message.toLowerCase().includes("insufficient")
        ) {
          setAmountError(data.message);
          setLoading(false);
          return;
        }

        Swal.fire({
          icon: "error",
          title: "Withdrawal Failed",
          text: data.message || "Unable to submit withdrawal request.",
        });

        setLoading(false);
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Withdrawal Submitted",
        text: data.message,
      });

      closeWithdrawModal();

      await refreshWallet();
      await loadWithdrawals();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadDoctor = async () => {
    try {
      const response = await fetch(ApiUrl.DOCTOR_ME, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setDoctor(data.doctor);

        setBankName(data.doctor.profile?.bank_name || "");
        setAccountName(data.doctor.profile?.acct_name || "");
        setAccountNumber(data.doctor.profile?.acct_num || "");
      }
    } catch (error) {
      console.log(error);
    }
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
      {/* LEFT */}

      <div className="wallet-left">
        <div className="wallet-card">
          <FaWallet className="wallet-icon" />

          <h2>Available Balance</h2>

          <h1>₦{Number(wallet.balance).toLocaleString()}</h1>

          <button className="wallet-withdraw-btn" onClick={openWithdrawModal}>
            <FaMoneyBillWave />
            Withdraw Funds
          </button>
        </div>

        <div className="transaction-header">
          <h3 className="transaction-title">Recent Transactions</h3>

          {transactions.length > 5 && (
            <Link to="/doctor/transactions" className="see-more-btn">
              See All
            </Link>
          )}
        </div>

        <div className="transaction-list">
          {transactions.length === 0 ? (
            <div className="empty-transactions">
              No wallet transactions yet.
            </div>
          ) : (
            transactions.slice(0, 5).map((item) => (
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

      {/* RIGHT */}

      <div className="wallet-right">
        <div className="add-money-card">
          <h2>Withdrawal History</h2>

          <div className="transaction-list">
            {withdrawals.length === 0 ? (
              <div className="empty-transactions">
                No withdrawal requests yet.
              </div>
            ) : (
              withdrawals.slice(0, 5).map((item) => (
                <div key={item.id} className="transaction-card">
                  <div>
                    <h4>₦{Number(item.amount).toLocaleString()}</h4>

                    <p>{formatDateTime(item.created_at)}</p>

                    <small>{item.bank_name}</small>
                  </div>

                  <span
                    className={`withdraw-status ${badgeClass(item.status)}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}

      {showWithdrawModal && (
        <div className="wallet-modal">
          <div className="wallet-modal-content withdraw-modal">
            <button className="back-btn" onClick={closeWithdrawModal}>
              <FaArrowLeft />
            </button>

            <div className="withdraw-header">
              <div className="withdraw-icon">
                <FaMoneyBillWave />
              </div>

              <h2>Withdraw Funds</h2>

              <p>
                Your withdrawal request will be reviewed before payment is sent
                to your registered bank account.
              </p>
            </div>

            <div className="withdraw-balance-card">
              <span>Available Balance</span>

              <h3>₦{Number(wallet.balance).toLocaleString()}</h3>
            </div>

            <div className="withdraw-input-group">
              <label>Withdrawal Amount</label>

              <input
                type="number"
                min="100"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);

                  if (amountError) {
                    setAmountError("");
                  }
                }}
                className={amountError ? "input-error" : ""}
              />

              {amountError && (
                <small className="form-error">{amountError}</small>
              )}
            </div>

            <div className="bank-details-card">
              <h4>Destination Bank Account</h4>

              <div className="bank-row">
                <span>Bank</span>
                <strong>{bankName}</strong>
              </div>

              <div className="bank-row">
                <span>Account Name</span>
                <strong>{accountName}</strong>
              </div>

              <div className="bank-row">
                <span>Account Number</span>
                <strong>{accountNumber}</strong>
              </div>
            </div>

            <div className="withdraw-note">
              Funds will be sent to the bank account saved in your profile.
            </div>

            <button
              className="submit-withdraw-btn"
              disabled={loading}
              onClick={submitWithdrawal}
            >
              {loading ? "Submitting..." : "Submit Withdrawal"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
