import "../assets/css/sechome.css";

import {
  FaStethoscope,
  FaPills,
  FaHospital,
  FaFlask,
  FaArrowRight,
} from "react-icons/fa";

const services = [
  {
    icon: <FaStethoscope />,
    title: "Virtual Consultations",
    text: "Connect with certified e-specialists across the globe through secure video consultations.",
  },
  {
    icon: <FaPills />,
    title: "Pharmacy Services",
    text: "Order your prescribed medication through trusted pharmaceutical providers.",
  },
  {
    icon: <FaHospital />,
    title: "Hospital Services",
    text: "Connect with certified hospitals and access the healthcare services you need.",
  },
  {
    icon: <FaFlask />,
    title: "Laboratory Access",
    text: "Access quality diagnostic services from laboratories you can trust.",
  },
];

export default function Services() {
  return (
    <section className="services-section">

      <div className="container">

        {/* =================================
            SECTION HEADER
        ================================= */}

        <div className="services-header">

          <div className="services-label">
            <span className="services-label-dot"></span>
            WHAT WE OFFER
          </div>

          <h2 className="services-heading">
            Healthcare services,
            <span> all in one place.</span>
          </h2>

          <p className="services-subheading">
            Everything you need to access, manage and experience better
            healthcare through BADANIX.
          </p>

        </div>


        {/* =================================
            SERVICES
        ================================= */}

        <div className="services-grid">

          {services.map((service, index) => (

            <div
              className="service-card"
              key={index}
            >

              {/* Decorative number */}

              <span className="service-number">
                {String(index + 1).padStart(2, "0")}
              </span>


              {/* Icon */}

              <div className="service-icon">
                {service.icon}
              </div>


              {/* Content */}

              <div className="service-content">

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.text}
                </p>

              </div>


              {/* Bottom action */}

              <div className="service-footer">

                <span>
                  Explore service
                </span>

                <span className="service-arrow">
                  <FaArrowRight />
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}