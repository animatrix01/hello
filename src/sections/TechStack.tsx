import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { Icon } from "@iconify/react";

const CATEGORY_ICONS: Record<string, string> = {
  All: "lucide:layers",
  Languages: "lucide:code-2",
  Backend: "lucide:server",
  Frontend: "lucide:layout",
  Databases: "lucide:database",
  "AI / ML": "lucide:sparkles",
  DevOps: "lucide:container",
};

const SKILL_ICONS: Record<string, string> = {
  // Languages
  TypeScript: "logos:typescript-icon",
  JavaScript: "logos:javascript",
  Python: "logos:python",
  "C++": "logos:c-plusplus",
  // Frontend
  React: "logos:react",
  "Next.js": "logos:nextjs-icon",
  "Tailwind CSS": "logos:tailwindcss-icon",
  "Shadcn UI": "simple-icons:shadcnui",
  Figma: "logos:figma",
  // Backend
  "Node.js": "logos:nodejs-icon",
  "Express.js": "logos:express",
  "REST APIs": "lucide:cpu",
  JWT: "logos:jwt-icon",
  FastAPI: "logos:fastapi",
  Flask: "simple-icons:flask",
  // Databases
  PostgreSQL: "logos:postgresql",
  MongoDB: "logos:mongodb-icon",
  Prisma: "logos:prisma",
  "Drizzle ORM": "simple-icons:drizzle",
  MySQL: "logos:mysql-icon",
  Supabase: "logos:supabase-icon",
  Firebase: "logos:firebase",
  // AI / ML
  LangChain: "simple-icons:langchain",
  LangGraph: "lucide:workflow",
  RAG: "lucide:brain-circuit",
  Pinecone: "simple-icons:pinecone",
  Qdrant: "simple-icons:qdrant",
  "Scikit-Learn": "simple-icons:scikitlearn",
  Pydantic: "simple-icons:pydantic",
  Seaborn: "lucide:bar-chart-2",
  "Hugging Face": "simple-icons:huggingface",
  "Vector Embeddings": "lucide:waypoints",
  Groq: "simple-icons:groq",
  n8n: "simple-icons:n8n",
  LLMs: "lucide:brain",
  // DevOps
  Docker: "logos:docker-icon",
  Kubernetes: "logos:kubernetes",
  Vercel: "logos:vercel-icon",
  AWS: "logos:aws",
};

// Brand colors for icons — only applied in default (non-hover) state
const SKILL_ICON_COLORS: Record<string, string> = {
  Flask: "#E2E8F0",              // light gray — Flask has no official color
  "Drizzle ORM": "#C5F74F",      // Drizzle official lime
  MySQL: "#4479A1",              // MySQL official blue
  LangChain: "#2D9A6C",        // LangChain green
  LangGraph: "#7C3AED",        // purple — no official brand, distinct
  RAG: "#60A5FA",              // blue-400 — conceptual
  Pinecone: "#0FD47D",         // Pinecone brand green
  Qdrant: "#E2055C",           // Qdrant official pink-red
  "Scikit-Learn": "#F7931E",   // Scikit-learn official orange
  Pydantic: "#E92063",         // Pydantic official red
  Seaborn: "#4C72B0",          // Seaborn matplotlib blue
  "Hugging Face": "#FFD21E",   // Hugging Face official yellow
  "Vector Embeddings": "#818CF8", // indigo-400
  Groq: "#F55036",              // Groq official orange-red
  n8n: "#EA4B71",               // n8n official pink
  LLMs: "#A78BFA",              // violet — conceptual
  Docker: "#2496ED",            // Docker official blue
  Kubernetes: "#326CE5",        // Kubernetes official blue
  Vercel: "#E4E4E4",            // light gray — Vercel is black/white
  AWS: "#FF9900",               // AWS official orange
};

const skillCategories: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python", "C++"],
  Frontend: ["React", "Next.js", "Tailwind CSS", "Shadcn UI", "Figma"],
  Backend: ["Node.js", "Express.js", "REST APIs", "JWT", "FastAPI", "Flask"],
  Databases: ["PostgreSQL", "MongoDB", "Prisma", "Drizzle ORM", "MySQL", "Supabase", "Firebase"],
  "AI / ML": [
    "LangChain",
    "LangGraph",
    "RAG",
    "Pinecone",
    "Qdrant",
    "Scikit-Learn",
    "Pydantic",
    "Seaborn",
    "Hugging Face",
    "Vector Embeddings",
    "Groq",
    "n8n",
    "LLMs",
  ],
  "DevOps": ["Docker", "Kubernetes", "Vercel", "AWS"],
};

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  if (!site.skills.length) return null;

  const categories = [
    "All",
    "Languages",
    "Frontend",
    "Backend",
    "Databases",
    "AI / ML",
    "DevOps",
  ];

  const filteredSkills =
    activeCategory === "All"
      ? site.skills
      : site.skills.filter((skill) =>
          skillCategories[activeCategory]?.includes(skill)
        );

  return (
    <div id="skills">
      <SectionHeader
        title="Tech Stack"
        aside={
          <span className="hidden font-mono text-[10px] tracking-wider text-[var(--soft)] sm:inline">
            ( select tab to filter )
          </span>
        }
      />
      {/* Category Tabs — flush under the header, no gap */}
      <div className="border-b border-[var(--line)]">
        <Shell className="px-3 py-1.5 sm:px-4">
          <div className="flex w-full flex-wrap gap-1 rounded-lg border border-[var(--line)] bg-[var(--chip)] p-1 sm:flex-nowrap sm:justify-stretch">
            {categories.map((cat) => {
              const iconName = CATEGORY_ICONS[cat] || "lucide:layers";
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`flex shrink-0 items-center justify-center gap-1 rounded-md px-3 py-1.5 text-center text-[12px] whitespace-nowrap font-medium transition-all duration-200 cursor-pointer sm:flex-1 ${
                    isActive
                      ? "bg-[var(--fg)] text-[var(--bg)] shadow-sm font-semibold"
                      : "text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]"
                  }`}
                >
                  <Icon icon={iconName} width={12} height={12} className="size-3 shrink-0" />
                  {cat}
                </button>
              );
            })}
          </div>
        </Shell>
      </div>

      <Shell className="px-6 py-6 sm:px-8">
        {/* Skill Badges Grid */}
        <motion.div layout className="flex flex-wrap gap-2.5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const iconName = SKILL_ICONS[skill] || "lucide:code-2";
              const brandColor = SKILL_ICON_COLORS[skill];
              return (
                <motion.span
                  key={skill}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  className="group flex cursor-default items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 font-mono text-[12px] text-[var(--muted)] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                >
                  {/* Wrapper swaps colored icon for a white one on hover */}
                  <span className="relative size-4 shrink-0">
                    {/* Default: brand color icon */}
                    <Icon
                      icon={iconName}
                      width={16}
                      height={16}
                      className="absolute inset-0 transition-all duration-300 grayscale brightness-150 group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-0"
                      style={brandColor ? { color: brandColor } : undefined}
                    />
                    {/* Hover: inherit color from parent (var(--bg) = white/light) */}
                    <Icon
                      icon={iconName}
                      width={16}
                      height={16}
                      className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                    />
                  </span>
                  {skill}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Shell>
    </div>
  );
}

export default TechStack;
