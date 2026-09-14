"use client";

import { useId, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
} from "lucide-react";

const CONTACT_EMAIL = "hello@example.com";

const serviceOptions = [
  "Brand Xperience",
  "Brand Architecture",
  "Brand Strategy",
  "Handi-X Academy",
  "Something else",
];

export default function Contact() {
  const componentId = useId();
  const reduceMotion = useReducedMotion();

  const [selectedService, setSelectedService] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setStatus("Email address copied.");
    } catch {
      setStatus(`You can email us at ${CONTACT_EMAIL}.`);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("Please complete your name, email and message.");
      return;
    }

    const subject = `${selectedService || "New enquiry"} — ${name}`;
    const body = [
      "Hello Handi-X,",
      "",
      message,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Interested in: ${selectedService || "Not specified"}`,
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setStatus(
      "Your email app should open with a draft. Send it there to complete your enquiry.",
    );
  }

  const inputClass =
    "font-poppins block w-full min-w-0 rounded-xl border border-[#0b1020]/15 bg-white px-3.5 py-3 text-base leading-6 text-[#0b1020] outline-none transition-colors placeholder:text-[#0b1020]/40 hover:border-[#0b1020]/30 focus:border-[#087987] focus:ring-2 focus:ring-[#05cde5]/15";

  const labelClass =
    "font-poppins mb-2 block text-xs font-medium text-[#0b1020]/80";

  return (
    <section
      id="contact"
      aria-labelledby={`${componentId}-heading`}
      className="scroll-mt-24 overflow-hidden bg-[#0b1020] py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8 lg:px-12">
        {/* Section label */}
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/15 pb-4 sm:mb-8">
          <p className="font-poppins flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#05cde5] sm:text-[11px]">
            <span className="h-px w-5 bg-[#05cde5]" />
            Contact us
          </p>

          <span className="font-poppins hidden text-[10px] tracking-wide text-white/45 sm:block">
            Good things start with a conversation.
          </span>
        </div>

        <div className="grid items-start gap-7 sm:gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-16">
          {/* Introduction and direct contact */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4 }}
            className="min-w-0 lg:py-3"
          >
            <h2
              id={`${componentId}-heading`}
              className="font-sora max-w-lg text-[32px] font-semibold leading-[1.1] tracking-[-0.05em] text-[#f9f9f9] sm:text-[42px] lg:text-[48px]"
            >
              Your next chapter
              <br />
              <span className="text-[#05cde5]">starts here.</span>
            </h2>

            <p className="font-poppins mt-4 max-w-[370px] text-[13px] leading-6 text-white/65 sm:text-sm sm:leading-7">
              Have something in mind? Tell us about your brand, your project
              or the skill you want to learn.
            </p>

            <div className="mt-5 flex items-center gap-3 sm:mt-7">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#05cde5]/25 text-[#05cde5]"
              >
                <ArrowUpRight size={17} strokeWidth={1.5} />
              </span>

              <p className="font-poppins text-xs leading-5 text-white/70">
                You don’t need a perfect brief.
                <br />
                Just a place to start.
              </p>
            </div>

            <div className="mt-6 max-w-[400px] rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3.5 sm:mt-9 sm:p-5">
              <p className="font-poppins text-[10px] font-medium uppercase tracking-[0.15em] text-white/45">
                Write to us directly
              </p>

              <div className="mt-1 flex min-w-0 items-center gap-2">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-sora inline-flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-sm text-[15px] font-medium text-white transition-colors hover:text-[#05cde5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] sm:text-lg"
                >
                  <span className="break-all">{CONTACT_EMAIL}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={16}
                    className="shrink-0 text-[#05cde5]"
                  />
                </a>

                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  title="Copy email address"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white/55 transition-colors hover:bg-white/5 hover:text-[#05cde5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5]"
                >
                  {copied ? (
                    <Check aria-hidden="true" size={16} />
                  ) : (
                    <Copy aria-hidden="true" size={15} />
                  )}
                </button>
              </div>

              <div className="mt-2 flex items-center gap-2 border-t border-white/10 pt-3">
                <MapPin
                  aria-hidden="true"
                  size={13}
                  strokeWidth={1.5}
                  className="shrink-0 text-[#05cde5]/80"
                />
                <span className="font-poppins text-[11px] text-white/55">
                  Ogbomoso, Nigeria
                </span>
              </div>
            </div>
          </motion.div>

          {/* Light form panel */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4 }}
            className="min-w-0 overflow-hidden rounded-2xl bg-[#f9f9f9] p-4 sm:rounded-[22px] sm:p-6 lg:p-7"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-sora text-lg font-semibold tracking-tight text-[#0b1020] sm:text-xl">
                  Let’s hear your idea.
                </h3>

                <p className="font-poppins mt-1 text-[11px] leading-5 text-[#0b1020]/60 sm:text-xs">
                  A few details to get the conversation going.
                </p>
              </div>

              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b1020] text-[#05cde5]"
              >
                <Mail size={16} strokeWidth={1.5} />
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <fieldset className="min-w-0">
                <legend className={labelClass}>
                  I’m interested in
                </legend>

                <div className="grid grid-cols-2 gap-2 min-[480px]:flex min-[480px]:flex-wrap">
                  {serviceOptions.map((service) => {
                    const isSelected = selectedService === service;

                    return (
                      <label
                        key={service}
                        className="min-w-0 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="service"
                          value={service}
                          checked={isSelected}
                          onChange={() => setSelectedService(service)}
                          className="peer sr-only"
                        />

                        <span
                          className={`font-poppins flex min-h-11 items-center justify-center rounded-lg border px-2.5 py-2 text-center text-[11px] font-medium leading-4 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#087987] peer-focus-visible:ring-offset-2 min-[480px]:rounded-full min-[480px]:px-3.5 ${
                            isSelected
                              ? "border-[#0b1020] bg-[#0b1020] text-[#05cde5]"
                              : "border-[#0b1020]/15 bg-transparent text-[#0b1020]/65 hover:border-[#0b1020]/40 hover:text-[#0b1020]"
                          }`}
                        >
                          {service}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid min-w-0 gap-4 min-[560px]:grid-cols-2">
                <div className="min-w-0">
                  <label
                    htmlFor={`${componentId}-name`}
                    className={labelClass}
                  >
                    Your name
                  </label>

                  <input
                    id={`${componentId}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Full name"
                    required
                    maxLength={100}
                    className={inputClass}
                  />
                </div>

                <div className="min-w-0">
                  <label
                    htmlFor={`${componentId}-email`}
                    className={labelClass}
                  >
                    Email address
                  </label>

                  <input
                    id={`${componentId}-email`}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="you@example.com"
                    required
                    maxLength={254}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="min-w-0">
                <label
                  htmlFor={`${componentId}-message`}
                  className={labelClass}
                >
                  A little about your idea
                </label>

                <textarea
                  id={`${componentId}-message`}
                  name="message"
                  rows={3}
                  required
                  maxLength={1500}
                  placeholder="What would you like to create, improve or learn?"
                  className={`${inputClass} min-h-[112px] resize-y`}
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-[#0b1020]/10 pt-4 min-[560px]:flex-row min-[560px]:items-center min-[560px]:justify-between">
                <p className="font-poppins max-w-[220px] text-[10px] leading-5 text-[#0b1020]/60 sm:text-[11px]">
                  Opens an email draft for you to review and send.
                </p>

                <button
                  type="submit"
                  className="font-poppins group inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-[#0b1020] px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#19263c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087987] focus-visible:ring-offset-2 min-[560px]:w-auto"
                >
                  Start a conversation
                  <ArrowUpRight
                    aria-hidden="true"
                    size={17}
                    className="text-[#05cde5] transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                  />
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="font-poppins mt-4 text-xs leading-6 text-[#05cde5] empty:hidden"
        >
          {status}
        </p>
      </div>
    </section>
  );
}