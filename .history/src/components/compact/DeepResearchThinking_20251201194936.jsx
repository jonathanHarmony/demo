import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, X, Database, MessageCircle, Mic, Bot, BarChart, Users, MessageSquareText, ShoppingCart, ClipboardList, FileSpreadsheet, FileText, Plug, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../shared/LanguageProvider";
import AddSourceModal from "../sources/AddSourceModal";

const sourceIcons = {
  social: <MessageCircle className="w-5 h-5" />,
  interviews: <Mic className="w-5 h-5" />,
  artificial_audiences: <Bot className="w-5 h-5" />,
  commercial: <BarChart className="w-5 h-5" />,
  crm: <Users className="w-5 h-5" />,
  consumer_interviews: <MessageSquareText className="w-5 h-5" />,
  shopper: <ShoppingCart className="w-5 h-5" />,
  surveys: <ClipboardList className="w-5 h-5" />,
  csv: <FileSpreadsheet className="w-5 h-5" />,
  text: <FileText className="w-5 h-5" />,
  integration: <Plug className="w-5 h-5" />
};

export default function SourcesPanel({ sources = [], onAddSource, onRemoveSource, className = "" }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const { t, isRTL } = useLanguage();

  const handleAddSource = (source) => {
    onAddSource(source);
    setShowAddModal(false);
  };

  if (isCollapsed) {
    return (
      <div className={`w-12 border-r border-slate-200 bg-white flex flex-col items-center py-4 ${className}`}>
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 hover:bg-slate-100 rounded transition-colors"
        >
          <Database className="w-4 h-4 text-slate-600" />
        </button>
        <div className="mt-2 text-xs text-slate-400 transform -rotate-90 whitespace-nowrap origin-center">
          {sources.length}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`w-64 border-r border-slate-200 bg-white flex flex-col ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
          <span className="text-xs font-medium text-slate-900">{t('sources.title')}</span>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>

        {/* Sources List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <AnimatePresence>
            {sources.map((source, index) => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg p-3 cursor-pointer transition-colors"
                onClick={() => setSelectedSource(source)}
              >
                <div className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">
                    {sourceIcons[source.type] || <Folder className="w-5 h-5" />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-slate-900 truncate">
                      {source.name}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 capitalize">
                      {source.type.replace(/_/g, ' ')}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveSource(source.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded transition-opacity"
                  >
                    <X className="w-3 h-3 text-slate-600" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {sources.length === 0 && (
            <div className="text-center py-8">
              <Database className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-500">{t('sources.no_sources')}</p>
            </div>
          )}
        </div>

        {/* Add Source Button */}
        <div className="border-t border-slate-200 p-3">
          <Button
            onClick={() => setShowAddModal(true)}
            variant="outline"
            size="sm"
            className="w-full text-xs"
          >
            <Plus className={`w-3.5 h-3.5 ${isRTL ? 'ml-1.5' : 'mr-1.5'}`} />
            {t('sources.add_source')}
          </Button>
        </div>
      </div>

      {/* Add Source Modal */}
      <AddSourceModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddSource={handleAddSource}
      />

      {/* Source Preview Modal */}
      <AnimatePresence>
        {selectedSource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 flex items-center justify-center z-50"
            onClick={() => setSelectedSource(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sourceIcons[selectedSource.type] || <Folder className="w-6 h-6" />}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{selectedSource.name}</h3>
                    <p className="text-xs text-slate-500 capitalize">{selectedSource.type.replace(/_/g, ' ')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSource(null)}
                  className="p-1 hover:bg-slate-100 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {selectedSource.description && (
                <p className="text-sm text-slate-700 mb-4">{selectedSource.description}</p>
              )}

              {selectedSource.metadata && (
                <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                  {Object.entries(selectedSource.metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-slate-500 capitalize">{key.replace(/_/g, ' ')}:</span>
                      <span className="text-slate-900 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}