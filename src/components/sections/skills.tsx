"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Database,
  Hash,
  SquareCode,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { TechIcon, TECH_ICONS } from "@/components/tech-icon";
import { profile } from "@/data/profile";

// Skills without an official brand mark (or one that doesn't survive on a
// dark card) fall back to a generic Lucide glyph in a distinguishing color.
const FALLBACK_ICONS: Record<string, { icon: LucideIcon; color: string }> = {
  PDO: { icon: Database, color: "var(--brand)" },
  "VS Code": { icon: SquareCode, color: "#007ACC" },
  IoT: { icon: Cpu, color: "var(--brand)" },
  "C#": { icon: Hash, color: "#9B4F96" },
};

function SkillTile({ name }: { name: string }) {
  const hasBrandIcon = Boolean(TECH_ICONS[name]);
  const fallback = FALLBACK_ICONS[name];
  const FallbackIcon = fallback?.icon;
  const color = TECH_ICONS[name]?.color ?? fallback?.color ?? "var(--brand)";

  return (
    <div
      title={name}
      aria-label={name}
      className="flex size-16 shrink-0 items-center justify-center rounded-xl transition-transform hover:scale-105 sm:size-20"
      style={{
        background: "var(--tile-bg)",
        border: `1px solid color-mix(in srgb, ${color} 45%, transparent)`,
        boxShadow: `0 0 16px color-mix(in srgb, ${color} 30%, transparent), inset 0 0 10px color-mix(in srgb, ${color} 10%, transparent)`,
      }}
    >
      {hasBrandIcon ? (
        <TechIcon name={name} className="size-8 shrink-0 sm:size-10" />
      ) : FallbackIcon ? (
        <FallbackIcon
          className="size-7 shrink-0 sm:size-9"
          style={{ color }}
        />
      ) : (
        <span
          className="font-display text-2xl font-bold"
          style={{ color }}
        >
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}

const AUTO_ADVANCE_MS = 4500;

export function Skills() {
  const groups = profile.skills;
  const count = groups.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setActive((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [active, paused, count]);

  const goTo = (i: number) => setActive(((i % count) + count) % count);

  return (
    <section id="skills" className="overflow-hidden px-6 py-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono-data mb-4 text-xs tracking-widest text-[var(--brand)]">
            02 — SKILLS
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            Technical <em className="gradient-text not-italic">Skills</em>
          </h2>
        </Reveal>

        <div
          className="relative mt-16 h-[440px] sm:h-[400px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {groups.map((group, i) => {
            let diff = i - active;
            if (diff > count / 2) diff -= count;
            if (diff < -count / 2) diff += count;
            const absDiff = Math.abs(diff);
            const isActive = diff === 0;
            const visible = absDiff <= 2;
            const scale = isActive ? 1 : absDiff === 1 ? 0.82 : 0.68;
            const opacity = isActive ? 1 : absDiff === 1 ? 0.45 : 0.16;
            const blurPx = isActive ? 0 : absDiff === 1 ? 1 : 3;

            return (
              <div
                key={group.category}
                className="absolute top-0 left-1/2 h-full"
                style={{
                  width: "min(88%, 440px)",
                  transform: `translateX(calc(-50% + ${diff * 62}%)) scale(${scale})`,
                  opacity: visible ? opacity : 0,
                  filter: blurPx ? `blur(${blurPx}px)` : undefined,
                  zIndex: 10 - absDiff,
                  pointerEvents: isActive ? "auto" : "none",
                  transition:
                    "transform 0.6s cubic-bezier(.4,0,.2,1), opacity 0.6s ease, filter 0.6s ease",
                }}
              >
                <div
                  className={`flex h-full flex-col items-center justify-center rounded-2xl p-6 text-center sm:p-8 ${
                    isActive ? "border-glow" : "border"
                  }`}
                  style={{
                    background: "var(--card-bg)",
                    borderColor: isActive
                      ? undefined
                      : "rgba(var(--border-violet-rgb), 0.15)",
                    boxShadow: isActive
                      ? "0 0 60px rgba(var(--glow-violet-rgb), 0.35), 0 0 140px rgba(var(--glow-violet-rgb), 0.18)"
                      : undefined,
                  }}
                >
                  <h3 className="font-display mb-6 text-2xl font-bold text-[var(--text-strong)] sm:text-3xl">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {group.skills.map((skill) => (
                      <SkillTile key={skill} name={skill} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label="Previous skill category"
            className="absolute top-1/2 left-0 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform hover:scale-110 sm:left-2 sm:size-11"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-deep), var(--brand))",
              boxShadow: "0 0 20px rgba(var(--glow-violet-rgb), 0.5)",
            }}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label="Next skill category"
            className="absolute top-1/2 right-0 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform hover:scale-110 sm:right-2 sm:size-11"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-deep), var(--brand))",
              boxShadow: "0 0 20px rgba(var(--glow-violet-rgb), 0.5)",
            }}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2">
          {groups.map((group, i) => (
            <button
              key={group.category}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${group.category}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === active ? "2rem" : "0.5rem",
                background:
                  i === active
                    ? "linear-gradient(135deg, var(--brand-deep), var(--brand))"
                    : "rgba(var(--border-violet-rgb), 0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
