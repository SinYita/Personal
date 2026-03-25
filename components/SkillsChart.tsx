"use client";
import ChartWrapper from "./ChartWrapper";

const techData = {
  labels: ["TypeScript/JS", "Python", "React/Next.js", "CSS/Tailwind", "数据库", "DevOps"],
  datasets: [
    {
      label: "熟练程度",
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
      label: "项目提交数",
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
          技术技能熟练度（%）
        </p>
        <ChartWrapper type="bar" data={techData} title="技术栈熟练度" />
      </div>
      <div>
        <p className="text-sm mb-2" style={{ color: "var(--muted)" }}>
          项目活跃度趋势
        </p>
        <ChartWrapper type="line" data={activityData} title="提交活跃度" />
      </div>
    </div>
  );
}
