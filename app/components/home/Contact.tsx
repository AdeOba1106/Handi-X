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

    calendly.initPopupWidget({
      url: CALENDLY_URL,
    });
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);

      setCopied(true);
      setStatus("Email address copied.");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
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
      "Continue in WhatsApp to review your message and tap Send."
    );

    window.location.assign(
      `${WHATSAPP_URL}?text=${encodeURIComponent(body)}`
    );
  }

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
        className="scroll-mt-24 overflow-hidden bg-[#0b1020] py-10 sm:py-12 lg:py-14"
      >
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-8 lg:px-10">
          {/* SECTION TOP */}
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/15 pb-4">
            <p className="font-poppins flex items-center gap-2.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#05cde5] sm:text-[10px]">
              <span className="h-px w-5 bg-[#05cde5]" />
              Contact us
            </p>

            <span className="font-poppins hidden text-[9px] tracking-wide text-white/40 sm:block">
              Good things start with a conversation.
            </span>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10 xl:gap-12">
            {/* =====================================================
                LEFT
            ====================================================== */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
              }}
              className="min-w-0"
            >
              <h2
                id={`${componentId}-heading`}
                className="font-sora max-w-[470px] text-[30px] font-semibold leading-[1.08] tracking-[-0.05em] text-[#f9f9f9] sm:text-[38px] lg:text-[44px]"
              >
                Your next chapter
                <br />

                <span className="text-[#05cde5]">
                  starts here.
                </span>
              </h2>

              <p className="font-poppins mt-3 max-w-[350px] text-[12px] leading-6 text-white/55 sm:text-[13px]">
                Let&apos;s talk about your brand, your next project or the
                skill you want to learn.
              </p>

              {/* FREE CALL */}
              <div className="mt-5 max-w-[380px] border-t border-white/15 pt-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-poppins text-[8px] font-medium uppercase tracking-[0.18em] text-[#05cde5]">
                    Free consultation
                  </p>

                  <span className="font-poppins text-[8px] uppercase tracking-[0.12em] text-white/30">
                    30 min
                  </span>
                </div>

                <h3 className="font-sora mt-2.5 text-[17px] font-semibold leading-snug tracking-[-0.025em] text-[#f9f9f9] sm:text-[18px]">
                  Let&apos;s talk about your brand.
                </h3>

                <p
                  id={`${componentId}-consultation-description`}
                  className="font-poppins mt-1.5 max-w-[340px] text-[10px] leading-5 text-white/50 sm:text-[11px]"
                >
                  A focused conversation about what you&apos;re building and
                  what the next move could look like.
                </p>

                <a
                  href={CALENDLY_URL}
                  onClick={openCalendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby={`${componentId}-consultation-description`}
                  className="
                    font-sora group mt-3
                    flex min-h-[42px] w-full
                    items-center justify-between
                    rounded-[9px]
                    bg-[#05cde5]
                    px-4 py-2.5
                    text-[10px] font-semibold
                    text-[#0b1020]
                    transition-colors
                    hover:bg-[#3dd8ea]
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-[#05cde5]
                    sm:w-[215px]
                  "
                >
                  <span>Book a Free Call</span>

                  <ArrowUpRight
                    aria-hidden="true"
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                  />
                </a>
              </div>

              {/* DIRECT CONTACT */}
              <div className="mt-5 max-w-[380px] border-t border-white/15 pt-4">
                <p className="font-poppins text-[8px] font-medium uppercase tracking-[0.18em] text-white/30">
                  Direct contact
                </p>

                <div className="mt-2 flex min-w-0 items-center gap-2">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="
                      font-sora
                      inline-flex min-h-9
                      min-w-0 flex-1
                      items-center gap-2
                      text-[13px] font-medium
                      text-white
                      transition-colors
                      hover:text-[#05cde5]
                      sm:text-[14px]
                    "
                  >
                    <span className="break-all">
                      {CONTACT_EMAIL}
                    </span>

                    <ArrowUpRight
                      aria-hidden="true"
                      size={13}
                      className="shrink-0 text-[#05cde5]"
                    />
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    title="Copy email address"
                    className="
                      flex h-8 w-8 shrink-0
                      items-center justify-center
                      rounded-full
                      border border-white/10
                      text-white/45
                      transition-colors
                      hover:border-white/20
                      hover:text-[#05cde5]
                    "
                  >
                    {copied ? (
                      <Check size={13} />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    font-poppins
                    mt-1 flex min-h-9
                    items-center gap-2
                    border-t border-white/10
                    py-2.5
                    text-[10px]
                    text-white/50
                    transition-colors
                    hover:text-white
                  "
                >
                  <MessageCircle
                    size={13}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#05cde5]"
                  />

                  <span className="flex-1">
                    +234 705 192 5253
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.1em] text-[#05cde5]">
                    WhatsApp
                  </span>
                </a>

                <div className="flex items-center gap-2 border-t border-white/10 pt-2.5">
                  <MapPin
                    size={11}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#05cde5]/80"
                  />

                  <span className="font-poppins text-[9px] text-white/40">
                    Ogbomoso, Nigeria
                  </span>
                </div>
              </div>
            </motion.div>

            {/* =====================================================
                COMPACT FORM
            ====================================================== */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
              }}
              className="min-w-0"
            >
              <div className="overflow-hidden rounded-[16px] bg-[#f9f9f9]">
                {/* FORM HEADER */}
                <div className="flex items-start justify-between gap-5 border-b border-[#0b1020]/10 px-5 py-4 sm:px-6">
                  <div>
                    <p className="font-poppins mb-1 text-[7px] font-semibold uppercase tracking-[0.18em] text-[#05aabd] sm:text-[8px]">
                      Start a project
                    </p>

                    <h3 className="font-sora text-[18px] font-semibold leading-tight tracking-[-0.035em] text-[#0b1020] sm:text-[20px]">
                      Tell us what you have in mind.
                    </h3>

                    <p className="font-poppins mt-1 text-[9px] leading-4 text-[#0b1020]/40 sm:text-[10px]">
                      A few details are enough to get started.
                    </p>
                  </div>

                  <span className="font-sora hidden text-[8px] text-[#0b1020]/18 sm:block">
                    01 — 04
                  </span>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* SERVICE */}
                  <fieldset className="border-b border-[#0b1020]/10 px-5 py-3.5 sm:px-6">
                    <div className="mb-2.5 flex items-center gap-2">
                      <span className="font-sora text-[8px] font-semibold text-[#05aabd]">
                        01
                      </span>

                      <legend className="font-poppins text-[8px] font-semibold uppercase tracking-[0.14em] text-[#0b1020]/40">
                        Interested in
                      </legend>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {serviceOptions.map((service) => {
                        const isSelected =
                          selectedService === service;

                        return (
                          <label
                            key={service}
                            className="cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="service"
                              value={service}
                              checked={isSelected}
                              onChange={() =>
                                setSelectedService(service)
                              }
                              className="peer sr-only"
                            />

                            <span
                              className={`
                                font-poppins
                                inline-flex min-h-[30px]
                                items-center gap-1.5
                                rounded-full border
                                px-2.5 py-1
                                text-[8px]
                                font-medium
                                transition-all duration-200
                                ${
                                  isSelected
                                    ? "border-[#0b1020] bg-[#0b1020] text-white"
                                    : "border-[#0b1020]/12 text-[#0b1020]/45 hover:border-[#0b1020]/30 hover:text-[#0b1020]"
                                }
                              `}
                            >
                              {service}

                              {isSelected && (
                                <span className="h-1 w-1 rounded-full bg-[#05cde5]" />
                              )}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* NAME + EMAIL */}
                  <div className="grid border-b border-[#0b1020]/10 min-[560px]:grid-cols-2">
                    {/* NAME */}
                    <div className="border-b border-[#0b1020]/10 px-5 py-3.5 min-[560px]:border-b-0 min-[560px]:border-r sm:px-6">
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="font-sora text-[8px] font-semibold text-[#05aabd]">
                          02
                        </span>

                        <label
                          htmlFor={`${componentId}-name`}
                          className="font-poppins text-[8px] font-semibold uppercase tracking-[0.14em] text-[#0b1020]/40"
                        >
                          Your name
                        </label>
                      </div>

                      <input
                        id={`${componentId}-name`}
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Full name"
                        required
                        maxLength={100}
                        className="
                          font-sora
                          block w-full
                          border-0 bg-transparent
                          p-0 text-[13px]
                          font-medium
                          text-[#0b1020]
                          outline-none
                          placeholder:font-normal
                          placeholder:text-[#0b1020]/20
                          focus:ring-0
                        "
                      />
                    </div>

                    {/* EMAIL */}
                    <div className="px-5 py-3.5 sm:px-6">
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="font-sora text-[8px] font-semibold text-[#05aabd]">
                          03
                        </span>

                        <label
                          htmlFor={`${componentId}-email`}
                          className="font-poppins text-[8px] font-semibold uppercase tracking-[0.14em] text-[#0b1020]/40"
                        >
                          Email
                        </label>
                      </div>

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
                        className="
                          font-sora
                          block w-full
                          border-0 bg-transparent
                          p-0 text-[13px]
                          font-medium
                          text-[#0b1020]
                          outline-none
                          placeholder:font-normal
                          placeholder:text-[#0b1020]/20
                          focus:ring-0
                        "
                      />
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <div className="px-5 py-3.5 sm:px-6">
                    <div className="mb-1.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-sora text-[8px] font-semibold text-[#05aabd]">
                          04
                        </span>

                        <label
                          htmlFor={`${componentId}-message`}
                          className="font-poppins text-[8px] font-semibold uppercase tracking-[0.14em] text-[#0b1020]/40"
                        >
                          Your idea
                        </label>
                      </div>

                      <span className="font-poppins text-[7px] uppercase tracking-[0.1em] text-[#0b1020]/18">
                        Keep it simple
                      </span>
                    </div>

                    <textarea
                      id={`${componentId}-message`}
                      name="message"
                      rows={3}
                      required
                      maxLength={1500}
                      placeholder="What are you trying to build, improve or learn?"
                      className="
                        font-sora
                        block min-h-[68px]
                        w-full resize-none
                        border-0 bg-transparent
                        p-0 text-[12px]
                        font-medium leading-5
                        text-[#0b1020]
                        outline-none
                        placeholder:font-normal
                        placeholder:text-[#0b1020]/20
                        focus:ring-0
                      "
                    />
                  </div>

                  {/* SUBMIT */}
                  <div className="border-t border-[#0b1020]/10 bg-white/35 px-5 py-3 sm:px-6">
                    <div className="flex items-center justify-between gap-4">
                      <p
                        id={`${componentId}-whatsapp-note`}
                        className="font-poppins hidden max-w-[205px] text-[7px] leading-4 text-[#0b1020]/30 sm:block"
                      >
                        Opens in WhatsApp so you can review before sending.
                      </p>

                      <button
                        type="submit"
                        aria-describedby={`${componentId}-whatsapp-note`}
                        className="
                          font-sora group
                          inline-flex min-h-[40px]
                          w-full items-center
                          justify-between gap-4
                          rounded-[8px]
                          bg-[#0b1020]
                          px-3.5 py-2
                          text-[9px]
                          font-semibold
                          text-white
                          transition-colors
                          duration-300
                          hover:bg-[#162036]
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-[#05cde5]
                          focus-visible:ring-offset-2
                          sm:ml-auto
                          sm:w-auto
                          sm:min-w-[180px]
                        "
                      >
                        <span>
                          Start a conversation
                        </span>

                        <ArrowUpRight
                          aria-hidden="true"
                          size={12}
                          strokeWidth={1.7}
                          className="text-[#05cde5] transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                        />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>

          {/* STATUS */}
          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="font-poppins mt-3 text-[9px] leading-5 text-[#05cde5] empty:hidden"
          >
            {status}
          </p>
        </div>
      </section>
    </>
  );
}