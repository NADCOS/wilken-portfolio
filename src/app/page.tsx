import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { SkillsMarquee } from "@/components/portfolio/SkillsMarquee";
import { SelectedWorks } from "@/components/portfolio/SelectedWorks";
import { SkillsGrid } from "@/components/portfolio/SkillsGrid";
import { CaseStudy } from "@/components/portfolio/CaseStudy";
import { ContactFooter } from "@/components/portfolio/ContactFooter";
import { getPublishedProjects, getCaseStudyProject } from "@/lib/projects";

export default async function Home() {
  const [projects, caseStudy] = await Promise.all([
    getPublishedProjects(),
    getCaseStudyProject(),
  ]);

  return (
    <div className="mx-auto min-w-[1280px] max-w-[1680px] overflow-hidden bg-ink">
      <Header />
      <Hero />
      <SkillsMarquee />
      <SelectedWorks projects={projects} />
      <SkillsGrid />
      {caseStudy && <CaseStudy project={caseStudy} />}
      <ContactFooter />
    </div>
  );
}
