"use client";

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
import { createClient } from "@/lib/supabase/client";

type Category = "All" | "Branding" | "Graphic Design" | "Video";
type ProjectCategory = Exclude<Category, "All">;

type ProjectMedia = {
  src: string;
  alt: string;
  type?: "image" | "video";
  position?: string;
};

type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  background: string;
  href?: string;
  linkLabel?: string;
  mediaType?: "image" | "video";
  gallery?: ProjectMedia[];
};

type ProjectRow = {
  id: string;
  title: string;
  category: string;
  description: string;
  cover_path: string | null;
  href: string | null;
  link_label: string | null;
  published: boolean;
  sort_order: number | null;
  created_at: string;
};

type MediaRow = {
  project_id: string;
  file_path: string;
  media_type: "image" | "video";
  alt_text: string | null;
  position: string | null;
  sort_order: number | null;
};

const categories: Category[] = ["All", "Branding", "Graphic Design", "Video"];

const categoryBackgrounds: Record<ProjectCategory, string> = {
  Branding: "#e8eeeb",
  "Graphic Design": "#eee4d8",
  Video: "#dce7e9",
};

function isProjectCategory(value: string): value is ProjectCategory {
  return (
    value === "Branding" || value === "Graphic Design" || value === "Video"
  );
}

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

