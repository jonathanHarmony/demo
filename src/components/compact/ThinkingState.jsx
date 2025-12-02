import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function ThinkingState() {
  const [status, setStatus] = useState(0);
  
  const statuses = [
    "Gathering data",
    "Analyzing sources",
    "Cross-referencing",
    "Synthesizing insights"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) => (prev + 1) % statuses.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-8">
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="w-6 h-6 text-slate-400 animate-spin mb-3" />
        <div className="text-sm text-slate-600">{statuses[status]}</div>
      </div>
    </div>
  );
}