import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Link as LinkIcon, FileText, MessageCircle, Mic, Bot, BarChart, Users, MessageSquareText, ShoppingCart, ClipboardList, FileSpreadsheet, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";

const harmonySources = [
  { id: "social", name: "Social Graph", icon: <MessageCircle className="w-5 h-5" />, type: "social" },
  { id: "interviews", name: "Harmony Interviews", icon: <Mic className="w-5 h-5" />, type: "interviews" },
  { id: "artificial_audiences", name: "Artificial Audiences", icon: <Bot className="w-5 h-5" />, type: "artificial_audiences" },
];

const externalSources = [
  { id: "commercial", name: "Commercial data", icon: <BarChart className="w-5 h-5" />, type: "commercial" },
  { id: "crm", name: "CRM data", icon: <Users className="w-5 h-5" />, type: "crm" },
  { id: "consumer_interviews", name: "Consumer interviews (text)", icon: <MessageSquareText className="w-5 h-5" />, type: "consumer_interviews" },
  { id: "shopper", name: "Shopper or retail insights", icon: <ShoppingCart className="w-5 h-5" />, type: "shopper" },
  { id: "surveys", name: "Open survey responses", icon: <ClipboardList className="w-5 h-5" />, type: "surveys" },
  { id: "csv", name: "CSV file upload", icon: <FileSpreadsheet className="w-5 h-5" />, type: "csv" },
  { id: "text", name: "Text paste", icon: <FileText className="w-5 h-5" />, type: "text" },
];

const integrationSources = [
  {
    id: "salesforce",
    name: "Salesforce",
    logo: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg",
    type: "integration"
  },
  {
    id: "hubspot",
    name: "HubSpot",
    logo: "https://cdn.worldvectorlogo.com/logos/hubspot-1.svg",
    type: "integration"
  },
  {
    id: "google_analytics",
    name: "Google Analytics",
    logo: "https://cdn.worldvectorlogo.com/logos/google-analytics-4.svg",
    type: "integration"
  },
  {
    id: "shopify",
    name: "Shopify",
    logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
    type: "integration"
  },
  {
    id: "stripe",
    name: "Stripe",
    logo: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
    type: "integration"
  },
  {
    id: "zendesk",
    name: "Zendesk",
    logo: "https://cdn.worldvectorlogo.com/logos/zendesk-1.svg",
    type: "integration"
  },
  {
    id: "intercom",
    name: "Intercom",
    logo: "https://cdn.worldvectorlogo.com/logos/intercom-1.svg",
    type: "integration"
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    logo: "https://cdn.worldvectorlogo.com/logos/mailchimp-freddie-icon.svg",
    type: "integration"
  },
];

