import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import QuickBriefWorkspace from "../components/workspace/QuickBriefWorkspace";
import FullCaseWorkspace from "../components/workspace/FullCaseWorkspace";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const tabFromUrl = searchParams.get('tab') || 'quick';
  const [activeTab, setActiveTab] = useState(tabFromUrl);

  useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    navigate(`?tab=${value}`);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">
      <AnimatePresence mode="wait">
        {activeTab === 'quick' ? (
          <motion.div
            key="quick"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <QuickBriefWorkspace />
          </motion.div>
        ) : (
          <motion.div
            key="case"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FullCaseWorkspace />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}