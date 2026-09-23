import { useState } from "react";
import { GitHubCalendar, type Activity, type Year } from "react-github-calendar";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { ExternalLink } from "lucide-react";

const username = site.github.username;
const profileUrl = `https://github.com/${username}`;

const calendarTheme = {
  dark: ["#262626", "#404040", "#595959", "#7a7a7a", "#a3a3a3"],
};

const currentYear = new Date().getFullYear();
const years: Year[] = [currentYear, currentYear - 1, currentYear - 2];

export function GithubActivity() {
  const [year, setYear] = useState<Year>(currentYear);
  const [total, setTotal] = useState<number | null>(null);

  // Called by transformData — runs every time the calendar data loads/changes
  const handleTransform = (data: Activity[]): Activity[] => {
    const sum = data.reduce((acc, day) => acc + (day.count ?? 0), 0);
    setTotal(sum);
    return data;
  };

  return (
    <div id="github">
      <SectionHeader
        title="GitHub Activity"
        aside={
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          >
            <span>@{username}</span>
            <ExternalLink size={12} />
          </a>
        }
      />
      <Shell className="px-6 py-6 sm:px-8">
        <div className="onyx-scroll overflow-x-auto pb-2">

          {/* Year selector */}
          <div className="mb-3 flex justify-end gap-1.5">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => { setYear(y); setTotal(null); }}
                className={`cursor-pointer rounded-md border px-3 py-1 font-mono text-[11px] transition-colors ${
                  year === y
                    ? "border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)]"
                    : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--soft)] hover:text-[var(--fg)]"
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          {/* Hide the library's own totalCount paragraph, show ours instead */}
          <div>
            <GitHubCalendar
              username={username}
              year={year}
              colorScheme="dark"
              theme={calendarTheme}
              transformData={handleTransform}
              showTotalCount={false}
              blockSize={11}
              blockMargin={3}
              blockRadius={2}
              fontSize={11}
              style={{
                fontFamily: "var(--font-mono, monospace)",
                color: "var(--soft)",
              }}
            />
          </div>

          {/* Single clean footer row */}
          <div className="mt-2.5 flex items-center justify-between">
            <p className="font-mono text-[11px] text-[var(--muted)]">
              {total === null
                ? "Loading contributions..."
                : `${total.toLocaleString()} contributions in ${year}`}
            </p>
          </div>

        </div>
      </Shell>
    </div>
  );
}

export default GithubActivity;
