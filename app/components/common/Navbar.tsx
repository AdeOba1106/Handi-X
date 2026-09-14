"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Team", href: "#team" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const handleBreakpointChange = () => {
      if (desktopQuery.matches) setIsOpen(false);
    };

    desktopQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      desktopQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <nav aria-label="Main navigation" className="relative w-full">
        <div className="flex h-[72px] items-center justify-between gap-4 border-b border-white/[0.06] bg-[#0b1020] px-5 sm:px-8 lg:grid lg:h-20 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:px-10">
          {/* Larger logo icon */}
          <a
            href="#"
            onClick={closeMenu}
            aria-label="Handi-X home"
            className="group relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#05cde5] lg:h-16 lg:w-16"
          >
            <Image
              src="/Handi-X Blue-Cyan.svg"
              alt="Handi-X"
              width={72}
              height={72}
              priority
              className="h-14 w-14 scale-[1.15] object-contain transition-transform duration-300 group-hover:scale-[1.22] sm:h-[60px] sm:w-[60px] lg:h-16 lg:w-16 lg:scale-[1.12] lg:group-hover:scale-[1.18]"
            />

            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#05cde5] transition-all duration-300 group-hover:w-8"
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="font-sora group relative inline-flex min-h-11 items-center text-[13px] font-medium text-white/70 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#05cde5]"
                >
                  {link.name}

                  <span
                    aria-hidden="true"
                    className="absolute bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#05cde5] transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop contact */}
          <a
            href="#contact"
            className="font-sora group hidden min-h-11 items-center gap-4 justify-self-end rounded-lg bg-[#05cde5] px-4 text-[13px] font-semibold text-[#0b1020] transition-colors duration-200 hover:bg-[#42d9eb] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:inline-flex"
          >
            Let’s talk
            <ArrowUpRight
              size={17}
              strokeWidth={1.8}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>

          {/* Mobile toggle */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((previous) => !previous)}
            className="inline-flex min-h-11 items-center gap-3 rounded-lg px-3 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05cde5] lg:hidden"
          >
            <span className="font-sora text-xs font-medium">
              {isOpen ? "Close" : "Menu"}
            </span>

            {isOpen ? (
              <X size={21} strokeWidth={1.6} aria-hidden="true" />
            ) : (
              <Menu size={21} strokeWidth={1.6} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          id="mobile-navigation"
          inert={!isOpen}
          aria-hidden={!isOpen}
          className={`absolute inset-x-0 top-full grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-b border-[#0b1020]/10 bg-[#f9f9f9] px-5 pb-6 pt-5 shadow-[0_16px_40px_-24px_rgba(11,16,32,0.4)] sm:px-8">
              <p className="font-poppins mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[#0b1020]/50">
                Explore Handi-X
              </p>

              <ul>
                {navLinks.map((link) => (
                  <li
                    key={link.name}
                    className="border-b border-[#0b1020]/10"
                  >
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="font-sora group flex min-h-[60px] items-center justify-between gap-4 py-4 text-[19px] font-medium tracking-[-0.03em] text-[#0b1020] transition-colors hover:text-[#0b1020]/65 focus-visible:outline-2 focus-visible:outline-[#0b1020]"
                    >
                      {link.name}
                      <ArrowUpRight
                        size={19}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="shrink-0 text-[#0b1020]/35 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={closeMenu}
                className="font-sora mt-5 flex min-h-[52px] items-center justify-between gap-4 rounded-lg bg-[#05cde5] px-4 py-3 text-sm font-semibold text-[#0b1020] transition-colors hover:bg-[#42d9eb] focus-visible:outline-2 focus-visible:outline-[#0b1020]"
              >
                Let’s talk about your project
                <ArrowUpRight
                  size={19}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;