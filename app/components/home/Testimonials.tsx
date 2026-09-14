"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  Quote,
} from "lucide-react";

// Replace each placeholder below with real client or learner feedback.
// Add more objects to create additional testimonial cards.
const testimonials = [
  {
    id: "01",
    quote: "Paste your client’s actual feedback here.",
    name: "Client full name",
    role: "Founder, Business Name",
    service: "Brand Xperience",
    initials: "CN",
  },
  {
    id: "02",
    quote: "Paste feedback about your branding or identity work here.",
    name: "Client full name",
    role: "Role, Company Name",
    service: "Brand Architecture",
    initials: "CN",
  },
  {
    id: "03",
    quote: "Paste feedback about your brand strategy service here.",
    name: "Client full name",
    role: "Role, Company Name",
    service: "Brand Strategy",
    initials: "CN",
  },
  {
    id: "04",
    quote: "Paste a participant’s actual feedback about your training here.",
    name: "Participant full name",
    role: "Graphic Design Training Participant",
    service: "Handi-X Academy",
    initials: "PN",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);

  const reduceMotion = useReducedMotion();
  const activeTestimonial = testimonials[activeIndex];

  const isPlaying =
    !reduceMotion &&
    !isPaused &&
    !isHovered &&
    !isFocused &&
    isPageVisible;

  const changeSlide = (step: number) => {
    setDirection(step);
    setActiveIndex(
      (previous) =>
        (previous + step + testimonials.length) % testimonials.length,
    );
  };

  const selectSlide = (index: number) => {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  useEffect(() => {
    const handleVisibility = () => {
      setIsPageVisible(!document.hidden);
    };

    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const timeout = window.setTimeout(() => {
      setDirection(1);
      setActiveIndex((previous) => (previous + 1) % testimonials.length);
    }, 6000);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, isPlaying]);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-20 overflow-hidden bg-[#edf1f2] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Introduction */}
        <div className="mb-7 flex flex-col gap-3 sm:mb-9 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="font-poppins mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#0b1020]/55 sm:text-xs">
              Testimonials
            </p>

            <h2
              id="testimonials-heading"
              className="font-sora text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight tracking-[-0.045em] text-[#0b1020]"
            >
              In their own words.
            </h2>
          </div>

          <p className="font-poppins max-w-[280px] text-xs leading-6 text-[#0b1020]/60 sm:text-sm">
            Experiences from the people and brands we work with.
          </p>
        </div>

        {/* Carousel */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsFocused(false);
            }
          }}
          className="overflow-hidden rounded-2xl bg-[#0b1020] p-5 text-white sm:p-8 lg:px-10"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <span className="font-poppins text-[10px] font-medium uppercase tracking-[0.14em] text-[#05cde5] sm:text-xs">
              {activeTestimonial.service}
            </span>

            <Quote
              size={26}
              strokeWidth={1.3}
              aria-hidden="true"
              className="shrink-0 text-white/25"
            />
          </div>

          <div
            aria-live={isPlaying ? "off" : "polite"}
            aria-atomic="true"
            className="grid"
          >
            {/* Reserve space so different quote lengths do not shift the layout */}
            {testimonials.map((testimonial) => (
              <div
                key={`measure-${testimonial.id}`}
                aria-hidden="true"
                className="invisible col-start-1 row-start-1 min-w-0"
              >
                <p className="font-sora max-w-[880px] break-words text-[clamp(1.15rem,2.5vw,2rem)] font-medium leading-[1.55] tracking-[-0.025em]">
                  “{testimonial.quote}”
                </p>

                <div className="mt-6 flex items-center gap-3 sm:mt-8">
                  <div className="h-11 w-11 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-sora break-words text-xs font-medium sm:text-sm">
                      {testimonial.name}
                    </p>
                    <p className="font-poppins mt-1 break-words text-[11px] sm:text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={activeTestimonial.id}
                custom={direction}
                variants={{
                  enter: (slideDirection: number) => ({
                    opacity: 0,
                    x: reduceMotion ? 0 : slideDirection * 28,
                  }),
                  visible: { opacity: 1, x: 0 },
                  exit: (slideDirection: number) => ({
                    opacity: 0,
                    x: reduceMotion ? 0 : slideDirection * -28,
                  }),
                }}
                initial="enter"
                animate="visible"
                exit="exit"
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  ease: "easeOut",
                }}
                drag={reduceMotion ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) changeSlide(1);
                  else if (info.offset.x > 50) changeSlide(-1);
                }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${activeIndex + 1} of ${testimonials.length}`}
                className="col-start-1 row-start-1 min-w-0 touch-pan-y"
              >
                <figure>
                  <blockquote className="font-sora max-w-[880px] break-words text-[clamp(1.15rem,2.5vw,2rem)] font-medium leading-[1.55] tracking-[-0.025em]">
                    <p>“{activeTestimonial.quote}”</p>
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3 sm:mt-8">
                    <div
                      aria-hidden="true"
                      className="font-sora flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-[#05cde5]"
                    >
                      {activeTestimonial.initials}
                    </div>

                    <div className="min-w-0">
                      <p className="font-sora break-words text-xs font-medium sm:text-sm">
                        {activeTestimonial.name}
                      </p>
                      <p className="font-poppins mt-1 break-words text-[11px] text-white/55 sm:text-xs">
                        {activeTestimonial.role}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-white/10 pt-3 sm:mt-8">
            <div className="flex flex-wrap items-center">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => selectSlide(index)}
                  aria-label={`Show testimonial ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  className="flex h-11 w-8 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-[#05cde5]"
                >
                  <span
                    aria-hidden="true"
                    className={`h-1 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none ${
                      activeIndex === index
                        ? "w-6 bg-[#05cde5]"
                        : "w-2 bg-white/30"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {!reduceMotion && (
                <button
                  type="button"
                  onClick={() => setIsPaused((previous) => !previous)}
                  aria-label={
                    isPaused
                      ? "Enable automatic rotation"
                      : "Pause automatic rotation"
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-full text-white/65 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#05cde5]"
                >
                  {isPaused ? (
                    <Play size={16} aria-hidden="true" />
                  ) : (
                    <Pause size={16} aria-hidden="true" />
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={() => changeSlide(-1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-[#05cde5] hover:text-[#05cde5] focus-visible:outline-2 focus-visible:outline-[#05cde5]"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => changeSlide(1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-[#05cde5] hover:text-[#05cde5] focus-visible:outline-2 focus-visible:outline-[#05cde5]"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;