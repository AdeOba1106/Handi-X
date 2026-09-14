"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { UserRound } from "lucide-react";

type SocialPlatform = "linkedin" | "instagram" | "x";

type SocialLink = {
  platform: SocialPlatform;
  href: string;
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  imagePosition: string;
  background: string;
  socials: SocialLink[];
};

const socialLabels: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  x: "X",
};

// Replace these example.com URLs with real profile links.
// Portraits belong inside public/team/.
const teamMembers: TeamMember[] = [
  {
    id: "marvelous",
    name: "Marvelous Adeoye",
    role: "Founder & CEO",
    description:
      "Guides Handi-X’s vision, bringing together technology, creativity and practical learning.",
    image: "/team/marvelous.jpg",
    imagePosition: "center top",
    background: "#e6eae7",
    socials: [
      {
        platform: "linkedin",
        href: "https://example.com/marvelous/linkedin",
      },
      {
        platform: "instagram",
        href: "https://example.com/marvelous/instagram",
      },
      {
        platform: "x",
        href: "https://example.com/marvelous/x",
      },
    ],
  },
  {
    id: "emmanuel",
    name: "Emmanuel Odunaiya",
    role: "Co-Founder & COO",
    description:
      "Connects strategy with day-to-day execution, keeping the team and its projects moving forward.",
    image: "/team/emmanuel.jpg",
    imagePosition: "center top",
    background: "#e3e8ed",
    socials: [
      {
        platform: "linkedin",
        href: "https://example.com/emmanuel/linkedin",
      },
      {
        platform: "instagram",
        href: "https://example.com/emmanuel/instagram",
      },
      {
        platform: "x",
        href: "https://example.com/emmanuel/x",
      },
    ],
  },
  {
    id: "mayowa",
    name: "Mayowa Ajiboye",
    role: "Director of Media and Publicity",
    description:
      "Shapes how Handi-X shows up through media, storytelling and relationships that extend our reach.",
    image: "/team/mayowa.jpg",
    imagePosition: "center top",
    background: "#ece5dc",
    socials: [
      {
        platform: "linkedin",
        href: "https://example.com/mayowa/linkedin",
      },
      {
        platform: "instagram",
        href: "https://example.com/mayowa/instagram",
      },
      {
        platform: "x",
        href: "https://example.com/mayowa/x",
      },
    ],
  },
  {
    id: "iretomiwa",
    name: "Iretomiwa Odetayo",
    role: "Marketing Lead",
    description:
      "Connects our services with the people who need them through clear messaging and thoughtful campaigns.",
    image: "/team/iretomiwa.jpg",
    imagePosition: "center top",
    background: "#e8e4ee",
    socials: [
      {
        platform: "linkedin",
        href: "https://example.com/iretomiwa/linkedin",
      },
      {
        platform: "instagram",
        href: "https://example.com/iretomiwa/instagram",
      },
      {
        platform: "x",
        href: "https://example.com/iretomiwa/x",
      },
    ],
  },
];

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === "instagram") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.5"
          cy="6.5"
          r="1"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
      >
        <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.52V3.52C22 2.68 21.31 2 20.45 2ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.53 2.79-1.53 2.98 0 3.58 1.96 3.58 4.51v5.27Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3.5 w-3.5"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
    </svg>
  );
}

function TeamPortrait({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      style={{ backgroundColor: member.background }}
      className="relative aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl"
    >
      {failed ? (
        <div
          role="img"
          aria-label={`Portrait of ${member.name} unavailable`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <UserRound
            aria-hidden="true"
            strokeWidth={0.8}
            className="h-16 w-16 text-[#0b1020]/20 sm:h-24 sm:w-24"
          />
        </div>
      ) : (
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 359px) calc(100vw - 32px), (max-width: 639px) calc((100vw - 44px) / 2), (max-width: 1023px) calc((100vw - 88px) / 2), (max-width: 1279px) calc((100vw - 168px) / 4), 278px"
          onError={() => setFailed(true)}
          style={{ objectPosition: member.imagePosition }}
          className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.035]"
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1020]/15 via-transparent to-transparent"
      />
    </div>
  );
}

export default function Team() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="scroll-mt-24 overflow-hidden bg-[#f2f3f1] py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <div className="max-w-xl">
            <p className="font-poppins flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#0b1020]/60 sm:text-[11px]">
              <span className="h-px w-6 bg-[#0b1020]/60" />
              The people behind Handi-X
            </p>

            <h2
              id="team-heading"
              className="font-sora mt-3 text-[28px] font-semibold leading-[1.15] tracking-[-0.045em] text-[#0b1020] sm:text-4xl lg:text-[42px]"
            >
              Different strengths.
              <br />
              One shared vision.
            </h2>
          </div>

          <p className="font-poppins max-w-[350px] text-[13px] leading-6 text-[#0b1020]/65 sm:text-sm sm:leading-7">
            We bring our individual perspectives to a shared purpose:
            helping people and brands build beyond limits.
          </p>
        </motion.div>

        <div className="mt-7 grid grid-cols-1 gap-x-3 gap-y-7 min-[360px]:grid-cols-2 sm:mt-9 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : index * 0.06,
              }}
              className="group flex min-w-0 flex-col"
            >
              <TeamPortrait key={member.image} member={member} />

              <div className="flex flex-1 flex-col pt-3.5 sm:pt-4">
                <h3 className="font-sora text-[14px] font-semibold leading-snug tracking-tight text-[#0b1020] sm:text-lg">
                  {member.name}
                </h3>

                <p className="font-poppins mt-1.5 text-[10px] font-medium leading-4 text-[#0b1020]/70 sm:text-[11px] sm:leading-5">
                  {member.role}
                </p>

                <div
                  aria-hidden="true"
                  className="mt-3 h-0.5 w-6 bg-[#05cde5] transition-[width] duration-300 motion-safe:group-hover:w-10 sm:mt-4"
                />

                <p className="font-poppins mt-3 text-[11px] leading-[1.75] text-[#0b1020]/65 sm:text-[13px] sm:leading-6">
                  {member.description}
                </p>

                <div className="mt-auto pt-3 sm:pt-4">
                  <ul
                    aria-label={`${member.name}'s social profiles`}
                    className="flex flex-wrap items-center gap-1 sm:gap-2"
                  >
                    {member.socials.map((social) => (
                      <li key={social.platform}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on ${
                            socialLabels[social.platform]
                          } (opens in a new tab)`}
                          title={socialLabels[social.platform]}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0b1020]/10 text-[#0b1020]/65 transition-colors duration-200 hover:border-[#0b1020] hover:bg-[#0b1020] hover:text-[#05cde5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b1020] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f2f3f1]"
                        >
                          <SocialIcon platform={social.platform} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#0b1020]/10 pt-4 sm:mt-9 sm:pt-5">
          <p className="font-poppins text-[11px] leading-5 text-[#0b1020]/55 sm:text-xs">
            Creativity. Clarity. A commitment to doing the work.
          </p>

          <span className="font-sora text-[11px] font-medium text-[#0b1020] sm:text-xs">
            Building Beyond Limits.
          </span>
        </div>
      </div>
    </section>
  );
}