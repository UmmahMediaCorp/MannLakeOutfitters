/*
  Home — Mann Lake Outfitters
  Design: Dark Wilderness Editorial
  Canvas: #0d0d0b | Ember: #c8860a | Bone: #f0ead8
  Typography: Bebas Neue (display) + Lora (body) + Barlow Condensed (UI)
  Layout: Full-bleed asymmetric, scroll-driven storytelling
*/

import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

/* ---- CDN Asset URLs ---- */
const HERO_BG = "/images/hero-dark-forest.webp";
const WHITETAIL_BG = "/images/whitetail-dark.webp";
const BEAR_BG = "/images/bear-dark.webp";
const FISHING_BG = "/images/fishing-dark.webp";
const COSTIGAN_HERO = "/images/costigan-hero-dark.webp";

/* ---- Client Photos ---- */
// What each photo ACTUALLY shows (verified by visual audit):
const PHOTO_SIGN = "/images/SimilartoSign.PNG";      // Mann Lake Outfitters wooden sign
const PHOTO_COSTIGAN_LOGO = "/images/image0.webp";    // Costigan Lake Lodge logo
const PHOTO_BEAR_BOW = "/images/IMG_6257.webp";        // Hunter with black bear (bowhunt, lakeside)
const PHOTO_BEAR_DOUBLE = "/images/IMG_6259.webp";     // Two hunters with black + cinnamon phase bears
const PHOTO_BEAR_BOREAL = "/images/IMG_6258.webp";     // Hunter with black bear (boreal forest)
const PHOTO_PIKE_PONTOON = "/images/IMG_7872.webp";    // Man holding large Northern Pike on pontoon boat
const PHOTO_TROUT_MAN = "/images/IMG_6266.webp";       // Man holding Lake Trout (big sky, open water)
const PHOTO_TROUT_WOMAN = "/images/IMG_6336.webp";     // Woman holding Lake Trout (big sky, open water)
const PHOTO_TROUT_HARBERCRAFT = "/images/IMG_6267.webp"; // Elder man with Lake Trout on Harbercraft boat
const PHOTO_SUNSET_ROD = "/images/IMG_6658.webp";      // Fishing rod silhouette against golden sunset
const PHOTO_PIKE_WOMAN = "/images/IMG_1738.webp";      // Woman holding large Northern Pike (boreal lake, evening)

/* ---- Whitetail Trophy Photos ---- */
const DEER_TROPHIES = [
  "/images/deer-trophy-1.webp",
  "/images/deer-trophy-2.webp",
  "/images/deer-trophy-3.webp",
  "/images/deer-trophy-4.webp",
  "/images/deer-trophy-5.webp",
  "/images/deer-trophy-6.webp",
  "/images/deer-trophy-7.webp",
  "/images/deer-trophy-8.webp",
  "/images/deer-trophy-9.webp",
];

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

