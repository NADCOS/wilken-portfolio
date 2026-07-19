import Image from "next/image";
import type { Project } from "@/lib/supabase/types";

type Props = {
  projects: Project[];
  imageUrl: (path: string | null) => string | null;
  onEdit: (project: Project) => void;
  onRemove: (project: Project) => void;
};

export function ProjectsTable({
  projects,
  imageUrl,
  onEdit,
  onRemove,
}: Props) {
  return (
    <>
      <div className="grid grid-cols-[100px_1fr_180px_130px_120px] gap-0 border-2 border-line border-b-0 p-[12px_16px] text-[11px] font-bold tracking-[0.26em] text-gray2 uppercase">
        <div>Image</div>
        <div>Title</div>
        <div>Category</div>
        <div>Status</div>
        <div className="text-right">Actions</div>
      </div>
      {projects.map((p) => {
        const src = imageUrl(p.image_path);
        const statusColor = p.published ? "#C95B46" : "#5A5A5A";
        return (
          <div
            key={p.id}
            className="grid grid-cols-[100px_1fr_180px_130px_120px] items-center gap-0 border-2 border-line border-b-0 p-[12px_16px] hover:bg-surface-2"
          >
            <div className="flex h-[52px] w-[72px] items-center justify-center overflow-hidden border border-line bg-surface-2">
              {src ? (
                <Image
                  src={src}
                  alt={p.title}
                  width={72}
                  height={52}
                  className="block h-full w-full object-cover"
                />
              ) : (
                <span className="text-[10px] tracking-[0.2em] text-[#555] uppercase">
                  No image
                </span>
              )}
            </div>
            <div className="min-w-0">
              <div className="font-display text-[18px] tracking-[0.04em] uppercase">
                {p.title}
              </div>
              <div className="text-[12px] tracking-[0.18em] text-gray2 uppercase">
                {p.client}
              </div>
            </div>
            <div className="text-[12px] tracking-[0.18em] text-gray2 uppercase">
              {p.category}
            </div>
            <div>
              <span
                className="inline-block border-2 px-3 py-1 text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{ borderColor: statusColor, color: statusColor }}
              >
                {p.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => onEdit(p)}
                className="cursor-pointer border-2 border-line bg-transparent px-[14px] py-[6px] font-sans text-[11px] tracking-[0.18em] text-paper uppercase hover:border-accent hover:text-accent"
              >
                Edit
              </button>
              <button
                onClick={() => onRemove(p)}
                className="cursor-pointer border-2 border-line bg-transparent px-[10px] py-[6px] font-sans text-[11px] text-gray2 hover:border-accent hover:text-accent"
              >
                ✕
              </button>
            </div>
          </div>
        );
      })}
      <div className="border-t-2 border-line" />
    </>
  );
}
