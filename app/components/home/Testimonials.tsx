"use client";

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
      "This training made me really understand how to design and think like a designer. The training periods were awesome, and I never have any regrets joining. If it is possible, I would like to register again.",
    name: "Ayodeji Somotun",
    role: "Graphic Design Training Participant",
    service: "Handi-X Academy",
    initials: "AS",
  },
];

const Testimonials = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-20 overflow-hidden bg-[#edf1f2] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1040px] px-5 sm:px-8 lg:px-10">
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

        <div className="grid grid-cols-2 items-stretch gap-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                delay: reduceMotion ? 0 : index * 0.05,
              }}
              className="flex h-[240px] min-w-0 flex-col justify-between overflow-hidden rounded-[1rem] bg-[#0b1020] p-3 text-white shadow-[0_8px_26px_rgba(11,16,32,0.08)] transition-transform duration-300 hover:-translate-y-1 sm:h-[225px] sm:rounded-[1.15rem] sm:p-5 lg:h-[235px]"
            >
              <div className="min-w-0">
                <div className="flex min-w-0 items-start justify-between gap-2">
                  <span className="font-poppins min-w-0 flex-1 whitespace-normal break-words line-clamp-2 text-[8px] font-medium uppercase leading-3 tracking-[0.1em] text-[#05cde5] sm:text-[10px] sm:tracking-[0.14em]">
                    {testimonial.service}
                  </span>

                  <Quote
                    size={21}
                    strokeWidth={1.3}
                    aria-hidden="true"
                    className="shrink-0 text-white/25"
                  />
                </div>

                <blockquote className="font-sora mt-3 whitespace-normal break-words line-clamp-5 overflow-hidden text-[11px] font-medium leading-5 tracking-[-0.02em] text-white/95 sm:mt-4 sm:text-sm sm:leading-6">
                  “{testimonial.quote}”
                </blockquote>
              </div>

              <footer className="mt-3 flex min-h-[45px] min-w-0 items-center gap-2 border-t border-white/10 pt-2.5 sm:mt-5 sm:gap-2.5 sm:pt-3">
                <div
                  aria-hidden="true"
                  className="font-sora flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[9px] font-medium text-[#05cde5] sm:h-8 sm:w-8 sm:text-[10px]"
                >
                  {testimonial.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-sora whitespace-normal break-words line-clamp-1 text-[10px] font-medium leading-4 sm:text-xs">
                    {testimonial.name}
                  </p>

                  <p className="font-poppins mt-0.5 whitespace-normal break-words line-clamp-2 text-[8px] leading-4 text-white/50 sm:text-[11px] sm:leading-4">
                    {testimonial.role}
                  </p>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;