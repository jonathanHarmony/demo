import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, GripVertical, Trash2, Settings, Save, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const dataSourceOptions = [
  { id: "SocialGraph", label: "Social Graph", icon: "💬" },
  { id: "AiAudiences", label: "AI Audiences", icon: "🤖" },
  { id: "UploadedSurvey", label: "Uploaded Survey", icon: "📋" },
  { id: "InternalSurvey", label: "Internal Survey", icon: "📊" },
  { id: "PoSData", label: "PoS Data", icon: "🛒" },
  { id: "CRM", label: "CRM", icon: "👥" },
  { id: "MixedSource", label: "Mixed Source", icon: "🔀" },
  { id: "Manual", label: "Manual Input", icon: "✏️" }
];

const visualizationOptions = [
  { id: "bar", label: "Bar Chart" },
  { id: "line", label: "Line Chart" },
  { id: "area", label: "Area Chart" },
  { id: "radar", label: "Radar/Spider" },
  { id: "heatmap", label: "Heatmap" },
  { id: "bubble", label: "Bubble Chart" },
  { id: "table", label: "Table" },
  { id: "comparison", label: "Comparison" },
  { id: "ranking", label: "Ranking" },
  { id: "wordcloud", label: "Word Cloud" },
  { id: "treemap", label: "Treemap" }
];

