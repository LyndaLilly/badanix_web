import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import { PatientAuthProvider } from "./contexts/PatientAuthContext";
import { DoctorAuthProvider } from "./contexts/DoctorAuthContext";
import { InstitutionAuthProvider } from "./contexts/InstitutionAuthContext";

function App() {
  return (
    <PatientAuthProvider>
      <DoctorAuthProvider>
        <InstitutionAuthProvider>
          <Router>
            <AppRouter />
          </Router>
        </InstitutionAuthProvider>
      </DoctorAuthProvider>
    </PatientAuthProvider>
  );
}

export default App;