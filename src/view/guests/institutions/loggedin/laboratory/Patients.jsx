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
  FaFlask,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../../../../../assets/css/pharmacyorders.css";
import ApiUrl from "../../../../../constants/ApiUrl";
import { useInstitutionAuth } from "../../../../../contexts/InstitutionAuthContext";

export default function Patients() {
  const { token, institution } = useInstitutionAuth();

  const navigate = useNavigate();

  const [labPatients, setLabPatients] = useState([]);
  const [filteredLabPatients, setFilteredLabPatients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  if (!institution?.documentsApproved) {
    return (
      <div className="pharmacy-orders-page">
        <div className="pharmacy-order-card">
          <div style={{ textAlign: "center", padding: "50px" }}>
            <FaFileUpload size={40} />

            <h2>Patients Locked</h2>

            <p>
              You cannot access processed laboratory patients until all
              required documents have been uploaded and approved.
            </p>

            <button
              onClick={() => navigate("/laboratory/documentupload")}
            >
              <FaFileUpload />
              Upload Documents
            </button>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchProcessedLabPatients();
  }, []);

  const fetchProcessedLabPatients = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        ApiUrl.GET_PROCESSED_LAB_PATIENTS,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("PROCESSED LAB PATIENTS:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch processed laboratory patients."
        );
      }

      const records = data.patients || [];

      setLabPatients(records);
      setFilteredLabPatients(records);
    } catch (error) {
      setLabPatients([]);
      setFilteredLabPatients([]);

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
      setFilteredLabPatients(labPatients);
      return;
    }

    const filtered = labPatients.filter((record) => {
      const patientName =
        record.patient?.fullname?.toLowerCase() || "";

      const ehrNumber =
        record.patient?.ehr_number?.toLowerCase() || "";

      const doctorName =
        record.doctor?.fullname?.toLowerCase() || "";

      const labTest =
        record.lab_test?.toLowerCase() || "";

      return (
        patientName.includes(query) ||
        ehrNumber.includes(query) ||
        doctorName.includes(query) ||
        labTest.includes(query)
      );
    });

    setFilteredLabPatients(filtered);
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

  const showLabTest = (record) => {
    Swal.fire({
      title: "Laboratory Test",
      html: `
        <div style="
          text-align:left;
          white-space:pre-wrap;
          line-height:1.8;
          font-size:15px;
        ">
          ${record.lab_test || "No laboratory test specified."}
        </div>

        <hr>

        <strong>Status:</strong><br>
        ${record.lab_test_status || "--"}

        ${
          record.lab_test_processed_at
            ? `
              <hr>
              <strong>Processed At:</strong><br>
              ${formatDateTime(record.lab_test_processed_at)}
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
      <Link
        to="/laboratory/dashboard"
        className="pharmacy-orders-back"
      >
        <FaArrowLeft />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="pharmacy-order-search-card">
        <h3>Processed Laboratory Patients</h3>

        <p>
          View patients whose laboratory tests have been processed
          by this laboratory.
        </p>

        <div className="pharmacy-order-search">
          <input
            type="text"
            value={search}
            placeholder="Search patient, EHR, doctor or lab test..."
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
            <span>Total Processed</span>
            <strong>{labPatients.length}</strong>
          </div>

          <div>
            <span>Showing</span>
            <strong>{filteredLabPatients.length}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>Completed</strong>
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
            <FaSpinner
              className="spin"
              size={30}
            />

            <p style={{ marginTop: "15px" }}>
              Loading processed laboratory patients...
            </p>
          </div>

        ) : filteredLabPatients.length === 0 ? (

          <div
            style={{
              padding: "50px",
              textAlign: "center",
            }}
          >
            <FaFlask size={35} />

            <h3>
              {search
                ? "No matching patient found"
                : "No processed laboratory patients"}
            </h3>

            <p>
              {search
                ? "Try searching with another name, EHR number, doctor or laboratory test."
                : "No laboratory test has been processed by this laboratory yet."}
            </p>
          </div>

        ) : (

          <>
            <p>
              Showing all patients whose laboratory tests have
              been processed by this laboratory.
            </p>

            <div className="pharmacy-table-wrapper">

              <table className="pharmacy-orders-table">

                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>EHR Number</th>
                    <th>Doctor</th>
                    <th style={{ textOverflow: "ellipsis", maxWidth: "250px" }}>Lab Test</th>
                    <th>Consultation</th>
                    <th>Processed At</th>
                    <th>Status</th>
                    <th>View</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredLabPatients.map((record) => (

                    <tr key={record.id}>

                      {/* Patient */}
                      <td>
                        <div className="table-user">

                          {record.patient?.profile_image ? (
                            <img
                              src={record.patient.profile_image}
                              alt={
                                record.patient?.fullname ||
                                "Patient"
                              }
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

                          <span>
                            {record.patient?.fullname || "--"}
                          </span>

                        </div>
                      </td>

                      {/* EHR */}
                      <td>
                        <strong>
                          {record.patient?.ehr_number || "--"}
                        </strong>
                      </td>

                      {/* Doctor */}
                      <td>
                        <div className="table-user">

                        

                          <span>
                            {record.doctor?.fullname || "--"}
                          </span>

                        </div>
                      </td>

                      {/* Laboratory Test */}
                      <td>
                        <div
                          style={{
                            maxWidth: "250px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={record.lab_test || ""}
                        >
                          {record.lab_test || "--"}
                        </div>
                      </td>

                      {/* Consultation */}
                      <td>
                        <div className="table-user">

                          <FaCalendarAlt />

                          <span>
                            {formatDateTime(
                              record.consultation_date
                            )}
                          </span>

                        </div>
                      </td>

                      {/* Processed At */}
                      <td>
                        {formatDateTime(
                          record.lab_test_processed_at
                        )}
                      </td>

                      {/* Status */}
                      <td>
                        <span className="prescription-dispensed">
                          Completed
                        </span>
                      </td>

                      {/* View */}
                      <td>

                        <button
                          className="view-medication-btn"
                          onClick={() =>
                            showLabTest(record)
                          }
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