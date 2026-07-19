"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = ["Case Study", "Media", "Profile"];

export function Sidebar() {
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
        <div className="flex cursor-pointer items-center gap-3 bg-accent px-5 py-[13px] text-[13px] font-bold tracking-[0.22em] text-ink uppercase">
          ▪ Projects
        </div>
        {NAV_ITEMS.map((item) => (
          <div
            key={item}
            className="flex cursor-pointer items-center gap-3 px-5 py-[13px] text-[13px] font-semibold tracking-[0.22em] text-gray2 uppercase hover:bg-surface-2 hover:text-paper"
          >
            ▪ {item}
          </div>
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
