"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ImageIcon,
  Maximize2,
  Play,
  X,
} from "lucide-react";

type Category =
  | "All"
  | "Branding"
  | "Web Development"
  | "Graphic Design"
  | "Video";

type ProjectMedia = {
  src: string;
  alt: string;
  type?: "image" | "video";
  position?: string;
};

type Project = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  background: string;
  href?: string;
  linkLabel?: string;
  mediaType?: "image" | "video";
  gallery?: ProjectMedia[];
  concept?: boolean;
  placeholder?: boolean;
};

const categories: Category[] = [
  "All",
  "Branding",
  // "Web Development",
  "Graphic Design",
  "Video",
];

function getProjectMedia(project: Project): ProjectMedia[] {
  if (project.gallery?.length) return project.gallery;

  return [
    {
      src: project.image,
      alt: project.imageAlt,
      type: project.mediaType ?? "image",
      position: project.imagePosition,
    },
  ];
}

// Save images and videos inside public/portfolio/.
// Update each media path to match its filename.
// Replace placeholder entries with your completed projects.
const projects: Project[] = [
  {
    id: "handi-x-branding",
    title: "Handi-X Brand Identity",
    category: "Branding",
    description:
      "A complete visual identity developed for Handi-X, covering the logo, colour system, typography, and branded applications that bring the brand to life.",
    image: "/portfolio/handi-x-branding.jpg",
    imageAlt: "Handi-X logo and brand identity applications",
    background: "#e8eeeb",
  },
{
  id: "fireside-chat",
  title: "Skill. Value. Income.",
  category: "Graphic Design",
  description:
    "A coordinated set of promotional flyers created for the Skill. Value. Income. fireside chat, introducing the event, speaker, and message throughout the campaign.",
  image: "/portfolio/fireside-chat.jpg",
  imageAlt: "Fireside chat promotional flyer",
  background: "#eee4d8",

  gallery: [
    {
      src: "/portfolio/fireside-chat.jpg",
      alt: "First fireside chat flyer",
    },
    {
      src: "/portfolio/Meet Our Speaker [SVI].jpg",
      alt: "Second fireside chat flyer",
    },
    {
      src: "/portfolio/Thank you FSC.jpg",
      alt: "Third fireside chat flyer",
    },
  ],
},
  {
    id: "campus-video",
    title: "Campus Food-Spot Story",
    category: "Video",
    description:
      "A short campus-based promotional film following a simple food-spot story, using natural conversations and everyday student moments to make the experience relatable.",
    image: "/portfolio/campus-video.jpg",
    imageAlt: "Campus food-spot video thumbnail",
    background: "#dce7e9",
    linkLabel: "Watch video",
    // href: "https://your-video-link.com",
  },
  {
    id: "MARVEL-Tech 7-days Graphic Design Training Program",
    title: "MARVEL-Tech 7-days Graphic Design Training Program",
    category: "Branding",
    description:
      "A campaign created to promote MARVEL-Tech’s seven-day graphic design training, using countdown flyers to build anticipation and keep participants engaged before the sessions began.",
    image: "/portfolio/packaging-project.jpg",
    imageAlt: "Packaging design project",
    background: "#f1e5db",
    placeholder: true,

    gallery: [
      {
      src: "/portfolio/Training/7-days II.jpg",
      alt: "Second fireside chat flyer",
    },
    {
      src: "/portfolio/Training/1 day to go.jpg",
      alt: "Second fireside chat flyer",
    },
     {
      src: "/portfolio/Training/2 days to go.jpg",
      alt: "Second fireside chat flyer",
    },
     {
      src: "/portfolio/Training/3 days to go.jpg",
      alt: "Second fireside chat flyer",
    },
    ],
  },
  {
    id: "Social Media Designs",
    title: "Social Media Designs",
    category: "Graphic Design",
    description:
      "A collection of social media graphics created for different businesses, events, and campaigns, each designed to communicate its message clearly and attract attention online.",
    image: "/portfolio/social-media-designs.jpg",
    imageAlt: "Social media design examples",
    imagePosition: "top",
    background: "#e5e5ef",
    placeholder: true,
    linkLabel: "See Details",

     gallery: [
     {
      src: "/portfolio/social media/Delight Crunchy and More!.jpg",
      alt: "Second fireside chat flyer",
    },
    {
      src: "/portfolio/social media/World OF LIGHT II.jpg",
      alt: "First fireside chat flyer",
    },
   
    {
      src: "/portfolio/social media/August New month.jpg",
      alt: "Third fireside chat flyer",
    },
    {
      src: "/portfolio/social media/Havilah's Food Store II.jpg",
      alt: "Third fireside chat flyer",
    },
    {
      src: "/portfolio/social media/BobbyTechHub.jpg",
      alt: "Third fireside chat flyer",
    },
    {
      src: "/portfolio/social media/Julia Crunch.jpg",
      alt: "Third fireside chat flyer",
    },
  ],
  },
  {
    id: "social-campaign",
    title: "WIN Conference",
    category: "Graphic Design",
    description:
      "A complete promotional campaign for the WIN Conference, including event announcements, webinar publicity, and speaker-focused designs that kept the audience informed.",
    image: "/portfolio/WIN Conference.jpg",
    imageAlt: "Social media campaign designs",
    background: "#e7ebdc",
    placeholder: true,

    gallery: [
    {
      src: "/portfolio/WIN Conference.jpg",
      alt: "First fireside chat flyer",
    },
    {
      src: "/portfolio/WIN CONFERENCE WEBINAR..jpg",
      alt: "Second fireside chat flyer",
    },
    {
      src: "/portfolio/WIN-CONFERENCE - MEET OUR SPEAKER.jpg",
      alt: "Third fireside chat flyer",
    },
  ],
  },
  {
    id: "product-video",
    title: "Product Video",
    category: "Video",
    description:
      "A short product-focused video designed to present the product clearly, highlight its value, and create a more engaging visual experience for potential customers.",
    image: "/portfolio/snaptik_7677898402746649864_v3.mp4",
    imageAlt: "Product video",
    background: "#e4eaf0",
    placeholder: true,
    mediaType: "video",
    linkLabel: "Watch video",
  },
];

