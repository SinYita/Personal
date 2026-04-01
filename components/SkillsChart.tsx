"use client";
import ChartWrapper from "./ChartWrapper";

const techData = {
  labels: ["TypeScript/JS", "Python", "React/Next.js", "CSS/Tailwind", "Databases", "DevOps"],
  datasets: [
    {
      label: "Proficiency",
      data: [90, 80, 88, 75, 65, 60],
      backgroundColor: [
        "rgba(99, 102, 241, 0.7)",
        "rgba(129, 140, 248, 0.7)",
        "rgba(165, 180, 252, 0.7)",
        "rgba(196, 181, 253, 0.7)",
        "rgba(216, 180, 254, 0.7)",
        "rgba(233, 213, 255, 0.7)",
      ],
      borderColor: "rgba(99, 102, 241, 1)",
      borderWidth: 1,
    },
  ],
};

const activityData = {
  labels: ["2023 Q1", "2023 Q2", "2023 Q3", "2023 Q4", "2024 Q1"],
  datasets: [
    {
      label: "Project Commits",
      data: [12, 28, 45, 38, 52],
      borderColor: "rgba(99, 102, 241, 1)",
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};

export default function SkillsChart() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <p className="text-sm mb-2" style={{ color: "var(--muted)" }}>
          Technical Proficiency (%)
        </p>
        <ChartWrapper type="bar" data={techData} title="Technology Proficiency" />
      </div>
      <div>
        <p className="text-sm mb-2" style={{ color: "var(--muted)" }}>
          Development Activity Trend
        </p>
        <ChartWrapper type="line" data={activityData} title="Commit Activity" />
      </div>
    </div>
  );
}
