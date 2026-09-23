import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { ProjectCard } from "./ProjectCard";
import { Search, X, ChevronRight, Globe } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

export function Projects({ isSearchable = false }: { isSearchable?: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [projectTab, setProjectTab] = useState<string>("All");

  const filteredProjects = isSearchable
    ? site.projects.filter((p) => {
        if (projectTab === "Frontend" && !p.categories?.includes("Frontend")) return false;
        if (projectTab === "Backend" && !p.categories?.includes("Backend")) return false;
        if (projectTab === "Fullstack" && !p.categories?.includes("Fullstack")) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return (
            p.title.toLowerCase().includes(q) ||
            p.blurb.toLowerCase().includes(q) ||
            p.stack.some((t) => t.toLowerCase().includes(q))
          );
        }
        return true;
      })
    : site.projects.filter((p) => p.featured !== false);

  const modalProjects = site.projects.filter((p) => p.featured === false);

  return (
    <div id="projects">
      <SectionHeader
        title="Projects"
        aside={
          !isSearchable ? (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--chip)] px-3 py-1.5 font-mono text-[11px] text-[var(--muted)] cursor-pointer transition-all duration-300 hover:border-[var(--soft)] hover:text-[var(--fg)] shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]"
            >
              View All Projects
              <ChevronRight className="size-3.5" />
            </button>
          ) : undefined
        }
      />

      <Shell className="px-6 py-6 sm:px-8">
        {/* Search + filter bar — /projects page only */}
        {isSearchable && (
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--line)] pb-5">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--soft)]" />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[var(--line)] bg-[var(--chip)] py-2 pl-9 pr-4 text-[12.5px] text-[var(--fg)] placeholder-[var(--soft)] outline-none transition-all focus:border-[var(--soft)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--soft)] hover:text-[var(--fg)] cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
            <div className="flex gap-1 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-0.5">
              {["All", "Frontend", "Backend", "Fullstack"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setProjectTab(tab)}
                  className={`flex items-center justify-center rounded-md px-2.5 py-1 text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                    projectTab === tab
                      ? "bg-[var(--fg)] text-[var(--bg)] shadow-sm font-semibold"
                      : "text-[var(--muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Project cards grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, idx) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut", delay: idx * 0.05 }}
              >
                <ProjectCard project={p} index={idx} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-12 text-center text-[var(--muted)] text-[13.5px] font-mono">
            No projects match your current filter.
          </div>
        )}
      </Shell>

      {/* ── All Projects Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Card */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
            >
              <div className="relative bg-[var(--bg)] border border-[var(--line)] rounded-2xl max-w-[760px] w-full h-[85vh] p-8 flex flex-col overflow-y-auto hide-scrollbar shadow-2xl pointer-events-auto">

                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 grid size-8 place-items-center rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--soft)] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="size-4" />
                </button>

                {/* Content — compact list, no cover images */}
                <div className="flex flex-1 flex-col gap-4 pt-2">
                  <div>
                    <p className="text-[var(--fg)] text-xl font-medium text-left">
                      All Projects
                    </p>
                    <p className="font-mono text-[11px] text-[var(--soft)] mt-1 text-left">
                      {modalProjects.length} more beyond the featured work
                    </p>
                  </div>

                  {modalProjects.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center text-center gap-5">
                      <p className="text-[var(--fg)] text-2xl font-medium">
                        Cooking more projects...
                      </p>
                      <p className="font-mono text-[12px] text-[var(--soft)] max-w-sm">
                        More ambitious things are in the works. Check back soon.
                      </p>
                      <div className="flex items-center gap-2">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="size-1.5 rounded-full bg-[var(--soft)]"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 overflow-y-auto hide-scrollbar">
                      {modalProjects.map((p) => (
                        <div
                          key={p.title}
                          className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 text-left transition-colors hover:border-[var(--soft)]"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-[16px] font-semibold tracking-wide text-[var(--fg)]">
                              {p.title}
                            </h3>
                            <span className="font-mono text-xs text-[var(--soft)] shrink-0">{p.year}</span>
                          </div>
                          <p className="mt-2 text-[13px] leading-relaxed text-[var(--muted)]">
                            {p.blurb}
                          </p>
                          <div className="mt-3 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-3">
                            <div className="flex flex-wrap gap-1.5">
                              {p.stack.slice(0, 6).map((t) => (
                                <span
                                  key={t}
                                  className="rounded bg-[var(--chip)] px-2 py-0.5 font-mono text-[10.5px] text-[var(--muted)] border border-[var(--line)]"
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
                                  className="transition-colors hover:text-[var(--fg)]"
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
                                  className="transition-colors hover:text-[var(--fg)]"
                                >
                                  <GitHubIcon className="size-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
