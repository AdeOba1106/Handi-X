import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import {
  FaInstagram as Instagram,
  FaLinkedinIn as Linkedin,
} from "react-icons/fa6";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/handixofficial",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/handi-x",
    icon: Linkedin,
  },

];

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.153h7.594l5.243 6.932 6.064-6.932ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#070b17] text-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 pb-5 pt-10 sm:px-8 sm:pb-7 sm:pt-14 lg:px-12 lg:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-white/10 pb-8 sm:gap-x-10 sm:gap-y-10 sm:pb-12 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr] lg:gap-14">
          {/* Brand */}
          <div className="col-span-2 min-w-0 lg:col-span-1">
            <a
              href="#"
              aria-label="Handi-X home"
              className="inline-flex items-center gap-2"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#05cde5] font-sora text-xs font-bold text-[#0b1020] sm:h-9 sm:w-9 sm:text-sm">
                H
              </span>

              <span className="font-sora text-lg font-semibold tracking-[-0.06em] sm:text-xl">
                Handi<span className="text-[#05cde5]">-X</span>
              </span>
            </a>

            <p className="font-sora mt-5 max-w-[300px] text-[25px] font-semibold leading-[1.08] tracking-[-0.05em] text-[#f9f9f9] min-[400px]:text-[28px] sm:mt-7 sm:text-4xl">
              Building
              <br />
              <span className="text-[#05cde5]">Beyond Limits.</span>
            </p>

            <p className="font-poppins mt-3 max-w-[310px] text-[12px] leading-5 text-white/55 sm:mt-4 sm:text-[13px] sm:leading-6">
              Helping people and brands move from potential to possibility
              through creativity, technology and practical learning.
            </p>
          </div>

          {/* Explore */}
          <div className="min-w-0">
            <p className="font-poppins text-[9px] font-medium uppercase tracking-[0.2em] text-[#05cde5] sm:text-[10px]">
              Explore
            </p>

            <nav aria-label="Footer navigation" className="mt-3 sm:mt-5">
              <ul className="space-y-1.5 sm:space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-poppins inline-flex min-h-8 items-center text-xs text-white/65 transition-colors hover:text-[#05cde5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] sm:text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Connect */}
          <div className="min-w-0">
            <p className="font-poppins text-[9px] font-medium uppercase tracking-[0.2em] text-[#05cde5] sm:text-[10px]">
              Connect
            </p>

            <ul className="mt-3 space-y-1.5 sm:mt-5 sm:space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-poppins inline-flex min-h-8 items-center gap-2 text-xs text-white/65 transition-colors hover:text-[#05cde5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] sm:text-sm"
                    >
                      <Icon size={14} strokeWidth={1.7} />
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 min-w-0 lg:col-span-1">
            <p className="font-poppins text-[9px] font-medium uppercase tracking-[0.2em] text-[#05cde5] sm:text-[10px]">
              Start a conversation
            </p>

            <p className="font-poppins mt-3 max-w-[280px] text-xs leading-5 text-white/60 sm:mt-5 sm:text-sm sm:leading-6">
              Have an idea, a project or a skill you want to build?
            </p>

            <a
              href="mailto:heyhandix@gmail.com"
              className="font-sora mt-3 inline-flex min-h-10 max-w-full items-center gap-2 break-all text-xs font-medium text-white transition-colors hover:text-[#05cde5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] min-[400px]:text-sm sm:mt-4 sm:text-base"
            >
              <Mail size={15} className="shrink-0 text-[#05cde5]" />
              <span>heyhandix@gmail.com</span>
              <ArrowUpRight size={14} className="shrink-0" />
            </a>

            <p className="font-poppins mt-2 flex items-center gap-2 text-[11px] text-white/45 sm:mt-4 sm:text-xs">
              <MapPin size={13} className="shrink-0 text-[#05cde5]" />
              Ogbomoso, Nigeria
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 sm:pt-5">
          <p className="font-poppins text-[10px] leading-4 text-white/40 sm:text-[11px]">
            © {new Date().getFullYear()} Handi-X. All rights reserved.
          </p>

          <p className="font-poppins text-right text-[10px] leading-4 text-white/40 sm:text-[11px]">
            Made with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}