function ProjectImage({
  project,
  onOpen,
  frameClassName,
}: {
  project: Project;
  onOpen: () => void;
  frameClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  const mediaItems = getProjectMedia(project);
  const thumbnail = mediaItems[0];
  const isVideo = thumbnail?.type === "video";
  const canOpen = Boolean(thumbnail?.src) && !failed;

  const frame = (
    <div
      style={{ backgroundColor: project.background }}
      className={`relative w-full overflow-hidden rounded-[0.75rem] border border-[#0b1020]/10 ${frameClassName ?? "aspect-[1.28/1]"}`}
    >
      {failed || !thumbnail?.src ? (
        <div
          role="img"
          aria-label={`${project.title}: preview unavailable`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center text-[#0b1020]/45"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70">
            <ImageIcon
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={1.35}
            />
          </span>
          <span className="font-poppins text-[10px]">Preview unavailable</span>
        </div>
      ) : isVideo ? (
        <video
          src={thumbnail.src}
          controls
          playsInline
          preload="metadata"
          aria-label={thumbnail.alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover/media:scale-[1.02]"
        />
      ) : (
        <img
          src={thumbnail.src}
          alt={thumbnail.alt}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ objectPosition: thumbnail.position ?? "center" }}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover/media:scale-[1.025]"
        />
      )}

      {canOpen && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1020]/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/media:opacity-100" />
      )}

      {mediaItems.length > 1 && canOpen && (
        <span className="font-poppins pointer-events-none absolute right-2 top-2 rounded-full border border-white/60 bg-white/90 px-2 py-1 text-[8px] font-medium text-[#0b1020]/75 backdrop-blur-sm">
          {mediaItems.length} items
        </span>
      )}

      {project.category === "Video" && canOpen && !isVideo && (
        <span className="pointer-events-none absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#0b1020] shadow-sm">
          <Play
            aria-hidden="true"
            className="ml-0.5 h-3 w-3 fill-current"
          />
        </span>
      )}

      {!isVideo && canOpen && (
        <span className="font-poppins pointer-events-none absolute bottom-2 left-2 inline-flex translate-y-1 items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[9px] font-medium text-[#0b1020] opacity-0 shadow-lg transition duration-300 group-hover/media:translate-y-0 group-hover/media:opacity-100">
          Open case study
          <Maximize2 aria-hidden="true" className="h-3 w-3" />
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
      aria-label={`View ${project.title} image full screen`}
      className="group/media block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f9f9f9] disabled:cursor-default"
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
  const projectNumber = String(projectIndex + 1).padStart(2, "0");
  const projectTotal = String(projectCount).padStart(2, "0");

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (event.target instanceof HTMLVideoElement) return;

      event.preventDefault();

      const direction = event.key === "ArrowLeft" ? -1 : 1;

      if (event.shiftKey && mediaItems.length > 1) {
        setMediaFailed(false);
        setMediaIndex(
          (currentIndex) =>
            (currentIndex + direction + mediaItems.length) % mediaItems.length,
        );
        return;
      }

      if (direction < 0) onPrevious();
      if (direction > 0) onNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mediaItems.length, onClose, onNext, onPrevious]);

  const isExternal = /^https?:\/\//i.test(project.href ?? "");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-lightbox-title"
      aria-describedby="portfolio-lightbox-description"
      className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[#07101d]/85 px-2 py-2 backdrop-blur-md sm:px-6 sm:py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close project preview"
        className="group fixed right-3 top-3 z-[70] inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/90 text-[#0b1020] shadow-[0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-md transition hover:border-[#05cde5] hover:bg-[#0b1020] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] sm:right-6 sm:top-6 sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-2"
      >
        <span className="font-poppins hidden text-[9px] font-semibold uppercase tracking-[0.12em] sm:inline">
          Close
        </span>
        <X
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-90"
        />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.985 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto my-2 flex max-h-[calc(100dvh-1rem)] w-full max-w-6xl flex-col overflow-y-auto overscroll-contain rounded-[1.35rem] border border-white/20 bg-[#f9f9f9] shadow-[0_30px_120px_rgba(0,0,0,0.46)] lg:my-0 lg:grid lg:max-h-[88vh] lg:grid-cols-[minmax(0,1.45fr)_minmax(290px,0.65fr)] lg:overflow-hidden"
      >
        <div
          className="relative flex h-[38dvh] min-h-[14rem] max-h-[25rem] shrink-0 items-center justify-center overflow-hidden sm:h-[48vh] sm:max-h-none lg:h-auto lg:min-h-[min(62vh,560px)]"
          style={{ backgroundColor: project.background }}
        >
          <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden">
            {mediaFailed || !currentMedia?.src ? (
              <div className="flex flex-col items-center justify-center gap-3 text-center text-[#0b1020]/50">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70">
                  <ImageIcon
                    aria-hidden="true"
                    className="h-5 w-5"
                    strokeWidth={1.35}
                  />
                </span>
                <p className="font-poppins text-xs">
                  Project preview unavailable
                </p>
              </div>
            ) : currentIsVideo ? (
              <video
                src={currentMedia.src}
                controls
                playsInline
                preload="metadata"
                aria-label={currentMedia.alt}
                onError={() => setMediaFailed(true)}
                className="block h-auto w-auto max-h-[calc(38dvh-2.5rem)] max-w-[calc(100%_-_2rem)] object-contain sm:max-h-[calc(48vh-3rem)] sm:max-w-[calc(100%_-_3rem)] lg:max-h-[calc(62vh-3.5rem)] lg:max-w-[calc(100%_-_3rem)]"
              />
            ) : (
              <img
                src={currentMedia.src}
                alt={currentMedia.alt}
                onError={() => setMediaFailed(true)}
                style={{ objectPosition: currentMedia.position ?? "center" }}
                className="block h-auto w-auto max-h-[calc(38dvh-2.5rem)] max-w-[calc(100%_-_2rem)] object-contain sm:max-h-[calc(48vh-3rem)] sm:max-w-[calc(100%_-_3rem)] lg:max-h-[calc(62vh-3.5rem)] lg:max-w-[calc(100%_-_3rem)]"
              />
            )}
          </div>

          <div className="pointer-events-none absolute left-4 top-4 z-20 flex items-center gap-2 text-[#0b1020] sm:left-5 sm:top-5">
            <span className="font-poppins text-[9px] font-semibold uppercase tracking-[0.18em]">
              Work {projectNumber}
            </span>
            <span className="h-px w-6 bg-[#05cde5]" />
            <span className="font-poppins text-[9px] uppercase tracking-[0.14em] text-[#0b1020]/50">
              {projectTotal} selected
            </span>
          </div>

          <button
            type="button"
            onClick={onPrevious}
            disabled={projectCount < 2}
            aria-label="View previous project"
            className="group absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#0b1020]/10 bg-[#f9f9f9]/80 text-[#0b1020] shadow-[0_6px_18px_rgba(11,16,32,0.12)] backdrop-blur-sm transition duration-200 hover:border-[#05cde5] hover:bg-[#0b1020] hover:text-white disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] sm:left-4"
          >
            <ArrowLeft
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
            />
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={projectCount < 2}
            aria-label="View next project"
            className="group absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#0b1020]/10 bg-[#f9f9f9]/80 text-[#0b1020] shadow-[0_6px_18px_rgba(11,16,32,0.12)] backdrop-blur-sm transition duration-200 hover:border-[#05cde5] hover:bg-[#0b1020] hover:text-white disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] sm:right-4"
          >
            <ArrowRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>

          {mediaItems.length > 1 && (
            <div
              role="group"
              aria-label="Select project media"
              className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-end sm:inset-x-5 sm:bottom-5"
            >
          <div className="flex max-w-[78%] touch-pan-x items-center gap-1.5 overflow-x-auto rounded-[0.85rem] border border-[#0b1020]/10 bg-[#f9f9f9]/88 p-1.5 shadow-[0_8px_24px_rgba(11,16,32,0.16)] backdrop-blur-sm">
                {mediaItems.map((media, index) => {
                  const active = index === mediaIndex;

                  return (
                    <button
                      key={`${media.src}-${index}`}
                      type="button"
                      onClick={() => {
                        setMediaFailed(false);
                        setMediaIndex(index);
                      }}
                      aria-label={`View media ${index + 1} of ${mediaItems.length}`}
                      aria-current={active ? "true" : undefined}
                      className={`group relative h-9 w-12 shrink-0 overflow-hidden rounded-[0.55rem] border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] ${active ? "border-[#05cde5] opacity-100 ring-1 ring-[#05cde5]" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      {media.type === "video" ? (
                        <video
                          src={media.src}
                          muted
                          playsInline
                          preload="metadata"
                          aria-hidden="true"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <img
                          src={media.src}
                          alt=""
                          aria-hidden="true"
                          className="h-full w-full object-cover"
                        />
                      )}
                      {media.type === "video" && (
                        <span className="absolute inset-0 flex items-center justify-center bg-[#0b1020]/20 text-white">
                          <Play
                            aria-hidden="true"
                            className="h-3 w-3 fill-current"
                          />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <aside className="flex min-h-0 flex-col justify-between overflow-visible border-t border-[#0b1020]/10 bg-[#f9f9f9] px-5 py-5 sm:px-7 sm:py-6 lg:border-l lg:border-t-0 lg:px-8 lg:py-8 lg:overflow-y-auto">
          <div>
            <div className="flex items-center justify-between gap-4">
              <p className="font-poppins text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0b1020]/50">
                Selected project
              </p>
              <span className="font-poppins text-[9px] uppercase tracking-[0.14em] text-[#0b1020]/35">
                {project.category}
              </span>
            </div>

            <div className="mt-6">
              <p className="font-poppins text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0b1020]/35">
                Case study / {projectNumber}
              </p>
              <h3
                id="portfolio-lightbox-title"
                className="font-sora mt-3 max-w-md text-[clamp(1.5rem,2.5vw,2.35rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-[#0b1020]"
              >
                {project.title}
              </h3>
              <div className="mt-5 h-px w-12 bg-[#05cde5]" />
              <p
                id="portfolio-lightbox-description"
                className="font-poppins mt-4 max-w-md text-[12px] leading-5 text-[#0b1020]/65 sm:text-[13px] sm:leading-6"
              >
                {project.description}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-[#0b1020]/10 pt-4">
            <div className="flex items-center justify-between gap-4">
              {project.href ? (
                <a
                  href={project.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="font-poppins inline-flex items-center gap-2 border-b border-[#0b1020]/35 pb-1.5 text-[11px] font-semibold text-[#0b1020] transition hover:border-[#05cde5] hover:text-[#05aeca] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] focus-visible:ring-offset-4"
                >
                  {project.linkLabel ?? "View project"}
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  {isExternal && (
                    <span className="sr-only"> (opens in a new tab)</span>
                  )}
                </a>
              ) : (
                <p className="font-poppins text-[11px] leading-5 text-[#0b1020]/45">
                  A closer look at selected Handi-X work.
                </p>
              )}
              <span className="font-poppins text-[9px] uppercase tracking-[0.14em] text-[#0b1020]/35">
                {projectNumber} / {projectTotal}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-[#0b1020]/10 pt-3">
              <button
                type="button"
                onClick={onPrevious}
                disabled={projectCount < 2}
                className="group flex items-center gap-2 border border-[#0b1020]/10 px-3 py-2 text-left font-poppins text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0b1020]/65 transition hover:border-[#05cde5] hover:text-[#0b1020] disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5]"
              >
                <ArrowLeft
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
                />
                Previous
              </button>
              <button
                type="button"
                onClick={onNext}
                disabled={projectCount < 2}
                className="group flex items-center justify-end gap-2 border border-[#0b1020]/10 px-3 py-2 text-right font-poppins text-[10px] font-semibold uppercase tracking-[0.12em] text-[#0b1020]/65 transition hover:border-[#05cde5] hover:text-[#0b1020] disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5]"
              >
                Next
                <ArrowRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </div>

            <p className="font-poppins mt-3 text-[9px] leading-5 text-[#0b1020]/35">
              Shift + ← → browses this project&apos;s media
            </p>
          </div>
        </aside>

      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const reduceMotion = useReducedMotion();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        const supabase = createClient();

        const { data: projectData, error: projectError } = await supabase
          .from("portfolio_projects")
          .select(
            "id, title, category, description, cover_path, href, link_label, published, sort_order, created_at",
          )
          .eq("published", true)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (projectError) throw projectError;

        const projectRows = (projectData ?? []) as ProjectRow[];
        const projectIds = projectRows.map((project) => project.id);

        let mediaRows: MediaRow[] = [];

        if (projectIds.length > 0) {
          const { data: mediaData, error: mediaError } = await supabase
            .from("portfolio_media")
            .select(
              "project_id, file_path, media_type, alt_text, position, sort_order",
            )
            .in("project_id", projectIds)
            .order("sort_order", { ascending: true });

          if (mediaError) throw mediaError;
          mediaRows = (mediaData ?? []) as MediaRow[];
        }

        const mediaByProject = new Map<string, MediaRow[]>();

        for (const media of mediaRows) {
          const existing = mediaByProject.get(media.project_id) ?? [];
          existing.push(media);
          mediaByProject.set(media.project_id, existing);
        }

        const publicUrl = (path: string) =>
          supabase.storage.from("portfolio-media").getPublicUrl(path).data
            .publicUrl;

        const mappedProjects: Project[] = projectRows
          .filter((project) => isProjectCategory(project.category))
          .map((project) => {
            const additionalMedia: ProjectMedia[] = (
              mediaByProject.get(project.id) ?? []
            ).map((media) => ({
              src: publicUrl(media.file_path),
              alt: media.alt_text || project.title,
              type: media.media_type,
              position: media.position ?? undefined,
            }));

            const coverMedia: ProjectMedia[] = project.cover_path
              ? [
                  {
                    src: publicUrl(project.cover_path),
                    alt: project.title,
                    type: "image",
                    position: undefined,
                  },
                ]
              : [];

            const allMedia: ProjectMedia[] = [
              ...coverMedia,
              ...additionalMedia,
            ].filter(
              (media, index, collection) =>
                media.src &&
                collection.findIndex((item) => item.src === media.src) ===
                  index,
            );

            const primaryMedia = allMedia[0];
            const category = project.category as ProjectCategory;

            return {
              id: project.id,
              title: project.title,
              category,
              description: project.description,
              image: primaryMedia?.src ?? "",
              imageAlt: primaryMedia?.alt ?? project.title,
              imagePosition: primaryMedia?.position,
              background: categoryBackgrounds[category],
              href: project.href || undefined,
              linkLabel: project.link_label || undefined,
              mediaType: primaryMedia?.type,
              gallery: allMedia.length > 1 ? allMedia : undefined,
            };
          });

        if (!cancelled) {
          setProjects(mappedProjects);
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "We could not load the portfolio right now.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);

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

  const visibleProjects = filteredProjects;

  const selectedIndex = selectedProject
    ? visibleProjects.findIndex((project) => project.id === selectedProject.id)
    : -1;

  function handleCategoryChange(category: Category) {
    setActiveCategory(category);
    setCarouselIndex(0);

    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }

    if (
      selectedProject &&
      category !== "All" &&
      selectedProject.category !== category
    ) {
      setSelectedProject(null);
    }
  }

  function moveProject(direction: number) {
    if (!selectedProject || visibleProjects.length < 2) return;

    const currentIndex = visibleProjects.findIndex(
      (project) => project.id === selectedProject.id,
    );

    const nextIndex =
      (currentIndex + direction + visibleProjects.length) %
      visibleProjects.length;

    setSelectedProject(visibleProjects[nextIndex]);
  }

  function handleCarouselScroll() {
    const carousel = carouselRef.current;
    const firstCard = carousel?.querySelector<HTMLElement>(
      "[data-portfolio-card]",
    );

    if (!carousel || !firstCard) return;

    const cardStep = firstCard.offsetWidth + 20;
    const nextIndex = Math.round(carousel.scrollLeft / cardStep);

    setCarouselIndex(
      Math.max(0, Math.min(nextIndex, visibleProjects.length - 1)),
    );
  }

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="relative overflow-hidden bg-[#f9f9f9] py-12 sm:py-14 lg:py-16"
    >
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="border-t border-[#0b1020]/15 pt-4 sm:pt-5"
        >
          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
            <div>
              <div className="flex items-center justify-between border-b border-[#0b1020]/15 pb-3 lg:max-w-xl">
                <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0b1020]/55">
                  Selected work
                </p>
                <span className="font-poppins text-[10px] tabular-nums text-[#0b1020]/40">
                  02 / Work
                </span>
              </div>

              <h2
                id="portfolio-heading"
                className="font-sora mt-4 max-w-2xl text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[0.97] tracking-[-0.075em] text-[#0b1020]"
              >
                Crafted with a point of view.
              </h2>
            </div>

            <div className="lg:pb-1">
              <p className="font-poppins max-w-md text-[12px] leading-5 text-[#0b1020]/60 sm:text-[13px] sm:leading-6">
                A considered selection of identities, campaigns, and digital
                experiences built to make the right impression.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#0b1020]/15 pt-3.5">
                <p className="font-poppins mr-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0b1020]/45">
                  Browse by discipline
                </p>

                <div
                  role="group"
                  aria-label="Filter projects by category"
                  className="flex flex-wrap gap-x-4 gap-y-2"
                >
                  {categories.map((category) => {
                    const isActive = activeCategory === category;

                    return (
                      <button
                        key={category}
                        type="button"
                        aria-pressed={isActive}
                        aria-controls="portfolio-projects"
                        onClick={() => handleCategoryChange(category)}
                        className={
                          "font-poppins relative pb-1 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] focus-visible:ring-offset-2 " +
                          (isActive
                            ? "text-[#0b1020] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-[#05cde5]"
                            : "text-[#0b1020]/45 hover:text-[#0b1020]")
                        }
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        <p role="status" className="sr-only">
          Showing {visibleProjects.length} of {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}.
        </p>

        {loading && (
          <div className="mt-8 flex gap-5 overflow-hidden">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="w-[78vw] max-w-[20rem] shrink-0 animate-pulse sm:w-[42vw] sm:max-w-[21rem] lg:w-auto lg:flex-1"
              >
                <div className="aspect-[1.38/1] rounded-[0.85rem] bg-[#0b1020]/[0.07]" />
                <div className="mt-4 space-y-3">
                  <div className="h-2.5 w-20 rounded-full bg-[#0b1020]/10" />
                  <div className="h-6 w-3/5 rounded-full bg-[#0b1020]/10" />
                  <div className="h-3 w-full rounded-full bg-[#0b1020]/[0.07]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && errorMessage && (
          <div className="mt-8 border-t border-[#0b1020]/15 py-8 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {!loading && !errorMessage && filteredProjects.length === 0 && (
          <div className="mt-8 border-y border-dashed border-[#0b1020]/20 py-12 text-center">
            <p className="font-sora text-lg font-semibold text-[#0b1020]">
              No projects in this category yet.
            </p>
            <p className="font-poppins mx-auto mt-2 max-w-md text-sm leading-6 text-[#0b1020]/55">
              Publish a project from the Handi-X admin dashboard and it will
              appear here.
            </p>
          </div>
        )}

        {!loading &&
          !errorMessage &&
          filteredProjects.length > 0 && (
            <div className="mt-8 sm:mt-10">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[#0b1020]/45">
                  <span className="font-poppins text-[10px] font-semibold uppercase tracking-[0.15em]">
                    Swipe to explore
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-[#05cde5]"
                  />
                </div>

                <div
                  className="flex items-center gap-2"
                  aria-hidden="true"
                >
                  <span className="font-poppins text-[10px] tabular-nums text-[#0b1020]/40">
                    {String(carouselIndex + 1).padStart(2, "0")} /{" "}
                    {String(visibleProjects.length).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-1">
                    {visibleProjects.map((project, index) => (
                      <span
                        key={project.id}
                        className={
                          "block h-1 rounded-full transition-all duration-300 " +
                          (carouselIndex === index
                            ? "w-5 bg-[#0b1020]"
                            : "w-1.5 bg-[#0b1020]/20")
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#f9f9f9] via-[#f9f9f9]/80 to-transparent sm:w-14 lg:w-20"
                />

                <div
                  id="portfolio-projects"
                  ref={carouselRef}
                  onScroll={handleCarouselScroll}
                  style={{ touchAction: "pan-x pan-y" }}
                  className="flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-3 pr-[18vw] select-none active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:pr-8"
                >
                  {visibleProjects.map((project, index) => {
                    const isExternal = /^https?:\/\//i.test(project.href ?? "");
                    const mediaCount = getProjectMedia(project).length;

                    return (
                      <motion.article
                        key={project.id}
                        data-portfolio-card="true"
                        layout
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.3,
                          delay: reduceMotion ? 0 : index * 0.04,
                        }}
                        className="group w-[78vw] max-w-[20rem] shrink-0 snap-start sm:w-[42vw] sm:max-w-[21rem] lg:w-[34%] lg:max-w-[25rem] lg:flex-none"
                      >
                        <ProjectImage
                          project={project}
                          onOpen={() => setSelectedProject(project)}
                          frameClassName="aspect-[1.38/1] rounded-[0.85rem]"
                        />

                        <div className="mt-3">
                          <div className="flex items-center justify-between gap-3 border-b border-[#0b1020]/15 pb-2.5">
                            <div className="flex min-w-0 items-center gap-2">
                              <span className="font-poppins text-[10px] font-semibold tabular-nums text-[#0b1020]/35">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <p className="font-poppins truncate text-[9px] font-semibold uppercase tracking-[0.15em] text-[#0b1020]/50">
                                {project.category}
                              </p>
                            </div>

                            {mediaCount > 1 && (
                              <span className="font-poppins shrink-0 text-[9px] text-[#0b1020]/35">
                                {mediaCount} views
                              </span>
                            )}
                          </div>

                          <div className="mt-2.5 flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="font-sora break-words text-[clamp(1.15rem,2vw,1.65rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-[#0b1020]">
                                {project.title}
                              </h3>
                              <p className="font-poppins mt-2 line-clamp-2 max-w-lg text-[10px] leading-[1.6] text-[#0b1020]/60 sm:text-[11px]">
                                {project.description}
                              </p>
                            </div>

                            {project.href ? (
                              <a
                                href={project.href}
                                target={isExternal ? "_blank" : undefined}
                                rel={
                                  isExternal
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0b1020]/15 text-[#0b1020] transition-colors hover:border-[#05cde5] hover:bg-[#05cde5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] focus-visible:ring-offset-2"
                                aria-label={"View " + project.title}
                              >
                                <ArrowUpRight
                                  aria-hidden="true"
                                  className="h-3.5 w-3.5"
                                />
                                {isExternal && (
                                  <span className="sr-only">
                                    {" "}(opens in a new tab)
                                  </span>
                                )}
                              </a>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setSelectedProject(project)}
                                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#0b1020]/15 text-[#0b1020] transition-colors hover:border-[#05cde5] hover:bg-[#05cde5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#05cde5] focus-visible:ring-offset-2"
                                aria-label={
                                  "View " + project.title + " case study"
                                }
                              >
                                <ArrowUpRight
                                  aria-hidden="true"
                                  className="h-3.5 w-3.5"
                                />
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        <AnimatePresence>
          {selectedProject && selectedIndex >= 0 && (
            <ProjectLightbox
              key={selectedProject.id}
              project={selectedProject}
              projectIndex={selectedIndex}
              projectCount={visibleProjects.length}
              onClose={() => setSelectedProject(null)}
              onPrevious={() => moveProject(-1)}
              onNext={() => moveProject(1)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
