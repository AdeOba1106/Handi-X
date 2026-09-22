"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  { number: "01", title: "Listen", text: "Understand the goal." },
  { number: "02", title: "Direct", text: "Set the right path." },
  { number: "03", title: "Build", text: "Create and refine." },
  {
    number: "04",
    title: "Move forward",
    text: "Leave with something useful.",
  },
];

export default function Process() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-24 overflow-hidden bg-[#f9f9f9] py-9 sm:py-14 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
          className="flex items-end justify-between gap-3 border-b border-[#0b1020]/15 pb-4 sm:gap-8 sm:pb-5"
        >
          <div>
            <p className="font-poppins inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0b1020]/50">
              <span className="h-px w-6 bg-[#05cde5]" />
              How we work
            </p>

            <h2
              id="process-heading"
              className="font-sora mt-2.5 text-[clamp(1.75rem,8vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-[#0b1020] sm:mt-3"
            >
              Simple from start to finish.
            </h2>
          </div>

          <p className="font-poppins hidden max-w-[245px] pb-1 text-[13px] leading-5 text-[#0b1020]/55 sm:block">
            A clear path keeps the work focused and intentional.
          </p>
        </motion.header>

        <div className="mt-5 grid grid-cols-2 border-t border-[#0b1020]/15 md:mt-8 md:grid-cols-4 md:divide-x md:divide-[#0b1020]/15">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion ? 0 : index * 0.05,
              }}
              className="min-w-0 border-b border-[#0b1020]/15 py-3 pr-2 even:pl-3 odd:border-r odd:border-[#0b1020]/15 md:border-b-0 md:px-5 md:py-4 md:first:pl-0 md:last:pr-0 md:odd:border-r-0"
            >
              <span className="font-poppins text-[10px] font-semibold tracking-[0.14em] text-[#05cde5]">
                {step.number}
              </span>

              <h3 className="font-sora mt-3 max-w-[130px] text-[15px] font-semibold leading-tight tracking-[-0.03em] text-[#0b1020] sm:text-base md:mt-7 md:max-w-[160px] md:text-lg">
                {step.title}
              </h3>

              <p className="font-poppins mt-1 text-[11px] leading-[1.4] text-[#0b1020]/50 sm:text-[12px] sm:leading-5">
                {step.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}