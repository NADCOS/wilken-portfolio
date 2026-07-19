import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Dashboard } from "@/components/admin/Dashboard";
import { getSiteContent } from "@/lib/content";
import type { Project } from "@/lib/supabase/types";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const [{ data }, content] = await Promise.all([
    supabase.from("projects").select("*").order("sort_order", { ascending: true }),
    getSiteContent(),
  ]);

  return (
    <Dashboard
      initialProjects={(data as Project[]) ?? []}
      initialContent={content}
    />
  );
}
