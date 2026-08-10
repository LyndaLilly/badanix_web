import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

import ApiUrl from "../../../../constants/ApiUrl";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";

import { Country, State, City } from "country-state-city";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "../../../../assets/css/profilefill.css";

export default function DoctorProfileUpdate() {
  const navigate = useNavigate();

  const { doctor, token, refreshDoctor } = useDoctorAuth();

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const [imagePreview, setImagePreview] = useState(null);

  const [showImageModal, setShowImageModal] = useState(false);

  const [errors, setErrors] = useState({});

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

  const [formData, setFormData] = useState({
    profile_image: null,

    // Personal Information
    dob: "",
    gender: "",
    pref_language: "",
    phone_country: "ng",
    phone: "",

    // About Doctor
    about: "",
    experience: "",

    // Address Information
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",

    // License Information
    license_type: "",
    license_no: "",
    issuing_authority: "",
    expiry_date: "",

    // Professional Information
    accreditations: "",
    services: "",

    // Bank Information
    bank_name: "",
    acct_name: "",
    acct_num: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setPageLoading(true);

      const response = await fetch(ApiUrl.GET_DOCTOR_PROFILE, {
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
        throw new Error("Doctor profile not found.");
      }

      setFormData({
        profile_image: null,

        // Personal
        dob: profile.dob || "",

        gender: profile.gender || "",

        pref_language: profile.pref_language || "",

        phone_country: profile.phone_country || "ng",

        phone: profile.phone || "",

        // About

        about: profile.about || "",

        experience: profile.experience || "",

        // Address

        address: profile.address || "",

        city: profile.city || "",

        state: profile.state || "",

        country: profile.country || "",

        zipcode: profile.zipcode || "",

        // License

        license_type: profile.license_type || "",

        license_no: profile.license_no || "",

        issuing_authority: profile.issuing_authority || "",

        expiry_date: profile.expiry_date || "",

        // Professional

        accreditations: profile.accreditations || "",

        services: profile.services || "",

        // Bank

        bank_name: profile.bank_name || "",

        acct_name: profile.acct_name || "",

        acct_num: profile.acct_num || "",
      });

      if (profile.profile_image) {
        setImagePreview(
          `${ApiUrl.IMAGE_BASE_URL}/${profile.profile_image.replace(/^uploads\//, "")}`,
        );
      }
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "Error",

        text: error.message,
      });
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // IMAGE UPLOAD
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
      // When country changes reset state and city
      if (name === "country") {
        return {
          ...prev,

          country: value,

          state: "",

          city: "",
        };
      }

      // When state changes reset city
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

    // remove field error after typing

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

  const validateForm = () => {
    let newErrors = {};

    // Personal Information

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

    // About Doctor

    if (!formData.about) {
      newErrors.about = "About information is required.";
    }

    if (!formData.experience) {
      newErrors.experience = "Experience information is required.";
    }

    // Address

    if (!formData.address) {
      newErrors.address = "Address is required.";
    }

    if (!formData.country) {
      newErrors.country = "Country is required.";
    }

    if (!formData.state) {
      newErrors.state = "State is required.";
    }

    if (!formData.city) {
      newErrors.city = "City is required.";
    }

    // License

    if (!formData.license_type) {
      newErrors.license_type = "License type is required.";
    }

    if (!formData.license_no) {
      newErrors.license_no = "License number is required.";
    }

    if (!formData.issuing_authority) {
      newErrors.issuing_authority = "Issuing authority is required.";
    }

    if (!formData.expiry_date) {
      newErrors.expiry_date = "Expiry date is required.";
    }

    // Professional

    if (!formData.accreditations) {
      newErrors.accreditations = "Accreditations are required.";
    }

    if (!formData.services) {
      newErrors.services = "Services offered are required.";
    }

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

      const response = await fetch(ApiUrl.UPDATE_DOCTOR_PROFILE, {
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

        throw new Error(result.message || "Unable to update profile.");
      }

      // refresh logged in doctor data

      if (refreshDoctor) {
        await refreshDoctor();
      }

      // reload updated profile

      await loadProfile();

      await Swal.fire({
        icon: "success",

        title: "Success",

        text: result.message,
      });
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
                  onClick={() => navigate("/doctor/dashboard")}
                >
                  <FaArrowLeft className="me-2" />
                  Back to Dashboard
                </button>
              </div>

              <div className="text-center mb-5">
                <h2>Update Doctor Profile</h2>

                <p className="text-muted">
                  Keep your professional information updated so patients can
                  find you easily.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="profile-image-section mb-5">
                  <h4 className="profile-section-title text-center mb-3">
                    Profile Photo
                  </h4>

                  <div className="profile-preview-wrapper">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Doctor Profile"
                        className="profile-preview-image"
                        onClick={() => setShowImageModal(true)}
                        style={{
                          cursor: "pointer",
                        }}
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

                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">
                    Personal Information
                  </h4>

                  <div className="row">
                    {/* Date Of Birth */}

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

                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">About Doctor</h4>

                  <div className="row">
                    {/* About */}

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

                    {/* Experience */}

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
                </div>

                <hr className="mb-5" />

                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">
                    Address Information
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
                      <label className="form-label">
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

                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">
                    License Information
                  </h4>

                  <div className="row">
                    {/* License Type */}

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

                    {/* License Number */}

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

                    {/* Issuing Authority */}

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

                    {/* Expiry Date */}

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
                </div>

                <hr className="mb-5" />

                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">
                    License Information
                  </h4>

                  <div className="row">
                    {/* License Type */}

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

                    {/* License Number */}

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

                    {/* Issuing Authority */}

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

                    {/* Expiry Date */}

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
                </div>

                <hr className="mb-5" />

                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">
                    Professional Information
                  </h4>

                  <div className="row">
                    {/* Accreditations */}

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

                    {/* Services */}

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
                        <small className="text-danger">{errors.services}</small>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="mb-5" />

                {/* =======================
                    SUBMIT BUTTON
                ======================== */}

                <div className="d-flex justify-content-end mb-4">
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
            alt="Doctor Profile Large"
            className="profile-image-large"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
