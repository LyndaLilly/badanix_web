import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaSearch,
  FaUser,
  FaUserMd,
  FaCalendarAlt,
  FaPills,
  FaSpinner,
  FaEye,
  FaFileUpload,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../../../../../assets/css/pharmacyorders.css";
import ApiUrl from "../../../../../constants/ApiUrl";
import { useInstitutionAuth } from "../../../../../contexts/InstitutionAuthContext";

export default function Patients() {
  const { token, institution } = useInstitutionAuth();

  const navigate = useNavigate();

  const [medications, setMedications] = useState([]);
  const [filteredMedications, setFilteredMedications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  if (!institution?.documentsApproved) {
    return (
      <div className="pharmacy-orders-page">
        <div className="document-warning-box">
          <h2>Patients Locked</h2>

          <p>
            You cannot access dispensed patient medications until all required
            documents have been uploaded and approved.
          </p>

          <button onClick={() => navigate("/pharmacy/documentupload")}>
            <FaFileUpload />
            Upload Documents
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchDispensedMedications();
  }, []);

  const fetchDispensedMedications = async () => {
    setLoading(true);

    try {
      const response = await fetch(ApiUrl.GET_DISPENSED_PHARMACY_MEDICATIONS, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("DISPENSED DATA:", data);
      console.log(
        "PROFILE IMAGE:",
        data.medications?.[0]?.patient?.profile_image,
      );

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch dispensed medications.",
        );
      }

      const records = data.medications || [];

      setMedications(records);
      setFilteredMedications(records);
    } catch (error) {
      setMedications([]);
      setFilteredMedications([]);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);

    const query = value.trim().toLowerCase();

    if (!query) {
      setFilteredMedications(medications);
      return;
    }

    const filtered = medications.filter((record) => {
      const patientName = record.patient?.fullname?.toLowerCase() || "";

      const ehrNumber = record.patient?.ehr_number?.toLowerCase() || "";

      const doctorName = record.doctor?.fullname?.toLowerCase() || "";

      const medication = record.medication?.toLowerCase() || "";

      return (
        patientName.includes(query) ||
        ehrNumber.includes(query) ||
        doctorName.includes(query) ||
        medication.includes(query)
      );
    });

    setFilteredMedications(filtered);
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

  const showMedication = (record) => {
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
            ? `
              <hr>
              <strong>Follow Up:</strong><br>
              ${formatDate(record.follow_up_date)}
            `
            : ""
        }
      `,
      width: 700,
    });
  };

  return (
    <div className="pharmacy-orders-page">
      {/* Back */}
      <Link to="/pharmacy/dashboard" className="pharmacy-orders-back">
        <FaArrowLeft />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="pharmacy-order-search-card">
        <h3>Dispensed Patients</h3>

        <p>
          View patients whose prescriptions have been dispensed by this
          pharmacy.
        </p>

        <div className="pharmacy-order-search">
          <input
            type="text"
            value={search}
            placeholder="Search patient, EHR, doctor or medication..."
            onChange={(e) => handleSearch(e.target.value)}
          />

          <button type="button">
            <FaSearch />
            Search
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="pharmacy-order-card">
        <div className="pharmacy-patient-summary">
          <div>
            <span>Total Dispensed</span>
            <strong>{medications.length}</strong>
          </div>

          <div>
            <span>Showing</span>
            <strong>{filteredMedications.length}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>Dispensed</strong>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div
            style={{
              padding: "50px",
              textAlign: "center",
            }}
          >
            <FaSpinner className="spin" size={30} />

            <p style={{ marginTop: "15px" }}>
              Loading dispensed medications...
            </p>
          </div>
        ) : filteredMedications.length === 0 ? (
          <div
            style={{
              padding: "50px",
              textAlign: "center",
            }}
          >
            <FaPills size={35} />

            <h3>
              {search
                ? "No matching patient found"
                : "No dispensed medications"}
            </h3>

            <p>
              {search
                ? "Try searching with another name, EHR number or medication."
                : "No medication has been dispensed by this pharmacy yet."}
            </p>
          </div>
        ) : (
          <>
            <p>
              Showing all prescriptions that have been dispensed by this
              pharmacy.
            </p>

            <div className="pharmacy-table-wrapper">
              <table className="pharmacy-orders-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>EHR Number</th>
                    <th>Doctor</th>
                    <th>Medication</th>
                    <th>Consultation</th>
                    <th>Dispensed At</th>
                    <th>Status</th>
                    <th>View</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMedications.map((record) => (
                    <tr key={record.id}>
                      {/* Patient */}
                      <td>
                        <div className="table-user">
                          {record.patient?.profile_image ? (
                            <img
                              src={record.patient.profile_image}
                              alt={record.patient?.fullname || "Patient"}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <FaUser />
                          )}

                          <span>{record.patient?.fullname || "--"}</span>
                        </div>
                      </td>

                      {/* EHR */}
                      <td>
                        <strong>{record.patient?.ehr_number || "--"}</strong>
                      </td>

                      {/* Doctor */}
                      <td>
                        <div className="table-user">
                        

                          <span>{record.doctor?.fullname || "--"}</span>
                        </div>
                      </td>

                      {/* Medication */}
                      <td>
                        <div
                          style={{
                            maxWidth: "250px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={record.medication || ""}
                        >
                          {record.medication || "--"}
                        </div>
                      </td>

                      {/* Consultation */}
                      <td>
                        <div className="table-user">
                          <FaCalendarAlt />

                          <span>
                            {formatDateTime(record.consultation_date)}
                          </span>
                        </div>
                      </td>

                      {/* Dispensed */}
                      <td>{formatDateTime(record.dispensed_at)}</td>

                      {/* Status */}
                      <td>
                        <span className="prescription-dispensed">
                          Dispensed
                        </span>
                      </td>

                      {/* View */}
                      <td>
                        <button
                          className="view-medication-btn"
                          onClick={() => showMedication(record)}
                        >
                          <FaEye />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
