import React from "react";
import { Rocket, Target, TrendingUp, User } from "lucide-react";

export default function StrategicActionsTable({ actions = [] }) {
  // Sample data if no actions provided
  const sampleActions = [
    {
      id: 1,
      action: "Launch simplified refill starter kit in North America",
      category: "Product Development",
      confidence: 88,
      impact: "High",
      owner: "Product Team",
      kpi: "+15% trial rate"
    },
    {
      id: 2,
      action: "Shift messaging from 'eco-benefit' to 'effortless reuse'",
      category: "Marketing",
      confidence: 92,
      impact: "Medium",
      owner: "Brand Team",
      kpi: "+20% message recall"
    },
    {
      id: 3,
      action: "Test in-store demos to reduce perceived complexity",
      category: "Retail Experience",
      confidence: 85,
      impact: "High",
      owner: "Retail Ops",
      kpi: "+25% conversion"
    },
    {
      id: 4,
      action: "Establish partnerships to increase refill station density by 30%",
      category: "Distribution",
      confidence: 78,
      impact: "High",
      owner: "Partnerships",
      kpi: "+30% accessibility"
    }
  ];

  const displayActions = actions.length > 0 ? actions : sampleActions;

  const getImpactColor = (impact) => {
    switch (impact?.toLowerCase()) {
      case 'high':
        return 'text-green-700 bg-green-50';
      case 'medium':
        return 'text-yellow-700 bg-yellow-50';
      case 'low':
        return 'text-slate-700 bg-slate-50';
      default:
        return 'text-slate-700 bg-slate-50';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-5">
        <Rocket className="w-4 h-4 text-slate-600" />
        <div className="text-sm font-semibold text-slate-900">Strategic Actions Summary</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-3 font-medium text-slate-600 uppercase tracking-wider">
                Action
              </th>
              <th className="text-left py-3 px-3 font-medium text-slate-600 uppercase tracking-wider">
                Category
              </th>
              <th className="text-center py-3 px-3 font-medium text-slate-600 uppercase tracking-wider">
                Confidence
              </th>
              <th className="text-center py-3 px-3 font-medium text-slate-600 uppercase tracking-wider">
                Impact
              </th>
              <th className="text-left py-3 px-3 font-medium text-slate-600 uppercase tracking-wider">
                Expected Outcome
              </th>
              <th className="text-left py-3 px-3 font-medium text-slate-600 uppercase tracking-wider">
                Owner
              </th>
            </tr>
          </thead>
          <tbody>
            {displayActions.map((action, index) => (
              <tr key={action.id || index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-4 px-3">
                  <div className="text-sm text-slate-900 leading-relaxed max-w-md">
                    {action.action}
                  </div>
                </td>
                <td className="py-4 px-3">
                  <div className="flex items-center gap-1.5">
                    <Target className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-700">{action.category}</span>
                  </div>
                </td>
                <td className="py-4 px-3 text-center">
                  <div className="inline-flex items-center gap-1">
                    <div className="w-12 bg-slate-100 rounded-full h-1.5">
                      <div 
                        className="bg-slate-900 h-1.5 rounded-full"
                        style={{ width: `${action.confidence}%` }}
                      />
                    </div>
                    <span className="text-slate-900 font-medium">{action.confidence}%</span>
                  </div>
                </td>
                <td className="py-4 px-3 text-center">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getImpactColor(action.impact)}`}>
                    {action.impact}
                  </span>
                </td>
                <td className="py-4 px-3">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-700">{action.kpi}</span>
                  </div>
                </td>
                <td className="py-4 px-3">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-700">{action.owner}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-600 leading-relaxed">
          These recommendations are prioritized by potential impact and confidence level. 
          Export this table to track implementation status and assign ownership.
        </div>
      </div>
    </div>
  );
}