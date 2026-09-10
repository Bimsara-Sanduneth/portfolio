import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FolderGit2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

  return (
    <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to projects
      </Link>

      <div className="mt-8 space-y-3">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
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
            className={`relative mt-10 overflow-hidden rounded-lg border bg-muted ${
              project.imageAspect === "portrait"
                ? "mx-auto aspect-[9/20] w-full max-w-[300px]"
                : "aspect-video"
            }`}
          >
            <Image
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              fill
              className={
                project.imageAspect === "portrait"
                  ? "object-cover"
                  : "object-cover object-top"
              }
            />
          </div>
        )
      )}

      {(project.liveUrl || project.repoUrl) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && (
            <Button asChild>
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="size-4" />
                Live Demo
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button asChild variant="outline">
              <a href={project.repoUrl} target="_blank" rel="noreferrer">
                <FolderGit2 className="size-4" />
                Repository
              </a>
            </Button>
          )}
        </div>
      )}

      <p className="mt-10 text-lg leading-relaxed text-muted-foreground">
        {project.summary}
      </p>

      {project.fullDescription && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {project.fullDescription}
          </p>
        </section>
      )}

      {project.sections?.map((section) => (
        <section key={section.heading} className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            {section.heading}
          </h2>
          {section.paragraphs?.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-6 text-base leading-relaxed text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
          {section.bullets && section.bullets.length > 0 && (
            <ul className="mt-6 list-disc space-y-3 pl-5 text-base text-muted-foreground marker:text-primary">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {project.highlights && project.highlights.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Highlights</h2>
          <ul className="mt-6 list-disc space-y-3 pl-5 text-base text-muted-foreground marker:text-primary">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Tech Stack</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </section>
    </main>
  );
}
