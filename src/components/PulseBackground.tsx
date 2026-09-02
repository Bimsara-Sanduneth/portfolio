"use client";

import { useEffect, useRef } from "react";

interface Pulse {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  t: number;
  length: number;
  speed: number;
  trail: number;
  radius: number;
}

interface StaticDot {
  x: number;
  y: number;
  radius: number;
}

const MIN_PULSES = 12;
const MAX_PULSES = 18;
const STATIC_DOT_COUNT = 8;

function randomEdgePoint(edge: number, width: number, height: number) {
  switch (edge) {
    case 0:
      return { x: Math.random() * width, y: 0 };
    case 1:
      return { x: width, y: Math.random() * height };
    case 2:
      return { x: Math.random() * width, y: height };
    default:
      return { x: 0, y: Math.random() * height };
  }
}

function createPulse(width: number, height: number): Pulse {
  const startEdge = Math.floor(Math.random() * 4);
  let endEdge = Math.floor(Math.random() * 4);
  while (endEdge === startEdge) {
    endEdge = Math.floor(Math.random() * 4);
  }

  const start = randomEdgePoint(startEdge, width, height);
  const end = randomEdgePoint(endEdge, width, height);
  const length = Math.hypot(end.x - start.x, end.y - start.y) || 1;

  return {
    x0: start.x,
    y0: start.y,
    x1: end.x,
    y1: end.y,
    t: 0,
    length,
    speed: 60 + Math.random() * 50,
    trail: 0.18 + Math.random() * 0.12,
    radius: 1.4 + Math.random() * 1.4,
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function withAlpha(color: string, alpha: number) {
  const trimmed = color.trim();
  if (!trimmed) return `rgba(59, 130, 246, ${alpha})`;
  return trimmed.replace(/\)\s*$/, ` / ${alpha})`);
}

export function PulseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = document.documentElement;
    let colorBase = "";
    let baseOpacity = 0.35;

    const readCssVars = () => {
      const styles = getComputedStyle(root);
      colorBase = styles.getPropertyValue("--primary") || colorBase;
      const opacityValue = parseFloat(
        styles.getPropertyValue("--pulse-opacity")
      );
      baseOpacity = Number.isFinite(opacityValue) ? opacityValue : 0.35;
    };

    readCssVars();

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let pulses: Pulse[] = [];
    let staticDots: StaticDot[] = [];
    let frameId = 0;
    let lastTime = 0;

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const dot of staticDots) {
        ctx.beginPath();
        ctx.fillStyle = withAlpha(colorBase, baseOpacity * 0.6);
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const setupStatic = () => {
      staticDots = Array.from({ length: STATIC_DOT_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.2 + Math.random() * 1.2,
      }));
      drawStatic();
    };

    const setupPulses = () => {
      const count =
        MIN_PULSES +
        Math.floor(Math.random() * (MAX_PULSES - MIN_PULSES + 1));
      pulses = Array.from({ length: count }, () => createPulse(width, height));
    };

    const step = (time: number) => {
      if (!lastTime) lastTime = time;
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (const pulse of pulses) {
        pulse.t += (pulse.speed * dt) / pulse.length;
        if (pulse.t >= 1) {
          Object.assign(pulse, createPulse(width, height));
        }

        const headT = Math.min(pulse.t, 1);
        const tailT = Math.max(0, headT - pulse.trail);
        const hx = lerp(pulse.x0, pulse.x1, headT);
        const hy = lerp(pulse.y0, pulse.y1, headT);
        const tx = lerp(pulse.x0, pulse.x1, tailT);
        const ty = lerp(pulse.y0, pulse.y1, tailT);

        const gradient = ctx.createLinearGradient(tx, ty, hx, hy);
        gradient.addColorStop(0, withAlpha(colorBase, 0));
        gradient.addColorStop(1, withAlpha(colorBase, baseOpacity));

        ctx.strokeStyle = gradient;
        ctx.lineWidth = pulse.radius * 0.9;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = withAlpha(colorBase, baseOpacity);
        ctx.shadowColor = withAlpha(colorBase, baseOpacity);
        ctx.shadowBlur = 8;
        ctx.arc(hx, hy, pulse.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      frameId = requestAnimationFrame(step);
    };

    const stopAnimated = () => {
      cancelAnimationFrame(frameId);
    };

    const startAnimated = () => {
      stopAnimated();
      lastTime = 0;
      setupPulses();
      frameId = requestAnimationFrame(step);
    };

    const applyMotionPreference = () => {
      if (reducedMotionQuery.matches) {
        stopAnimated();
        setupStatic();
      } else {
        startAnimated();
      }
    };

    applyMotionPreference();

    const handleResize = () => {
      resize();
      if (reducedMotionQuery.matches) {
        setupStatic();
      } else {
        setupPulses();
      }
    };

    const handleMotionChange = () => {
      applyMotionPreference();
    };

    const handleThemeChange = () => {
      readCssVars();
      if (reducedMotionQuery.matches) {
        drawStatic();
      }
    };

    const themeObserver = new MutationObserver(handleThemeChange);
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("resize", handleResize);
    reducedMotionQuery.addEventListener("change", handleMotionChange);

    return () => {
      stopAnimated();
      window.removeEventListener("resize", handleResize);
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-screen w-screen"
      style={{ zIndex: -1 }}
    />
  );
}
