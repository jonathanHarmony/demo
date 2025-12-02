import React from "react";

export default function CompactParameters({ parameters, onChange }) {
  const sources = [
    { id: "social", label: "Social" },
    { id: "interviews", label: "Interviews" },
    { id: "reviews", label: "Reviews" },
    { id: "news", label: "News" },
    { id: "graph", label: "Graph" }
  ];
  
  const languages = [
    { code: "EN", full: "English" },
    { code: "JP", full: "Japanese" },
    { code: "FR", full: "French" },
    { code: "DE", full: "German" },
    { code: "ES", full: "Spanish" },
  ];

  const toggleSource = (sourceId) => {
    const newSources = parameters.sources.includes(sourceId)
      ? parameters.sources.filter(s => s !== sourceId)
      : [...parameters.sources, sourceId];
    onChange({ ...parameters, sources: newSources });
  };

  const toggleLanguage = (langFull) => {
    const newLangs = parameters.languages.includes(langFull)
      ? parameters.languages.filter(l => l !== langFull)
      : [...parameters.languages, langFull];
    onChange({ ...parameters, languages: newLangs });
  };

  const isSourceActive = (sourceId) => parameters.sources.includes(sourceId);
  const isLanguageActive = (langFull) => parameters.languages.includes(langFull);

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      <div className="grid grid-cols-2 gap-6">
        {/* Sources */}
        <div>
          <div className="text-[10px] font-medium text-slate-500 mb-2 uppercase tracking-wider">Sources</div>
          <div className="flex flex-wrap gap-1.5">
            {sources.map((source) => (
              <button
                key={source.id}
                onClick={() => toggleSource(source.id)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  isSourceActive(source.id)
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {source.label}
              </button>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <div className="text-[10px] font-medium text-slate-500 mb-2 uppercase tracking-wider">Languages</div>
          <div className="flex flex-wrap gap-1.5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => toggleLanguage(lang.full)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  isLanguageActive(lang.full)
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {lang.code}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}