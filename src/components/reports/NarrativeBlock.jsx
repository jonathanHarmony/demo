import React from "react";
import { Lightbulb, HelpCircle, ArrowRight } from "lucide-react";

const modeConfig = {
  descriptive: {
    label: "What",
    icon: HelpCircle,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200"
  },
  interpretive: {
    label: "So What",
    icon: Lightbulb,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200"
  },
  actionable: {
    label: "Now What",
    icon: ArrowRight,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200"
  }
};

export default function NarrativeBlock({ narrative, mode = "descriptive" }) {
  if (!narrative) return null;

  // Handle if narrative is an object with multiple modes
  if (typeof narrative === 'object' && !Array.isArray(narrative)) {
    return (
      <div className="space-y-3 mt-4">
        {Object.entries(narrative).map(([key, text]) => {
          const config = modeConfig[key] || modeConfig.descriptive;
          const Icon = config.icon;
          
          return (
            <div 
              key={key}
              className={`p-3 rounded-lg border ${config.bg} ${config.border}`}
            >
              <div className={`flex items-center gap-2 text-xs font-medium ${config.color} mb-1`}>
                <Icon className="w-3.5 h-3.5" />
                {config.label}
              </div>
              <p className="text-sm text-slate-700">{text}</p>
            </div>
          );
        })}
      </div>
    );
  }

  // Single narrative string
  const config = modeConfig[mode] || modeConfig.descriptive;
  const Icon = config.icon;

  return (
    <div className={`p-3 rounded-lg border ${config.bg} ${config.border} mt-4`}>
      <div className={`flex items-center gap-2 text-xs font-medium ${config.color} mb-1`}>
        <Icon className="w-3.5 h-3.5" />
        {config.label}
      </div>
      <p className="text-sm text-slate-700">{narrative}</p>
    </div>
  );
}