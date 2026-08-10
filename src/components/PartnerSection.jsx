import "../assets/css/partner.css";
import { FaCheckCircle } from "react-icons/fa";

const benefits = [
  "Attend to aligned e-patients",
  "Write e-medical reports",
  "Give medical advice to e-patients",
  "Prescribe e-medicine",
  "Make money on every e-consultation",
];

export default function PartnerSection() {
  return (
    <section className="partner-section">
      <div className="container">

        <div className="row align-items-center g-5">

          <div className="col-lg-6">

            <span className="section-tag">
              PARTNER WITH US
            </span>

            <h2 className="partner-title">
              Become A Specialist On BADANIX
            </h2>

            <p className="partner-text">
              Join our growing network of licensed healthcare professionals
              providing quality digital healthcare services to patients anytime,
              anywhere.
            </p>

            <div className="benefits">

              {benefits.map((item, index) => (
                <div className="benefit" key={index}>
                  <FaCheckCircle />
                  <span>{item}</span>
                </div>
              ))}

            </div>

            <button className="partner-btn">
              Partner With BADANIX
            </button>

          </div>

          <div className="col-lg-6">

            <div className="partner-image">

              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80"
                alt="Doctor"
              />

              <div className="experience-card">
                <h3>500+</h3>
                <span>Healthcare Professionals</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}