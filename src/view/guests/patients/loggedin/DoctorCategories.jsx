import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

import "../../../../assets/css/doctors.css";

import ApiUrl from "../../../../constants/ApiUrl";
import specializationIcons from "../../../../assets/icons/specializationIcons";

export default function DoctorCategories() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    fetch(ApiUrl.GET_DOCTOR_SPECIALIZATIONS)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSpecializations(data.data);
        }
      })
      .catch((error) => {
        console.error("Error loading doctor categories:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredSpecializations = useMemo(() => {
    return specializations.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [specializations, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSpecializations.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = filteredSpecializations.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="doctors-page">
        <h3>Loading Doctor Categories...</h3>
      </div>
    );
  }

  return (
    <div className="doctors-page">
      <div className="doctors-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <h2>Doctor Categories</h2>
      </div>

      <div className="doctor-search">
        <FaSearch />

        <input
          type="text"
          placeholder="Search Doctor Categories..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="specialization-grid">
        {currentItems.map((specialization) => (
          <div
            key={specialization.id}
            className="specialization-card"
            onClick={() =>
              navigate("/patient/doctorlist", {
                state: {
                  specialization: specialization.name,
                  specializationId: specialization.id,
                },
              })
            }
          >
            <img
              src={
                specializationIcons[specialization.icon] ||
                specializationIcons.default
              }
              alt={specialization.name}
            />

            <h4>{specialization.name}</h4>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className="prev-btn"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((page) => Math.max(page - 1, 1))
          }
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="next-btn"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((page) =>
              Math.min(page + 1, totalPages)
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}