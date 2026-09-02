import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/data/profile";

const MAX_VISIBLE_TECH = 5;

export function ProjectCard({ project }: { project: Project }) {
  const visibleTech = project.techStack.slice(0, MAX_VISIBLE_TECH);
  const remainingTech = project.techStack.length - visibleTech.length;

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-colors group-hover:border-foreground/30">
        {project.imageUrl && (
          <div className="relative -mt-6 aspect-video overflow-hidden border-b bg-muted">
            <Image
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover object-top"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-lg">{project.title}</CardTitle>
          {project.dateRange && (
            <CardDescription>{project.dateRange}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">{project.summary}</p>
          <div className="flex flex-wrap gap-2">
            {visibleTech.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
            {remainingTech > 0 && (
              <Badge variant="outline">+{remainingTech} more</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
