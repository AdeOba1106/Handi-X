"use client";

import {
  PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";

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
    quote:
      "This training made me really understand how to design and think like a designer. The training periods were awesome, and I never have any regrets joining.",
    name: "Ayodeji Somotun",
    role: "Graphic Design Training Participant",
    service: "Handi-X Academy",
    initials: "AS",
  },
];

/*
  Three copies allow us to begin in the middle copy.

  When the user reaches either outside copy,
  we silently move them back to the equivalent
  position in the middle copy.
*/
const infiniteTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

const Testimonials = () => {
  const reduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const hasFocus = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  /*
    Start from the middle group.
  */
  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const positionInMiddle = () => {
      const oneSetWidth = carousel.scrollWidth / 3;

      carousel.scrollLeft = oneSetWidth;
    };

    /*
      Wait for layout calculation.
    */
    const frame = requestAnimationFrame(positionInMiddle);

    window.addEventListener("resize", positionInMiddle);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", positionInMiddle);
    };
  }, []);

  /*
    Advance one card at a time. Pause while the user is interacting
    and respect their reduced-motion preference.
  */
  useEffect(() => {
    if (reduceMotion || isPaused) return;

    const interval = window.setInterval(() => {
      const carousel = carouselRef.current;
      const firstCard = carousel?.querySelector<HTMLElement>(
        "[data-testimonial-card]",
      );

      if (
        !carousel ||
        !firstCard ||
        isDragging.current ||
        isHovering.current ||
        hasFocus.current
      ) {
        return;
      }

      const gap = parseFloat(window.getComputedStyle(carousel).columnGap) || 0;
      carousel.scrollBy({
        left: firstCard.offsetWidth + gap,
        behavior: "smooth",
      });
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused, reduceMotion]);

  /*
    Infinite-loop logic.
  */
  const handleScroll = () => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const oneSetWidth = carousel.scrollWidth / 3;

    /*
      Entered first copy.
      Move to same position in middle copy.
    */
    if (carousel.scrollLeft < oneSetWidth * 0.45) {
      carousel.scrollLeft += oneSetWidth;
    }

    /*
      Entered third copy.
      Move back to same position in middle copy.
    */
    if (carousel.scrollLeft > oneSetWidth * 1.55) {
      carousel.scrollLeft -= oneSetWidth;
    }
  };

  /*
    Desktop mouse / pointer dragging.
  */
  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    isDragging.current = true;
    hasDragged.current = false;

    dragStartX.current = event.clientX;
    dragStartScrollLeft.current = carousel.scrollLeft;

    carousel.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const carousel = carouselRef.current;

    if (!carousel || !isDragging.current) return;

    const difference = event.clientX - dragStartX.current;

    if (Math.abs(difference) > 4) {
      hasDragged.current = true;
    }

    carousel.scrollLeft =
      dragStartScrollLeft.current - difference;
  };

  const handlePointerEnd = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    isDragging.current = false;

    if (carousel.hasPointerCapture(event.pointerId)) {
      carousel.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="overflow-hidden bg-[#f9f9f9] py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1080px] px-5 sm:px-7 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#0b1020]/10 pb-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2.5 flex items-center gap-2">
              <span className="h-px w-5 bg-[#05cde5]" />

              <span className="font-poppins text-[9px] font-semibold uppercase tracking-[0.2em] text-[#0b1020]/45 sm:text-[10px]">
                Testimonials
              </span>
            </div>

            <h2
              id="testimonials-heading"
              className="font-sora max-w-[480px] text-[clamp(1.65rem,3.5vw,2.65rem)] font-semibold leading-[1.07] tracking-[-0.05em] text-[#0b1020]"
            >
              Don&apos;t take our word for it.
            </h2>
          </div>

          <p className="font-poppins max-w-[285px] text-[12px] leading-5 text-[#0b1020]/50 sm:text-[13px]">
            Real experiences from people who have worked, learned and built
            with Handi-X.
          </p>
        </div>

        {/* Infinite carousel */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          onMouseEnter={() => {
            isHovering.current = true;
          }}
          onMouseLeave={() => {
            isHovering.current = false;
          }}
          onFocusCapture={() => {
            hasFocus.current = true;
          }}
          onBlurCapture={(event) => {
            const nextTarget = event.relatedTarget as Node | null;
            if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
              hasFocus.current = false;
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerLeave={(event) => {
            if (isDragging.current) {
              handlePointerEnd(event);
            }
          }}
          className="
            -mr-5 flex cursor-grab select-none
            snap-x snap-mandatory gap-3
            overflow-x-auto overscroll-x-contain
            pr-5 pb-2
            active:cursor-grabbing
            sm:-mr-7 sm:pr-7
            lg:-mr-8 lg:pr-8
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
          aria-live="off"
        >
          {infiniteTestimonials.map((testimonial, index) => (
            <motion.article
              data-testimonial-card
              key={`${testimonial.id}-${index}`}
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
              }}
              className="
                flex min-h-[255px]
                w-[82%] shrink-0 snap-start
                flex-col justify-between
                rounded-[1rem]
                border border-[#0b1020]/[0.08]
                bg-white p-5

                sm:min-h-[250px]
                sm:w-[48%]

                lg:min-h-[240px]
                lg:w-[31.5%]

                transition-[border-color,box-shadow,transform]
                duration-300
                hover:-translate-y-[2px]
                hover:border-[#0b1020]/15
                hover:shadow-[0_10px_28px_rgba(11,16,32,0.04)]
              "
            >
              <div>
                {/* Card top */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-poppins text-[8px] font-semibold uppercase tracking-[0.15em] text-[#05aabd]">
                      {testimonial.service}
                    </span>

                    <div className="mt-2 h-px w-7 bg-[#05cde5]" />
                  </div>

                  <Quote
                    size={14}
                    strokeWidth={1.25}
                    className="shrink-0 text-[#0b1020]/15"
                  />
                </div>

                {/* Quote */}
                <blockquote className="font-sora mt-5 text-[13px] font-medium leading-[1.62] tracking-[-0.018em] text-[#0b1020] sm:text-[13px]">
                  “{testimonial.quote}”
                </blockquote>
              </div>

              {/* Footer */}
              <footer className="mt-5 flex items-end justify-between gap-3 border-t border-[#0b1020]/[0.07] pt-3.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="font-sora flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b1020] text-[8px] font-semibold text-[#05cde5]">
                    {testimonial.initials}
                  </div>

                  <div className="min-w-0">
                    <p className="font-sora text-[10px] font-semibold text-[#0b1020] sm:text-[11px]">
                      {testimonial.name}
                    </p>

                    <p className="font-poppins mt-0.5 line-clamp-1 text-[8px] text-[#0b1020]/45 sm:text-[9px]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <span className="font-sora shrink-0 text-[8px] text-[#0b1020]/25">
                  {testimonial.id}
                </span>
              </footer>
            </motion.article>
          ))}
        </div>

        {/* Auto-scroll control */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-poppins text-[9px] font-medium uppercase tracking-[0.14em] text-[#0b1020]/45 sm:text-[10px]">
              {reduceMotion
                ? "Auto-scroll off"
                : isPaused
                  ? "Auto-scroll paused"
                  : "Auto-scroll every 5 seconds"}
            </p>
            <p className="font-poppins mt-1 text-[9px] text-[#0b1020]/35 sm:text-[10px]">
              Drag or swipe to explore
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            disabled={Boolean(reduceMotion)}
            aria-pressed={!isPaused && !reduceMotion}
            aria-label={
              reduceMotion
                ? "Auto-scroll disabled by reduced-motion preference"
                : isPaused
                  ? "Resume auto-scroll"
                  : "Pause auto-scroll"
            }
            className="rounded-full border border-[#0b1020]/15 px-4 py-2 font-poppins text-[10px] font-medium text-[#0b1020] transition hover:border-[#05cde5] hover:bg-[#05cde5]/10 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] focus-visible:ring-offset-2"
          >
            {reduceMotion ? "Motion reduced" : isPaused ? "Play" : "Pause"}
          </button>
        </div>

        {/* Bottom note */}
        <div className="mt-5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#05cde5]" />

          <p className="font-poppins text-[8px] uppercase tracking-[0.15em] text-[#0b1020]/35 sm:text-[9px]">
            Built on experiences. Backed by results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
