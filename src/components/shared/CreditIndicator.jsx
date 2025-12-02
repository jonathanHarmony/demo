import React from "react";
import { Coins } from "lucide-react";

export default function CreditIndicator({ cost = 2, showLabel = false, size = "sm" }) {
  const sizeClasses = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4"
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 bg-teal-50 border border-teal-200 rounded ${sizeClasses[size]}`}>
      <Coins className={`${iconSizes[size]} text-teal-600`} />
      <span className="font-medium text-teal-900">
        {cost} {showLabel ? (cost === 1 ? 'credit' : 'credits') : ''}
      </span>
    </div>
  );
}