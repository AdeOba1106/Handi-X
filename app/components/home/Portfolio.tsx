"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Category = "All" | "Branding" | "Graphic Design" | "Video";
type ProjectCategory = Exclude<Category, "All">;

type ProjectMedia = {
  src: string;
  alt: string;
  type: "image" | "video";
  position?: string;
};

type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  href?: string;
  linkLabel?: string;
  media: ProjectMedia[];
};

type ProjectRow = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  cover_path: string | null;
  href: string | null;
  link_label: string | null;
};

type MediaRow = {
  project_id: string;
  file_path: string;
  media_type: "image" | "video";
  alt_text: string | null;
  position: string | null;
};

const categories: Category[] = ["All", "Branding", "Graphic Design", "Video"];

function isProjectCategory(value: string): value is ProjectCategory {
  return value === "Branding" || value === "Graphic Design" || value === "Video";
}

function ProjectMediaView({
  media,
  title,
  fit = "cover",
  controls = false,
}: {
  media?: ProjectMedia;
  title: string;
  fit?: "cover" | "contain";
  controls?: boolean;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = failedSrc === media?.src;

  if (!media?.src || failed) {
    return (
      <div
        role="img"
        aria-label={`${title}: preview unavailable`}
        className="flex h-full min-h-48 items-center justify-center bg-neutral-100 px-6 text-center text-sm text-neutral-500"
      >
        Preview unavailable
      </div>
    );
  }

  const fitClass = fit === "cover" ? "object-cover" : "object-contain";

  return media.type === "video" ? (
    <video
      src={media.src}
      aria-label={media.alt || title}
      controls={controls}
      muted={!controls}
      playsInline
      preload={controls ? "metadata" : "none"}
      onError={() => setFailedSrc(media.src)}
      className={`h-full w-full bg-neutral-100 ${fitClass}`}
    />
  ) : (
    <img
      src={media.src}
      alt={media.alt || title}
      loading={controls ? "eager" : "lazy"}
      onError={() => setFailedSrc(media.src)}
      style={{ objectPosition: media.position ?? "center" }}
      className={`h-full w-full bg-neutral-100 ${fitClass}`}
    />
  );
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const detailHeadingRef = useRef<HTMLHeadingElement>(null);
  const returnFocusId = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      setLoading(true);
      setErrorMessage("");

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

        if (projectError) throw new Error(projectError.message);

        const projectRows = (projectData ?? []) as ProjectRow[];
        const projectIds = projectRows.map((project) => project.id);
        let mediaRows: MediaRow[] = [];

        if (projectIds.length) {
          const { data, error } = await supabase
            .from("portfolio_media")
            .select("project_id, file_path, media_type, alt_text, position, sort_order")
            .in("project_id", projectIds)
            .order("sort_order", { ascending: true });

          if (error) throw new Error(error.message);
          mediaRows = (data ?? []) as MediaRow[];
        }

        const mediaByProject = new Map<string, MediaRow[]>();
        mediaRows.forEach((media) => {
          const current = mediaByProject.get(media.project_id) ?? [];
          current.push(media);
          mediaByProject.set(media.project_id, current);
        });

        const publicUrl = (path: string) =>
          supabase.storage.from("portfolio-media").getPublicUrl(path).data.publicUrl;

        const result = projectRows
          .filter((project) => isProjectCategory(project.category))
          .map((project): Project => {
            const media: ProjectMedia[] = [
              ...(project.cover_path
                ? [{
                    src: publicUrl(project.cover_path),
                    alt: project.title,
                    type: "image" as const,
                  }]
                : []),
              ...(mediaByProject.get(project.id) ?? []).map((item) => ({
                src: publicUrl(item.file_path),
                alt: item.alt_text || project.title,
                type: item.media_type,
                position: item.position ?? undefined,
              })),
            ];

            return {
              id: project.id,
              title: project.title,
              category: project.category as ProjectCategory,
              description: project.description ?? "",
              href: project.href || undefined,
              linkLabel: project.link_label || undefined,
              media: Array.from(new Map(media.map((item) => [item.src, item])).values()),
            };
          });

        if (!cancelled) setProjects(result);
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "We could not load the portfolio. Please try again.",
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
  }, [reloadKey]);

  useEffect(() => {
    if (selectedProject) {
      sectionRef.current?.scrollIntoView({ block: "start" });
      detailHeadingRef.current?.focus({ preventScroll: true });
      return;
    }

    const projectId = returnFocusId.current;
    if (!projectId) return;

    const cards = sectionRef.current?.querySelectorAll<HTMLButtonElement>(
      "[data-project-id]",
    );
    const target = Array.from(cards ?? []).find(
      (button) => button.dataset.projectId === projectId,
    );
    target?.focus({ preventScroll: true });
    returnFocusId.current = null;
  }, [selectedProject]);

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory, projects],
  );

  function openProject(project: Project) {
    returnFocusId.current = project.id;
    setActiveMediaIndex(0);
    setSelectedProject(project);
  }

  function moveMedia(direction: number) {
    if (!selectedProject?.media.length) return;
    setActiveMediaIndex((index) =>
      (index + direction + selectedProject.media.length) % selectedProject.media.length,
    );
  }

  const selectedMedia = selectedProject?.media[activeMediaIndex];
  const selectedProjectExternal = /^https?:\/\//i.test(
    selectedProject?.href ?? "",
  );

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="scroll-mt-24 bg-white px-5 py-16 text-neutral-950 sm:px-8 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {selectedProject ? (
          <div aria-labelledby="portfolio-project-title">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950 focus-visible:outline-none focus-visible:underline"
            >
              <span aria-hidden="true">←</span>
              Back to all projects
            </button>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.7fr)] lg:gap-14">
              <div>
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 sm:aspect-[16/11]">
                  <ProjectMediaView
                    media={selectedMedia}
                    title={selectedProject.title}
                    fit="contain"
                    controls
                  />
                </div>

                {selectedProject.media.length > 1 && (
                  <div className="mt-4 flex items-center justify-between border-b border-neutral-200 pb-4">
                    <button
                      type="button"
                      onClick={() => moveMedia(-1)}
                      className="text-sm font-medium text-neutral-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:underline"
                    >
                      ← Previous
                    </button>
                    <span className="text-xs tabular-nums text-neutral-500">
                      {activeMediaIndex + 1} of {selectedProject.media.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => moveMedia(1)}
                      className="text-sm font-medium text-neutral-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:underline"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>

              <aside className="lg:sticky lg:top-8 lg:self-start">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">
                  {selectedProject.category}
                </p>
                <h2
                  ref={detailHeadingRef}
                  id="portfolio-project-title"
                  tabIndex={-1}
                  className="mt-3 text-3xl font-semibold tracking-tight focus:outline-none sm:text-4xl"
                >
                  {selectedProject.title}
                </h2>
                {selectedProject.description && (
                  <p className="mt-5 text-base leading-7 text-neutral-600">
                    {selectedProject.description}
                  </p>
                )}
                {selectedProject.href && (
                  <a
                    href={selectedProject.href}
                    target={selectedProjectExternal ? "_blank" : undefined}
                    rel={selectedProjectExternal ? "noopener noreferrer" : undefined}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-neutral-950 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                  >
                    {selectedProject.linkLabel || "Visit project"}
                    <span aria-hidden="true">↗</span>
                    {selectedProjectExternal && (
                      <span className="sr-only">(opens in a new tab)</span>
                    )}
                  </a>
                )}
              </aside>
            </div>
          </div>
        ) : (
          <>
            <header className="mb-8 flex flex-col gap-7 border-b border-neutral-200 pb-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                  Portfolio
                </p>
                <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  Selected work
                </h2>
                <p className="mt-3 max-w-xl text-base leading-7 text-neutral-600">
                  A selection of branding, design and video projects.
                </p>
              </div>

              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Filter projects"
              >
                {categories.map((category) => {
                  const active = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setActiveCategory(category)}
                      className={
                        "rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 " +
                        (active
                          ? "border-neutral-950 bg-neutral-950 text-white"
                          : "border-neutral-300 text-neutral-700 hover:border-neutral-950 hover:text-neutral-950")
                      }
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </header>

            <p className="sr-only" role="status" aria-live="polite">
              {loading
                ? "Loading projects"
                : "Showing " +
                  filteredProjects.length +
                  (filteredProjects.length === 1 ? " project" : " projects")}
            </p>

            {loading && (
              <div
                className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3"
                aria-hidden="true"
              >
                {[1, 2, 3].map((item) => (
                  <div key={item}>
                    <div className="aspect-[4/3] animate-pulse rounded-xl bg-neutral-100" />
                    <div className="mt-4 h-4 w-1/3 animate-pulse rounded bg-neutral-100" />
                    <div className="mt-3 h-6 w-2/3 animate-pulse rounded bg-neutral-100" />
                  </div>
                ))}
              </div>
            )}

            {!loading && errorMessage && (
              <div
                className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800"
                role="alert"
              >
                <p>{errorMessage}</p>
                <button
                  type="button"
                  onClick={() => setReloadKey((key) => key + 1)}
                  className="mt-3 font-semibold underline underline-offset-4"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !errorMessage && filteredProjects.length === 0 && (
              <div className="rounded-xl border border-dashed border-neutral-300 px-6 py-16 text-center">
                <h3 className="text-lg font-medium">No projects to show</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Published projects will appear here.
                </p>
              </div>
            )}

            {!loading && !errorMessage && filteredProjects.length > 0 && (
              <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
                {filteredProjects.map((project) => {
                  const isExternal = /^https?:\/\//i.test(project.href ?? "");
                  return (
                    <article key={project.id} className="min-w-0">
                      <button
                        type="button"
                        data-project-id={project.id}
                        onClick={() => openProject(project)}
                        aria-label={"View " + project.title + " details"}
                        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4"
                      >
                        <ProjectMediaView
                          media={project.media[0]}
                          title={project.title}
                        />
                        <span className="absolute bottom-3 right-3 rounded-full bg-white px-2.5 py-1.5 text-[10px] font-medium text-neutral-900 shadow-sm sm:px-3 sm:text-xs">
                          View project
                        </span>
                      </button>

                      <div className="pt-4">
                        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-500 sm:text-xs">
                          {project.category}
                        </p>
                        <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight sm:text-xl">
                          <button
                            type="button"
                            onClick={() => openProject(project)}
                            className="text-left hover:text-emerald-800 focus-visible:outline-none focus-visible:underline"
                          >
                            {project.title}
                          </button>
                        </h3>
                        {project.description && (
                          <p className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-600 sm:text-sm sm:leading-6">
                            {project.description}
                          </p>
                        )}
                        {project.href && (
                          <a
                            href={project.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald-800 hover:text-emerald-950 focus-visible:outline-none focus-visible:underline sm:text-sm"
                          >
                            {project.linkLabel || "Visit project"}
                            <span aria-hidden="true">↗</span>
                            {isExternal && (
                              <span className="sr-only">
                                (opens in a new tab)
                              </span>
                            )}
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
