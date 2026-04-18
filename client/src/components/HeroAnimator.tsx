/* ============================================================
   HeroAnimator — Cinematic hero animation system
   Design: Rugged Timber & Slate
   
   Sequence:
   0–1.5s  → Fishing rod slides in from bottom-right, line casts
   1.5–3s  → Fishing rod holds, line ripples
   3–4s    → Fishing rod fades out
   4–5.5s  → Rifle silhouette slides in from left, rises to aim
   5.5–7s  → Rifle holds in aim position, crosshair flickers
   7–8s    → Rifle fades out, deer silhouette appears briefly
   8s+     → All clear, hero text fully visible
   
   Particles: floating golden dust motes throughout
   ============================================================ */

import { useEffect, useRef, useState } from "react";

const FISHING_ROD_URL = "/images/fishing-rod-silhouette.png";
const RIFLE_URL = "/images/rifle-silhouette.png";
const DEER_URL = "/images/deer-silhouette.png";

/* Particle type */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
  delay: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.1,
    speed: Math.random() * 20 + 15,
    drift: (Math.random() - 0.5) * 30,
    delay: Math.random() * 8,
  }));
}

/* Typewriter hook */
export function useTypewriter(text: string, speed = 60, startDelay = 800) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;
    let i = 0;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/* ---- Animation phase enum ---- */
type Phase = "rod" | "rod-hold" | "rod-out" | "rifle-in" | "rifle-hold" | "rifle-out" | "deer" | "done";

export default function HeroAnimator() {
  const [phase, setPhase] = useState<Phase>("rod");
  const [particles] = useState(() => generateParticles(28));
  const phaseRef = useRef<Phase>("rod");

  useEffect(() => {
    const timeline: [Phase, number][] = [
      ["rod", 0],
      ["rod-hold", 1800],
      ["rod-out", 3200],
      ["rifle-in", 4000],
      ["rifle-hold", 5600],
      ["rifle-out", 7200],
      ["deer", 8000],
      ["done", 9200],
    ];

    const timers = timeline.map(([p, delay]) =>
      setTimeout(() => {
        phaseRef.current = p;
        setPhase(p);
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const rodVisible = phase === "rod" || phase === "rod-hold";
  const rodFading = phase === "rod-out";
  const rifleVisible = phase === "rifle-in" || phase === "rifle-hold";
  const rifleFading = phase === "rifle-out";
  const deerVisible = phase === "deer";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* ---- Floating Particles ---- */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: `oklch(0.72 0.15 75 / ${p.opacity})`,
            animation: `float-particle ${p.speed}s ${p.delay}s infinite ease-in-out`,
            boxShadow: `0 0 ${p.size * 2}px oklch(0.72 0.15 75 / 0.6)`,
          }}
        />
      ))}

      {/* ---- Fishing Rod ---- */}
      <div
        className="absolute"
        style={{
          bottom: "8%",
          right: "-5%",
          width: "55%",
          maxWidth: "700px",
          transition: "opacity 0.8s ease, transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          opacity: rodVisible ? 0.85 : rodFading ? 0 : 0,
          transform: rodVisible
            ? "translateX(0) translateY(0) rotate(-8deg)"
            : "translateX(30%) translateY(20%) rotate(-8deg)",
          filter: "invert(1) brightness(0.7) sepia(0.3)",
          mixBlendMode: "screen",
        }}
      >
        <img
          src={FISHING_ROD_URL}
          alt=""
          className="w-full h-auto"
          draggable={false}
        />
        {/* Animated fishing line */}
        {rodVisible && (
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 700 400"
            style={{
              opacity: phase === "rod-hold" ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
          >
            <path
              d="M 150 50 Q 50 200 20 380"
              fill="none"
              stroke="oklch(0.72 0.15 75 / 0.6)"
              strokeWidth="1.5"
              strokeDasharray="300"
              strokeDashoffset="0"
              style={{
                animation: phase === "rod-hold" ? "cast-line 1.5s ease forwards" : "none",
              }}
            />
            {/* Lure bob */}
            <circle
              cx="20"
              cy="380"
              r="4"
              fill="oklch(0.72 0.15 75)"
              style={{
                animation: phase === "rod-hold" ? "lure-bob 1s 1.5s ease-in-out infinite alternate" : "none",
              }}
            />
          </svg>
        )}
      </div>

      {/* ---- Rifle ---- */}
      <div
        className="absolute"
        style={{
          bottom: "18%",
          left: "-2%",
          width: "60%",
          maxWidth: "750px",
          transition: "opacity 0.8s ease, transform 1.0s cubic-bezier(0.22, 1, 0.36, 1)",
          opacity: rifleVisible ? 0.8 : rifleFading ? 0 : 0,
          transform: rifleVisible
            ? "translateX(0) translateY(0) rotate(-3deg)"
            : "translateX(-40%) translateY(10%) rotate(-3deg)",
          filter: "invert(1) brightness(0.7) sepia(0.2)",
          mixBlendMode: "screen",
        }}
      >
        <img
          src={RIFLE_URL}
          alt=""
          className="w-full h-auto"
          draggable={false}
        />
        {/* Scope crosshair overlay */}
        {phase === "rifle-hold" && (
          <div
            className="absolute"
            style={{
              top: "20%",
              right: "15%",
              width: "60px",
              height: "60px",
              animation: "crosshair-flicker 0.3s ease-in-out infinite alternate",
            }}
          >
            <svg viewBox="0 0 60 60" className="w-full h-full">
              <circle cx="30" cy="30" r="25" fill="none" stroke="oklch(0.72 0.15 75 / 0.7)" strokeWidth="1.5" />
              <line x1="30" y1="5" x2="30" y2="25" stroke="oklch(0.72 0.15 75 / 0.7)" strokeWidth="1.5" />
              <line x1="30" y1="35" x2="30" y2="55" stroke="oklch(0.72 0.15 75 / 0.7)" strokeWidth="1.5" />
              <line x1="5" y1="30" x2="25" y2="30" stroke="oklch(0.72 0.15 75 / 0.7)" strokeWidth="1.5" />
              <line x1="35" y1="30" x2="55" y2="30" stroke="oklch(0.72 0.15 75 / 0.7)" strokeWidth="1.5" />
              <circle cx="30" cy="30" r="3" fill="oklch(0.72 0.15 75 / 0.5)" />
            </svg>
          </div>
        )}
      </div>

      {/* ---- Deer Silhouette (brief flash) ---- */}
      <div
        className="absolute"
        style={{
          bottom: "5%",
          right: "10%",
          width: "25%",
          maxWidth: "320px",
          transition: "opacity 0.6s ease, transform 0.8s ease",
          opacity: deerVisible ? 0.6 : 0,
          transform: deerVisible ? "translateX(0)" : "translateX(15%)",
          filter: "invert(1) brightness(0.5) sepia(0.4)",
          mixBlendMode: "screen",
        }}
      >
        <img
          src={DEER_URL}
          alt=""
          className="w-full h-auto"
          draggable={false}
        />
      </div>

      {/* ---- Vignette overlay ---- */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
