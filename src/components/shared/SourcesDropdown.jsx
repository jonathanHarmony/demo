import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle2, Clock } from "lucide-react";

const interviewees = [
  { name: "Sarah M.", role: "Consumer", duration: "2:14" },
  { name: "James T.", role: "Retail Manager", duration: "1:47" },
  { name: "Maria G.", role: "Brand Manager", duration: "3:02" },
  { name: "David L.", role: "Consumer", duration: "2:35" },
  { name: "Emma K.", role: "Product Designer", duration: "2:18" },
  { name: "Alex R.", role: "Consumer", duration: "1:52" },
  { name: "Sophie W.", role: "Marketing Lead", duration: "2:44" },
  { name: "Michael B.", role: "Consumer", duration: "2:09" },
  { name: "Lisa H.", role: "Sustainability Lead", duration: "3:15" },
  { name: "Tom P.", role: "Consumer", duration: "1:58" },
  { name: "Rachel N.", role: "Buyer", duration: "2:27" },
  { name: "Chris D.", role: "Consumer", duration: "2:11" },
  { name: "Nina S.", role: "Store Owner", duration: "2:53" },
  { name: "Paul F.", role: "Consumer", duration: "1:44" },
  { name: "Anna J.", role: "Consumer", duration: "2:06" },
  { name: "Mark V.", role: "Category Manager", duration: "2:38" },
  { name: "Jessica L.", role: "Consumer", duration: "2:22" },
  { name: "Brian C.", role: "Consumer", duration: "1:55" },
  { name: "Elena M.", role: "Consumer", duration: "2:19" },
  { name: "Kevin R.", role: "Operations Manager", duration: "2:41" }
];

export default function InterviewsThinking() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCalls, setCompletedCalls] = useState([]);
  const [activeCalls, setActiveCalls] = useState([]);

  useEffect(() => {
    let callIndex = 0;
    
    const runInterviews = () => {
      if (callIndex < interviewees.length) {
        const interview = { ...interviewees[callIndex], id: callIndex };
        
        // Start call
        setActiveCalls(prev => [...prev, interview]);
        setCurrentIndex(callIndex);
        
        // Parse duration to milliseconds (format: "M:SS")
        const [minutes, seconds] = interview.duration.split(':').map(Number);
        const durationMs = (minutes * 60 + seconds) * 1000;
        
        // Complete call after duration - slowed down to 1/3 speed for more realistic timing
        setTimeout(() => {
          setActiveCalls(prev => prev.filter(c => c.id !== interview.id));
          setCompletedCalls(prev => [...prev, interview]);
          callIndex++;
          
          // Start next call with slight delay
          if (callIndex < interviewees.length) {
            setTimeout(runInterviews, 500);
          }
        }, Math.min(durationMs / 3, 2000)); // Slower: divide by 3, max 2 seconds per call
      }
    };

    runInterviews();
  }, []);

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto">
      {/* Active Calls */}
      <AnimatePresence>
        {activeCalls.map((interview) => (
          <motion.div
            key={`active-${interview.id}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex items-center gap-3 p-3 bg-teal-50 border border-teal-200 rounded-lg"
          >
            <div className="flex-shrink-0">
              <div className="relative">
                <Phone className="w-4 h-4 text-teal-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 truncate">
                {interview.name}
              </div>
              <div className="text-xs text-slate-600">{interview.role}</div>
            </div>
            <div className="flex items-center gap-1 text-xs text-teal-700">
              <Clock className="w-3 h-3" />
              {interview.duration}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Completed Calls */}
      <AnimatePresence>
        {completedCalls.slice(-5).map((interview) => (
          <motion.div
            key={`completed-${interview.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-2 bg-slate-50 rounded"
          >
            <div className="flex-shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-700 truncate">
                {interview.name}
              </div>
            </div>
            <div className="text-xs text-slate-500">{interview.duration}</div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Progress Summary */}
      <div className="pt-3 border-t border-slate-200">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>Completed Interviews</span>
          <span className="font-semibold">{completedCalls.length} / {interviewees.length}</span>
        </div>
        <div className="mt-2 bg-slate-200 rounded-full h-1.5 overflow-hidden">
          <motion.div 
            className="bg-teal-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCalls.length / interviewees.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}