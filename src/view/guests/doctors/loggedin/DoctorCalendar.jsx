import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import ApiUrl from "../../../../constants/ApiUrl";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";

import "../../../../assets/css/doctorcalendar.css";
import { useNavigate } from "react-router-dom";

export default function DoctorCalendar() {
  const navigate = useNavigate();

  const { token, doctor } = useDoctorAuth();

  const documentsApproved = doctor?.documentsApproved;

  const [savedDates, setSavedDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calendarValue, setCalendarValue] = useState(new Date());

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    if (token) {
      fetchAvailability();
    }
  }, [token]);

  /**
   * Fetch doctor's availability
   */
  const fetchAvailability = async () => {
    try {
      setLoading(true);

      const response = await fetch(ApiUrl.GET_DOCTOR_AVAILABILITY, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        console.log(JSON.stringify(data.dates, null, 2));
        setSavedDates(
          data.dates.map((item) => ({
            ...item,
            available_date: item.available_date.split("T")[0],
          })),
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Save selected dates
   */
  const saveAvailability = async () => {
    if (!documentsApproved) {
      Swal.fire({
        icon: "warning",
        title: "Documents Pending",
        text: "Your documents must be approved before you can create availability.",
      });

      return;
    }

    if (selectedDates.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No Date Selected",
        text: "Please select at least one date.",
      });

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(ApiUrl.CREATE_DOCTOR_AVAILABILITY, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dates: selectedDates,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
          timer: 1500,
          showConfirmButton: false,
        });

        setSelectedDates([]);

        fetchAvailability();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message,
        });
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Unable to save availability.",
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete availability
   */
  const deleteAvailability = async (id) => {
    const result = await Swal.fire({
      title: "Remove Availability?",
      text: "This date will no longer be available.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#14361D",
      confirmButtonText: "Remove",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const response = await fetch(
        `${ApiUrl.DELETE_DOCTOR_AVAILABILITY}/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Removed",
          timer: 1200,
          showConfirmButton: false,
        });

        fetchAvailability();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Format date
   */
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /**
   * Disable dates
   */
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);
    maxDate.setDate(maxDate.getDate() + 30);

    return date < today || date > maxDate;
  };

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let firstWeekDay = firstDay.getDay();
    firstWeekDay = firstWeekDay === 0 ? 6 : firstWeekDay - 1;

    const days = [];

    // Empty cells
    for (let i = 0; i < firstWeekDay; i++) {
      days.push(null);
    }

    // Month days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);

      days.push({
        day,
        date,
        formatted: formatDate(date),
        disabled: isDateDisabled(date),
      });
    }

    return days;
  };

  /**
   * Select / Unselect date
   */
  const handleDateClick = (date) => {
    const formatted = formatDate(date);

    // Already saved? Ask to delete
    const existing = savedDates.find(
      (item) => item.available_date.split("T")[0] === formatted,
    );

    if (existing) {
      deleteAvailability(existing.id);
      return;
    }

    setSelectedDates((prev) => {
      if (prev.includes(formatted)) {
        return prev.filter((d) => d !== formatted);
      }

      return [...prev, formatted];
    });
  };

  /**
   * Calendar tile colors
   */
  const getTileClassName = ({ date }) => {
    const formatted = formatDate(date);

    if (
      savedDates.some((item) => item.available_date.split("T")[0] === formatted)
    ) {
      return "saved-date";
    }

    if (selectedDates.includes(formatted)) {
      return "selected-date";
    }

    return "";
  };

  return (
    <div className="doctor-calendar-card">
      {!documentsApproved && (
        <div className="document-warning-box">
          <div>
            <h5>Documents Under Review</h5>

            <p>
              Your documents must be fully approved before you can create
              availability for patients.
            </p>
          </div>

          <button onClick={() => navigate("/doctor/documentupload")}>
            Upload Documents
          </button>
        </div>
      )}

      {documentsApproved && (
        <>
          <div className="doctor-calendar-card">
            <div className="doctor-calendar-header">
              <h3>My Availability</h3>

              <p>Select the dates you are available for appointments.</p>
            </div>

            <div className="availability-wrapper">
              <div>
                <div className="custom-calendar">
                  <div className="calendar-header">
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() - 1,
                          ),
                        )
                      }
                    >
                      ←
                    </button>

                    <h3>
                      {currentMonth.toLocaleString("default", {
                        month: "long",
                      })}{" "}
                      {currentMonth.getFullYear()}
                    </h3>

                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() + 1,
                          ),
                        )
                      }
                    >
                      →
                    </button>
                  </div>

                  <div className="calendar-weekdays">
                    {weekDays.map((day) => (
                      <div key={day}>{day}</div>
                    ))}
                  </div>

                  <div className="calendar-grid">
                    {generateCalendar().map((item, index) => {
                      if (!item) {
                        return <div key={index}></div>;
                      }

                      const saved = savedDates.some(
                        (d) =>
                          d.available_date.split("T")[0] === item.formatted,
                      );

                      console.log(item.formatted, saved);

                      const selected = selectedDates.includes(item.formatted);

                      let statusClass = "";

                      if (item.disabled) {
                        statusClass = "disabled";
                      } else if (saved) {
                        statusClass = "saved";
                      } else if (selected) {
                        statusClass = "selected";
                      } else {
                        statusClass = "unsaved";
                      }

                      return (
                        <button
                          key={index}
                          disabled={item.disabled}
                          onClick={() => handleDateClick(item.date)}
                          className={`calendar-day ${statusClass}`}
                        >
                          {item.day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedDates.length > 0 && (
                  <button
                    className="save-availability-btn"
                    onClick={saveAvailability}
                    disabled={loading}
                  >
                    {loading
                      ? "Saving..."
                      : `Save ${selectedDates.length} Date${
                          selectedDates.length > 1 ? "s" : ""
                        }`}
                  </button>
                )}
              </div>

              <div className="availability-list">
                <h4>Saved Availability</h4>

                {savedDates.length === 0 ? (
                  <p>No availability added yet.</p>
                ) : (
                  savedDates.map((item) => (
                    <div key={item.id} className="availability-item">
                      <span>
                        {(() => {
                          const [year, month, day] = item.available_date
                            .split("T")[0]
                            .split("-");

                          return new Date(
                            year,
                            month - 1,
                            day,
                          ).toLocaleDateString("en-GB", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          });
                        })()}
                      </span>

                      <button onClick={() => deleteAvailability(item.id)}>
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
