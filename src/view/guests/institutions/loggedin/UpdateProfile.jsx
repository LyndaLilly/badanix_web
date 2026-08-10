import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

import ApiUrl from "../../../../constants/ApiUrl";
import { useInstitutionAuth } from "../../../../contexts/InstitutionAuthContext";

import { Country, State, City } from "country-state-city";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "../../../../assets/css/profilefill.css";

export default function InstitutionProfileUpdate() {
  const navigate = useNavigate();

  const { institution, token, refreshInstitution } = useInstitutionAuth();

  const [loading, setLoading] = useState(false);

  const [pageLoading, setPageLoading] = useState(true);

  const [imagePreview, setImagePreview] = useState(null);

  const [showImageModal, setShowImageModal] = useState(false);

  const [errors, setErrors] = useState({});

  const goBackToDashboard = () => {
  if (!institution?.institution_type) {
    navigate("/institution/dashboard");
    return;
  }

  switch (institution.institution_type.toLowerCase()) {
    case "hospital":
      navigate("/hospital/dashboard");
      break;

    case "clinic":
      navigate("/clinic/dashboard");
      break;

    case "pharmacy":
      navigate("/pharmacy/dashboard");
      break;

    case "laboratory":
      navigate("/laboratory/dashboard");
      break;

    default:
      navigate("/institution/dashboard");
      break;
  }
};

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

  const [formData, setFormData] = useState({
    profile_image: null,

    // Basic Information

    reg_no: "",

    about: "",

    date_of_establishment: "",

    ownership_type: "",

    // Contact

    phone_country: "ng",

    phone: "",

    // Address

    address: "",

    city: "",

    state: "",

    country: "",

    zipcode: "",

    // License

    license_type: "",

    license_no: "",

    issuing_authority: "",

    expiry_date: "",

    // Professional

    accreditations: "",

    services: "",

    // Optional

    website: "",

    // Bank Information

    bank_name: "",

    acct_name: "",

    acct_num: "",

    // Social Media

    socials_facebook: "",

    socials_instagram: "",

    socials_x: "",

    socials_youtube: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setPageLoading(true);

      const response = await fetch(ApiUrl.GET_INSTITUTION_PROFILE, {
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
        throw new Error("Institution profile not found.");
      }

      setFormData({
        profile_image: null,

        reg_no: profile.reg_no || "",

        about: profile.about || "",

        date_of_establishment: profile.date_of_establishment || "",

        ownership_type: profile.ownership_type || "",

        phone_country: profile.phone_country || "ng",

        phone: profile.phone || "",

        address: profile.address || "",

        city: profile.city || "",

        state: profile.state || "",

        country: profile.country || "",

        zipcode: profile.zipcode || "",

        license_type: profile.license_type || "",

        license_no: profile.license_no || "",

        issuing_authority: profile.issuing_authority || "",

        expiry_date: profile.expiry_date || "",

        accreditations: profile.accreditations || "",

        services: profile.services || "",

        website: profile.website || "",

        bank_name: profile.bank_name || "",

        acct_name: profile.acct_name || "",

        acct_num: profile.acct_num || "",

        socials_facebook: profile.socials_facebook || "",

        socials_instagram: profile.socials_instagram || "",

        socials_x: profile.socials_x || "",

        socials_youtube: profile.socials_youtube || "",
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
      // Reset state and city when country changes

      if (name === "country") {
        return {
          ...prev,

          country: value,

          state: "",

          city: "",
        };
      }

      // Reset city when state changes

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

    setErrors((prev) => ({
      ...prev,

      profile_image: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Basic

    if (!formData.reg_no) {
      newErrors.reg_no = "Registration number is required.";
    }

    if (!formData.about) {
      newErrors.about = "About information is required.";
    }

    if (!formData.date_of_establishment) {
      newErrors.date_of_establishment = "Date of establishment is required.";
    }

    if (!formData.ownership_type) {
      newErrors.ownership_type = "Ownership type is required.";
    }

    // Contact

    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
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

      const response = await fetch(
        ApiUrl.UPDATE_INSTITUTION_PROFILE,

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
          setErrors(result.errors);
        }

        throw new Error(result.message || "Unable to update profile.");
      }

      if (refreshInstitution) {
        await refreshInstitution();
      }

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
                 onClick={goBackToDashboard}
                >
                  <FaArrowLeft className="me-2" />
                  Back to Dashboard
                </button>
              </div>

              <div className="text-center mb-5">
                <h2>Update Institution Profile</h2>

                <p className="text-muted">
                  Keep your institution information updated so patients can find
                  you easily.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* ================= IMAGE ================= */}

                <div className="profile-image-section mb-5">
                  <h4 className="profile-section-title text-center mb-3">
                    Institution Image
                  </h4>

                  <div className="profile-preview-wrapper">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Institution"
                        className="profile-preview-image"
                        onClick={() => setShowImageModal(true)}
                        style={{
                          cursor: "pointer",
                        }}
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

                <hr className="mb-5" />

                {/* ================= BASIC INFORMATION ================= */}

                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">
                    Basic Institution Information
                  </h4>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Registration Number</label>

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

                {/* ================= ABOUT ================= */}

                <div className="mb-5">
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
                        placeholder="Example: Emergency care, Pharmacy, Laboratory services"
                      ></textarea>

                      {errors.services && (
                        <small className="text-danger">{errors.services}</small>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="mb-5" />

                {/* ================= ADDRESS INFORMATION ================= */}

                <div className="mb-5">
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
                        <small className="text-danger">{errors.address}</small>
                      )}
                    </div>

                    {/* COUNTRY */}

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

                    {/* STATE */}

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

                    {/* CITY */}

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

                    {/* ZIP */}

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
                    </div>
                  </div>
                </div>

                <hr className="mb-5" />

                {/* ================= LICENSE ================= */}

                <div className="mb-5">
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
                        placeholder="Regulatory authority"
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
                </div>

                <hr className="mb-5" />

                {/* ================= PROFESSIONAL ================= */}

                <div className="mb-5">
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
                        placeholder="Enter certifications, approvals, memberships"
                      ></textarea>

                      {errors.accreditations && (
                        <small className="text-danger">
                          {errors.accreditations}
                        </small>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="mb-5" />

                {/* ================= BANK DETAILS ================= */}

                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">
                    Bank Information
                  </h4>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Bank Name</label>

                      <input
                        className="form-control"
                        name="bank_name"
                        value={formData.bank_name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Account Name</label>

                      <input
                        className="form-control"
                        name="acct_name"
                        value={formData.acct_name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label">Account Number</label>

                      <input
                        className="form-control"
                        name="acct_num"
                        value={formData.acct_num}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <hr className="mb-5" />

                {/* ================= SOCIAL MEDIA ================= */}

                <div className="mb-5">
                  <h4 className="profile-section-title mb-4">
                    Social Media Links
                  </h4>

                  <div className="row">
                    {[
                      ["socials_facebook", "Facebook"],

                      ["socials_instagram", "Instagram"],

                      ["socials_x", "X (Twitter)"],

                      ["socials_youtube", "Youtube"],
                    ].map(([name, label]) => (
                      <div className="col-md-6 mb-3" key={name}>
                        <label className="form-label">{label}</label>

                        <input
                          type="text"
                          className="form-control"
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          placeholder="https://"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="mb-5" />

                {/* ================= SUBMIT ================= */}

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

      {/* ================= IMAGE MODAL ================= */}

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
            alt="Institution Large"
            className="profile-image-large"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
