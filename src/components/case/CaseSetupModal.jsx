import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CaseSetupModal({ onClose, onComplete }) {
  const [formData, setFormData] = useState({
    title: "",
    objective: "",
    regions: [],
    language: "English",
    sources: ["social", "news"],
    caseType: "consumer_pulse"
  });

  const sources = [
    { id: "social", label: "Social" },
    { id: "interviews", label: "Interviews" },
    { id: "reviews", label: "Reviews" },
    { id: "news", label: "News" },
    { id: "harmony_graph", label: "Harmony Graph" }
  ];

  const caseTypes = [
    { value: "consumer_pulse", label: "Consumer Pulse" },
    { value: "innovation_radar", label: "Innovation Radar" },
    { value: "market_landscape", label: "Market Landscape" },
    { value: "campaign_effectiveness", label: "Campaign Effectiveness" },
    { value: "custom", label: "Custom" }
  ];

  const regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East", "Africa"];

  const toggleSource = (sourceId) => {
    setFormData({
      ...formData,
      sources: formData.sources.includes(sourceId)
        ? formData.sources.filter(s => s !== sourceId)
        : [...formData.sources, sourceId]
    });
  };

  const toggleRegion = (region) => {
    setFormData({
      ...formData,
      regions: formData.regions.includes(region)
        ? formData.regions.filter(r => r !== region)
        : [...formData.regions, region]
    });
  };

  const handleCreate = () => {
    if (formData.title.trim()) {
      onComplete(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">New Case</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded flex items-center justify-center hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Case Title */}
          <div>
            <Label className="text-xs font-medium text-slate-700 mb-2 block">Case Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Refill Packaging in Beauty"
              className="text-sm"
            />
          </div>

          {/* Business Objective */}
          <div>
            <Label className="text-xs font-medium text-slate-700 mb-2 block">Business Objective (Optional)</Label>
            <Textarea
              value={formData.objective}
              onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
              placeholder="What are you trying to learn or achieve?"
              rows={3}
              className="text-sm resize-none"
            />
          </div>

          {/* Case Type */}
          <div>
            <Label className="text-xs font-medium text-slate-700 mb-2 block">Case Type</Label>
            <Select value={formData.caseType} onValueChange={(value) => setFormData({ ...formData, caseType: value })}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {caseTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Regions */}
          <div>
            <Label className="text-xs font-medium text-slate-700 mb-2 block">Regions</Label>
            <div className="flex flex-wrap gap-2">
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => toggleRegion(region)}
                  className={`px-3 py-1.5 text-xs rounded transition-colors ${
                    formData.regions.includes(region)
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Data Sources */}
          <div>
            <Label className="text-xs font-medium text-slate-700 mb-2 block">Data Sources</Label>
            <div className="flex flex-wrap gap-2">
              {sources.map(source => (
                <button
                  key={source.id}
                  onClick={() => toggleSource(source.id)}
                  className={`px-3 py-1.5 text-xs rounded transition-colors ${
                    formData.sources.includes(source.id)
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {source.label}
                </button>
              ))}
            </div>
          </div>

          {/* Output Language */}
          <div>
            <Label className="text-xs font-medium text-slate-700 mb-2 block">Output Language</Label>
            <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hebrew">Hebrew (עברית)</SelectItem>
                <SelectItem value="Arabic">Arabic (العربية)</SelectItem>
                <SelectItem value="Japanese">Japanese (日本語)</SelectItem>
                <SelectItem value="French">French (Français)</SelectItem>
                <SelectItem value="German">German (Deutsch)</SelectItem>
                <SelectItem value="Spanish">Spanish (Español)</SelectItem>
                <SelectItem value="Chinese">Chinese (中文)</SelectItem>
                <SelectItem value="Korean">Korean (한국어)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
          <Button variant="ghost" onClick={onClose} className="text-sm">
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!formData.title.trim()}
            className="bg-slate-900 text-white hover:bg-slate-800 text-sm"
          >
            Create Case
          </Button>
        </div>
      </div>
    </div>
  );
}