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
  MapPin,
  MessageCircle,
} from "lucide-react";

const CONTACT_EMAIL = "heyhandix@gmail.com";
const WHATSAPP_NUMBER = "2347051925253";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
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

const inputClassName =
  "w-full rounded-lg border border-[#0b1020]/10 bg-[#f9f9f9] px-3.5 py-3 font-poppins text-sm text-[#0b1020] outline-none transition placeholder:text-[#0b1020]/35 focus:border-[#05cde5] focus:ring-2 focus:ring-[#05cde5]/15";

export default function Contact() {
  const componentId = useId();
  const calendlyStylesRef = useRef<HTMLLinkElement>(null);
  const reduceMotion = useReducedMotion();

  const [selectedService, setSelectedService] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");

  function openCalendly(event: MouseEvent<HTMLAnchorElement>) {
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

      window.setTimeout(() => setCopied(false), 2000);
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

    setStatus("Opening WhatsApp. Review your message and tap Send.");

    window.location.assign(
      `${WHATSAPP_URL}?text=${encodeURIComponent(body)}`
    );
  }

  const motionProps = {
    initial: reduceMotion ? false : { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduceMotion ? 0 : 0.4 },
  };

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
        className="scroll-mt-24 bg-[#f9f9f9] py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto w-full max-w-[1080px] px-5 sm:px-7 lg:px-8">
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-[#0b1020]/10 pb-5">
            <p className="font-poppins flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0b1020]/50">
              <span className="h-px w-5 bg-[#05cde5]" />
              Contact us
            </p>

            <span className="font-poppins hidden text-xs text-[#0b1020]/45 sm:block">
              Good things start with a conversation.
            </span>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <motion.div {...motionProps} className="min-w-0">
              <h2
                id={`${componentId}-heading`}
                className="font-sora max-w-[480px] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em] text-[#0b1020]"
              >
                Your next chapter{" "}
                <span className="text-[#05cde5]">starts here.</span>
              </h2>

              <p className="font-poppins mt-4 max-w-[420px] text-sm leading-6 text-[#0b1020]/55">
                Tell us about your brand, project or the skill you want to
                learn. We’ll help you figure out the next step.
              </p>

              <div className="mt-8 max-w-[420px] divide-y divide-[#0b1020]/10 border-y border-[#0b1020]/10">
                <div className="py-5">
                  <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0b1020]/45">
                    Free consultation
                  </p>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-sora text-base font-semibold text-[#0b1020]">
                        Let’s talk about your brand.
                      </h3>
                      <p className="font-poppins mt-1 text-xs text-[#0b1020]/50">
                        A focused 30-minute conversation.
                      </p>
                    </div>

                    <a
                      href={CALENDLY_URL}
                      onClick={openCalendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sora inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#05cde5] px-4 py-2 text-xs font-semibold text-[#0b1020] transition-colors hover:bg-[#3dd8ea] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#05cde5]"
                    >
                      Book a call
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="py-5">
                  <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.15em] text-[#0b1020]/45">
                    Email
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="font-sora min-w-0 break-all text-sm font-medium text-[#0b1020] transition-colors hover:text-[#05aabd]"
                    >
                      {CONTACT_EMAIL}
                    </a>

                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email address"
                      title="Copy email address"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0b1020]/10 text-[#0b1020]/50 transition-colors hover:border-[#05cde5] hover:text-[#05aabd]"
                    >
                      {copied ? (
                        <Check size={14} aria-hidden="true" />
                      ) : (
                        <Copy size={14} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-5 text-[#0b1020]/65 transition-colors hover:text-[#0b1020]"
                >
                  <MessageCircle
                    size={17}
                    className="shrink-0 text-[#05aabd]"
                    aria-hidden="true"
                  />

                  <span className="font-poppins flex-1 text-sm">
                    +234 705 192 5253
                  </span>

                  <span className="font-poppins text-[10px] font-semibold uppercase tracking-wide text-[#05aabd]">
                    WhatsApp
                  </span>
                </a>

                <div className="flex items-center gap-3 py-5">
                  <MapPin
                    size={16}
                    className="shrink-0 text-[#05aabd]"
                    aria-hidden="true"
                  />
                  <span className="font-poppins text-sm text-[#0b1020]/55">
                    Ogbomoso, Nigeria
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div {...motionProps} className="min-w-0">
              <div className="rounded-2xl border border-[#0b1020]/10 bg-white p-5 sm:p-7">
                <div>
                  <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.16em] text-[#05aabd]">
                    Start a project
                  </p>

                  <h3 className="font-sora mt-2 text-xl font-semibold tracking-[-0.03em] text-[#0b1020] sm:text-2xl">
                    Tell us what you have in mind.
                  </h3>

                  <p className="font-poppins mt-2 text-sm text-[#0b1020]/50">
                    A few details are enough to get started.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <fieldset>
                    <legend className="font-poppins mb-2 text-xs font-medium text-[#0b1020]/65">
                      What are you interested in?
                    </legend>

                    <input
                      type="hidden"
                      name="service"
                      value={selectedService}
                    />

                    <div className="flex flex-wrap gap-2">
                      {serviceOptions.map((service) => {
                        const isSelected = selectedService === service;

                        return (
                          <button
                            key={service}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setSelectedService(service)}
                            className={`font-poppins rounded-full border px-3 py-2 text-xs transition-colors ${
                              isSelected
                                ? "border-[#0b1020] bg-[#0b1020] text-white"
                                : "border-[#0b1020]/10 text-[#0b1020]/60 hover:border-[#05cde5] hover:text-[#0b1020]"
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor={`${componentId}-name`}
                        className="font-poppins mb-2 block text-xs font-medium text-[#0b1020]/65"
                      >
                        Your name
                      </label>
                      <input
                        id={`${componentId}-name`}
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Full name"
                        maxLength={100}
                        required
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`${componentId}-email`}
                        className="font-poppins mb-2 block text-xs font-medium text-[#0b1020]/65"
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
                        maxLength={254}
                        required
                        className={inputClassName}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`${componentId}-message`}
                      className="font-poppins mb-2 block text-xs font-medium text-[#0b1020]/65"
                    >
                      Tell us about your idea
                    </label>
                    <textarea
                      id={`${componentId}-message`}
                      name="message"
                      rows={4}
                      maxLength={1500}
                      placeholder="What are you trying to build, improve or learn?"
                      required
                      className={`${inputClassName} min-h-28 resize-y`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="font-sora group flex min-h-12 w-full items-center justify-between rounded-lg bg-[#0b1020] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#162036] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] focus-visible:ring-offset-2"
                  >
                    <span>Start a conversation</span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="text-[#05cde5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>

                  <p className="font-poppins text-center text-xs text-[#0b1020]/45">
                    This opens WhatsApp so you can review your message before
                    sending.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>

          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="font-poppins mt-4 text-xs text-[#0b1020]/55 empty:hidden"
          >
            {status}
          </p>
        </div>
      </section>
    </>
  );
}