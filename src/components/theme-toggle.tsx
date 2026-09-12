"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`border-glow flex size-9 shrink-0 items-center justify-center rounded-full text-[var(--brand)] transition-transform hover:scale-105 ${className ?? ""}`}
    >
      {mounted && (
        <>
          <Sun className="hidden size-4 dark:block" />
          <Moon className="block size-4 dark:hidden" />
        </>
      )}
    </button>
  );
}
