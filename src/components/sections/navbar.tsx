"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const sectionLinks = [
  { hash: "home", label: "Home" },
  { hash: "skills", label: "Skills" },
  { hash: "projects", label: "Projects" },
  { hash: "about", label: "About" },
  { hash: "contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("home");

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
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="truncate text-base font-semibold tracking-tight"
        >
          {profile.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {sectionLinks.map((link) => (
            <Link
              key={link.hash}
              href={hrefFor(link.hash)}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                isActive(link.hash) && "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>{profile.name}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4">
            {sectionLinks.map((link) => (
              <Link
                key={link.hash}
                href={hrefFor(link.hash)}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                  isActive(link.hash) && "bg-accent text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
