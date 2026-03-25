"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Line, Doughnut, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export type ChartType = "bar" | "line" | "doughnut" | "radar";

interface ChartWrapperProps {
  type: ChartType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
  title?: string;
}

export default function ChartWrapper({ type, data, options = {}, title }: ChartWrapperProps) {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: title ? { display: true, text: title } : undefined,
    },
    ...options,
  };

  return (
    <div
      className="rounded-xl p-4 my-4"
      style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
    >
      {type === "bar" && <Bar data={data} options={defaultOptions} />}
      {type === "line" && <Line data={data} options={defaultOptions} />}
      {type === "doughnut" && <Doughnut data={data} options={defaultOptions} />}
      {type === "radar" && <Radar data={data} options={defaultOptions} />}
    </div>
  );
}
