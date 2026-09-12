import {
  Braces,
  Cpu,
  Database,
  Layout,
  Server,
  SquareCode,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { TechIcon, TECH_ICONS } from "@/components/tech-icon";
import { profile, type SkillCategory } from "@/data/profile";

const categoryIcons: Record<SkillCategory, LucideIcon> = {
  Languages: Braces,
  Frontend: Layout,
  Backend: Server,
  Database: Database,
  "Tools & Platforms": Wrench,
};

// Skills without an official brand mark (or one that doesn't survive on a
// dark card) fall back to a generic Lucide glyph in a distinguishing color.
const FALLBACK_ICONS: Record<string, { icon: LucideIcon; color: string }> = {
  PDO: { icon: Database, color: "var(--brand)" },
  "VS Code": { icon: SquareCode, color: "#007ACC" },
  IoT: { icon: Cpu, color: "var(--brand)" },
};

function SkillTile({ name }: { name: string }) {
  const hasBrandIcon = Boolean(TECH_ICONS[name]);
  const fallback = FALLBACK_ICONS[name];
  const FallbackIcon = fallback?.icon;

  return (
    <div className="border-glow card-hover flex aspect-square flex-col items-center justify-center gap-2 rounded-xl bg-[var(--tile-bg)] p-2 text-center">
      {hasBrandIcon ? (
        <TechIcon name={name} className="size-7 shrink-0" />
      ) : FallbackIcon ? (
        <FallbackIcon
          className="size-6 shrink-0"
          style={{ color: fallback.color }}
        />
      ) : (
        <span className="font-display text-lg font-bold text-[var(--brand)]">
          {name.charAt(0)}
        </span>
      )}
      <span className="font-mono-data text-[10px] leading-tight text-[var(--text-muted)]">
        {name}
      </span>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="px-6 py-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono-data mb-4 text-xs tracking-widest text-[var(--brand)]">
            02 — SKILLS
          </p>
          <h2 className="font-display mb-6 text-4xl leading-tight font-bold md:text-5xl">
            Where code meets
            <br />
            <em className="gradient-text not-italic">real-world impact</em>
          </h2>
          <p className="text-justify leading-relaxed text-[var(--text-muted)]">
            I build across the whole stack — from responsive interfaces to
            the APIs and databases behind them, with hardware-integrated
            systems on the side.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {profile.skills.map((group) => (
              <span key={group.category} className="tag">
                {group.category}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((group, index) => {
            const Icon = categoryIcons[group.category];
            return (
              <Reveal key={group.category} delay={index * 75}>
                <div className="border-glow card-hover h-full rounded-2xl bg-[var(--card-bg)] p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-strong)]/15 text-[var(--brand)]">
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className="font-mono-data text-sm font-semibold tracking-wide text-[var(--text-strong)] uppercase">
                      {group.category}
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {group.skills.map((skill) => (
                      <SkillTile key={skill} name={skill} />
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
