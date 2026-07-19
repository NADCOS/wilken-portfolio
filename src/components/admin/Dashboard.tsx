"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { projectImageUrl } from "@/lib/supabase/image";
import type { Project } from "@/lib/supabase/types";
import type { SiteContent } from "@/lib/content";
import { Sidebar, type AdminSection } from "@/components/admin/Sidebar";
import { ProjectsTable } from "@/components/admin/ProjectsTable";
import { EditDrawer, type DrawerForm } from "@/components/admin/EditDrawer";
import { SiteContentEditor } from "@/components/admin/SiteContentEditor";

const EMPTY_FORM: DrawerForm = {
  title: "",
  category: "",
  client: "",
  description: "",
  work_type: "3d",
  featured: false,
  is_case_study: false,
  published: false,
  image_path: "",
};

export function Dashboard({
  initialProjects,
  initialContent,
}: {
  initialProjects: Project[];
  initialContent: SiteContent;
}) {
  const [section, setSection] = useState<AdminSection>("projects");
  const [projects, setProjects] = useState(initialProjects);
  const [editing, setEditing] = useState<Project | "new" | null>(null);
  const [form, setForm] = useState<DrawerForm>(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const isNew = editing === "new";
  const drawerOpen = editing !== null;

  function openNew() {
    setForm(EMPTY_FORM);
    setEditing("new");
  }

  function openEdit(project: Project) {
    setForm({
      title: project.title,
      category: project.category ?? "",
      client: project.client ?? "",
      description: project.description ?? "",
      work_type: project.work_type ?? "3d",
      featured: project.featured ?? false,
      is_case_study: project.is_case_study ?? false,
      published: project.published,
      image_path: project.image_path ?? "",
    });
    setEditing(project);
  }

  function closeDrawer() {
    setEditing(null);
  }

  async function uploadFile(file: File) {
    setUploading(true);
    const supabase = createClient();
    const path = crypto.randomUUID() + "-" + file.name;
    const { error } = await supabase.storage
      .from("project-images")
      .upload(path, file, { upsert: true });
    setUploading(false);

    if (error) {
      alert("Upload failed: " + error.message);
      return;
    }
    setForm((f) => ({ ...f, image_path: path }));
  }

  async function save() {
    setSaving(true);
    const supabase = createClient();

    const row = {
      title: form.title || "Untitled",
      category: form.category,
      client: form.client,
      description: form.description,
      work_type: form.work_type,
      featured: form.featured,
      is_case_study: form.is_case_study,
      published: form.published,
      image_path: form.image_path || null,
    };

    if (isNew) {
      const { data, error } = await supabase
        .from("projects")
        .insert(row)
        .select()
        .single();
      setSaving(false);
      if (error) {
        alert("Save failed: " + error.message);
        return;
      }
      setProjects((prev) => [...prev, data as Project]);
    } else if (editing) {
      const { data, error } = await supabase
        .from("projects")
        .update(row)
        .eq("id", editing.id)
        .select()
        .single();
      setSaving(false);
      if (error) {
        alert("Save failed: " + error.message);
        return;
      }
      setProjects((prev) =>
        prev.map((p) => (p.id === editing.id ? (data as Project) : p)),
      );
    }
    setEditing(null);
  }

  async function remove(project: Project) {
    if (!confirm('Delete "' + project.title + '"? This cannot be undone.')) return;
    const supabase = createClient();
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);
    if (error) {
      alert("Delete failed: " + error.message);
      return;
    }
    setProjects((prev) => prev.filter((p) => p.id !== project.id));
    if (editing !== "new" && editing?.id === project.id) setEditing(null);
  }

  return (
    <div className="grid min-h-screen grid-cols-[240px_1fr]">
      <Sidebar active={section} onNavigate={setSection} />

      {section === "content" ? (
        <main className="min-w-0">
          <SiteContentEditor initialContent={initialContent} />
        </main>
      ) : (
        <main
          className="grid min-w-0"
          style={{
            gridTemplateColumns: drawerOpen ? "1fr 360px" : "1fr 0px",
          }}
        >
          <div className="min-w-0 p-[36px_40px]">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <h1 className="m-0 font-display text-[52px] leading-none uppercase">
                  Projects
                </h1>
                <div className="mt-2 text-[13px] tracking-[0.22em] text-gray2 uppercase">
                  {projects.length} entries · synced with Supabase
                </div>
              </div>
              <button
                onClick={openNew}
                className="cursor-pointer border-none bg-accent px-6 py-[14px] font-display text-[15px] tracking-[0.12em] text-ink uppercase hover:bg-paper"
              >
                + Add Project
              </button>
            </div>
            <ProjectsTable
              projects={projects}
              imageUrl={projectImageUrl}
              onEdit={openEdit}
              onRemove={remove}
            />
          </div>

          {drawerOpen && (
            <EditDrawer
              isNew={isNew}
              form={form}
              onChange={setForm}
              onClose={closeDrawer}
              onSave={save}
              onUploadFile={uploadFile}
              uploading={uploading}
              saving={saving}
              imagePreviewUrl={
                form.image_path ? projectImageUrl(form.image_path) : null
              }
            />
          )}
        </main>
      )}
    </div>
  );
}
