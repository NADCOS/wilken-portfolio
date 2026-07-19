"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export type AdminSection = "projects" | "content";

const NAV: { key: AdminSection; label: string }[] = [
  { key: "projects", label: "Projects" },
  { key: "content", label: "Site Content" },
];

export function Sidebar({
  active,
  onNavigate,
}: {
  active: AdminSection;
  onNavigate: (section: AdminSection) => void;
}) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex flex-col border-r-2 border-line">
      <div className="flex items-center gap-3 border-b-2 border-line p-5">
        <Image
          src="/images/wilken-logo.jpg"
          alt="Wilken logo"
          width={36}
          height={36}
          className="block h-9 w-9 object-cover"
        />
        <div className="font-display text-[18px] uppercase">Wilken CMS</div>
      </div>
      <nav className="flex flex-col gap-[2px] py-4">
        {NAV.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={
              "flex cursor-pointer items-center gap-3 border-none px-5 py-[13px] text-left font-sans text-[13px] tracking-[0.22em] uppercase " +
              (active === item.key
                ? "bg-accent font-bold text-ink"
                : "bg-transparent font-semibold text-gray2 hover:bg-surface-2 hover:text-paper")
            }
          >
            ▪ {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto flex flex-col border-t-2 border-line">
        <Link
          href="/"
          className="px-5 py-[14px] text-[12px] tracking-[0.22em] text-gray2 uppercase hover:text-accent"
        >
          ← View Site
        </Link>
        <button
          onClick={handleLogout}
          className="cursor-pointer border-none border-t-2 border-line bg-transparent px-5 py-[14px] text-left font-sans text-[12px] tracking-[0.22em] text-gray2 uppercase hover:text-accent"
        >
          Log Out ↗
        </button>
      </div>
    </aside>
  );
}
