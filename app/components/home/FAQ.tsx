"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What does Handi-X help businesses with?",
    answer:
      "We help businesses become clearer, more memorable, and easier to trust through brand strategy, visual identity, web design and development, digital marketing, and video production.",
  },
  {
    question: "Do you work with small businesses and startups?",
    answer:
      "Yes. We work with startups, growing businesses, personal brands, churches, and organisations at different stages. We can start with what your business needs most and build from there.",
  },
  {
    question: "What is Brand Xperience?",
    answer:
      "Brand Xperience is the way people encounter and remember your brand. It covers the visual details, content, communication, website, and customer touchpoints that shape how your business feels.",
  },
  {
    question: "Do you offer video production?",
    answer:
      "Yes. Video production is one of our major service areas. We create promotional videos, social media content, event coverage, brand stories, and other visual content that helps businesses communicate better.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Timelines depend on the type and size of the project. After understanding your goals, we will explain the scope, milestones, and expected delivery timeline before work begins.",
  },
  {
    question: "Do you provide training and mentorship?",
    answer:
      "Yes. Through Handi-X Academy, we provide practical digital-skills training, mentorship, and learning experiences designed to help people build useful skills and apply them confidently.",
  },
  {
    question: "How can I start working with Handi-X?",
    answer:
      "Send us a message with a brief description of your business, what you need help with, and your goals. We will review it and guide you toward the right next step.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-20 bg-[#f9f9f9] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1120px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-poppins mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#0b1020]/55 sm:text-xs">
            FAQ
          </p>

          <h2
            id="faq-heading"
            className="font-sora max-w-[360px] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-[#0b1020]"
          >
            Questions, answered.
          </h2>

          <p className="font-poppins mt-5 max-w-[340px] text-sm leading-6 text-[#0b1020]/60 sm:mt-6">
            A few things people usually want to know before getting started with
            Handi-X.
          </p>

          <a
            href="#contact"
            className="group font-poppins mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#0b1020] transition-colors hover:text-[#05cde5] sm:mt-9"
          >
            Still have a question?
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0b1020] text-[#05cde5] transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </a>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                  isOpen
                    ? "border-[#05cde5] bg-white"
                    : "border-[#0b1020]/10 bg-white/60 hover:border-[#0b1020]/25"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="font-sora flex w-full items-center justify-between gap-5 px-5 py-5 text-left text-sm font-medium text-[#0b1020] sm:px-6 sm:py-6 sm:text-base"
                >
                  <span className="flex items-start gap-4">
                    <span className="font-poppins pt-0.5 text-[10px] font-medium tracking-[0.12em] text-[#05cde5] sm:text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{faq.question}</span>
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#0b1020] text-[#05cde5]"
                        : "bg-[#0b1020]/5 text-[#0b1020]"
                    }`}
                  >
                    <ChevronDown
                      size={17}
                      aria-hidden="true"
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="font-poppins max-w-[680px] px-5 pb-5 pl-[4.25rem] text-sm leading-6 text-[#0b1020]/60 sm:px-6 sm:pb-6 sm:pl-[4.75rem]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
