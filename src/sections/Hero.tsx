import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell } from "@/components/Layout";
import { site } from "@/config/site";
import { MapPin, Search, Star, RotateCw } from "lucide-react";

const HEADLINE_TITLES = [
  "Full Stack Developer",
  "Backend Engineer",
  "Open Source Contributor",
  "AI Developer",
];

const GITHUB_REPO_URL = "https://github.com/animatrix01/hello";

export function Hero({ onOpenPalette }: { onOpenPalette?: () => void }) {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  const handleNextImage = () => {
    const nextIndex = (imgIndex + 1) % site.profileImages.length;
    setImgIndex(nextIndex);
    window.dispatchEvent(new CustomEvent("profileImageChanged", { detail: nextIndex }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % HEADLINE_TITLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Cover Banner */}
      <Shell className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="relative h-36 overflow-hidden rounded-xl bg-neutral-950 sm:h-44 border border-[var(--line)]">
          <img
            src={site.bannerImage}
            alt="Steve Jobs at desk"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-[center_20%] opacity-65 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/40 to-transparent" />
          <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_5px)]" />
          <div className="absolute inset-0 [background-image:repeating-linear-gradient(90deg,rgba(0,0,0,0.12)_0,rgba(0,0,0,0.12)_1px,transparent_1px,transparent_28px)] opacity-30" />
        </div>
      </Shell>

      {/* Profile Avatar & Identity */}
      <Shell className="px-6 py-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-6 justify-between"
        >
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-5">
            <div 
              onClick={handleNextImage}
              className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--chip)] shadow-md group cursor-pointer select-none animate-fade-up"
              title="Click to change profile image"
            >
              {/* Main Avatar Image */}
              <img
                src={site.profileImages[imgIndex]}
                alt={site.name}
                loading="eager"
                decoding="async"
                className={`w-full h-full pointer-events-none ${
                  imgIndex === 0
                    ? "object-cover object-bottom scale-105 -translate-y-2"
                    : "object-cover object-center"
                }`}
              />

              {/* CRT scanline overlay */}
              <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden opacity-[0.18] group-hover:opacity-30 transition-opacity bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]">
                <div className="absolute inset-0 h-1 bg-white/20 blur-[1px] animate-scanline" />
              </div>

              {/* Switch image button — top-right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute top-1 right-1 rounded-full border border-[var(--line)] bg-[var(--chip)] p-1 text-[var(--muted)] transition-all hover:text-[var(--fg)] hover:scale-110 opacity-0 group-hover:opacity-100 z-20 cursor-pointer shadow-sm"
                aria-label="Switch profile image"
              >
                <RotateCw size={10} strokeWidth={2} />
              </button>

            </div>
            <div>
              <h1 className="font-serif text-3xl sm:text-[38px] leading-none tracking-tight text-[var(--fg)] text-glitch">
                {site.name}
              </h1>
              <div className="h-[20px] overflow-hidden mt-1">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={headlineIndex}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="font-mono text-[13px] text-[var(--muted)]"
                  >
                    {HEADLINE_TITLES[headlineIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 font-mono text-[11px] text-[var(--soft)]">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="shrink-0" /> {site.location}
                </span>
              </p>
            </div>
          </div>

          {/* Action buttons — Star + Command Palette */}
          {onOpenPalette && (
            <div className="flex items-center gap-2">
              {/* Star on GitHub — bare icon with custom tooltip */}
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group text-[var(--muted)] hover:text-[var(--fg)] transition-colors cursor-pointer"
              >
                <Star size={16} />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-neutral-800 text-neutral-200 text-xs rounded opacity-0 transition-opacity duration-150 group-hover:opacity-100 pointer-events-none z-50">
                  star this portfolio
                </span>
              </a>

              {/* Command Palette */}
              <button
                onClick={onOpenPalette}
                className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--chip)] px-3 py-1.5 font-mono text-[11px] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--soft)] transition-colors shadow-sm cursor-pointer"
                title="Open Command Palette (Ctrl+K)"
              >
                <Search size={14} />
                <span>⌘K</span>
              </button>
            </div>
          )}
        </motion.div>
      </Shell>
    </>
  );
}
