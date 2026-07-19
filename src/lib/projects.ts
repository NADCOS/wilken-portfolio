import { createClient } from "@/lib/supabase/server";
import { projectImageUrl } from "@/lib/supabase/image";
import type { Project, WorkType } from "@/lib/supabase/types";

export const WORK_TYPE_LABELS: Record<WorkType, string> = {
  "3d": "3D Render",
  web: "Website",
  brand: "Branding",
};

export type WorkCard = {
  id: string;
  title: string;
  category: string | null;
  image: string | null;
  workType: WorkType;
  featured: boolean;
  isCaseStudy: boolean;
  description: string | null;
  client: string | null;
};

// Fallback seed used when Supabase env vars are missing, so the page still
// renders during initial setup.
const FALLBACK_PROJECTS: WorkCard[] = [
  {
    id: "seed-vela-residence",
    title: "Vela Residence",
    category: "Interior Render · Corona",
    image: "/images/vela-residence.jpg",
    workType: "3d",
    featured: true,
    isCaseStudy: true,
    client: "Private client",
    description: "Full interior visualization — SketchUp, 3ds Max, Corona.",
  },
  {
    id: "seed-oro-pavilion",
    title: "Oro Pavilion",
    category: "Commercial Render · V-Ray",
    image: null,
    workType: "3d",
    featured: false,
    isCaseStudy: false,
    client: "Oro Development",
    description: "Commercial exterior & lobby renders in V-Ray.",
  },
  {
    id: "seed-kayu-house",
    title: "Kayu House",
    category: "Exterior Render · 3ds Max",
    image: null,
    workType: "3d",
    featured: false,
    isCaseStudy: false,
    client: "Studio Kayu",
    description: "Dusk exterior series, 3ds Max + Corona.",
  },
];

function mapRow(row: Project): WorkCard {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    image: projectImageUrl(row.image_path),
    workType: (row.work_type as WorkType) || "3d",
    featured: row.featured ?? false,
    isCaseStudy: row.is_case_study,
    client: row.client,
    description: row.description,
  };
}

export async function getPublishedProjects(): Promise<WorkCard[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return FALLBACK_PROJECTS;
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_PROJECTS;
    return (data as Project[]).map(mapRow);
  } catch {
    return FALLBACK_PROJECTS;
  }
}

/** Homepage cards: featured projects first; falls back to the first three. */
export async function getFeaturedProjects(): Promise<WorkCard[]> {
  const all = await getPublishedProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length > 0 ? featured : all).slice(0, 3);
}

export async function getCaseStudyProject(): Promise<WorkCard | null> {
  const projects = await getPublishedProjects();
  return projects.find((p) => p.isCaseStudy) ?? projects[0] ?? null;
}
