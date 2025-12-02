import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import SignalCard from "./SignalCard";

export default function SignalSubscriptions({ onEdit }) {
  const queryClient = useQueryClient();

  const { data: signals = [], isLoading } = useQuery({
    queryKey: ['signals'],
    queryFn: () => base44.entities.Signal.list('-created_date'),
  });

  const deleteSignalMutation = useMutation({
    mutationFn: (id) => base44.entities.Signal.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signals'] });
    },
  });

  const updateSignalMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Signal.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signals'] });
    },
  });

  const handleToggleActive = (signal) => {
    updateSignalMutation.mutate({
      id: signal.id,
      data: { active: !signal.active }
    });
  };

  const handleDeleteSignal = (id) => {
    deleteSignalMutation.mutate(id);
  };

  if (isLoading) {
    return <div className="text-sm text-slate-500">Loading subscriptions...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Your Subscriptions</h2>
      <div className="grid gap-4">
        <AnimatePresence>
          {signals.map((signal, index) => (
            <SignalCard
              key={signal.id}
              signal={signal}
              onEdit={() => onEdit(signal)}
              onToggleActive={() => handleToggleActive(signal)}
              onDelete={() => handleDeleteSignal(signal.id)}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}