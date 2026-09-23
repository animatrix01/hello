import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Project } from "@/config/site";
import { Globe, ChevronDown, ChevronUp } from "lucide-react";
import { GitHubIcon } from "@/components/icons";


export function ProjectCard({ project: p }: { project: Project; index?: number }) {
  const [showDetails, setShowDetails] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group flex flex-col justify-between rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--soft)] hover:shadow-md h-full">
      <div>
        {/* Full-cover image preview */}
        <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--chip)]">
          {p.image && !imgError ? (
            <img
              src={p.image}
              alt={`${p.title} preview`}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-serif text-2xl text-[var(--fg)] opacity-60">
              {p.title}
            </div>
          )}

          {/* Viewfinder reticles on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 font-mono text-[9px] text-white">
            <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-white/70" />
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-white/70" />
            <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-white/70" />
            <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-white/70" />
            <div className="absolute top-2.5 left-7 flex items-center gap-1 text-[8px] font-semibold text-white/80">
              <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" /> REC
            </div>
            <div className="absolute top-2.5 right-7 text-[8px] text-white/80 font-semibold">
              ISO 400
            </div>
          </div>
        </div>

        {/* Project Header Info */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[16px] font-semibold tracking-wide text-[var(--fg)] group-hover:text-[var(--fg)]">
            {p.title}
          </h3>
          <span className="font-mono text-xs text-[var(--soft)]">{p.year}</span>
        </div>

        <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)] line-clamp-4">
          {p.blurb}
        </p>

        {/* Collapsible Details Drawer */}
        {p.story && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 font-mono text-[10px] text-[var(--soft)] hover:text-[var(--fg)] cursor-pointer outline-none"
            >
              {showDetails ? "Hide engineering details" : "Show engineering details"}
              {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            <AnimatePresence initial={false}>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-2.5 rounded-lg border border-[var(--line)]/50 bg-[var(--chip)]/60 p-3 font-sans text-[12px] leading-relaxed text-[var(--muted)] border-l-2 border-l-[var(--soft)] space-y-1.5">
                    {p.story.split("\n\n").map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Tech Pills & Direct Links */}
      <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-[var(--line)]/50">
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((t) => (
            <span
              key={t}
              className="rounded bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)] border border-[var(--line)]/30"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2.5 text-[var(--soft)]">
          {p.links.live && (
            <a
              href={p.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} live site`}
              className="transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--fg)]"
            >
              <Globe className="size-4" />
            </a>
          )}
          {p.links.source && (
            <a
              href={p.links.source}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} repository`}
              className="transition-all duration-200 hover:-translate-y-0.5 hover:text-[var(--fg)]"
            >
              <GitHubIcon className="size-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
