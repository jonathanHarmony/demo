import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { FileText, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function RecentResearchFeed({ briefs, isLoading }) {
  if (isLoading) {
    return (
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">Recent Research</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!briefs || briefs.length === 0) {
    return (
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">Recent Research</h2>
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600">No research briefs yet. Start your first brief to see it here.</p>
          </div>
        </div>
      </section>
    );
  }

  const statusColors = {
    ready: { bg: "bg-green-100", text: "text-green-700", label: "Ready" },
    processing: { bg: "bg-blue-100", text: "text-blue-700", label: "Processing" },
    draft: { bg: "bg-slate-100", text: "text-slate-700", label: "Draft" },
  };

  return (
    <section className="px-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">Recent Research</h2>
          <TrendingUp className="w-5 h-5 text-teal-500" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {briefs.slice(0, 6).map((brief, index) => {
            const status = statusColors[brief.status] || statusColors.draft;
            
            return (
              <motion.div
                key={brief.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: [0.2, 0.6, 0.2, 1],
                }}
              >
                <Link to={`${createPageUrl("QuickBrief")}?id=${brief.id}`}>
                  <div className="glass-card rounded-2xl p-6 hover-glow transition-all duration-280 h-full group cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className={`${status.bg} ${status.text} border-0`}>
                        {status.label}
                      </Badge>
                      {brief.confidence_score && (
                        <span className="text-sm font-medium text-slate-600">
                          {brief.confidence_score}%
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors duration-220">
                      {brief.question}
                    </h3>

                    {brief.summary && (
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {brief.summary}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>{format(new Date(brief.created_date), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}