import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { ExternalLink } from "lucide-react";

export function Experience() {
  if (!site.experience.length) return null;

  return (
    <div id="experience">
      <SectionHeader title="Experience" />
      <Shell>
        {site.experience.map((job, i) => (
          <motion.div
            key={`${job.company}-${i}`}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className={`px-6 py-6 sm:px-8 ${i > 0 ? "border-t border-[var(--line)]" : ""}`}
          >
            {/* Header row */}
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[15.5px] font-semibold text-[var(--fg)] flex items-center gap-2">
                {job.role}
                <span className="text-[var(--soft)]">·</span>
                <span className="text-[var(--muted)]">{job.company}</span>
                {job.url && <ExternalLink size={14} className="text-[var(--soft)]" />}
              </h3>
              <span className="font-mono text-[11px] text-[var(--soft)]">{job.period}</span>
            </div>

            {/* Overview blurb */}
            <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--muted)]">{job.blurb}</p>

            {/* Journey phases timeline */}
            {job.phases && job.phases.length > 0 && (
              <div className="mt-5 space-y-0">
                {job.phases.map((phase, pi) => (
                  <motion.div
                    key={pi}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.1 + pi * 0.07 }}
                    className="relative flex gap-4"
                  >
                    {/* Timeline spine */}
                    <div className="flex flex-col items-center">
                      <span className="mt-[5px] h-2 w-2 rounded-full bg-zinc-500 flex-none shrink-0 ring-2 ring-zinc-500/20" />
                      {pi < job.phases!.length - 1 && (
                        <span className="mt-1 w-px flex-1 bg-[var(--line)]" />
                      )}
                    </div>

                    {/* Phase content */}
                    <div className={`pb-5 ${pi === job.phases!.length - 1 ? "pb-0" : ""}`}>
                      <p className="text-[13px] font-semibold text-[var(--muted)] leading-snug">
                        {phase.label}
                      </p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--muted)]">
                        {phase.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Impact metric matrix */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 rounded-lg border border-[var(--line)] bg-[var(--chip)]/60 p-3 text-center divide-x divide-[var(--line)]">
              <div>
                <p className="font-bold text-[15px] text-[var(--fg)]">5+</p>
                <p className="font-mono text-[9px] uppercase text-[var(--soft)] mt-0.5">Projects Shipped</p>
              </div>
              <div>
                <p className="font-bold text-[15px] text-[var(--fg)]">4</p>
                <p className="font-mono text-[9px] uppercase text-[var(--soft)] mt-0.5">Journey Phases</p>
              </div>
              <div>
                <p className="font-bold text-[15px] text-[var(--fg)]">AI+Web</p>
                <p className="font-mono text-[9px] uppercase text-[var(--soft)] mt-0.5">Stack Focus</p>
              </div>
              <div>
                <p className="font-bold text-[15px] text-[var(--fg)]">500+</p>
                <p className="font-mono text-[9px] uppercase text-[var(--soft)] mt-0.5">GitHub Commits</p>
              </div>
            </div>
          </motion.div>
        ))}
      </Shell>
    </div>
  );
}
