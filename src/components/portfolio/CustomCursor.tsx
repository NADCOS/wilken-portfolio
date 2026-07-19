"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#C95B46";
const INK = "#151515";
// backgrounds Vercel/Tailwind resolve the accent + paper tokens to
const RUSTY = ["rgb(201, 91, 70)", "rgb(243, 243, 243)"];

function bgUnder(el: Element | null): string {
  let node: Element | null = el;
  while (node) {
    const bg = getComputedStyle(node).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
    node = node.parentElement;
  }
  return "";
}

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [big, setBig] = useState(false);
  const [on, setOn] = useState(false);
  const [ink, setInk] = useState(false);

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
      // on rust/paper surfaces the rust cursor vanishes — flip to ink
      setInk(RUSTY.includes(bgUnder(t)));
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

  const color = ink ? INK : ACCENT;

  return (
    <div
      ref={dot}
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{ opacity: on ? 1 : 0 }}
    >
      <div
        className="flex items-center justify-center font-display transition-[width,height,font-size,color] duration-150"
        style={{
          width: big ? 48 : 20,
          height: big ? 48 : 20,
          fontSize: big ? 34 : 20,
          lineHeight: 1,
          color,
          WebkitTextStroke: `2px ${color}`,
        }}
      >
        ✳︎
      </div>
    </div>
  );
}
