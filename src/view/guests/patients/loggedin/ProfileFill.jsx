import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import ApiUrl from "../../../../constants/ApiUrl";
import { usePatientAuth } from "../../../../contexts/PatientAuthContext";

import { Country, State, City } from "country-state-city";

import "../../../../assets/css/profilefill.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ProfileFill() {
  const navigate = useNavigate();

  const { patient, token, refreshPatient } = usePatientAuth();

  const [loading, setLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const [imagePreview, setImagePreview] = useState(null);

  const [errors, setErrors] = useState({});

  const totalSteps = 8;

  const maxDob = new Date();
  maxDob.setFullYear(maxDob.getFullYear() - 18);

  const maxDobString = maxDob.toISOString().split("T")[0];

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

  const nutritionPlans = [
    "Balanced Diet",
    "High Protein",
    "Low Carb",
    "Low Fat",
    "Keto",
    "Mediterranean",
    "Vegetarian",
    "Vegan",
    "Pescatarian",
    "Diabetic Diet",
    "Gluten Free",
    "Low Sodium",
    "Weight Loss",
    "Weight Gain",
    "Muscle Building",
    "No Specific Plan",
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

  // const [formData, setFormData] = useState({
  //   profile_image: null,

  //   dob: "",
  //   gender: "",
  //   pref_language: "",
  //   phone_country: "ng",
  //   phone: "",

  //   address: "",
  //   city: "",
  //   state: "",
  //   country: "",
  //   zipcode: "",

  //   name_insurance_provider: "",
  //   type_insurance_provider: "",
  //   policy_number: "",
  //   insurance_coverage: "",
  //   insurance_validity_period: "",

  //   weight: "",
  //   height: "",

  //   exercise_routine: "",
  //   nutrition_plan: "",
  //   smoking_habbits: "",
  //   alcohol_consumption: "",
  //   sleep_pattern: "",

  //   blood_type: "",
  //   name_primary_physician: "",

  //   existing_med_condition: "",
  //   current_medication: "",
  //   allergies: "",
  //   past_surgeries: "",
  //   chronic_illness: "",

  //   mental_health: "",
  //   family_health_history: "",
  // });

  const [formData, setFormData] = useState({
  profile_image: null,

  dob: "1998-05-15",
  gender: "Female",
  pref_language: "English",
  phone_country: "ng",
  phone: "08012345678",

  address: "12 Aba Road",
  city: "Port Harcourt",
  state: "Rivers",
  country: "Nigeria",
  zipcode: "500001",

  name_insurance_provider: "AXA Mansard",
  type_insurance_provider: "Health Insurance",
  policy_number: "AXA123456789",
  insurance_coverage: "Comprehensive",
  insurance_validity_period: "2026-12-31",

  weight: "65",
  height: "168",

  exercise_routine: "3 times a week",
  nutrition_plan: "Balanced diet",
  smoking_habbits: "No",
  alcohol_consumption: "Occasionally",
  sleep_pattern: "7-8 hours daily",

  blood_type: "O+",
  name_primary_physician: "Dr. John Smith",

  existing_med_condition: "None",
  current_medication: "None",
  allergies: "None",
  past_surgeries: "None",
  chronic_illness: "None",

  mental_health: "Good",
  family_health_history: "No significant family history",
});


  const countries = Country.getAllCountries();
  const states = State.getStatesOfCountry(formData.country);
  const cities = City.getCitiesOfState(formData.country, formData.state);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];

      if (!file) return;

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      setImagePreview(URL.createObjectURL(file));
      return;
    }

    setFormData((prev) => {
      if (name === "country") {
        return {
          ...prev,
          country: value,
          state: "",
          city: "",
        };
      }

      if (name === "state") {
        return {
          ...prev,
          state: value,
          city: "",
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      profile_image: null,
    }));

    setErrors((prev) => ({
      ...prev,
      profile_image: "",
    }));

    setImagePreview(null);

    document.getElementById("profileImageInput").value = "";
  };

  const validateStep = () => {
    let newErrors = {};

    switch (currentStep) {
      // ================= STEP 1 =================
      case 1:
        if (!formData.dob) {
          newErrors.dob = "Date of birth is required.";
        } else {
          const dob = new Date(formData.dob);
          const today = new Date();

          let age = today.getFullYear() - dob.getFullYear();
          const monthDifference = today.getMonth() - dob.getMonth();

          if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < dob.getDate())
          ) {
            age--;
          }

          if (age < 18) {
            newErrors.dob = "You must be at least 18 years old.";
          }
        }

        if (!formData.gender) {
          newErrors.gender = "Gender is required.";
        }

        if (!formData.pref_language) {
          newErrors.pref_language = "Preferred language is required.";
        }

        if (!formData.phone) {
          newErrors.phone = "Phone number is required.";
        }

        break;

      // ================= STEP 2 =================
      case 2:
        if (!formData.address) {
          newErrors.address = "Address is required.";
        }

        if (!formData.city) {
          newErrors.city = "City is required.";
        }

        if (!formData.state) {
          newErrors.state = "State is required.";
        }

        if (!formData.country) {
          newErrors.country = "Country is required.";
        }

        break;

      // ================= STEP 3 =================
      // Lifestyle Information
      case 3:
        if (!formData.weight) {
          newErrors.weight = "Weight is required.";
        }

        if (!formData.height) {
          newErrors.height = "Height is required.";
        }

        if (!formData.exercise_routine) {
          newErrors.exercise_routine = "Exercise routine is required.";
        }

        if (!formData.nutrition_plan) {
          newErrors.nutrition_plan = "Nutrition plan is required.";
        }

        if (!formData.smoking_habbits) {
          newErrors.smoking_habbits = "Smoking habit is required.";
        }

        if (!formData.alcohol_consumption) {
          newErrors.alcohol_consumption = "Alcohol consumption is required.";
        }

        if (!formData.sleep_pattern) {
          newErrors.sleep_pattern = "Sleep pattern is required.";
        }

        break;

      // ================= STEP 4 =================
      // Medical Information
      case 4:
        if (!formData.blood_type) {
          newErrors.blood_type = "Blood type is required.";
        }

        if (!formData.existing_med_condition) {
          newErrors.existing_med_condition =
            "Existing medical condition is required.";
        }

        if (!formData.current_medication) {
          newErrors.current_medication = "Current medication is required.";
        }

        if (!formData.allergies) {
          newErrors.allergies = "Allergies field is required.";
        }

        break;


      case 5:
        if (!formData.past_surgeries) {
          newErrors.past_surgeries = "Past surgeries field is required.";
        }

        if (!formData.chronic_illness) {
          newErrors.chronic_illness = "Chronic illness field is required.";
        }

        if (!formData.mental_health) {
          newErrors.mental_health = "Mental health field is required.";
        }

        if (!formData.family_health_history) {
          newErrors.family_health_history =
            "Family health history is required.";
        }

        break;

      case 6:
        break;

      case 7:
        break;

      case 8:
        break;

      default:
        break;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;

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

  // Validate the current step first
  if (!validateStep()) {
    return;
  }

  setLoading(true);

  // Clear previous errors before submitting
  setErrors({});

  try {
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        payload.append(key, value);
      }
    });

    const response = await fetch(ApiUrl.CREATE_PATIENT_PROFILE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });

    const result = await response.json();

    console.log("PROFILE RESPONSE:", result);

    // ==========================================
    // VALIDATION ERROR - 422
    // ==========================================
    if (response.status === 422) {
      const validationErrors = result.errors || {};

      setErrors(validationErrors);

      // Build readable error message for SweetAlert
      const errorMessages = Object.entries(validationErrors)
        .flatMap(([field, messages]) => {
          const fieldMessages = Array.isArray(messages)
            ? messages
            : [messages];

          return fieldMessages.map(
            (message) => `<li>${message}</li>`
          );
        })
        .join("");

      await Swal.fire({
        icon: "error",
        title: "Please correct the following",
        html: `
          <div style="text-align:left;">
            <ul style="padding-left:20px; margin-bottom:0;">
              ${errorMessages}
            </ul>
          </div>
        `,
        confirmButtonText: "OK",
      });

      return;
    }

    // ==========================================
    // OTHER API ERRORS
    // ==========================================
    if (!response.ok) {
      const errorMessage =
        result.error ||
        result.message ||
        "Unable to save profile.";

      throw new Error(errorMessage);
    }

    // ==========================================
    // SUCCESS
    // ==========================================
    await Swal.fire({
      icon: "success",
      title: "Success",
      text: result.message || "Profile created successfully.",
      confirmButtonText: "Continue",
    });

    await refreshPatient();

    navigate("/patient/dashboard", {
      replace: true,
    });
  } catch (err) {
    console.error("PROFILE SUBMISSION ERROR:", err);

    // Make sure the actual error is displayed
    await Swal.fire({
      icon: "error",
      title: "Error",
      text: err.message || "Something went wrong while saving your profile.",
      confirmButtonText: "OK",
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
          <div className="col-lg-9">
            <div className="profile-fill-card">
              <div className="text-center mb-4">
                <h2>Complete Your Health Profile</h2>

                <p>
                  Welcome <strong>{patient?.fullname}</strong>. Complete your
                  profile to continue using BADANIX.
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
                {/* ================= STEP 1 ================= */}

                {currentStep === 1 && (
                  <div>
                    <h4 className="profile-section-title mb-4">
                      Personal Information
                    </h4>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          max={maxDobString}
                          required
                        />
                        {errors.dob && (
                          <small className="text-danger">{errors.dob}</small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Gender</label>

                        <select
                          className="form-select"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Gender</option>

                          <option value="male">Male</option>

                          <option value="female">Female</option>

                          <option value="other">Other</option>
                        </select>

                        {errors.gender && (
                          <small className="text-danger">{errors.gender}</small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Preferred Language</label>

                        <select
                          className="form-select"
                          name="pref_language"
                          value={formData.pref_language}
                          onChange={handleChange}
                        >
                          <option value="">Select Language</option>

                          {languages.map((language) => (
                            <option key={language} value={language}>
                              {language}
                            </option>
                          ))}
                        </select>

                        {errors.pref_language && (
                          <small className="text-danger">
                            {errors.pref_language}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone Number</label>

                        <PhoneInput
                          country={formData.phone_country}
                          value={formData.phone}
                          enableSearch
                          countryCodeEditable={false}
                          inputStyle={{
                            width: "100%",
                            height: "48px",
                            borderRadius: "8px",
                            border: "1px solid #ced4da",
                            paddingLeft: "52px",
                          }}
                          buttonStyle={{
                            border: "1px solid #ced4da",
                            borderRight: "none",
                            borderRadius: "8px 0 0 8px",
                            background: "#fff",
                          }}
                          onChange={(value, country) => {
                            setFormData((prev) => ({
                              ...prev,
                              phone: "+" + value,
                              phone_country: country.countryCode,
                              country: country.name, // optional: automatically update country
                            }));

                            setErrors((prev) => ({
                              ...prev,
                              phone: "",
                            }));
                          }}
                        />
                        {errors.phone && (
                          <small className="text-danger">{errors.phone}</small>
                        )}
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

                {/* ================= STEP 2 ================= */}

                {currentStep === 2 && (
                  <div>
                    <h4 className="profile-section-title mb-4">
                      Contact Information
                    </h4>

                    <div className="row">
                      <div className="col-12 mb-3">
                        <label className="form-label">Address</label>

                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                        {errors.address && (
                          <small className="text-danger">
                            {errors.address}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Country</label>

                        <select
                          className="form-select"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                        >
                          <option value="">Select Country</option>

                          {Country.getAllCountries().map((country) => (
                            <option key={country.isoCode} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>

                        {errors.country && (
                          <small className="text-danger">
                            {errors.country}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">State</label>

                        <select
                          className="form-select"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          disabled={!formData.country}
                        >
                          <option value="">Select State</option>

                          {State.getStatesOfCountry(
                            Country.getAllCountries().find(
                              (c) => c.name === formData.country,
                            )?.isoCode || "",
                          ).map((state) => (
                            <option key={state.isoCode} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                        </select>

                        {errors.state && (
                          <small className="text-danger">{errors.state}</small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">City</label>

                        <select
                          className="form-select"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          disabled={!formData.state}
                        >
                          <option value="">Select City</option>

                          {City.getCitiesOfState(
                            Country.getAllCountries().find(
                              (c) => c.name === formData.country,
                            )?.isoCode || "",
                            State.getStatesOfCountry(
                              Country.getAllCountries().find(
                                (c) => c.name === formData.country,
                              )?.isoCode || "",
                            ).find((s) => s.name === formData.state)?.isoCode ||
                              "",
                          ).map((city) => (
                            <option key={city.name} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </select>

                        {errors.city && (
                          <small className="text-danger">{errors.city}</small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label d-flex align-items-center">
                          Zip Code
                          <span className="profile-optional-badge ms-2">
                            Optional
                          </span>
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          name="zipcode"
                          value={formData.zipcode}
                          onChange={handleChange}
                        />
                        {errors.zipcode && (
                          <small className="text-danger">
                            {errors.zipcode}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                      <button
                        type="button"
                        className="btn profile-prev-btn"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next-btn"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= STEP 4 ================= */}

                {currentStep === 3 && (
                  <div>
                    <h4 className="profile-section-title mb-4">
                      Lifestyle Information
                    </h4>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Weight</label>

                        <input
                          type="text"
                          className="form-control"
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          placeholder="70 kg"
                        />
                        {errors.weight && (
                          <small className="text-danger">{errors.weight}</small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Height</label>

                        <input
                          type="text"
                          className="form-control"
                          name="height"
                          value={formData.height}
                          onChange={handleChange}
                          placeholder="175 cm"
                        />
                        {errors.height && (
                          <small className="text-danger">{errors.height}</small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Exercise Routine</label>

                        <select
                          className="form-select"
                          name="exercise_routine"
                          value={formData.exercise_routine}
                          onChange={handleChange}
                        >
                          <option value="">Select Exercise Routine</option>

                          {exerciseRoutines.map((routine) => (
                            <option key={routine} value={routine}>
                              {routine}
                            </option>
                          ))}
                        </select>
                        {errors.exercise_routine && (
                          <small className="text-danger">
                            {errors.exercise_routine}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Nutrition Plan</label>

                        <select
                          className="form-select"
                          name="nutrition_plan"
                          value={formData.nutrition_plan}
                          onChange={handleChange}
                        >
                          <option value="">Select Nutrition Plan</option>

                          {nutritionPlans.map((plan) => (
                            <option key={plan} value={plan}>
                              {plan}
                            </option>
                          ))}
                        </select>

                        {errors.nutrition_plan && (
                          <small className="text-danger">
                            {errors.nutrition_plan}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Smoking Habits</label>

                        <select
                          className="form-select"
                          name="smoking_habbits"
                          value={formData.smoking_habbits}
                          onChange={handleChange}
                        >
                          <option value="">Select Smoking Habit</option>

                          {smokingHabits.map((habit) => (
                            <option key={habit} value={habit}>
                              {habit}
                            </option>
                          ))}
                        </select>
                        {errors.smoking_habbits && (
                          <small className="text-danger">
                            {errors.smoking_habbits}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Alcohol Consumption
                        </label>

                        <select
                          className="form-select"
                          name="alcohol_consumption"
                          value={formData.alcohol_consumption}
                          onChange={handleChange}
                        >
                          <option value="">Select Alcohol Consumption</option>

                          {alcoholConsumption.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        {errors.alcohol_consumption && (
                          <small className="text-danger">
                            {errors.alcohol_consumption}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Sleep Pattern</label>

                        <select
                          className="form-select"
                          name="sleep_pattern"
                          value={formData.sleep_pattern}
                          onChange={handleChange}
                        >
                          <option value="">Select Sleep Pattern</option>

                          {sleepPatterns.map((pattern) => (
                            <option key={pattern} value={pattern}>
                              {pattern}
                            </option>
                          ))}
                        </select>
                        {errors.sleep_pattern && (
                          <small className="text-danger">
                            {errors.sleep_pattern}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                      <button
                        type="button"
                        className="btn profile-prev-btn"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next-btn"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {/* ================= STEP 5 ================= */}

                {currentStep === 4 && (
                  <div>
                    <h4 className="profile-section-title mb-4">
                      Medical Information
                    </h4>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Blood Type</label>

                        <select
                          className="form-select"
                          name="blood_type"
                          value={formData.blood_type}
                          onChange={handleChange}
                        >
                          <option value="">Select Blood Type</option>

                          {bloodTypes.map((blood) => (
                            <option key={blood} value={blood}>
                              {blood}
                            </option>
                          ))}
                        </select>
                        {errors.blood_type && (
                          <small className="text-danger">
                            {errors.blood_type}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Primary Physician</label>

                        <input
                          type="text"
                          className="form-control"
                          name="name_primary_physician"
                          value={formData.name_primary_physician}
                          onChange={handleChange}
                          placeholder="Doctor's Name"
                        />
                        {errors.name_primary_physician && (
                          <small className="text-danger">
                            {errors.name_primary_physician}
                          </small>
                        )}
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label">
                          Existing Medical Conditions
                        </label>

                        <textarea
                          rows="3"
                          className="form-control"
                          name="existing_med_condition"
                          value={formData.existing_med_condition}
                          onChange={handleChange}
                        ></textarea>
                        {errors.existing_med_condition && (
                          <small className="text-danger">
                            {errors.existing_med_condition}
                          </small>
                        )}
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label">Current Medication</label>

                        <textarea
                          rows="3"
                          className="form-control"
                          name="current_medication"
                          value={formData.current_medication}
                          onChange={handleChange}
                        ></textarea>
                        {errors.current_medication && (
                          <small className="text-danger">
                            {errors.current_medication}
                          </small>
                        )}
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label">Allergies</label>

                        <textarea
                          rows="3"
                          className="form-control"
                          name="allergies"
                          value={formData.allergies}
                          onChange={handleChange}
                        ></textarea>
                        {errors.allergies && (
                          <small className="text-danger">
                            {errors.allergies}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                      <button
                        type="button"
                        className="btn profile-prev-btn"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next-btn"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= STEP 6 ================= */}

                {currentStep === 5 && (
                  <div>
                    <h4 className="profile-section-title mb-4">
                      Health History
                    </h4>

                    <div className="row">
                      <div className="col-12 mb-3">
                        <label className="form-label">Past Surgeries</label>

                        <textarea
                          rows="3"
                          className="form-control"
                          name="past_surgeries"
                          value={formData.past_surgeries}
                          onChange={handleChange}
                        ></textarea>
                        {errors.past_surgeries && (
                          <small className="text-danger">
                            {errors.past_surgeries}
                          </small>
                        )}
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label">Chronic Illness</label>

                        <textarea
                          rows="3"
                          className="form-control"
                          name="chronic_illness"
                          value={formData.chronic_illness}
                          onChange={handleChange}
                        ></textarea>
                        {errors.chronic_illness && (
                          <small className="text-danger">
                            {errors.chronic_illness}
                          </small>
                        )}
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label">Mental Health</label>

                        <textarea
                          rows="3"
                          className="form-control"
                          name="mental_health"
                          value={formData.mental_health}
                          onChange={handleChange}
                        ></textarea>
                        {errors.mental_health && (
                          <small className="text-danger">
                            {errors.mental_health}
                          </small>
                        )}
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label">
                          Family Health History
                        </label>

                        <textarea
                          rows="4"
                          className="form-control"
                          name="family_health_history"
                          value={formData.family_health_history}
                          onChange={handleChange}
                        ></textarea>
                        {errors.family_health_history && (
                          <small className="text-danger">
                            {errors.family_health_history}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                      <button
                        type="button"
                        className="btn profile-prev-btn"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next-btn"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= STEP 3 ================= */}

                {currentStep === 6 && (
                  <div>
                    <h4 className="profile-section-title mb-4">
                      Insurance Information
                    </h4>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Insurance Provider</label>
                        <span className="profile-optional-badge ms-2">
                          Optional
                        </span>

                        <input
                          type="text"
                          className="form-control"
                          name="name_insurance_provider"
                          value={formData.name_insurance_provider}
                          onChange={handleChange}
                          placeholder="e.g. AXA, Reliance HMO"
                        />
                        {errors.name_insurance_provider && (
                          <small className="text-danger">
                            {errors.name_insurance_provider}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Insurance Type</label>
                        <span className="profile-optional-badge ms-2">
                          Optional
                        </span>

                        <select
                          className="form-select"
                          name="type_insurance_provider"
                          value={formData.type_insurance_provider}
                          onChange={handleChange}
                        >
                          <option value="">Select Type</option>

                          {insuranceTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {errors.type_insurance_provider && (
                          <small className="text-danger">
                            {errors.type_insurance_provider}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Policy Number</label>
                        <span className="profile-optional-badge ms-2">
                          Optional
                        </span>

                        <input
                          type="text"
                          className="form-control"
                          name="policy_number"
                          value={formData.policy_number}
                          onChange={handleChange}
                        />
                        {errors.policy_number && (
                          <small className="text-danger">
                            {errors.policy_number}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Coverage</label>
                        <span className="profile-optional-badge ms-2">
                          Optional
                        </span>

                        <input
                          type="text"
                          className="form-control"
                          name="insurance_coverage"
                          value={formData.insurance_coverage}
                          onChange={handleChange}
                          placeholder="e.g. Full Coverage"
                        />
                        {errors.insurance_coverage && (
                          <small className="text-danger">
                            {errors.insurance_coverage}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Valid Until</label>
                        <span className="profile-optional-badge ms-2">
                          Optional
                        </span>
                        <input
                          type="date"
                          className="form-control"
                          name="insurance_validity_period"
                          value={formData.insurance_validity_period}
                          onChange={handleChange}
                        />
                        {errors.insurance_validity_period && (
                          <small className="text-danger">
                            {errors.insurance_validity_period}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                      <button
                        type="button"
                        className="btn profile-prev-btn"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next-btn"
                        onClick={nextStep}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= STEP 7 ================= */}

                {currentStep === 7 && (
                  <div>
                    <h4 className="profile-section-title mb-4">
                      Review Information
                    </h4>

                    <div className="alert alert-light border">
                      <h5 className="mb-3">Personal Information</h5>

                      <p>
                        <strong>Date of Birth:</strong> {formData.dob}
                      </p>
                      <p>
                        <strong>Gender:</strong> {formData.gender}
                      </p>
                      <p>
                        <strong>Language:</strong> {formData.pref_language}
                      </p>
                      <p>
                        <strong>Phone:</strong> {formData.phone}
                      </p>

                      <hr />

                      <h5 className="mb-3">Address</h5>

                      <p>
                        {formData.address}, {formData.city}, {formData.state},{" "}
                        {formData.country}
                      </p>

                      <hr />

                      <h5 className="mb-3">Lifestyle</h5>

                      <p>
                        <strong>Weight:</strong> {formData.weight}
                      </p>
                      <p>
                        <strong>Height:</strong> {formData.height}
                      </p>
                      <p>
                        <strong>Exercise:</strong> {formData.exercise_routine}
                      </p>
                      <p>
                        <strong>Nutrition:</strong> {formData.nutrition_plan}
                      </p>
                      <p>
                        <strong>Smoking:</strong> {formData.smoking_habbits}
                      </p>
                      <p>
                        <strong>Alcohol:</strong> {formData.alcohol_consumption}
                      </p>
                      <p>
                        <strong>Sleep:</strong> {formData.sleep_pattern}
                      </p>

                      <hr />

                      <h5 className="mb-3">Medical</h5>

                      <p>
                        <strong>Blood Group:</strong> {formData.blood_type}
                      </p>
                      <p>
                        <strong>Primary Physician:</strong>{" "}
                        {formData.name_primary_physician}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                      <button
                        type="button"
                        className="btn profile-prev-btn"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        className="btn profile-next-btn"
                        onClick={nextStep}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= STEP 8 ================= */}

                {currentStep === 8 && (
                  <div>
                    <h3 className="text-center mb-4">Ready to Finish?</h3>

                    <p className="text-center text-muted mb-5">
                      Please confirm that all the information you supplied is
                      correct before submitting your health profile.
                    </p>

                    <div className="profile-image-section">
                      <h4 className="text-center mb-3">Upload Profile Photo</h4>

                      <p className="text-center text-muted mb-4">
                        Add a clear photo so healthcare providers can easily
                        identify you.
                      </p>

                      <div className="profile-preview-wrapper">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="profile-preview-image"
                          />
                        ) : (
                          <div className="profile-preview-placeholder">
                            <span>No Photo</span>
                          </div>
                        )}
                      </div>

                      <input
                        id="profileImageInput"
                        type="file"
                        accept="image/*"
                        name="profile_image"
                        onChange={handleChange}
                        hidden
                      />

                      <div className="text-center mt-4">
                        <button
                          type="button"
                          className="btn profile-upload-btn"
                          onClick={() =>
                            document.getElementById("profileImageInput").click()
                          }
                        >
                          {imagePreview ? "Change Photo" : "Choose Photo"}
                        </button>

                        {imagePreview && (
                          <button
                            type="button"
                            className="btn profile-remove-btn ms-2"
                            onClick={removeImage}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {formData.profile_image && (
                        <p className="text-center text-muted mt-3">
                          {formData.profile_image.name}
                        </p>
                      )}
                    </div>

                    <hr className="my-5" />

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn profile-prev-btn"
                        onClick={previousStep}
                      >
                        Previous
                      </button>

                      <button
                        type="submit"
                        className="btn profile-submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Saving...
                          </>
                        ) : (
                          "Complete Profile"
                        )}
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
