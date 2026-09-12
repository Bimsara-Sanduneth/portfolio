import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  const links = [
    profile.social.github && { href: profile.social.github, label: "GitHub" },
    profile.social.linkedin && {
      href: profile.social.linkedin,
      label: "LinkedIn",
    },
    profile.social.email && {
      href: `mailto:${profile.social.email}`,
      label: "Email",
    },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <footer
      className="relative z-10 border-t px-6 py-8 text-center md:px-12"
      style={{ borderColor: "rgba(var(--border-violet-rgb), 0.08)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
        <p className="font-mono-data text-xs text-[var(--text-faint)]">
          © {year} {profile.name} — Built with intent
        </p>
        {links.length > 0 && (
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel={label === "Email" ? undefined : "noreferrer"}
                className="font-mono-data text-xs tracking-wide text-[var(--text-muted)] transition-colors hover:text-[var(--brand)]"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
