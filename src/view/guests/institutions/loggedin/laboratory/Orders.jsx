
import { useState } from "react";
import {
  FaArrowLeft,
  FaSearch,
  FaUserMd,
  FaFlask,
  FaSpinner,
  FaFileUpload,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../../../../../assets/css/pharmacyorders.css";
import ApiUrl from "../../../../../constants/ApiUrl";
import { useInstitutionAuth } from "../../../../../contexts/InstitutionAuthContext";

export default function Orders() {
  const { token, institution } = useInstitutionAuth();

  const navigate = useNavigate();

  const [ehr, setEhr] = useState("BU5731199805");
  const [loading, setLoading] = useState(false);

  const [records, setRecords] = useState([]);

  /*
  |--------------------------------------------------------------------------
  | Institution document protection
  |--------------------------------------------------------------------------
  */

  if (!institution?.documentsApproved) {
    return (
      <div className="pharmacy-orders-page">
        <div className="pharmacy-order-card">
          <div className="pharmacy-patient-summary">
            <h2>Orders Locked</h2>

            <p>
              You cannot access patient laboratory orders until all required
              documents have been uploaded and approved.
            </p>
          </div>

          <button
            className="dispense-btn"
            onClick={() => navigate("/laboratory/documentupload")}
          >
            <FaFileUpload />
            Upload Documents
          </button>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Search Laboratory Orders
  |--------------------------------------------------------------------------
  */

  const searchLabOrders = async () => {
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
        `${ApiUrl.SEARCH_LAB_ORDERS}/${ehr}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Laboratory orders not found.",
        );
      }

      if (!data.records || data.records.length === 0) {
        throw new Error("No laboratory orders found.");
      }

      // Latest laboratory orders first
      const sorted = [...data.records].sort(
        (a, b) =>
          new Date(b.consultation_date) -
          new Date(a.consultation_date),
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

  /*
  |--------------------------------------------------------------------------
  | Process Laboratory Test
  |--------------------------------------------------------------------------
  */

  const processLabTest = async (recordId) => {
    const confirm = await Swal.fire({
      title: "Process Laboratory Test?",
      text: "This action will mark this laboratory test as completed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Process",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${ApiUrl.PROCESS_LAB_TEST}/${recordId}/process`,
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
        throw new Error(
          data.message || "Failed to process laboratory test.",
        );
      }

      Swal.fire({
        icon: "success",
        title: "Processed",
        text: data.message,
      });

      // Refresh the current EHR records
      searchLabOrders();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message,
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Date Formatting
  |--------------------------------------------------------------------------
  */

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

      {/* Back to Dashboard */}

      <Link to="/laboratory/dashboard" className="pharmacy-orders-back">
        <FaArrowLeft />
        Back to Dashboard
      </Link>

      {/* Search */}

      <div className="pharmacy-order-search-card">
        <h3>Find Patient Laboratory Orders</h3>

        <p>
          Enter the patient's EHR Number to retrieve all laboratory orders.
        </p>

        <div className="pharmacy-order-search">
          <input
            type="text"
            value={ehr}
            placeholder="Enter EHR Number"
            onChange={(e) =>
              setEhr(e.target.value.toUpperCase())
            }
          />

          <button onClick={searchLabOrders} disabled={loading}>
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

      {/* Results */}

      {records.length > 0 && (
        <div className="pharmacy-order-card">

          {/* Patient Summary */}

          <div className="pharmacy-patient-summary">
            <div>
              <span>Patient Name</span>
              <strong>
                {records[0]?.patient?.fullname}
              </strong>
            </div>

            <div>
              <span>EHR Number</span>
              <strong>
                {records[0]?.patient?.ehr_number}
              </strong>
            </div>

            <div>
              <span>Total Laboratory Orders</span>
              <strong>{records.length}</strong>
            </div>
          </div>

          <p>
            Select a laboratory order to view its details. The newest
            consultation appears first.
          </p>

          {/* Table */}

          <div className="pharmacy-table-wrapper">
            <table className="pharmacy-orders-table">
              <thead>
                <tr>
                  <th>Consultation Date</th>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Laboratory Test</th>
                  <th>View</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {records.map((record) => {
                  const completed =
                    record.lab_test_status === "completed";

                  return (
                    <tr key={record.id}>

                      {/* Consultation Date */}

                      <td>
                        {formatDateTime(
                          record.consultation_date,
                        )}
                      </td>

                      {/* Doctor */}

                      <td>
                        <div className="table-user">
                          <FaUserMd />

                          <span>
                            {record.doctor?.fullname}
                          </span>
                        </div>
                      </td>

                      {/* Appointment Status */}

                      <td>
                        <span className="appointment-status">
                          {record.appointment_status}
                        </span>
                      </td>

                      {/* Laboratory Status */}

                      <td>
                        <span
                          className={
                            completed
                              ? "prescription-dispensed"
                              : "prescription-ready"
                          }
                        >
                          {completed
                            ? "Completed"
                            : "Pending"}
                        </span>
                      </td>

                      {/* View */}

                      <td>
                        <button
                          className={
                            completed
                              ? "view-medication-btn disabled"
                              : "view-medication-btn"
                          }
                          disabled={completed}
                          onClick={() => {
                            if (completed) return;

                            Swal.fire({
                              title: "Laboratory Test",
                              html: `
                                <div style="
                                  text-align:left;
                                  white-space:pre-wrap;
                                  line-height:1.8;
                                  font-size:15px;
                                ">
                                  ${
                                    record.lab_test ||
                                    "No laboratory test specified."
                                  }
                                </div>

                                <hr>

                                <strong>Consultation Date:</strong><br>
                                ${formatDateTime(
                                  record.consultation_date,
                                )}
                              `,
                              width: 700,
                            });
                          }}
                        >
                          <FaFlask />

                          {completed
                            ? "Completed"
                            : "View"}
                        </button>
                      </td>

                      {/* Process */}

                      <td>
                        <button
                          className={
                            completed
                              ? "dispense-btn disabled"
                              : "dispense-btn"
                          }
                          disabled={completed}
                          onClick={() =>
                            processLabTest(record.id)
                          }
                        >
                          {completed
                            ? "Completed"
                            : "Process"}
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

