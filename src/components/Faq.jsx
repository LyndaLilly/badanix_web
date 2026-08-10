import { useState } from "react";
import "../assets/css/faq.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is BADANIX Digital Healthcare?",
    answer:
      "BADANIX is an innovative e-health technology platform that provides remote e-medical services, digital consultations, and access to personalized healthcare solutions through mobile and web applications.",
  },
  {
    question: "How do I book a consultation with a doctor?",
    answer: `To book a consultation:

• Log in to the BADANIX app or website.
• Select your preferred e-doctor or e-specialist.
• Choose a convenient date and time.
• Make payment.
• Wait for the doctor's confirmation.
• Receive a notification before your consultation.`,
  },
  {
    question: "What e-medical services does BADANIX offer?",
    answer:
      "We offer online consultations, e-prescriptions, health monitoring, diagnostic test scheduling, remote result delivery, and access to e-specialists.",
  },
  {
    question: "How do I access my medical records?",
    answer:
      "Your records are securely stored on the BADANIX platform. Simply log into your account and open the Medical Records section.",
  },
  {
    question: "Is BADANIX available 24/7?",
    answer:
      "Yes. BADANIX provides 24/7 access to e-healthcare services including online consultations and emergency support.",
  },
  {
    question: "Are my personal and medical data secure?",
    answer:
      "Yes. We use encryption and industry-standard security measures to keep your personal and medical information safe.",
  },
  {
    question: "How do I pay for services?",
    answer:
      "Payments can be made using Credit/Debit Cards, Mobile Money, Bank Transfers, or your BADANIX Wallet.",
  },
  {
    question: "Can I use BADANIX without health insurance?",
    answer:
      "Yes. Both insured and uninsured patients can access BADANIX healthcare services.",
  },
  {
    question: "Can I get medications delivered through BADANIX?",
    answer:
      "Yes. Once your e-doctor prescribes medication, you'll receive a code that can be used at any registered BADANIX pharmacy.",
  },
  {
    question: "How do I cancel or reschedule an appointment?",
    answer:
      "Log into your account, open My Appointments, select the appointment you wish to modify, then choose Cancel or Reschedule.",
  },
  {
    question: "What should I do if I encounter technical issues?",
    answer:
      "Please contact our support team via Email: support@badanix.com.",
  },
  {
    question: "Can I speak with e-specialists on the platform?",
    answer:
      "Yes. BADANIX connects patients directly with qualified e-practitioners and specialists.",
  },
  {
    question: "Is BADANIX available outside my country?",
    answer:
      "Yes. BADANIX currently operates across many countries globally.",
  },
  {
    question: "How do I become a partner or healthcare provider on BADANIX?",
    answer:
      "Healthcare professionals and medical facilities can apply using the 'Partner With Us' button on the homepage.",
  },
];

export default function Faq() {
  const [active, setActive] = useState(0);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="faq-section">

      <div className="container">

        <div className="text-center mb-5">

          <span className="section-tag">
            FAQ
          </span>

          <h2 className="section-title">
            Frequently Asked Questions
          </h2>

          <p className="section-text faq-text">
            Find answers to commonly asked questions about BADANIX.
          </p>

        </div>

        <div className="faq-wrapper">

          {faqs.map((faq, index) => (

            <div className="faq-item" key={index}>

              <button
                className="faq-question"
                onClick={() => toggle(index)}
              >

                <span>{faq.question}</span>

                {active === index ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}

              </button>

              <div
                className={`faq-answer ${
                  active === index ? "show" : ""
                }`}
              >
                <p style={{ whiteSpace: "pre-line" }}>
                  {faq.answer}
                </p>
              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}