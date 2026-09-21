"use client";

import { motion, useReducedMotion } from "framer-motion";

const stats = [
  {
    value: "30+",
    label: "Clients supported",
  },
  {
    value: "100+",
    label: "Students trained",
  },
];

export default function ImpactStats() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Handi-X impact"
      className="relative bg-[#f9f9f9] px-5 py-8 sm:px-8 sm:py-10 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="relative overflow-hidden border-y border-[#0b1020]/10">
          <motion.span
            aria-hidden="true"
            initial={{ width: 0 }}
            whileInView={{ width: "28%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute left-0 top-0 h-px bg-[#05cde5]"
          />

          <div className="flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:py-7">
            <div className="flex items-start gap-3">
              <motion.span
                aria-hidden="true"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.35, 1],
                        opacity: [0.55, 1, 0.55],
                      }
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#05cde5]"
              />

              <div>
                <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0b1020]/55">
                  Our growing impact
                </p>

                <p className="font-poppins mt-1.5 max-w-xs text-xs leading-5 text-[#0b1020]/55 sm:text-sm">
                  Built through real work, shared knowledge, and meaningful
                  progress.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-[#0b1020]/10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: reduceMotion ? 0 : index * 0.1,
                  }}
                  className="min-w-0 px-5 first:pl-0 last:pr-0 sm:min-w-[150px] sm:px-8"
                >
                  <p className="font-sora text-3xl font-semibold leading-none tracking-[-0.07em] text-[#0b1020] sm:text-4xl">
                    {stat.value}
                  </p>

                  <p className="font-poppins mt-2 text-[9px] uppercase tracking-[0.12em] text-[#0b1020]/50 sm:text-[10px]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}