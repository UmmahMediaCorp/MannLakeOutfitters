/*
  Costigan Lake Lodge
  Design: Dark Wilderness Editorial — Cool Blue/Slate variant
  Canvas: #060e18 | Accent: #4a9aba | Bone: #f0ead8
  Distinct from Mann Lake but cohesive — sister brand feel
*/

import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

/* ---- CDN Asset URLs ---- */
const HERO_BG = "/images/costigan-hero-dark.webp";

/* ---- Client Photos (verified by visual audit) ---- */
const PHOTO_BEAR_BOW = "/images/IMG_6257.webp";         // Hunter with black bear (bowhunt, lakeside)
const PHOTO_BEAR_DOUBLE = "/images/IMG_6259.webp";      // Two hunters with black + cinnamon phase bears
const PHOTO_BEAR_BOREAL = "/images/IMG_6258.webp";      // Hunter with black bear (boreal forest)
const PHOTO_PIKE_PONTOON = "/images/IMG_7872.webp";     // Man holding large Northern Pike on pontoon boat
const PHOTO_TROUT_MAN = "/images/IMG_6266.webp";        // Man holding Lake Trout (big sky, open water)
const PHOTO_TROUT_WOMAN = "/images/IMG_6336.webp";      // Woman holding Lake Trout (big sky, open water)
const PHOTO_TROUT_HARBERCRAFT = "/images/IMG_6267.webp"; // Elder man with Lake Trout on Harbercraft boat
const PHOTO_SUNSET_ROD = "/images/IMG_6658.webp";       // Fishing rod silhouette against golden sunset
const PHOTO_PIKE_WOMAN = "/images/IMG_1738.webp";       // Woman holding large Northern Pike (boreal lake, evening)
const COSTIGAN_LOGO = "/images/image0.webp";           // Costigan Lake Lodge logo/sign

const TEAL = "#4a9aba";
const CANVAS = "#060e18";

