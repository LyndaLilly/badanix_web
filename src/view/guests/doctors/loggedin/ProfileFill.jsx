import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import ApiUrl from "../../../../constants/ApiUrl";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";

import { Country, State, City } from "country-state-city";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "../../../../assets/css/profilefill.css";

export default function ProfileFill() {
  const navigate = useNavigate();

  const { doctor, token, refreshDoctor } = useDoctorAuth();

  const [loading, setLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const [imagePreview, setImagePreview] = useState(null);

  const [errors, setErrors] = useState({});

  const totalSteps = 8;

  const maxDob = new Date();
  maxDob.setFullYear(maxDob.getFullYear() - 18);

  const maxDobString = maxDob.toISOString().split("T")[0];

  const languages = ["English", "French", "Spanish", "Arabic", "Chinese"];

  const licenseTypes = [
    "Medical License",
    "Professional License",
    "Specialist License",
    "Other",
  ];

  //   const [formData, setFormData] = useState({
  //     profile_image: null,
  //     dob: "",
  //     gender: "",
  //     pref_language: "English",
  //     phone_country: "ng",
  //     phone: "",
  //     about: "",
  //     experience: "",
  //     address: "",
  //     city: "",
  //     state: "",
  //     country: "",
  //     zipcode: "",
  //     license_type: "",
  //     license_no: "",
  //     issuing_authority: "",
  //     expiry_date: "",
  //     accreditations: "",
  //     services: "",
  //     bank_name: "",
  //     acct_name: "",
  //     acct_num: "",
  //   });

  const [formData, setFormData] = useState({
    profile_image: null,

    // Personal
    dob: "1988-04-12",
    gender: "male",
    pref_language: "English",
    phone_country: "ng",
    phone: "+2348012345678",

    // About
    about:
      "I am a dedicated medical doctor passionate about providing quality healthcare services and improving patient outcomes through compassionate care.",

    experience:
      "10 years experience in General Medicine with special interest in preventive healthcare and patient management.",

    // Address
    address: "15 Admiralty Way",
    city: "Lekki",
    state: "Lagos",
    country: "Nigeria",
    zipcode: "101233",

    // License
    license_type: "Medical License",
    license_no: "MDCN-2024-009876",
    issuing_authority: "Medical and Dental Council of Nigeria (MDCN)",
    expiry_date: "2027-12-31",

    // Professional
    accreditations:
      "Member of Medical and Dental Council of Nigeria (MDCN). Certified in Advanced Life Support (ALS). Member of Nigerian Medical Association (NMA).",

    services:
      "General Consultation, Health Screening, Diagnosis, Chronic Disease Management, Preventive Healthcare, Patient Follow-up.",

    // Bank
    bank_name: "Access Bank",
    acct_name: "Dr John Emmanuel",
    acct_num: "0123456789",
  });

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

    setImagePreview(null);

    setErrors((prev) => ({
      ...prev,
      profile_image: "",
    }));

    const input = document.getElementById("profileImageInput");

    if (input) {
      input.value = "";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== "" && value !== null) {
          payload.append(key, value);
        }
      });

      const response = await fetch(ApiUrl.CREATE_DOCTOR_PROFILE, {
        method: "POST",

        headers: {
          Accept: "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: payload,
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        }

        throw new Error(result.message || "Unable to create profile.");
      }

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: result.message,
      });

      // reload doctor from database
      await refreshDoctor();

      navigate("/doctor/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "Error",

        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const validateStep = () => {
    let newErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.dob) newErrors.dob = "Date of birth is required.";

        if (!formData.gender) newErrors.gender = "Gender is required.";

        if (!formData.pref_language)
          newErrors.pref_language = "Preferred language is required.";

        if (!formData.phone) newErrors.phone = "Phone number is required.";

        break;

      case 2:
        if (!formData.about) newErrors.about = "About information is required.";

        if (!formData.experience)
          newErrors.experience = "Experience is required.";

        break;

      case 3:
        if (!formData.address) newErrors.address = "Address is required.";

        if (!formData.city) newErrors.city = "City is required.";

        if (!formData.state) newErrors.state = "State is required.";

        if (!formData.country) newErrors.country = "Country is required.";

        if (!formData.zipcode) newErrors.zipcode = "Zip code is required.";

        break;

      case 4:
        if (!formData.license_type)
          newErrors.license_type = "License type is required.";

        if (!formData.license_no)
          newErrors.license_no = "License number is required.";

        if (!formData.issuing_authority)
          newErrors.issuing_authority = "Issuing authority is required.";

        if (!formData.expiry_date)
          newErrors.expiry_date = "Expiry date is required.";

        break;

      case 5:
        if (!formData.accreditations)
          newErrors.accreditations = "Accreditations are required.";

        if (!formData.services)
          newErrors.services = "Services offered are required.";

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

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="profile-fill-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="profile-fill-card">
              <div className="text-center mb-4">
                <h2>Complete Your Doctor Profile</h2>

                <p>
                  Welcome <strong>{doctor?.fullname}</strong>. Complete your
                  professional profile to continue using BADANIX.
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
                    style={{
                      width: `${progress}%`,
                    }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* STEP 1 START */}

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
                          onChange={(value, country) => {
                            setFormData((prev) => ({
                              ...prev,

                              phone: "+" + value,

                              phone_country: country.countryCode,
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
                    <h4 className="profile-section-title mb-4">About Doctor</h4>

                    <div className="row">
                      <div className="col-12 mb-3">
                        <label className="form-label">About You</label>

                        <textarea
                          rows="5"
                          className="form-control"
                          name="about"
                          value={formData.about}
                          onChange={handleChange}
                          placeholder="Tell patients about yourself"
                        ></textarea>

                        {errors.about && (
                          <small className="text-danger">{errors.about}</small>
                        )}
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label">Experience</label>

                        <textarea
                          rows="4"
                          className="form-control"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          placeholder="Example: 8 years experience in cardiology"
                        ></textarea>

                        {errors.experience && (
                          <small className="text-danger">
                            {errors.experience}
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

                {currentStep === 3 && (
                  <div>
                    <h4 className="profile-section-title mb-4">
                      Address Information
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
                          placeholder="Enter your address"
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
                        <label className="form-label">Zip Code</label>

                        <input
                          type="text"
                          className="form-control"
                          name="zipcode"
                          value={formData.zipcode}
                          onChange={handleChange}
                          placeholder="Enter zip code"
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

                {currentStep === 4 && (
                  <div>
                    <h4 className="profile-section-title mb-4">
                      License Information
                    </h4>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">License Type</label>

                        <select
                          className="form-select"
                          name="license_type"
                          value={formData.license_type}
                          onChange={handleChange}
                        >
                          <option value="">Select License Type</option>

                          {licenseTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>

                        {errors.license_type && (
                          <small className="text-danger">
                            {errors.license_type}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">License Number</label>

                        <input
                          type="text"
                          className="form-control"
                          name="license_no"
                          value={formData.license_no}
                          onChange={handleChange}
                          placeholder="Enter license number"
                        />

                        {errors.license_no && (
                          <small className="text-danger">
                            {errors.license_no}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Issuing Authority</label>

                        <input
                          type="text"
                          className="form-control"
                          name="issuing_authority"
                          value={formData.issuing_authority}
                          onChange={handleChange}
                          placeholder="Medical council / authority"
                        />

                        {errors.issuing_authority && (
                          <small className="text-danger">
                            {errors.issuing_authority}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Expiry Date</label>

                        <input
                          type="date"
                          className="form-control"
                          name="expiry_date"
                          value={formData.expiry_date}
                          onChange={handleChange}
                        />

                        {errors.expiry_date && (
                          <small className="text-danger">
                            {errors.expiry_date}
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

                {currentStep === 5 && (
                  <div>
                    <h4 className="profile-section-title mb-4">
                      Professional Information
                    </h4>

                    <div className="row">
                      <div className="col-12 mb-3">
                        <label className="form-label">Accreditations</label>

                        <textarea
                          rows="5"
                          className="form-control"
                          name="accreditations"
                          value={formData.accreditations}
                          onChange={handleChange}
                          placeholder="Enter your professional accreditations, certificates, memberships etc."
                        ></textarea>

                        {errors.accreditations && (
                          <small className="text-danger">
                            {errors.accreditations}
                          </small>
                        )}
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label">Services Offered</label>

                        <textarea
                          rows="5"
                          className="form-control"
                          name="services"
                          value={formData.services}
                          onChange={handleChange}
                          placeholder="Example: Consultation, Surgery, Diagnosis, Health Screening"
                        ></textarea>

                        {errors.services && (
                          <small className="text-danger">
                            {errors.services}
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

                {currentStep === 6 && (
                  <div>
                    <h4 className="profile-section-title mb-4">
                      Bank Information
                    </h4>

                    <p className="text-muted mb-4">
                      Add your payment details for consultation earnings. This
                      information can be updated later.
                    </p>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Bank Name
                          <span className="profile-optional-badge ms-2">
                            Optional
                          </span>
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          name="bank_name"
                          value={formData.bank_name}
                          onChange={handleChange}
                          placeholder="Example: Access Bank"
                        />

                        {errors.bank_name && (
                          <small className="text-danger">
                            {errors.bank_name}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Account Name
                          <span className="profile-optional-badge ms-2">
                            Optional
                          </span>
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          name="acct_name"
                          value={formData.acct_name}
                          onChange={handleChange}
                          placeholder="Name on account"
                        />

                        {errors.acct_name && (
                          <small className="text-danger">
                            {errors.acct_name}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Account Number
                          <span className="profile-optional-badge ms-2">
                            Optional
                          </span>
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          name="acct_num"
                          value={formData.acct_num}
                          onChange={handleChange}
                          placeholder="Enter account number"
                        />

                        {errors.acct_num && (
                          <small className="text-danger">
                            {errors.acct_num}
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

                      <h5 className="mb-3">About Doctor</h5>

                      <p>
                        <strong>About:</strong>
                        <br />
                        {formData.about}
                      </p>

                      <p>
                        <strong>Experience:</strong>
                        <br />
                        {formData.experience}
                      </p>

                      <hr />

                      <h5 className="mb-3">Address</h5>

                      <p>
                        {formData.address}, {formData.city}, {formData.state},{" "}
                        {formData.country}
                      </p>

                      <p>
                        <strong>Zip Code:</strong> {formData.zipcode}
                      </p>

                      <hr />

                      <h5 className="mb-3">License Information</h5>

                      <p>
                        <strong>License Type:</strong> {formData.license_type}
                      </p>

                      <p>
                        <strong>License Number:</strong> {formData.license_no}
                      </p>

                      <p>
                        <strong>Issuing Authority:</strong>{" "}
                        {formData.issuing_authority}
                      </p>

                      <p>
                        <strong>Expiry Date:</strong> {formData.expiry_date}
                      </p>

                      <hr />

                      <h5 className="mb-3">Professional Information</h5>

                      <p>
                        <strong>Accreditations:</strong>
                        <br />
                        {formData.accreditations}
                      </p>

                      <p>
                        <strong>Services:</strong>
                        <br />
                        {formData.services}
                      </p>

                      <hr />

                      <h5 className="mb-3">Bank Information</h5>

                      <p>
                        <strong>Bank:</strong>{" "}
                        {formData.bank_name || "Not provided"}
                      </p>

                      <p>
                        <strong>Account Name:</strong>{" "}
                        {formData.acct_name || "Not provided"}
                      </p>

                      <p>
                        <strong>Account Number:</strong>{" "}
                        {formData.acct_num || "Not provided"}
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
                      Please upload your profile photo and confirm your
                      professional profile information before submitting.
                    </p>

                    <div className="profile-image-section">
                      <h4 className="text-center mb-3">Upload Profile Photo</h4>

                      <p className="text-center text-muted mb-4">
                        Add a clear photo so patients can easily identify you.
                      </p>

                      <div className="profile-preview-wrapper">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Doctor Preview"
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
