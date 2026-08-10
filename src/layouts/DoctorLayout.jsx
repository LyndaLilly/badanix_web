import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../assets/css/layout.css";

import { useDoctorAuth } from "../contexts/DoctorAuthContext";

import Navbar from "../view/guests/doctors/partials/Navbar";
import Sidebar from "../view/guests/doctors/partials/Sidebar";


export default function DoctorLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);


  const {
    doctor,
    profileCompleted
  } = useDoctorAuth();



  const location = useLocation();

  const navigate = useNavigate();



  useEffect(() => {


    if (!doctor) return;



    const isProfilePage =
      location.pathname === "/doctor/profilefill";



    if (
      !profileCompleted &&
      !isProfilePage
    ) {


      Swal.fire({

        icon: "warning",

        title: "Complete Your Profile",

        text:
          "Please update your doctor profile before continuing.",

        confirmButtonText:
          "Update Profile",

        allowOutsideClick: false,

        allowEscapeKey: false,

      })
      .then(() => {


        navigate(
          "/doctor/profilefill",
          {
            replace: true
          }
        );


      });


    }


  }, [
    doctor,
    profileCompleted,
    location.pathname,
    navigate
  ]);





  return (

    <div className="layout">


      <Sidebar

        doctor={doctor}

        sidebarOpen={sidebarOpen}

        closeSidebar={() =>
          setSidebarOpen(false)
        }

      />



      <div className="layout-main">


        <Navbar

          doctor={doctor}

          toggleSidebar={() =>
            setSidebarOpen(true)
          }

        />



        <main className="layout-content">

          <Outlet />

        </main>


      </div>


    </div>

  );

}