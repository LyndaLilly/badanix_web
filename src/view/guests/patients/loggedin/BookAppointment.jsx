import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../../../../assets/css/bookappointment.css";

import ApiUrl from "../../../../constants/ApiUrl";
import { usePatientAuth } from "../../../../contexts/PatientAuthContext";

function AppointmentCalendar({
  availabilities,
  selectedDate,
  onSelect,
  onClose,
}) {
  const availableDates =
    availabilities?.map((item) => item.available_date.split("T")[0]) || [];
    console.log("Available dates from API:", availableDates);

const availableMonths = [
  ...new Set(
    availableDates.map((date) => {
      const [year, month] = date.split("-").map(Number);
      return `${year}-${month - 1}`;
    }),
  ),
];

const [currentMonth, setCurrentMonth] = useState(() => {
  if (!availableDates.length) return new Date();

  const [year, month] = availableDates[0].split("-").map(Number);

  return new Date(year, month - 1, 1);
});

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const previousMonth = () => {
    const key = `${year}-${month}`;
    const index = availableMonths.indexOf(key);

    if (index > 0) {
      const [y, m] = availableMonths[index - 1].split("-").map(Number);
      setCurrentMonth(new Date(y, m));
    }
  };

  const nextMonth = () => {
    const key = `${year}-${month}`;
    const index = availableMonths.indexOf(key);

    if (index < availableMonths.length - 1) {
      const [y, m] = availableMonths[index + 1].split("-").map(Number);
      setCurrentMonth(new Date(y, m));
    }
  };

  return (
    <div className="calendar-modal">
      <div className="calendar-card">
        <div className="calendar-header">
          <button onClick={previousMonth}>←</button>

          <h3>
            {currentMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>

          <button onClick={nextMonth}>→</button>
        </div>

        <div className="calendar-week">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div className="calendar-grid">
          {calendarDays.map((day, index) => {
            if (!day) {
              return <div key={index}></div>;
            }

            const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

           const [y, m, d] = date.split("-").map(Number);
const currentDate = new Date(y, m - 1, d);
currentDate.setHours(0, 0, 0, 0);
            const isPast = currentDate < today;

            const available = availableDates.includes(date) && !isPast;

            const selected = selectedDate === date;

            return (
              <div
                key={date}
                className={`calendar-day
    ${available ? "available" : "unavailable"}
    ${selected ? "selected" : ""}
  `}
                onClick={() => {
                  if (!available) return;

                  onSelect(date);
                  onClose();
                }}
              >
                {day}
              </div>
            );
          })}
        </div>

        <button className="calendar-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default function BookAppointment() {
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = usePatientAuth();

  const doctor = location.state?.doctor;

  const [patient, setPatient] = useState(null);
  const [bookingAmount, setBookingAmount] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const paymentMethod = "wallet";

  useEffect(() => {
    loadPatient();
    loadBookingAmount();
  }, []);

  const loadBookingAmount = async () => {
    try {
      const response = await fetch(ApiUrl.GET_BOOKING_AMOUNT, {
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setBookingAmount(data.booking_amount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadPatient = async () => {
    try {
      const response = await fetch(ApiUrl.PATIENT_ME, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPatient(data.patient);

        setWalletBalance(Number(data.wallet?.balance || 0));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const age = useMemo(() => {
    if (!patient?.profile?.dob) return "";

    const dob = new Date(patient.profile.dob);
    const today = new Date();

    let years = today.getFullYear() - dob.getFullYear();

    const month = today.getMonth() - dob.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
      years--;
    }

    return years;
  }, [patient]);

  const availableDates =
    doctor?.availabilities?.map((item) => item.available_date.split("T")[0]) ||
    [];

 const bookAppointment = async () => {
  if (!appointmentDate) {
    return Swal.fire("Required", "Please select a date.", "warning");
  }

  if (!purpose.trim()) {
    return Swal.fire("Required", "Please enter the purpose.", "warning");
  }

  // Confirm details before proceeding
  const confirm = await Swal.fire({
    title: "Confirm Appointment Details",
    html: `
      <div style="text-align:left">
        <p><strong>Doctor:</strong> ${
          doctor.fullname.toLowerCase().startsWith("dr")
            ? doctor.fullname
            : `Dr. ${doctor.fullname}`
        }</p>

      <p><strong>Date:</strong> ${(() => {
  const [year, month, day] = appointmentDate.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
})()}</p>

        <p><strong>Purpose:</strong> ${purpose}</p>

        <p><strong>Payment:</strong> Wallet</p>

        <p><strong>Amount:</strong> ₦${Number(
          bookingAmount,
        ).toLocaleString("en-US")}</p>
      </div>
    `,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Proceed Booking",
    cancelButtonText: "Edit Details",
    confirmButtonColor: "#14361D",
    cancelButtonColor: "#856443",
  });

  if (!confirm.isConfirmed) return;

  try {
    setLoading(true);

    const response = await fetch(ApiUrl.BOOK_APPOINTMENT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        doctor_id: doctor.id,
        appointment_date: appointmentDate,
        purpose,
        payment_method: paymentMethod,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      await Swal.fire({
        title: "Appointment Booked",
        text: "Your appointment has been submitted successfully.",
        icon: "success",
        confirmButtonColor: "#14361D",
      });

      navigate("/patient/appointments");
    } else {
      if (data.message === "Insufficient wallet balance.") {
        Swal.fire({
          icon: "warning",
          title: "Insufficient Wallet Balance",
          text: "You don't have enough money in your wallet to book this appointment.",
          confirmButtonText: "Fund Wallet",
          showCancelButton: true,
          cancelButtonText: "Cancel",
          confirmButtonColor: "#14361D",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/patient/wallet");
          }
        });
      } else {
        Swal.fire(
          "Error",
          data.message || "Unable to book appointment.",
          "error",
        );
      }
    }
  } catch (error) {
    Swal.fire("Error", "Something went wrong.", "error");
  } finally {
    setLoading(false);
  }
};

  if (!doctor) {
    return null;
  }

  return (
    <div className="book-appointment-page">
      <button className="doctor-back-btn" onClick={() => navigate(-1)}>
        ←
      </button>

      <h2>
        Book{" "}
        {doctor.fullname.toLowerCase().startsWith("dr")
          ? doctor.fullname
          : `Dr. ${doctor.fullname}`}
      </h2>

      <div className="appointment-card">
        <div className="form-group">
          <label>Patient Name</label>

          <input type="text" value={patient?.fullname || ""} readOnly />
        </div>

        <div className="form-group">
          <label>Age</label>

          <input type="text" value={age} readOnly />
        </div>

        <div className="form-group">
          <label>Available Date</label>

          <input
            type="text"
            readOnly
            value={appointmentDate}
            placeholder="Click to select a date"
            onClick={() => setShowCalendar(true)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="form-group">
          <label>Purpose</label>

          <textarea
            rows="5"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Describe the purpose of your appointment..."
          />
        </div>

        <div className="form-group">
          <label>Payment Method</label>

          <input
            type="text"
            value={`Wallet (₦${walletBalance.toLocaleString("en-US")})`}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Booking Amount</label>

          <input
            type="text"
            value={
              bookingAmount ? `₦${Number(bookingAmount).toLocaleString()}` : ""
            }
            readOnly
          />
        </div>

        <button
          className="book-btn"
          onClick={bookAppointment}
          disabled={loading}
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
      </div>

      {showCalendar && (
        <AppointmentCalendar
          availabilities={doctor.availabilities}
          selectedDate={appointmentDate}
          onSelect={setAppointmentDate}
          onClose={() => setShowCalendar(false)}
        />
      )}
    </div>
  );
}
