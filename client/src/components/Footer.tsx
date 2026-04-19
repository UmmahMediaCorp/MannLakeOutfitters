/*
  Footer — Mann Lake Outfitters
  Design: Dark Wilderness Editorial — minimal, raw, confident
*/
import { Link } from "wouter";

interface FooterProps {
  theme?: "amber" | "blue";
}

export default function Footer({ theme = "amber" }: FooterProps) {
  const accentColor = theme === "blue" ? "#4a9aba" : "#c8860a";

  return (
    <footer style={{ background: "var(--canvas)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4 pl-3" style={{ borderLeft: `2px solid ${accentColor}` }}>
              <div className="font-display tracking-widest leading-none text-2xl" style={{ color: "var(--bone)" }}>MANN LAKE</div>
              <div className="font-display tracking-widest leading-none text-2xl" style={{ color: accentColor }}>OUTFITTERS</div>
            </div>
            <p className="font-body text-sm leading-relaxed" style={{ color: "var(--bone-dim)" }}>
              Trophy whitetail deer, black bear, and world-class fishing in the heart of Saskatchewan.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <span className="overline mb-4 block">Navigate</span>
            <div className="flex flex-col gap-3">
              <Link href="/">
                <span className="font-ui text-xs" style={{ color: "var(--bone-dim)" }}>
                  Mann Lake Outfitters
                </span>
              </Link>
              <Link href="/costigan-lake">
                <span className="font-ui text-xs" style={{ color: accentColor }}>
                  Costigan Lake Lodge
                </span>
              </Link>
              <a href="#contact" className="font-ui text-xs" style={{ color: "var(--bone-dim)" }}>
                Contact & Booking
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <span className="overline mb-4 block">Contact</span>
            <div className="flex flex-col gap-2">
              <p className="font-ui text-xs" style={{ color: "var(--bone-dim)" }}>Evan Steppan</p>
              <a href="tel:3065471220" className="font-ui text-xs" style={{ color: accentColor }}>
                (306) 547-1220
              </a>
              <p className="font-ui text-xs mt-2" style={{ color: "var(--bone-dim)" }}>
                10 miles west of Endeavour<br />
                East Central Saskatchewan
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="font-ui text-xs" style={{ color: "var(--bone-dim)", opacity: 0.4 }}>
            © {new Date().getFullYear()} Mann Lake Outfitters. All rights reserved.
          </p>
          <p className="font-ui text-xs" style={{ color: "var(--bone-dim)", opacity: 0.4 }}>
            Saskatchewan, Canada · Est. 2019
          </p>
        </div>
      </div>
    </footer>
  );
}