/* ---- Scroll Reveal Hook ---- */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ---- Lightbox ---- */
function Lightbox({
  images, index, onClose, onPrev, onNext
}: {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl font-thin z-10 p-4"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >‹</button>
      <img
        src={images[index].src}
        alt={images[index].alt}
        className="max-h-[90vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl font-thin z-10 p-4"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >›</button>
      <button
        className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl font-thin"
        onClick={onClose}
      >✕</button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-ui text-xs text-white/40">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

const allPhotos = [
  { src: PHOTO_PIKE_PONTOON,     alt: "Northern Pike — Trophy Catch" },
  { src: PHOTO_PIKE_WOMAN,       alt: "Northern Pike — Evening Catch" },
  { src: PHOTO_TROUT_MAN,        alt: "Lake Trout — Open Water" },
  { src: PHOTO_TROUT_WOMAN,      alt: "Lake Trout — Big Sky" },
  { src: PHOTO_TROUT_HARBERCRAFT, alt: "Lake Trout — On the Boat" },
  { src: PHOTO_BEAR_BOW,         alt: "Black Bear — Bowhunt" },
  { src: PHOTO_BEAR_DOUBLE,      alt: "Double Bear — Black & Cinnamon Phase" },
  { src: PHOTO_BEAR_BOREAL,      alt: "Black Bear — Boreal Forest" },
  { src: PHOTO_SUNSET_ROD,       alt: "Sunset on the Water" },
];

export default function CostiganLake() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLElement>(null);


  const introSection = useReveal();
  const fishingSection = useReveal(0.1);
  const bearSection = useReveal(0.1);
  const gallerySection = useReveal(0.1);
  const amenitiesSection = useReveal(0.1);
  const contactSection = useReveal(0.1);

  return (
    <div style={{ background: CANVAS }}>
      <Navigation theme="blue" />

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="hero-section">
        <div
          className="hero-bg loaded"
          style={{ backgroundImage: `url(${HERO_BG})`, backgroundPosition: "center 40%" }}
        />
        {/* Blue-tinted vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(6,14,24,0.4) 0%, rgba(6,14,24,0.0) 30%, rgba(6,14,24,0.0) 50%, rgba(6,14,24,0.75) 80%, rgba(6,14,24,0.97) 100%)",
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Logo */}
            <div className="animate-fade-in mb-6" style={{ animationDelay: "0.2s", opacity: 0 }}>
              <div
                className="inline-flex items-center gap-3 px-4 py-2"
                style={{ borderLeft: `3px solid ${TEAL}` }}
              >
                <div>
                  <div
                    className="font-display tracking-widest"
                    style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", color: "var(--bone)", lineHeight: 1 }}
                  >
                    COSTIGAN LAKE
                  </div>
                  <div
                    className="font-display tracking-widest"
                    style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", color: TEAL, lineHeight: 1 }}
                  >
                    LODGE
                  </div>
                  <div
                    className="font-ui text-xs mt-1"
                    style={{ color: "var(--bone-dim)", opacity: 0.6 }}
                  >
                    Saskatchewan, Canada
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-up mb-3" style={{ animationDelay: "0.5s", opacity: 0 }}>
              <span className="overline" style={{ color: TEAL }}>Saskatchewan, Canada</span>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "0.7s", opacity: 0 }}>
              <h1
                className="font-display leading-none mb-2"
                style={{ fontSize: "clamp(4rem, 12vw, 10rem)", color: "var(--bone)", lineHeight: 0.9 }}
              >
                COSTIGAN
              </h1>
              <h1
                className="font-display leading-none mb-6"
                style={{ fontSize: "clamp(4rem, 12vw, 10rem)", color: TEAL, lineHeight: 0.9 }}
              >
                LAKE LODGE
              </h1>
            </div>

            <div className="animate-fade-up mb-8" style={{ animationDelay: "1s", opacity: 0 }}>
              <p
                className="font-body text-lg md:text-xl italic"
                style={{ color: "var(--bone-dim)", maxWidth: "500px" }}
              >
                World-class Northern Pike and Lake Trout fishing on hundreds of kilometres of pristine Saskatchewan shoreline.
              </p>
            </div>

            <div className="animate-fade-up flex flex-wrap gap-4" style={{ animationDelay: "1.2s", opacity: 0 }}>
              <a
                href="#fishing"
                className="btn-ember"
                style={{ background: TEAL, borderColor: TEAL }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("fishing")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>Explore Fishing</span>
                <span style={{ color: CANVAS }}>→</span>
              </a>
              <a href="#contact" className="btn-ghost" onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}>
                <span>Book Your Trip</span>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="font-ui text-xs" style={{ color: "var(--bone-dim)", opacity: 0.5 }}>Scroll</span>
          <div className="animate-scroll-bounce w-px h-8" style={{ background: TEAL }} />
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section style={{ background: "#0a1628" }}>
        <div className="container py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={introSection.ref} className={`reveal-left ${introSection.visible ? "visible" : ""}`}>
              <span className="overline" style={{ color: TEAL }}>About the Lodge</span>
              <h2
                className="font-display mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--bone)", lineHeight: 0.95 }}
              >
                WHERE THE<br />
                <span style={{ color: TEAL }}>WILDERNESS</span><br />
                BEGINS
              </h2>
              <p className="font-body text-base leading-relaxed mb-6" style={{ color: "var(--bone-dim)" }}>
                Costigan Lake Lodge sits at the edge of the world — hundreds of kilometres of pristine shoreline, crystal-clear water, and the vast Saskatchewan sky. This is a place where the fish are big, the water is cold, and the wilderness is real.
              </p>
              <p className="font-body text-base leading-relaxed mb-8" style={{ color: "var(--bone-dim)" }}>
                A family-affiliated lodge now partnering with Mann Lake Outfitters to offer a complete Saskatchewan wilderness experience — from trophy whitetail in the fall to world-class pike and trout through the open-water season.
              </p>
              <blockquote
                className="font-body text-xl italic pl-6"
                style={{ color: "var(--bone)", borderLeft: `2px solid ${TEAL}` }}
              >
                "Hundreds of kilometres of pristine shoreline — this is Saskatchewan at its finest."
              </blockquote>
            </div>

            <div className={`reveal-right ${introSection.visible ? "visible" : ""}`}>
              <div className="grid grid-cols-2 gap-px">
                {[PHOTO_TROUT_MAN, PHOTO_PIKE_PONTOON, PHOTO_SUNSET_ROD, PHOTO_TROUT_WOMAN].map((src, i) => (
                  <div
                    key={i}
                    className="photo-hover"
                    style={{ aspectRatio: "4/3" }}
                    onClick={() => setLightboxIndex(i === 0 ? 3 : i === 1 ? 0 : i === 2 ? 8 : 4)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i)}
                  >
                    <img src={src} alt="Costigan Lake" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FISHING — NORTHERN PIKE ===== */}
      <section
        id="fishing"
        className="species-panel"
        ref={fishingSection.ref}
        style={{ minHeight: "100vh" }}
      >
        <div
          className="species-panel-bg"
          style={{
            backgroundImage: `url(${PHOTO_PIKE_WOMAN})`,
            backgroundPosition: "center",
            filter: "brightness(0.5) saturate(0.8)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(6,14,24,0.95) 0%, rgba(6,14,24,0.7) 50%, rgba(6,14,24,0.2) 100%)" }}
        />
        <div className="container relative z-10">
          <div className={`max-w-xl reveal-left ${fishingSection.visible ? "visible" : ""}`}>
            <span className="overline" style={{ color: TEAL }}>World-Class Fishing</span>
            <h2
              className="font-display mb-4"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)", color: "var(--bone)", lineHeight: 0.9 }}
            >
              NORTHERN<br />
              <span style={{ color: TEAL }}>PIKE</span>
            </h2>
            <span className="block w-16 h-px mb-6" style={{ background: TEAL }} />
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: "var(--bone-dim)" }}>
              Costigan Lake is home to trophy Northern Pike in pristine, cold Saskatchewan water. These are not stocked fish — they are wild, powerful, and relentless. Spring through fall, the pike fishing here is as good as it gets anywhere in the province.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Species", value: "Northern Pike" },
                { label: "Season", value: "Spring – Fall" },
                { label: "Method", value: "Casting & Trolling" },
                { label: "Water", value: "Crystal Clear" },
              ].map((s, i) => (
                <div key={i} className="stat-block py-2">
                  <div className="font-ui text-xs mb-1" style={{ color: TEAL }}>{s.label}</div>
                  <div className="font-body text-sm" style={{ color: "var(--bone-dim)" }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Pike photo strip */}
            <div className="grid grid-cols-3 gap-1 mb-8">
              {[PHOTO_PIKE_PONTOON, PHOTO_PIKE_WOMAN, PHOTO_SUNSET_ROD].map((src, i) => (
                <div
                  key={i}
                  className="photo-hover"
                  style={{ aspectRatio: "1/1" }}
                  onClick={() => setLightboxIndex(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i)}
                >
                  <img src={src} alt="Northern Pike" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-ember" style={{ background: TEAL, borderColor: TEAL }}
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span>Book a Fishing Trip</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== LAKE TROUT ===== */}
      <section style={{ background: "#0f2035" }}>
        <div className="container py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photos */}
            <div className={`reveal-left ${fishingSection.visible ? "visible" : ""}`}>
              <div className="grid grid-cols-2 gap-px">
                <div className="photo-hover col-span-2" style={{ aspectRatio: "16/7" }}
                  onClick={() => setLightboxIndex(3)} role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(3)}>
                  <img src={PHOTO_TROUT_MAN} alt="Lake Trout" className="w-full h-full object-cover" loading="lazy" />
                </div>
                {[PHOTO_TROUT_WOMAN, PHOTO_TROUT_HARBERCRAFT].map((src, i) => (
                  <div key={i} className="photo-hover" style={{ aspectRatio: "4/3" }}
                    onClick={() => setLightboxIndex(i + 4)} role="button" tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i + 4)}>
                    <img src={src} alt="Lake Trout" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            {/* Text */}
            <div className={`reveal-right ${fishingSection.visible ? "visible" : ""} delay-200`}>
              <span className="overline" style={{ color: TEAL }}>Deep Water Trophy</span>
              <h2
                className="font-display mb-4"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "var(--bone)", lineHeight: 0.9 }}
              >
                LAKE<br />
                <span style={{ color: TEAL }}>TROUT</span>
              </h2>
              <span className="block w-16 h-px mb-6" style={{ background: TEAL }} />
              <p className="font-body text-base leading-relaxed mb-6" style={{ color: "var(--bone-dim)" }}>
                Deep, cold, and crystal-clear — Costigan Lake's Lake Trout fishery is exceptional. These fish grow large in the pristine northern waters, and the experience of pulling a trophy laker from the deep is unlike anything else in the sport.
              </p>
              <p className="font-body text-base leading-relaxed mb-8" style={{ color: "var(--bone-dim)" }}>
                Our boats are fully equipped and our guides know these waters intimately. Whether you're jigging deep structure or trolling the open water, you'll be on fish.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Depth", value: "Deep Structure" },
                  { label: "Method", value: "Jigging & Trolling" },
                  { label: "Boat", value: "Fully Rigged" },
                  { label: "Season", value: "Open Water" },
                ].map((s, i) => (
                  <div key={i} className="stat-block py-2">
                    <div className="font-ui text-xs mb-1" style={{ color: TEAL }}>{s.label}</div>
                    <div className="font-body text-sm" style={{ color: "var(--bone-dim)" }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BLACK BEAR ===== */}
      <section className="species-panel" ref={bearSection.ref}>
        <div
          className="species-panel-bg"
          style={{
            backgroundImage: `url(${PHOTO_BEAR_BOW})`,
            backgroundPosition: "center",
            filter: "brightness(0.4) saturate(0.7)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(255deg, rgba(6,14,24,0.95) 0%, rgba(6,14,24,0.7) 50%, rgba(6,14,24,0.1) 100%)" }}
        />
        <div className="container relative z-10 flex justify-end">
          <div className={`max-w-xl reveal-right ${bearSection.visible ? "visible" : ""}`}>
            <span className="overline" style={{ color: TEAL }}>Spring & Fall Seasons</span>
            <h2
              className="font-display mb-4"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)", color: "var(--bone)", lineHeight: 0.9 }}
            >
              BLACK<br />
              <span style={{ color: TEAL }}>BEAR</span>
            </h2>
            <span className="block w-16 h-px mb-6" style={{ background: TEAL }} />
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: "var(--bone-dim)" }}>
              Costigan Lake Lodge also offers black bear hunting in the surrounding boreal forest. Big bruins in virgin wilderness — combination fishing and bear hunting packages available for the complete Saskatchewan experience.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[PHOTO_BEAR_BOW, PHOTO_BEAR_DOUBLE].map((src, i) => (
                <div key={i} className="photo-hover" style={{ aspectRatio: "4/3" }}
                  onClick={() => setLightboxIndex(i + 6)} role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i + 6)}>
                  <img src={src} alt="Black Bear" className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-ember" style={{ background: TEAL, borderColor: TEAL }}
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span>Book a Bear Hunt</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== AMENITIES ===== */}
      <section style={{ background: "#060e18" }} ref={amenitiesSection.ref}>
        <div className={`text-center pt-24 pb-16 reveal ${amenitiesSection.visible ? "visible" : ""}`}>
          <span className="overline" style={{ color: TEAL }}>Camp Life</span>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--bone)", lineHeight: 0.95 }}
          >
            WHAT'S INCLUDED
          </h2>
        </div>

        {/* Cinematic amenity grid — full-bleed; last orphan tile spans wide as a feature banner */}
        {(() => {
          const items = [
            {
              img: "/images/amenity-boats.webp",
              title: "BOATS",
              desc: "Fully equipped fishing boats with all tackle and gear provided.",
            },
            {
              img: "/images/amenity-lodge.webp",
              title: "LODGE ACCOMMODATIONS",
              desc: "Comfortable lodge with all meals included — home away from home.",
            },
            {
              img: "/images/amenity-guide.webp",
              title: "EXPERT GUIDES",
              desc: "Local guides with intimate knowledge of Costigan Lake's best spots.",
            },
            {
              img: "/images/amenity-processing.webp",
              title: "FISH PROCESSING",
              desc: "Full fish cleaning and packaging services available on site.",
            },
            {
              img: "/images/amenity-wilderness.webp",
              title: "REMOTE WILDERNESS",
              desc: "Hundreds of kilometres of pristine, undeveloped Saskatchewan shoreline.",
            },
            {
              img: "/images/amenity-combo.webp",
              title: "COMBINATION PACKAGES",
              desc: "Combine fishing with black bear hunting for the ultimate Saskatchewan experience.",
            },
            {
              img: "/images/amenity-shore-lunch.webp",
              title: "SHORE LUNCH",
              desc: "Fresh-caught fish prepared lakeside — a Saskatchewan tradition and the highlight of every guided day.",
            },
          ];
          const isLastTileSoloLg = items.length % 3 === 1;
          const isLastTileSoloMd = items.length % 2 === 1;
          return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "2px", background: "#060e18" }}>
          {items.map((item, i) => {
            const isLastTile = i === items.length - 1;
            const spanLg = isLastTile && isLastTileSoloLg ? "lg:col-span-3" : "";
            const spanMd = isLastTile && isLastTileSoloMd ? "md:col-span-2" : "";
            const spanClass = `${spanLg} ${spanMd}`.trim();
            const wideRatio = isLastTile && (isLastTileSoloLg || isLastTileSoloMd);
            return (
            <div
              key={i}
              className={`reveal delay-${(i % 3) * 100 + 100} ${amenitiesSection.visible ? "visible" : ""} ${spanClass}`}
              style={{
                position: "relative",
                aspectRatio: wideRatio ? "16/6" : "4/3",
                overflow: "hidden",
              }}
            >
              {/* Full-bleed background photo */}
              <img
                src={item.img}
                alt={item.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.7s ease",
                }}
                className="amenity-tile-img"
                loading="lazy"
              />
              {/* Dark gradient overlay — heavier at bottom for text legibility */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(6,14,24,0.95) 0%, rgba(6,14,24,0.5) 50%, rgba(6,14,24,0.1) 100%)",
                }}
              />
              {/* Teal top-left accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "3px",
                  height: "100%",
                  background: TEAL,
                  opacity: 0.6,
                }}
              />
              {/* Text content — pinned to bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "2rem",
                }}
              >
                <h3
                  className="font-display mb-2"
                  style={{
                    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                    color: "var(--bone)",
                    letterSpacing: "0.08em",
                    lineHeight: 1.1,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "var(--bone-dim)", maxWidth: "28ch" }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
            );
          })}
        </div>
          );
        })()}
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" style={{ background: CANVAS }} ref={contactSection.ref}>
        <div className="container py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className={`reveal-left ${contactSection.visible ? "visible" : ""}`}>
              <span className="overline" style={{ color: TEAL }}>Get In Touch</span>
              <h2
                className="font-display mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--bone)", lineHeight: 0.95 }}
              >
                BOOK YOUR<br />
                <span style={{ color: TEAL }}>ADVENTURE</span>
              </h2>
              <p className="font-body text-base leading-relaxed mb-10" style={{ color: "var(--bone-dim)" }}>
                Ready to experience Costigan Lake? Reach out through Mann Lake Outfitters to discuss availability, packages, and combination hunt/fish options.
              </p>

              <div className="flex flex-col gap-6 mb-10">
                <div className="stat-block">
                  <div className="font-ui text-xs mb-1" style={{ color: TEAL }}>Book Through</div>
                  <div className="font-body text-lg" style={{ color: "var(--bone)" }}>Mann Lake Outfitters</div>
                </div>
                <div className="stat-block">
                  <div className="font-ui text-xs mb-1" style={{ color: TEAL }}>Contact</div>
                  <div className="font-body text-lg" style={{ color: "var(--bone)" }}>Evan Steppan</div>
                </div>
                <div className="stat-block">
                  <div className="font-ui text-xs mb-1" style={{ color: TEAL }}>Phone</div>
                  <a href="tel:3065471220" className="font-display text-3xl" style={{ color: "var(--bone)" }}>
                    (306) 547-1220
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="tel:3065471220" className="btn-ember" style={{ background: TEAL, borderColor: TEAL }}>
                  <span>Call to Book</span>
                  <span style={{ color: CANVAS }}>→</span>
                </a>
                <a href="/" className="btn-ghost">
                  <span>Mann Lake Outfitters</span>
                </a>
              </div>
            </div>

            {/* Right — sunset photo */}
            <div className={`reveal-right ${contactSection.visible ? "visible" : ""} delay-200`}>
              <div className="photo-hover" style={{ aspectRatio: "4/5" }}
                onClick={() => setLightboxIndex(8)} role="button" tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(8)}>
                <img src={PHOTO_SUNSET_ROD} alt="Sunset on the Water" className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 flex flex-col gap-4">
                {[
                  "Fishing, hunting, and combination packages",
                  "All-inclusive lodge accommodations",
                  "Boats and full tackle provided",
                  "Expert local guides",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: TEAL }} />
                    <p className="font-body text-sm" style={{ color: "var(--bone-dim)" }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer theme="blue" />

      {lightboxIndex !== null && (
        <Lightbox
          images={allPhotos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setLightboxIndex((i) => Math.min(allPhotos.length - 1, (i ?? 0) + 1))}
        />
      )}
    </div>
  );
}
