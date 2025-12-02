import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, FileText, Play, Settings, Trash2, Copy, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TemplateBuilder from "@/components/reports/TemplateBuilder";
import ReportViewer from "@/components/reports/ReportViewer";
import { format } from "date-fns";

export default function ReportTemplates() {
  const [view, setView] = useState('list'); // list | builder | viewer
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const queryClient = useQueryClient();

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['report-templates'],
    queryFn: () => base44.entities.ReportTemplate.list('-created_date'),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.ReportTemplate.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report-templates'] });
      setView('list');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.ReportTemplate.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report-templates'] });
      setView('list');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.ReportTemplate.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report-templates'] });
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: async (template) => {
      const { id, created_date, updated_date, created_by, ...rest } = template;
      return base44.entities.ReportTemplate.create({
        ...rest,
        name: `${template.name} (Copy)`,
        version: 1
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report-templates'] });
    },
  });

  const handleSaveTemplate = (config) => {
    if (selectedTemplate?.id) {
      updateMutation.mutate({
        id: selectedTemplate.id,
        data: { ...config, version: (selectedTemplate.version || 1) + 1 }
      });
    } else {
      createMutation.mutate(config);
    }
  };

  const handleRunTemplate = (template) => {
    setSelectedTemplate(template);
    setView('viewer');
  };

  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setView('builder');
  };

  if (view === 'builder') {
    return (
      <TemplateBuilder
        template={selectedTemplate}
        onSave={handleSaveTemplate}
        onClose={() => {
          setView('list');
          setSelectedTemplate(null);
        }}
      />
    );
  }

  if (view === 'viewer' && selectedTemplate) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setView('list');
              setSelectedTemplate(null);
            }}
            className="mb-4"
          >
            ← Back to Templates
          </Button>
          <ReportViewer template={selectedTemplate} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 mb-1">Report Templates</h1>
            <p className="text-sm text-slate-600">
              Build and manage modular research reports
            </p>
          </div>
          <Button
            onClick={() => {
              setSelectedTemplate(null);
              setView('builder');
            }}
            className="bg-slate-900 hover:bg-slate-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Template
          </Button>
        </div>

        {/* Templates Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-sm text-slate-500">Loading templates...</div>
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-lg">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-base font-medium text-slate-900 mb-2">No templates yet</h3>
            <p className="text-sm text-slate-600 mb-6">
              Create your first modular report template
            </p>
            <Button
              onClick={() => {
                setSelectedTemplate(null);
                setView('builder');
              }}
              variant="outline"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-slate-900 mb-1">
                          {template.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {template.description || 'No description'}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditTemplate(template)}>
                            <Settings className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => duplicateMutation.mutate(template)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteMutation.mutate(template.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs bg-slate-100 px-2 py-0.5 rounded">
                        {template.components?.length || 0} components
                      </span>
                      <span className="text-xs text-slate-400">
                        v{template.version || 1}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-400">
                        {template.created_date && format(new Date(template.created_date), 'MMM d, yyyy')}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleRunTemplate(template)}
                        className="h-7 text-xs bg-teal-600 hover:bg-teal-700"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Run
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}