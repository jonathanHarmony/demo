import React from "react";
import { Coins } from "lucide-react";

export default function CreditBalance({ available = 250, total = 300, showProgress = false }) {
  const percentage = (available / total) * 100;
  
  return (
    <div className="inline-flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Coins className="w-3.5 h-3.5 text-teal-600" />
        <div className="text-xs font-medium text-slate-900">
          <span className="text-teal-600">{available}</span>
          {total && <span className="text-slate-500"> / {total}</span>}
        </div>
      </div>
      
      {showProgress && (
        <div className="w-32 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-teal-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}