import { ProjectCard } from "@/components/sections/project-card";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-20 border-t px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <Reveal>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Projects
          </h2>
          <p className="text-justify text-base text-muted-foreground sm:text-lg">
            Explore a collection of projects where I turn ideas into
            practical software solutions, from full-stack applications to
            mobile and technology-driven systems.
          </p>
        </div>
      </Reveal>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {profile.projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 75}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
