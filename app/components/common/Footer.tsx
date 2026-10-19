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

const linkClassName =
  "font-poppins inline-flex min-h-9 items-center text-sm text-white/60 transition-colors hover:text-[#05cde5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#05cde5]";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#0b1020] text-[#f9f9f9]">
      <div className="mx-auto w-full max-w-[1080px] px-5 pb-5 pt-12 sm:px-7 sm:pb-6 sm:pt-14 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-9 border-b border-white/10 pb-9 sm:gap-x-10 sm:pb-11 lg:grid-cols-[1.3fr_0.7fr_0.8fr_1.1fr] lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 min-w-0 lg:col-span-1">
            <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.16em] text-[#05cde5]">
              Handi-X
            </p>

            <p className="font-sora mt-3 max-w-[300px] text-2xl font-semibold leading-tight tracking-[-0.05em] sm:text-3xl">
              Building
              <br />
              <span className="text-[#05cde5]">Beyond Limits.</span>
            </p>

            <p className="font-poppins mt-3 max-w-[310px] text-xs leading-5 text-white/55 sm:text-[13px] sm:leading-6">
              Helping people and brands move from potential to possibility
              through creativity, technology and practical learning.
            </p>
          </div>

          {/* Explore */}
          <div className="min-w-0">
            <h2 className="font-poppins text-[10px] font-semibold uppercase tracking-[0.16em] text-[#05cde5]">
              Explore
            </h2>

            <nav aria-label="Footer navigation" className="mt-3">
              <ul className="space-y-1">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClassName}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social links */}
          <div className="min-w-0">
            <h2 className="font-poppins text-[10px] font-semibold uppercase tracking-[0.16em] text-[#05cde5]">
              Connect
            </h2>

            <ul className="mt-3 space-y-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkClassName} gap-2`}
                    >
                      <Icon size={14} aria-hidden="true" />
                      {social.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 min-w-0 lg:col-span-1">
            <h2 className="font-poppins text-[10px] font-semibold uppercase tracking-[0.16em] text-[#05cde5]">
              Start a conversation
            </h2>

            <p className="font-poppins mt-3 max-w-[280px] text-xs leading-5 text-white/55 sm:text-[13px] sm:leading-6">
              Have an idea, a project or a skill you want to build?
            </p>

            <a
              href="mailto:heyhandix@gmail.com"
              className="font-sora mt-3 inline-flex min-h-10 max-w-full items-center gap-2 break-all text-sm font-medium text-white transition-colors hover:text-[#05cde5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#05cde5] sm:text-base"
            >
              <Mail size={15} className="shrink-0 text-[#05cde5]" />
              <span>heyhandix@gmail.com</span>
              <ArrowUpRight
                size={14}
                className="shrink-0"
                aria-hidden="true"
              />
            </a>

            <p className="font-poppins mt-3 flex items-center gap-2 text-xs text-white/45">
              <MapPin
                size={14}
                className="shrink-0 text-[#05cde5]"
                aria-hidden="true"
              />
              Ogbomoso, Nigeria
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-4 sm:flex-row sm:items-center sm:justify-between sm:pt-5">
          <p className="font-poppins text-[10px] leading-4 text-white/40 sm:text-[11px]">
            © {new Date().getFullYear()} Handi-X. All rights reserved.
          </p>

          <p className="font-poppins text-[10px] leading-4 text-white/40 sm:text-[11px]">
            Made with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}