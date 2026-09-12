import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

export function EducationSection() {
  return (
    <section id="education" className="px-6 py-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10">
            <p className="font-mono-data mb-4 text-xs tracking-widest text-[var(--brand)]">
              04 — EDUCATION
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Where I&apos;ve{" "}
              <em className="gradient-text not-italic">learned</em>
            </h2>
          </div>
          <p className="mb-16 text-justify leading-relaxed text-[var(--text-muted)]">
            {profile.aboutBio}
          </p>
        </Reveal>

        <div>
          {profile.education.map((entry, index) => (
            <Reveal key={entry.institution} delay={index * 100}>
              <div
                className={`relative pb-12 pl-8 ${
                  index < profile.education.length - 1 ? "border-l" : ""
                }`}
                style={{ borderColor: "rgba(var(--border-violet-rgb), 0.15)" }}
              >
                <div
                  className="absolute top-1 left-0 size-3 -translate-x-1.5 rounded-full border-2 border-[var(--brand)]"
                  style={{
                    background: "var(--background)",
                    boxShadow: "0 0 10px rgba(var(--border-violet-rgb), 0.5)",
                  }}
                />
                <div className="mb-3 flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-[var(--text-strong)]">
                      {entry.institution}
                    </h3>
                    <p className="mt-0.5 font-medium text-[var(--brand)]">
                      {entry.level === "undergraduate"
                        ? "Undergraduate"
                        : "School"}
                    </p>
                  </div>
                  <span className="font-mono-data mt-1 text-sm text-[var(--text-muted)] md:mt-0">
                    {entry.status === "current" ? "Current" : "Completed"}
                  </span>
                </div>
                <p className="max-w-xl leading-relaxed text-[var(--text-muted)]">
                  {entry.location}
                </p>
                {entry.detail && (
                  <span className="tag mt-3">{entry.detail}</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
