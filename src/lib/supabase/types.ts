export type Project = {
  id: string;
  title: string;
  category: string | null;
  client: string | null;
  description: string | null;
  image_path: string | null;
  tags: string[] | null;
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
  published: boolean;
};
