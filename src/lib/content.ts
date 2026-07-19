import { createClient } from "@/lib/supabase/server";

export type SiteContent = {
  header: { name: string; tagline: string };
  hero: {
    kicker: string;
    titleWord: string;
    blurb: string;
    firstName: string;
    lastName: string;
    roleChip: string;
    services: string[];
    basedIn: string;
    availability: string;
  };
  skills: { marquee: string[]; chips: string[]; highlight: string };
  caseStudy: { meta: string; challenge: string; solution: string; result: string };
  contact: {
    headingLine1: string;
    headingLine2: string;
    headingLine3: string;
    email: string;
    phone: string;
    socialLabel: string;
    socialUrl: string;
    status: string;
    copyright: string;
  };
};

export const DEFAULT_CONTENT: SiteContent = {
  header: {
    name: "Wilken Eupalao",
    tagline: "3D Designer · ArchViz · Web Dev",
  },
  hero: {
    kicker: "3D Designer — Portfolio 2026",
    titleWord: "Portfolio",
    blurb:
      "I build photoreal spaces, bold websites and brands that are impossible to ignore.",
    firstName: "Wilken",
    lastName: "Eupalao",
    roleChip: "3D Designer, Architectural Visualizer & Web Developer",
    services: [
      "3D Visualization",
      "Architectural Renders",
      "Website Design",
      "Branding & Identity",
    ],
    basedIn: "the Philippines",
    availability: "Freelance",
  },
  skills: {
    marquee: [
      "SketchUp",
      "3ds Max",
      "AutoCAD",
      "V-Ray",
      "Corona",
      "AI Tools",
      "Webflow",
      "Website Design",
      "Branding",
    ],
    chips: [
      "SketchUp",
      "3ds Max",
      "AutoCAD",
      "V-Ray",
      "Corona Renderer",
      "Webflow",
      "UI/UX Design",
    ],
    highlight: "AI Tools",
  },
  caseStudy: {
    meta: "Full interior visualization · Private client · 2026",
    challenge:
      "Translate a warm, wood-and-marble concept into photoreal imagery convincing enough to sell the design before construction.",
    solution:
      "Modeled in SketchUp, detailed in 3ds Max, rendered with Corona — physically accurate lighting and hand-tuned materials.",
    result:
      "Client approved the design in a single review round; renders now anchor the developer's marketing suite.",
  },
  contact: {
    headingLine1: "Let's Build",
    headingLine2: "Something",
    headingLine3: "Epic Together",
    email: "eupalaow5@gmail.com",
    phone: "0534 581 911",
    socialLabel: "linktr.ee/eupalaow",
    socialUrl: "https://linktr.ee/eupalaow",
    status: "Available for freelance",
    copyright: "© 2026 Wilken Eupalao",
  },
};

/** Fetches admin-edited content from Supabase, merged over the built-in defaults. */
export async function getSiteContent(): Promise<SiteContent> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return DEFAULT_CONTENT;
  }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("site_content").select("*");
    if (error || !data) return DEFAULT_CONTENT;

    const merged = structuredClone(DEFAULT_CONTENT) as unknown as Record<
      string,
      Record<string, unknown>
    >;
    for (const row of data as { key: string; value: Record<string, unknown> }[]) {
      if (merged[row.key] && row.value) {
        merged[row.key] = { ...merged[row.key], ...row.value };
      }
    }
    return merged as unknown as SiteContent;
  } catch {
    return DEFAULT_CONTENT;
  }
}
