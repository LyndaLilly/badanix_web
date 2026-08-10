import { useEffect, useState } from "react";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";
import ApiUrl from "../../../../constants/ApiUrl";
import { useNavigate } from "react-router-dom";

import { FaCalendarAlt, FaUserClock } from "react-icons/fa";

import PatientImage from "../../../../assets/icons/patient.png";

export default function AppointmentRequests() {
  const { token } = useDoctorAuth();

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loadPendingAppointments = async () => {
    try {
      const response = await fetch(ApiUrl.GET_DOCTOR_APPOINTMENTS, {
        headers: {
          Authorization: `Bearer ${token}`,

          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        const pending = (data.appointments || []).filter(
          (appointment) => appointment.status === "pending",
        );

        setAppointments(pending);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPendingAppointments();

    const interval = setInterval(() => {
      loadPendingAppointments();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard-box appointment-request-box">
      <div className="box-title">
        <div>
          <h5>APPOINTMENT REQUESTS</h5>

          <small>
            {appointments.length} Pending Request
            {appointments.length !== 1 ? "s" : ""}
          </small>
        </div>

        <button
          className="request-see-all"
          onClick={() => navigate("/doctor/appointments")}
        >
          See All
        </button>
      </div>

      {loading ? (
        <div className="empty-request">Loading requests...</div>
      ) : appointments.length === 0 ? (
        <div className="empty-request">
          <FaUserClock />

          <p>No Appointment Requests</p>
        </div>
      ) : (
        <div className="request-list">
          {appointments.slice(0, 5).map((appointment) => (
            <div key={appointment.id} className="request-card">
              <div className="request-header">
                <img
                  src={
                    appointment.patient?.profile?.profile_image
                      ? `${ApiUrl.IMAGE_BASE_URL}/${appointment.patient.profile.profile_image.replace(/^uploads\//, "")}`
                      : PatientImage
                  }
                  alt={appointment.patient_fullname}
                  className="patient-avatar"
                />

                <div className="patient-info">
                  <h6>{appointment.patient_fullname}</h6>

                  <span>
                    {appointment.patient_age
                      ? `${appointment.patient_age} years old`
                      : "Patient"}
                  </span>
                </div>

                <span className="pending-badge">Pending</span>
              </div>

              <div className="request-footer">
                <div>
                  <FaCalendarAlt />

                  <span>{formatDate(appointment.appointment_date)}</span>
                </div>

                <p>{appointment.purpose || "Consultation"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
