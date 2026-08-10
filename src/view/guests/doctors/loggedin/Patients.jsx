import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaSearch,
  FaUser,
  FaEye,
  FaCheckCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";

import "../../../../assets/css/patients.css";

import ApiUrl from "../../../../constants/ApiUrl";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";

import doctorImage from "../../../../assets/icons/doctor.png";

export default function Patients() {
  const navigate = useNavigate();
  const { token } = useDoctorAuth();

  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFilteredPatients(
      patients.filter((patient) =>
        patient.patient_fullname?.toLowerCase().includes(keyword),
      ),
    );
  }, [search, patients]);

  const loadPatients = async () => {
    try {
      const response = await fetch(ApiUrl.GET_DOCTOR_PATIENTS, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      console.log("Full Response:", data);
      console.log("Patients:", data.patients);
      console.log("First Patient:", data.patients?.[0]);

      if (response.ok) {
        setPatients(data.patients || []);
        setFilteredPatients(data.patients || []);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to load patients.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date);

    const day = d.getDate();

    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";

    return `${day}${suffix} ${d.toLocaleString("en-US", {
      month: "long",
    })}, ${d.getFullYear()}`;
  };

  const formatTime = (time) => {
    if (!time) return "-";

    return new Date(`2000-01-01T${time}`).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };
  const getProfileImage = (patient) => {
    const image = patient?.patient?.profile?.profile_image;

    if (!image) return doctorImage;

    // If the image already starts with "uploads/",
    // prepend your configured image base URL
    if (image.startsWith("uploads/")) {
      return `${ApiUrl.IMAGE_BASE_URL}/${image.replace("uploads/", "")}`;
    }

    return `${ApiUrl.IMAGE_BASE_URL}/${image}`;
  };

  const totalPatients = useMemo(() => patients.length, [patients]);

  return (
    <div className="doctor-patients-page">
      {/* Header */}

      <div className="patients-header">
        <div className="patients-header-left">
          <button
            className="doctor-patients-back-btn"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>

          <div>
            <h2>My Patients</h2>
            <p>
              {totalPatients} Patient Appointment
              {totalPatients !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="patients-search">
          <FaSearch />

          <input
            type="text"
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}

      <div className="patients-table-wrapper">
        {loading ? (
          <div className="patients-loading">Loading patients...</div>
        ) : filteredPatients.length === 0 ? (
          <div className="patients-empty">No patients found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered patients-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Age</th>
                  <th>Appointment Date</th>
                  <th>Consultation Time</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredPatients.map((patient, index) => (
                  <tr key={patient.id}>
                    {/* Number */}
                    <td>{index + 1}</td>

                    {/* Patient */}
                    <td>
                      <div className="patient-info">
                        <img
                          src={getProfileImage(patient)}
                          alt={patient.patient_fullname}
                          className="patient-avatar"
                          onError={(e) => {
                            e.target.src = doctorImage;
                          }}
                        />

                        <div>
                          <h4>{patient.patient_fullname}</h4>
                          <small>
                            Patient ID:{" "}
                            {patient.patient?.ehr_number || patient.patient_id}
                          </small>
                        </div>
                      </div>
                    </td>

                    {/* Age */}
                    <td>
                      <span className="age-badge">
                        {patient.patient_age ?? "--"} yrs
                      </span>
                    </td>

                    {/* Appointment Date */}
                    <td>
                      <div className="date-cell">
                        <FaCalendarAlt />
                        <span>{formatDate(patient.appointment_date)}</span>
                      </div>
                    </td>

                    {/* Consultation Time */}
                    <td>
                      <div className="time-box">
                        <FaClock />

                        <div>
                          <strong>
                            {formatTime(patient.start_time)} -{" "}
                            {formatTime(patient.end_time)}
                          </strong>

                          <small>Consultation</small>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`status ${patient.status}`}>
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