/* ---- Animated Counter ---- */
function Counter({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal(0.5);
  const numTarget = typeof target === "number" ? target : parseInt(target as string);

  useEffect(() => {
    if (!visible || isNaN(numTarget)) return;
    if (typeof target === "string" && isNaN(numTarget)) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, numTarget, target]);

  return (
    <span ref={ref}>
      {typeof target === "string" && isNaN(numTarget) ? target : count}{suffix}
    </span>
  );
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
      >
        ‹
      </button>
      <img
        src={images[index].src}
        alt={images[index].alt}
        className="max-h-[90vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl font-thin z-10 p-4"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        ›
      </button>
      <button
        className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl font-thin"
        onClick={onClose}
      >
        ✕
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-ui text-xs text-white/40">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}

const galleryImages = [
  { src: PHOTO_PIKE_PONTOON,    alt: "Northern Pike — Trophy Catch" },
  { src: PHOTO_PIKE_WOMAN,      alt: "Northern Pike — Evening Catch" },
  { src: PHOTO_TROUT_MAN,       alt: "Lake Trout — Open Water" },
  { src: PHOTO_TROUT_WOMAN,     alt: "Lake Trout — Big Sky" },
  { src: PHOTO_TROUT_HARBERCRAFT, alt: "Lake Trout — On the Boat" },
];

const trophyImages = DEER_TROPHIES.map((src, i) => ({ src, alt: `Trophy Whitetail ${i + 1}` }));

export default function Home() {
  const [lightbox, setLightbox] = useState<{ images: { src: string; alt: string }[]; index: number } | null>(null);
  const setLightboxIndex = (index: number) => setLightbox({ images: galleryImages, index });
  const setTrophyLightboxIndex = (index: number) => setLightbox({ images: trophyImages, index });
  const heroRef = useRef<HTMLElement>(null);

  const about = useReveal();
  const statsRow = useReveal(0.3);
  const whitetailSection = useReveal(0.1);
  const trophyWallSection = useReveal(0.05);
  const bearSection = useReveal(0.1);
  const fishingSection = useReveal(0.1);
  const gallerySection = useReveal(0.1);
  const costiganSection = useReveal(0.1);
  const contactSection = useReveal(0.1);

  return (
    <div style={{ background: "var(--canvas)" }}>
      <Navigation theme="amber" />

      {/* ===== HERO ===== */}
      <section ref={heroRef} className="hero-section">
        <div
          className="hero-bg loaded"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="hero-vignette" />

        {/* Content — left-aligned, bottom of screen */}
        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Logo burns in */}
            <div className="animate-fade-in mb-6" style={{ animationDelay: "0.2s", opacity: 0 }}>
              <div
                className="inline-flex items-center gap-3 px-4 py-2"
                style={{ borderLeft: "3px solid var(--ember)" }}
              >
                <div>
                  <div
                    className="font-display tracking-widest"
                    style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", color: "var(--bone)", lineHeight: 1 }}
                  >
                    MANN LAKE
                  </div>
                  <div
                    className="font-display tracking-widest"
                    style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", color: "var(--ember)", lineHeight: 1 }}
                  >
                    OUTFITTERS
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

            {/* Overline */}
            <div className="animate-fade-up mb-3" style={{ animationDelay: "0.5s", opacity: 0 }}>
              <span className="overline">Saskatchewan, Canada · Est. 2019</span>
            </div>

            {/* Massive headline */}
            <div className="animate-fade-up" style={{ animationDelay: "0.7s", opacity: 0 }}>
              <h1
                className="font-display leading-none mb-2"
                style={{
                  fontSize: "clamp(4rem, 12vw, 10rem)",
                  color: "var(--bone)",
                  lineHeight: 0.9,
                }}
              >
                YOUR
              </h1>
              <h1
                className="font-display leading-none mb-6"
                style={{
                  fontSize: "clamp(4rem, 12vw, 10rem)",
                  color: "var(--ember)",
                  lineHeight: 0.9,
                }}
              >
                DREAM HUNT
              </h1>
            </div>

            {/* Subtext */}
            <div className="animate-fade-up mb-8" style={{ animationDelay: "1s", opacity: 0 }}>
              <p
                className="font-body text-lg md:text-xl italic"
                style={{ color: "var(--bone-dim)", maxWidth: "500px" }}
              >
                Trophy whitetail deer, black bear, and world-class fishing in the heart of Saskatchewan.
              </p>
            </div>

            {/* CTAs */}
            <div
              className="animate-fade-up flex flex-wrap gap-4"
              style={{ animationDelay: "1.2s", opacity: 0 }}
            >
              <a href="#whitetail" className="btn-ember" onClick={(e) => {
                e.preventDefault();
                document.getElementById("whitetail")?.scrollIntoView({ behavior: "smooth" });
              }}>
                <span>Explore Hunts</span>
                <span style={{ color: "var(--canvas)" }}>→</span>
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="font-ui text-xs" style={{ color: "var(--bone-dim)", opacity: 0.5 }}>Scroll</span>
          <div className="animate-scroll-bounce w-px h-8" style={{ background: "var(--ember)" }} />
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section style={{ background: "var(--canvas-2)" }} ref={about.ref}>
        <div className="container py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             {/* Left — photo: Mann Lake Outfitters wooden sign */}
            <div className={`reveal-left ${about.visible ? "visible" : ""}`}>
              <div className="relative">
                <div
                  className="photo-hover"
                  style={{ aspectRatio: "1/1", background: "var(--bone)" }}
                >
                  <img
                    src={PHOTO_SIGN}
                    alt="Mann Lake Outfitters Logo"
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                {/* Ember accent box */}
                <div
                  className="absolute -bottom-6 -right-6 w-32 h-32 hidden md:flex flex-col items-center justify-center"
                  style={{ background: "var(--ember)" }}
                >
                  <span className="font-display text-4xl" style={{ color: "var(--canvas)", lineHeight: 1 }}>
                    2019
                  </span>
                  <span className="font-ui text-xs" style={{ color: "var(--canvas)", opacity: 0.7 }}>
                    Est.
                  </span>
                </div>
              </div>
            </div>

            {/* Right — text */}
            <div className={`reveal-right ${about.visible ? "visible" : ""}`}>
              <span className="overline">Our Story</span>
              <h2
                className="font-display mb-6"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  color: "var(--bone)",
                  lineHeight: 0.95,
                }}
              >
                BORN FROM THE<br />
                <span style={{ color: "var(--ember)" }}>SASKATCHEWAN</span><br />
                WILD
              </h2>
              <p className="font-body text-base leading-relaxed mb-6" style={{ color: "var(--bone-dim)" }}>
                If you are looking to hunt trophy Saskatchewan whitetail deer, let Mann Lake Outfitters guide you to your dream deer. Located in east central Saskatchewan bordering the southern fringe of the Porcupine Provincial Forest, our main camp is situated 10 miles west of Endeavour — on the farm I grew up on and am so fortunate to still call home.
              </p>
              <p className="font-body text-base leading-relaxed mb-10" style={{ color: "var(--bone-dim)" }}>
                For the outdoorsman who wants a little more adventure, there is an outpost cabin — a seven-mile quad or snowmobile ride through the tall timbers into the heart of our hunting territory. Our territory is second to none for whitetail deer, along with many other species including moose, elk, bear, wolves, lynx, and countless birds.
              </p>

              {/* Pull quote */}
              <blockquote
                className="font-body text-xl italic mb-10 pl-6"
                style={{
                  color: "var(--bone)",
                  borderLeft: "2px solid var(--ember)",
                }}
              >
                "Our territory is second to none for trophy whitetail deer."
              </blockquote>
            </div>
          </div>

          {/* Stats row */}
          <div
            ref={statsRow.ref}
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 reveal ${statsRow.visible ? "visible" : ""}`}
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { value: 2019, suffix: "", label: "Established" },
              { value: 100, suffix: "%", label: "Saskatchewan Wild" },
              { value: 7, suffix: "mi", label: "Outpost Cabin Ride" },
              { value: 12, suffix: "+", label: "Wildlife Species" },
            ].map((stat, i) => (
              <div key={i} className="stat-block">
                <div
                  className="font-display mb-1"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--ember)", lineHeight: 1 }}
                >
                  <Counter target={stat.value as number} suffix={stat.suffix} />
                </div>
                <div className="font-ui text-xs" style={{ color: "var(--bone-dim)", opacity: 0.6 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHITETAIL DEER PANEL ===== */}
      <section id="whitetail" className="species-panel" ref={whitetailSection.ref}>
        <div
          className="species-panel-bg"
          style={{ backgroundImage: `url(${WHITETAIL_BG})`, backgroundPosition: "center 30%" }}
        />
        <div className="species-panel-overlay" />
        <div className="container relative z-10">
          <div className={`max-w-xl reveal-left ${whitetailSection.visible ? "visible" : ""}`}>
            <span className="overline">Season Opens Oct 1st</span>
            <h2
              className="font-display mb-4"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)", color: "var(--bone)", lineHeight: 0.9 }}
            >
              WHITE-<br />TAIL<br />
              <span style={{ color: "var(--ember)" }}>DEER</span>
            </h2>
            <span className="ember-line" />
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: "var(--bone-dim)" }}>
              Trophy Saskatchewan whitetail in second-to-none territory. Archery and Muzzleloader open October 1st through 31st, Rifle from November 1st through December 7th. Our territory produces consistently impressive bucks year after year.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { season: "Archery", dates: "Oct 1 – 31" },
                { season: "Muzzleloader", dates: "Oct 1 – 31" },
                { season: "Rifle", dates: "Nov 1 – Dec 7" },
              ].map((s, i) => (
                <div key={i} className="stat-block py-2">
                  <div className="font-ui text-xs mb-1" style={{ color: "var(--ember)" }}>{s.season}</div>
                  <div className="font-body text-sm" style={{ color: "var(--bone-dim)" }}>{s.dates}</div>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-ember" onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}>
              <span>Book a Deer Hunt</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== WHITETAIL TROPHY WALL ===== */}
      <section style={{ background: "var(--canvas)" }} ref={trophyWallSection.ref}>
        <div className={`text-center pt-24 pb-12 reveal ${trophyWallSection.visible ? "visible" : ""}`}>
          <span className="overline">Recent Hunts</span>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--bone)", lineHeight: 0.95 }}
          >
            TROPHY <span style={{ color: "var(--ember)" }}>WALL</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: "2px", background: "var(--canvas)" }}>
          {DEER_TROPHIES.map((src, i) => (
            <div
              key={i}
              className={`reveal delay-${(i % 3) * 100 + 100} ${trophyWallSection.visible ? "visible" : ""}`}
              style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", cursor: "pointer" }}
              onClick={() => setTrophyLightboxIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setTrophyLightboxIndex(i)}
            >
              <img
                src={src}
                alt={`Trophy whitetail ${i + 1}`}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                className="amenity-tile-img"
                loading="lazy"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(13,13,11,0) 50%, rgba(13,13,11,0.4) 100%)" }} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== BLACK BEAR PANEL ===== */}
      <section id="bear" className="species-panel" ref={bearSection.ref}>
        <div
          className="species-panel-bg"
          style={{ backgroundImage: `url(${BEAR_BG})`, backgroundPosition: "center 20%" }}
        />
        {/* Right-side overlay for right-aligned text */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(255deg, rgba(13,13,11,0.92) 0%, rgba(13,13,11,0.75) 45%, rgba(13,13,11,0.1) 100%)",
          }}
        />
        <div className="container relative z-10 flex justify-end">
          <div className={`max-w-xl reveal-right ${bearSection.visible ? "visible" : ""}`}>
            <span className="overline">Spring & Fall Seasons</span>
            <h2
              className="font-display mb-4"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)", color: "var(--bone)", lineHeight: 0.9 }}
            >
              BLACK<br />
              <span style={{ color: "var(--ember)" }}>BEAR</span>
            </h2>
            <span className="ember-line" />
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: "var(--bone-dim)" }}>
              Big bruins in virgin boreal forest. Combination hunts available. Our territory produces consistently impressive black and cinnamon phase bears. Spring and fall seasons both available — contact us for current availability.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Season", value: "Spring & Fall" },
                { label: "Method", value: "Rifle & Bow" },
              ].map((s, i) => (
                <div key={i} className="stat-block py-2">
                  <div className="font-ui text-xs mb-1" style={{ color: "var(--ember)" }}>{s.label}</div>
                  <div className="font-body text-sm" style={{ color: "var(--bone-dim)" }}>{s.value}</div>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-ember" onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}>
              <span>Book a Bear Hunt</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FISHING PANEL ===== */}
      <section id="fishing" className="species-panel" ref={fishingSection.ref}>
        <div
          className="species-panel-bg"
          style={{ backgroundImage: `url(${FISHING_BG})`, backgroundPosition: "center 60%" }}
        />
        <div className="species-panel-overlay" />
        <div className="container relative z-10">
          <div className={`max-w-xl reveal-left ${fishingSection.visible ? "visible" : ""}`}>
            <span className="overline">Spring · Summer · Fall</span>
            <h2
              className="font-display mb-4"
              style={{ fontSize: "clamp(4rem, 10vw, 9rem)", color: "var(--bone)", lineHeight: 0.9 }}
            >
              WORLD-<br />CLASS<br />
              <span style={{ color: "var(--ember)" }}>FISHING</span>
            </h2>
            <span className="ember-line" />
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: "var(--bone-dim)" }}>
              Northern Pike and Lake Trout in pristine Saskatchewan waters. Partner with Costigan Lake Lodge for a world-class fishing experience on hundreds of kilometres of untouched shoreline.
            </p>
            <a href="/costigan-lake" className="btn-ember">
              <span>Discover Costigan Lake Lodge</span>
              <span style={{ color: "var(--canvas)" }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="gallery" style={{ background: "var(--canvas-2)" }} ref={gallerySection.ref}>
        <div className="container pt-24 pb-8">
          <div className={`reveal ${gallerySection.visible ? "visible" : ""}`}>
            <span className="overline">In the Field</span>
            <h2
              className="font-display mb-2"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--bone)", lineHeight: 0.95 }}
            >
              TROPHY MOMENTS
            </h2>
            <p className="font-ui text-xs mb-12" style={{ color: "var(--bone-dim)", opacity: 0.5 }}>
              Click any photo to view full screen
            </p>
          </div>
        </div>

        {/* Masonry-style grid */}
        <div className="px-0 pb-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`photo-hover relative ${i === 0 || i === 5 ? "row-span-2" : ""}`}
                style={{
                  aspectRatio: i === 0 || i === 5 ? "3/4" : "4/3",
                  cursor: "pointer",
                }}
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setLightboxIndex(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: "linear-gradient(to top, rgba(13,13,11,0.8) 0%, transparent 60%)" }}
                >
                  <span className="font-ui text-xs" style={{ color: "var(--bone-dim)" }}>{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COSTIGAN LAKE CTA ===== */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}
        ref={costiganSection.ref}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${COSTIGAN_HERO})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(6,14,24,0.95) 0%, rgba(6,14,24,0.7) 60%, rgba(6,14,24,0.2) 100%)" }}
        />
        <div className="container relative z-10">
          <div className={`max-w-2xl reveal-left ${costiganSection.visible ? "visible" : ""}`}>
            <span className="overline" style={{ color: "#4a9aba" }}>Our Partner Lodge</span>
            <h2
              className="font-display mb-4"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "var(--bone)", lineHeight: 0.9 }}
            >
              COSTIGAN<br />
              <span style={{ color: "#4a9aba" }}>LAKE LODGE</span>
            </h2>
            <span className="block w-16 h-px mb-6" style={{ background: "#4a9aba" }} />
            <p className="font-body text-base leading-relaxed mb-8" style={{ color: "var(--bone-dim)" }}>
              Saskatchewan, Canada. Hundreds of kilometres of pristine shoreline, crystal-clear water, and the big Saskatchewan sky. World-class Northern Pike and Lake Trout fishing awaits.
            </p>
            <a href="/costigan-lake" className="btn-ember" style={{ background: "#4a9aba", borderColor: "#4a9aba" }}>
              <span>Discover Costigan Lake Lodge</span>
              <span style={{ color: "var(--canvas)" }}>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" style={{ background: "var(--canvas-3)" }} ref={contactSection.ref}>
        <div className="container py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div className={`reveal-left ${contactSection.visible ? "visible" : ""}`}>
              <span className="overline">Get In Touch</span>
              <h2
                className="font-display mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--bone)", lineHeight: 0.95 }}
              >
                BOOK YOUR<br />
                <span style={{ color: "var(--ember)" }}>ADVENTURE</span>
              </h2>
              <p className="font-body text-base leading-relaxed mb-10" style={{ color: "var(--bone-dim)" }}>
                Ready to experience the Saskatchewan wilderness? Reach out to Evan Steppan to discuss availability and packages.
              </p>

              <div className="flex flex-col gap-6">
                <div className="stat-block">
                  <div className="font-ui text-xs mb-1" style={{ color: "var(--ember)" }}>Guide</div>
                  <div className="font-body text-lg" style={{ color: "var(--bone)" }}>Evan Steppan</div>
                </div>
                <div className="stat-block">
                  <div className="font-ui text-xs mb-1" style={{ color: "var(--ember)" }}>Phone</div>
                  <a href="tel:3065471220" className="font-display text-3xl" style={{ color: "var(--bone)" }}>
                    (306) 547-1220
                  </a>
                </div>
                <div className="stat-block">
                  <div className="font-ui text-xs mb-1" style={{ color: "var(--ember)" }}>Location</div>
                  <div className="font-body text-base" style={{ color: "var(--bone-dim)" }}>
                    10 miles west of Endeavour<br />
                    East Central Saskatchewan
                  </div>
                </div>
              </div>
            </div>

            {/* Right — What to Expect */}
            <div className={`reveal-right ${contactSection.visible ? "visible" : ""} delay-200`}>
              <span className="overline">What to Expect</span>
              <div className="flex flex-col gap-0">
                {[
                  "Arrive Sunday, hunt through Friday",
                  "Home-cooked meals at main camp",
                  "Outpost cabin option — 7-mile ride into prime territory",
                  "Guided whitetail, bear, and combination hunts",
                  "Fishing packages available through Costigan Lake Lodge",
                  "Clients met at camp with great hospitality",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 py-5"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span className="font-display text-lg mt-0.5" style={{ color: "var(--ember)", minWidth: "24px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-body text-base" style={{ color: "var(--bone-dim)" }}>{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <a href="tel:3065471220" className="btn-ember">
                  <span>Call to Book</span>
                  <span style={{ color: "var(--canvas)" }}>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer theme="amber" />

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox((s) => s ? { ...s, index: Math.max(0, s.index - 1) } : null)}
          onNext={() => setLightbox((s) => s ? { ...s, index: Math.min(s.images.length - 1, s.index + 1) } : null)}
        />
      )}
    </div>
  );
}
