import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/data/profile";

const MAX_VISIBLE_TECH = 4;
const ACCENTS = ["#7c3aed", "#a78bfa", "#6d28d9", "#8b5cf6", "#5b21b6"];

function extractYear(dateRange: string) {
  return dateRange.match(/\d{4}/)?.[0] ?? "";
}

export function ProjectCard({
  project,
  index = 0,
  isActive = true,
}: {
  project: Project;
  index?: number;
  isActive?: boolean;
}) {
  const visibleTech = project.techStack.slice(0, MAX_VISIBLE_TECH);
  const remainingTech = project.techStack.length - visibleTech.length;
  const accent = ACCENTS[index % ACCENTS.length];
  const isPortrait = project.imageAspect === "portrait";
  const year = extractYear(project.dateRange);
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full"
      tabIndex={isActive ? 0 : -1}
      aria-hidden={!isActive}
    >
      <div
        className={`card-hover flex h-full flex-col overflow-hidden rounded-3xl ${
          isActive ? "border-glow" : "border"
        }`}
        style={{
          background: "var(--card-bg)",
          borderColor: isActive
            ? undefined
            : "rgba(var(--border-violet-rgb), 0.15)",
          boxShadow: isActive
            ? "0 0 60px rgba(var(--glow-violet-rgb), 0.3), 0 0 140px rgba(var(--glow-violet-rgb), 0.15)"
            : undefined,
        }}
      >
        {project.imageUrl && (
          <div
            className={`relative h-44 shrink-0 overflow-hidden sm:h-52 ${
              isPortrait ? "bg-white" : ""
            }`}
          >
            <Image
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              fill
              className={
                isPortrait
                  ? "object-contain p-5 transition-transform duration-700 group-hover:scale-105"
                  : "object-cover object-top transition-transform duration-700 group-hover:scale-110"
              }
              style={isPortrait ? undefined : { filter: "brightness(0.65)" }}
            />
            {!isPortrait && (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(15,15,30,0.85) 100%)",
                }}
              />
            )}
            {/* Year label: fixed (not theme-linked) — it sits on the
                photo's own dark scrim regardless of site theme. */}
            {year && (
              <div className="font-mono-data absolute top-4 right-4 text-xs text-[#8b7db5]">
                {year}
              </div>
            )}
            <div
              className="animate-pulse-glow absolute top-4 left-4 size-2 rounded-full"
              style={{ background: accent }}
            />
          </div>
        )}

        <div className="relative flex flex-1 flex-col overflow-hidden p-6 sm:p-7">
          {/* Ghost index number: a large faint numeral watermark that
              gives each card a distinct editorial identity. */}
          <span
            className="font-display pointer-events-none absolute -top-3 right-5 text-7xl leading-none font-bold select-none sm:text-8xl"
            style={{ color: accent, opacity: 0.08 }}
          >
            {indexLabel}
          </span>
          {/* Accent bar grows from 0 to full height on hover. */}
          <span
            className="absolute top-0 left-0 h-0 w-1 rounded-full transition-all duration-500 ease-out group-hover:h-full"
            style={{ background: accent }}
          />

          <p
            className="font-mono-data mb-2 text-xs tracking-widest"
            style={{ color: accent }}
          >
            PROJECT {indexLabel}
          </p>
          <h3 className="font-display mb-2 line-clamp-2 min-h-[2.75rem] text-lg leading-snug font-bold text-[var(--text-strong)] transition-colors group-hover:text-[var(--brand-soft)] sm:min-h-[3.25rem] sm:text-xl">
            {project.title}
          </h3>
          <p className="mb-4 line-clamp-2 min-h-[2.5rem] max-w-2xl text-sm leading-relaxed text-[var(--text-muted)] sm:min-h-[2.75rem]">
            {project.summary}
          </p>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {visibleTech.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
              {remainingTech > 0 && (
                <span className="tag">+{remainingTech} more</span>
              )}
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--brand)]">
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                View case study
              </span>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
