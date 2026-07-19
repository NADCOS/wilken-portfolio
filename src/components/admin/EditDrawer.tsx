"use client";

import { useRef } from "react";

export type DrawerForm = {
  title: string;
  category: string;
  client: string;
  description: string;
  published: boolean;
  image_path: string;
};

type Props = {
  isNew: boolean;
  form: DrawerForm;
  onChange: (form: DrawerForm) => void;
  onClose: () => void;
  onSave: () => void;
  onUploadFile: (file: File) => void;
  uploading: boolean;
  imagePreviewUrl: string | null;
  saving: boolean;
};

export function EditDrawer({
  isNew,
  form,
  onChange,
  onClose,
  onSave,
  onUploadFile,
  uploading,
  imagePreviewUrl,
  saving,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function field<K extends keyof DrawerForm>(key: K) {
    return (value: DrawerForm[K]) => onChange({ ...form, [key]: value });
  }

  return (
    <div className="flex min-w-0 flex-col gap-[18px] border-l-2 border-line bg-surface p-[32px_28px]">
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
        className="flex h-[150px] cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-line-dashed bg-ink hover:border-accent"
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
              {uploading
                ? "Uploading…"
                : "Upload image · Supabase Storage"}
            </div>
          </>
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

      <div className="flex items-center justify-between border-2 border-line p-[12px_14px]">
        <span className="text-[11px] font-bold tracking-[0.24em] text-gray2 uppercase">
          Published
        </span>
        <button
          onClick={() => field("published")(!form.published)}
          className="relative h-[26px] w-[52px] cursor-pointer border-none p-0"
          style={{ background: form.published ? "#C95B46" : "#3A3A3A" }}
        >
          <span
            className="absolute top-[3px] h-5 w-5 bg-ink transition-[left] duration-150"
            style={{ left: form.published ? "29px" : "3px" }}
          />
        </button>
      </div>

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