export default function AddSourceModal({ open, onClose, onAddSource }) {
  const [selectedType, setSelectedType] = useState(null);
  const [sourceName, setSourceName] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectSource = (source) => {
    // For Harmony sources, add them immediately without showing the form
    if (source.type === 'social' || source.type === 'interviews' || source.type === 'artificial_audiences') {
      const newSource = {
        id: Date.now().toString(),
        type: source.type,
        name: source.name,
        description: `Harmony ${source.name}`,
        metadata: {
          added_at: new Date().toISOString(),
        }
      };
      onAddSource(newSource);
      handleClose();
      return;
    }

    // For other sources, show the configuration form
    setSelectedType(source);
    setSourceName(source.name);
    setSourceText("");
    setUploadedFile(null);
    setFileUrl("");
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);
    try {
      const result = await base44.integrations.Core.UploadFile({ file });
      setFileUrl(result.file_url);
      setUploadedFile(file);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirmAdd = () => {
    if (!selectedType) return;

    const newSource = {
      id: Date.now().toString(),
      type: selectedType.type,
      name: sourceName || selectedType.name,
      description: sourceText || `Added ${selectedType.name}`,
      metadata: {
        added_at: new Date().toISOString(),
        ...(uploadedFile && { file_name: uploadedFile.name, file_url: fileUrl }),
        ...(sourceText && { text_length: sourceText.length }),
      }
    };

    onAddSource(newSource);
    handleReset();
  };

  const handleReset = () => {
    setSelectedType(null);
    setSourceName("");
    setSourceText("");
    setUploadedFile(null);
    setFileUrl("");
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const renderSourceForm = () => {
    if (!selectedType) return null;

    const commonFields = (
      <div className="mb-4">
        <label className="text-xs font-medium text-slate-700 mb-2 block">
          Source name
        </label>
        <Input
          value={sourceName}
          onChange={(e) => setSourceName(e.target.value)}
          placeholder={selectedType.name}
          className="text-sm"
        />
      </div>
    );

    switch (selectedType.type) {
      case "csv":
        return (
          <div className="space-y-4">
            {commonFields}
            <div>
              <label className="text-xs font-medium text-slate-700 mb-2 block">
                Upload CSV file
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-slate-300 transition-colors">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                  disabled={isUploading}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-1">
                    {isUploading ? "Uploading..." : uploadedFile ? uploadedFile.name : "Click to upload CSV"}
                  </p>
                  <p className="text-xs text-slate-500">or drag and drop</p>
                </label>
              </div>
            </div>
          </div>
        );

      case "text":
        return (
          <div className="space-y-4">
            {commonFields}
            <div>
              <label className="text-xs font-medium text-slate-700 mb-2 block">
                Paste text or data
              </label>
              <Textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Paste your text data here..."
                rows={8}
                className="text-sm font-mono"
              />
            </div>
          </div>
        );

      case "commercial":
      case "crm":
      case "shopper":
        return (
          <div className="space-y-4">
            {commonFields}
            <div>
              <label className="text-xs font-medium text-slate-700 mb-2 block">
                Data source URL or description
              </label>
              <Input
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="e.g., https://api.example.com/data"
                className="text-sm"
              />
            </div>
          </div>
        );

      case "consumer_interviews":
      case "surveys":
        return (
          <div className="space-y-4">
            {commonFields}
            <div>
              <label className="text-xs font-medium text-slate-700 mb-2 block">
                Upload file or paste text
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-slate-300 transition-colors mb-3">
                <input
                  type="file"
                  accept=".txt,.doc,.docx,.pdf"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  className="hidden"
                  id="text-file-upload"
                  disabled={isUploading}
                />
                <label htmlFor="text-file-upload" className="cursor-pointer">
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-600">
                    {isUploading ? "Uploading..." : uploadedFile ? uploadedFile.name : "Upload file"}
                  </p>
                </label>
              </div>
              <div className="text-xs text-slate-500 text-center mb-3">or</div>
              <Textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Paste interview transcripts or survey responses..."
                rows={6}
                className="text-sm"
              />
            </div>
          </div>
        );

      case "integration":
        return (
          <div className="space-y-4">
            {commonFields}
            <div>
              <label className="text-xs font-medium text-slate-700 mb-2 block">
                API Key or Connection Details
              </label>
              <Input
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Enter API key or connection details"
                className="text-sm"
                type="password"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            {commonFields}
            <div>
              <label className="text-xs font-medium text-slate-700 mb-2 block">
                Description (optional)
              </label>
              <Textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Add any relevant details..."
                rows={4}
                className="text-sm"
              />
            </div>
          </div>
        );
    }
  };

  const isFormValid = () => {
    if (!selectedType || !sourceName) return false;

    switch (selectedType.type) {
      case "csv":
        return !!uploadedFile;
      case "text":
        return !!sourceText;
      case "consumer_interviews":
      case "surveys":
        return !!sourceText || !!uploadedFile;
      default:
        return true;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]" onClick={handleClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto mx-4"
          >
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-base font-semibold text-slate-900">
                {selectedType ? `Add ${selectedType.name}` : "Add source"}
              </h2>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-slate-100 rounded transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {!selectedType ? (
                  <motion.div
                    key="source-selection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Harmony Sources */}
                    <div>
                      <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                        Harmony sources
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {harmonySources.map((source) => (
                          <button
                            key={source.id}
                            onClick={() => handleSelectSource(source)}
                            className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors text-left"
                          >
                            <span className="text-xl">{source.icon}</span>
                            <span className="text-sm text-slate-900">{source.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* External Sources */}
                    <div>
                      <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                        External sources
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {externalSources.map((source) => (
                          <button
                            key={source.id}
                            onClick={() => handleSelectSource(source)}
                            className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors text-left"
                          >
                            <span className="text-xl">{source.icon}</span>
                            <span className="text-sm text-slate-900">{source.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Integrations */}
                    <div>
                      <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                        Integrations
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {integrationSources.map((integration) => (
                          <button
                            key={integration.id}
                            onClick={() => handleSelectSource(integration)}
                            className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-colors text-left"
                          >
                            <img
                              src={integration.logo}
                              alt={integration.name}
                              className="w-5 h-5 object-contain"
                            />
                            <span className="text-sm text-slate-900">{integration.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="source-config"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {renderSourceForm()}

                    <div className="flex gap-3 pt-6 border-t border-slate-200 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedType(null)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleConfirmAdd}
                        disabled={!isFormValid() || isUploading}
                        className="flex-1"
                      >
                        Add source
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}