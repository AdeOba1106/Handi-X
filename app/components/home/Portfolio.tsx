"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ImageIcon, Play } from "lucide-react";

type Category =
  | "All"
  | "Branding"
  | "Web Development"
  | "Graphic Design"
  | "Video";

type Project = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  description: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  background: string;
  href?: string;
  linkLabel?: string;
  concept?: boolean;
  placeholder?: boolean;
};

const categories: Category[] = [
  "All",
  "Branding",
  "Web Development",
  "Graphic Design",
  "Video",
];

// Save images inside public/portfolio/.
// Update each image path to match its filename.
// Replace placeholder entries with your completed projects.
// Add href to display a working project link.
const projects: Project[] = [
  {
    id: "handi-x-branding",
    title: "Handi-X Brand Identity",
    category: "Branding",
    description: "Our identity, from logo to brand applications.",
    image: "/portfolio/handi-x-branding.jpg",
    imageAlt: "Handi-X logo and brand identity applications",
    imageFit: "contain",
    background: "#e8eeeb",
  },
  {
    id: "airport-website",
    title: "Airport Website",
    category: "Web Development",
    description: "Flight search, departures and terminal navigation.",
    image: "/portfolio/airport-website.jpg",
    imageAlt: "Airport website interface",
    imageFit: "cover",
    imagePosition: "top",
    background: "#dfe7f2",
    concept: true,
    linkLabel: "Visit website",
    // href: "https://your-website.com",
  },
  {
    id: "fireside-chat",
    title: "Skill. Value. Income.",
    category: "Graphic Design",
    description: "Event publicity and promotional designs.",
    image: "/portfolio/fireside-chat.jpg",
    imageAlt: "Fireside chat promotional flyer",
    imageFit: "contain",
    background: "#eee4d8",
  },
  {
    id: "campus-video",
    title: "Campus Food-Spot Story",
    category: "Video",
    description: "A short promotional story set on campus.",
    image: "/portfolio/campus-video.jpg",
    imageAlt: "Campus food-spot video thumbnail",
    imageFit: "cover",
    background: "#dce7e9",
    linkLabel: "Watch video",
    // href: "https://your-video-link.com",
  },

  // Additional editable project slots.
  {
    id: "packaging-project",
    title: "Packaging Project",
    category: "Branding",
    description: "Add a short description of your packaging work.",
    image: "/portfolio/packaging-project.jpg",
    imageAlt: "Packaging design project",
    imageFit: "contain",
    background: "#f1e5db",
    placeholder: true,
  },
  {
    id: "business-website",
    title: "Business Website",
    category: "Web Development",
    description: "Add a short description of your website project.",
    image: "/portfolio/business-website.jpg",
    imageAlt: "Business website interface",
    imageFit: "cover",
    imagePosition: "top",
    background: "#e5e5ef",
    placeholder: true,
    linkLabel: "Visit website",
  },
  {
    id: "social-campaign",
    title: "Social Media Campaign",
    category: "Graphic Design",
    description: "Add a short description of your campaign designs.",
    image: "/portfolio/social-campaign.jpg",
    imageAlt: "Social media campaign designs",
    imageFit: "contain",
    background: "#e7ebdc",
    placeholder: true,
  },
  {
    id: "product-video",
    title: "Product Video",
    category: "Video",
    description: "Add a short description of your product video.",
    image: "/portfolio/product-video.jpg",
    imageAlt: "Product video thumbnail",
    imageFit: "cover",
    background: "#e4eaf0",
    placeholder: true,
    linkLabel: "Watch video",
  },
];

