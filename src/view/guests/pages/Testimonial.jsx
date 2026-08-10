import "../../../assets/css/testimonial.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Testimonial = () => {
  return (
    <>
      {/* ================= HERO ================= */}

      <section className="testimonial-hero">
        <div className="testimonial-hero-overlay"></div>

        <div className="container testimonial-hero-content">

          <a href="/" className="testimonial-back-link">
            ← Back to Home
          </a>

          <div className="row justify-content-center">

            <div className="col-lg-10 text-center">

              <h1 className="testimonial-hero-title">
                BADANIX DIGITAL HEALTHCARE TESTIMONIALS
              </h1>

              <p className="testimonial-hero-text">
                Discover how BADANIX Digital Healthcare has transformed the
                healthcare experience for patients, healthcare providers, and
                partners. Hear directly from those whose lives and services have
                improved through our cutting-edge digital solutions.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= STORIES ================= */}

    <section className="testimonial-section">
  <div className="container">

    <div className="testimonial-heading text-center">
      <h2>Our Impact Through Real Stories</h2>

      <p>
        "At BADANIX DIGITAL HEALTHCARE, we believe in the power of
        transformation through technology. Here are some inspiring stories
        from our users who have experienced significant improvements in
        their healthcare journey with us."
      </p>
    </div>

    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      loop={true}
      speed={900}
      spaceBetween={30}
      slidesPerView={3}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      }}
      className="testimonialSwiper"
    >
      {/* Testimonial 1 */}

      <SwiperSlide>
        <div className="testimonial-card">

          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt=""
          />

          <p>
            "As a healthcare provider, I am always looking for ways to
            enhance patient care. BADANIX has provided me with the tools
            to connect with my patients effectively, even when we can't
            meet in person. The platform's user-friendly interface and
            comprehensive features have made consultations easier and more
            efficient. I appreciate how BADANIX prioritizes patient safety
            and satisfaction!"
          </p>

          <h5>Dr. Sarah Kesandra</h5>

        </div>
      </SwiperSlide>

      {/* Testimonial 2 */}

      <SwiperSlide>
        <div className="testimonial-card">

          <img
            src="https://randomuser.me/api/portraits/men/35.jpg"
            alt=""
          />

          <p>
            "I was initially hesitant about using a digital healthcare
            platform, but BADANIX has completely changed my perspective.
            The convenience of scheduling appointments and consulting with
            my doctor from home has been a game-changer. The team is
            professional and responsive, making my healthcare journey much
            smoother. I highly recommend BADANIX to anyone looking for
            reliable healthcare solutions!"
          </p>

          <h5>John Danta</h5>

        </div>
      </SwiperSlide>

      {/* Testimonial 3 */}

      <SwiperSlide>
        <div className="testimonial-card">

          <img
            src="https://randomuser.me/api/portraits/women/48.jpg"
            alt=""
          />

          <p>
            "As a healthcare provider, I am always looking for ways to
            enhance patient care. BADANIX has provided me with the tools
            to connect with my patients effectively, even when we can't
            meet in person. The platform's user-friendly interface and
            comprehensive features have made consultations easier and more
            efficient. I appreciate how BADANIX prioritizes patient safety
            and satisfaction!"
          </p>

          <h5>Dr. Sarah Kesandra</h5>

        </div>
      </SwiperSlide>

      {/* Duplicate them so the loop looks natural */}

      <SwiperSlide>
        <div className="testimonial-card">

          <img
            src="https://randomuser.me/api/portraits/men/61.jpg"
            alt=""
          />

          <p>
            "BADANIX has transformed the way our clinic interacts with
            patients. Scheduling, records, and consultations are now much
            easier and more organized."
          </p>

          <h5>Michael James</h5>

        </div>
      </SwiperSlide>

    </Swiper>

  </div>
</section>

       {/* ================= JOIN & SHARE ================= */}

      <section className="testimonial-join-section">

        <div className="container">

          <div className="row">

            <div className="col-lg-12">

              <div className="testimonial-join-banner">

                <h2>Join Us &amp; Share Your Experience</h2>

                <p>
                  We value your feedback and encourage you to share your
                  experience with BADANIX. Your testimonial helps others
                  understand how our digital healthcare solutions can make a
                  difference. Please use the form below to submit your story.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= SHARE STORY ================= */}

      <section className="testimonial-form-section">

        <div className="container">

          <div className="row justify-content-center">

            <div className="col-lg-7 col-md-9">

              <h2 className="testimonial-form-title">
                Share Your Story
              </h2>

              <div className="testimonial-form-card">

                <form>

                  <div className="mb-4">

                    <label className="form-label">
                      Name
                    </label>

                    <input
                      type="text"
                      className="form-control testimonial-input"
                      placeholder="Your name"
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control testimonial-input"
                      placeholder="Your email"
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label">
                      Testimonial
                    </label>

                    <textarea
                      rows="6"
                      className="form-control testimonial-input"
                      placeholder="Share your experience..."
                    ></textarea>

                  </div>

                  <div className="text-center">

                    <button
                      type="submit"
                      className="testimonial-submit-btn"
                    >
                      Submit Testimonial
                    </button>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
};

export default Testimonial;