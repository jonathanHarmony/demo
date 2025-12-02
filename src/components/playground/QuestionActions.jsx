import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export default function VoiceBubbleAnimation() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBubble = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        size: 20 + Math.random() * 40,
      };
      
      setBubbles(prev => [...prev.slice(-15), newBubble]);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] bg-gradient-to-b from-teal-50 via-cyan-50 to-blue-50 rounded-lg overflow-hidden flex items-center justify-center">
      {/* Center Microphone Icon */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          {/* Pulsing Ring */}
          <motion.div
            className="absolute inset-0 -m-8 rounded-full bg-teal-400 opacity-20"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Icon Container */}
          <div className="relative w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center">
            <Mic className="w-8 h-8 text-teal-600" />
          </div>
        </div>
      </div>

      {/* Floating Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute bottom-0 rounded-full bg-gradient-to-br from-teal-300/40 to-cyan-400/40 backdrop-blur-sm"
          style={{
            left: `${bubble.x}%`,
            width: bubble.size,
            height: bubble.size,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -500,
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            ease: "easeOut",
          }}
          onAnimationComplete={() => {
            setBubbles(prev => prev.filter(b => b.id !== bubble.id));
          }}
        />
      ))}

      {/* Waveform Lines */}
      <div className="absolute inset-0 flex items-center justify-center gap-1 opacity-30">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 bg-teal-500 rounded-full"
            animate={{
              height: [20, 60, 20],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Text Overlay */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm font-medium text-teal-700"
        >
          🎙️ Voice Agent Active
        </motion.div>
      </div>
    </div>
  );
}