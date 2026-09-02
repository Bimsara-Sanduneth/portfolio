import { FolderGit2, Link2, Mail } from "lucide-react";

import { profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  const links = [
    profile.social.github && {
      href: profile.social.github,
      label: "GitHub",
      icon: FolderGit2,
    },
    profile.social.linkedin && {
      href: profile.social.linkedin,
      label: "LinkedIn",
      icon: Link2,
    },
    profile.social.email && {
      href: `mailto:${profile.social.email}`,
      label: "Email",
      icon: Mail,
    },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Mail }[];

  return (
    <footer className="relative z-10 border-t bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {year} {profile.name}. All rights reserved.
        </p>
        {links.length > 0 && (
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {links.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel={label === "Email" ? undefined : "noreferrer"}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-4" />
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
