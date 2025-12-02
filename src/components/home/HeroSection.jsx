import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
        >
          <h1 className="text-5xl md:text-6xl font-semibold text-slate-900 mb-6 leading-tight">
            Your AI research analyst that turns{" "}
            <span className="gradient-text">questions into insight</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            No setup, no dashboards — just answers.
          </p>
        </motion.div>

        {/* Floating elements for visual interest */}
        <motion.div
          className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-teal-400/40"
          animate={{
            y: [-10, 10, -10],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-32 right-1/4 w-3 h-3 rounded-full bg-blue-500/30"
          animate={{
            y: [10, -10, 10],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </section>
  );
}