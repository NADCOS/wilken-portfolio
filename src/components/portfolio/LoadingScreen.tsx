"use client";

import { useEffect, useState } from "react";

const PATHS = [
  "M430.9,633.72v-375.47c0-20.99-30.63-34.03-54.93-23.39l-129.39,56.67c-11.13,4.88-17.97,13.77-17.97,23.39v313.11c0,9.16,6.2,17.69,16.49,22.71l169.31,82.49c10.29,5.01,16.49,13.55,16.49,22.71v136.02c0,9.56,6.76,18.42,17.8,23.32l129.39,66.64c24.3,10.77,55.1-2.26,55.1-23.32v-196.87c0-9.67-6.91-18.61-18.14-23.47l-166.01-81.07c-11.23-4.86-18.14-13.8-18.14-23.47Z",
  "M704.29,617.54v-287.81c0-20.99-30.63-34.03-54.93-23.39l-129.39,56.67c-11.13,4.88-17.97,13.77-17.97,23.39v225.45c0,9.16,6.2,17.69,16.49,22.71l169.31,82.49c10.29,5.01,16.49,13.55,16.49,22.71v51.98c0,9.56,6.76,18.42,17.8,23.32l129.39,57.37c24.3,10.77,55.1-2.26,55.1-23.32v-112.84c0-9.67-6.91-18.61-18.14-23.47l-166.01-71.79c-11.23-4.86-18.14-13.8-18.14-23.47Z",
  "M965.1,657.4v-271.84c0-15.78-23.17-25.5-41.3-17.32l-144.17,66.26c-8.14,3.67-13.11,10.24-13.11,17.32v142.6c0,7.06,4.93,13.61,13.02,17.28l144.17,62.97c18.13,8.24,41.39-1.47,41.39-17.28Z",
];

export function LoadingScreen() {
  const [gone, setGone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setGone(true), 1700);
    const t2 = setTimeout(() => setHidden(true), 2350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ transform: gone ? "translateY(-100%)" : "none" }}
      aria-hidden
    >
      <style>{`
        @keyframes logo-draw { to { stroke-dashoffset: 0; } }
        @keyframes logo-fill { to { fill-opacity: 1; } }
        @keyframes loader-blink { 50% { opacity: 0; } }
        .loader-path {
          stroke: #C95B46;
          stroke-width: 6;
          fill: #C95B46;
          fill-opacity: 0;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: logo-draw 0.9s ease forwards, logo-fill 0.45s ease forwards;
        }
      `}</style>
      <div className="flex flex-col items-center gap-7">
        <svg viewBox="0 0 1200 1200" className="h-[128px] w-[128px]">
          {PATHS.map((d, i) => (
            <path
              key={i}
              d={d}
              pathLength={1}
              className="loader-path"
              style={{ animationDelay: `${i * 0.18}s, ${0.75 + i * 0.15}s` }}
            />
          ))}
        </svg>
        <div className="flex items-center gap-3">
          <span
            className="h-2 w-2 bg-accent"
            style={{ animation: "loader-blink 0.8s steps(1) infinite" }}
          />
          <span className="font-display text-[14px] tracking-[0.42em] text-paper uppercase">
            Wilken Eupalao
          </span>
        </div>
      </div>
    </div>
  );
}
