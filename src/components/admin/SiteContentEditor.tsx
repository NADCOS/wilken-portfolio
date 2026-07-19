"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SiteContent } from "@/lib/content";

const INPUT =
  "w-full border-2 border-line bg-ink px-[14px] py-[11px] text-[15px] text-paper outline-none focus:border-accent";
const LABEL = "text-[11px] font-bold tracking-[0.24em] text-gray2 uppercase";

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className="flex flex-col gap-[6px]">
      <span className={LABEL}>{label}</span>
      {textarea ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={INPUT + " resize-y text-[14px]"}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={INPUT}
        />
      )}
    </label>
  );
}

function Lines({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <label className="flex flex-col gap-[6px]">
      <span className={LABEL}>{label} · one per line</span>
      <textarea
        rows={Math.max(3, value.length + 1)}
        value={value.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n"))}
        className={INPUT + " resize-y text-[14px]"}
      />
    </label>
  );
}

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 border-2 border-line p-5">
      <div className="font-display text-[20px] text-accent uppercase">{title}</div>
      {children}
    </div>
  );
}

export function SiteContentEditor({
  initialContent,
}: {
  initialContent: SiteContent;
}) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  function set<K extends keyof SiteContent>(section: K) {
    return (patch: Partial<SiteContent[K]>) =>
      setContent((c) => ({ ...c, [section]: { ...c[section], ...patch } }));
  }
  const header = set("header");
  const hero = set("hero");
  const skills = set("skills");
  const caseStudy = set("caseStudy");
  const contact = set("contact");

  async function save() {
    setSaving(true);
    const supabase = createClient();
    const clean: SiteContent = {
      ...content,
      hero: {
        ...content.hero,
        services: content.hero.services.map((s) => s.trim()).filter(Boolean),
      },
      skills: {
        ...content.skills,
        marquee: content.skills.marquee.map((s) => s.trim()).filter(Boolean),
        chips: content.skills.chips.map((s) => s.trim()).filter(Boolean),
      },
    };
    const rows = (Object.keys(clean) as (keyof SiteContent)[]).map((key) => ({
      key,
      value: clean[key],
    }));
    const { error } = await supabase.from("site_content").upsert(rows);
    setSaving(false);
    if (error) {
      alert("Save failed: " + error.message);
      return;
    }
    setContent(clean);
    setSavedAt(new Date().toLocaleTimeString());
  }

  return (
    <div className="p-[36px_40px]">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="m-0 font-display text-[52px] leading-none uppercase">
            Site Content
          </h1>
          <div className="mt-2 text-[13px] tracking-[0.22em] text-gray2 uppercase">
            Every text on the public pages · synced with Supabase
            {savedAt ? " · saved " + savedAt : ""}
          </div>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="cursor-pointer border-none bg-accent px-6 py-[14px] font-display text-[15px] tracking-[0.12em] text-ink uppercase hover:bg-paper disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save All Changes"}
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-5">
        <Box title="Header">
          <Field label="Name" value={content.header.name} onChange={(v) => header({ name: v })} />
          <Field label="Tagline" value={content.header.tagline} onChange={(v) => header({ tagline: v })} />
        </Box>

        <Box title="Hero">
          <Field label="Kicker" value={content.hero.kicker} onChange={(v) => hero({ kicker: v })} />
          <Field label="Big title word" value={content.hero.titleWord} onChange={(v) => hero({ titleWord: v })} />
          <Field label="Blurb" textarea value={content.hero.blurb} onChange={(v) => hero({ blurb: v })} />
          <Field label="First name" value={content.hero.firstName} onChange={(v) => hero({ firstName: v })} />
          <Field label="Last name" value={content.hero.lastName} onChange={(v) => hero({ lastName: v })} />
          <Field label="Role chip" value={content.hero.roleChip} onChange={(v) => hero({ roleChip: v })} />
          <Lines label="Services" value={content.hero.services} onChange={(v) => hero({ services: v })} />
          <Field label="Based in" value={content.hero.basedIn} onChange={(v) => hero({ basedIn: v })} />
          <Field label="Available for" value={content.hero.availability} onChange={(v) => hero({ availability: v })} />
        </Box>

        <Box title="Skills">
          <Lines label="Marquee items" value={content.skills.marquee} onChange={(v) => skills({ marquee: v })} />
          <Lines label="Skill chips" value={content.skills.chips} onChange={(v) => skills({ chips: v })} />
          <Field label="Highlighted chip" value={content.skills.highlight} onChange={(v) => skills({ highlight: v })} />
        </Box>

        <Box title="Case Study">
          <Field label="Meta line" value={content.caseStudy.meta} onChange={(v) => caseStudy({ meta: v })} />
          <Field label="The Challenge" textarea value={content.caseStudy.challenge} onChange={(v) => caseStudy({ challenge: v })} />
          <Field label="The Solution" textarea value={content.caseStudy.solution} onChange={(v) => caseStudy({ solution: v })} />
          <Field label="The Result" textarea value={content.caseStudy.result} onChange={(v) => caseStudy({ result: v })} />
        </Box>

        <Box title="Contact & Footer">
          <Field label="Heading line 1" value={content.contact.headingLine1} onChange={(v) => contact({ headingLine1: v })} />
          <Field label="Heading line 2" value={content.contact.headingLine2} onChange={(v) => contact({ headingLine2: v })} />
          <Field label="Heading line 3" value={content.contact.headingLine3} onChange={(v) => contact({ headingLine3: v })} />
          <Field label="Email" value={content.contact.email} onChange={(v) => contact({ email: v })} />
          <Field label="Phone" value={content.contact.phone} onChange={(v) => contact({ phone: v })} />
          <Field label="Social label" value={content.contact.socialLabel} onChange={(v) => contact({ socialLabel: v })} />
          <Field label="Social URL" value={content.contact.socialUrl} onChange={(v) => contact({ socialUrl: v })} />
          <Field label="Status line" value={content.contact.status} onChange={(v) => contact({ status: v })} />
          <Field label="Copyright" value={content.contact.copyright} onChange={(v) => contact({ copyright: v })} />
        </Box>
      </div>
    </div>
  );
}
