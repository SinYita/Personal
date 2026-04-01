"use client";

import { useEffect, useState } from "react";

function formatBerlinTime(date: Date) {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return `🇩🇪 ${time}`;
}

export default function UtcClock() {
  const [utcLabel, setUtcLabel] = useState(() => formatBerlinTime(new Date()));

  useEffect(() => {
    const tick = () => setUtcLabel(formatBerlinTime(new Date()));
    tick();
    const timer = window.setInterval(tick, 30 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="text-sm font-medium px-3 py-2 rounded-full text-[var(--muted)] border border-[var(--border)]">
      {utcLabel}
    </div>
  );
}
