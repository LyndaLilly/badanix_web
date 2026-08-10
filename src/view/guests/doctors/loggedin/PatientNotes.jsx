import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaUserCircle,
  FaHeartbeat,
  FaNotesMedical,
  FaWeight,
  FaRulerVertical,
  FaTint,
  FaAllergies,
  FaCapsules,
  FaStethoscope,
  FaFlask,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import Swal from "sweetalert2";

import "../../../../assets/css/patientehr.css";

import ApiUrl from "../../../../constants/ApiUrl";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";

import doctorImage from "../../../../assets/icons/doctor.png";

export default function PatientEhr({
  appointmentId: propAppointmentId,
  onClose,
}) {
  const navigate = useNavigate();

  const { appointmentId: routeAppointmentId } = useParams();

  const appointmentId = propAppointmentId || routeAppointmentId;

  const { token } = useDoctorAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [appointment, setAppointment] = useState(null);
  const [profile, setProfile] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [showRecordsModal, setShowRecordsModal] = useState(false);

  const storageKey = `ehr-draft-${appointmentId}`;

  const emptyForm = {
    chief_complaint: "",
    history_of_present_illness: "",
    medical_notes: "",
    diagnosis: "",
    treatment_plan: "",
    medication: "",
    lab_test: "",
    follow_up_date: "",
  };

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : emptyForm;
  });

  useEffect(() => {
    if (appointmentId) {
      loadPatient();
    }
  }, [appointmentId]);

  const loadPatient = async () => {
    try {
      const response = await fetch(
        `${ApiUrl.GET_MEDICAL_RECORD}/${appointmentId}/medical-record`,
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
          title: "Unable to load",
          text: data.message,
        });

        navigate(-1);
        return;
      }

      // Appointment & Profile
      setAppointment(data.appointment);
      setProfile(data.appointment.patient.profile);

      // Temporary prefilled values for testing
      setForm({
        chief_complaint:
          "Fever, headache and general body weakness for the past 3 days.",

        history_of_present_illness:
          "Patient reports intermittent fever associated with chills, headache and fatigue. Symptoms began three days ago and have progressively worsened despite taking over-the-counter Paracetamol.",

        medical_notes:
          "Patient was conscious, alert and oriented. Temperature 38.6°C. Mild dehydration noted. Chest examination normal. No respiratory distress. Blood pressure stable. Malaria RDT recommended.",

        diagnosis: "Uncomplicated Malaria with Mild Dehydration.",

        treatment_plan:
          "Commence antimalarial therapy, encourage adequate fluid intake, advise sufficient rest and return immediately if symptoms worsen.",

        medication: `Artemether/Lumefantrine 20/120mg
4 tablets twice daily for 3 days

Paracetamol 500mg
1 tablet every 8 hours for 5 days

Vitamin C 1000mg
1 tablet daily for 7 days

Oral Rehydration Solution
Drink after every loose stool or as needed`,

        lab_test: `Malaria Rapid Diagnostic Test (RDT)
Full Blood Count (FBC)
Urinalysis`,

        follow_up_date: "2026-08-14",
      });

      setMedicalHistory(data.medical_history || []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to connect to server.",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitRecord = async (e) => {
    e.preventDefault();

    if (!form.medical_notes.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Medical Notes Required",
        text: "Please enter the consultation notes.",
      });

      return;
    }

    try {
      setSaving(true);

      const url = `${ApiUrl.CREATE_MEDICAL_RECORD}/${appointmentId}/medical-record`;

      const method = "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
        });

        return;
      }

      localStorage.removeItem(storageKey);
      setForm(emptyForm);

      // Close the EHR first
      if (onClose) {
        onClose();
      }

      // Wait for the EHR to close, then show the alert
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        });
      }, 300);

      loadPatient();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to save medical record.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!appointmentId) return;

    localStorage.setItem(storageKey, JSON.stringify(form));
  }, [form, appointmentId]);

  const getImage = () => {
    const image = profile?.profile_image;

    if (!image) return doctorImage;

    if (image.startsWith("uploads/")) {
      return `${ApiUrl.IMAGE_BASE_URL}/${image.replace("uploads/", "")}`;
    }

    return `${ApiUrl.IMAGE_BASE_URL}/${image}`;
  };

  if (loading) {
    return <div className="ehr-loading">Loading patient information...</div>;
  }

  return (
    <div className="patient-ehr-page">
      {/* Header */}

      <div className="ehr-header">
        <button
          className="ehr-back-btn"
          onClick={() => {
            if (onClose) {
              onClose();
            } else {
              navigate(-1);
            }
          }}
        >
          <FaArrowLeft />
        </button>

        <div>
          <h2>Patient Electronic Health Record</h2>

          <p>Review patient history and consultation record.</p>
        </div>

        <button
          className="view-records-btn"
          onClick={() => setShowRecordsModal(true)}
        >
          <FaNotesMedical />
          Previous Medical Records
        </button>
      </div>

      <div className="ehr-container">
        {/* LEFT PANEL */}

        <div className="ehr-sidebar">
          {/* Patient Card */}
          <div className="patient-card">
            <img
              src={getImage()}
              alt="Patient"
              className="ehr-avatar"
              onError={(e) => {
                e.target.src = doctorImage;
              }}
            />

            <h3>{appointment.patient_fullname}</h3>

            <span className="ehr-id">{appointment.patient.patient_id}</span>
          </div>

          {/* Basic Information */}
          <div className="profile-section">
            <h4>
              <FaUserCircle />
              Basic Information
            </h4>

            <div className="profile-item">
              <FaUserCircle />
              <div>
                <label>Gender</label>
                <span>{profile?.gender || "--"}</span>
              </div>
            </div>

            <div className="profile-item">
              <FaTint />
              <div>
                <label>Blood Type</label>
                <span>{profile?.blood_type || "--"}</span>
              </div>
            </div>

            <div className="profile-item">
              <FaWeight />
              <div>
                <label>Weight</label>
                <span>{profile?.weight || "--"}</span>
              </div>
            </div>

            <div className="profile-item">
              <FaRulerVertical />
              <div>
                <label>Height</label>
                <span>{profile?.height || "--"}</span>
              </div>
            </div>

            <div className="profile-item">
              <FaUserCircle />
              <div>
                <label>Preferred Language</label>
                <span>{profile?.pref_language || "--"}</span>
              </div>
            </div>
          </div>

          {/* Medical Conditions */}
          <div className="profile-section">
            <h4>
              <FaHeartbeat />
              Medical Conditions
            </h4>

            <div className="profile-item">
              <FaStethoscope />
              <div>
                <label>Existing Medical Condition</label>
                <span>{profile?.existing_med_condition || "--"}</span>
              </div>
            </div>

            <div className="profile-item">
              <FaHeartbeat />
              <div>
                <label>Chronic Illness</label>
                <span>{profile?.chronic_illness || "--"}</span>
              </div>
            </div>

            <div className="profile-item">
              <FaNotesMedical />
              <div>
                <label>Mental Health</label>
                <span>{profile?.mental_health || "--"}</span>
              </div>
            </div>

            <div className="profile-item">
              <FaNotesMedical />
              <div>
                <label>Past Surgeries</label>
                <span>{profile?.past_surgeries || "--"}</span>
              </div>
            </div>

            <div className="profile-item">
              <FaUserCircle />
              <div>
                <label>Primary Physician</label>
                <span>{profile?.name_primary_physician || "--"}</span>
              </div>
            </div>
          </div>

          {/* Allergies & Medication */}
          <div className="profile-section">
            <h4>
              <FaCapsules />
              Allergies & Medication
            </h4>

            <div className="profile-item">
              <FaAllergies />
              <div>
                <label>Allergies</label>
                <span>{profile?.allergies || "--"}</span>
              </div>
            </div>

            <div className="profile-item">
              <FaCapsules />
              <div>
                <label>Current Medication</label>
                <span>{profile?.current_medication || "--"}</span>
              </div>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="profile-section">
            <h4>
              <FaHeartbeat />
              Lifestyle
            </h4>

            <div className="profile-item">
              <FaHeartbeat />
              <div>
                <label>Nutrition Plan</label>
                <span>{profile?.nutrition_plan || "--"}</span>
              </div>
            </div>

            <div className="profile-item">
              <FaHeartbeat />
              <div>
                <label>Exercise Routine</label>
                <span>{profile?.exercise_routine || "--"}</span>
              </div>
            </div>

            <div className="profile-item">
              <FaHeartbeat />
              <div>
                <label>Sleep Pattern</label>
                <span>{profile?.sleep_pattern || "--"}</span>
              </div>
            </div>

            <div className="profile-item">
              <FaHeartbeat />
              <div>
                <label>Smoking Habits</label>
                <span>{profile?.smoking_habbits || "--"}</span>
              </div>
            </div>

            <div className="profile-item">
              <FaHeartbeat />
              <div>
                <label>Alcohol Consumption</label>
                <span>{profile?.alcohol_consumption || "--"}</span>
              </div>
            </div>
          </div>

          {/* Family History */}
          <div className="profile-section">
            <h4>
              <FaNotesMedical />
              Family Health History
            </h4>

            <p className="profile-text">
              {profile?.family_health_history ||
                "No family health history recorded."}
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="ehr-content">
          <form className="ehr-form" onSubmit={submitRecord}>
            <div className="ehr-card">
              <h3>
                <FaStethoscope />
                Chief Complaint
              </h3>

              <label>Chief Complaint</label>

              <textarea
                name="chief_complaint"
                rows="4"
                placeholder="Reason for today's visit..."
                value={form.chief_complaint}
                onChange={handleChange}
              />
            </div>

            <div className="ehr-card">
              <h3>
                <FaHeartbeat />
                History of Present Illness
              </h3>

              <label>History of Present Illness</label>

              <textarea
                name="history_of_present_illness"
                rows="6"
                placeholder="Describe onset, duration, severity and progression..."
                value={form.history_of_present_illness}
                onChange={handleChange}
              />
            </div>

            <div className="ehr-card">
              <h3>
                <FaNotesMedical />
                Consultation Notes
              </h3>

              <label>
                Medical Notes
                <span className="required">*</span>
              </label>

              <textarea
                name="medical_notes"
                rows="10"
                placeholder="Doctor's examination findings, assessment and notes..."
                value={form.medical_notes}
                onChange={handleChange}
                required
              />
            </div>

            <div className="ehr-card">
              <h3>
                <FaHeartbeat />
                Diagnosis
              </h3>

              <label>Diagnosis</label>

              <textarea
                name="diagnosis"
                rows="5"
                placeholder="Final diagnosis..."
                value={form.diagnosis}
                onChange={handleChange}
              />
            </div>

            <div className="ehr-card">
              <h3>
                <FaStethoscope />
                Treatment Plan
              </h3>

              <label>Treatment Plan</label>

              <textarea
                name="treatment_plan"
                rows="5"
                placeholder="Treatment plan and recommendations..."
                value={form.treatment_plan}
                onChange={handleChange}
              />
            </div>

            <div className="ehr-card">
              <h3>
                <FaCapsules />
                Prescription
              </h3>

              <label>Medication Prescribed</label>

              <textarea
                name="medication"
                rows="6"
                placeholder={`Example:

Paracetamol 500mg
1 tablet twice daily for 5 days

Vitamin C 1000mg
1 tablet daily`}
                value={form.medication}
                onChange={handleChange}
              />
            </div>

            <div className="ehr-card">
              <h3>
                <FaFlask />
                Laboratory Request
              </h3>

              <label>Laboratory Tests</label>

              <textarea
                name="lab_test"
                rows="6"
                placeholder={`Example:

CBC
Urinalysis
Malaria Test
X-Ray Chest`}
                value={form.lab_test}
                onChange={handleChange}
              />
            </div>

            <div className="ehr-card">
              <h3>
                <FaHeartbeat />
                Follow Up
              </h3>

              <label>Follow Up Date</label>

              <input
                type="date"
                name="follow_up_date"
                value={form.follow_up_date}
                onChange={handleChange}
              />
            </div>
            <div className="ehr-footer">
              <button type="submit" className="ehr-save-btn" disabled={saving}>
                <FaSave />
                {saving ? "Saving..." : "Save Consultation"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Previous Medical Records Modal */}

      {showRecordsModal && (
        <div
          className="ehr-modal-overlay"
          onClick={() => setShowRecordsModal(false)}
        >
          <div className="ehr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ehr-modal-header">
              <h2>Patient Medical History</h2>

              <button
                className="ehr-close-btn"
                onClick={() => setShowRecordsModal(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="ehr-modal-body">
              {medicalHistory.length === 0 ? (
                <div className="ehr-empty-history">
                  No previous medical records.
                </div>
              ) : (
                medicalHistory.map((record) => (
                  <div key={record.id} className="ehr-history-card">
                    <div className="ehr-history-top">
                      <h4>{record.doctor?.fullname}</h4>

                      <span>
                        {new Date(record.created_at).toLocaleString()}
                      </span>
                    </div>

                    <div className="ehr-history-item">
                      <strong>Chief Complaint</strong>
                      <p>{record.chief_complaint || "--"}</p>
                    </div>

                    <div className="ehr-history-item">
                      <strong>Diagnosis</strong>
                      <p>{record.diagnosis || "--"}</p>
                    </div>

                    <div className="ehr-history-item">
                      <strong>Medical Notes</strong>
                      <p>{record.medical_notes || "--"}</p>
                    </div>

                    <div className="ehr-history-item">
                      <strong>Medication</strong>
                      <p>{record.medication || "--"}</p>
                    </div>

                    <div className="ehr-history-item">
                      <strong>Lab Test</strong>
                      <p>{record.lab_test || "--"}</p>
                    </div>

                    <div className="ehr-history-item">
                      <strong>Follow Up</strong>
                      <p>{record.follow_up_date || "--"}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
