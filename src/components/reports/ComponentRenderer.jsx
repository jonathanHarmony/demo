import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, LabelList } from "recharts";
import { ArrowRight, TrendingUp, TrendingDown, Minus, Info } from "lucide-react";

const COLORS = ['#6366F1', '#EC4899', '#14B8A6', '#F59E0B', '#8B5CF6', '#EF4444'];

export default function ComponentRenderer({ component }) {
  if (!component || !component.result) return null;

  const { title, visualization, result, width } = component;
  const type = visualization?.type || 'text';
  const data = result.visualization_data?.items || [];
  const content = result.visualization_data?.content;
  const narrative = result.narrative;

  const renderVisualization = () => {
    switch (type) {
      case 'horizontal_bar':
        return (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  width={110}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#F1F5F9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  <LabelList dataKey="value" position="right" fill="#64748B" fontSize={11} fontWeight={500} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case 'bar':
        return (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: '#F1F5F9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case 'line':
        return (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366F1"
                  strokeWidth={4}
                  dot={{ r: 6, fill: '#6366F1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      case 'pie':
        return (
          <div className="h-64 w-full flex flex-col items-center justify-center">
            <div className="h-full w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                    cornerRadius={6}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-[-20px] pb-2">
              {data.map((entry, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs font-medium text-slate-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'headline':
        return (
          <div className="py-6">
            <h3 className="text-4xl font-bold text-slate-900">{result.visualization_data || title}</h3>
          </div>
        );
      case 'text':
        const quote = result.visualization_data?.quote;
        return (
          <div className="flex flex-col h-full">
            <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed">
              {content.split('\n').map((line, i) => {
                if (!line.trim()) return <div key={i} className="h-3" />;

                // Handle bullet points
                if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                  return (
                    <div key={i} className="flex gap-2 mb-1 ml-2">
                      <span className="text-slate-400">•</span>
                      <span>
                        {line.replace(/^[•-]\s*/, '').split(/(\*\*.*?\*\*)/g).map((part, j) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        })}
                      </span>
                    </div>
                  );
                }

                return (
                  <p key={i} className="mb-3 last:mb-0">
                    {line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                  </p>
                );
              })}
            </div>

            {quote && (
              <div className="mt-auto pt-6">
                <div className="relative pl-5 border-l-2 border-teal-500/30">
                  <p className="text-sm font-medium italic text-slate-700 leading-relaxed">
                    "{quote}"
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return <div className="text-sm text-slate-400 italic">Unsupported visualization type: {type}</div>;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {type !== 'headline' && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        </div>
      )}

      <div className="flex-1 min-h-0">
        {renderVisualization()}
      </div>

      {narrative && type !== 'headline' && type !== 'text' && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-600 leading-relaxed">{narrative}</p>
          </div>
        </div>
      )}
    </div>
  );
}