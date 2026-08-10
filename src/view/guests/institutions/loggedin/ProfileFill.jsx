import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import ApiUrl from "../../../../constants/ApiUrl";
import { useInstitutionAuth } from "../../../../contexts/InstitutionAuthContext";

import { Country, State, City } from "country-state-city";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "../../../../assets/css/profilefill.css";

export default function ProfileFill() {
  const navigate = useNavigate();

  const { institution, token, refreshInstitution } = useInstitutionAuth();

  const [loading, setLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  const [imagePreview, setImagePreview] = useState(null);

  const [errors, setErrors] = useState({});

  const totalSteps = 8;

  const ownershipTypes = [
    "Private",
    "Government",
    "NGO",
    "Partnership",
    "Other",
  ];

  const licenseTypes = [
    "Hospital License",
    "Pharmacy License",
    "Laboratory License",
    "Professional License",
    "Other",
  ];

  //   const [formData, setFormData] = useState({
  //     profile_image: null,

  //     // Basic Information

  //     reg_no: "",

  //     about: "",

  //     date_of_establishment: "",

  //     ownership_type: "",

  //     // Contact

  //     phone_country: "ng",

  //     phone: "",

  //     // Address

  //     address: "",

  //     city: "",

  //     state: "",

  //     country: "",

  //     zipcode: "",

  //     // License

  //     license_type: "",

  //     license_no: "",

  //     issuing_authority: "",

  //     expiry_date: "",

  //     // Professional

  //     accreditations: "",

  //     services: "",

  //     // Optional

  //     // Optional

  //     website: "",

  //     // Bank Information

  //     bank_name: "",

  //     acct_name: "",

  //     acct_num: "",

  //     // Social Media

  //     socials_facebook: "",

  //     socials_instagram: "",

  //     socials_x: "",

  //     socials_youtube: "",
  //   });

  const [formData, setFormData] = useState({
    profile_image: null,

    // Basic Information

    reg_no: "BADANIX-INS-123456",

    about:
      "We are a modern healthcare institution providing quality medical services, patient care, diagnostics, and healthcare solutions.",

    date_of_establishment: "2015-06-20",

    ownership_type: "Private",

    // Contact

    phone_country: "ng",

    phone: "+2348012345678",

    // Address

    address: "123 Healthcare Avenue",

    city: "Awka",

    state: "Anambra",

    country: "Nigeria",

    zipcode: "420001",

    // License

    license_type: "Hospital License",

    license_no: "HOSP-LIC-987654",

    issuing_authority: "Federal Ministry of Health",

    expiry_date: "2030-12-31",

    // Professional

    accreditations:
      "ISO 9001 Certified, Medical Council Approved, Healthcare Quality Accreditation",

    services:
      "Emergency Care, General Consultation, Laboratory Services, Pharmacy Services, Specialist Clinics",

    // Optional

    website: "https://www.badanix.com",

    // Bank Information

    bank_name: "Access Bank",

    acct_name: "BADANIX Healthcare Limited",

    acct_num: "0123456789",

    // Social Media

    socials_facebook: "https://facebook.com/badanixhealthcare",

    socials_instagram: "https://instagram.com/badanixhealthcare",

    socials_x: "https://x.com/badanixhealthcare",

    socials_youtube: "https://youtube.com/@badanixhealthcare",
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

      const response = await fetch(
        ApiUrl.CREATE_INSTITUTION_PROFILE,

        {
          method: "POST",

          headers: {
            Accept: "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: payload,
        },
      );

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          const backendErrors = {};

          let duplicateMessage = "";

          Object.keys(result.errors).forEach((field) => {
            const message = result.errors[field][0];

            backendErrors[field] = message;

            if (field === "reg_no") {
              duplicateMessage += `Registration Number: ${message}\n`;
            }

            if (field === "license_no") {
              duplicateMessage += `License Number: ${message}\n`;
            }
          });

          setErrors(backendErrors);

          if (duplicateMessage) {
            Swal.fire({
              icon: "warning",
              title: "Already Exists",
              text: duplicateMessage,
            });

            return;
          }

          return;
        }

        throw new Error(result.message || "Unable to create profile.");
      }

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: result.message,
      });

      // Get latest institution with profile
      await refreshInstitution();

      const type = institution?.institution_type?.toLowerCase();

      if (type === "hospital") {
        window.location.href = "/hospital/dashboard";
      } else if (type === "pharmacy") {
        window.location.href = "/pharmacy/dashboard";
      } else if (type === "laboratory") {
        window.location.href = "/laboratory/dashboard";
      } else {
        window.location.href = "/";
      }
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
    setErrors({});

    switch (currentStep) {
      case 1:
        if (!formData.reg_no)
          newErrors.reg_no = "Registration number is required.";

        if (!formData.date_of_establishment)
          newErrors.date_of_establishment =
            "Date of establishment is required.";

        if (!formData.ownership_type)
          newErrors.ownership_type = "Ownership type is required.";

        if (!formData.phone) newErrors.phone = "Phone number is required.";

        break;

      case 2:
        if (!formData.about) newErrors.about = "About information is required.";

        if (!formData.services) newErrors.services = "Services are required.";

        break;

      case 3:
        if (!formData.address) newErrors.address = "Address is required.";

        if (!formData.country) newErrors.country = "Country is required.";

        if (!formData.state) newErrors.state = "State is required.";

        if (!formData.city) newErrors.city = "City is required.";

        if (!formData.zipcode) newErrors.zipcode = "Zipcode is required.";

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
                <h2>Complete Institution Profile</h2>

                <p>
                  Welcome <strong>{institution?.fullname}</strong>. Complete
                  your institution profile to continue using BADANIX.
                </p>
              </div>

              {/* Progress */}

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
                {/* ================= STEP 1 ================= */}
                {currentStep === 1 && (
                  <div>
                    <h4 className="profile-section-title mb-4">
                      Basic Institution Information
                    </h4>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Registration Number
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          name="reg_no"
                          value={formData.reg_no}
                          onChange={handleChange}
                          placeholder="Enter registration number"
                        />

                        {errors.reg_no && (
                          <small className="text-danger">{errors.reg_no}</small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Date Of Establishment
                        </label>

                        <input
                          type="date"
                          className="form-control"
                          name="date_of_establishment"
                          value={formData.date_of_establishment}
                          onChange={handleChange}
                        />

                        {errors.date_of_establishment && (
                          <small className="text-danger">
                            {errors.date_of_establishment}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Ownership Type</label>

                        <select
                          className="form-select"
                          name="ownership_type"
                          value={formData.ownership_type}
                          onChange={handleChange}
                        >
                          <option value="">Select Ownership</option>

                          {ownershipTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>

                        {errors.ownership_type && (
                          <small className="text-danger">
                            {errors.ownership_type}
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
                    <h4 className="profile-section-title mb-4">
                      About Institution
                    </h4>

                    <div className="row">
                      <div className="col-12 mb-3">
                        <label className="form-label">About Institution</label>

                        <textarea
                          rows="5"
                          className="form-control"
                          name="about"
                          value={formData.about}
                          onChange={handleChange}
                          placeholder="Describe your institution"
                        ></textarea>

                        {errors.about && (
                          <small className="text-danger">{errors.about}</small>
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
                          placeholder="Example: Emergency care, Laboratory testing, Pharmacy services"
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
                          placeholder="Enter institution address"
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
                          placeholder="Enter zipcode"
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
                          placeholder="Health regulatory authority"
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
                          placeholder="Enter certifications, memberships, approvals etc."
                        ></textarea>

                        {errors.accreditations && (
                          <small className="text-danger">
                            {errors.accreditations}
                          </small>
                        )}
                      </div>

                      <div className="col-md-12 mb-3">
                        <label className="form-label">
                          Website
                          <span className="profile-optional-badge ms-2">
                            Optional
                          </span>
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="https://example.com"
                        />

                        {errors.website && (
                          <small className="text-danger">
                            {errors.website}
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
                      Bank & Social Information
                    </h4>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Bank Name</label>

                        <input
                          type="text"
                          className="form-control"
                          name="bank_name"
                          value={formData.bank_name}
                          onChange={handleChange}
                          placeholder="Enter bank name"
                        />

                        {errors.bank_name && (
                          <small className="text-danger">
                            {errors.bank_name}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Account Name</label>

                        <input
                          type="text"
                          className="form-control"
                          name="acct_name"
                          value={formData.acct_name}
                          onChange={handleChange}
                          placeholder="Account holder name"
                        />

                        {errors.acct_name && (
                          <small className="text-danger">
                            {errors.acct_name}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Account Number</label>

                        <input
                          type="text"
                          className="form-control"
                          name="acct_num"
                          value={formData.acct_num}
                          onChange={handleChange}
                          placeholder="Account number"
                        />

                        {errors.acct_num && (
                          <small className="text-danger">
                            {errors.acct_num}
                          </small>
                        )}
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Facebook</label>

                        <input
                          type="text"
                          className="form-control"
                          name="socials_facebook"
                          value={formData.socials_facebook}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Instagram</label>

                        <input
                          type="text"
                          className="form-control"
                          name="socials_instagram"
                          value={formData.socials_instagram}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">X (Twitter)</label>

                        <input
                          type="text"
                          className="form-control"
                          name="socials_x"
                          value={formData.socials_x}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Youtube</label>

                        <input
                          type="text"
                          className="form-control"
                          name="socials_youtube"
                          value={formData.socials_youtube}
                          onChange={handleChange}
                        />
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
                {currentStep === 7 && (
                  <div>
                    <h4 className="profile-section-title mb-4">
                      Review Institution Information
                    </h4>

                    <div className="alert alert-light border">
                      <h5 className="mb-3">Basic Information</h5>

                      <p>
                        <strong>Registration Number:</strong> {formData.reg_no}
                      </p>

                      <p>
                        <strong>Date Established:</strong>{" "}
                        {formData.date_of_establishment}
                      </p>

                      <p>
                        <strong>Ownership Type:</strong>{" "}
                        {formData.ownership_type}
                      </p>

                      <p>
                        <strong>Phone:</strong> {formData.phone}
                      </p>

                      <hr />

                      <h5 className="mb-3">About Institution</h5>

                      <p>
                        <strong>About:</strong>

                        <br />

                        {formData.about}
                      </p>

                      <p>
                        <strong>Services:</strong>

                        <br />

                        {formData.services}
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
                        <strong>Website:</strong>{" "}
                        {formData.website || "Not provided"}
                      </p>

                      <hr />

                      <h5 className="mb-3">Bank Information</h5>

                      <p>
                        <strong>Bank:</strong> {formData.bank_name}
                      </p>

                      <p>
                        <strong>Account Name:</strong> {formData.acct_name}
                      </p>

                      <p>
                        <strong>Account Number:</strong> {formData.acct_num}
                      </p>

                      <hr />

                      <h5 className="mb-3">Social Media</h5>

                      <p>
                        <strong>Facebook:</strong>{" "}
                        {formData.socials_facebook || "Not provided"}
                      </p>

                      <p>
                        <strong>Instagram:</strong>{" "}
                        {formData.socials_instagram || "Not provided"}
                      </p>

                      <p>
                        <strong>X:</strong>{" "}
                        {formData.socials_x || "Not provided"}
                      </p>

                      <p>
                        <strong>YouTube:</strong>{" "}
                        {formData.socials_youtube || "Not provided"}
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
                {currentStep === 8 && (
                  <div>
                    <h3 className="text-center mb-4">Ready to Finish?</h3>

                    <p className="text-center text-muted mb-5">
                      Upload your institution image/logo and complete your
                      profile.
                    </p>

                    <div className="profile-image-section">
                      <h4 className="text-center mb-3">
                        Upload Institution Image
                      </h4>

                      <p className="text-center text-muted mb-4">
                        Add your institution logo or official image.
                      </p>

                      <div className="profile-preview-wrapper">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Institution Preview"
                            className="profile-preview-image"
                          />
                        ) : (
                          <div className="profile-preview-placeholder">
                            <span>No Image</span>
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
                            document

                              .getElementById("profileImageInput")

                              .click()
                          }
                        >
                          {imagePreview ? "Change Image" : "Choose Image"}
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
