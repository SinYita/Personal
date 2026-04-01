"use client";

import { useEffect, useState } from "react";

function formatUtcTime(date: Date) {
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");
  return `UTC ${hh}:${mm}`;
}

export default function UtcClock() {
  const [utcLabel, setUtcLabel] = useState(() => formatUtcTime(new Date()));

  useEffect(() => {
    const tick = () => setUtcLabel(formatUtcTime(new Date()));
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
