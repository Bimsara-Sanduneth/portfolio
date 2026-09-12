import Image from "next/image";
import Link from "next/link";

import { profile } from "@/data/profile";

const totalSkills = profile.skills.reduce(
  (count, group) => count + group.skills.length,
  0
);

const stats: [string, string][] = [
  [`${profile.projects.length}+`, "Projects Shipped"],
  [`${totalSkills}+`, "Tech & Tools"],
  ["3rd", "Year IT Student"],
];

export function Hero() {
  return (
    <section
      id="about"
      className="hero-gradient flex min-h-screen items-center px-6 pt-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <div className="font-mono-data animate-slide-up mb-6 text-sm tracking-widest text-[var(--brand)]">
            ✦ OPEN TO OPPORTUNITIES — 2026
          </div>
          <h1
            className="font-display animate-slide-up mb-6 text-5xl leading-[0.95] font-bold md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            Building Practical
            <br />
            <em className="gradient-text glow-text not-italic">
              Software Solutions
            </em>
            <br />
            From Idea to Launch
          </h1>
          <p
            className="animate-slide-up mb-10 text-justify text-lg leading-relaxed text-[var(--text-muted)]"
            style={{ animationDelay: "0.2s" }}
          >
            {profile.bio}
          </p>
          <div
            className="animate-slide-up flex flex-wrap gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="#projects"
              className="rounded-full px-8 py-3.5 font-semibold text-white transition-all hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, var(--brand-deep), var(--brand))",
                boxShadow: "0 0 30px rgba(var(--glow-violet-rgb), 0.5)",
              }}
            >
              View My Work
            </Link>
            <Link
              href="#contact"
              className="border-glow rounded-full px-8 py-3.5 font-semibold text-[var(--brand-soft)] transition-all hover:text-[var(--brand)]"
            >
              Get In Touch
            </Link>
          </div>
          <div
            className="animate-slide-up mt-12 flex items-center gap-8"
            style={{ animationDelay: "0.4s" }}
          >
            {stats.map(([num, label]) => (
              <div key={label}>
                <div className="font-display gradient-text text-2xl font-bold">
                  {num}
                </div>
                <div className="font-mono-data mt-0.5 text-xs text-[var(--text-muted)]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 flex justify-center md:order-2">
          <div className="relative">
            <div
              className="animate-pulse-glow absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(var(--glow-violet-rgb), 0.3) 0%, transparent 70%)",
                transform: "scale(1.4)",
              }}
            />
            <div className="animate-float relative">
              <div
                className="border-glow size-72 overflow-hidden rounded-full md:size-80"
                style={{
                  boxShadow:
                    "0 0 60px rgba(var(--glow-violet-rgb), 0.4), 0 0 120px rgba(var(--glow-violet-rgb), 0.15)",
                }}
              >
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  width={320}
                  height={320}
                  priority
                  className="size-full object-cover object-top"
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, rgba(var(--glow-violet-rgb), 0.3) 100%)",
                  }}
                />
              </div>
              <div
                className="font-mono-data border-glow absolute -top-4 -right-4 rounded-xl px-3 py-2 text-xs text-[var(--brand-soft)]"
                style={{
                  background: "rgba(var(--badge-bg-rgb), 0.9)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span className="text-[var(--brand)]">→</span> Open to
                opportunities
              </div>
              <div
                className="font-mono-data border-glow absolute -bottom-4 -left-4 rounded-xl px-3 py-2 text-xs text-[var(--brand-soft)]"
                style={{
                  background: "rgba(var(--badge-bg-rgb), 0.9)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span className="text-green-400">●</span>{" "}
                {profile.social.location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
