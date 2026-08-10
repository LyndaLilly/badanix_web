import { useState } from "react";
import {
  FaArrowLeft,
  FaSearch,
  FaUser,
  FaUserMd,
  FaCalendarAlt,
  FaPills,
  FaCheckCircle,
  FaSpinner,
  FaFileUpload,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import "../../../../../assets/css/pharmacyorders.css";
import ApiUrl from "../../../../../constants/ApiUrl";
import { useInstitutionAuth } from "../../../../../contexts/InstitutionAuthContext";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const { token, institution } = useInstitutionAuth();

  const navigate = useNavigate();

  const [ehr, setEhr] = useState("");
  const [loading, setLoading] = useState(false);

  const [records, setRecords] = useState([]);

  if (!institution?.documentsApproved) {
    return (
      <div className="pharmacy-orders-page">
        <div className="document-warning-box">
          <div>
            <h5>Orders Locked</h5>

            <p>
              You cannot access patient prescriptions until all required
              documents have been uploaded and approved.
            </p>
          </div>

          <button onClick={() => navigate("/pharmacy/documentupload")}>
            <FaFileUpload />
            Upload Documents
          </button>
        </div>
      </div>
    );
  }

  const searchPrescription = async () => {
    if (!ehr.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Required",
        text: "Please enter patient's EHR Number.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${ApiUrl.SEARCH_PHARMACY_PRESCRIPTION}/${ehr}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Prescription not found.");
      }

      if (!data.records || data.records.length === 0) {
        throw new Error("No prescription found.");
      }

      // Latest prescriptions first
      const sorted = [...data.records].sort(
        (a, b) => new Date(b.consultation_date) - new Date(a.consultation_date),
      );

      setRecords(sorted);
    } catch (error) {
      setRecords([]);

      Swal.fire({
        icon: "error",
        title: "Not Found",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const dispensePrescription = async (recordId) => {
    const confirm = await Swal.fire({
      title: "Dispense Prescription?",
      text: "This action will mark this prescription as dispensed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Dispense",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${ApiUrl.DISPENSE_PHARMACY_PRESCRIPTION}/${recordId}/dispense`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to dispense prescription.");
      }

      Swal.fire({
        icon: "success",
        title: "Dispensed",
        text: data.message,
      });

      // refresh records
      searchPrescription();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message,
      });
    }
  };

  const formatDateTime = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <div className="pharmacy-orders-page">
      <Link
        to="/institution/pharmacy/dashboard"
        className="pharmacy-orders-back"
      >
        <FaArrowLeft />
        Back to Dashboard
      </Link>

      <div className="pharmacy-order-search-card">
        <h3>Find Patient Prescription</h3>

        <p>Enter the patient's EHR Number to retrieve all prescriptions.</p>

        <div className="pharmacy-order-search">
          <input
            type="text"
            value={ehr}
            placeholder="Enter EHR Number"
            onChange={(e) => setEhr(e.target.value.toUpperCase())}
          />

          <button onClick={searchPrescription} disabled={loading}>
            {loading ? (
              <>
                <FaSpinner className="spin" />
                Searching...
              </>
            ) : (
              <>
                <FaSearch />
                Search
              </>
            )}
          </button>
        </div>
      </div>

      {records.length > 0 && (
        <>
          <div className="pharmacy-order-card">
            <div className="pharmacy-patient-summary">
              <div>
                <span>Patient Name</span>
                <strong>{records[0]?.patient?.fullname}</strong>
              </div>

              <div>
                <span>EHR Number</span>
                <strong>{records[0]?.patient?.ehr_number}</strong>
              </div>

              <div>
                <span>Total Prescriptions</span>
                <strong>{records.length}</strong>
              </div>
            </div>

            <p>
              Select the prescription the patient wants to purchase. The newest
              consultation appears first.
            </p>

            <div className="pharmacy-table-wrapper">
              <table className="pharmacy-orders-table">
                <thead>
                  <tr>
                    <th>Consultation Date</th>

                    <th>Doctor</th>
                    <th>Status</th>
                    <th>Prescription</th>
                    <th>View</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td>{formatDateTime(record.consultation_date)}</td>

                      <td>
                        <div className="table-user">
                          <FaUserMd />
                          <span>{record.doctor.fullname}</span>
                        </div>
                      </td>

                      <td>
                        <span className="appointment-status">
                          {record.appointment_status}
                        </span>
                      </td>
                      <td>
                        <span
                          className={
                            record.dispensed
                              ? "prescription-dispensed"
                              : "prescription-ready"
                          }
                        >
                          {record.dispensed ? "Dispensed" : "Pending"}
                        </span>
                      </td>

                      <td>
                        <button
                          className={
                            record.dispensed
                              ? "view-medication-btn disabled"
                              : "view-medication-btn"
                          }
                          disabled={record.dispensed}
                          onClick={() => {
                            if (record.dispensed) return;

                            Swal.fire({
                              title: "Medication",
                              html: `
          <div style="
            text-align:left;
            white-space:pre-wrap;
            line-height:1.8;
            font-size:15px;
          ">
            ${record.medication || "No medication prescribed."}
          </div>

          ${
            record.follow_up_date
              ? `<hr>
                 <strong>Follow Up:</strong><br>
                 ${formatDate(record.follow_up_date)}`
              : ""
          }
        `,
                              width: 700,
                            });
                          }}
                        >
                          <FaPills />
                          {record.dispensed ? "Dispensed" : "View"}
                        </button>
                      </td>

                      <td>
                        <button
                          className={
                            record.dispensed
                              ? "dispense-btn disabled"
                              : "dispense-btn"
                          }
                          disabled={record.dispensed}
                          onClick={() => dispensePrescription(record.id)}
                        >
                          {record.dispensed ? "Dispensed" : "Dispense"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
