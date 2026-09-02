import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

export function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-20 border-t px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <Reveal>
        <div className="flex items-center gap-6">
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            width={96}
            height={96}
            className="size-20 shrink-0 rounded-full border object-cover object-top shadow-sm sm:size-24"
          />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About
          </h2>
        </div>
        <p className="mt-8 text-justify text-lg leading-relaxed text-muted-foreground">
          {profile.aboutBio}
        </p>
      </Reveal>

      <div className="mt-16">
        <Reveal>
          <h3 className="text-2xl font-semibold tracking-tight">Education</h3>
        </Reveal>
        <ol className="mt-8 space-y-10 border-l pl-8">
          {profile.education.map((entry, index) => (
            <Reveal key={entry.institution} delay={index * 100}>
              <li className="relative">
                <span
                  className={
                    entry.status === "current"
                      ? "absolute top-1.5 -left-[33px] size-3 rounded-full border-2 border-background bg-primary"
                      : "absolute top-1.5 -left-[33px] size-3 rounded-full border-2 border-background bg-muted-foreground"
                  }
                  aria-hidden
                />
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold">{entry.institution}</h4>
                  <Badge
                    variant={
                      entry.status === "current" ? "default" : "secondary"
                    }
                  >
                    {entry.status === "current" ? "Current" : "Completed"}
                  </Badge>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {entry.location} ·{" "}
                  {entry.level === "undergraduate"
                    ? "Undergraduate"
                    : "School"}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
