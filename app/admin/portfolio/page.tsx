"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Category = "Branding" | "Graphic Design" | "Video";

const BUCKET = "portfolio-media";

function slugify(value: string) {
  const base = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);

  return `${base || "project"}-${crypto.randomUUID().slice(0, 8)}`;
}

function safeFileName(name: string) {
  const extension = name.includes(".")
    ? `.${name.split(".").pop() ?? ""}`.toLowerCase()
    : "";

  const base = name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return `${base || "media"}${extension}`;
}

function fileSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function errorText(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  if (error && typeof error === "object") {
    const value = error as {
      code?: unknown;
      message?: unknown;
      details?: unknown;
      hint?: unknown;
    };

    const message = [
      value.code && `Code: ${String(value.code)}`,
      value.message,
      value.details,
      value.hint,
    ]
      .filter(Boolean)
      .map(String)
      .join(" | ");

    if (message) return message;

    return JSON.stringify(error) || "Unknown upload error.";
  }

  return "Unknown upload error.";
}

export default function AdminPortfolioPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Branding");
  const [description, setDescription] = useState("");
  const [href, setHref] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [published, setPublished] = useState(true);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  function onCoverChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    if (file && !file.type.startsWith("image/")) {
      event.target.value = "";
      setCoverFile(null);
      setError("The cover must be an image. Add videos below as extra media.");
      return;
    }

    setCoverFile(file);
    setError("");
  }

  function onMediaChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    const invalid = files.find(
      (file) =>
        !file.type.startsWith("image/") && !file.type.startsWith("video/"),
    );

    if (invalid) {
      event.target.value = "";
      setMediaFiles([]);
      setError(`${invalid.name} is not a supported image or video file.`);
      return;
    }

    setMediaFiles(files);
    setError("");
  }

  async function uploadFile(
    supabase: ReturnType<typeof createClient>,
    file: File,
    folder: string,
  ) {
    const path = `${folder}/${crypto.randomUUID()}-${safeFileName(file.name)}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, {
        cacheControl: "3600",
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Could not upload ${file.name}: ${uploadError.message}`);
    }

    return path;
  }

  function clearForm() {
    formRef.current?.reset();
    setTitle("");
    setCategory("Branding");
    setDescription("");
    setHref("");
    setLinkLabel("");
    setSortOrder("0");
    setPublished(true);
    setCoverFile(null);
    setMediaFiles([]);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim() || !description.trim()) {
      setError("Add the project title and description.");
      return;
    }

    if (!coverFile) {
      setError("Choose a cover image.");
      return;
    }

    const supabase = createClient();
    const folder = `projects/${crypto.randomUUID()}`;
    const uploadedPaths: string[] = [];
    let projectId: string | null = null;

    setSaving(true);
    setStatus("Uploading cover image...");

    try {
      const coverPath = await uploadFile(supabase, coverFile, folder);
      uploadedPaths.push(coverPath);

      const { data: project, error: projectError } = await supabase
        .from("portfolio_projects")
        .insert({
          title: title.trim(),
          slug: slugify(title),
          category,
          description: description.trim(),
          cover_path: coverPath,
          href: href.trim() || null,
          link_label: linkLabel.trim() || null,
          published,
          sort_order: Number(sortOrder) || 0,
        })
        .select("id")
        .single();

      if (projectError) throw projectError;
      if (!project) {
        throw new Error("The project was not created correctly.");
      }

      projectId = project.id;

      const mediaRows = [];

      for (const [index, file] of mediaFiles.entries()) {
        setStatus(`Uploading media ${index + 1} of ${mediaFiles.length}...`);

        const path = await uploadFile(supabase, file, folder);
        uploadedPaths.push(path);

        mediaRows.push({
          project_id: project.id,
          file_path: path,
          media_type: file.type.startsWith("video/") ? "video" : "image",
          alt_text: title.trim(),
          position: "center",
          sort_order: index,
        });
      }

      if (mediaRows.length > 0) {
        const { error: mediaError } = await supabase
          .from("portfolio_media")
          .insert(mediaRows);

        if (mediaError) throw mediaError;
      }

      clearForm();

      setSuccess(
        `Project uploaded with ${mediaFiles.length + 1} media ${
          mediaFiles.length + 1 === 1 ? "item" : "items"
        }.`,
      );

      router.refresh();
    } catch (uploadError) {
      console.error("PORTFOLIO_UPLOAD_ERROR:", uploadError);

      if (projectId) {
        await supabase
          .from("portfolio_media")
          .delete()
          .eq("project_id", projectId);

        await supabase
          .from("portfolio_projects")
          .delete()
          .eq("id", projectId);
      }

      if (uploadedPaths.length > 0) {
        await supabase.storage.from(BUCKET).remove(uploadedPaths);
      }

      setError(errorText(uploadError));
    } finally {
      setSaving(false);
      setStatus("");
    }
  }

  return (
    <main className="min-h-screen bg-[#f9f9f9] px-4 py-8 text-[#0b1020] sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#05cde5]">
          Handi-X Admin
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
          Add portfolio project
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#0b1020]/60">
          Add one cover image, then select as many images and videos as you need.
        </p>

        <form
          ref={formRef}
          onSubmit={submit}
          className="mt-8 space-y-5 rounded-3xl border border-[#0b1020]/10 bg-white p-5 shadow-sm sm:p-8"
        >
          <label className="block">
            <span className="text-sm font-medium">Project title</span>

            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              className="mt-2 w-full rounded-xl border border-[#0b1020]/15 px-4 py-3 text-sm outline-none focus:border-[#05cde5]"
              placeholder="Fireside Chat Campaign"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">Category</span>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value as Category)
                }
                className="mt-2 w-full rounded-xl border border-[#0b1020]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#05cde5]"
              >
                <option>Branding</option>
                <option>Graphic Design</option>
                <option>Video</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium">Sort order</span>

              <input
                type="number"
                min="0"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#0b1020]/15 px-4 py-3 text-sm outline-none focus:border-[#05cde5]"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium">Description</span>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              rows={5}
              className="mt-2 w-full rounded-xl border border-[#0b1020]/15 px-4 py-3 text-sm leading-6 outline-none focus:border-[#05cde5]"
              placeholder="Describe the work, challenge, and result."
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">Cover image</span>

              <input
                type="file"
                accept="image/*"
                required
                onChange={onCoverChange}
                className="mt-2 block w-full rounded-xl border border-dashed border-[#0b1020]/20 bg-[#f9f9f9] p-3 text-xs"
              />

              {coverFile && (
                <p className="mt-2 text-xs text-[#0b1020]/60">
                  {coverFile.name} · {fileSize(coverFile.size)}
                </p>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-medium">
                Additional images/videos
              </span>

              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={onMediaChange}
                className="mt-2 block w-full rounded-xl border border-dashed border-[#0b1020]/20 bg-[#f9f9f9] p-3 text-xs"
              />

              <p className="mt-2 text-xs leading-5 text-[#0b1020]/55">
                Select multiple files. There is no custom 5MB check here.
              </p>

              {mediaFiles.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs text-[#0b1020]/60">
                  {mediaFiles.map((file) => (
                    <li
                      key={`${file.name}-${file.lastModified}`}
                      className="truncate"
                    >
                      {file.type.startsWith("video/") ? "Video" : "Image"}:{" "}
                      {file.name} · {fileSize(file.size)}
                    </li>
                  ))}
                </ul>
              )}
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium">
                Project link (optional)
              </span>

              <input
                type="url"
                value={href}
                onChange={(event) => setHref(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#0b1020]/15 px-4 py-3 text-sm outline-none focus:border-[#05cde5]"
                placeholder="https://example.com"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium">
                Link label (optional)
              </span>

              <input
                value={linkLabel}
                onChange={(event) => setLinkLabel(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[#0b1020]/15 px-4 py-3 text-sm outline-none focus:border-[#05cde5]"
                placeholder="View project"
              />
            </label>
          </div>

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={published}
              onChange={(event) => setPublished(event.target.checked)}
              className="h-4 w-4 accent-[#05cde5]"
            />
            Publish immediately
          </label>

          {error && (
            <p className="whitespace-pre-wrap rounded-xl bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-[#0b1020] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#05cde5] hover:text-[#0b1020] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? status || "Uploading..." : "Upload project"}
          </button>
        </form>
      </div>
    </main>
  );
}