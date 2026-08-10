import { createContext, useContext, useEffect, useState } from "react";
import ApiUrl from "../constants/ApiUrl";

const PatientAuthContext = createContext();

export function PatientAuthProvider({ children }) {
  const [patient, setPatient] = useState(null);

  const [wallet, setWallet] = useState(null);

  const [stats, setStats] = useState(null);

  const [notifications, setNotifications] = useState(null);

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("patient_token");

  const authenticated = !!patient;

  /**
   * Check patient profile completion
   */
  const profileCompleted = patient?.profile_updated === 1;

  /**
   * Fetch logged in patient
   */
  const refreshPatient = async () => {
    const authToken = localStorage.getItem("patient_token");

    if (!authToken) {
      setPatient(null);

      setWallet(null);

      setStats(null);

      setNotifications(null);

      setLoading(false);

      return;
    }

    try {
      const response = await fetch(ApiUrl.PATIENT_ME, {
        headers: {
          Accept: "application/json",

          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unauthenticated");
      }

      const data = await response.json();

      console.log("PATIENT_ME Response:", data);

      /**
       * Patient profile
       */
   const patientData = {
  ...data.patient,
  profile: data.patient.profile,
};

      setPatient(patientData);

      /**
       * Dashboard data
       */
      setWallet(data.wallet);

      setStats(data.stats);

      setNotifications(data.notifications);

      localStorage.setItem("patient", JSON.stringify(patientData));
    } catch (error) {
      console.error("Patient refresh error:", error);

      localStorage.removeItem("patient");

      localStorage.removeItem("patient_token");

      setPatient(null);

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
    localStorage.setItem("patient_token", token);

    await refreshPatient();
  };

  /**
   * Logout
   */
  const logout = async () => {
    const authToken = localStorage.getItem("patient_token");

    try {
      if (authToken) {
        await fetch(ApiUrl.LOGOUT_PATIENT, {
          method: "POST",

          headers: {
            Accept: "application/json",

            Authorization: `Bearer ${authToken}`,
          },
        });
      }
    } catch (error) {}

    localStorage.removeItem("patient");

    localStorage.removeItem("patient_token");

    setPatient(null);

    setWallet(null);

    setStats(null);

    setNotifications(null);
  };

  useEffect(() => {
    refreshPatient();
  }, []);

  return (
    <PatientAuthContext.Provider
      value={{
        patient,

        wallet,

        stats,

        notifications,

        token,

        setPatient,

        authenticated,

        loading,

        login,

        logout,

        refreshPatient,

        profileCompleted,
      }}
    >
      {children}
    </PatientAuthContext.Provider>
  );
}

export function usePatientAuth() {
  return useContext(PatientAuthContext);
}
