import { useMemo, useState } from "react";
import { FaSearch, FaArrowLeft, FaEye, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../../../../assets/css/patientehrsearch.css";

import ApiUrl from "../../../../constants/ApiUrl";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";

export default function PatientEHRSearch() {
  const navigate = useNavigate();
  const { token, doctor } = useDoctorAuth();

  const documentsApproved = doctor?.documentsApproved;

  const [ehrNumber, setEhrNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showFullRecord, setShowFullRecord] = useState(false);

  const searchPatient = async (e) => {
    e.preventDefault();

    if (!documentsApproved) {
      Swal.fire({
        icon: "warning",
        title: "Documents Pending",
        text: "Your verification documents must be approved before you can access patient medical records.",
      });

      return;
    }

    if (!ehrNumber.trim()) {
      Swal.fire({
        icon: "warning",
        title: "EHR Required",
        text: "Enter the patient's EHR Number.",
      });

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${ApiUrl.SEARCH_PATIENT_EHR}/${ehrNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Not Found",
          text: data.message,
        });

        setPatient(null);
        setRecords([]);
        return;
      }

      setPatient(data.patient);
      setRecords(data.records);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to search patient.",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const keyword = searchText.toLowerCase();

      return (
        (record.chief_complaint || "").toLowerCase().includes(keyword) ||
        (record.diagnosis || "").toLowerCase().includes(keyword) ||
        (record.medical_notes || "").toLowerCase().includes(keyword) ||
        (record.medication || "").toLowerCase().includes(keyword) ||
        new Date(record.created_at)
          .toLocaleDateString()
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [records, searchText]);

   const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString();
  };


  return (
    <div className="patient-ehr-search-page">
      <div className="ehr-search-header">
        <button onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <div>
          <h2>Patient Medical Record Search</h2>
          <p>Search using patient's EHR Number</p>
        </div>
      </div>

      {!documentsApproved ? (
        <div className="document-warning-box">
          <div>
            <h5>Documents Under Review</h5>

            <p>
              Your verification documents must be fully approved before you can
              access patient medical records.
            </p>
          </div>

          <button onClick={() => navigate("/doctor/documentupload")}>
            Upload Documents
          </button>
        </div>
      ) : (
        <>
          <form className="ehr-search-form" onSubmit={searchPatient}>
            <input
              type="text"
              placeholder="Enter Patient EHR Number..."
              value={ehrNumber}
              onChange={(e) => setEhrNumber(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              <FaSearch />
              {loading ? " Searching..." : " Search"}
            </button>
          </form>
        </>
      )}
      {patient && (
        <>
          <div className="patient-summary">
            <div>
              <h3>{patient.fullname}</h3>

              <span>EHR: {patient.ehr_number}</span>
            </div>

            <div className="patient-summary-actions">
              <div className="record-count">
                {records.length} Medical Records
              </div>

              <button
                type="button"
                className="full-record-btn"
                onClick={() => setShowFullRecord(true)}
              >
                <FaEye />
                View Full Medical Record
              </button>
            </div>
          </div>

          <div className="table-toolbar">
            <input
              type="text"
              placeholder="Search diagnosis, medication, notes or date..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="table-wrapper">
            <table className="ehr-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Chief Complaint</th>
                  <th>Diagnosis</th>
                  <th>Medication</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="empty-row">
                      No matching medical record found.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((record) => (
                    <tr key={record.id}>
                      <td>
                        {new Date(record.created_at).toLocaleDateString()}
                      </td>

                      <td>{record.chief_complaint || "--"}</td>

                      <td>{record.diagnosis || "--"}</td>

                      <td>{record.medication || "--"}</td>

                      <td>
                        <button
                          className="view-btn"
                          onClick={() => setSelectedRecord(record)}
                        >
                          <FaEye />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {selectedRecord && (
        <div
          className="record-modal-overlay"
          onClick={() => setSelectedRecord(null)}
        >
          <div className="record-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Medical Record</h2>

              <button onClick={() => setSelectedRecord(null)}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="record-section">
                <h4>Chief Complaint</h4>
                <p>{selectedRecord.chief_complaint || "--"}</p>
              </div>

              <div className="record-section">
                <h4>History of Present Illness</h4>
                <p>{selectedRecord.history_of_present_illness || "--"}</p>
              </div>

              <div className="record-section">
                <h4>Diagnosis</h4>
                <p>{selectedRecord.diagnosis || "--"}</p>
              </div>

              <div className="record-section">
                <h4>Medical Notes</h4>
                <p>{selectedRecord.medical_notes || "--"}</p>
              </div>

              <div className="record-section">
                <h4>Treatment Plan</h4>
                <p>{selectedRecord.treatment_plan || "--"}</p>
              </div>

              <div className="record-section">
                <h4>Medication</h4>
                <p>{selectedRecord.medication || "--"}</p>
              </div>

              <div className="record-section">
                <h4>Laboratory Test</h4>
                <p>{selectedRecord.lab_test || "--"}</p>
              </div>

              <div className="record-section">
                <h4>Follow Up</h4>
                <p>{selectedRecord.follow_up_date || "--"}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL MEDICAL RECORD MODAL */}

      {showFullRecord && (
        <div
          className="full-record-modal-overlay"
          onClick={() => setShowFullRecord(false)}
        >
          <div
            className="full-record-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* DOCUMENT HEADER */}

            <div className="full-record-header">
              <div>
                <h2>Patient Medical Record</h2>

                <p>Complete Medical History</p>
              </div>

              <button type="button" onClick={() => setShowFullRecord(false)}>
                <FaTimes />
              </button>
            </div>

            {/* DOCUMENT */}

            <div className="full-record-body">
              {/* PATIENT INFORMATION */}

              <div className="medical-document-section">
                <div className="medical-document-title">
                  Patient Information
                </div>

                <div className="patient-document-grid">
                  <div>
                    <span>Full Name</span>
                    <strong>{patient?.fullname || "--"}</strong>
                  </div>

                  <div>
                    <span>EHR Number</span>
                    <strong>{patient?.ehr_number || "--"}</strong>
                  </div>

                  <div>
                    <span>Total Medical Records</span>
                    <strong>{records.length}</strong>
                  </div>
                </div>
              </div>

              {/* MEDICAL HISTORY */}

              <div className="medical-document-section">
                <div className="medical-document-title">Medical History</div>

                {records.length === 0 ? (
                  <div className="full-record-empty">
                    No medical records available.
                  </div>
                ) : (
                  records.map((record, index) => (
                    <div className="medical-history-entry" key={record.id}>
                      {/* RECORD NUMBER */}

                      <div className="medical-history-header">
                        <div>
                          <h3>Medical Record #{records.length - index}</h3>

                          <span>{formatDate(record.created_at)}</span>
                        </div>

                        <div>
                             <span className="doctor-badge">
                          Dr. {record.doctor?.fullname || "--"}
                        </span>
                          <p style={{ color: "gray", marginLeft: "10px", fontSize: "10px" }}>{record.doctor?.specialization || "--"}</p>
                        </div>
                     
                        
                      </div>

                      {/* RECORD DETAILS */}

                      <div className="medical-history-content">
                        {/* CHIEF COMPLAINT */}

                        <div className="document-field">
                          <h4>Chief Complaint</h4>

                          <p>{record.chief_complaint || "--"}</p>
                        </div>

                        {/* HISTORY */}

                        <div className="document-field">
                          <h4>History of Present Illness</h4>

                          <p>{record.history_of_present_illness || "--"}</p>
                        </div>

                        {/* DIAGNOSIS */}

                        <div className="document-field">
                          <h4>Diagnosis</h4>

                          <p>{record.diagnosis || "--"}</p>
                        </div>

                        {/* MEDICAL NOTES */}

                        <div className="document-field">
                          <h4>Medical Notes</h4>

                          <p>{record.medical_notes || "--"}</p>
                        </div>

                        {/* TREATMENT */}

                        <div className="document-field">
                          <h4>Treatment Plan</h4>

                          <p>{record.treatment_plan || "--"}</p>
                        </div>

                        {/* MEDICATION */}

                        <div className="document-field">
                          <h4>Medication</h4>

                          <p>{record.medication || "--"}</p>
                        </div>

                        {/* LAB */}

                        <div className="document-field">
                          <h4>Laboratory Test</h4>

                          <p>{record.lab_test || "--"}</p>
                        </div>

                        {/* FOLLOW UP */}

                        <div className="document-field">
                          <h4>Follow Up Date</h4>

                          <p>{record.follow_up_date || "--"}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* DOCUMENT FOOTER */}

            <div className="full-record-footer">
              <span>EHR: {patient?.ehr_number || "--"}</span>

              <span>{records.length} Medical Records</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
