import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useDoctorAuth } from "../contexts/DoctorAuthContext";
import { usePatientAuth } from "../contexts/PatientAuthContext";
import { useInstitutionAuth } from "../contexts/InstitutionAuthContext";
import ApiUrl from "../constants/ApiUrl";

const NotificationBell = () => {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token: doctorToken } = useDoctorAuth();
  const { token: patientToken } = usePatientAuth();
  const { token: institutionToken } = useInstitutionAuth();

  // Get whichever user is logged in
  const token =
    doctorToken ||
    patientToken ||
    institutionToken;

  useEffect(() => {
    if (!token) return;

    getUnreadCount();
  }, [token]);

  const getUnreadCount = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        ApiUrl.GET_UNREAD_NOTIFICATION_COUNT,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        console.log("Unauthenticated");
        return;
      }

      const data = await response.json();

      if (data.success) {
        setCount(data.count);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        cursor: "pointer",
      }}
    >
      <FaBell
        size={24}
        onClick={() => setOpen(!open)}
      />

      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            background: "#e63946",
            color: "#fff",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            fontSize: "11px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "600",
          }}
        >
          {count > 99 ? "99+" : count}
        </span>
      )}

     
    </div>
  );
};

export default NotificationBell;