import React, { useState, useRef, useEffect } from "react";
import { Database, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

const availableSources = [
    { id: "social", name: "Social Graph", nameHe: "גרף חברתי" },
    { id: "artificial_audiences", name: "Artificial Audience", nameHe: "קהל מלאכותי" },
    { id: "surveys", name: "Poll", nameHe: "סקר" },
];

export default function SourcesDropdown({ selectedSources = [], onSourcesChange, className = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { t, isRTL } = useLanguage();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const toggleSource = (sourceId) => {
        const newSources = selectedSources.includes(sourceId)
            ? selectedSources.filter(id => id !== sourceId)
            : [...selectedSources, sourceId];
        onSourcesChange(newSources);
    };

    const sourceCount = selectedSources.length;

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex items-center gap-1.5 px-2 py-1 hover:bg-slate-100 rounded transition-colors group"
            >
                <Database className="w-4 h-4 text-slate-600 group-hover:text-slate-900" />
                {sourceCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                        {sourceCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute top-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg py-2 min-w-[200px] z-50 ${isRTL ? 'left-0' : 'right-0'
                            }`}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        <div className="px-3 py-1.5 text-xs font-medium text-slate-500 border-b border-slate-100 mb-1">
                            {isRTL ? 'מקורות מידע' : 'Data Sources'}
                        </div>
                        {availableSources.map((source) => {
                            const isSelected = selectedSources.includes(source.id);
                            return (
                                <button
                                    key={source.id}
                                    onClick={() => toggleSource(source.id)}
                                    className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-50 transition-colors ${isRTL ? 'flex-row-reverse text-right' : 'text-left'
                                        }`}
                                >
                                    <span className={`text-sm flex-1 ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>
                                        {isRTL ? source.nameHe : source.name}
                                    </span>
                                    {isSelected && (
                                        <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                    )}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
