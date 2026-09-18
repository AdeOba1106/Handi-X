"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

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

// Replace the example.com link and portrait paths with the final details.
const teamMembers: TeamMember[] = [
  {
    id: "marvelous",
    name: "Marvelous Adeoye",
    role: "Founder & CEO",
    description:
      "Guides Handi-X’s vision, bringing together technology, creativity and practical learning.",
    image: "/marvelous.png",
    imagePosition: "center top",
    background: "#dfe8e7",
    socials: [
      {
        platform: "linkedin",
        href: "https://www.linkedin.com/public-profile/settings/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact_info%3By8aaz6mySKaZ%2BNzUG6j8HA%3D%3D",
      },
      {
        platform: "instagram",
        href: "https://www.instagram.com/marvelous_oba/?utm_source=ig_web_button_share_sheet",
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
    background: "#e1e6ec",
    socials: [
      {
        platform: "linkedin",
        href: "https://www.linkedin.com/in/emmanuel-odunaiya",
      },
      {
        platform: "instagram",
        href: "https://www.instagram.com/iemmanuelodunaiya?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
      },
    ],
  },
  {
    id: "mayowa",
    name: "Mayowa Ajiboye",
    role: " Lead, Media and Publicity",
    description:
      "Shapes how Handi-X shows up through media, storytelling and relationships that extend our reach.",
    image: "/ajiboyee.png",
    imagePosition: "center top",
    background: "#ebe2d8",
    socials: [
      {
        platform: "linkedin",
        href: "https://example.com/mayowa/linkedin",
      },
      {
        platform: "instagram",
        href: "https://www.instagram.com/the_mayowa_ajiboye?stkn=amZhenBsMXNhN2tk&utm_source=qr",
      },
    ],
  },
  {
    id: "iretomiwa",
    name: "Iretomiwa Odetayo",
    role: "Marketing Lead",
    description:
      "Connects our services with the people who need them through clear messaging and thoughtful campaigns.",
    image: "/iretomiwa.png",
    imagePosition: "center top",
    background: "#e6e1ec",
    socials: [
      {
        platform: "linkedin",
        href: "https://www.linkedin.com/in/iretomiwa-odetayo-716374417?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      },
      {
        platform: "instagram",
        href: "https://www.instagram.com/iretomiwahavilah?stkn=ZDJpdTd6c2x0eGl3",
      },
      {
        platform: "x",
        href: "https://x.com/IreContentCo",
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
        className="h-3.5 w-3.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-3.5 w-3.5"
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
      className="h-3 w-3"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932 6.064-6.933ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
    </svg>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function TeamPortrait({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(member.image.trim()) && !failed;

  return (
    <div
      style={{ backgroundColor: member.background }}
      className="relative aspect-square w-full overflow-hidden rounded-full"
    >
      {hasImage ? (
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}`}
          fill
          sizes="(max-width: 640px) 132px, (max-width: 1024px) 144px, 156px"
          onError={() => setFailed(true)}
          style={{ objectPosition: member.imagePosition }}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div
          role="img"
          aria-label={`Portrait of ${member.name} unavailable`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="font-sora text-3xl font-semibold tracking-[-0.08em] text-[#0b1020]/50">
            {getInitials(member.name)}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Team() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="scroll-mt-24 bg-[#f9f9f9] px-4 py-11 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
    >
      <div className="mx-auto w-full max-w-[980px] text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.4 }}
          className="mx-auto max-w-[620px]"
        >
          <h2
            id="team-heading"
            className="font-sora text-[30px] font-semibold leading-tight tracking-[-0.05em] text-[#0b1020] sm:text-[38px] lg:text-[44px]"
          >
            The Team
          </h2>

          <p className="font-poppins mt-2 text-xs leading-6 text-[#0b1020]/70 sm:text-sm">
            The people behind Handi-X.
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-10 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-5">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.id}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: reduceMotion ? 0 : 0.35,
                delay: reduceMotion ? 0 : index * 0.04,
              }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-[104px] sm:w-[116px] lg:w-[126px]">
                <div className="rounded-full border border-[#0b1020]/10 p-1 transition-colors duration-300 group-hover:border-[#05cde5]">
                  <TeamPortrait member={member} />
                </div>

                {(() => {
                  const linkedin = member.socials.find(
                    (social) => social.platform === "linkedin",
                  );

                  return linkedin ? (
                    <a
                      href={linkedin.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn (opens in a new tab)`}
                      className="absolute bottom-0 left-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#edf4ff] bg-[#05cde5] text-[#0b1020] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b1020] focus-visible:ring-offset-2 focus-visible:ring-offset-[#edf4ff]"
                    >
                      <SocialIcon platform="linkedin" />
                    </a>
                  ) : null;
                })()}
              </div>

              <h3 className="font-sora mt-3 whitespace-nowrap text-[14px] font-semibold tracking-[-0.03em] text-[#0b1020] sm:text-[15px]">
                {member.name}
              </h3>

              <p className="font-poppins mt-1 max-w-[145px] text-[11px] leading-4 text-[#0b1020]/70 sm:text-xs">
                {member.role}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
