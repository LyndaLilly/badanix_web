import { useEffect, useState } from "react";
import NotificationBell from "../../../../components/NotificationBell";
import { useInstitutionAuth } from "../../../../contexts/InstitutionAuthContext";
import ApiUrl from "../../../../constants/ApiUrl";
import "../../../../assets/css/notification.css";

export default function InstitutionNotification() {
  const { token } = useInstitutionAuth();

  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    if (token) {
      loadNotificationCount();
      loadNotifications();
    }
  }, [token]);

  const loadNotificationCount = async () => {
    try {
      const response = await fetch(ApiUrl.GET_UNREAD_NOTIFICATION_COUNT, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setNotificationCount(data.count);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadNotifications = async () => {
    try {
      const response = await fetch(ApiUrl.GET_NOTIFICATIONS, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openNotification = async (notification) => {
    setSelectedNotification(notification);

    if (notification.is_read) return;

    try {
      const response = await fetch(
        `${ApiUrl.MARK_NOTIFICATION_AS_READ}/${notification.id}/read`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log(await response.text());
        return;
      }

      const data = await response.json();

      if (data.success) {
        setNotifications((prev) =>
          prev.map((item) =>
            item.id === notification.id
              ? { ...item, is_read: true }
              : item
          )
        );

        setNotificationCount((prev) => Math.max(prev - 1, 0));

        setSelectedNotification({
          ...notification,
          is_read: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="notification-wrapper">
        <div onClick={() => setShowNotifications(!showNotifications)}>
          <NotificationBell count={notificationCount} />
        </div>

        {showNotifications && (
          <div className="notification-dropdown">
            <div className="notification-header">
              Notifications
            </div>

            {notifications.length === 0 ? (
              <div className="notification-empty">
                No notifications
              </div>
            ) : (
              notifications.slice(0, 5).map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    notification.is_read ? "read" : "unread"
                  }`}
                  onClick={() => openNotification(notification)}
                >
                  <strong>{notification.title}</strong>

                  <p>{notification.message}</p>

                  <small>
                    {new Date(notification.created_at).toLocaleString()}
                  </small>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {selectedNotification && (
        <div className="notification-modal-overlay">
          <div className="notification-modal">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">
                {selectedNotification.title}
              </h4>

              <button
                className="btn-close"
                onClick={() => setSelectedNotification(null)}
              ></button>
            </div>

            <p>{selectedNotification.message}</p>

            <small className="text-muted d-block mb-3">
              {new Date(
                selectedNotification.created_at
              ).toLocaleString()}
            </small>

            <div className="text-end">
              <button
                className="btn btn-primary"
                onClick={() => setSelectedNotification(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}