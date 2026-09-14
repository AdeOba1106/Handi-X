"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const headlines = [
  { text: "needs to be", highlight: "heard." },
  { text: "needs to be", highlight: "seen." },
  { text: "should have an", highlight: "identity." },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % headlines.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const activeHeadline = headlines[activeIndex];

  return (
    <section className="relative flex items-center overflow-hidden bg-[#f9f9f9] pb-8 pt-24 sm:pb-12 sm:pt-28 lg:min-h-[100svh] lg:pb-16 lg:pt-32">
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-20 top-1/4 h-48 w-48 rounded-full bg-[#05cde5]/10 blur-[80px] sm:h-64 sm:w-64" />
        <div className="absolute -right-20 bottom-1/4 h-56 w-56 rounded-full bg-[#0b1020]/5 blur-[90px] sm:h-72 sm:w-72" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-14 xl:px-20">
        <div className="mx-auto max-w-[980px] text-center">
          {/* Animated heading */}
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sora mx-auto max-w-[930px] text-[clamp(2.25rem,6vw,5rem)] font-semibold leading-[1.1] tracking-[-0.045em] text-[#0b1020]"
          >
            <span className="sr-only">
              Every business needs to be heard, needs to be seen, and should
              have an identity.
            </span>

            <span aria-hidden="true" className="block">
              <span className="block">Every business</span>

              {/* Keep the heading height stable as the text changes */}
              <span className="relative mt-1 grid">
                {headlines.map((headline) => (
                  <span
                    key={headline.highlight}
                    className="invisible col-start-1 row-start-1 block pb-2"
                  >
                    {headline.text}{" "}
                    <span className="inline-block">
                      {headline.highlight}
                    </span>
                  </span>
                ))}

                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={activeIndex}
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 18,
                    }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: reduceMotion ? 0 : -18,
                    }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.35,
                      ease: "easeOut",
                    }}
                    className="absolute inset-x-0 top-0 block"
                  >
                    {activeHeadline.text}{" "}
                    <span className="relative inline-block text-[#05cde5]">
                      {activeHeadline.highlight}
                      <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#05cde5]/25 sm:h-1" />
                    </span>
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.h1>

          {/* Main text */}
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-poppins mx-auto mt-5 max-w-[700px] text-pretty text-sm leading-7 text-[#0b1020]/65 sm:mt-6 sm:text-base sm:leading-8 md:text-[17px]"
          >
            What brightens the day for every founder is being able to reach
            the right audience — people who understand what is being built.
            Handi-X exists to bring that to life.
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="font-poppins mx-auto mt-3 max-w-[640px] text-pretty text-sm leading-7 text-[#0b1020]/65 sm:text-base sm:leading-8 md:text-[17px]"
          >
            We help tell the story of your brand in the most captivating way.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mx-auto mt-6 grid w-full max-w-[430px] grid-cols-2 gap-3 sm:mt-9"
          >
            <a
              href="#contact"
              className="font-sora group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0b1020] px-3 py-3 text-xs font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#05cde5] hover:text-[#0b1020] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1020] motion-reduce:transform-none sm:px-6 sm:text-sm"
            >
              Start a Project
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </a>

            <a
              href="#portfolio"
              className="font-sora inline-flex min-h-12 items-center justify-center rounded-xl border border-[#0b1020]/15 bg-white/70 px-3 py-3 text-xs font-semibold text-[#0b1020] transition duration-300 hover:-translate-y-0.5 hover:border-[#05cde5]/60 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0b1020] motion-reduce:transform-none sm:px-6 sm:text-sm"
            >
              View Our Work
            </a>
          </motion.div>

          {/* Services */}
          <motion.ul
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="font-poppins mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-[#0b1020]/60 sm:mt-8 sm:gap-x-6 sm:text-xs"
          >
            {[
              "Brand Strategy",
              "Creative Services",
              "Web Development",
            ].map((service) => (
              <li
                key={service}
                className="inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span
                  aria-hidden="true"
                  className="h-1 w-1 shrink-0 rounded-full bg-[#05cde5]"
                />
                {service}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;