import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBell,
  FaCheckCircle,
  FaRegBell,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";

import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";
import ApiUrl from "../../../../constants/ApiUrl";
import "../../../../assets/css/patient-notifications.css";

export default function DoctorNotifications() {
  const { token } = useDoctorAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    if (token) {
      loadNotifications();
      loadNotificationCount();
    }
  }, [token]);

  // ==========================================
  // LOAD ALL NOTIFICATIONS
  // ==========================================
  const loadNotifications = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(ApiUrl.GET_NOTIFICATIONS, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("DOCTOR GET_NOTIFICATIONS response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to load notifications");
      }

      if (data.success) {
        let notificationList = [];

        /*
         * Support the different possible response formats:
         *
         * {
         *   success: true,
         *   notifications: [...]
         * }
         *
         * OR
         *
         * {
         *   success: true,
         *   data: [...]
         * }
         *
         * OR
         *
         * {
         *   success: true,
         *   data: {
         *      notifications: [...]
         *   }
         * }
         */

        if (Array.isArray(data.notifications)) {
          notificationList = data.notifications;
        } else if (Array.isArray(data.data)) {
          notificationList = data.data;
        } else if (Array.isArray(data.data?.notifications)) {
          notificationList = data.data.notifications;
        }

        console.log("Doctor notifications being displayed:", notificationList);

        setNotifications(notificationList);
      } else {
        setNotifications([]);

        setError(data.message || "Unable to load notifications.");
      }
    } catch (error) {
      console.error("Error loading doctor notifications:", error);

      setNotifications([]);

      setError(
        error.message || "Something went wrong while loading notifications.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD UNREAD NOTIFICATION COUNT
  // ==========================================
  const loadNotificationCount = async () => {
    try {
      const response = await fetch(ApiUrl.GET_UNREAD_NOTIFICATION_COUNT, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("Doctor unread notification count response:", data);

      if (data.success) {
        setNotificationCount(Number(data.count) || 0);
      }
    } catch (error) {
      console.error("Error loading doctor notification count:", error);
    }
  };

  // ==========================================
  // OPEN NOTIFICATION
  // ==========================================
  const openNotification = async (notification) => {
    setSelectedNotification(notification);

    // Already read
    if (notification.is_read) {
      return;
    }

    try {
      const response = await fetch(
        `${ApiUrl.MARK_NOTIFICATION_AS_READ}/${notification.id}/read`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      console.log("Doctor mark notification as read response:", data);

      if (!response.ok) {
        console.error(data);
        return;
      }

      if (data.success) {
        /*
         * Change the notification to read
         */
        setNotifications((previous) =>
          previous.map((item) =>
            item.id === notification.id
              ? {
                  ...item,
                  is_read: true,
                }
              : item,
          ),
        );

        /*
         * Reduce unread count immediately
         */
        setNotificationCount((previous) => Math.max(previous - 1, 0));

        /*
         * Update modal notification
         */
        setSelectedNotification({
          ...notification,
          is_read: true,
        });
      }
    } catch (error) {
      console.error("Error marking doctor notification as read:", error);
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================
  const formatDate = (date) => {
    if (!date) {
      return "Date unavailable";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // ==========================================
  // SORT NOTIFICATIONS
  //
  // 1. UNREAD FIRST
  // 2. READ AFTER
  // 3. NEWEST FIRST WITHIN EACH GROUP
  // ==========================================
  const sortedNotifications = [...notifications].sort((a, b) => {
    // Unread notifications come first
    if (a.is_read !== b.is_read) {
      return a.is_read ? 1 : -1;
    }

    // Newest notifications come first
    const dateA = new Date(a.created_at).getTime();

    const dateB = new Date(b.created_at).getTime();

    return dateB - dateA;
  });

  return (
    <div className="patient-notifications-page">
      {/* ==========================================
          PAGE HEADER
      ========================================== */}
      <div className="patient-notifications-header">
        <button
          type="button"
          className="patient-notifications-back"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />

          <span>Back</span>
        </button>

        <div className="patient-notifications-title">
          <div className="patient-notifications-title-icon">
            <FaBell />
          </div>

          <div>
            <h2>Notifications</h2>

            <p>Stay updated with your latest notifications</p>
          </div>
        </div>
      </div>

      {/* ==========================================
          SUMMARY
      ========================================== */}
      <div className="patient-notifications-summary">
        {/* TOTAL */}
        <div className="notification-summary-card">
          <div className="notification-summary-icon">
            <FaBell />
          </div>

          <div>
            <span>Total Notifications</span>

            <strong>{notifications.length}</strong>
          </div>
        </div>

        {/* UNREAD */}
        <div className="notification-summary-card unread-summary">
          <div className="notification-summary-icon">
            <FaRegBell />
          </div>

          <div>
            <span>Unread Notifications</span>

            <strong>{notificationCount}</strong>
          </div>
        </div>
      </div>

      {/* ==========================================
          NOTIFICATIONS CONTAINER
      ========================================== */}
      <div className="patient-notifications-container">
        {/* CONTAINER HEADER */}
        <div className="patient-notifications-container-header">
          <div>
            <h3>All Notifications</h3>

            <p>Your recent updates and important messages</p>
          </div>
        </div>

        {/* ========================================
            LOADING
        ======================================== */}
        {loading && (
          <div className="patient-notifications-loading">
            <div className="notification-spinner"></div>

            <p>Loading notifications...</p>
          </div>
        )}

        {/* ========================================
            ERROR
        ======================================== */}
        {!loading && error && (
          <div className="patient-notifications-empty">
            <div className="notification-empty-icon">
              <FaExclamationCircle />
            </div>

            <h3>Unable to Load Notifications</h3>

            <p>{error}</p>

            <button
              type="button"
              className="notification-retry-button"
              onClick={loadNotifications}
            >
              Try Again
            </button>
          </div>
        )}

        {/* ========================================
            EMPTY
        ======================================== */}
        {!loading && !error && notifications.length === 0 && (
          <div className="patient-notifications-empty">
            <div className="notification-empty-icon">
              <FaBell />
            </div>

            <h3>No Notifications</h3>

            <p>You don't have any notifications at the moment.</p>
          </div>
        )}

        {/* ========================================
            NOTIFICATIONS LIST
        ======================================== */}
        {!loading && !error && notifications.length > 0 && (
          <div className="patient-notifications-list">
            {sortedNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`patient-notification-card ${
                  notification.is_read
                    ? "notification-card-read"
                    : "notification-card-unread"
                }`}
                onClick={() => openNotification(notification)}
              >
                {/* NOTIFICATION ICON */}
                <div className="patient-notification-icon">
                  {notification.is_read ? <FaCheckCircle /> : <FaBell />}
                </div>

                {/* NOTIFICATION CONTENT */}
                <div className="patient-notification-content">
                  <div className="patient-notification-top">
                    <h4>{notification.title || "Notification"}</h4>

                    {/* NEW BADGE */}
                    {!notification.is_read && (
                      <span className="notification-new-badge">New</span>
                    )}
                  </div>

                  {/* MESSAGE */}
                  <p>
                    {notification.message || "You have a new notification."}
                  </p>

                  {/* DATE */}
                  <div className="patient-notification-date">
                    <FaClock />

                    <span>{formatDate(notification.created_at)}</span>
                  </div>
                </div>

                {/* UNREAD DOT */}
                {!notification.is_read && (
                  <div className="notification-unread-dot"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==========================================
          NOTIFICATION DETAIL MODAL
      ========================================== */}
      {selectedNotification && (
        <div
          className="patient-notification-modal-overlay"
          onClick={() => setSelectedNotification(null)}
        >
          <div
            className="patient-notification-modal"
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL ICON */}
            <div className="patient-notification-modal-icon">
              <FaBell />
            </div>

            {/* MODAL CONTENT */}
            <div className="patient-notification-modal-content">
              <h3>{selectedNotification.title || "Notification"}</h3>

              {/* DATE */}
              <div className="patient-notification-modal-date">
                <FaClock />

                <span>{formatDate(selectedNotification.created_at)}</span>
              </div>

              {/* MESSAGE */}
              <div className="patient-notification-message">
                <p>
                  {selectedNotification.message ||
                    "You have a new notification."}
                </p>
              </div>
            </div>

            {/* CLOSE */}
            <button
              type="button"
              className="patient-notification-modal-close"
              onClick={() => setSelectedNotification(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
