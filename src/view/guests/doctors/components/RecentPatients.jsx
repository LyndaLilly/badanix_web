import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaCalendarAlt,
  FaChevronRight,
} from "react-icons/fa";
import Swal from "sweetalert2";

import ApiUrl from "../../../../constants/ApiUrl";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";

import doctorImage from "../../../../assets/icons/doctor.png";
import "../../../../assets/css/recentpatients.css";

export default function RecentPatients() {
  const navigate = useNavigate();
  const { token } = useDoctorAuth();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const response = await fetch(ApiUrl.GET_DOCTOR_PATIENTS, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        const sortedPatients = [...(data.patients || [])].sort((a, b) => {
          return (
            new Date(b.appointment_date).getTime() -
            new Date(a.appointment_date).getTime()
          );
        });

        setPatients(sortedPatients.slice(0, 5));
      } else {
        Swal.fire({
          icon: "error",
          title: "Unable to Load",
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to load recent patients.",
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
      month: "short",
    })}`;
  };

  const getProfileImage = (patient) => {
    const image = patient?.patient?.profile?.profile_image;

    if (!image) return doctorImage;

    if (image.startsWith("uploads/")) {
      return `${ApiUrl.IMAGE_BASE_URL}/${image.replace("uploads/", "")}`;
    }

    return `${ApiUrl.IMAGE_BASE_URL}/${image}`;
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "completed";

      case "confirmed":
        return "confirmed";

      case "pending":
        return "pending";

      case "cancelled":
        return "cancelled";

      case "rejected":
        return "rejected";

      default:
        return "default";
    }
  };

  const patientCount = useMemo(() => patients.length, [patients]);
    return (
    <div className="dashboard-box recent-patients-box">
      <div className="dashboard-box-header">
        <div>
          <h5>
            <FaUsers className="me-2" />
            Recent Patients
          </h5>

          <small>
            {patientCount} Recent Patient{patientCount !== 1 ? "s" : ""}
          </small>
        </div>

        <button
          className="recent-patients-view-btn"
          onClick={() => navigate("/doctor/patients")}
        >
          View All
          <FaChevronRight />
        </button>
      </div>

      {loading ? (
        <div className="recent-patients-loading">
          Loading recent patients...
        </div>
      ) : patients.length === 0 ? (
        <div className="recent-patients-empty">
          No recent patients found.
        </div>
      ) : (
        <div className="recent-patients-list">
          {patients.map((patient) => (
            <div
              className="recent-patient-item"
              key={`${patient.id}-${patient.patient_id}`}
            >
              <div className="recent-patient-left">
                <img
                  src={getProfileImage(patient)}
                  alt={patient.patient_fullname}
                  className="recent-patient-avatar"
                  onError={(e) => {
                    e.target.src = doctorImage;
                  }}
                />

                <div className="recent-patient-details">
                  <h6>{patient.patient_fullname}</h6>

                  <small>
                    ID:{" "}
                    {patient.patient?.ehr_number ||
                      patient.patient_id}
                  </small>

                  <div className="recent-patient-date">
                    <FaCalendarAlt />

                    <span>{formatDate(patient.appointment_date)}</span>
                  </div>
                </div>
              </div>

              <div className="recent-patient-right">
                <span
                  className={`recent-status ${getStatusClass(
                    patient.status
                  )}`}
                >
                  {patient.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}