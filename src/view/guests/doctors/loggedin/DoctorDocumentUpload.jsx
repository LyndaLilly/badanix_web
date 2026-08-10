import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaInfoCircle, FaFileAlt, FaArrowLeft } from "react-icons/fa";

import "../../../../assets/css/documentupload.css";
import ApiUrl from "../../../../constants/ApiUrl";
import Swal from "sweetalert2";

const requiredDocuments = [
  {
    type: "medical_degree_certificate",
    name: "Medical Degree Certificate (MBBS)",
  },
  {
    type: "specialist_certificates",
    name: "Specialist Certificates",
  },
  {
    type: "medical_practice_license",
    name: "Medical Practice License",
  },
  {
    type: "training_certificates",
    name: "Training Certificates",
  },
  {
    type: "letter_of_recommendation",
    name: "Letter of Recommendation",
  },
  {
    type: "medical_fitness_report",
    name: "Medical Fitness Report",
  },
  {
    type: "national_identification",
    name: "Proof of National Identification",
  },
  {
    type: "full_size_picture",
    name: "Full-Size Picture of Yourself",
  },
  {
    type: "passport_photograph",
    name: "Passport Photograph",
  },
  {
    type: "verification_timeline_consent",
    name: "Verification Timeline Consent",
  },
];

export default function DoctorDocumentUpload() {
  const [documents, setDocuments] = useState([]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileInputsRef = useRef({});

  const navigate = useNavigate();

  const handleFileChange = (type, name, file) => {
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setDocuments((prev) => {
      const others = prev.filter((d) => d.document_type !== type);

      return [
        ...others,
        {
          document_type: type,
          document_name: name,
          file,
          preview,
          isPdf: file.type === "application/pdf",
        },
      ];
    });
  };

  const uploadDocuments = async () => {
    if (documents.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Documents Selected",
        text: "Please select documents before uploading.",
        confirmButtonColor: "#14361D",
      });

      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      documents.forEach((doc, index) => {
        formData.append(
          `documents[${index}][document_type]`,
          doc.document_type,
        );

        formData.append(
          `documents[${index}][document_name]`,
          doc.document_name,
        );

        formData.append(`documents[${index}][file]`, doc.file);
      });

      const token = localStorage.getItem("doctor_token");

      const response = await fetch(ApiUrl.UPLOAD_DOCTOR_DOCUMENTS, {
        method: "POST",

        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",

          title: "Upload Failed",

          text: data.message || "Unable to upload documents.",

          confirmButtonColor: "#14361D",
        });

        return;
      }

      Swal.fire({
        icon: "success",

        title: "Upload Successful",

        text: "Doctor documents uploaded successfully.",

        timer: 2000,

        showConfirmButton: false,
      });

      documents.forEach((doc) => {
        if (doc.preview) {
          URL.revokeObjectURL(doc.preview);
        }
      });

      setDocuments([]);

      await loadDocuments();

      Object.values(fileInputsRef.current).forEach((input) => {
        if (input) {
          input.value = "";
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "Network Error",

        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadDocuments = async () => {
    try {
      const token = localStorage.getItem("doctor_token");

      const response = await fetch(ApiUrl.GET_DOCTOR_DOCUMENTS, {
        headers: {
          Accept: "application/json",

          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setUploadedDocuments(data.documents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDocument = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Document?",

      text: "You can upload another copy later.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Delete",

      confirmButtonColor: "#dc3545",
    });

    if (!confirm.isConfirmed) return;

    try {
      const token = localStorage.getItem("doctor_token");

      const response = await fetch(
        `${ApiUrl.DELETE_DOCTOR_DOCUMENT}/${id}`,

        {
          method: "DELETE",

          headers: {
            Accept: "application/json",

            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",

          title: "Deleted",

          text: data.message,

          timer: 1500,

          showConfirmButton: false,
        });

        loadDocuments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <div className="container py-4">
      <div className="card shadow border-0">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <div>
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/doctor/dashboard")}
              >
                <FaArrowLeft className="me-2" />
                Back to Dashboard
              </button>

              <h2 className="page-title mt-3">Doctor Verification</h2>

              <p className="text-muted">
                Upload all required documents for doctor verification.
              </p>
            </div>

            <div className="mt-3 mt-md-0">
              <button
                className="instruction-btn"
                onClick={() => setShowInstructions(true)}
              >
                <FaInfoCircle className="me-2" />
                View Instructions
              </button>
            </div>
          </div>

          <div className="row">
            {requiredDocuments.map((doc) => {
              const selectedDoc = documents.find(
                (d) => d.document_type === doc.type,
              );

              const uploadedDoc = uploadedDocuments.find(
                (d) => d.document_type === doc.type,
              );

              return (
                <div className="col-lg-6 mb-4" key={doc.type}>
                  <div className="card document-card h-100">
                    <div className="card-body">
                      <h5 className="fw-bold mb-3">
                        <FaFileAlt className="me-2" />

                        {doc.name}
                      </h5>
                      <span
                        className={`
                        badge mb-3
                        ${
                          selectedDoc
                            ? "bg-success"
                            : uploadedDoc
                              ? "bg-primary"
                              : "bg-secondary"
                        }
                        `}
                      >
                        {selectedDoc
                          ? "Selected"
                          : uploadedDoc
                            ? "Uploaded"
                            : "Not Uploaded"}
                      </span>{" "}
                      <span
                        className={`badge mb-3 ${
                          selectedDoc
                            ? "bg-warning text-dark"
                            : uploadedDoc?.status?.toLowerCase() === "approved"
                              ? "bg-success"
                              : uploadedDoc?.status?.toLowerCase() === "pending"
                                ? "bg-warning text-dark"
                                : uploadedDoc?.status?.toLowerCase() ===
                                    "rejected"
                                  ? "bg-danger"
                                  : "bg-secondary"
                        }`}
                      >
                        {selectedDoc
                          ? "Selected"
                          : uploadedDoc?.status?.toLowerCase() === "approved"
                            ? "Approved"
                            : uploadedDoc?.status?.toLowerCase() === "pending"
                              ? "Pending"
                              : uploadedDoc?.status?.toLowerCase() ===
                                  "rejected"
                                ? "Rejected"
                                : uploadedDoc
                                  ? uploadedDoc.status || "Uploaded"
                                  : "Not Uploaded"}
                      </span>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*,.pdf"
                        ref={(el) => (fileInputsRef.current[doc.type] = el)}
                        disabled={uploadedDoc?.status === "approved"}
                        onChange={(e) =>
                          handleFileChange(
                            doc.type,
                            doc.name,
                            e.target.files[0],
                          )
                        }
                      />
                      {selectedDoc && (
                        <div className="mt-3 text-center">
                          {selectedDoc.isPdf ? (
                            <>
                              <FaFileAlt size={60} color="#dc3545" />

                              <p>{selectedDoc.file.name}</p>

                              <a
                                href={selectedDoc.preview}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary btn-sm"
                              >
                                View PDF
                              </a>
                            </>
                          ) : (
                            <img
                              src={selectedDoc.preview}
                              className="img-thumbnail"
                              style={{
                                width: "100%",
                                maxHeight: "180px",
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>
                      )}
                      {!selectedDoc && uploadedDoc && (
                        <div className="mt-3 text-center">
                          {uploadedDoc.document_file
                            .toLowerCase()
                            .endsWith(".pdf") ? (
                            <FaFileAlt size={60} color="#dc3545" />
                          ) : (
                            <img
                              src={`${ApiUrl.IMAGE_BASE_URL}/${uploadedDoc.document_file.replace(
                                "uploads/",
                                "",
                              )}`}
                              className="img-thumbnail"
                              style={{
                                width: "100%",
                                maxHeight: "180px",
                                objectFit: "cover",
                              }}
                              alt={uploadedDoc.document_name}
                            />
                          )}

                          <div className="mt-3">
                            {/* View - always available */}
                            <a
                              href={`${ApiUrl.IMAGE_BASE_URL}/${uploadedDoc.document_file.replace(
                                "uploads/",
                                "",
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-outline-primary btn-sm me-2"
                            >
                              View
                            </a>

                            {/* Delete - only if NOT approved */}
                            {uploadedDoc.status !== "approved" && (
                              <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => deleteDocument(uploadedDoc.id)}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="upload-footer">
            <button
              type="button"
              className="btn upload-btn"
              disabled={documents.length === 0 || loading}
              onClick={uploadDocuments}
            >
              {loading ? (
                <>Uploading...</>
              ) : (
                <>
                  <FaUpload className="me-2" />
                  Upload Selected Documents
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {showInstructions && (
        <>
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,.6)",
            }}
          >
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">
                    REQUIREMENTS FOR e-DOCTORS REGISTRATION
                  </h4>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowInstructions(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <h5 className="fw-bold mb-3">
                    BADANIX Online Practitioner Registration: Required
                    Documentation & Verification Process
                  </h5>

                  <p>
                    <strong>Dear Practitioner,</strong>
                    <br />
                    Thank you for your interest in joining BADANIX as an online
                    practitioner. To ensure compliance and maintain the highest
                    standards of medical practice, all applicants must upload
                    the following documents for verification.
                  </p>

                  <h5 className="mt-4">Required Documents for Registration:</h5>

                  <ol>
                    <li>
                      <strong>Medical Degree Certificate (MBBS):</strong>A
                      certified copy of your Bachelor of Medicine, Bachelor of
                      Surgery (MBBS) degree or equivalent from an accredited
                      institution.
                    </li>

                    <li>
                      <strong>Specialist Certificates:</strong>
                      Certified copy of any specialist certification you hold
                      such as Fellowship, Board Certification, or Diploma in a
                      medical specialty.
                    </li>

                    <li>
                      <strong>Medical Practice License:</strong>A valid
                      practicing license issued by the Medical and Dental
                      Council of your country.
                    </li>

                    <li>
                      <strong>Training Certificates:</strong>
                      Certificate of Completion of Training (CCT) or specialist
                      registration certificate where applicable.
                    </li>

                    <li>
                      <strong>Letter of Recommendation:</strong>A recommendation
                      letter from a former or current supervisor, colleague, or
                      mentor confirming competency and ethical standing.
                    </li>

                    <li>
                      <strong>Medical Fitness Report:</strong>A medical check-up
                      report issued within the last two months confirming
                      fitness to practice.
                    </li>

                    <li>
                      <strong>Proof of National Identification:</strong>

                      <ul>
                        <li>International Passport</li>

                        <li>Driver’s License</li>

                        <li>National Identity Number (NIN)</li>

                        <li>Social Security Number (SSN) if applicable</li>
                      </ul>
                    </li>

                    <li>
                      <strong>Full-Size Picture of Yourself:</strong>
                      Recent full-size professional photograph.
                    </li>

                    <li>
                      <strong>Passport Photograph:</strong>
                      Passport-size photograph showing a clear face. No cap,
                      scarf, or glasses. Both ears should be visible.
                    </li>

                    <li>
                      <strong>Verification Timeline Consent:</strong>
                      Confirmation that you understand and accept the 15-day
                      BADANIX verification process.
                    </li>
                  </ol>

                  <h5 className="mt-4">Document Verification Timeline:</h5>

                  <p>
                    The BADANIX verification process takes
                    <strong> 15 days </strong>
                    from the date of submission. Ensure that all documents
                    uploaded are clear, legible, and certified where required to
                    avoid delays.
                  </p>

                  <p>
                    You will receive an in-app and email notification once your
                    documents have been successfully verified.
                  </p>

                  <h5 className="mt-4">For Assistance:</h5>

                  <p>
                    For further assistance, please contact BADANIX Support via
                    email:{" "}
                    <a href="mailto:support@badanix.com">support@badanix.com</a>{" "}
                    or live chat.
                  </p>

                  <p className="mt-4">
                    We look forward to welcoming you as a BADANIX online
                    practitioner!
                  </p>

                  <p>
                    Best Regards,
                    <br />
                    <strong>BADANIX Registration Team</strong>
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowInstructions(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}
