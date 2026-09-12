import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FolderGit2 } from "lucide-react";

import { ProjectImageSlideshow } from "@/components/project-image-slideshow";
import { getProjectBySlug, profile } from "@/data/profile";

export function generateStaticParams() {
  return profile.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const isPortrait = project.imageAspect === "portrait";

  return (
    <main className="mx-auto max-w-4xl px-6 pt-32 pb-20 md:px-12">
      <Link
        href="/#projects"
        className="font-mono-data inline-flex items-center gap-1.5 text-xs tracking-wide text-[var(--text-muted)] transition-colors hover:text-[var(--brand)]"
      >
        <ArrowLeft className="size-4" />
        Back to projects
      </Link>

      <div className="mt-8 space-y-3">
        <h1 className="font-display text-4xl font-bold tracking-tight text-[var(--text-strong)] sm:text-5xl">
          {project.title}
        </h1>
        <div className="font-mono-data flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
          {project.dateRange && <span>{project.dateRange}</span>}
          {project.dateRange && <span aria-hidden>•</span>}
          <span>{project.teamOrSolo}</span>
        </div>
      </div>

      {project.images && project.images.length > 0 ? (
        <ProjectImageSlideshow
          images={project.images}
          alt={project.title}
          aspect={project.imageAspect}
        />
      ) : (
        project.imageUrl && (
          <div
            className={`border-glow relative mt-10 aspect-video overflow-hidden rounded-2xl ${
              isPortrait ? "bg-white" : "bg-[var(--card-bg)]"
            }`}
          >
            <Image
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              fill
              className={
                isPortrait ? "object-contain p-6" : "object-cover object-top"
              }
            />
          </div>
        )
      )}

      {(project.liveUrl || project.repoUrl) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-deep), var(--brand))",
                boxShadow: "0 0 30px rgba(var(--glow-violet-rgb), 0.4)",
              }}
            >
              <ExternalLink className="size-4" />
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="border-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[var(--brand-soft)] transition-all hover:text-[var(--brand)]"
            >
              <FolderGit2 className="size-4" />
              Repository
            </a>
          )}
        </div>
      )}

      <p className="mt-10 text-lg leading-relaxed text-[var(--text-muted)]">
        {project.summary}
      </p>

      {project.fullDescription && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
          <p className="mt-6 text-base leading-relaxed text-[var(--text-muted)]">
            {project.fullDescription}
          </p>
        </section>
      )}

      {project.sections?.map((section) => (
        <section key={section.heading} className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">
            {section.heading}
          </h2>
          {section.paragraphs?.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-6 text-base leading-relaxed text-[var(--text-muted)]"
            >
              {paragraph}
            </p>
          ))}
          {section.bullets && section.bullets.length > 0 && (
            <ul className="mt-6 list-disc space-y-3 pl-5 text-base text-[var(--text-muted)] marker:text-[var(--brand)]">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {project.highlights && project.highlights.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">Highlights</h2>
          <ul className="mt-6 list-disc space-y-3 pl-5 text-base text-[var(--text-muted)] marker:text-[var(--brand)]">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight">Tech Stack</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
