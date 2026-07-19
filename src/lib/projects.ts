import { createClient } from "@/lib/supabase/server";
import { projectImageUrl } from "@/lib/supabase/image";
import type { Project } from "@/lib/supabase/types";

export type WorkCard = {
  id: string;
  title: string;
  category: string | null;
  image: string | null;
  isCaseStudy: boolean;
  description: string | null;
  client: string | null;
};

// Fallback seed matching the design handoff mock, used when Supabase isn't
// configured yet (no env vars) so the page still renders pixel-accurately
// during initial setup.
const FALLBACK_PROJECTS: WorkCard[] = [
  {
    id: "seed-vela-residence",
    title: "Vela Residence",
    category: "Interior Render · Corona",
    image: "/images/vela-residence.jpg",
    isCaseStudy: true,
    client: "Private client",
    description:
      "Full interior visualization — SketchUp, 3ds Max, Corona.",
  },
  {
    id: "seed-oro-pavilion",
    title: "Oro Pavilion",
    category: "Commercial Render · V-Ray",
    image: null,
    isCaseStudy: false,
    client: "Oro Development",
    description: "Commercial exterior & lobby renders in V-Ray.",
  },
  {
    id: "seed-kayu-house",
    title: "Kayu House",
    category: "Exterior Render · 3ds Max",
    image: null,
    isCaseStudy: false,
    client: "Studio Kayu",
    description: "Dusk exterior series, 3ds Max + Corona.",
  },
];

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

    return (data as Project[]).map((row) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      image: projectImageUrl(row.image_path),
      isCaseStudy: row.is_case_study,
      client: row.client,
      description: row.description,
    }));
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export async function getCaseStudyProject(): Promise<WorkCard | null> {
  const projects = await getPublishedProjects();
  return projects.find((p) => p.isCaseStudy) ?? projects[0] ?? null;
}
