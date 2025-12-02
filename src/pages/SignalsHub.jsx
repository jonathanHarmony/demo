import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Radio, Settings, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SignalInstanceCard from "@/components/signals/SignalInstanceCard";
import SignalBuilder from "@/components/signals/SignalBuilder";
import SignalSubscriptions from "@/components/signals/SignalSubscriptions";
import { useLanguage } from "@/components/shared/LanguageProvider";

export default function SignalsHub() {
  const { isRTL } = useLanguage();
  const [view, setView] = useState('inbox'); // inbox | subscriptions | builder
  const [editingSignal, setEditingSignal] = useState(null);
  const [selectedInstance, setSelectedInstance] = useState(null);
  const queryClient = useQueryClient();

  const { data: instances = [], isLoading: loadingInstances } = useQuery({
    queryKey: ['signal-instances'],
    queryFn: () => base44.entities.SignalInstance.list('-created_date'),
  });

  const { data: signals = [] } = useQuery({
    queryKey: ['signals'],
    queryFn: () => base44.entities.Signal.list('-created_date'),
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id) => base44.entities.SignalInstance.update(id, { read: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signal-instances'] });
    },
  });

  const handleInstanceClick = (instance) => {
    setSelectedInstance(instance);
    if (!instance.read) {
      markAsReadMutation.mutate(instance.id);
    }
  };

  const handleCreateSignal = () => {
    setEditingSignal(null);
    setView('builder');
  };

  const handleBuilderClose = () => {
    setView('inbox');
    setEditingSignal(null);
  };

  if (view === 'builder') {
    return (
      <SignalBuilder
        signal={editingSignal}
        onClose={handleBuilderClose}
        onSave={() => {
          queryClient.invalidateQueries({ queryKey: ['signals'] });
          handleBuilderClose();
        }}
      />
    );
  }

  if (view === 'subscriptions') {
    return (
      <div className="min-h-screen bg-[#FAFAFA]" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" onClick={() => setView('inbox')}>
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {isRTL ? 'חזרה לאינבוקס' : 'Back to Inbox'}
            </Button>
          </div>
          <SignalSubscriptions
            onEdit={(signal) => {
              setEditingSignal(signal);
              setView('builder');
            }}
          />
        </div>
      </div>
    );
  }

  const unreadCount = instances.filter(i => !i.read).length;

  return (
    <div className="min-h-screen bg-[#FAFAFA]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 mb-1">
              {isRTL ? 'מרכז סיגנלים' : 'Signals Hub'}
            </h1>
            <p className="text-sm text-slate-600">
              {unreadCount > 0
                ? isRTL
                  ? `${unreadCount} סיגנלים חדשים`
                  : `${unreadCount} new signal${unreadCount > 1 ? 's' : ''}`
                : isRTL
                  ? 'הכול מעודכן'
                  : 'All caught up'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setView('subscriptions')}>
              <Settings className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {isRTL ? 'ניהול מנויים' : 'Manage Subscriptions'}
            </Button>
            <Button onClick={handleCreateSignal} className="bg-slate-900 text-white hover:bg-slate-800">
              <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {isRTL ? 'יצירת סיגנל' : 'Create Signal'}
            </Button>
          </div>
        </div>

        {/* Inbox */}
        {loadingInstances ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-sm text-slate-500">
              {isRTL ? 'טוען סיגנלים...' : 'Loading signals...'}
            </div>
          </div>
        ) : instances.length === 0 ? (
          <div className="text-center py-16">
            <Radio className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-base font-medium text-slate-900 mb-2">
              {isRTL ? 'עדיין אין סיגנלים' : 'No signals yet'}
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              {isRTL
                ? 'צור מנוי סיגנל ראשון כדי להתחיל לקבל עדכונים'
                : 'Create your first signal subscription to start receiving updates'}
            </p>
            <Button onClick={handleCreateSignal} variant="outline">
              <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {isRTL ? 'צור סיגנל ראשון' : 'Create your first signal'}
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence>
              {instances.map((instance, index) => (
                <SignalInstanceCard
                  key={instance.id}
                  instance={instance}
                  onClick={() => handleInstanceClick(instance)}
                  index={index}
                  selected={selectedInstance?.id === instance.id}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedInstance && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setSelectedInstance(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-slate-900 mb-2">{selectedInstance.title}</h2>
                      <p className="text-sm text-slate-600">{selectedInstance.summary}</p>
                    </div>
                    <button
                      onClick={() => setSelectedInstance(null)}
                      className="p-2 hover:bg-slate-100 rounded transition-colors"
                    >
                      ×
                    </button>
                  </div>

                  {selectedInstance.confidence && (
                    <div className="text-xs font-medium text-teal-600 mb-4">
                      {selectedInstance.confidence}% confidence
                    </div>
                  )}

                  {selectedInstance.highlights?.length > 0 && (
                    <div className="mb-6">
                      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                        Key Findings
                      </div>
                      <div className="space-y-2">
                        {selectedInstance.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5" />
                            <p className="text-sm text-slate-700">{highlight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedInstance.quotes?.length > 0 && (
                    <div>
                      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                        Sample Quotes
                      </div>
                      <div className="space-y-3">
                        {selectedInstance.quotes.map((quote, i) => (
                          <div key={i} className="bg-slate-50 border-l-4 border-teal-500 p-4 rounded">
                            <p className="text-sm italic text-slate-700">"{quote}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}