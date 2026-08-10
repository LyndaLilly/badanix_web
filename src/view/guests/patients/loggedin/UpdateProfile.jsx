import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import ApiUrl from "../../../../constants/ApiUrl";
import { usePatientAuth } from "../../../../contexts/PatientAuthContext";

import { Country, State, City } from "country-state-city";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "../../../../assets/css/profilefill.css";

export default function PatientProfileUpdate() {
  const navigate = useNavigate();
  const { patient, token, refreshPatient } = usePatientAuth();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [imagePreview, setImagePreview] = useState(null);

  const [errors, setErrors] = useState({});

  const maxDob = new Date();
  maxDob.setFullYear(maxDob.getFullYear() - 18);

  const maxDobString = maxDob.toISOString().split("T")[0];

  const [showImageModal, setShowImageModal] = useState(false);

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

  const [formData, setFormData] = useState({
    profile_image: null,

    dob: "",
    gender: "",
    pref_language: "",
    phone_country: "ng",
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

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setPageLoading(true);

      const response = await fetch(ApiUrl.GET_PATIENT_PROFILE, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to load profile.");
      }

      const profile = result.profile;

      if (!profile) {
        throw new Error("Profile not found.");
      }

      setFormData({
        profile_image: null,

        dob: profile.dob || "",
        gender: profile.gender || "",
        pref_language: profile.pref_language || "",
        phone_country: "ng",
        phone: profile.phone || "",

        address: profile.address || "",
        city: profile.city || "",
        state: profile.state || "",
        country: profile.country || "",
        zipcode: profile.zipcode || "",

        name_insurance_provider: profile.name_insurance_provider || "",

        type_insurance_provider: profile.type_insurance_provider || "",

        policy_number: profile.policy_number || "",

        insurance_coverage: profile.insurance_coverage || "",

        insurance_validity_period: profile.insurance_validity_period || "",

        weight: profile.weight || "",
        height: profile.height || "",

        exercise_routine: profile.exercise_routine || "",

        nutrition_plan: profile.nutrition_plan || "",

        smoking_habbits: profile.smoking_habbits || "",

        alcohol_consumption: profile.alcohol_consumption || "",

        sleep_pattern: profile.sleep_pattern || "",

        blood_type: profile.blood_type || "",

        name_primary_physician: profile.name_primary_physician || "",

        existing_med_condition: profile.existing_med_condition || "",

        current_medication: profile.current_medication || "",

        allergies: profile.allergies || "",

        past_surgeries: profile.past_surgeries || "",

        chronic_illness: profile.chronic_illness || "",

        mental_health: profile.mental_health || "",

        family_health_history: profile.family_health_history || "",
      });

      if (profile.profile_image) {
        setImagePreview(
          `${ApiUrl.IMAGE_BASE_URL}/${profile.profile_image.replace(/^uploads\//, "")}`,
        );
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    } finally {
      setPageLoading(false);
    }
  };

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

      setErrors((prev) => ({
        ...prev,
        profile_image: "",
      }));

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

    const profileImage = document.getElementById("profileImageInput");

    if (profileImage) {
      profileImage.value = "";
    }

    setImagePreview(null);
  };

  const validateForm = () => {
    let newErrors = {};

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

    if (!formData.gender) newErrors.gender = "Gender is required.";

    if (!formData.pref_language)
      newErrors.pref_language = "Preferred language is required.";

    if (!formData.phone) newErrors.phone = "Phone number is required.";

    if (!formData.address) newErrors.address = "Address is required.";

    if (!formData.country) newErrors.country = "Country is required.";

    if (!formData.state) newErrors.state = "State is required.";

    if (!formData.city) newErrors.city = "City is required.";

    if (!formData.weight) newErrors.weight = "Weight is required.";

    if (!formData.height) newErrors.height = "Height is required.";

    if (!formData.exercise_routine)
      newErrors.exercise_routine = "Exercise routine is required.";

    if (!formData.nutrition_plan)
      newErrors.nutrition_plan = "Nutrition plan is required.";

    if (!formData.smoking_habbits)
      newErrors.smoking_habbits = "Smoking habit is required.";

    if (!formData.alcohol_consumption)
      newErrors.alcohol_consumption = "Alcohol consumption is required.";

    if (!formData.sleep_pattern)
      newErrors.sleep_pattern = "Sleep pattern is required.";

    if (!formData.blood_type) newErrors.blood_type = "Blood type is required.";

    if (!formData.existing_med_condition)
      newErrors.existing_med_condition =
        "Existing medical condition is required.";

    if (!formData.current_medication)
      newErrors.current_medication = "Current medication is required.";

    if (!formData.allergies)
      newErrors.allergies = "Allergies field is required.";

    if (!formData.past_surgeries)
      newErrors.past_surgeries = "Past surgeries field is required.";

    if (!formData.chronic_illness)
      newErrors.chronic_illness = "Chronic illness field is required.";

    if (!formData.mental_health)
      newErrors.mental_health = "Mental health field is required.";

    if (!formData.family_health_history)
      newErrors.family_health_history = "Family health history is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== "" && value !== null) {
          payload.append(key, value);
        }
      });

      const response = await fetch(ApiUrl.UPDATE_PATIENT_PROFILE, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to update profile.");
      }

      await refreshPatient();

      await loadProfile();

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: result.message,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const countries = Country.getAllCountries();

  const selectedCountry = countries.find(
    (country) => country.name === formData.country,
  );

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];

  const selectedState = states.find((state) => state.name === formData.state);

  const cities =
    selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
      : [];
  if (pageLoading) {
    return (
      <div className="profile-fill-page">
        <div className="container py-5 text-center">
          <div
            className="spinner-border"
            style={{
              width: "3rem",
              height: "3rem",
              color: "var(--primary)",
            }}
          ></div>

          <h4 className="mt-4">Loading Profile...</h4>

          <p className="text-muted">
            Please wait while we retrieve your information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-fill-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="profile-fill-card">
              <div className="mb-4">
                <button
                  type="button"
                  className="btn profile-back-btn"
                  onClick={() => navigate("/patient/dashboard")}
                >
                  <FaArrowLeft className="me-2" />
                  Back to Dashboard
                </button>
              </div>

              <div className="text-center mb-5">
                <h2>Update e-Patient Profile</h2>

                <p className="text-muted">
                  Keep your medical information up to date so healthcare
                  professionals can serve you better.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* =======================
                    PROFILE PHOTO
                ======================== */}

                <div className="profile-image-section mb-5">
                  <h4 className="profile-section-title text-center mb-3">
                    Profile Photo
                  </h4>

                  <div className="profile-preview-wrapper">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="profile-preview-image"
                        onClick={() => setShowImageModal(true)}
                        style={{ cursor: "pointer" }}
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
                    hidden
                    accept="image/*"
                    name="profile_image"
                    onChange={handleChange}
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

                <hr className="mb-5" />

                {/* =======================
                    PERSONAL INFORMATION
                ======================= */}
                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">
                    Personal Information
                  </h4>

                  <div className="row">
                    {/* Date of Birth */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date of Birth</label>

                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        max={maxDobString}
                      />

                      {errors.dob && (
                        <small className="text-danger">{errors.dob}</small>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Gender</label>

                      <select
                        className="form-select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
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

                    {/* Preferred Language */}
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

                    {/* Phone */}
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
                            country: country.name,
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
                </div>

                <hr className="mb-5" />

                {/* =======================
    CONTACT INFORMATION
======================= */}

                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">
                    Contact Information
                  </h4>

                  <div className="row">
                    {/* Address */}
                    <div className="col-12 mb-3">
                      <label className="form-label">Address</label>

                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                      />

                      {errors.address && (
                        <small className="text-danger">{errors.address}</small>
                      )}
                    </div>

                    {/* Country */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Country</label>

                      <select
                        className="form-select"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                      >
                        <option value="">Select Country</option>

                        {countries.map((country) => (
                          <option key={country.isoCode} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>

                      {errors.country && (
                        <small className="text-danger">{errors.country}</small>
                      )}
                    </div>

                    {/* State */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">State</label>

                      <select
                        className="form-select"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        disabled={!selectedCountry}
                      >
                        <option value="">Select State</option>

                        {states.map((state) => (
                          <option key={state.isoCode} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </select>

                      {errors.state && (
                        <small className="text-danger">{errors.state}</small>
                      )}
                    </div>

                    {/* City */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">City</label>

                      <select
                        className="form-select"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!selectedState}
                      >
                        <option value="">Select City</option>

                        {cities.map((city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>

                      {errors.city && (
                        <small className="text-danger">{errors.city}</small>
                      )}
                    </div>

                    {/* Zip Code */}
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
                        placeholder="Zip / Postal Code"
                      />

                      {errors.zipcode && (
                        <small className="text-danger">{errors.zipcode}</small>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="mb-5" />

                {/* =======================
    INSURANCE INFORMATION
======================= */}
                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">
                    Insurance Information
                  </h4>

                  <div className="row">
                    {/* Insurance Provider */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label d-flex align-items-center">
                        Insurance Provider
                        <span className="profile-optional-badge ms-2">
                          Optional
                        </span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="name_insurance_provider"
                        value={formData.name_insurance_provider}
                        onChange={handleChange}
                        placeholder="e.g. Reliance HMO"
                      />

                      {errors.name_insurance_provider && (
                        <small className="text-danger">
                          {errors.name_insurance_provider}
                        </small>
                      )}
                    </div>

                    {/* Insurance Type */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label d-flex align-items-center">
                        Insurance Type
                        <span className="profile-optional-badge ms-2">
                          Optional
                        </span>
                      </label>

                      <select
                        className="form-select"
                        name="type_insurance_provider"
                        value={formData.type_insurance_provider}
                        onChange={handleChange}
                      >
                        <option value="">Select Insurance Type</option>

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

                    {/* Policy Number */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label d-flex align-items-center">
                        Policy Number
                        <span className="profile-optional-badge ms-2">
                          Optional
                        </span>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        name="policy_number"
                        value={formData.policy_number}
                        onChange={handleChange}
                        placeholder="Policy Number"
                      />

                      {errors.policy_number && (
                        <small className="text-danger">
                          {errors.policy_number}
                        </small>
                      )}
                    </div>

                    {/* Coverage */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label d-flex align-items-center">
                        Insurance Coverage
                        <span className="profile-optional-badge ms-2">
                          Optional
                        </span>
                      </label>

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

                    {/* Valid Until */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label d-flex align-items-center">
                        Valid Until
                        <span className="profile-optional-badge ms-2">
                          Optional
                        </span>
                      </label>

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
                </div>

                <hr className="mb-5" />

                {/* =======================
    LIFESTYLE INFORMATION
======================= */}
                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">
                    Lifestyle Information
                  </h4>

                  <div className="row">
                    {/* Weight */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Weight</label>

                      <input
                        type="text"
                        className="form-control"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        placeholder="e.g. 70 kg"
                      />

                      {errors.weight && (
                        <small className="text-danger">{errors.weight}</small>
                      )}
                    </div>

                    {/* Height */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Height</label>

                      <input
                        type="text"
                        className="form-control"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        placeholder="e.g. 175 cm"
                      />

                      {errors.height && (
                        <small className="text-danger">{errors.height}</small>
                      )}
                    </div>

                    {/* Exercise */}
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

                    {/* Nutrition */}
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

                    {/* Smoking */}
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

                    {/* Alcohol */}
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Alcohol Consumption</label>

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

                    {/* Sleep */}
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
                </div>

                <hr className="mb-5" />

                {/* =======================
    MEDICAL INFORMATION
======================= */}
                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">
                    Medical Information
                  </h4>

                  <div className="row">
                    {/* Blood Type */}
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

                    {/* Primary Physician */}
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

                    {/* Existing Medical Conditions */}
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

                    {/* Current Medication */}
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

                    {/* Allergies */}
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
                </div>

                <hr className="mb-5" />

                {/* =======================
    HEALTH HISTORY
======================= */}
                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">Health History</h4>

                  <div className="row">
                    {/* Past Surgeries */}
                    <div className="col-12 mb-3">
                      <label className="form-label">Past Surgeries</label>

                      <textarea
                        rows="3"
                        className="form-control"
                        name="past_surgeries"
                        value={formData.past_surgeries}
                        onChange={handleChange}
                      />

                      {errors.past_surgeries && (
                        <small className="text-danger">
                          {errors.past_surgeries}
                        </small>
                      )}
                    </div>

                    {/* Chronic Illness */}
                    <div className="col-12 mb-3">
                      <label className="form-label">Chronic Illness</label>

                      <textarea
                        rows="3"
                        className="form-control"
                        name="chronic_illness"
                        value={formData.chronic_illness}
                        onChange={handleChange}
                      />

                      {errors.chronic_illness && (
                        <small className="text-danger">
                          {errors.chronic_illness}
                        </small>
                      )}
                    </div>

                    {/* Mental Health */}
                    <div className="col-12 mb-3">
                      <label className="form-label">Mental Health</label>

                      <textarea
                        rows="3"
                        className="form-control"
                        name="mental_health"
                        value={formData.mental_health}
                        onChange={handleChange}
                      />

                      {errors.mental_health && (
                        <small className="text-danger">
                          {errors.mental_health}
                        </small>
                      )}
                    </div>

                    {/* Family Health History */}
                    <div className="col-12 mb-4">
                      <label className="form-label">
                        Family Health History
                      </label>

                      <textarea
                        rows="4"
                        className="form-control"
                        name="family_health_history"
                        value={formData.family_health_history}
                        onChange={handleChange}
                      />

                      {errors.family_health_history && (
                        <small className="text-danger">
                          {errors.family_health_history}
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="mb-5" />

                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn profile-submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showImageModal && (
        <div
          className="profile-image-modal"
          onClick={() => setShowImageModal(false)}
        >
          <button
            type="button"
            className="profile-image-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowImageModal(false);
            }}
          >
            ✕
          </button>

          <img
            src={imagePreview}
            alt="Profile Large"
            className="profile-image-large"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
