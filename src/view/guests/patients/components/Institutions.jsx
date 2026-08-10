import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaHospital,
  FaClinicMedical,
  FaFlask,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import ApiUrl from "../../../../constants/ApiUrl";
import "../../../../assets/css/explorewidgets.css";


export default function Institutions() {

  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchInstitutions();
  }, []);



  const fetchInstitutions = async () => {

    try {

      const response = await fetch(ApiUrl.GET_INSTITUTIONS);

      const data = await response.json();


      if (data.success) {

        setInstitutions(data.institutions);

      }


    } catch(error) {

      console.error("Error fetching institutions:", error);

    } finally {

      setLoading(false);

    }

  };




  const featured = [

    {
      title:"Hospitals",
      type:"hospital",
      icon:<FaHospital />,
      seeAll:"/patient/hospitals",

      institution:
        institutions.find(
          (i)=>i.institution_type==="hospital"
        ) || null
    },


    {
      title:"Pharmacies",
      type:"pharmacy",
      icon:<FaClinicMedical />,
      seeAll:"/patient/pharmacies",

      institution:
        institutions.find(
          (i)=>i.institution_type==="pharmacy"
        ) || null
    },


    {
      title:"Laboratories",
      type:"laboratory",
      icon:<FaFlask />,
      seeAll:"/patient/laboratories",

      institution:
        institutions.find(
          (i)=>i.institution_type==="laboratory"
        ) || null
    }

  ];





  if(loading){

    return (

      <div className="dashboard-box">

        <div className="hospital-empty">

          Loading institutions...

        </div>

      </div>

    );

  }





  return (

    <div className="dashboard-box institution-widget">


      <div
        id="institutionCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >



        {/* INDICATORS */}

        <div className="carousel-indicators">

          {featured.map((section,index)=>(

            <button

              key={section.type}

              type="button"

              data-bs-target="#institutionCarousel"

              data-bs-slide-to={index}

              className={index===0 ? "active" : ""}

              aria-current={
                index===0 ? "true" : undefined
              }

              aria-label={`Slide ${index+1}`}

            />

          ))}

        </div>





        {/* SLIDES */}

        <div className="carousel-inner">


        {featured.map((section,index)=>{


          const institution = section.institution;




          if(!institution){

            return (

              <div

                className={`carousel-item ${
                  index===0 ? "active" : ""
                }`}

                key={section.type}

              >


                <div className="institution-card institution-empty-card">


                  <div className="institution-empty-placeholder">

                    {section.icon}

                  </div>



                  <div className="institution-card-body">


                    <span className="institution-card-type">

                      {section.title}

                    </span>



                    <h4 className="institution-card-title mt-3">

                      No {section.title} Available

                    </h4>




                    <p>

                      There are currently no approved{" "}

                      {section.title.toLowerCase()} on BADANIX.

                    </p>




                    <Link

                      to={section.seeAll}

                      className="institution-card-button"

                    >

                      Browse {section.title}

                      <FaArrowRight />

                    </Link>



                  </div>


                </div>



              </div>

            );

          }





          const profileImage = institution.profile?.profile_image

          ? `${ApiUrl.IMAGE_BASE_URL}/${institution.profile.profile_image.replace(
              /^uploads\//,
              ""
            )}`

          : null;



          const address =
            institution.profile?.address ||
            "Address not available";


          const city =
            institution.profile?.city ||
            "N/A";


          const state =
            institution.profile?.state ||
            "N/A";


          const country =
            institution.profile?.country ||
            "N/A";






          return (

            <div

              className={`carousel-item ${
                index===0 ? "active" : ""
              }`}

              key={section.type}

            >


              <div className="institution-card">



                <div className="institution-card-image">


                  {

                  profileImage ? (

                    <img

                      src={profileImage}

                      alt={institution.institution_name}

                    />

                  ) : (

                    <div className="institution-card-placeholder">

                      {section.icon}

                    </div>

                  )

                  }




                  <span className="institution-card-badge">

                    {section.title}

                  </span>



                </div>






                <div className="institution-card-body">



                  <h4 className="institution-card-title">

                    {institution.institution_name}

                  </h4>





                  <div className="institution-card-address">


                    <FaMapMarkerAlt />


                    <span>

                      {address}

                    </span>


                  </div>





                  <div className="institution-location-row">


                    <div className="institution-location-box">

                      <span>City</span>

                      <strong>{city}</strong>

                    </div>



                    <div className="institution-location-box">

                      <span>State</span>

                      <strong>{state}</strong>

                    </div>



                    <div className="institution-location-box">

                      <span>Country</span>

                      <strong>{country}</strong>

                    </div>



                  </div>





                  <div className="institution-card-footer">


                    <span className="institution-card-type">

                      {institution.institution_type}

                    </span>




                    <Link

                      to={section.seeAll}

                      className="institution-card-button"

                    >

                      Explore

                      <FaArrowRight />

                    </Link>



                  </div>



                </div>



              </div>



            </div>


          );


        })}


        </div>






        {/* CONTROLS */}


        <button

          className="carousel-control-prev"

          type="button"

          data-bs-target="#institutionCarousel"

          data-bs-slide="prev"

        >

          <span className="carousel-control-prev-icon"></span>

          <span className="visually-hidden">

            Previous

          </span>

        </button>




        <button

          className="carousel-control-next"

          type="button"

          data-bs-target="#institutionCarousel"

          data-bs-slide="next"

        >

          <span className="carousel-control-next-icon"></span>

          <span className="visually-hidden">

            Next

          </span>

        </button>




      </div>


    </div>

  );

}