import { createContext, useContext, useEffect, useState } from "react";
import ApiUrl from "../constants/ApiUrl";

const DoctorAuthContext = createContext();

export function DoctorAuthProvider({ children }) {
  const [doctor, setDoctor] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [stats, setStats] = useState(null);
  const [notifications, setNotifications] = useState(null);

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("doctor_token");

  const authenticated = !!doctor;

  /**
   * Check doctor profile completion
   */
  const profileCompleted = doctor?.profile_updated === 1;

  /**
   * Fetch logged in doctor
   */
  const refreshDoctor = async () => {
    const authToken = localStorage.getItem("doctor_token");

    if (!authToken) {
      setDoctor(null);
      setWallet(null);
      setStats(null);
      setNotifications(null);
      setLoading(false);

      return;
    }

    try {
      const response = await fetch(ApiUrl.DOCTOR_ME, {
        headers: {
          Accept: "application/json",

          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unauthenticated");
      }

      const data = await response.json();

      console.log("DOCTOR_ME Response:", data);

      // Doctor profile
      setDoctor(data.doctor);

      // Dashboard data
      setWallet(data.wallet);

      setStats(data.stats);

      setNotifications(data.notifications);

      // Store doctor profile
      localStorage.setItem("doctor", JSON.stringify(data.doctor));
    } catch (error) {
      console.error("Doctor refresh error:", error);

      localStorage.removeItem("doctor");

      localStorage.removeItem("doctor_token");

      setDoctor(null);

      setWallet(null);

      setStats(null);

      setNotifications(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login
   */
  const login = async (token) => {
    localStorage.setItem("doctor_token", token);

    await refreshDoctor();
  };

  /**
   * Logout
   */
  const logout = async () => {
    const authToken = localStorage.getItem("doctor_token");

    try {
      if (authToken) {
        await fetch(ApiUrl.LOGOUT_DOCTOR, {
          method: "POST",

          headers: {
            Accept: "application/json",

            Authorization: `Bearer ${authToken}`,
          },
        });
      }
    } catch (error) {}

    localStorage.removeItem("doctor");

    localStorage.removeItem("doctor_token");

    setDoctor(null);

    setWallet(null);

    setStats(null);

    setNotifications(null);
  };

  useEffect(() => {
    refreshDoctor();
  }, []);

  return (
    <DoctorAuthContext.Provider
      value={{
        doctor,

        wallet,

        stats,

        notifications,

        token,

        setDoctor,

        authenticated,

        loading,

        login,

        logout,

        refreshDoctor,

        profileCompleted,
      }}
    >
      {children}
    </DoctorAuthContext.Provider>
  );
}

export function useDoctorAuth() {
  return useContext(DoctorAuthContext);
}
