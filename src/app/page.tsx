import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { SkillsMarquee } from "@/components/portfolio/SkillsMarquee";
import { SelectedWorks } from "@/components/portfolio/SelectedWorks";
import { SkillsGrid } from "@/components/portfolio/SkillsGrid";
import { CaseStudy } from "@/components/portfolio/CaseStudy";
import { ContactFooter } from "@/components/portfolio/ContactFooter";
import { getFeaturedProjects, getCaseStudyProject } from "@/lib/projects";
import { getSiteContent } from "@/lib/content";
import { BackToTop } from "@/components/portfolio/BackToTop";

export default async function Home() {
  const [projects, caseStudy, content] = await Promise.all([
    getFeaturedProjects(),
    getCaseStudyProject(),
    getSiteContent(),
  ]);

  return (
    <div className="mx-auto w-full max-w-[1680px] overflow-hidden bg-ink">
      <Header content={content.header} />
      <Hero content={content.hero} />
      <SkillsMarquee items={content.skills.marquee} />
      <SelectedWorks projects={projects} />
      <SkillsGrid content={content.skills} />
      {caseStudy && <CaseStudy project={caseStudy} content={content.caseStudy} />}
      <ContactFooter content={content.contact} />
    </div>
  );
}
