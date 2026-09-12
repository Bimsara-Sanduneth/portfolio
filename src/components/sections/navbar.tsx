"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { ThemeToggle } from "@/components/theme-toggle";

const sectionLinks = [
  { hash: "about", label: "About" },
  { hash: "skills", label: "Skills" },
  { hash: "projects", label: "Projects" },
  { hash: "education", label: "Education" },
  { hash: "contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("about");

  // Highlight the nav link for whichever section is currently in view.
  useEffect(() => {
    if (!isHome) return;

    const elements = sectionLinks
      .map((link) => document.getElementById(link.hash))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHash(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  const hrefFor = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`);
  const isActive = (hash: string) => isHome && activeHash === hash;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12"
        style={{
          background: "rgba(var(--overlay-rgb), 0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(var(--border-violet-rgb), 0.08)",
        }}
      >
        <Link
          href={hrefFor("about")}
          className="font-display gradient-text truncate text-xl font-bold tracking-tight"
        >
          {profile.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {sectionLinks.map((link) => (
            <Link
              key={link.hash}
              href={hrefFor(link.hash)}
              className={cn(
                "nav-link text-sm font-medium tracking-wide text-[var(--text-muted)] transition-colors hover:text-[var(--brand-soft)]",
                isActive(link.hash) && "active text-[var(--brand)]"
              )}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle className="ml-2" />
          <Link
            href={hrefFor("contact")}
            className="ml-2 rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-strong), var(--brand))",
              boxShadow: "0 0 20px rgba(var(--glow-violet-rgb), 0.4)",
            }}
          >
            Say Hello
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="text-[var(--brand)]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </div>
      </header>

      {/* Rendered as a sibling of <header>, not a child — the header's
          backdrop-filter would otherwise become this element's containing
          block and break `fixed inset-0` positioning. */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: "rgba(var(--overlay-rgb), 0.97)" }}
        >
          {sectionLinks.map((link) => (
            <Link
              key={link.hash}
              href={hrefFor(link.hash)}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "font-display text-3xl font-bold text-[var(--brand-soft)] transition-all hover:text-[var(--brand)]",
                isActive(link.hash) && "gradient-text"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
