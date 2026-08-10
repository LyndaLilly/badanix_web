import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import ApiUrl from "../../../../constants/ApiUrl";
import { usePatientAuth } from "../../../../contexts/PatientAuthContext";

import countries from "../../../../components/country.json";

import "../../../../assets/css/profilefill.css";

export default function ProfileFill() {
  const navigate = useNavigate();

  const { patient, token } = usePatientAuth();

  console.log("Patient:", patient);
  console.log("Token:", token);

  const [loading, setLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 11;

  const bloodTypes = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
    "Unknown",
  ];

  const languages = ["English", "French", "Spanish", "Arabic", "Chinese"];

  const exerciseRoutines = [
    "Daily",
    "Weekly",
    "Occasionally",
    "Rarely",
    "Never",
  ];

  const smokingHabits = ["Never", "Former Smoker", "Occasionally", "Daily"];

  const alcoholConsumption = ["Never", "Occasionally", "Weekly", "Daily"];

  const sleepPatterns = [
    "Less than 4 hours",
    "4 - 6 hours",
    "6 - 8 hours",
    "More than 8 hours",
  ];

  const insuranceTypes = ["Private", "Government", "Employer", "HMO", "Other"];

  const [formData, setFormData] = useState({
    profile_image: null,

    dob: "",
    gender: "",
    pref_language: "",

    phone: "",

    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",

    name_insurance_provider: "",
    type_insurance_provider: "",
    policy_number: "",
    insurance_coverage: "",
    insurance_validity_period: "",

    weight: "",
    height: "",

    exercise_routine: "",
    nutrition_plan: "",
    smoking_habbits: "",
    alcohol_consumption: "",
    sleep_pattern: "",

    blood_type: "",
    name_primary_physician: "",

    existing_med_condition: "",
    current_medication: "",
    allergies: "",
    past_surgeries: "",
    chronic_illness: "",

    mental_health: "",
    family_health_history: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          data.append(key, formData[key]);
        }
      });

      console.log("Submitting profile...");
      console.log("Token:", token);
      console.log("Authorization:", `Bearer ${token}`);
      console.log("API:", ApiUrl.CREATE_PATIENT_PROFILE);

      const response = await fetch(ApiUrl.CREATE_PATIENT_PROFILE, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to complete profile.");
      }

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile completed successfully.",
      });

      navigate("/patient/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.message || "Unable to complete profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="profile-fill-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="profile-fill-card">
              <div className="text-center mb-4">
                <h2>Complete Your Health Profile</h2>

                <p>
                  Welcome {patient?.fullname}. Please complete your profile
                  before using BADANIX.
                </p>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>
                    Step {currentStep} of {totalSteps}
                  </span>

                  <span>{Math.round(progress)}%</span>
                </div>

                <div className="progress profile-progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <div>
                    <h4 className="profile-section-title mb-4">
                      Personal Information
                    </h4>

                    <div className="row">
                      <div className="col-12 mb-4">
                        <label className="form-label">Profile Picture</label>

                        <input
                          type="file"
                          name="profile_image"
                          className="form-control"
                          accept="image/*"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Date of Birth</label>

                        <input
                          type="date"
                          name="dob"
                          className="form-control"
                          value={formData.dob}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Gender</label>

                        <select
                          name="gender"
                          className="form-select"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">
                            Prefer not to say
                          </option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Preferred Language</label>

                        <select
                          name="pref_language"
                          className="form-select"
                          value={formData.pref_language}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose Language</option>

                          {languages.map((language) => (
                            <option key={language} value={language}>
                              {language}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone Number</label>

                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-end mt-4">
                      <button
                        type="button"
                        className="btn profile-next-btn"
                        onClick={nextStep}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 21 */}
                {currentStep === 2 && (
                  <div className="profile-step">
                    <h4>Sleep Pattern</h4>

                    <select
                      className="form-select profile-input"
                      name="sleep_pattern"
                      value={formData.sleep_pattern}
                      onChange={handleChange}
                    >
                      <option value="">Select Sleep Pattern</option>

                      {sleepPatterns.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    <div className="profile-buttons">
                      <button
                        type="button"
                        className="btn profile-prev"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 22 */}
                {currentStep === 3 && (
                  <div className="profile-step">
                    <h4>Blood Group</h4>

                    <select
                      className="form-select profile-input"
                      name="blood_type"
                      value={formData.blood_type}
                      onChange={handleChange}
                    >
                      <option value="">Select Blood Group</option>

                      {bloodTypes.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>

                    <div className="profile-buttons">
                      <button
                        type="button"
                        className="btn profile-prev"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 23 */}
                {currentStep === 4 && (
                  <div className="profile-step">
                    <h4>Primary Physician</h4>

                    <input
                      className="form-control profile-input"
                      type="text"
                      name="name_primary_physician"
                      value={formData.name_primary_physician}
                      onChange={handleChange}
                      placeholder="Doctor's Name"
                    />

                    <div className="profile-buttons">
                      <button
                        type="button"
                        className="btn profile-prev"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 24 */}
                {currentStep === 5 && (
                  <div className="profile-step">
                    <h4>Existing Medical Conditions</h4>

                    <textarea
                      rows="5"
                      className="form-control profile-input"
                      name="existing_med_condition"
                      value={formData.existing_med_condition}
                      onChange={handleChange}
                    />

                    <div className="profile-buttons">
                      <button
                        type="button"
                        className="btn profile-prev"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 25 */}
                {currentStep === 6 && (
                  <div className="profile-step">
                    <h4>Current Medication</h4>

                    <textarea
                      rows="5"
                      className="form-control profile-input"
                      name="current_medication"
                      value={formData.current_medication}
                      onChange={handleChange}
                    />

                    <div className="profile-buttons">
                      <button
                        type="button"
                        className="btn profile-prev"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 26 */}
                {currentStep === 7 && (
                  <div className="profile-step">
                    <h4>Allergies</h4>

                    <textarea
                      rows="5"
                      className="form-control profile-input"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                    />

                    <div className="profile-buttons">
                      <button
                        type="button"
                        className="btn profile-prev"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 27 */}
                {currentStep === 8 && (
                  <div className="profile-step">
                    <h4>Past Surgeries</h4>

                    <textarea
                      rows="5"
                      className="form-control profile-input"
                      name="past_surgeries"
                      value={formData.past_surgeries}
                      onChange={handleChange}
                    />

                    <div className="profile-buttons">
                      <button
                        type="button"
                        className="btn profile-prev"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 28 */}
                {currentStep === 9 && (
                  <div className="profile-step">
                    <h4>Chronic Illness</h4>

                    <textarea
                      rows="5"
                      className="form-control profile-input"
                      name="chronic_illness"
                      value={formData.chronic_illness}
                      onChange={handleChange}
                    />

                    <div className="profile-buttons">
                      <button
                        type="button"
                        className="btn profile-prev"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 29 */}
                {currentStep === 10 && (
                  <div className="profile-step">
                    <h4>Mental Health</h4>

                    <textarea
                      rows="5"
                      className="form-control profile-input"
                      name="mental_health"
                      value={formData.mental_health}
                      onChange={handleChange}
                    />

                    <div className="profile-buttons">
                      <button
                        type="button"
                        className="btn profile-prev"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 30 */}
                {currentStep === 11 && (
                  <div className="profile-step">
                    <h4>Family Health History</h4>

                    <textarea
                      rows="5"
                      className="form-control profile-input"
                      name="family_health_history"
                      value={formData.family_health_history}
                      onChange={handleChange}
                    />

                    <div className="profile-buttons">
                      <button
                        type="button"
                        className="btn profile-prev"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn profile-submit"
                      >
                        {loading ? "Saving..." : "Complete Profile"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
