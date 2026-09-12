import { ProjectCard } from "@/components/sections/project-card";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-6 py-28 md:px-12 lg:px-20"
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

        <div className="grid gap-6 md:grid-cols-2">
          {profile.projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 75}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
