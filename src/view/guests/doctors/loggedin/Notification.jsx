
import {
  useEffect,
  useState,
  useCallback,
} from "react";

import NotificationBell from "../../../../components/NotificationBell";
import { useNavigate } from "react-router-dom";
import { useDoctorAuth } from "../../../../contexts/DoctorAuthContext";
import ApiUrl from "../../../../constants/ApiUrl";
import "../../../../assets/css/notification.css";

export default function Notification() {
  const { token } = useDoctorAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] =
    useState(0);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [selectedNotification, setSelectedNotification] =
    useState(null);

  /*
  |--------------------------------------------------------------------------
  | LOAD UNREAD NOTIFICATION COUNT
  |--------------------------------------------------------------------------
  */
  const loadNotificationCount = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(
        ApiUrl.GET_UNREAD_NOTIFICATION_COUNT,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error(
          "Failed to load doctor notification count:",
          response.status
        );

        return;
      }

      const data = await response.json();

      console.log(
        "Doctor unread notification count:",
        data
      );

      if (data.success) {
        setNotificationCount(
          Number(data.count) || 0
        );
      }
    } catch (error) {
      console.error(
        "Error loading doctor notification count:",
        error
      );
    }
  }, [token]);

  /*
  |--------------------------------------------------------------------------
  | LOAD NOTIFICATIONS
  |--------------------------------------------------------------------------
  */
  const loadNotifications = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(
        ApiUrl.GET_NOTIFICATIONS,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error(
          "Failed to load doctor notifications:",
          response.status
        );

        return;
      }

      const data = await response.json();

      console.log(
        "Doctor notifications response:",
        data
      );

      if (data.success) {
        let notificationList = [];

        /*
         * Support all possible API response structures
         */

        if (
          Array.isArray(data.notifications)
        ) {
          notificationList =
            data.notifications;
        } else if (
          Array.isArray(data.data)
        ) {
          notificationList =
            data.data;
        } else if (
          Array.isArray(
            data.data?.notifications
          )
        ) {
          notificationList =
            data.data.notifications;
        }

        setNotifications(
          notificationList
        );
      }
    } catch (error) {
      console.error(
        "Error loading doctor notifications:",
        error
      );
    }
  }, [token]);

  /*
  |--------------------------------------------------------------------------
  | REFRESH NOTIFICATIONS
  |--------------------------------------------------------------------------
  */
  const refreshNotifications =
    useCallback(async () => {
      if (!token) return;

      await Promise.all([
        loadNotificationCount(),
        loadNotifications(),
      ]);
    }, [
      token,
      loadNotificationCount,
      loadNotifications,
    ]);

  /*
  |--------------------------------------------------------------------------
  | INITIAL LOAD
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (!token) {
      setNotifications([]);
      setNotificationCount(0);
      return;
    }

    refreshNotifications();
  }, [
    token,
    refreshNotifications,
  ]);

  /*
  |--------------------------------------------------------------------------
  | AUTOMATIC REFRESH
  |
  | Check every 10 seconds for new notifications
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      loadNotifications();
      loadNotificationCount();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [
    token,
    loadNotifications,
    loadNotificationCount,
  ]);

  /*
  |--------------------------------------------------------------------------
  | REFRESH WHEN WINDOW/TAB BECOMES ACTIVE
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (!token) return;

    const handleFocus = () => {
      refreshNotifications();
    };

    const handleVisibilityChange = () => {
      if (
        document.visibilityState ===
        "visible"
      ) {
        refreshNotifications();
      }
    };

    window.addEventListener(
      "focus",
      handleFocus
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.removeEventListener(
        "focus",
        handleFocus
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [
    token,
    refreshNotifications,
  ]);

  /*
  |--------------------------------------------------------------------------
  | OPEN NOTIFICATION
  |
  | Optimistic UI update:
  | Mark as read immediately before API finishes.
  |--------------------------------------------------------------------------
  */
  const openNotification = async (
    notification
  ) => {
    /*
     * Open modal immediately
     */
    setSelectedNotification({
      ...notification,
    });

    /*
     * Already read
     */
    if (notification.is_read) {
      return;
    }

    /*
     |--------------------------------------------------------------------------
     | OPTIMISTIC UI UPDATE
     |--------------------------------------------------------------------------
     */

    setNotifications((previous) =>
      previous.map((item) =>
        item.id === notification.id
          ? {
              ...item,
              is_read: true,
            }
          : item
      )
    );

    /*
     |--------------------------------------------------------------------------
     | REDUCE BELL COUNT IMMEDIATELY
     |--------------------------------------------------------------------------
     */

    setNotificationCount(
      (previous) =>
        Math.max(
          Number(previous) - 1,
          0
        )
    );

    /*
     |--------------------------------------------------------------------------
     | UPDATE MODAL IMMEDIATELY
     |--------------------------------------------------------------------------
     */

    setSelectedNotification({
      ...notification,
      is_read: true,
    });

    /*
     |--------------------------------------------------------------------------
     | MARK AS READ ON BACKEND
     |--------------------------------------------------------------------------
     */

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

      const data =
        await response.json();

      console.log(
        "Doctor mark notification as read response:",
        data
      );

      /*
       |--------------------------------------------------------------------------
       | BACKEND FAILED
       |--------------------------------------------------------------------------
       */

      if (
        !response.ok ||
        !data.success
      ) {
        console.error(
          "Failed to mark doctor notification as read:",
          data
        );

        /*
         * Restore unread state
         */
        setNotifications(
          (previous) =>
            previous.map(
              (item) =>
                item.id ===
                notification.id
                  ? {
                      ...item,
                      is_read: false,
                    }
                  : item
            )
        );

        /*
         * Restore unread count
         */
        setNotificationCount(
          (previous) =>
            Number(previous) + 1
        );

        /*
         * Restore modal state
         */
        setSelectedNotification({
          ...notification,
          is_read: false,
        });

        return;
      }

      console.log(
        "Doctor notification marked as read successfully"
      );
    } catch (error) {
      console.error(
        "Error marking doctor notification as read:",
        error
      );

      /*
       |--------------------------------------------------------------------------
       | RESTORE UI IF REQUEST FAILED
       |--------------------------------------------------------------------------
       */

      setNotifications(
        (previous) =>
          previous.map(
            (item) =>
              item.id === notification.id
                ? {
                    ...item,
                    is_read: false,
                  }
                : item
          )
      );

      setNotificationCount(
        (previous) =>
          Number(previous) + 1
      );

      setSelectedNotification({
        ...notification,
        is_read: false,
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SORT NOTIFICATIONS
  |
  | 1. UNREAD FIRST
  | 2. READ SECOND
  | 3. NEWEST FIRST
  |--------------------------------------------------------------------------
  */
  const sortedNotifications = [
    ...notifications,
  ].sort((a, b) => {
    /*
     * Unread first
     */
    if (
      a.is_read !== b.is_read
    ) {
      return a.is_read ? 1 : -1;
    }

    /*
     * Newest first
     */
    const dateA = new Date(
      a.created_at
    ).getTime();

    const dateB = new Date(
      b.created_at
    ).getTime();

    return dateB - dateA;
  });

  /*
  |--------------------------------------------------------------------------
  | VIEW ALL NOTIFICATIONS
  |--------------------------------------------------------------------------
  */
  const viewAllNotifications = () => {
    setShowNotifications(false);
    setSelectedNotification(null);

 
    navigate(
      "/doctor/doctornotifications"
    );
  };

  /*
  |--------------------------------------------------------------------------
  | CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (!showNotifications) return;

    const handleOutsideClick = (
      event
    ) => {
      const container =
        document.querySelector(
          ".notification-wrapper"
        );

      if (
        container &&
        !container.contains(
          event.target
        )
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [showNotifications]);

  return (
    <>
      {/* ==================================================
          NOTIFICATION WRAPPER
      ================================================== */}
      <div
        className="notification-wrapper"
        style={{
          position: "relative",
        }}
      >

        {/* ==================================================
            NOTIFICATION BELL
        ================================================== */}
        <div
          onClick={() =>
            setShowNotifications(
              (previous) =>
                !previous
            )
          }
          style={{
            cursor: "pointer",
          }}
        >
          <NotificationBell
            count={notificationCount}
          />
        </div>


        {/* ==================================================
            NOTIFICATION DROPDOWN
        ================================================== */}
        {showNotifications && (
          <div className="notification-dropdown">

            {/* HEADER */}
            <div className="notification-header">

              <p>
                Notifications
              </p>

              {/* SEE ALL */}
              <p
                type="button"
                className="notification-see-more"
                onClick={
                  viewAllNotifications
                }
              >
                See all
              </p>

            </div>


            {/* ==================================================
                EMPTY STATE
            ================================================== */}
            {notifications.length ===
            0 ? (
              <div className="notification-empty">
                No notifications
              </div>
            ) : (
              <>

                {/* ==================================================
                    FIRST 5 NOTIFICATIONS
                ================================================== */}
                {sortedNotifications
                  .slice(0, 5)
                  .map(
                    (
                      notification
                    ) => (
                      <div
                        key={
                          notification.id
                        }
                        className={`notification-item ${
                          notification.is_read
                            ? "read"
                            : "unread"
                        }`}
                        onClick={() =>
                          openNotification(
                            notification
                          )
                        }
                      >

                        {/* TITLE */}
                        <strong>
                          {notification.title ||
                            "Notification"}
                        </strong>


                        {/* MESSAGE */}
                        <p>
                          {notification.message ||
                            "You have a new notification."}
                        </p>


                        {/* DATE */}
                        <small>
                          {new Date(
                            notification.created_at
                          ).toLocaleString(
                            "en-NG"
                          )}
                        </small>


                        {/* UNREAD DOT */}
                        {!notification.is_read && (
                          <span className="notification-dropdown-unread-dot"></span>
                        )}

                      </div>
                    )
                  )}

              </>
            )}

          </div>
        )}

      </div>


      {/* ==================================================
          NOTIFICATION MODAL
      ================================================== */}
      {selectedNotification && (
        <div
          className="notification-modal-overlay"
          onClick={() =>
            setSelectedNotification(
              null
            )
          }
        >

          <div
            className="notification-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* ==================================================
                MODAL HEADER
            ================================================== */}
            <div className="d-flex justify-content-between align-items-center mb-3">

              <h4 className="mb-0">
                {selectedNotification.title ||
                  "Notification"}
              </h4>

              <button
                type="button"
                className="btn-close"
                onClick={() =>
                  setSelectedNotification(
                    null
                  )
                }
              ></button>

            </div>


            {/* ==================================================
                MESSAGE
            ================================================== */}
            <p>
              {selectedNotification.message ||
                "You have a new notification."}
            </p>


            {/* ==================================================
                DATE
            ================================================== */}
            <small className="text-muted d-block mb-3">
              {new Date(
                selectedNotification.created_at
              ).toLocaleString(
                "en-NG"
              )}
            </small>


            {/* ==================================================
                CLOSE BUTTON
            ================================================== */}
            <div className="text-end">

              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  setSelectedNotification(
                    null
                  )
                }
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

