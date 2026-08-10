import { useEffect, useState } from "react";
import { FaGem, FaArrowRight, FaCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import ApiUrl from "../../../../constants/ApiUrl";
import { usePatientAuth } from "../../../../contexts/PatientAuthContext";

import "../../../../assets/css/explorewidgets.css";

export default function DiamondCollection() {
  const navigate = useNavigate();
  const { token } = usePatientAuth();

  const [diamond, setDiamond] = useState({
    total_diamonds: 0,
    current_day: 0,
    required_days: 7,
    today_collected: false,
    reward_amount: 0,
  });

  useEffect(() => {
    loadDiamondStatus();
  }, []);

  const loadDiamondStatus = async () => {
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

  const streak = diamond.current_day;
  const totalDays = diamond.required_days;
  const diamonds = diamond.total_diamonds;

  return (
    <div className="dashboard-box diamond-collection-card">
      <div className="box-title">
        <h5>BADANIX DIAMONDS</h5>

        <FaGem className="box-icon" />
      </div>

      <div className="diamond-content">
        <div className="diamond-balance">
          <span className="diamond-label">My Diamonds</span>

         <h2>{diamond.lifetime_diamonds}</h2>

          <p>
            Collect your daily diamond and complete your {totalDays}-day streak
            to earn rewards.
          </p>

          <div className="diamond-streak">
            <FaCalendarCheck />

            <span>
              {streak}/{totalDays} Days Streak
            </span>
          </div>

          <button
            className="diamond-btn"
            onClick={() => navigate("/patient/diamondcollection")}
          >
            Collect Diamonds
            <FaArrowRight />
          </button>
        </div>

        <div className="diamond-icon-wrapper">
          <FaGem />
        </div>
      </div>
    </div>
  );
}