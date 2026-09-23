import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { MusicPlayer } from "@/components/music-player";

export function About() {
  return (
    <div id="about">
      <SectionHeader title="About" />
      <Shell className="px-6 py-7 sm:px-8 space-y-6">

        {/* Bio paragraphs */}
        <div className="space-y-3">
          {site.about.map((para, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-2 text-[14.5px] leading-relaxed text-[var(--muted)]"
            >
              <span className="text-[var(--soft)] font-mono mt-0.5">•</span>
              <p>{para}</p>
            </motion.div>
          ))}
        </div>

        {/* Music player */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <MusicPlayer />
        </motion.div>

      </Shell>
    </div>
  );
}
