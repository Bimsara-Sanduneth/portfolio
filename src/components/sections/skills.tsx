import { Braces, Database, Layout, Server, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { profile, type SkillCategory } from "@/data/profile";

const categoryIcons: Record<SkillCategory, LucideIcon> = {
  Languages: Braces,
  Frontend: Layout,
  Backend: Server,
  Database: Database,
  "Tools & Platforms": Wrench,
};

export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-6xl scroll-mt-20 border-t px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <Reveal>
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Skills & Technologies
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            The languages, frameworks, and tools I reach for when building
            full-stack and hardware-integrated projects.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((group, index) => {
          const Icon = categoryIcons[group.category];
          return (
            <Reveal key={group.category} delay={index * 75}>
              <Card className="h-full transition-colors hover:border-foreground/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4.5" />
                    </span>
                    <CardTitle className="text-sm font-semibold tracking-wide text-foreground uppercase">
                      {group.category}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
