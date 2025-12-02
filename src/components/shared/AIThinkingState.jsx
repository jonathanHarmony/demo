import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AIThinkingState() {
  const [statusIndex, setStatusIndex] = useState(0);
  
  const statuses = [
    "Harmony is gathering data",
    "Analyzing 5.2M mentions",
    "Identifying patterns",
    "Cross-checking sources",
    "Synthesizing insights",
    "Preparing your brief"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Pulsing AI Orb */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 opacity-20 blur-2xl" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-teal-400 to-blue-600 flex items-center justify-center shadow-2xl">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
          
          {/* Pulse Rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-teal-400"
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-blue-600"
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1,
            }}
          />
        </motion.div>

        {/* Status Text */}
        <motion.div
          key={statusIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-2xl font-medium text-slate-900 mb-2">
            {statuses[statusIndex]}
          </p>
          <div className="flex justify-center gap-2">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 rounded-full bg-teal-500"
            />
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 rounded-full bg-blue-500"
            />
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 rounded-full bg-indigo-500"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}