function ProjectImage({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      style={{ backgroundColor: project.background }}
      className="relative aspect-square w-full overflow-hidden rounded-lg border border-[#0b1020]/5 sm:aspect-[4/3] sm:rounded-xl"
    >
      {failed || !project.image ? (
        <div
          role="img"
          aria-label={`${project.title}: preview unavailable`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center text-[#0b1020]/55"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 sm:h-12 sm:w-12">
            <ImageIcon
              aria-hidden="true"
              strokeWidth={1.4}
              className="h-4 w-4 sm:h-5 sm:w-5"
            />
          </span>

          <span className="font-poppins text-[10px] leading-4 sm:text-xs">
            {project.placeholder ? "Project preview" : "Preview unavailable"}
          </span>
        </div>
      ) : (
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 359px) calc(100vw - 32px), (max-width: 639px) calc((100vw - 44px) / 2), (max-width: 1023px) calc((100vw - 84px) / 2), (max-width: 1279px) calc((100vw - 144px) / 3), 379px"
          onError={() => setFailed(true)}
          style={{
            objectFit: project.imageFit ?? "cover",
            objectPosition: project.imagePosition ?? "center",
          }}
          className={`transition-transform duration-500 motion-safe:group-hover:scale-[1.025] ${
            project.imageFit === "contain" ? "p-2 sm:p-4" : ""
          }`}
        />
      )}

      {(project.placeholder || project.concept) && (
        <span className="font-poppins absolute left-2 top-2 max-w-[calc(100%-16px)] rounded-full border border-white/40 bg-white/90 px-2 py-1 text-[8px] font-medium leading-3 text-[#0b1020]/75 backdrop-blur-sm sm:left-3 sm:top-3 sm:px-2.5 sm:text-[9px]">
          {project.placeholder ? "Sample project" : "Concept"}
        </span>
      )}

      {project.category === "Video" && project.href && !failed && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#0b1020] shadow-sm sm:h-12 sm:w-12">
            <Play className="ml-0.5 h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" />
          </span>
        </div>
      )}
    </div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const reduceMotion = useReducedMotion();

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="scroll-mt-24 bg-[#f9f9f9] py-10 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <div className="max-w-xl">
            <p className="font-poppins flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#0b1020]/60 sm:text-[11px]">
              <span className="h-px w-5 bg-[#0b1020]" />
              Selected work
            </p>

            <h2
              id="portfolio-heading"
              className="font-sora mt-3 text-[27px] font-semibold leading-[1.15] tracking-[-0.045em] text-[#0b1020] sm:text-4xl lg:text-5xl"
            >
              Ideas brought to life.
            </h2>
          </div>

          <p className="font-poppins max-w-[370px] text-[13px] leading-6 text-[#0b1020]/65 sm:text-sm sm:leading-7">
            Brand identities, websites, campaign designs and video stories.
            Explore what we create.
          </p>
        </motion.div>

        {/* Wrap filters to avoid horizontal page overflow. */}
        <div
          role="group"
          aria-label="Filter projects by category"
          className="mt-5 flex flex-wrap gap-1.5 sm:mt-7 sm:gap-2"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                aria-controls="portfolio-projects"
                onClick={() => setActiveCategory(category)}
                className={`font-poppins inline-flex min-h-11 items-center justify-center rounded-full border px-3 py-2 text-[10px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b1020] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f9f9f9] sm:px-4 sm:text-xs ${
                  isActive
                    ? "border-[#0b1020] bg-[#0b1020] text-white"
                    : "border-[#0b1020]/15 bg-transparent text-[#0b1020]/65 hover:border-[#0b1020]/40 hover:text-[#0b1020]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p role="status" className="sr-only">
          Showing {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
          {activeCategory !== "All" ? ` in ${activeCategory}` : ""}.
        </p>

        {/* One column below 360px, two on phones/tablets, three on desktop. */}
        <div
          id="portfolio-projects"
          className="mt-5 grid grid-cols-1 gap-x-3 gap-y-5 min-[360px]:grid-cols-2 sm:mt-7 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-6"
        >
          {filteredProjects.map((project) => {
            const isExternal = /^https?:\/\//i.test(project.href ?? "");

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35 }}
                className="group flex min-w-0 flex-col"
              >
                {project.href ? (
                  <a
                    href={project.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={`${project.linkLabel ?? "View project"}: ${
                      project.title
                    }${isExternal ? " (opens in a new tab)" : ""}`}
                    className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b1020] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f9f9f9] sm:rounded-xl"
                  >
                    <ProjectImage key={project.image} project={project} />
                  </a>
                ) : (
                  <ProjectImage key={project.image} project={project} />
                )}

                <div className="flex flex-1 flex-col pt-3 sm:pt-4">
                  <p className="font-poppins text-[9px] font-medium leading-4 tracking-wide text-[#0b1020]/60 sm:text-[10px] sm:uppercase sm:tracking-[0.12em]">
                    {project.category}
                  </p>

                  <h3 className="font-sora mt-1 text-[13px] font-semibold leading-snug tracking-tight text-[#0b1020] sm:mt-1.5 sm:text-lg">
                    {project.title}
                  </h3>

                  <p className="font-poppins mt-1.5 text-[11px] leading-[1.65] text-[#0b1020]/65 sm:mt-2 sm:text-[13px] sm:leading-6">
                    {project.description}
                  </p>

                  {project.href && (
                    <div className="mt-auto pt-1">
                      <a
                        href={project.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="font-poppins inline-flex min-h-11 items-center gap-1.5 rounded-md text-[11px] font-medium text-[#0b1020] underline decoration-[#0b1020]/25 underline-offset-4 transition-colors hover:decoration-[#0b1020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b1020] focus-visible:ring-offset-2 sm:text-xs"
                      >
                        {project.linkLabel ?? "View project"}
                        <ArrowUpRight
                          aria-hidden="true"
                          size={14}
                          className="shrink-0"
                        />
                        {isExternal && (
                          <span className="sr-only">
                            {" "}
                            (opens in a new tab)
                          </span>
                        )}
                      </a>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}