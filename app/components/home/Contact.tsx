"use client";

import Script from "next/script";
import {
  useId,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  MessageCircle,
  MapPin,
} from "lucide-react";

const CONTACT_EMAIL = "heyhandix@gmail.com";
// WhatsApp requires the country code and digits only, without + or spaces.
const WHATSAPP_NUMBER = "2347051925253";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// Replace this entire URL with your 30-minute Calendly event's booking link.
const CALENDLY_URL = "https://calendly.com/heyhandix/30min";

type CalendlyWindow = Window & {
  Calendly?: {
    initPopupWidget: (options: { url: string }) => void;
  };
};

const serviceOptions = [
  "Brand Xperience",
  "Brand Architecture",
  "Brand Strategy",
  "Handi-X Academy",
  "Something else",
];

export default function Contact() {
  const componentId = useId();
  const calendlyStylesRef = useRef<HTMLLinkElement>(null);
  const reduceMotion = useReducedMotion();

  const [selectedService, setSelectedService] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");

  function openCalendly(event: MouseEvent<HTMLAnchorElement>) {
    // Preserve normal browser actions such as Ctrl/Cmd-click.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const calendly = (window as CalendlyWindow).Calendly;

    // If the popup resources are unavailable, the booking link still
    // opens Calendly in a new tab.
    if (!calendly?.initPopupWidget || !calendlyStylesRef.current?.sheet) {
      return;
    }

    event.preventDefault();
    calendly.initPopupWidget({ url: CALENDLY_URL });
  }

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

    const body = [
      "Hello Handi-X,",
      "",
      message,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Interested in: ${selectedService || "Not specified"}`,
    ].join("\n");

    setStatus(
      "Continue in WhatsApp to review your message and tap Send.",
    );

    window.location.assign(`${WHATSAPP_URL}?text=${encodeURIComponent(body)}`);
  }

  const inputClass =
    "font-poppins block w-full min-w-0 rounded-xl border border-[#0b1020]/15 bg-white px-3.5 py-3 text-base leading-6 text-[#0b1020] outline-none transition-colors placeholder:text-[#0b1020]/40 hover:border-[#0b1020]/30 focus:border-[#087987] focus:ring-2 focus:ring-[#05cde5]/15";

  const labelClass =
    "font-poppins mb-2 block text-xs font-medium text-[#0b1020]/80";

  return (
    <>
      <link
        ref={calendlyStylesRef}
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        id="calendly-widget"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

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
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: reduceMotion ? 0 : 0.4 }}
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
                Let’s talk about your brand, your next project or the skill
                you want to learn. Choose a call or send us a message.
              </p>

              {/* Free consultation: opens Calendly over the page */}
              <div className="mt-5 max-w-[400px] rounded-xl border border-[#05cde5]/20 bg-white/[0.035] p-4 sm:mt-6 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-poppins text-[10px] font-medium uppercase tracking-[0.16em] text-[#05cde5]">
                    Free consultation
                  </p>
                  <span className="font-poppins rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-white/70">
                    30 minutes
                  </span>
                </div>

                <h3 className="font-sora mt-4 text-lg font-semibold leading-snug tracking-tight text-[#f9f9f9] sm:text-xl">
                  Let’s talk about your brand.
                </h3>
                <p
                  id={`${componentId}-consultation-description`}
                  className="font-poppins mt-2 text-xs leading-6 text-white/65 sm:text-[13px]"
                >
                  A free 30-minute conversation about your goals and what to
                  do next. Pick a time that works for you.
                </p>

                <a
                  href={CALENDLY_URL}
                  onClick={openCalendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby={`${componentId}-consultation-description`}
                  className="font-sora group mt-4 flex min-h-12 w-full items-center justify-between gap-3 rounded-lg bg-[#05cde5] px-4 py-3 text-xs font-semibold text-[#0b1020] transition-colors hover:bg-[#42d9eb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#05cde5] motion-reduce:transition-none sm:text-sm"
                >
                  Book a Free Call
                  <ArrowUpRight
                    aria-hidden="true"
                    size={18}
                    strokeWidth={1.8}
                    className="shrink-0 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none"
                  />
                </a>
              </div>

              <div className="mt-4 max-w-[400px] rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3.5 sm:mt-5 sm:p-5">
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

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Handi-X on WhatsApp at +234 705 192 5253"
                  className="font-poppins mt-2 flex min-h-11 items-center gap-2.5 rounded-sm border-t border-white/10 py-3 text-xs text-white/70 transition-colors hover:text-[#05cde5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05cde5]"
                >
                  <MessageCircle
                    aria-hidden="true"
                    size={16}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#05cde5]"
                  />
                  <span className="flex-1">+234 705 192 5253</span>
                  <span className="text-[10px] text-[#05cde5]">WhatsApp</span>
                  <ArrowUpRight aria-hidden="true" size={15} className="shrink-0" />
                </a>

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
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: reduceMotion ? 0 : 0.4 }}
              className="min-w-0 overflow-hidden rounded-2xl bg-[#f9f9f9] p-4 sm:rounded-[22px] sm:p-6 lg:p-7"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-sora text-lg font-semibold tracking-tight text-[#0b1020] sm:text-xl">
                    Let’s hear your idea.
                  </h3>

                  <p className="font-poppins mt-1 text-[11px] leading-5 text-[#0b1020]/60 sm:text-xs">
                    Share a few details, then continue on WhatsApp.
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b1020] text-[#05cde5]"
                >
                  <MessageCircle size={16} strokeWidth={1.5} />
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
                  <p
                    id={`${componentId}-whatsapp-note`}
                    className="font-poppins max-w-[220px] text-[10px] leading-5 text-[#0b1020]/60 sm:text-[11px]"
                  >
                    Opens WhatsApp with your details. Review your message
                    and tap Send.
                  </p>

                  <button
                    type="submit"
                    aria-describedby={`${componentId}-whatsapp-note`}
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
    </>
  );
}
