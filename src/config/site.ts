export type Project = {
  title: string;
  blurb: string;
  story?: string;
  stack: string[];
  year: string;
  links: { live?: string; source?: string };
  featured?: boolean;
  status?: string;
  image?: string;
  categories?: ("Frontend" | "Backend" | "Fullstack")[];
};

export type JobPhase = {
  label: string;
  description: string;
};

export type Job = {
  company: string;
  role: string;
  period: string;
  blurb: string;
  url?: string;
  phases?: JobPhase[];
};

export type Post = {
  title: string;
  summary: string;
  date: string;
  url: string;
  readingTime?: string;
};

export const site = {
  name: "Animesh Thakur",
  firstName: "Animesh",
  url: "https://animeshthakur.dev",
  quote: {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  profileImages: [
    "/profile1.jpg",
    "/profile4.png",
  ],
  bannerImage: "/images/mac-spoilers-steve-jobs-norman-seeff-01.jpg",
  socialBannerImage: "/social-banner.png",
  initials: "AT",
  role: "Full Stack Developer",
  location: "Jabalpur, India",
  timezone: "Asia/Kolkata",
  email: "hello.animeshh@gmail.com",
  greeting: "Hey, I'm Animesh",
  tagline: "I build polished, high-performance digital products combining full-stack engineering with AI to ship things that actually matter.",
  pronunciation: "/an · i · mesh/",
  roles: [
    "Founder",
    "Full-Stack Developer",
    "AI Engineer",
    "Creative Builder",
    "Open Source Contributor",
    "Problem Solver",
  ],
  about: [
    "I build polished, high-performance digital products combining full-stack engineering with AI to ship things that actually matter.",
    "Currently deep in the intersection of generative AI and modern web architecture — building platforms, automating workflows, and learning by shipping.",
    "Open to collaborating on ambitious ideas.",
  ],
  tldr: [
    "Building products.",
    "Shipping consistently.",
    "AI × Web Architecture.",
    "Open to collaboration.",
  ],
  status: {
    available: true,
    availableText: "available for freelance & open to full-time",
    nowLearning: "Generative AI • System Design • DevOps",
    nowBuilding: "AI-powered platforms",
    nowListening: "focus playlists",
  },
  socials: {
    github: "https://github.com/animatrix01",
    twitter: "https://x.com/animatrix01",
    linkedin: "https://linkedin.com/in/thakuranimesh",
    email: "mailto:hello.animeshh@gmail.com",
    threads: "https://www.threads.com/@thakuranimeshh",
    resume: "",
  },
  experience: [
    {
      company: "Independent Builder",
      role: "AI Engineer & Full-Stack Developer",
      period: "2026 – Present",
      blurb:
        "A continuous journey of mastering modern web architecture and generative AI, moving from foundational full-stack development to architecting intelligent, scalable systems.",
      url: "",
      phases: [
        {
          label: "The Foundation (Locking In)",
          description:
            "Dedicated a focused two-month lock-in to master the modern web ecosystem: Node.js, Express, PostgreSQL for backends; React and Tailwind CSS for UIs.",
        },
        {
          label: "Architecting the Stack",
          description:
            "Scaled to production-grade tools: Next.js 15, Drizzle ORM, and Clerk for auth — building optimized full-stack dashboards and applications.",
        },
        {
          label: "AI Internals & Automation",
          description:
            "Deep diving into LLM core architecture (studying model building from scratch) and intelligent workflow orchestration using AI agents and n8n.",
        },
        {
          label: "Shipping Real-World Systems",
          description:
            "Building platforms like NextCareer AI and FraudLens. Collaborating to integrate polished frontends with complex Python-based AI backends.",
        },
      ],
    },
  ] as Job[],
  projects: [
    {
      title: "NextCareer AI",
      blurb:
        "An AI-powered career platform that lets users build professional resumes and generate personalized career roadmaps using the latest AI models.",
      stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Drizzle ORM", "Neon Postgres", "Clerk", "Upstash", "Gemini AI", "Shadcn UI", "Vercel"],
      year: "2025",
      links: {
        live: "https://nextcareer-ai-one.vercel.app/",
        source: "https://github.com/animatrix01",
      },
      featured: true,
      image: "/projects/3.gif",
      categories: ["Fullstack"],
    },
    {
      title: "FraudLens",
      blurb:
        "A real-time AI-powered fraud detection platform that analyzes messages, UPI IDs, QR codes, screenshots, and live phone calls to protect Indian users from scams — delivering instant verdicts with plain-language explanations and SMS alerts.",
      stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Drizzle ORM", "Supabase", "pgvector", "Gemini 2.5 Flash", "Groq", "Deepgram", "Twilio", "Vercel"],
      year: "2026",
      links: {
        live: "https://fraudlens-seven.vercel.app/",
        source: "https://github.com/animatrix01",
      },
      featured: true,
      image: "/projects/1.gif",
      categories: ["Fullstack", "Backend"],
    },
    {
      title: "ClaimKaro",
      blurb:
        "Bilingual AI welfare navigator that helps low-income Indian families discover government schemes, fix paperwork errors, and track applications — privately on-device.",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Gemini AI", "Firebase", "Vercel"],
      year: "2026",
      links: {
        live: "https://claim-karo.vercel.app/",
        source: "https://github.com/animatrix01/ClaimKaro",
      },
      featured: false,
    },
  ] as Project[],
  skills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Flask",
    "Tailwind CSS",
    "Shadcn UI",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Drizzle ORM",
    "MySQL",
    "Supabase",
    "Firebase",
    "REST APIs",
    "JWT",
    "FastAPI",
    "Figma",
    "C++",
    "Python",
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
    "Docker",
    "Kubernetes",
    "Vercel",
    "AWS",
  ],
  writing: [] as Post[],
  github: {
    username: "animatrix01",
    contributionsLastYear: "500+",
  },
  footerNote: "Built with ❤️ and hardwork"
} as const;

export type Site = typeof site;
