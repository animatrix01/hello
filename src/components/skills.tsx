import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Database, Cpu, Network, BrainCircuit } from "lucide-react";
import { Reveal, SectionHeader } from "./reveal";

type Category = "Frontend" | "Backend" | "Databases" | "AI / ML" | "DevOps & Cloud";

interface Skill {
  name: string;
  category: Category;
  icon: React.ReactNode;
}

const iconClass = "w-4 h-4 shrink-0";

const SKILLS: Skill[] = [
  // ── Frontend ──────────────────────────────────────────────────────────────
  { name: "TypeScript",    category: "Frontend",        icon: <Icon icon="logos:typescript-icon" className={iconClass} /> },
  { name: "JavaScript",   category: "Frontend",        icon: <Icon icon="logos:javascript" className={iconClass} /> },
  { name: "React",        category: "Frontend",        icon: <Icon icon="logos:react" className={iconClass} /> },
  { name: "Next.js",      category: "Frontend",        icon: <Icon icon="logos:nextjs-icon" className={iconClass} style={{ filter: "invert(1)" }} /> },
  { name: "Tailwind CSS", category: "Frontend",        icon: <Icon icon="logos:tailwindcss-icon" className={iconClass} /> },
  { name: "Shadcn UI",    category: "Frontend",        icon: <Icon icon="simple-icons:shadcnui" className={`${iconClass} text-white`} /> },
  { name: "Figma",        category: "Frontend",        icon: <Icon icon="logos:figma" className={iconClass} /> },

  // ── Backend ───────────────────────────────────────────────────────────────
  { name: "Node.js",      category: "Backend",         icon: <Icon icon="logos:nodejs-icon" className={iconClass} /> },
  { name: "Express.js",   category: "Backend",         icon: <Icon icon="simple-icons:express" className={`${iconClass} text-white`} /> },
  { name: "Flask",        category: "Backend",         icon: <Icon icon="simple-icons:flask" className={`${iconClass} text-white`} /> },
  { name: "FastAPI",      category: "Backend",         icon: <Icon icon="simple-icons:fastapi" className={iconClass} style={{ color: "#009688" }} /> },
  { name: "REST APIs",    category: "Backend",         icon: <Icon icon="mdi:api" className={`${iconClass} text-neutral-300`} /> },
  { name: "Python",       category: "Backend",         icon: <Icon icon="logos:python" className={iconClass} /> },
  { name: "C++",          category: "Backend",         icon: <Icon icon="logos:c-plusplus" className={iconClass} /> },
  { name: "JWT",          category: "Backend",         icon: <Icon icon="simple-icons:jsonwebtokens" className={iconClass} style={{ color: "#d63aff" }} /> },

  // ── Databases ─────────────────────────────────────────────────────────────
  { name: "PostgreSQL",   category: "Databases",       icon: <Icon icon="logos:postgresql" className={iconClass} /> },
  { name: "MongoDB",      category: "Databases",       icon: <Icon icon="logos:mongodb-icon" className={iconClass} /> },
  { name: "MySQL",        category: "Databases",       icon: <Icon icon="logos:mysql-icon" className={iconClass} /> },
  { name: "Prisma",       category: "Databases",       icon: <Icon icon="simple-icons:prisma" className={`${iconClass} text-white`} /> },
  { name: "Drizzle ORM",  category: "Databases",       icon: <Database className={`${iconClass} text-neutral-300`} /> },
  { name: "Supabase",     category: "Databases",       icon: <Icon icon="logos:supabase-icon" className={iconClass} /> },
  { name: "Firebase",     category: "Databases",       icon: <Icon icon="logos:firebase" className={iconClass} /> },
  { name: "Pinecone",     category: "Databases",       icon: <Icon icon="simple-icons:pinecone" className={`${iconClass} text-emerald-400`} /> },
  { name: "Qdrant",       category: "Databases",       icon: <Icon icon="simple-icons:qdrant" className={iconClass} style={{ color: "#dc244c" }} /> },

  // ── AI / ML ───────────────────────────────────────────────────────────────
  { name: "LangChain",        category: "AI / ML",     icon: <Icon icon="simple-icons:langchain" className={`${iconClass} text-emerald-400`} /> },
  { name: "LangGraph",        category: "AI / ML",     icon: <BrainCircuit className={`${iconClass} text-neutral-300`} /> },
  { name: "RAG",              category: "AI / ML",     icon: <Icon icon="mdi:brain" className={`${iconClass} text-violet-400`} /> },
  { name: "Hugging Face",     category: "AI / ML",     icon: <Icon icon="simple-icons:huggingface" className={iconClass} style={{ color: "#ffd21e" }} /> },
  { name: "Scikit-Learn",     category: "AI / ML",     icon: <Icon icon="simple-icons:scikitlearn" className={iconClass} style={{ color: "#f7931e" }} /> },
  { name: "Pydantic",         category: "AI / ML",     icon: <Icon icon="simple-icons:pydantic" className={iconClass} style={{ color: "#e92063" }} /> },
  { name: "Seaborn",          category: "AI / ML",     icon: <Icon icon="mdi:chart-line" className={`${iconClass} text-blue-400`} /> },
  { name: "Vector Embeddings",category: "AI / ML",     icon: <Network className={`${iconClass} text-neutral-300`} /> },
  { name: "Groq",             category: "AI / ML",     icon: <Icon icon="simple-icons:groq" className={`${iconClass} text-orange-400`} /> },
  { name: "n8n",              category: "AI / ML",     icon: <Icon icon="simple-icons:n8n" className={iconClass} style={{ color: "#ea4b71" }} /> },
  { name: "LLMs",             category: "AI / ML",     icon: <Cpu className={`${iconClass} text-neutral-300`} /> },

  // ── DevOps & Cloud ────────────────────────────────────────────────────────
  { name: "Docker",       category: "DevOps & Cloud",  icon: <Icon icon="logos:docker-icon" className={iconClass} /> },
  { name: "Kubernetes",   category: "DevOps & Cloud",  icon: <Icon icon="logos:kubernetes" className={iconClass} /> },
  { name: "Vercel",       category: "DevOps & Cloud",  icon: <Icon icon="simple-icons:vercel" className={`${iconClass} text-white`} /> },
  { name: "AWS",          category: "DevOps & Cloud",  icon: <Icon icon="logos:aws" className={iconClass} /> },
  { name: "Git",          category: "DevOps & Cloud",  icon: <Icon icon="logos:git-icon" className={iconClass} /> },
  { name: "GitHub",       category: "DevOps & Cloud",  icon: <Icon icon="simple-icons:github" className={`${iconClass} text-white`} /> },
  { name: "Postman",      category: "DevOps & Cloud",  icon: <Icon icon="logos:postman-icon" className={iconClass} /> },
];

const CATEGORIES: ("All" | Category)[] = [
  "All",
  "Frontend",
  "Backend",
  "Databases",
  "AI / ML",
  "DevOps & Cloud",
];

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<"All" | Category>("All");

  if (!SKILLS.length) return null;

  const filteredSkills =
    activeCategory === "All"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <SectionHeader id="skills" index="04" title="Skills & Technologies" />

      {/* Category Tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg border px-3.5 py-1.5 font-mono text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "border-white bg-white text-neutral-950 font-bold shadow-md"
                  : "border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="font-mono text-[10px] text-neutral-500 select-none">
          ( click category to filter )
        </span>
      </div>

      <Reveal>
        <div className="flex flex-wrap gap-3">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 cursor-default rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-2 font-mono text-xs text-neutral-200 transition-all hover:-translate-y-0.5 hover:border-neutral-600 hover:text-white hover:bg-neutral-800/80 shadow-sm"
              >
                {skill.icon}
                {skill.name}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
