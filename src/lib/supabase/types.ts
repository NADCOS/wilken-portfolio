export type WorkType = "3d" | "web" | "brand";

export type Project = {
  id: string;
  title: string;
  category: string | null;
  client: string | null;
  description: string | null;
  image_path: string | null;
  tags: string[] | null;
  work_type: WorkType;
  featured: boolean;
  is_case_study: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
};

export type ProjectInput = {
  title: string;
  category: string;
  client: string;
  description: string;
  image_path: string;
  work_type: WorkType;
  featured: boolean;
  is_case_study: boolean;
  published: boolean;
};
