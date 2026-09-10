"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ProjectImageSlideshowProps {
  images: string[];
  alt: string;
  intervalMs?: number;
  aspect?: "landscape" | "portrait";
}

export function ProjectImageSlideshow({
  images,
  alt,
  intervalMs = 4000,
  aspect = "landscape",
}: ProjectImageSlideshowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isPortrait = aspect === "portrait";

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  return (
    <div
      className={`relative mt-10 overflow-hidden rounded-lg border bg-muted ${
        isPortrait
          ? "mx-auto aspect-[9/20] w-full max-w-[300px] rounded-2xl"
          : "aspect-video"
      }`}
    >
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} screenshot ${index + 1}`}
          fill
          priority={index === 0}
          className={`transition-opacity duration-1000 ease-in-out ${
            isPortrait ? "object-cover" : "object-cover object-top"
          } ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Show screenshot ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-5 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
