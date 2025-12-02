import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, RefreshCw, MessageSquare, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";
import ComponentRenderer from "./ComponentRenderer";
import ReportQA from "./ReportQA";

export default function ReportViewer({ template, execution, onRefresh }) {
  const [showGlobalQA, setShowGlobalQA] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState(execution?.results || []);

  const executeTemplate = async () => {
    if (!template?.components?.length) return;
    
    setIsExecuting(true);
    const newResults = [];

    for (const component of template.components) {
      try {
        const result = await generateComponentData(component, template.global_filters);
        newResults.push({
          component_id: component.id,
          ...result,
          cached_at: new Date().toISOString()
        });
      } catch (error) {
        newResults.push({
          component_id: component.id,
          error: error.message
        });
      }
    }

    setResults(newResults);
    setIsExecuting(false);
    
    if (onRefresh) {
      onRefresh(newResults);
    }
  };

  const generateComponentData = async (component, globalFilters) => {
    const response = await base44.integrations.Core.InvokeLLM({
      prompt: `Generate realistic sample data for a report component.

Component: ${component.title}
Data Source: ${component.data_source}
Visualization: ${component.visualization?.type || 'bar'}
Query: ${JSON.stringify(component.data_query || {})}
Filters: ${JSON.stringify({ ...globalFilters, ...component.filters })}

Generate:
1. Visualization data appropriate for the chart type (array of objects with name/value or x/y)
2. If narrative enabled (${component.narrative?.enabled}), generate text in ${component.narrative?.mode || 'descriptive'} mode

Make data realistic for FMCG/CPG industry context.`,
      response_json_schema: {
        type: "object",
        properties: {
          visualization_data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                value: { type: "number" }
              }
            }
          },
          narrative: { type: "string" },
          data: { type: "object" }
        }
      }
    });

    return response;
  };

  useEffect(() => {
    if (template && (!results || results.length === 0)) {
      executeTemplate();
    }
  }, [template?.id]);

  const getComponentResult = (componentId) => {
    return results.find(r => r.component_id === componentId);
  };

  if (!template) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-sm text-slate-500">No template selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{template.name}</h1>
          {template.description && (
            <p className="text-sm text-slate-500 mt-1">{template.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowGlobalQA(!showGlobalQA)}
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Ask
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={executeTemplate}
            disabled={isExecuting}
          >
            {isExecuting ? (
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-1" />
            )}
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Global Filters */}
      {template.global_filters && (
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
          <Filter className="w-4 h-4 text-slate-500" />
          <div className="flex flex-wrap gap-2 text-xs">
            {template.global_filters.products?.map((p, i) => (
              <span key={i} className="bg-white px-2 py-1 rounded border border-slate-200">
                {p}
              </span>
            ))}
            {template.global_filters.markets?.map((m, i) => (
              <span key={i} className="bg-white px-2 py-1 rounded border border-slate-200">
                {m}
              </span>
            ))}
            {(!template.global_filters.products?.length && !template.global_filters.markets?.length) && (
              <span className="text-slate-400">No filters applied</span>
            )}
          </div>
        </div>
      )}

      {/* Global Q&A */}
      {showGlobalQA && (
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <ReportQA template={template} results={results} />
        </div>
      )}

      {/* Components Grid */}
      {isExecuting ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-3" />
            <p className="text-sm text-slate-500">Generating report...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {template.components.map((component) => (
            <ComponentRenderer
              key={component.id}
              component={component}
              result={getComponentResult(component.id)}
              isLoading={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}