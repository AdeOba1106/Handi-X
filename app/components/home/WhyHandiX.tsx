"use client";

import { motion, useReducedMotion } from "framer-motion";

const reasons = [
  {
    number: "01",
    title: "Practical",
    text: "Useful skills and clear thinking.",
  },
  {
    number: "02",
    title: "Purposeful",
    text: "Work shaped around a real goal.",
  },
  {
    number: "03",
    title: "Human",
    text: "Guidance, feedback, and collaboration.",
  },
];

export default function WhyHandiX() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="why-us"
      aria-labelledby="why-handi-x-heading"
      className="scroll-mt-24 overflow-hidden border-t border-[#0b1020]/10 bg-white py-11 text-[#0b1020] sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8"
        >
          <div className="max-w-[650px]">
            <p className="font-poppins inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0b1020]/50">
              <span className="h-px w-6 bg-[#05cde5]" />
              Why Handi-X
            </p>

            <h2
              id="why-handi-x-heading"
              className="font-sora mt-3 text-[clamp(1.9rem,7vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-[#0b1020]"
            >
              Built around real people.
              <span className="block text-[#0b1020]/35">
                Real possibilities.
              </span>
            </h2>
          </div>

          <p className="font-poppins max-w-[280px] text-[13px] leading-5 text-[#0b1020]/55 sm:pb-1">
            Practical learning and purposeful creativity for people and
            businesses building what comes next.
          </p>
        </motion.header>

        <div className="mt-7 grid border-y border-[#0b1020]/15 md:mt-10 md:grid-cols-3 md:divide-x md:divide-[#0b1020]/15">
          {reasons.map((reason, index) => (
            <motion.article
              key={reason.number}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : index * 0.05,
              }}
              className="flex gap-4 border-b border-[#0b1020]/15 py-4 last:border-b-0 md:block md:border-b-0 md:px-6 md:py-5 md:first:pl-0 md:last:pr-0"
            >
              <span className="font-poppins w-7 shrink-0 pt-0.5 text-[10px] font-semibold tracking-[0.14em] text-[#05cde5]">
                {reason.number}
              </span>

              <div>
                <h3 className="font-sora text-base font-semibold tracking-[-0.03em] text-[#0b1020] sm:text-lg">
                  {reason.title}
                </h3>

                <p className="font-poppins mt-1 text-[12px] leading-5 text-[#0b1020]/50">
                  {reason.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}