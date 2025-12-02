
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { Sparkles, X, Radio, Loader2, TrendingUp, MessageSquare, Target, Zap, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import SignalPreviewChart from "./SignalPreviewChart";
import { useLanguage } from "@/components/shared/LanguageProvider";

const signalDomains = [
  { id: "consumer_sentiment", label: "Consumer Sentiment", icon: "💬" },
  { id: "competitive_intelligence", label: "Competitive Intelligence", icon: "🎯" },
  { id: "trends_and_needs", label: "Trends and Needs", icon: "📈" },
  { id: "performance_and_messaging", label: "Performance & Messaging", icon: "📊" },
  { id: "shopper_and_retail", label: "Shopper & Retail", icon: "🛒" }
];

const signalDomainLabelsHe = {
  consumer_sentiment: "סנטימנט צרכנים",
  competitive_intelligence: "אינטליגנציה תחרותית",
  trends_and_needs: "טרנדים וצרכים",
  performance_and_messaging: "ביצועים ומסרים",
  shopper_and_retail: "קניה וקמעונאות"
};

const signalCategories = {
  consumer_sentiment: [
    {
      category: "Conversation & Sentiment",
      icon: MessageSquare,
      types: [
        "Real time sentiment movement",
        "Daily positive and negative swings",
        "Early tension signals inside a category",
        "Complaints rising in one region",
        "Praise spikes for a specific flavor or product",
        "Changes in emotional tone in community threads",
        "Acceleration in long tail topics",
        "Consumer fatigue or boredom indicators",
        "New concerns spreading across social channels"
      ]
    },
    {
      category: "Voice of Consumer",
      icon: MessageSquare,
      types: [
        "Top quotes of the day",
        "Weekly quote collections",
        "Quotes that describe product usage occasions",
        "Quotes showing friction in purchase or usage",
        "Quotes from frustrated consumers",
        "Quotes showing enthusiasm for competing products",
        "Questions consumers ask repeatedly",
        "Consumer speculations about product ingredients"
      ]
    },
    {
      category: "Product Experience",
      icon: Zap,
      types: [
        "Texture complaints",
        "Taste complaints",
        "Smell complaints",
        "Packaging frustration",
        "Leakage or durability issues",
        "First time buyer reactions",
        "Repeat purchase reactions"
      ]
    },
    {
      category: "Search Behavior",
      icon: TrendingUp,
      types: [
        "Rising search questions",
        "Rapid increase in negative search queries",
        "Search intent clustering",
        "Brand comparison queries",
        "Rising how to use searches"
      ]
    },
    {
      category: "Conversation Patterns",
      icon: Radio,
      types: [
        "New memes related to product or category",
        "Viral posts involving a category",
        "Long threads discussing alternatives",
        "Movement toward do it yourself solutions",
        "Emotional drivers around claims"
      ]
    },
    {
      category: "Sensory Signals",
      icon: Sparkles,
      types: [
        "Scent preference spikes",
        "Sensitivity complaints",
        "Positive reactions to new sensorial experiences"
      ]
    }
  ],
  competitive_intelligence: [
    {
      category: "Messaging & Claims",
      icon: MessageSquare,
      types: [
        "Competitor claim changes",
        "Competitor message pivots",
        "New comparative angles",
        "Claims competitors are copying from smaller brands",
        "Claims competitors are abandoning"
      ]
    },
    {
      category: "Innovation & Products",
      icon: Sparkles,
      types: [
        "New SKU rumors from communities",
        "New pack size hints",
        "Formula changes",
        "Retailer exclusive SKUs",
        "Competitor sustainability claims",
        "Ingredient removal or addition detected in early conversations",
        "New benefit claims",
        "Competitor launch calendar indications"
      ]
    },
    {
      category: "Creative & Media",
      icon: Target,
      types: [
        "New advertising direction",
        "Rising positive or negative reactions to competitor ads",
        "Competitive campaigns gaining traction",
        "Content creators talking about competitors"
      ]
    },
    {
      category: "Social Buzz",
      icon: TrendingUp,
      types: [
        "Rising social volume for one competitor",
        "Mention spikes for a specific competitor SKU",
        "Competitor review clusters",
        "Sentiment changes toward a competitor",
        "Quotes comparing your brand to a competitor",
        "Community arguments about competitor products",
        "Complaint clusters about competitors",
        "Praise clusters about competitors",
        "Early product trial reactions"
      ]
    },
    {
      category: "Retail & Shelf",
      icon: ShoppingCart,
      types: [
        "Competitor availability fluctuations",
        "Sudden out of stock signals",
        "New competitor shelf messages",
        "Changes in competitor pricing",
        "Retailer promo patterns",
        "Shelf tag changes across stores"
      ]
    }
  ],
  trends_and_needs: [
    {
      category: "Ingredient Trends",
      icon: Sparkles,
      types: [
        "Fast rising micro ingredients",
        "Ingredient acceleration speed",
        "Declining interest in old ingredients",
        "Cross category ingredient migration",
        "Ingredient related health perceptions"
      ]
    },
    {
      category: "Claims & Benefits",
      icon: Target,
      types: [
        "Rising claims across communities",
        "Claims that map to emotional needs",
        "Claims consumers reject",
        "Claims linked to culture or identity",
        "New user crafted claims"
      ]
    },
    {
      category: "Cultural Drivers",
      icon: TrendingUp,
      types: [
        "Early cultural shifts affecting the category",
        "Movements in lifestyle patterns",
        "Bars gyms creators TikTok trends spilling into FMCG",
        "Mood and energy related needs",
        "Sleep and stress related behaviors"
      ]
    },
    {
      category: "Need States",
      icon: MessageSquare,
      types: [
        "New need states emerging",
        "Need states changing by season",
        "Occasion creation from unexpected groups",
        "Underserved need pockets",
        "Problems consumers solve with hacks"
      ]
    },
    {
      category: "Whitespace Signals",
      icon: Target,
      types: [
        "Unmet consumer needs",
        "Repeated pain points",
        "Gaps competitors do not cover",
        "Consumer workarounds",
        "New occasions forming"
      ]
    },
    {
      category: "Industry Specific",
      icon: Zap,
      types: [
        "Pet safety concerns",
        "Ingredient trust issues",
        "Vet influencer reactions",
        "Trust signals in baby categories",
        "Safety signals in baby categories",
        "Ingredient transparency discussions",
        "Efficacy doubts in OTC",
        "Side effect discussions",
        "Medical influencer opinions",
        "Rising home remedy interest",
        "Restaurant menu trend migration",
        "Flavors gaining traction at QSR",
        "Consumer requests copying restaurant experiences"
      ]
    }
  ],
  performance_and_messaging: [
    {
      category: "Message Clarity",
      icon: MessageSquare,
      types: [
        "Message clarity warnings",
        "Confusion signal clusters",
        "Claims not understood",
        "Claims resonating with specific groups",
        "Rising question volume about claims",
        "Misinterpretations of key messages"
      ]
    },
    {
      category: "Concept Strength",
      icon: Target,
      types: [
        "Early concept rejection",
        "Early concept appeal",
        "Micro concept ranking",
        "Before after shifts when exposed to a message",
        "Proof points consumers respond to"
      ]
    },
    {
      category: "Digital Reaction",
      icon: TrendingUp,
      types: [
        "Search uplift related to claims",
        "Click through changes",
        "Search symmetry between claims",
        "Message comparison snapshots"
      ]
    }
  ],
  shopper_and_retail: [
    {
      category: "Basket Behavior",
      icon: ShoppingCart,
      types: [
        "Basket affinity changes",
        "New trip triggers",
        "Occasion shifts",
        "Co purchase patterns changing",
        "Momentum of premium vs value"
      ]
    },
    {
      category: "Shelf & Conversion",
      icon: Target,
      types: [
        "Shelf blockers",
        "Shelf confusion",
        "Navigation issues",
        "Problems consumers mention in store",
        "Out of stock patterns",
        "Packaging confusion",
        "Price sensitivity signals"
      ]
    },
    {
      category: "Shopper Voice",
      icon: MessageSquare,
      types: [
        "Quotes describing store frustration",
        "Quotes about packaging or visibility",
        "Quotes explaining trade ups or trade downs",
        "Quotes about brand switching"
      ]
    }
  ]
};

const dataSources = [
  { id: "social", label: "Social media", icon: "💬" },
  { id: "reviews", label: "Reviews", icon: "⭐" },
  { id: "search", label: "Search trends", icon: "🔍" },
  { id: "communities", label: "Communities", icon: "👥" },
  { id: "commerce", label: "Commerce data", icon: "🛒" },
  { id: "crm", label: "CRM", icon: "📊" }
];

const dataSourceLabelsHe = {
  social: "רשתות חברתיות",
  reviews: "ביקורות",
  search: "מגמות חיפוש",
  communities: "קהילות",
  commerce: "נתוני מסחר",
  crm: "CRM"
};

const formatOptions = [
  { id: "short_summary", label: "Short summary" },
  { id: "visual_chart", label: "Visual chart" },
  { id: "comparison_table", label: "Comparison table" },
  { id: "top_five", label: "Top five highlights" },
  { id: "quotes_included", label: "Quotes included" },
  { id: "mixed_format", label: "Mixed format" }
];

const formatLabelsHe = {
  short_summary: "סיכום קצר",
  visual_chart: "תרשים ויזואלי",
  comparison_table: "טבלת השוואה",
  top_five: "חמש הנקודות המובילות",
  quotes_included: "כולל ציטוטים",
  mixed_format: "פורמט משולב"
};

const frequencyOptions = [
  { id: "realtime", label: "Real-time" },
  { id: "daily", label: "Daily" },
  { id: "twice_weekly", label: "Twice per week" },
  { id: "weekly", label: "Weekly" }
];

const frequencyLabelsHe = {
  realtime: "בזמן אמת",
  daily: "יומי",
  twice_weekly: "פעמיים בשבוע",
  weekly: "שבועי"
};

const mockCompanyData = {
  company: "Premium Beauty Co",
  competitors: ["Luxury Brand A", "Premium Brand B", "Elite Cosmetics"],
  products: ["Anti-Aging Serum", "Hydrating Cream", "Vitamin C Complex"],
  markets: ["North America", "Europe", "Asia Pacific"]
};

const getScopeRelevance = (signalType) => {
  const type = signalType.toLowerCase();
  
  return {
    products: type.includes('product') || type.includes('sku') || type.includes('performance') || type.includes('claim') || type.includes('flavor') || type.includes('pack'),
    competitors: type.includes('competitor') || type.includes('competitive') || type.includes('comparison'),
    regions: type.includes('region') || type.includes('market') || type.includes('geography') || type.includes('store'),
  };
};

const isQuantitativeSignal = (signalType) => {
  const type = signalType.toLowerCase();
  const quantitativeKeywords = [
    'volume', 'spike', 'rising', 'increase', 'decrease', 'growth', 'acceleration',
    'movement', 'changes', 'shifts', 'percentage', 'rate', 'momentum', 'velocity',
    'fluctuation', 'comparison', 'availability', 'pricing', 'affinity', 'patterns',
    'uplift', 'declining', 'spread', 'climb'
  ];
  
  return quantitativeKeywords.some(keyword => type.includes(keyword));
};

export default function SignalBuilder({ signal, onClose, onSave }) {
  const { isRTL } = useLanguage();
  const [step, setStep] = useState(0);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [preview, setPreview] = useState(null);
  
  const [config, setConfig] = useState({
    domain: signal?.domain || "",
    signal_type: signal?.signal_type || "",
    scope: signal?.scope || {
      category: mockCompanyData.company,
      products: [],
      competitors: [],
      regions: [],
      data_sources: []
    },
    format: signal?.format || "mixed_format",
    frequency: signal?.frequency || "daily",
    title: signal?.title || ""
  });

  useEffect(() => {
    if (config.domain && config.signal_type) {
      const domainLabel = signalDomains.find(d => d.id === config.domain)?.label || config.domain;
      setConfig(prev => ({ 
        ...prev, 
        title: `${config.signal_type} - ${domainLabel}`
      }));
    }
  }, [config.domain, config.signal_type]);

  const handleDomainSelect = (domain) => {
    setConfig(prev => ({ ...prev, domain: domain.id }));
    setStep(1);
  };

  const handleSignalTypeSelect = (type) => {
    setConfig(prev => ({ ...prev, signal_type: type }));
    setStep(2);
  };

  const toggleProduct = (product) => {
    setConfig(prev => ({
      ...prev,
      scope: {
        ...prev.scope,
        products: prev.scope.products.includes(product)
          ? prev.scope.products.filter(p => p !== product)
          : [...prev.scope.products, product]
      }
    }));
  };

  const toggleCompetitor = (competitor) => {
    setConfig(prev => ({
      ...prev,
      scope: {
        ...prev.scope,
        competitors: prev.scope.competitors.includes(competitor)
          ? prev.scope.competitors.filter(c => c !== competitor)
          : [...prev.scope.competitors, competitor]
      }
    }));
  };

  const toggleDataSource = (source) => {
    setConfig(prev => ({
      ...prev,
      scope: {
        ...prev.scope,
        data_sources: prev.scope.data_sources.includes(source)
          ? prev.scope.data_sources.filter(s => s !== source)
          : [...prev.scope.data_sources, source]
      }
    }));
  };

  const generatePreview = async () => {
    if (!config.domain || !config.signal_type || config.scope.data_sources.length === 0) return;
    
    setIsGeneratingPreview(true);
    setPreview(null);
    
    const needsChart = isQuantitativeSignal(config.signal_type);
    
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `Generate a realistic signal preview for FMCG/CPG industry:

Domain: ${config.domain}
Signal Type: ${config.signal_type}
Company: ${config.scope.category}
Products: ${config.scope.products.join(", ") || "All products"}
Competitors: ${config.scope.competitors.join(", ") || "Not specified"}
Data Sources: ${config.scope.data_sources.join(", ")}

Create a compelling preview with:
- Title that describes what's happening
- Brief description of what the signal captures
- Confidence score (70-95)
- Reasoning (2-3 sentences explaining the signal)
- 3-5 specific highlights
- 1-2 realistic consumer quotes if relevant
- Summary sentence

${needsChart ? `IMPORTANT: This is a quantitative signal. Generate realistic chart data:
- For time-based signals: provide 5-7 data points showing trend
- For comparisons: provide 3-5 items with values
- Include chart_type (line/bar/sparkline) and chart_label
- Make values realistic and show clear movement/pattern` : ''}`,
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            confidence: { type: "number" },
            reasoning: { type: "string" },
            highlights: { type: "array", items: { type: "string" } },
            quotes: { type: "array", items: { type: "string" } },
            summary: { type: "string" },
            ...(needsChart && {
              chart_data: {
                type: "object",
                properties: {
                  type: { type: "string" },
                  label: { type: "string" },
                  data: { type: "array" }
                }
              }
            })
          }
        }
      });

      setPreview(result);
    } catch (error) {
      console.error("Preview generation failed:", error);
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  useEffect(() => {
    if (step === 2 && config.domain && config.signal_type && config.scope.data_sources.length > 0 && !preview && !isGeneratingPreview) {
      generatePreview();
    }
  }, [step, config.domain, config.signal_type, config.scope.data_sources.length]);

  const saveSignalMutation = useMutation({
    mutationFn: async () => {
      if (signal) {
        return base44.entities.Signal.update(signal.id, config);
      } else {
        return base44.entities.Signal.create({
          ...config,
          active: true
        });
      }
    },
    onSuccess: () => {
      onSave();
    }
  });

  const scopeRelevance = getScopeRelevance(config.signal_type);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-900 mb-3">
              {isRTL ? 'בחר דומיין לסיגנל' : 'Select signal domain'}
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {signalDomains.map(domain => (
                <button
                  key={domain.id}
                  onClick={() => handleDomainSelect(domain)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                    config.domain === domain.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-900'
                  }`}
                >
                  <span className="text-lg">{domain.icon}</span>
                  <span className="text-sm font-medium">
                    {isRTL ? signalDomainLabelsHe[domain.id] || domain.label : domain.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      
      case 1:
        const categories = signalCategories[config.domain] || [];
        return (
          <div className="space-y-4">
            <button onClick={() => setStep(0)} className="text-xs text-slate-500 hover:text-slate-700 mb-2">
              {isRTL ? 'חזרה' : 'Back'}
            </button>
            <h3 className="text-sm font-medium text-slate-900 mb-3">
              {isRTL ? 'בחר סוג סיגנל' : 'Select signal type'}
            </h3>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              {categories.map((cat, idx) => {
                const IconComponent = cat.icon;
                return (
                  <div key={idx}>
                    <div className="flex items-center gap-2 mb-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                      <IconComponent className="w-3.5 h-3.5" />
                      {isRTL ? (signalCategoryLabelsHe[cat.category] || cat.category) : cat.category}
                    </div>
                    <div className="space-y-1">
                      {cat.types.map(type => (
                        <button
                          key={type}
                          onClick={() => handleSignalTypeSelect(type)}
                          className={`w-full px-3 py-2 rounded-lg transition-all text-left text-sm ${
                            config.signal_type === type
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-900'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <button onClick={() => setStep(1)} className="text-xs text-slate-500 hover:text-slate-700">
              {isRTL ? 'חזרה' : 'Back'}
            </button>

            {scopeRelevance.products && (
              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-3">
                  {isRTL ? 'מוצרי החברה (לא חובה)' : 'Your products (optional)'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mockCompanyData.products.map(product => (
                    <button
                      key={product}
                      onClick={() => toggleProduct(product)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        config.scope.products.includes(product)
                          ? 'bg-teal-100 text-teal-700 border-2 border-teal-500'
                          : 'bg-slate-100 text-slate-700 border-2 border-transparent hover:border-slate-300'
                      }`}
                    >
                      {product}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {scopeRelevance.competitors && (
              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-3">
                  {isRTL ? 'מתחרים למעקב (לא חובה)' : 'Competitors to monitor (optional)'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mockCompanyData.competitors.map(competitor => (
                    <button
                      key={competitor}
                      onClick={() => toggleCompetitor(competitor)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        config.scope.competitors.includes(competitor)
                          ? 'bg-teal-100 text-teal-700 border-2 border-teal-500'
                          : 'bg-slate-100 text-slate-700 border-2 border-transparent hover:border-slate-300'
                      }`}
                    >
                      {competitor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-3">
                {isRTL ? 'מקורות מידע *' : 'Data sources *'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {dataSources.map(source => (
                  <button
                    key={source.id}
                    onClick={() => toggleDataSource(source.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      config.scope.data_sources.includes(source.id)
                        ? 'bg-teal-100 text-teal-700 border-2 border-teal-500'
                        : 'bg-slate-100 text-slate-700 border-2 border-transparent hover:border-slate-300'
                    }`}
                  >
                    <span>{source.icon}</span>
                    {source.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-3">
                {isRTL ? 'פורמט' : 'Format'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {formatOptions.map(format => (
                  <button
                    key={format.id}
                    onClick={() => setConfig(prev => ({ ...prev, format: format.id }))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      config.format === format.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {format.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-slate-900 mb-3">
                {isRTL ? 'תדירות' : 'Frequency'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {frequencyOptions.map(freq => (
                  <button
                    key={freq.id}
                    onClick={() => setConfig(prev => ({ ...prev, frequency: freq.id }))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      config.frequency === freq.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {freq.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const isConfigComplete = config.domain && config.signal_type && config.scope.data_sources.length > 0;

  return (
    <div
      className="fixed inset-0 top-14 flex bg-[#FAFAFA]"
      style={isRTL ? { right: '256px' } : { left: '256px' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="w-96 border-r border-slate-200 bg-white flex flex-col">
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-semibold text-slate-900">
              {signal
                ? (isRTL ? 'עריכת סיגנל' : 'Edit Signal')
                : (isRTL ? 'יצירת סיגנל' : 'Create Signal')}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded transition-colors">
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {renderStepContent()}
        </div>

        <div className="border-t border-slate-200 p-4">
          <Button
            onClick={() => saveSignalMutation.mutate()}
            disabled={!isConfigComplete || !preview}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white"
          >
            {isRTL ? 'שמור מנוי סיגנל' : 'Save signal subscription'}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto" dir={isRTL ? 'rtl' : 'ltr'}>
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">
            {isRTL ? 'תצוגה מקדימה' : 'Preview'}
          </h3>
          
          <AnimatePresence mode="wait">
            {isGeneratingPreview ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-16"
              >
                <div className="text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-teal-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">
                    {isRTL ? 'יוצר תצוגה מקדימה...' : 'Generating preview...'}
                  </p>
                </div>
              </motion.div>
            ) : preview ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold text-slate-900 flex-1">{preview.title}</h3>
                  <div className="text-xs font-medium text-teal-600 ml-3">
                    {isRTL
                      ? `${preview.confidence}% ביטחון`
                      : `${preview.confidence}% confidence`}
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4">{preview.description}</p>

                <div className="text-xs text-slate-500 space-y-1 mb-4">
                  <div>
                    {isRTL ? 'דומיין: ' : 'Domain: '}
                    {signalDomains.find(d => d.id === config.domain)?.label}
                  </div>
                  <div>
                    {isRTL ? 'סוג סיגנל: ' : 'Signal Type: '}
                    {config.signal_type}
                  </div>
                  <div>
                    {isRTL ? 'טווח: ' : 'Scope: '}
                    {config.scope.competitors.length > 0 ? config.scope.competitors.join(", ") : config.scope.category}
                  </div>
                </div>

                {preview.highlights?.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                      {isRTL ? 'נקודות עיקריות' : 'Highlights'}
                    </div>
                    <div className="space-y-2">
                      {preview.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
                          <p className="text-sm text-slate-700">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {preview.chart_data && (
                  <div className="mb-4">
                    <SignalPreviewChart data={preview.chart_data} />
                  </div>
                )}

                {preview.quotes?.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                      {isRTL ? 'ציטוטים לדוגמה' : 'Sample Quotes'}
                    </div>
                    <div className="space-y-2">
                      {preview.quotes.map((quote, i) => (
                        <div key={i} className="bg-slate-50 border-l-2 border-teal-500 p-3 rounded">
                          <p className="text-sm italic text-slate-700">"{quote}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-4 pt-4 border-t border-slate-100">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                    {isRTL ? 'הסבר' : 'Reasoning'}
                  </div>
                  <p className="text-sm text-slate-700">{preview.reasoning}</p>
                </div>

                {preview.summary && (
                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                      {isRTL ? 'סיכום' : 'Summary'}
                    </div>
                    <p className="text-sm text-slate-700">{preview.summary}</p>
                  </div>
                )}
              </motion.div>
            ) : isConfigComplete ? (
              <motion.div
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Radio className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">
                  {isRTL ? 'ממתין ליצירת תצוגה מקדימה...' : 'Waiting to generate preview...'}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Radio className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">
                  {isRTL ? 'הגדר את הסיגנל כדי לראות תצוגה מקדימה' : 'Configure your signal to see a preview'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
