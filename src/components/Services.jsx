import "../assets/css/sechome.css";
import {
  FaStethoscope,
  FaPills,
  FaHospital,
  FaFlask,
} from "react-icons/fa";

const services = [
  {
    icon: <FaStethoscope />,
    title: "Virtual Consultations",
    text: "Connect you to our certified e-specialists across the globe via video call",
  },
  {
    icon: <FaPills />,
    title: "Pharmacy Services",
    text: "Order your prescribed medication through our leading pharmaceutical providers",
  },
  {
    icon: <FaHospital />,
    title: "Hospital Services",
    text: "Connect you to our certified e-specialists across the globe",
  },
  {
    icon: <FaFlask />,
    title: "Laboratory Access",
    text: "Enjoy top notch diagnosis services at any of our laboratories partner of your choice.",
  },
];

export default function Services() {
  return (
    <section className="services-section py-5" id="services">
      <div className="container">

        <div className="text-center mb-5">
          <h2 className="services-heading">Our Services</h2>
          <div className="heading-line"></div>
        </div>

        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="service-card h-100">

                <div className="service-icon">
                  {service.icon}
                </div>

                <h4>{service.title}</h4>

                <p>{service.text}</p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}