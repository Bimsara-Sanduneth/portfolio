import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      id="home"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="flex flex-col-reverse items-center gap-10 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
        <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {profile.name}
            </h1>
            <p className="text-lg font-medium text-primary sm:text-xl">
              {profile.tagline}
            </p>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.bio}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#projects">View Projects</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contact">Contact Me</Link>
            </Button>
          </div>
        </div>

        <Image
          src={profile.avatarUrl}
          alt={profile.name}
          width={192}
          height={192}
          priority
          className="size-32 shrink-0 rounded-full border object-cover object-top shadow-sm sm:size-48"
        />
      </div>
    </section>
  );
}
