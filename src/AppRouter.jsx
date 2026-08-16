import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import DoctorLayout from "./layouts/DoctorLayout";
import PatientLayout from "./layouts/PatientLayout";
import PharmacyLayout from "./layouts/PharmacyLayout";
import HospitalLayout from "./layouts/HospitalLayout";
import LaboratoryLayout from "./layouts/LaboratoryLayout";
import UniversalLogin from "./view/guests/pages/auth/UniversalLogin"
import UniversalRegister from "./view/guests/pages/auth/UniversalRegister"

import {
  Home,
  About,
  Services,
  Testimonial,
  Contacts,
  Partner,
  PrivacyPolicy,
  TermsOfService,
  Cookies,
} from "./view/guests/pages";

import {
  PatientRegister,
  PatientLogin,
  PatientVerifyEmail,
  PatientForgotPassword,
  PatientResetPassword,
  PatientVerifyResetCode,
  PatientChangePassword,
} from "./view/guests/patients/auth";

import {
  DoctorRegister,
  DoctorLogin,
  DoctorVerifyEmail,
  DoctorForgotPassword,
  DoctorResetPassword,
  DoctorVerifyResetCode,
  DoctorChangePassword,
} from "./view/guests/doctors/auth";

import {
  InstitutionRegister,
  InstitutionLogin,
  InstitutionVerifyEmail,
  InstitutionForgotPassword,
  InstitutionResetPassword,
  InstitutionVerifyResetCode,
  InstitutionChangePassword,
} from "./view/guests/institutions/auth";

import {
  PatientDashboard,
  PatientProfileFill,
  PatientProfileUpdate,
  PatientNotification,
  PatientWallet,
  PatientTransaction,
  DoctorCategories,
  DoctorList,
  DoctorDetails,
  BookAppointment,
  PatientAppointments,
  Hospitals,
  Laboratories,
  Pharmacies,
  PatientVideoConsultation,
  PatientSettings,
  DoctorRating,
  Doctors,
  PatientDiamondCollection,
} from "./view/guests/patients/loggedin";

import {
  DoctorDashboard,
  DoctorProfileFill,
  DoctorProfileUpdate,
  DoctorDocumentUpload,
  DoctorCalendar,
  DoctorAppointments,
  Patients,
  PatientNotes,
  PatientEHRSearch,
  DoctorVideoConsultation,
  DoctorWallet,
  DoctorWalletTransactions,
  DoctorSettings,
  DoctorHistory,
} from "./view/guests/doctors/loggedin";

import {
  HospitalDashboard,
  HospitalDocumentUpload,
  UpdateHospitalProfile,
  HospitalSettings,
  HospitalChangePassword,
  HospitalPatientEhr,
} from "./view/guests/institutions/loggedin/hospital";

import {
  PharmacyDashboard,
  PharmacyDocumentUpload,
  UpdatePharmacyProfile,
  PharmacySettings,
  PharmacyChangePassword,
  PharmacyOrders,
  PharmacyPatients,
} from "./view/guests/institutions/loggedin/pharmacy";

import {
  LaboratoryDashboard,
  LaboratoryDocumentUpload,
  UpdateLaboratoryProfile,
  LaboratorySettings,
  LaboratoryChangePassword,
  LaboratoryOrders,
  LaboratoryPatients,
} from "./view/guests/institutions/loggedin/laboratory";

import {
  InstitutionProfileFill,
  InstitutionProfileUpdate,
} from "./view/guests/institutions/loggedin";

import PatientProtectedRoute from "./components/PatientProtectedRoute";
import DoctorProtectedRoute from "./components/DoctorProtectedRoute";
import InstitutionProtectedRoute from "./components/InstitutionProtectedRoute";

