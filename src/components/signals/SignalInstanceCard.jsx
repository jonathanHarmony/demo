import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { format } from "date-fns";

export default function SignalInstanceCard({ instance, onClick, index, selected }) {
  const getTrendIcon = () => {
    const sentiment = instance.sentiment_direction?.toLowerCase();
    if (sentiment?.includes('positive') || sentiment?.includes('up')) {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    }
    if (sentiment?.includes('negative') || sentiment?.includes('down')) {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return <AlertCircle className="w-4 h-4 text-amber-600" />;
  };

  const getMetricBadge = () => {
    if (instance.mention_volume_change) {
      return (
        <div className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
          {instance.mention_volume_change}
        </div>
      );
    }
    if (instance.confidence) {
      return (
        <div className="text-xs font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
          {instance.confidence}% confidence
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.03 }}
      className={`bg-white border rounded-lg hover:shadow-sm cursor-pointer transition-all ${
        selected 
          ? 'border-slate-300 shadow-sm' 
          : instance.read 
            ? 'border-slate-200' 
            : 'border-slate-300'
      }`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start gap-3 flex-1">
            <div className={`mt-0.5 ${instance.read ? 'opacity-40' : ''}`}>
              {getTrendIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`text-sm font-medium mb-1 ${instance.read ? 'text-slate-600' : 'text-slate-900'}`}>
                {instance.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1">{instance.summary}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-3">
            {getMetricBadge()}
            {!instance.read && (
              <div className="w-2 h-2 rounded-full bg-teal-500" />
            )}
          </div>
        </div>

        {instance.highlights?.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="text-xs text-slate-700">
              {instance.highlights[0]}
            </div>
            {instance.highlights.length > 1 && (
              <div className="text-xs text-slate-400 mt-1">
                +{instance.highlights.length - 1} more insight{instance.highlights.length > 2 ? 's' : ''}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
          <div>{format(new Date(instance.created_date), 'MMM d, h:mm a')}</div>
        </div>
      </div>
    </motion.div>
  );
}