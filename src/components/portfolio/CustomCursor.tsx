"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [big, setBig] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.classList.add("has-custom-cursor");
    const move = (e: MouseEvent) => {
      setOn(true);
      const el = dot.current;
      if (el)
        el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      const t = e.target as Element | null;
      setBig(!!t?.closest?.("a, button, [role='button'], input, textarea"));
    };
    const leave = () => setOn(false);
    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={dot}
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{ opacity: on ? 1 : 0 }}
    >
      <div
        className="flex items-center justify-center font-display text-accent transition-[width,height,font-size,background] duration-150"
        style={{
          width: big ? 48 : 20,
          height: big ? 48 : 20,
          fontSize: big ? 34 : 20,
          lineHeight: 1,
          WebkitTextStroke: "2px #C95B46",
        }}
      >
        ✳︎
      </div>
    </div>
  );
}