function AppRouter() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const siteTitle = "Badanix Health Services";

    const pageTitleMap = {
      "/": "Home",
      "/about": "About",
      "/services": "Services",
      "/testimonial": "Testimonial",
      "/contacts": "Contacts",
      "/partner": "Partner",
      "/universallogin": "Universal Login",
      "/universalregister": "Universal Register",
      "/privacypolicy": "Privacy Policy",
      "/terms": "Terms & Conditions",
      "/cookies": "Cookies Policy",

      //Patients
      "/patient/register": "Register",
      "/patient/verifyemail": "Verify Email",
      "/patient/login": "Login",
      "/patient/forgotpassword": "Forgot Password",
      "/patient/verify-reset-code": "Verify Reset Code",
      "/patient/resetpassword": "Reset Password",
      "/patient/changepassword": "Change Password",
      "/patient/dashboard": "Dashboard",
      "/patient/profilefill": "Profile Fill",
      "/patient/profileupdate": "Profile Update",
      "/patient/notifications": "Notifications",
      "/patient/wallet": "Wallet",
      "/patient/transactions": "Transaction History",
      "/patient/doctorcategories": "Doctor Categories",
      "/patient/doctorlist": "Doctor List",
      "/patient/doctordetails": "Doctor Details",
      "/patient/bookappointment": "Book Appointment",
      "/patient/appointments": "Appointments",
      "/patient/hospitals": "Hospitals",
      "patient/laboratories": "Laboratories",
      "/patient/pharmacies": "Pharmacies",
      "/patient/videocall": "Video Consultation",
      "/patient/settings": "Settings",
      "patient/ratedoctor": "Rate Doctor",
      "/patient/doctors": "Doctors",
      "/patient/diamondcollection": "Diamond Collection",

      //doctors
      "/doctor/register": "Register",
      "/doctor/verifyemail": "Verify Email",
      "/doctor/login": "Login",
      "/doctor/forgotpassword": "Forgot Password",
      "/doctor/verify-reset-code": "Verify Reset Code",
      "/doctor/resetpassword": "Reset Password",
      "/doctor/changepassword": "Change Password",
      "/doctor/dashboard": "Dashboard",
      "/doctor/profilefill": "Profile Fill",
      "/doctor/profileupdate": "Profile Update",
      "/doctor/documentupload": "Document Upload",
      "/doctor/calendar": "Calendar",
      "/doctor/appointments": "Appointments",
      "/doctor/patients": "Patients",
      "/doctor/patientnotes": "Patient Notes",
      "doctor/patientehr": "Patient EHR",
      "/doctor/videocall": "Video Consultation",
      "/doctor/wallet": "Wallet",
      "/doctor/transactions": "Transaction History",
      "/doctor/settings": "Settings",
      "/doctor/history": "Withdrawal History",


      //institutions
      "/institution/register": "Register",
      "/institution/verifyemail": "Verify Email",
      "/institution/login": "Login",
      "/institution/forgotpassword": "Forgot Password",
      "/institution/verify-reset-code": "Verify Reset Code",
      "/institution/resetpassword": "Reset Password",
      "/institution/changepassword": "Change Password",
      "/institution/profilefill": "Profile Fill",

      "/hospital/dashboard": "Hospital Dashboard",
      "/hospital/documentupload": "Hospital Document Upload",
      "/hospital/profileupdate": "Hospital Profile Update",
      "/hospital/settings": "Hospital Settings",
      "/hospital/changepassword": "Hospital Change Password",
      "/hospital/patientehr": "Hospital Patient EHR",
      
      "/laboratory/dashboard": "Laboratory Dashboard",
      "/laboratory/documentupload": "Laboratory Document Upload",
      "/laboratory/profileupdate": "Laboratory Profile Update",
      "/laboratory/settings": "Laboratory Settings",
      "/laboratory/changepassword": "Laboratory Change Password",
      "/laboratory/orders": "Laboratory Orders",
      "/laboratory/patients": "Laboratory Patients",

      "/pharmacy/dashboard": "Pharmacy Dashboard",
      "/pharmacy/documentupload": "Pharmacy Document Upload",
      "/pharmacy/profileupdate": "Pharmacy Profile Update",
      "/pharmacy/settings": "Pharmacy Settings",
      "/pharmacy/changepassword": "Pharmacy Change Password",
      "/pharmacy/orders": "Pharmacy Orders",
      "/pharmacy/patients": "Pharmacy Patients",

    };

    const pageTitle = pageTitleMap[path] || "Page";
    document.title = `${pageTitle} | ${siteTitle}`;
  }, [location.pathname]);

  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/universallogin" element={<UniversalLogin />} />
        <Route path="/universalregister" element={<UniversalRegister />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<Cookies />} />
      </Route>

      <Route path="/patient/register" element={<PatientRegister />} />
      <Route path="/patient/verifyemail" element={<PatientVerifyEmail />} />
      <Route path="/patient/login" element={<PatientLogin />} />
      <Route path="/patient/forgotpassword" element={<PatientForgotPassword />} />
      <Route path="/patient/verify-reset-code" element={<PatientVerifyResetCode />} />  
      <Route path="/patient/resetpassword" element={<PatientResetPassword />} />

      <Route element={<PatientLayout />}>
        <Route element={<PatientProtectedRoute />}>
          <Route path="/patient/changepassword" element={<PatientChangePassword />} />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/profilefill" element={<PatientProfileFill />} />
          <Route path="/patient/profileupdate" element={<PatientProfileUpdate />}/>
          <Route path="/patient/notifications" element={<PatientNotification />}/>
          <Route path="/patient/wallet" element={<PatientWallet />} />
          <Route path="/patient/transactions" element={<PatientTransaction />} />
          <Route path="/patient/doctorcategories" element={<DoctorCategories />} />
          <Route path="/patient/doctorlist" element={<DoctorList />} />
          <Route path="/patient/doctordetails" element={<DoctorDetails />} />
          <Route path="/patient/bookappointment" element={<BookAppointment />} />
          <Route path="/patient/appointments" element={<PatientAppointments />} />
          <Route path="/patient/hospitals" element={<Hospitals />} />
          <Route path="/patient/laboratories" element={<Laboratories />} />
          <Route path="/patient/pharmacies" element={<Pharmacies />} />
          <Route path="/patient/videocall/:appointmentId" element={<PatientVideoConsultation />} />
          <Route path="/patient/settings" element={<PatientSettings />} />
          <Route path="/patient/ratedoctor/:appointmentId" element={<DoctorRating />} />
          <Route path="/patient/doctors" element={<Doctors />} />
          <Route path="/patient/diamondcollection" element={<PatientDiamondCollection />} />

        </Route>
      </Route>

      {/* doctors auth */}

      <Route path="/doctor/register" element={<DoctorRegister />} />
      <Route path="/doctor/verifyemail" element={<DoctorVerifyEmail />} />
      <Route path="/doctor/login" element={<DoctorLogin />} />
      <Route path="/doctor/forgotpassword" element={<DoctorForgotPassword />} />
      <Route path="/doctor/verify-reset-code" element={<DoctorVerifyResetCode />} />
      <Route path="/doctor/resetpassword" element={<DoctorResetPassword />} />

      {/* protected routes doctors */}
      <Route element={<DoctorLayout />}>
        <Route element={<DoctorProtectedRoute />}>
          <Route path="/doctor/changepassword" element={<DoctorChangePassword />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor/profilefill" element={<DoctorProfileFill />} />
          <Route path="/doctor/profileupdate" element={<DoctorProfileUpdate />}/>
          <Route path="/doctor/calendar" element={<DoctorCalendar />} />
          <Route path="/doctor/documentupload" element={<DoctorDocumentUpload />}/>
          <Route path="/doctor/appointments" element={<DoctorAppointments />} />
          <Route path="/doctor/patients" element={<Patients />} />
          <Route path="/doctor/patientnotes/:appointmentId" element={<PatientNotes />}/>
          <Route path="/doctor/patientehr" element={<PatientEHRSearch />}/>
          <Route path="/doctor/videocall/:appointmentId" element={<DoctorVideoConsultation />} />
          <Route path="/doctor/wallet" element={<DoctorWallet />} />
          <Route path="/doctor/transactions" element={<DoctorWalletTransactions />} />
          <Route path="/doctor/settings" element={<DoctorSettings />} />
          <Route path="/doctor/history" element={<DoctorHistory />} />
        </Route>
      </Route>

      {/* institutions auth */}
      <Route path="/institution/register" element={<InstitutionRegister />} />
      <Route path="/institution/verifyemail" element={<InstitutionVerifyEmail />}/>
      <Route path="/institution/login" element={<InstitutionLogin />} />
      <Route path="/institution/forgotpassword" element={<InstitutionForgotPassword />}/>
      <Route path="/institution/verify-reset-code" element={<InstitutionVerifyResetCode />}/>
      <Route path="/institution/resetpassword" element={<InstitutionResetPassword />}/>
      

      {/* PROTECTED INSTITUTION ROUTES  */}
      
      {/*PHARMACY ROUTES*/}
      
    <Route element={ <InstitutionProtectedRoute allowedType="pharmacy"/>}>
      <Route element={<PharmacyLayout />}>
        <Route path="/pharmacy/dashboard" element={<PharmacyDashboard />}/>
        <Route path="/pharmacy/documentupload" element={<PharmacyDocumentUpload />} />
        <Route path="/pharmacy/profileupdate" element={<UpdatePharmacyProfile />} />
        <Route path="/pharmacy/settings" element={<PharmacySettings />} />
        <Route path="/pharmacy/changepassword" element={<PharmacyChangePassword />}/>
        <Route path="/pharmacy/orders" element={<PharmacyOrders />}/>
        <Route path="/pharmacy/patients" element={<PharmacyPatients />}/>
      </Route>
    </Route>


    {/* HOSPITAL ROUTES */}
    <Route element={<InstitutionProtectedRoute allowedType="hospital" />}>
      <Route element={<HospitalLayout />}>
        <Route path="/hospital/dashboard" element={<HospitalDashboard />}/>
        <Route path="/hospital/documentupload" element={<HospitalDocumentUpload />}/>
        <Route path="/hospital/profileupdate" element={<UpdateHospitalProfile />} />
        <Route path="/hospital/settings" element={<HospitalSettings />} />
        <Route path="/hospital/changepassword" element={<HospitalChangePassword />}/>
        <Route path="/hospital/patientehr" element={<HospitalPatientEhr />}/>
      </Route>
    </Route>


    {/* LABORATORY ROUTES */}
    <Route element={ <InstitutionProtectedRoute allowedType="laboratory" />}>
      <Route element={<LaboratoryLayout />}>
        <Route path="/laboratory/dashboard" element={<LaboratoryDashboard />}/>
        <Route path="/laboratory/documentupload" element={<LaboratoryDocumentUpload />}/>
        <Route path="/laboratory/profileupdate" element={<UpdateLaboratoryProfile />} />
        <Route path="/laboratory/settings" element={<LaboratorySettings />} />
        <Route path="/laboratory/changepassword" element={<LaboratoryChangePassword />}/>
        <Route path="/laboratory/orders" element={<LaboratoryOrders />}/>
        <Route path="/laboratory/patients" element={<LaboratoryPatients />}/>
      </Route>

    </Route>


    {/* SHARED INSTITUTION ROUTES These are available to hospital, pharmacy and laboratory.*/}
    <Route element={<InstitutionProtectedRoute />}>
      <Route path="/institution/changepassword" element={<InstitutionChangePassword />}/>
      <Route path="/institution/profilefill" element={<InstitutionProfileFill />}/>
      <Route path="/institution/profileupdate" element={<InstitutionProfileUpdate />} />
    </Route>



      {/* 
      <Route path="*" element={<PageNotFound />} /> */}
    </Routes>
  );
}

export default AppRouter;
