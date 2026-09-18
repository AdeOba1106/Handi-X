"use client";

import Image from "next/image";
import { useId, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  GraduationCap,
  Layers3,
  Minus,
  Plus,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";

type ServiceGroup = {
  id: string;
  number: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  services: string[];
};

const serviceGroups: ServiceGroup[] = [
  {
    id: "brand-xperience",
    number: "01",
    title: "Brand Xperience",
    summary: "How people see, feel and interact with your brand.",
    icon: Sparkles,
    services: [
      "Graphic Design",
      "Web Development",
      "Video Creatives & Editing",
      "Social Media Creatives",
      "Marketing & Campaign Materials",
    ],
  },
  {
    id: "brand-architecture",
    number: "02",
    title: "Brand Architecture",
    summary: "The structure and identity that hold your brand together.",
    icon: Layers3,
    services: [
      "Brand Naming",
      "Logo Design",
      "Visual Identity Systems",
      "Brand Guidelines",
      "Sub-brand Structure",
      "Brand Refresh & Rebranding",
    ],
  },
  {
    id: "brand-strategy",
    number: "03",
    title: "Brand Strategy",
    summary: "A clear direction for what you say and how you grow.",
    icon: Target,
    services: [
      "Brand Positioning",
      "Audience & Competitor Research",
      "Brand Messaging",
      "Content Strategy",
      "Digital Marketing",
      "Campaign Planning",
    ],
  },
  {
    id: "handi-x-academy",
    number: "04",
    title: "Handi-X Academy",
    summary: "Practical learning that turns interest into ability.",
    icon: GraduationCap,
    services: [
      "Graphic Design Training",
      "Web Development Training",
      "Digital Marketing Training",
      "Data Analysis Training",
      "Video Editing Training",
      "Practical Projects & Mentorship",
    ],
  },
];

export default function Services() {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const componentId = useId();

  const toggleGroup = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="services"
      aria-labelledby={`${componentId}-heading`}
      className="relative scroll-mt-24 overflow-hidden bg-[#0b1020] py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12 xl:gap-16"
        >
          {/* Introduction with a faint background image */}
          <div className="relative isolate min-w-0 overflow-hidden rounded-2xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0"
            >
              <Image
                src="/images/services-background.jpg"
                alt=""
                fill
                sizes="(max-width: 1023px) 100vw, 480px"
                className="object-cover object-center opacity-[0.16] grayscale"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#0b1020]/70 via-[#0b1020]/15 to-[#0b1020]/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1020] via-transparent to-[#0b1020]/25" />
            </div>

            <div className="relative z-10 max-w-lg px-4 py-5 sm:px-5 sm:py-6">
              <p className="font-poppins flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#05cde5] sm:text-[11px]">
                <span className="h-px w-6 bg-[#05cde5]" />
                Key Offerings
              </p>

              <h2
                id={`${componentId}-heading`}
                className="font-sora mt-3 text-[28px] font-semibold leading-[1.15] tracking-[-0.045em] text-[#f9f9f9] sm:text-4xl lg:text-[42px]"
              >
                Built around
                <br />
                <span className="text-[#05cde5]">your next step.</span>
              </h2>

              <p className="font-poppins mt-4 max-w-[350px] text-[13px] leading-6 text-white/70 sm:text-sm sm:leading-7">
                From shaping your brand to building your skills, explore the
                ways we can work with you.
              </p>

              <div className="font-poppins mt-5 flex items-center gap-2 text-[11px] leading-5 text-white/60">
                <Plus
                  aria-hidden="true"
                  size={13}
                  className="shrink-0 text-[#05cde5]"
                />
                Select an area to explore its services
              </div>
            </div>
          </div>

          {/* Expandable service groups */}
          <div className="min-w-0 border-t border-white/15">
            {serviceGroups.map((group) => {
              const isOpen = openId === group.id;
              const Icon = group.icon;
              const buttonId = `${componentId}-${group.id}-button`;
              const panelId = `${componentId}-${group.id}-panel`;

              return (
                <div
                  key={group.id}
                  className={`border-b transition-colors duration-300 ${
                    isOpen
                      ? "border-[#05cde5]/35"
                      : "border-white/15"
                  }`}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleGroup(group.id)}
                      className="group flex w-full cursor-pointer items-center gap-3 rounded-sm py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#05cde5] sm:gap-4 sm:py-5"
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 sm:h-10 sm:w-10 ${
                          isOpen
                            ? "border-[#05cde5]/25 bg-[#05cde5]/10 text-[#05cde5]"
                            : "border-white/10 bg-white/[0.035] text-white/60 group-hover:border-[#05cde5]/25 group-hover:text-[#05cde5]"
                        }`}
                      >
                        <Icon size={18} strokeWidth={1.5} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span
                          className={`font-sora block text-[15px] font-medium leading-snug tracking-tight transition-colors duration-300 sm:text-lg ${
                            isOpen
                              ? "text-[#05cde5]"
                              : "text-[#f9f9f9] group-hover:text-[#05cde5]"
                          }`}
                        >
                          {group.title}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className="font-poppins hidden text-[10px] tabular-nums text-white/35 sm:block"
                      >
                        {group.number}
                      </span>

                      <span
                        aria-hidden="true"
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 sm:h-8 sm:w-8 ${
                          isOpen
                            ? "border-[#05cde5] bg-[#05cde5] text-[#0b1020]"
                            : "border-white/20 text-white/75 group-hover:border-[#05cde5] group-hover:text-[#05cde5]"
                        }`}
                      >
                        {isOpen ? (
                          <Minus size={15} strokeWidth={1.6} />
                        ) : (
                          <Plus size={15} strokeWidth={1.6} />
                        )}
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                  >
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key={group.id}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: reduceMotion ? 0 : 0.24,
                            ease: "easeInOut",
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5 sm:pb-6 sm:pl-14">
                            <p className="font-poppins max-w-md text-[12px] leading-6 text-white/65 sm:text-[13px]">
                              {group.summary}
                            </p>

                            <ul className="mt-3 grid grid-cols-1 gap-x-5 gap-y-1.5 min-[380px]:grid-cols-2">
                              {group.services.map((service) => (
                                <li
                                  key={service}
                                  className="flex min-w-0 items-start gap-2 py-1"
                                >
                                  <ArrowUpRight
                                    aria-hidden="true"
                                    size={12}
                                    strokeWidth={1.5}
                                    className="mt-1 shrink-0 text-[#05cde5]/80"
                                  />

                                  <span className="font-poppins text-[11px] leading-5 text-white/85 sm:text-xs">
                                    {service}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}