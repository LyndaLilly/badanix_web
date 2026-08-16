// src/constants/ApiUrl.js

// const BASE_URL = "http://127.0.0.1:8000/api";
// const IMAGE_BASE_URL = "http://127.0.0.1:8000/uploads";

const BASE_URL = "https://badanixapi.com/api";
const IMAGE_BASE_URL = "https://badanixapi.com/public/uploads";

const ApiUrl = {
  BASE_URL,
  IMAGE_BASE_URL,

  // ==========================
  // Authentication - Patients
  // ==========================
  REGISTER_PATIENT: `${BASE_URL}/patients/register`,
  LOGIN_PATIENT: `${BASE_URL}/patients/login`,
  LOGOUT_PATIENT: `${BASE_URL}/patients/logout`,
  VERIFY_EMAIL_PATIENT: `${BASE_URL}/patients/verify-email`,
  RESEND_VERIFICATION_PATIENT: `${BASE_URL}/patients/resend-verification`,
  FORGOT_PASSWORD_PATIENT: `${BASE_URL}/patients/forgot-password`,
  VERIFY_PASSWORD_CODE_PATIENT: `${BASE_URL}/patients/verify-password-code`,
  RESEND_PASSWORD_CODE_PATIENT: `${BASE_URL}/patients/resend-password-code`,
  RESET_PASSWORD_PATIENT: `${BASE_URL}/patients/reset-password`,
  CHANGE_PASSWORD_PATIENT: `${BASE_URL}/patients/change-password`,
  PATIENT_ME: `${BASE_URL}/patients/me`,
  CREATE_PATIENT_PROFILE: `${BASE_URL}/patients/profile`,
  UPDATE_PATIENT_PROFILE: `${BASE_URL}/patients/profile/update`,
  GET_PATIENT_PROFILE: `${BASE_URL}/patients/profile`,
  INITIALIZE_PAYMENT: `${BASE_URL}/patients/payments/initialize`,
  VERIFY_PAYMENT: `${BASE_URL}/patients/payments/verify`,
  GET_WALLET: `${BASE_URL}/patients/wallet`,
  GET_WALLET_TRANSACTIONS: `${BASE_URL}/patients/wallet/transactions`,
  BOOK_APPOINTMENT: `${BASE_URL}/patients/appointments/book`,
  GET_BOOKING_AMOUNT: `${BASE_URL}/patients/appointments/booking-amount`,
  GET_PATIENT_APPOINTMENTS: `${BASE_URL}/patients/appointments`,
  CANCEL_APPOINTMENT: `${BASE_URL}/patients/appointments`,
  RATE_DOCTOR: `${BASE_URL}/patients/rate-doctor`,

  GET_DIAMOND_STATUS: `${BASE_URL}/patients/diamond/status`,
  COLLECT_DIAMOND: `${BASE_URL}/patients/diamond/collect`,
  GET_DIAMOND_HISTORY: `${BASE_URL}/patients/diamond/history`,

  GET_ALL_DOCTORS: `${BASE_URL}/doctors`,
  GET_VERIFIED_DOCTORS: `${BASE_URL}/doctors/verified`,
  GET_TOP_RATED_DOCTORS: `${BASE_URL}/doctors/top-rated`,

  // ==========================
  // Authentication - Doctors
  // ==========================

  REGISTER_DOCTOR: `${BASE_URL}/doctors/register`,
  LOGIN_DOCTOR: `${BASE_URL}/doctors/login`,
  LOGOUT_DOCTOR: `${BASE_URL}/doctors/logout`,
  VERIFY_EMAIL_DOCTOR: `${BASE_URL}/doctors/verify-email`,
  RESEND_VERIFICATION_DOCTOR: `${BASE_URL}/doctors/resend-verification`,
  FORGOT_PASSWORD_DOCTOR: `${BASE_URL}/doctors/forgot-password`,
  VERIFY_PASSWORD_CODE_DOCTOR: `${BASE_URL}/doctors/verify-password-code`,
  RESEND_PASSWORD_CODE_DOCTOR: `${BASE_URL}/doctors/resend-password-code`,
  RESET_PASSWORD_DOCTOR: `${BASE_URL}/doctors/reset-password`,
  CHANGE_PASSWORD_DOCTOR: `${BASE_URL}/doctors/change-password`,
  DOCTOR_ME: `${BASE_URL}/doctors/me`,
  CREATE_DOCTOR_PROFILE: `${BASE_URL}/doctors/profile`,
  UPDATE_DOCTOR_PROFILE: `${BASE_URL}/doctors/profile/update`,
  GET_DOCTOR_PROFILE: `${BASE_URL}/doctors/profile`,
  CREATE_DOCTOR_AVAILABILITY: `${BASE_URL}/doctors/availability`,
  GET_DOCTOR_AVAILABILITY: `${BASE_URL}/doctors/availability`,
  DELETE_DOCTOR_AVAILABILITY: `${BASE_URL}/doctors/availability`,
  GET_DOCTOR_APPOINTMENTS: `${BASE_URL}/doctor/appointments`,
  CONFIRM_DOCTOR_APPOINTMENT: `${BASE_URL}/doctor/appointments`,
  REJECT_DOCTOR_APPOINTMENT: `${BASE_URL}/doctor/appointments`,
  GET_DOCTOR_PATIENTS: `${BASE_URL}/doctor/patients`,
  GET_MEDICAL_RECORD: `${BASE_URL}/doctor/appointments`,
  CREATE_MEDICAL_RECORD: `${BASE_URL}/doctor/appointments`,
  SEARCH_PATIENT_EHR: `${BASE_URL}/doctor/ehr`,
  // Doctor Wallet
  DOCTOR_WALLET: `${BASE_URL}/doctors/wallet`,
  DOCTOR_WALLET_TRANSACTIONS: `${BASE_URL}/doctors/wallet/transactions`,
  DOCTOR_WITHDRAW: `${BASE_URL}/doctors/wallet/withdraw`,
  DOCTOR_WITHDRAWALS: `${BASE_URL}/doctors/wallet/withdrawals`,

  // ==========================
  // Authentication - Institutions
  // ==========================
  REGISTER_INSTITUTION: `${BASE_URL}/institutions/register`,
  LOGIN_INSTITUTION: `${BASE_URL}/institutions/login`,
  LOGOUT_INSTITUTION: `${BASE_URL}/institutions/logout`,
  VERIFY_EMAIL_INSTITUTION: `${BASE_URL}/institutions/verify-email`,
  RESEND_VERIFICATION_INSTITUTION: `${BASE_URL}/institutions/resend-verification`,
  FORGOT_PASSWORD_INSTITUTION: `${BASE_URL}/institutions/forgot-password`,
  VERIFY_PASSWORD_CODE_INSTITUTION: `${BASE_URL}/institutions/verify-password-code`,
  RESEND_PASSWORD_CODE_INSTITUTION: `${BASE_URL}/institutions/resend-password-code`,
  RESET_PASSWORD_INSTITUTION: `${BASE_URL}/institutions/reset-password`,
  CHANGE_PASSWORD_INSTITUTION: `${BASE_URL}/institutions/change-password`,
  INSTITUTION_ME: `${BASE_URL}/institutions/me`,
  CREATE_INSTITUTION_PROFILE: `${BASE_URL}/institutions/profile`,
  UPDATE_INSTITUTION_PROFILE: `${BASE_URL}/institutions/profile/update`,
  GET_INSTITUTION_PROFILE: `${BASE_URL}/institutions/profile`,
  GET_INSTITUTIONS: `${BASE_URL}/institutions`,
  SEARCH_PHARMACY_PRESCRIPTION: `${BASE_URL}/institutions/pharmacy/prescriptions`,

  DISPENSE_PHARMACY_PRESCRIPTION: `${BASE_URL}/institutions/pharmacy/prescriptions`,

  GET_DISPENSED_PHARMACY_MEDICATIONS: `${BASE_URL}/pharmacy/dispensed-medications`,

  // Laboratory Orders
  SEARCH_LAB_ORDERS: `${BASE_URL}/institutions/laboratory/orders`,

  PROCESS_LAB_TEST: `${BASE_URL}/institutions/laboratory/orders`,

  SEARCH_HOSPITAL_EHR: `${BASE_URL}/hospital/ehr`,

  GET_PROCESSED_LAB_PATIENTS:
  `${BASE_URL}/institution/laboratory/processed-patients`,

  // ==========================
  // Hospital Documents
  // ==========================
  UPLOAD_HOSPITAL_DOCUMENTS: `${BASE_URL}/institutions/hospital-documents/upload`,
  GET_HOSPITAL_DOCUMENTS: `${BASE_URL}/institutions/hospital-documents`,
  DELETE_HOSPITAL_DOCUMENT: `${BASE_URL}/institutions/hospital-documents`,

  // ==========================
  // Laboratory Documents
  // ==========================
  UPLOAD_LABORATORY_DOCUMENTS: `${BASE_URL}/institutions/laboratory-documents/upload`,
  GET_LABORATORY_DOCUMENTS: `${BASE_URL}/institutions/laboratory-documents`,
  DELETE_LABORATORY_DOCUMENT: `${BASE_URL}/institutions/laboratory-documents`,

  // ==========================
  // Pharmacy Documents
  // ==========================
  UPLOAD_PHARMACY_DOCUMENTS: `${BASE_URL}/institutions/pharmacy-documents/upload`,
  GET_PHARMACY_DOCUMENTS: `${BASE_URL}/institutions/pharmacy-documents`,
  DELETE_PHARMACY_DOCUMENT: `${BASE_URL}/institutions/pharmacy-documents`,

  // ==========================
  // Doctor Documents
  // ==========================
  UPLOAD_DOCTOR_DOCUMENTS: `${BASE_URL}/doctors/doctor-documents/upload`,
  GET_DOCTOR_DOCUMENTS: `${BASE_URL}/doctors/doctor-documents`,
  DELETE_DOCTOR_DOCUMENT: `${BASE_URL}/doctors/doctor-documents`,

  // ==========================
  // Notifications
  // ==========================
  GET_NOTIFICATIONS: `${BASE_URL}/notifications`,
  GET_UNREAD_NOTIFICATION_COUNT: `${BASE_URL}/notifications/unread-count`,
  MARK_NOTIFICATION_AS_READ: `${BASE_URL}/notifications`,
  MARK_ALL_NOTIFICATIONS_AS_READ: `${BASE_URL}/notifications/read-all`,

  GET_DOCTOR_SPECIALIZATIONS: `${BASE_URL}/doctor-specializations`,
  GET_DOCTORS_BY_SPECIALIZATION: `${BASE_URL}/doctor-specializations`,

  CREATE_VIDEO_CALL: `${BASE_URL}/video-call/create`,
  AGORA_TOKEN: `${BASE_URL}/video-call/token`,
  START_VIDEO_CALL: `${BASE_URL}/video-call/start`,
  LEAVE_VIDEO_CALL: `${BASE_URL}/video-call/leave`,
  END_VIDEO_CALL: `${BASE_URL}/video-call`,
  GET_VIDEO_CALL: `${BASE_URL}/video-call`,
};

export default ApiUrl;
