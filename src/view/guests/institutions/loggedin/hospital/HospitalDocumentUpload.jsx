import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaInfoCircle, FaFileAlt, FaArrowLeft } from "react-icons/fa";
import "../../../../../assets/css/documentupload.css";
import ApiUrl from "../../../../../constants/ApiUrl";
import Swal from "sweetalert2";

const requiredDocuments = [
  {
    type: "hospital_registration_certificate",
    name: "Hospital Registration Certificate",
  },
  {
    type: "operating_license",
    name: "Operating License",
  },
  {
    type: "business_registration_certificate",
    name: "Business Registration Certificate",
  },
  {
    type: "medical_director_license",
    name: "Medical Director's License",
  },
  {
    type: "accreditation_certificates",
    name: "Accreditation Certificates",
  },
  {
    type: "licensed_medical_practitioners",
    name: "List of Licensed Medical Practitioners",
  },
  {
    type: "medical_equipment_certification",
    name: "Medical Equipment Certification",
  },
  {
    type: "national_identification",
    name: "Proof of National Identification",
  },
  {
    type: "hospital_facility_photos",
    name: "Hospital Facility Photos",
  },
  {
    type: "official_hospital_seal",
    name: "Official Hospital Seal or Stamp",
  },
  {
    type: "principal_owner_picture",
    name: "Picture of Principal Owner",
  },
  {
    type: "company_front_picture",
    name: "Front Picture of Company with Signage",
  },
];

export default function HospitalDocumentUpload() {
  const [documents, setDocuments] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputsRef = useRef({});
  const navigate = useNavigate();
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

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
        text: "Please select at least one document before uploading.",
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

      const token = localStorage.getItem("institution_token");

      const response = await fetch(ApiUrl.UPLOAD_HOSPITAL_DOCUMENTS, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error(text);

        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "The server returned an unexpected response.",
          confirmButtonColor: "#14361D",
        });

        return;
      }

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: data.message || "Unable to upload your documents.",
          confirmButtonColor: "#14361D",
        });

        return;
      }

      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: "Documents uploaded successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      //   setTimeout(() => {
      //     navigate("/hospital/dashboard");
      //   }, 2000);

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
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: error.message || "Unable to connect to the server.",
        confirmButtonColor: "#14361D",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadDocuments = async () => {
    try {
      const token = localStorage.getItem("institution_token");

      const response = await fetch(ApiUrl.GET_HOSPITAL_DOCUMENTS, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setUploadedDocuments(data.documents);
      }
    } catch (err) {
      console.log(err);
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
      const token = localStorage.getItem("institution_token");

      const response = await fetch(`${ApiUrl.DELETE_HOSPITAL_DOCUMENT}/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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
    } catch (err) {
      console.log(err);
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
                onClick={() => navigate("/hospital/dashboard")}
              >
                <FaArrowLeft className="me-2" />
                Back to Dashboard
              </button>

              <h2 className="page-title">Hospital Verification</h2>

              <p className="text-muted">
                Upload all required documents for hospital verification.
              </p>
            </div>

            <div className="d-flex justify-content-between align-items-center g-2 mb-4">
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
                        className={`badge mb-3 ${
                          selectedDoc
                            ? "bg-success"
                            : uploadedDoc
                              ? "bg-primary"
                              : "bg-secondary"
                        }`}
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
            style={{ display: "block", backgroundColor: "rgba(0,0,0,.6)" }}
          >
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">
                    BADANIX Online Registration for Hospitals
                  </h4>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowInstructions(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <p>
                    <strong>Dear Healthcare Provider,</strong>
                  </p>

                  <p>
                    Thank you for your interest in registering your hospital on
                    BADANIX. To ensure high standards in medical practice and
                    patient care, all hospitals must upload the required
                    documents for verification.
                  </p>

                  <p>
                    To operate and be recognized as a registered hospital with
                    BADANIX, your facility must be licensed by the Ministry of
                    Health, Medical Regulatory Body, or an Accrediting Agency in
                    your country. Additionally, your hospital must be officially
                    registered as a business with the relevant regulatory
                    authority, such as:
                  </p>

                  <h5 className="mt-4">Company Registration Authorities</h5>

                  <ul>
                    <li>
                      USA: Secretary of State (varies by state) & U.S. SEC
                    </li>
                    <li>UK: Companies House</li>
                    <li>Canada: Corporations Canada & Provincial Registrars</li>
                    <li>Australia: ASIC</li>
                    <li>India: MCA</li>
                    <li>South Africa: CIPC</li>
                    <li>Ghana: Registrar General's Department (RGD)</li>
                    <li>Kenya: Business Registration Service (BRS)</li>
                    <li>
                      UAE: Department of Economic Development (DED) & Free Zones
                    </li>
                    <li>
                      China: State Administration for Market Regulation (SAMR)
                    </li>
                    <li>Nigeria: Corporate Affairs Commission (CAC)</li>
                  </ul>

                  <h5 className="mt-4">
                    Required Documents for Hospital Registration
                  </h5>

                  <ol>
                    <li>
                      <strong>Hospital Registration Certificate:</strong> Proof
                      of registration with the Ministry of Health or Accrediting
                      Body.
                    </li>

                    <li>
                      <strong>Business Registration Certificate:</strong>{" "}
                      Certified copy of business registration.
                    </li>

                    <li>
                      <strong>Medical Director's License:</strong> Issued by
                      your country's medical council.
                    </li>

                    <li>
                      <strong>Accreditation Certificates (Optional):</strong>{" "}
                      From JCI, NHRA, COHSASA, or similar agencies.
                    </li>

                    <li>
                      <strong>List of Licensed Medical Practitioners:</strong>{" "}
                      Names and license numbers of doctors, nurses, etc.
                    </li>

                    <li>
                      <strong>
                        Medical Equipment Certification (If Applicable):
                      </strong>{" "}
                      For major hospital equipment.
                    </li>

                    <li>
                      <strong>Proof of National Identification:</strong> Valid
                      ID of the hospital's authorized representative.
                    </li>

                    <li>
                      <strong>Hospital Facility Photos:</strong> Exterior,
                      reception, rooms, and equipment.
                    </li>

                    <li>
                      <strong>Official Hospital Seal or Stamp:</strong> Scanned
                      copy of the seal/stamp.
                    </li>

                    <li>
                      <strong>Picture of the Principal Owner:</strong> Clear
                      photo of the owner.
                    </li>

                    <li>
                      <strong>Front Pictures of the Company:</strong> Showing
                      signage with registered name.
                    </li>
                  </ol>

                  <h5 className="mt-4">Document Verification Timeline</h5>

                  <p>
                    The BADANIX verification process takes
                    <strong> 15 days </strong>
                    from the date of submission. Ensure all documents are clear
                    and certified to avoid delays.
                  </p>

                  <p>
                    You will receive an email notification once your hospital
                    has been successfully verified.
                  </p>

                  <h5 className="mt-4">For Assistance</h5>

                  <p>
                    Please contact BADANIX Support via email at{" "}
                    <a href="mailto:support@badanix.com">support@badanix.com</a>{" "}
                    or via live chat.
                  </p>

                  <p className="mt-4">
                    We look forward to welcoming your hospital to the BADANIX
                    network!
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
