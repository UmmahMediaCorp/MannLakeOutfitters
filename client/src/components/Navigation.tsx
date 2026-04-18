/*
  Navigation — Mann Lake Outfitters
  Design: Dark Wilderness Editorial
  Transparent over hero, near-black on scroll. Minimal. Confident.
*/
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

interface NavigationProps {
  theme?: "amber" | "blue";
}

export default function Navigation({ theme = "amber" }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const accentColor = theme === "blue" ? "#4a9aba" : "#c8860a";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(13,13,11,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 group">
                <div
                  className="px-3 py-1"
                  style={{ borderLeft: `2px solid ${accentColor}` }}
                >
                  <div
                    className="font-display tracking-widest leading-none"
                    style={{ fontSize: "1rem", color: "var(--bone)" }}
                  >
                    MANN LAKE
                  </div>
                  <div
                    className="font-display tracking-widest leading-none"
                    style={{ fontSize: "1rem", color: accentColor }}
                  >
                    OUTFITTERS
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-10">
              <Link href="/">
                <span className={`nav-link ${location === "/" ? "active" : ""}`}>
                  Mann Lake Outfitters
                </span>
              </Link>
              <Link href="/costigan-lake">
                <span
                  className={`nav-link ${location === "/costigan-lake" ? "active" : ""}`}
                  style={{ color: location === "/costigan-lake" ? accentColor : undefined }}
                >
                  Costigan Lake Lodge
                </span>
              </Link>
              <a
                href="#contact"
                className="btn-ember"
                style={{
                  background: accentColor,
                  borderColor: accentColor,
                  padding: "0.55rem 1.4rem",
                  fontSize: "0.65rem",
                }}
                onClick={(e) => {
                  const el = document.getElementById("contact");
                  if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth" }); }
                }}
              >
                <span>Book Now</span>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block h-px w-6 transition-all duration-300 origin-center"
                style={{
                  background: "var(--bone)",
                  transform: menuOpen ? "rotate(45deg) translate(3.5px, 3.5px)" : "none",
                }}
              />
              <span
                className="block h-px w-6 transition-all duration-300"
                style={{ background: "var(--bone)", opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-px w-6 transition-all duration-300 origin-center"
                style={{
                  background: "var(--bone)",
                  transform: menuOpen ? "rotate(-45deg) translate(3.5px, -3.5px)" : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center items-start pl-12 gap-8 transition-all duration-500 md:hidden"
        style={{
          background: "rgba(13,13,11,0.98)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          backdropFilter: "blur(20px)",
        }}
      >
        <div>
          <span className="overline mb-2">Hunting</span>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <div className="font-display text-6xl text-bone tracking-widest leading-none">
              Mann Lake
            </div>
            <div className="font-display text-6xl text-bone tracking-widest leading-none">
              Outfitters
            </div>
          </Link>
        </div>
        <div>
          <span className="overline mb-2" style={{ color: accentColor }}>Fishing Lodge</span>
          <Link href="/costigan-lake" onClick={() => setMenuOpen(false)}>
            <div className="font-display text-6xl tracking-widest leading-none" style={{ color: accentColor }}>
              Costigan Lake
            </div>
            <div className="font-display text-6xl tracking-widest leading-none" style={{ color: accentColor }}>
              Lodge
            </div>
          </Link>
        </div>
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="btn-ember mt-4"
          style={{ background: accentColor, borderColor: accentColor }}
        >
          <span>Book Your Hunt</span>
        </a>
      </div>
    </>
  );
}
