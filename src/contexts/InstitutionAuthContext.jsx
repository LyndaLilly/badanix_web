import { createContext, useContext, useEffect, useState } from "react";

import ApiUrl from "../constants/ApiUrl";

const InstitutionAuthContext = createContext();

export function InstitutionAuthProvider({ children }) {
  const [institution, setInstitution] = useState(() => {
    const saved = localStorage.getItem("institution");

    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("institution_token");
  });

  const [loading, setLoading] = useState(true);

  const authenticated = !!institution;

  /**
   * Check institution profile completion
   */
  const profileCompleted = !!institution?.profile;

  /**
   * Fetch logged in institution
   */
  const refreshInstitution = async () => {
    const authToken = localStorage.getItem("institution_token");

    if (!authToken) {
      setInstitution(null);

      setLoading(false);

      return;
    }

    try {
      const response = await fetch(ApiUrl.INSTITUTION_ME, {
        headers: {
          Accept: "application/json",

          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unauthenticated");
      }

      const data = await response.json();

      console.log("INSTITUTION_ME Response:", data);

      const institutionData = {
        ...data.institution,

        profile: data.institution.profile,
      };

      setInstitution(institutionData);

      localStorage.setItem("institution", JSON.stringify(institutionData));
    } catch (error) {
      console.error("Institution refresh error:", error);

      localStorage.removeItem("institution");

      localStorage.removeItem("institution_token");

      setInstitution(null);

      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login
   */
  const login = async (newToken, institutionData = null) => {
    localStorage.setItem("institution_token", newToken);

    setToken(newToken);

    if (institutionData) {
      setInstitution(institutionData);

      localStorage.setItem("institution", JSON.stringify(institutionData));
    }

    await refreshInstitution();
  };

  /**
   * Logout
   */
  const logout = async () => {
    const authToken = localStorage.getItem("institution_token");

    try {
      if (authToken) {
        await fetch(ApiUrl.LOGOUT_INSTITUTION, {
          method: "POST",

          headers: {
            Accept: "application/json",

            Authorization: `Bearer ${authToken}`,
          },
        });
      }
    } catch (error) {}

    localStorage.removeItem("institution");

    localStorage.removeItem("institution_token");

    setInstitution(null);

    setToken(null);
  };

  useEffect(() => {
    refreshInstitution();
  }, []);

  return (
    <InstitutionAuthContext.Provider
      value={{
        institution,

        token,

        setInstitution,

        authenticated,

        loading,

        login,

        logout,

        refreshInstitution,

        profileCompleted,
      }}
    >
      {children}
    </InstitutionAuthContext.Provider>
  );
}

export function useInstitutionAuth() {
  return useContext(InstitutionAuthContext);
}
