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
}: {
  project: Project;
  index?: number;
}) {
  const visibleTech = project.techStack.slice(0, MAX_VISIBLE_TECH);
  const remainingTech = project.techStack.length - visibleTech.length;
  const accent = ACCENTS[index % ACCENTS.length];
  const isPortrait = project.imageAspect === "portrait";
  const year = extractYear(project.dateRange);

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <div className="border-glow card-hover flex h-full flex-col overflow-hidden rounded-2xl bg-[var(--card-bg)]">
        {project.imageUrl && (
          <div
            className={`relative h-52 shrink-0 overflow-hidden ${isPortrait ? "bg-white" : ""}`}
          >
            <Image
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              fill
              className={
                isPortrait
                  ? "object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                  : "object-cover object-top transition-transform duration-700 group-hover:scale-110"
              }
              style={isPortrait ? undefined : { filter: "brightness(0.7)" }}
            />
            {!isPortrait && (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 30%, rgba(15,15,30,0.9) 100%)",
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

        {/* Fixed-height name/description so every card in a row lines up;
            the tag row is pinned to the bottom via mt-auto. */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display mb-2 line-clamp-2 min-h-[3.5rem] text-xl leading-snug font-bold text-[var(--text-strong)] transition-colors group-hover:text-[var(--brand-soft)]">
            {project.title}
          </h3>
          <p className="mb-4 line-clamp-3 min-h-[4.25rem] text-sm leading-relaxed text-[var(--text-muted)]">
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
            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--brand)] opacity-0 transition-opacity group-hover:opacity-100">
              View case study
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
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
