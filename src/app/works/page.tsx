import type { Metadata } from "next";
import { Header } from "@/components/portfolio/Header";
import { WorksIndex } from "@/components/portfolio/WorksIndex";
import { ContactFooter } from "@/components/portfolio/ContactFooter";
import { getPublishedProjects } from "@/lib/projects";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "All Works — Wilken Eupalao",
};

export default async function WorksPage() {
  const [projects, content] = await Promise.all([
    getPublishedProjects(),
    getSiteContent(),
  ]);

  return (
    <div className="mx-auto w-full max-w-[1680px] overflow-hidden bg-ink">
      <Header content={content.header} variant="works" />
      <WorksIndex projects={projects} />
      <ContactFooter content={content.contact} />
    </div>
  );
}
