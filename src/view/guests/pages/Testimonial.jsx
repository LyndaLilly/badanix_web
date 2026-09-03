import "../../../assets/css/testimonial.css";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";

import {
  FaQuoteLeft,
  FaStar,
  FaArrowRight,
  FaHeart,
  FaPaperPlane,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Testimonial = () => {
 const testimonials = [
  {
    name: "Chiamaka Okafor",
    role: "Patient",
    text:
      "BADANIX has made accessing healthcare much easier for me. I can find the right healthcare provider, schedule appointments and manage my healthcare needs without the stress of unnecessary trips.",
  },
  {
    name: "Abdullahi Musa",
    role: "Patient",
    text:
      "I was initially unsure about using digital healthcare, but BADANIX made the experience simple. Being able to schedule an appointment and connect with a healthcare professional from home has been very convenient.",
  },
  {
    name: "Dr. Emeka Nwosu",
    role: "Healthcare Provider",
    text:
      "BADANIX gives healthcare providers a practical way to stay connected with patients. The platform makes consultations more accessible while helping us provide a more organized and efficient healthcare experience.",
  },
  {
    name: "Ama Mensah",
    role: "Patient",
    text:
      "What I appreciate about BADANIX is how convenient it makes healthcare. I can manage appointments and connect with healthcare professionals without having to go through a complicated process.",
  },
  {
    name: "Yusuf Ibrahim",
    role: "Healthcare Partner",
    text:
      "BADANIX is helping bring healthcare services closer to people. The platform provides a simple way for patients and healthcare professionals to connect and makes the overall healthcare journey more convenient.",
  },
  {
    name: "Ngozi Eze",
    role: "Patient",
    text:
      "Using BADANIX has given me a better way to manage my healthcare needs. The platform is straightforward, convenient and makes it easier to stay connected with healthcare providers.",
  },
  {
    name: "Kwame Asante",
    role: "Healthcare Provider",
    text:
      "Technology should make healthcare easier, and BADANIX does exactly that. It helps us connect with patients more effectively and provides useful tools that make managing consultations much easier.",
  },
  {
    name: "Fatima Bello",
    role: "Patient",
    text:
      "BADANIX has changed the way I think about accessing healthcare. Having healthcare services and consultations available through one platform makes the process much easier and more accessible.",
  },
];

  return (
    <div className="bdx-testimonial-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bdx-testimonial-hero">

        <div className="bdx-testimonial-hero-glow"></div>
        <div className="bdx-testimonial-hero-pattern"></div>

        <div className="bdx-testimonial-hero-inner">

          <div className="bdx-testimonial-hero-copy">

            <a
              href="/"
              className="bdx-testimonial-back"
            >
              <span>←</span>
              Back to Home
            </a>

            <div className="bdx-testimonial-eyebrow">
              <span></span>
              REAL EXPERIENCES
            </div>

            <h1>
              Healthcare
              <strong> That Makes a Difference.</strong>
            </h1>

            <p>
              Discover how BADANIX Digital Healthcare is helping
              patients, healthcare providers and partners experience
              a smarter, more connected approach to healthcare.
            </p>

            <div className="bdx-testimonial-hero-actions">

              <a
                href="#stories"
                className="bdx-testimonial-primary-btn"
              >
                Explore Stories
                <FaArrowRight />
              </a>

              <div className="bdx-testimonial-rating-summary">

                <div className="bdx-testimonial-stars">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                <span>
                  Trusted healthcare experiences
                </span>

              </div>

            </div>

          </div>

          <div className="bdx-testimonial-hero-visual">

            <div className="bdx-testimonial-image-frame">

              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=85"
                alt="Healthcare professional"
              />

              <div className="bdx-testimonial-floating-card">

                <div className="bdx-testimonial-floating-icon">
                  <FaHeart />
                </div>

                <div>
                  <strong>Better Connected Care</strong>
                  <span>
                    Technology with people at its heart
                  </span>
                </div>

              </div>

            </div>

            <div className="bdx-testimonial-circle"></div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section
        className="bdx-testimonial-intro"
        id="stories"
      >

        <div className="bdx-testimonial-container">

          <div className="bdx-testimonial-intro-grid">

            <div>

              <span className="bdx-testimonial-section-label">
                OUR IMPACT
              </span>

              <h2>
                Real stories.
                <span> Real experiences.</span>
              </h2>

            </div>

            <div>

              <p>
                At BADANIX Digital Healthcare, we believe technology
                should make healthcare easier, more accessible and
                more human. These experiences reflect the difference
                our digital healthcare solutions can make.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TESTIMONIAL SLIDER
      ===================================================== */}

      <section className="bdx-testimonial-stories">

        <div className="bdx-testimonial-container">

          <div className="bdx-testimonial-slider-heading">

            <div>
              <span className="bdx-testimonial-section-label">
                VOICES OF BADANIX
              </span>

              <h2>
                What people are saying
              </h2>
            </div>

            <p>
              Hear from people who have experienced BADANIX
              from different sides of the healthcare ecosystem.
            </p>

          </div>


          <div className="bdx-testimonial-slider-wrapper">

            <Swiper
              modules={[
                Autoplay,
                Pagination,
                Navigation,
              ]}
              loop={true}
              speed={800}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: ".bdx-testimonial-next",
                prevEl: ".bdx-testimonial-prev",
              }}
              breakpoints={{
                700: {
                  slidesPerView: 2,
                },
                1100: {
                  slidesPerView: 3,
                },
              }}
              className="bdx-testimonial-swiper"
            >

              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>

                  <article className="bdx-testimonial-card">

                    <div className="bdx-testimonial-card-top">

                      <div className="bdx-testimonial-quote">
                        <FaQuoteLeft />
                      </div>

                      <div className="bdx-testimonial-card-stars">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>

                    </div>

                    <p className="bdx-testimonial-card-text">
                      "{testimonial.text}"
                    </p>

                    <div className="bdx-testimonial-person">

                  

                      <div>
                        <h4>{testimonial.name}</h4>
                        <span>{testimonial.role}</span>
                      </div>

                    </div>

                  </article>

                </SwiperSlide>
              ))}

            </Swiper>

            <div className="bdx-testimonial-slider-controls">

              <button
                type="button"
                className="bdx-testimonial-prev"
                aria-label="Previous testimonial"
              >
                ←
              </button>

              <button
                type="button"
                className="bdx-testimonial-next"
                aria-label="Next testimonial"
              >
                →
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          JOIN BANNER
      ===================================================== */}

      <section className="bdx-testimonial-join">

        <div className="bdx-testimonial-container">

          <div className="bdx-testimonial-join-card">

            <div className="bdx-testimonial-join-decoration"></div>

            <div className="bdx-testimonial-join-content">

              <span className="bdx-testimonial-section-label">
                YOUR EXPERIENCE MATTERS
              </span>

              <h2>
                Have a BADANIX story
                <span> to share?</span>
              </h2>

              <p>
                Your experience can help others understand how
                digital healthcare can make everyday healthcare
                simpler, more connected and accessible.
              </p>

            </div>

            <a
              href="#share-story"
              className="bdx-testimonial-join-btn"
            >
              Share Your Story
              <FaArrowRight />
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          FORM
      ===================================================== */}

      <section
        className="bdx-testimonial-form-section"
        id="share-story"
      >

        <div className="bdx-testimonial-container">

          <div className="bdx-testimonial-form-layout">

            <div className="bdx-testimonial-form-intro">

              <span className="bdx-testimonial-section-label">
                SHARE YOUR EXPERIENCE
              </span>

              <h2>
                Tell us what
                <span> BADANIX means to you.</span>
              </h2>

              <p>
                Whether you're a patient, healthcare provider or
                partner, we'd love to hear about your experience.
              </p>

              <div className="bdx-testimonial-form-note">

                <div>
                  <FaHeart />
                </div>

                <span>
                  Every story helps us build better digital
                  healthcare experiences.
                </span>

              </div>

            </div>


            <div className="bdx-testimonial-form-card">

              <form>

                <div className="bdx-testimonial-field">

                  <label htmlFor="testimonial-name">
                    Your Name
                  </label>

                  <input
                    id="testimonial-name"
                    type="text"
                    placeholder="Enter your name"
                  />

                </div>


                <div className="bdx-testimonial-field">

                  <label htmlFor="testimonial-email">
                    Email Address
                  </label>

                  <input
                    id="testimonial-email"
                    type="email"
                    placeholder="Enter your email"
                  />

                </div>


                <div className="bdx-testimonial-field">

                  <label htmlFor="testimonial-message">
                    Your Experience
                  </label>

                  <textarea
                    id="testimonial-message"
                    rows="6"
                    placeholder="Tell us about your experience with BADANIX..."
                  ></textarea>

                </div>


                <button
                  type="submit"
                  className="bdx-testimonial-submit"
                >
                  <span>Submit Testimonial</span>
                  <FaPaperPlane />
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Testimonial;