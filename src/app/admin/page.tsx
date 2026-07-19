import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Dashboard } from "@/components/admin/Dashboard";
import type { Project } from "@/lib/supabase/types";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return <Dashboard initialProjects={(data as Project[]) ?? []} />;
}
