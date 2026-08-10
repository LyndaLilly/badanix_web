import { useEffect, useState } from "react";
import {
  FaHistory,
  FaArrowRight,
  FaCalendarCheck,
  FaUserMd,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import ApiUrl from "../../../../constants/ApiUrl";
import "../../../../assets/css/appointmenthistory.css";
import { usePatientAuth } from "../../../../contexts/PatientAuthContext";

export default function AppointmentHistory() {
  const navigate = useNavigate();
  const { token } = usePatientAuth();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const loadAppointments = async () => {
    try {
      const response = await fetch(ApiUrl.GET_PATIENT_APPOINTMENTS, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        const history = (data.appointments || [])
          .sort((a, b) => {
            const first = new Date(
              `${b.appointment_date}T${b.start_time || "00:00:00"}`,
            );

            const second = new Date(
              `${a.appointment_date}T${a.start_time || "00:00:00"}`,
            );

            return first - second;
          })
          .slice(0, 5);

        setAppointments(history);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "status-completed";

      case "confirmed":
        return "status-confirmed";

      case "pending":
        return "status-pending";

      case "cancelled":
        return "status-cancelled";

      case "rejected":
        return "status-rejected";

      default:
        return "status-default";
    }
  };

  const getDoctorImage = (appointment) => {
    const image = appointment?.doctor?.profile?.profile_image;

    if (!image) return null;

    const cleanImage = image.replace(/^uploads\//, "");

    return `${ApiUrl.IMAGE_BASE_URL}/${cleanImage}`;
  };

  if (loading) {
    return (
      <div className="dashboard-box appointment-history-card">
        Loading appointment history...
      </div>
    );
  }

  return (
    <div className="dashboard-box appointment-history-card">
      <div className="box-title">
        <div className="history-title">
          <h5>APPOINTMENT HISTORY</h5>
          <FaHistory className="box-icon" />
        </div>

        <button
          className="history-see-more"
          onClick={() => navigate("/patient/appointments")}
        >
          See More
          <FaArrowRight />
        </button>
      </div>

      {appointments.length === 0 ? (
        <div className="history-content">
          <div className="history-icon-wrapper">
            <FaCalendarCheck />
          </div>

          <div className="history-text">
            <h4>No Previous Appointments</h4>
            <p>Completed and cancelled appointments will appear here.</p>
          </div>
        </div>
      ) : (
        <div className="patient-history-table-wrapper">
          <table className="patient-history-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => {
                const doctorImage = getDoctorImage(appointment);

                return (
                  <tr key={appointment.id}>
                    <td>
                      <div className="patient-history-doctor">
                        <div className="patient-history-avatar">
                          {doctorImage ? (
                            <img
                              src={doctorImage}
                              alt={appointment.doctor?.fullname}
                            />
                          ) : (
                            <FaUserMd />
                          )}
                        </div>

                        <span>{appointment.doctor?.fullname || "Doctor"}</span>
                      </div>
                    </td>

                    <td>
                      {appointment.doctor?.specialization?.name ||
                        appointment.doctor?.specialization ||
                        "General Practitioner"}
                    </td>

                    <td>{formatDate(appointment.appointment_date)}</td>

                    <td>
                      <span
                        className={`patient-status ${getStatusClass(
                          appointment.status,
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

  
    </div>
  );
}
