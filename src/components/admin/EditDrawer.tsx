"use client";

import { useRef } from "react";
import type { WorkType } from "@/lib/supabase/types";

export type DrawerForm = {
  title: string;
  category: string;
  client: string;
  description: string;
  work_type: WorkType;
  featured: boolean;
  is_case_study: boolean;
  published: boolean;
  image_path: string;
  clay_image_path: string;
  video_path: string;
};

const WORK_TYPES: { key: WorkType; label: string }[] = [
  { key: "3d", label: "3D Render" },
  { key: "web", label: "Website" },
  { key: "brand", label: "Branding" },
  { key: "animation", label: "Animation" },
];

type Props = {
  isNew: boolean;
  form: DrawerForm;
  onChange: (form: DrawerForm) => void;
  onClose: () => void;
  onSave: () => void;
  onUploadFile: (file: File) => void;
  onUploadClayFile: (file: File) => void;
  onUploadVideoFile: (file: File) => void;
  uploading: boolean;
  uploadingClay: boolean;
  uploadingVideo: boolean;
  imagePreviewUrl: string | null;
  clayPreviewUrl: string | null;
  saving: boolean;
};

function ToggleRow({
  label,
  value,
  onToggle,
}: {
  label: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-2 border-line p-[12px_14px]">
      <span className="text-[11px] font-bold tracking-[0.24em] text-gray2 uppercase">
        {label}
      </span>
      <button
        onClick={onToggle}
        className="relative h-[26px] w-[52px] cursor-pointer border-none p-0"
        style={{ background: value ? "#C95B46" : "#3A3A3A" }}
      >
        <span
          className="absolute top-[3px] h-5 w-5 bg-ink transition-[left] duration-150"
          style={{ left: value ? "29px" : "3px" }}
        />
      </button>
    </div>
  );
}

