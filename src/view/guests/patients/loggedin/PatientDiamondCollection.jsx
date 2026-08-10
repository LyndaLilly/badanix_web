import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  FaGem,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";

import ApiUrl from "../../../../constants/ApiUrl";
import { usePatientAuth } from "../../../../contexts/PatientAuthContext";

import "../../../../assets/css/diamonds.css";

import day1 from "../../../../assets/diamond/day1.png";
import day2 from "../../../../assets/diamond/day2.png";
import day3 from "../../../../assets/diamond/day3.png";
import day4 from "../../../../assets/diamond/day4.png";
import day5 from "../../../../assets/diamond/day5.png";
import day6 from "../../../../assets/diamond/day6.png";
import day7 from "../../../../assets/diamond/day7.png";

export default function PatientDiamondCollection() {
  const { token } = usePatientAuth();

  const [loading, setLoading] = useState(false);
  const [diamond, setDiamond] = useState(null);

  const diamondImages = [
    day1,
    day2,
    day3,
    day4,
    day5,
    day6,
    day7,
  ];

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const res = await fetch(ApiUrl.GET_DIAMOND_STATUS, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        setDiamond(data.diamond);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const collectDiamond = async () => {
    if (loading || diamond?.today_collected) return;

    setLoading(true);

    try {
      const res = await fetch(ApiUrl.COLLECT_DIAMOND, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
          timer: 1800,
          showConfirmButton: false,
        });

        loadStatus();
      } else {
        Swal.fire({
          icon: "info",
          title: "Notice",
          text: data.message,
        });

        loadStatus();
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to collect diamond.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!diamond) {
    return (
      <div className="diamond-loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="diamond-page">
      <div className="diamond-card">
        <div className="diamond-header">
          <div>
            <h2>Daily Diamond Collection</h2>

            <p>
              Collect diamonds for 7 consecutive days to
              complete your weekly reward.
            </p>
          </div>

          <FaGem className="diamond-main-icon" />
        </div>

        <div className="diamond-days">
          {diamondImages.map((image, index) => {
            const day = index + 1;

            const collected =
              day < diamond.current_day ||
              (day === diamond.current_day &&
                diamond.today_collected);

            const current =
              day === diamond.current_day + 1 &&
              !diamond.today_collected;

            return (
              <div
                key={day}
                className={`diamond-day-card ${
                  collected ? "completed" : ""
                }`}
              >
                <div className="day-number">
                  Day {day}
                </div>

                <div className="day-gem">
                  {collected ? (
                    <FaCheckCircle className="diamond-check-icon" />
                  ) : (
                    <div className="diamond-image-wrapper">
                      <img
                        src={image}
                        alt={`Day ${day}`}
                        className={`diamond-day-image ${
                          current ? "" : "locked"
                        }`}
                      />

                      {!current && (
                        <FaLock className="diamond-lock-icon" />
                      )}
                    </div>
                  )}
                </div>

                {current ? (
                  <button
                    className="collect-day-btn"
                    onClick={collectDiamond}
                    disabled={
                      loading || diamond.today_collected
                    }
                  >
                    {loading
                      ? "Collecting..."
                      : "Collect"}
                  </button>
                ) : collected ? (
                  <span className="collected-text">
                    Collected
                  </span>
                ) : (
                  <span className="locked-text">
                    Locked
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="diamond-reward-box">
          <div>
            <strong>
              💎 {diamond.total_diamonds}
            </strong>

            <span>This Week</span>
          </div>

          <div>
            <strong>
              ₦{diamond.reward_amount}
            </strong>

            <span>Weekly Reward</span>
          </div>

          <div>
            <strong>
              💎 {diamond.lifetime_diamonds}
            </strong>

            <span>Lifetime Diamonds</span>
          </div>

          <div>
            <strong>
              ₦{diamond.lifetime_reward}
            </strong>

            <span>Lifetime Reward</span>
          </div>
        </div>
      </div>
    </div>
  );
}