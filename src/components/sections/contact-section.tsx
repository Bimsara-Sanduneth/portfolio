import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 5.02 3.29 9.28 7.86 10.78.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.42.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.67.8.56A11.52 11.52 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.33V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

export function ContactSection() {
  const { email, phone, location, github, linkedin } = profile.social;

  const infoItems = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    phone && {
      icon: Phone,
      label: "Phone",
      value: phone,
      href: `tel:${phone.replace(/\s+/g, "")}`,
    },
    location && {
      icon: MapPin,
      label: "Location",
      value: location,
      href: undefined,
    },
  ].filter(Boolean) as {
    icon: typeof Mail;
    label: string;
    value: string;
    href?: string;
  }[];

  const socialItems = [
    github && {
      icon: GithubIcon,
      label: "GitHub",
      value: `@${github.replace(/\/+$/, "").split("/").pop()}`,
      href: github,
      tileClass: "bg-neutral-900 text-white",
    },
    linkedin && {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: linkedin.replace(/\/+$/, "").split("/").pop() ?? linkedin,
      href: linkedin,
      tileClass: "bg-[#0A66C2] text-white",
    },
  ].filter(Boolean) as {
    icon: typeof GithubIcon;
    label: string;
    value: string;
    href: string;
    tileClass: string;
  }[];

  return (
    <section
      id="contact"
      className="px-6 py-28 md:px-12 lg:px-20"
      style={{
        background:
          "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(var(--glow-violet-rgb), 0.12) 0%, transparent 70%)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono-data mb-6 text-xs tracking-widest text-[var(--brand)]">
            05 — CONTACT
          </p>
          <h2 className="font-display mb-6 text-4xl leading-tight font-bold md:text-6xl">
            Let&apos;s build something
            <br />
            <em className="gradient-text glow-text not-italic">
              extraordinary
            </em>
          </h2>
          <p className="text-justify text-lg leading-relaxed text-[var(--text-muted)]">
            Have a project idea, a technical challenge, or an interesting
            idea to discuss? Feel free to reach out. I&apos;m always open to
            connecting, collaborating, and building meaningful software
            solutions.
          </p>
          <a
            href={`mailto:${email}?subject=Let's build something together`}
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-white transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-deep), var(--brand))",
              boxShadow: "0 0 30px rgba(var(--glow-violet-rgb), 0.5)",
            }}
          >
            <Mail className="size-4" />
            Say Hello
          </a>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Block 1: contact info + socials, unified */}
          <Reveal delay={75} className="h-full">
            <div className="border-glow flex h-full flex-col justify-center space-y-6 rounded-2xl bg-[var(--card-bg)] p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-strong)]/15 text-[var(--brand)]">
                  <Mail className="size-5" />
                </span>
                <h3 className="text-xl font-bold tracking-tight">
                  Contact Information
                </h3>
              </div>

              <div className="space-y-5">
                {infoItems.map(({ icon: Icon, label, value, href }) => {
                  const content = (
                    <>
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-strong)]/15 text-[var(--brand)]">
                        <Icon className="size-5" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-mono-data text-xs tracking-wide text-[var(--text-muted)] uppercase">
                          {label}
                        </span>
                        <span className="font-semibold text-[var(--text-strong)]">
                          {value}
                        </span>
                      </span>
                    </>
                  );

                  return href ? (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-3 transition-opacity hover:opacity-80"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={label} className="flex items-center gap-3">
                      {content}
                    </div>
                  );
                })}

                {socialItems.map(
                  ({ icon: Icon, label, value, href, tileClass }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tileClass}`}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="flex flex-1 flex-col">
                        <span className="font-mono-data text-xs tracking-wide text-[var(--text-muted)] uppercase">
                          {label}
                        </span>
                        <span className="font-semibold text-[var(--text-strong)]">
                          {value}
                        </span>
                      </span>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="border-glow inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-[var(--brand-soft)] transition-colors hover:text-[var(--brand)]"
                      >
                        Visit
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    </div>
                  )
                )}
              </div>
            </div>
          </Reveal>

          {/* Block 2: message form */}
          <Reveal delay={150} className="h-full">
            <div className="border-glow h-full rounded-2xl bg-[var(--card-bg)] p-8">
              <h3 className="text-xl font-bold tracking-tight">
                Send a message
              </h3>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