export function EditDrawer({
  isNew,
  form,
  onChange,
  onClose,
  onSave,
  onUploadFile,
  onUploadClayFile,
  onUploadVideoFile,
  uploading,
  uploadingClay,
  uploadingVideo,
  imagePreviewUrl,
  clayPreviewUrl,
  saving,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const clayInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  function field<K extends keyof DrawerForm>(key: K) {
    return (value: DrawerForm[K]) => onChange({ ...form, [key]: value });
  }

  return (
    <div className="flex min-w-0 flex-col gap-[18px] overflow-y-auto border-l-2 border-line bg-surface p-[32px_28px]">
      <div className="flex items-center justify-between">
        <div className="font-display text-[24px] uppercase">
          {isNew ? "New Project" : "Edit Project"}
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 cursor-pointer items-center justify-center border-2 border-line bg-transparent text-[14px] text-gray2 hover:border-accent hover:text-accent"
        >
          ✕
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUploadFile(file);
        }}
      />
      <div
        onClick={() => fileInputRef.current?.click()}
        className="flex h-[150px] shrink-0 cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-line-dashed bg-ink hover:border-accent"
      >
        {imagePreviewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imagePreviewUrl}
            alt="Project preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <div className="font-display text-[20px] text-accent">↑</div>
            <div className="text-[12px] tracking-[0.22em] text-gray2 uppercase">
              {uploading ? "Uploading…" : "Upload image · Supabase Storage"}
            </div>
          </>
        )}
      </div>

      <input
        ref={clayInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUploadClayFile(file);
        }}
      />
      <div className="flex flex-col gap-[6px]">
        <span className="text-[11px] font-bold tracking-[0.24em] text-gray2 uppercase">
          Clay render · case-study slider (optional)
        </span>
        <div
          onClick={() => clayInputRef.current?.click()}
          className="flex h-[100px] shrink-0 cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-line-dashed bg-ink hover:border-accent"
        >
          {clayPreviewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={clayPreviewUrl}
              alt="Clay render preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <>
              <div className="font-display text-[20px] text-accent">↑</div>
              <div className="text-[12px] tracking-[0.22em] text-gray2 uppercase">
                {uploadingClay ? "Uploading…" : "Upload clay render"}
              </div>
            </>
          )}
        </div>
        {form.clay_image_path && (
          <button
            onClick={() => field("clay_image_path")("")}
            className="cursor-pointer self-start border-none bg-transparent p-0 text-[11px] tracking-[0.2em] text-gray2 uppercase hover:text-accent"
          >
            ✕ Remove clay render
          </button>
        )}
      </div>

      <input
        ref={videoInputRef}
        type="file"
        accept="video/mp4,video/webm"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUploadVideoFile(file);
        }}
      />
      <div className="flex flex-col gap-[6px]">
        <span className="text-[11px] font-bold tracking-[0.24em] text-gray2 uppercase">
          Video · shown on the work card (mp4/webm)
        </span>
        <div
          onClick={() => videoInputRef.current?.click()}
          className="flex h-[72px] shrink-0 cursor-pointer flex-col items-center justify-center gap-1 border-2 border-dashed border-line-dashed bg-ink hover:border-accent"
        >
          <div className="text-[12px] tracking-[0.22em] text-gray2 uppercase">
            {uploadingVideo
              ? "Uploading…"
              : form.video_path
                ? "✓ " + form.video_path.split("-").slice(1).join("-")
                : "▶ Upload video"}
          </div>
        </div>
        {form.video_path && (
          <button
            onClick={() => field("video_path")("")}
            className="cursor-pointer self-start border-none bg-transparent p-0 text-[11px] tracking-[0.2em] text-gray2 uppercase hover:text-accent"
          >
            ✕ Remove video
          </button>
        )}
      </div>

      <label className="flex flex-col gap-[6px]">
        <span className="text-[11px] font-bold tracking-[0.24em] text-gray2 uppercase">
          Title
        </span>
        <input
          value={form.title}
          onChange={(e) => field("title")(e.target.value)}
          className="border-2 border-line bg-ink px-[14px] py-[11px] text-[15px] text-paper outline-none focus:border-accent"
        />
      </label>

      <div className="flex flex-col gap-[6px]">
        <span className="text-[11px] font-bold tracking-[0.24em] text-gray2 uppercase">
          Work Type
        </span>
        <div className="flex gap-2">
          {WORK_TYPES.map((t) => (
            <button
              key={t.key}
              onClick={() => field("work_type")(t.key)}
              className={
                "flex-1 cursor-pointer border-2 px-2 py-[9px] text-[11px] font-bold tracking-[0.14em] uppercase " +
                (form.work_type === t.key
                  ? "border-accent bg-accent text-ink"
                  : "border-line bg-transparent text-gray2 hover:border-accent hover:text-accent")
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-[6px]">
        <span className="text-[11px] font-bold tracking-[0.24em] text-gray2 uppercase">
          Category / Sub-label
        </span>
        <input
          value={form.category}
          onChange={(e) => field("category")(e.target.value)}
          className="border-2 border-line bg-ink px-[14px] py-[11px] text-[15px] text-paper outline-none focus:border-accent"
        />
      </label>
      <label className="flex flex-col gap-[6px]">
        <span className="text-[11px] font-bold tracking-[0.24em] text-gray2 uppercase">
          Client
        </span>
        <input
          value={form.client}
          onChange={(e) => field("client")(e.target.value)}
          className="border-2 border-line bg-ink px-[14px] py-[11px] text-[15px] text-paper outline-none focus:border-accent"
        />
      </label>
      <label className="flex flex-col gap-[6px]">
        <span className="text-[11px] font-bold tracking-[0.24em] text-gray2 uppercase">
          Description
        </span>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => field("description")(e.target.value)}
          className="resize-y border-2 border-line bg-ink px-[14px] py-[11px] text-[14px] text-paper outline-none focus:border-accent"
        />
      </label>

      <ToggleRow
        label="Featured on homepage"
        value={form.featured}
        onToggle={() => field("featured")(!form.featured)}
      />
      <ToggleRow
        label="Case study (only one)"
        value={form.is_case_study}
        onToggle={() => field("is_case_study")(!form.is_case_study)}
      />
      <ToggleRow
        label="Published"
        value={form.published}
        onToggle={() => field("published")(!form.published)}
      />

      <button
        onClick={onSave}
        disabled={saving}
        className="mt-[6px] cursor-pointer border-none bg-accent p-[14px] font-display text-[16px] tracking-[0.12em] text-ink uppercase hover:bg-paper disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}
