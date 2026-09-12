"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ProjectCard } from "@/components/sections/project-card";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

const AUTO_ADVANCE_MS = 6000;

export function ProjectsSection() {
  const projects = profile.projects;
  const count = projects.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = setTimeout(() => {
      setActive((i) => (i + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [active, paused, count]);

  const goTo = (i: number) => setActive(((i % count) + count) % count);

  return (
    <section
      id="projects"
      className="overflow-hidden px-6 py-28 md:px-12 lg:px-20"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(var(--glow-violet-rgb), 0.08) 0%, transparent 70%)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-16 flex flex-col justify-between md:flex-row md:items-end">
            <div>
              <p className="font-mono-data mb-4 text-xs tracking-widest text-[var(--brand)]">
                03 — PROJECTS
              </p>
              <h2 className="font-display text-4xl font-bold md:text-5xl">
                Selected <em className="gradient-text not-italic">Work</em>
              </h2>
            </div>
            <p className="mt-4 max-w-xs text-sm text-[var(--text-muted)] md:mt-0">
              A curated selection of full-stack, mobile, and
              hardware-integrated projects I&apos;ve shipped.
            </p>
          </div>
        </Reveal>

        <div
          className="relative mt-6 h-[500px] sm:h-[480px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {projects.map((project, i) => {
            let diff = i - active;
            if (diff > count / 2) diff -= count;
            if (diff < -count / 2) diff += count;
            const absDiff = Math.abs(diff);
            const isActive = diff === 0;
            const visible = absDiff <= 1;
            const scale = isActive ? 1 : 0.85;
            const opacity = isActive ? 1 : 0.25;
            const blurPx = isActive ? 0 : 2;

            return (
              <div
                key={project.slug}
                className="absolute top-0 left-1/2 h-full"
                style={{
                  width: "min(88%, 700px)",
                  transform: `translateX(calc(-50% + ${diff * 66}%)) scale(${scale})`,
                  opacity: visible ? opacity : 0,
                  filter: blurPx ? `blur(${blurPx}px)` : undefined,
                  zIndex: 10 - absDiff,
                  pointerEvents: isActive ? "auto" : "none",
                  transition:
                    "transform 0.6s cubic-bezier(.4,0,.2,1), opacity 0.6s ease, filter 0.6s ease",
                }}
              >
                <ProjectCard project={project} index={i} isActive={isActive} />
              </div>
            );
          })}

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                aria-label="Previous project"
                className="absolute top-[88px] left-0 z-30 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform hover:scale-110 sm:top-[104px] sm:left-2 sm:size-10"
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
                aria-label="Next project"
                className="absolute top-[88px] right-0 z-30 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-white transition-transform hover:scale-110 sm:top-[104px] sm:right-2 sm:size-10"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-deep), var(--brand))",
                  boxShadow: "0 0 20px rgba(var(--glow-violet-rgb), 0.5)",
                }}
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {projects.map((project, i) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${project.title}`}
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
        )}
      </div>
    </section>
  );
}