function ProjectImage({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const mediaItems = getProjectMedia(project);
  const thumbnail = mediaItems[0];
  const isVideo = thumbnail?.type === "video";
  const canOpen = Boolean(thumbnail?.src) && !failed;

  const frame = (
    <div
      style={{ backgroundColor: project.background }}
      className="relative aspect-[5/3] w-full overflow-hidden rounded-[1.25rem]"
    >
      {failed || !thumbnail?.src ? (
        <div
          role="img"
          aria-label={project.title + ": preview unavailable"}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center text-[#0b1020]/55"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/65">
            <ImageIcon
              aria-hidden="true"
              strokeWidth={1.35}
              className="h-5 w-5"
            />
          </span>
          <span className="font-poppins text-[11px] leading-4">
            {project.placeholder ? "Project preview" : "Preview unavailable"}
          </span>
        </div>
      ) : isVideo ? (
        <video
          src={thumbnail.src}
          controls
          playsInline
          preload="metadata"
          aria-label={thumbnail.alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Image
          src={thumbnail.src}
          alt={thumbnail.alt}
          fill
          sizes="(max-width: 639px) calc((100vw - 84px) / 2), (max-width: 1023px) calc((100vw - 100px) / 2), (max-width: 1279px) calc((100vw - 180px) / 4), 260px"
          onError={() => setFailed(true)}
          style={{
            objectFit: "cover",
            objectPosition: thumbnail.position ?? "center",
          }}
          className="transition duration-700 ease-out group-hover/media:scale-[1.04]"
        />
      )}

      {!isVideo && (
        <div className="pointer-events-none absolute inset-0 bg-[#0b1020]/0 transition-colors duration-300 group-hover/media:bg-[#0b1020]/35" />
      )}

      {(project.placeholder || project.concept) && (
        <span className="font-poppins absolute left-3 top-3 z-10 rounded-full border border-white/50 bg-white/85 px-2.5 py-1 text-[9px] font-medium leading-3 text-[#0b1020]/75 backdrop-blur-sm">
          {project.placeholder ? "Sample project" : "Concept"}
        </span>
      )}

      {mediaItems.length > 1 && canOpen && (
        <span className="font-poppins pointer-events-none absolute right-3 top-3 z-10 rounded-full border border-white/50 bg-white/85 px-2.5 py-1 text-[9px] font-medium leading-3 text-[#0b1020]/75 backdrop-blur-sm">
          {mediaItems.length} items
        </span>
      )}

      {!isVideo && canOpen && (
        <span className="font-poppins pointer-events-none absolute bottom-3 left-3 inline-flex translate-y-2 items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] font-medium text-[#0b1020] opacity-0 shadow-lg transition duration-300 group-hover/media:translate-y-0 group-hover/media:opacity-100">
          View project
          <Maximize2 aria-hidden="true" className="h-3 w-3" />
        </span>
      )}

      {project.category === "Video" && canOpen && !isVideo && (
        <span className="pointer-events-none absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#0b1020] shadow-sm">
          <Play
            aria-hidden="true"
            className="ml-0.5 h-4 w-4 fill-current"
          />
        </span>
      )}
    </div>
  );

  if (isVideo) {
    return <div className="group/media block w-full">{frame}</div>;
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={!canOpen}
      aria-label={"View " + project.title + " image full screen"}
      className="group/media block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] focus-visible:ring-offset-4 focus-visible:ring-offset-white disabled:cursor-default"
    >
      {frame}
    </button>
  );
}

function ProjectLightbox({
  project,
  projectIndex,
  projectCount,
  onClose,
  onPrevious,
  onNext,
}: {
  project: Project;
  projectIndex: number;
  projectCount: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [mediaFailed, setMediaFailed] = useState(false);
  const mediaItems = getProjectMedia(project);
  const currentMedia = mediaItems[mediaIndex] ?? mediaItems[0];
  const currentIsVideo = currentMedia?.type === "video";

  useEffect(() => {
    setMediaIndex(0);
    setMediaFailed(false);
    closeButtonRef.current?.focus();
  }, [project.id]);

  useEffect(() => {
    setMediaFailed(false);
  }, [mediaIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (event.target instanceof HTMLVideoElement) return;

      event.preventDefault();

      if (mediaItems.length > 1) {
        const direction = event.key === "ArrowLeft" ? -1 : 1;

        setMediaIndex((currentIndex) =>
          (currentIndex + direction + mediaItems.length) % mediaItems.length,
        );
        return;
      }

      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mediaItems.length, onClose, onNext, onPrevious]);

  const isExternal = /^https?:\/\//i.test(project.href ?? "");

  function moveMedia(direction: number) {
    if (mediaItems.length < 2) return;

    setMediaIndex(
      (currentIndex) =>
        (currentIndex + direction + mediaItems.length) % mediaItems.length,
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-lightbox-title"
      aria-describedby="portfolio-lightbox-description"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1020]/85 p-3 backdrop-blur-sm sm:p-6 lg:p-10"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.24 }}
        className="relative grid max-h-[92vh] w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[1.5rem] bg-[#f9f9f9] shadow-2xl lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:rounded-[2rem]"
      >
        <div className="relative flex min-h-[42vh] items-center justify-center bg-[#e8eeeb] sm:min-h-[52vh] lg:min-h-[min(78vh,720px)]">
          {mediaFailed || !currentMedia?.src ? (
            <div className="flex flex-col items-center justify-center gap-3 text-center text-[#0b1020]/55">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/65">
                <ImageIcon
                  aria-hidden="true"
                  strokeWidth={1.35}
                  className="h-6 w-6"
                />
              </span>
              <p className="font-poppins text-xs">Project preview</p>
            </div>
          ) : currentIsVideo ? (
            <video
              src={currentMedia.src}
              controls
              playsInline
              preload="metadata"
              aria-label={currentMedia.alt}
              onError={() => setMediaFailed(true)}
              className="max-h-full max-w-full object-contain p-4 sm:p-8 lg:p-12"
            />
          ) : (
            <Image
              src={currentMedia.src}
              alt={currentMedia.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 65vw"
              onError={() => setMediaFailed(true)}
              style={{
                objectFit: "contain",
                objectPosition: currentMedia.position ?? "center",
              }}
              className="object-contain p-4 sm:p-8 lg:p-12"
            />
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b1020]/15 to-transparent lg:hidden" />

          {mediaItems.length > 1 && (
            <div className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full border border-white/60 bg-white/90 p-1 text-[#0b1020] shadow-sm sm:left-5 sm:top-5">
              <button
                type="button"
                onClick={() => moveMedia(-1)}
                aria-label="View previous item in this project"
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[#0b1020]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5]"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <span className="font-poppins min-w-14 px-1 text-center text-[10px] font-semibold tabular-nums">
                {String(mediaIndex + 1).padStart(2, "0")} / {String(mediaItems.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => moveMedia(1)}
                aria-label="View next item in this project"
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[#0b1020]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5]"
              >
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="absolute bottom-3 left-3 flex items-center gap-2 sm:bottom-5 sm:left-5">
            <button
              type="button"
              onClick={onPrevious}
              disabled={projectCount < 2}
              aria-label="View previous project"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#0b1020] shadow-sm transition hover:scale-105 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5]"
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={projectCount < 2}
              aria-label="View next project"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#0b1020] shadow-sm transition hover:scale-105 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5]"
            >
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-col justify-between border-t border-[#0b1020]/10 bg-[#f9f9f9] px-5 py-6 sm:px-8 sm:py-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-12">
          <div>
            <div className="flex items-center justify-between gap-4">
              <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0b1020]/55">
                {project.category}
              </p>
              <p className="font-poppins text-[10px] tabular-nums text-[#0b1020]/45">
                {String(projectIndex + 1).padStart(2, "0")} / {String(projectCount).padStart(2, "0")}
              </p>
            </div>

            <h3
              id="portfolio-lightbox-title"
              className="font-sora mt-4 max-w-md text-2xl font-semibold leading-[1.06] tracking-[-0.045em] text-[#0b1020] sm:text-3xl"
            >
              {project.title}
            </h3>

            <p
              id="portfolio-lightbox-description"
              className="font-poppins mt-5 max-w-md text-sm leading-7 text-[#0b1020]/65"
            >
              {project.description}
            </p>
          </div>

          <div className="mt-8 border-t border-[#0b1020]/10 pt-5">
            {project.href ? (
              <a
                href={project.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="font-poppins inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0b1020] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#05cde5] hover:text-[#0b1020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] focus-visible:ring-offset-2"
              >
                {project.linkLabel ?? "View project"}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                {isExternal && (
                  <span className="sr-only"> (opens in a new tab)</span>
                )}
              </a>
            ) : (
              <p className="font-poppins text-xs leading-5 text-[#0b1020]/50">
                A closer look at selected Handi-X work.
              </p>
            )}
          </div>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close project preview"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#0b1020] shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] focus-visible:ring-offset-2 sm:right-5 sm:top-5"
        >
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const selectedIndex = selectedProject
    ? filteredProjects.findIndex((project) => project.id === selectedProject.id)
    : -1;

  function moveProject(direction: number) {
    if (!selectedProject || filteredProjects.length < 2) return;

    const currentIndex = filteredProjects.findIndex(
      (project) => project.id === selectedProject.id,
    );
    const nextIndex =
      (currentIndex + direction + filteredProjects.length) %
      filteredProjects.length;

    setSelectedProject(filteredProjects[nextIndex]);
  }

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#f9f9f9] py-16 sm:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-[#05cde5]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-[#0b1020]/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.48fr)] lg:items-end lg:gap-16"
        >
          <div className="max-w-3xl">
            <p className="font-poppins inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0b1020]/55 sm:text-[11px]">
              <span className="h-px w-7 bg-[#05cde5]" />
              Selected work
            </p>

            <h2
              id="portfolio-heading"
              className="font-sora mt-5 max-w-3xl text-[clamp(2.35rem,6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-[#0b1020]"
            >
              Work that gives brands something to be remembered by.
            </h2>
          </div>

          <div className="border-l-2 border-[#05cde5] pl-5 lg:mb-1">
            <p className="font-poppins max-w-sm text-sm leading-7 text-[#0b1020]/65 sm:text-[15px]">
              Brand identities, digital experiences, campaign designs and video
              stories—built with intention and made to move people.
            </p>
          </div>
        </motion.header>

        <div className="mt-12 flex flex-col gap-4 border-y border-[#0b1020]/10 py-4 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
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
                  className={"font-poppins inline-flex min-h-10 items-center justify-center rounded-full border px-3.5 py-2 text-[10px] font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] focus-visible:ring-offset-2 sm:px-4 sm:text-xs " + (isActive
                    ? "border-[#0b1020] bg-[#0b1020] text-white"
                    : "border-[#0b1020]/15 bg-transparent text-[#0b1020]/65 hover:border-[#0b1020]/45 hover:text-[#0b1020]")}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <p className="font-poppins text-[10px] font-medium uppercase tracking-[0.14em] text-[#0b1020]/45 sm:shrink-0 sm:text-right">
            {String(filteredProjects.length).padStart(2, "0")}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </p>
        </div>

        <p role="status" className="sr-only">
          Showing {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
          {activeCategory !== "All" ? " in " + activeCategory : ""}.
        </p>

        <motion.div
          id="portfolio-projects"
          layout
          className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4 lg:gap-5"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isExternal = /^https?:\/\//i.test(project.href ?? "");

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35 }}
                  className="group flex h-[300px] min-w-0 flex-col overflow-hidden rounded-[1rem] border border-[#0b1020]/10 bg-white p-2 shadow-[0_6px_22px_rgba(11,16,32,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(11,16,32,0.1)] sm:h-[370px] sm:rounded-[1.15rem] sm:p-2.5 lg:h-[360px]"
                >
                  <ProjectImage
                    project={project}
                    onOpen={() => setSelectedProject(project)}
                  />

                  <div className="flex min-h-0 flex-1 flex-col px-1 pb-1 pt-3 sm:px-1.5 sm:pb-2 sm:pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-poppins text-[8px] font-semibold uppercase tracking-[0.12em] text-[#0b1020]/50 sm:text-[9px]">
                        {project.category}
                      </p>
                      <span className="font-poppins text-[9px] tabular-nums text-[#0b1020]/35">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                      }}
                      className="font-sora mt-1.5 min-h-[2.25rem] break-words text-sm font-semibold leading-tight tracking-[-0.03em] text-[#0b1020] sm:min-h-[2.5rem] sm:text-base"
                    >
                      {project.title}
                    </h3>

                    <p
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                      }}
                      className="font-poppins mt-1.5 min-h-[2.5rem] break-words text-[10px] leading-5 text-[#0b1020]/60 sm:text-xs sm:leading-5"
                    >
                      {project.description}
                    </p>

                    <div className="mt-auto border-t border-[#0b1020]/10 pt-2 sm:pt-2.5">
                      {project.href ? (
                        <a
                          href={project.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="font-poppins inline-flex min-h-10 items-center gap-1.5 text-[11px] font-medium text-[#0b1020] transition-colors hover:text-[#05a9bd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] focus-visible:ring-offset-2 sm:text-xs"
                        >
                          {project.linkLabel ?? "View project"}
                          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                          {isExternal && (
                            <span className="sr-only"> (opens in a new tab)</span>
                          )}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="font-poppins inline-flex min-h-10 items-center gap-1.5 text-[11px] font-medium text-[#0b1020] transition-colors hover:text-[#05a9bd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] focus-visible:ring-offset-2 sm:text-xs"
                        >
                          {project.linkLabel ?? "See details"}
                          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && selectedIndex >= 0 && (
          <ProjectLightbox
            project={selectedProject}
            projectIndex={selectedIndex}
            projectCount={filteredProjects.length}
            onClose={() => setSelectedProject(null)}
            onPrevious={() => moveProject(-1)}
            onNext={() => moveProject(1)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
