import { useEffect, useRef, useState } from "react";

const INDEX_ITEMS = [
  { id: "about",      label: "About"      },
  { id: "contact",    label: "Contact"    },
  { id: "projects",   label: "Projects"   },
  { id: "experience", label: "Experience" },
  { id: "skills",     label: "Skills"     },
  { id: "github",     label: "GitHub"     },
];

export function SideIndex() {
  const [activeSection, setActiveSection] = useState<string>("");
  // Track which sections are currently intersecting so we can pick the best one
  const intersectingRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Pick whichever intersecting section is closest to (but still below) the
    // top edge of the detection band — i.e. highest on screen = most relevant.
    const pickActive = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingRef.current.add(entry.target.id);
        } else {
          intersectingRef.current.delete(entry.target.id);
        }
      });

      const visible = [...intersectingRef.current];
      if (visible.length === 0) return;

      // Among visible sections, pick the one whose element top is closest to 0
      // (i.e. the one that entered the detection window from the top first)
      let best = visible[0];
      let bestTop = document.getElementById(visible[0])?.getBoundingClientRect().top ?? 0;

      for (const id of visible.slice(1)) {
        const top = document.getElementById(id)?.getBoundingClientRect().top ?? 0;
        // Prefer sections closer to the top of the viewport (lowest positive top)
        if (Math.abs(top) < Math.abs(bestTop)) {
          best = id;
          bestTop = top;
        }
      }

      setActiveSection(best);
    };

    // Detection band: fires when a section enters the strip between 20% and
    // 70% from the top of the viewport — narrow enough to catch short sections,
    // wide enough not to miss tall ones during fast scrolling.
    const observer = new IntersectionObserver(pickActive, {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    });

    INDEX_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Bottom-of-page fallback via scroll — fires only at absolute document end
    const handleScroll = () => {
      const atBottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;
      if (atBottom) {
        setActiveSection(INDEX_ITEMS[INDEX_ITEMS.length - 1].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <aside className="fixed top-[26vh] left-[calc(50%+410px)] pointer-events-auto hidden xl:flex flex-col gap-3.5 z-30">
      <h3 className="font-mono text-[10px] font-bold tracking-[0.2em] text-[var(--soft)] uppercase mb-1">
        INDEX
      </h3>
      {INDEX_ITEMS.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={`/#${item.id}`}
            className={`group flex items-center gap-2.5 font-mono text-[12px] font-medium tracking-[0.05em] transition-all duration-300 ${
              isActive
                ? "text-[var(--fg)] font-semibold"
                : "text-[var(--soft)] hover:text-[var(--muted)]"
            }`}
          >
            <span
              className={`h-[1px] bg-current transition-all duration-300 ${
                isActive ? "w-4" : "w-0 group-hover:w-2"
              }`}
            />
            {item.label}
          </a>
        );
      })}
    </aside>
  );
}