export default function TemplateBuilder({ template, onSave, onClose }) {
  const [config, setConfig] = useState({
    name: template?.name || "",
    description: template?.description || "",
    components: template?.components || [],
    global_filters: template?.global_filters || {
      time_range: { start: null, end: null },
      products: [],
      categories: [],
      markets: []
    },
    execution_params: template?.execution_params || {},
    custom_fields: template?.custom_fields || {}
  });

  const [editingComponent, setEditingComponent] = useState(null);
  const [expandedComponent, setExpandedComponent] = useState(null);

  const addComponent = () => {
    const newComponent = {
      id: `comp_${Date.now()}`,
      title: "New Component",
      data_source: "SocialGraph",
      data_query: {},
      transformation: {},
      visualization: { type: "bar" },
      narrative: { enabled: false, mode: "descriptive" },
      filters: {},
      order_index: config.components.length
    };
    setConfig(prev => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));
    setEditingComponent(newComponent.id);
  };

  const updateComponent = (id, updates) => {
    setConfig(prev => ({
      ...prev,
      components: prev.components.map(c => 
        c.id === id ? { ...c, ...updates } : c
      )
    }));
  };

  const removeComponent = (id) => {
    setConfig(prev => ({
      ...prev,
      components: prev.components.filter(c => c.id !== id)
    }));
  };

  const moveComponent = (id, direction) => {
    const index = config.components.findIndex(c => c.id === id);
    if (
      (direction === -1 && index === 0) ||
      (direction === 1 && index === config.components.length - 1)
    ) return;

    const newComponents = [...config.components];
    const temp = newComponents[index];
    newComponents[index] = newComponents[index + direction];
    newComponents[index + direction] = temp;
    
    setConfig(prev => ({ ...prev, components: newComponents }));
  };

  const validateTemplate = () => {
    if (!config.name.trim()) return false;
    if (config.components.length === 0) return false;
    return config.components.every(c => c.title && c.data_source);
  };

  const handleSave = () => {
    if (!validateTemplate()) return;
    onSave(config);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded">
            <X className="w-5 h-5 text-slate-500" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              {template ? "Edit Template" : "Create Template"}
            </h1>
            <p className="text-sm text-slate-500">Build modular report templates</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSave}
            disabled={!validateTemplate()}
            className="bg-slate-900"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Template Config */}
        <div className="w-80 border-r border-slate-200 p-6 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-700 mb-1 block">
                Template Name *
              </label>
              <Input
                value={config.name}
                onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Monthly Brand Health"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 mb-1 block">
                Description
              </label>
              <Textarea
                value={config.description}
                onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                placeholder="What does this template measure?"
                rows={3}
              />
            </div>

            <div className="pt-4 border-t border-slate-200">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3 block">
                Global Filters
              </label>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-600 mb-1 block">Products</label>
                  <Input
                    placeholder="Add product filter"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value) {
                        setConfig(prev => ({
                          ...prev,
                          global_filters: {
                            ...prev.global_filters,
                            products: [...(prev.global_filters.products || []), e.target.value]
                          }
                        }));
                        e.target.value = '';
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {config.global_filters.products?.map((p, i) => (
                      <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded flex items-center gap-1">
                        {p}
                        <button onClick={() => setConfig(prev => ({
                          ...prev,
                          global_filters: {
                            ...prev.global_filters,
                            products: prev.global_filters.products.filter((_, idx) => idx !== i)
                          }
                        }))}>×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-600 mb-1 block">Markets</label>
                  <Input
                    placeholder="Add market filter"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value) {
                        setConfig(prev => ({
                          ...prev,
                          global_filters: {
                            ...prev.global_filters,
                            markets: [...(prev.global_filters.markets || []), e.target.value]
                          }
                        }));
                        e.target.value = '';
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {config.global_filters.markets?.map((m, i) => (
                      <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded flex items-center gap-1">
                        {m}
                        <button onClick={() => setConfig(prev => ({
                          ...prev,
                          global_filters: {
                            ...prev.global_filters,
                            markets: prev.global_filters.markets.filter((_, idx) => idx !== i)
                          }
                        }))}>×</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Components */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-slate-700">
                Components ({config.components.length})
              </h2>
              <Button onClick={addComponent} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Add Component
              </Button>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {config.components.map((component, index) => (
                  <motion.div
                    key={component.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white border border-slate-200 rounded-lg overflow-hidden"
                  >
                    <div 
                      className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-slate-50"
                      onClick={() => setExpandedComponent(
                        expandedComponent === component.id ? null : component.id
                      )}
                    >
                      <GripVertical className="w-4 h-4 text-slate-400" />
                      <div className="flex-1">
                        <Input
                          value={component.title}
                          onChange={(e) => updateComponent(component.id, { title: e.target.value })}
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm font-medium border-0 p-0 h-auto focus-visible:ring-0"
                          placeholder="Component title"
                        />
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500">
                            {dataSourceOptions.find(d => d.id === component.data_source)?.label}
                          </span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500">
                            {component.visualization?.type || 'No viz'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); moveComponent(component.id, -1); }}
                          disabled={index === 0}
                          className="h-7 w-7 p-0"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); moveComponent(component.id, 1); }}
                          disabled={index === config.components.length - 1}
                          className="h-7 w-7 p-0"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); removeComponent(component.id); }}
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedComponent === component.id && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-4">
                            {/* Data Source */}
                            <div>
                              <label className="text-xs font-medium text-slate-700 mb-1 block">
                                Data Source
                              </label>
                              <Select
                                value={component.data_source}
                                onValueChange={(v) => updateComponent(component.id, { data_source: v })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {dataSourceOptions.map(opt => (
                                    <SelectItem key={opt.id} value={opt.id}>
                                      <span className="flex items-center gap-2">
                                        <span>{opt.icon}</span>
                                        {opt.label}
                                      </span>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Visualization */}
                            <div>
                              <label className="text-xs font-medium text-slate-700 mb-1 block">
                                Visualization Type
                              </label>
                              <Select
                                value={component.visualization?.type || 'bar'}
                                onValueChange={(v) => updateComponent(component.id, { 
                                  visualization: { ...component.visualization, type: v }
                                })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {visualizationOptions.map(opt => (
                                    <SelectItem key={opt.id} value={opt.id}>
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Narrative */}
                            <div>
                              <label className="text-xs font-medium text-slate-700 mb-1 block">
                                Narrative Mode
                              </label>
                              <div className="flex gap-2">
                                <Button
                                  variant={component.narrative?.enabled ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => updateComponent(component.id, {
                                    narrative: { ...component.narrative, enabled: !component.narrative?.enabled }
                                  })}
                                >
                                  {component.narrative?.enabled ? "Enabled" : "Disabled"}
                                </Button>
                                {component.narrative?.enabled && (
                                  <Select
                                    value={component.narrative?.mode || 'descriptive'}
                                    onValueChange={(v) => updateComponent(component.id, {
                                      narrative: { ...component.narrative, mode: v }
                                    })}
                                  >
                                    <SelectTrigger className="w-32">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="descriptive">What</SelectItem>
                                      <SelectItem value="interpretive">So What</SelectItem>
                                      <SelectItem value="actionable">Now What</SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>

              {config.components.length === 0 && (
                <div className="text-center py-12 bg-white border-2 border-dashed border-slate-200 rounded-lg">
                  <p className="text-sm text-slate-500 mb-3">No components yet</p>
                  <Button onClick={addComponent} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add your first component
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}