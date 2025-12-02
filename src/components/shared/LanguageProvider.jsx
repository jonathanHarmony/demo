import React, { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    // Sidebar
    "sidebar.harmony": "Harmony",
    "sidebar.new_quick_brief": "New Quick Brief",
    "sidebar.new_case": "New Case",
    "sidebar.tools": "Tools",
    "sidebar.playground": "Playground",
    "sidebar.recent_briefs": "Recent Briefs",
    "sidebar.cases": "Cases",
    "sidebar.view_all_history": "View All History",
    "sidebar.settings": "Settings",
    "sidebar.profile": "Profile",
    "sidebar.logout": "Logout",

    // Top Bar
    "topbar.harmony_research": "Harmony Research",

    // Quick Brief
    "quick.ask_placeholder": "Ask Harmony... (e.g., Why are consumers abandoning refill packaging?)",
    "quick.ask_harmony_title": "Ask Harmony anything..",
    "quick.generate": "Generate",
    "quick.generating": "Generating",
    "quick.recent": "Recent",
    "quick.followup_cost": "Each follow-up question costs 1 credit",
    "quick.chat_mode_label": "Chat mode: Ask questions freely about the report",
    "quick.chat_placeholder": "Ask me anything about this report...",
    "quick.followup_placeholder": "Ask a follow-up question...",

    // Case
    "case.new_case": "New Case",
    "case.case_title": "Case Title",
    "case.business_objective": "Business Objective (Optional)",
    "case.case_type": "Case Type",
    "case.regions": "Regions",
    "case.data_sources": "Data Sources",
    "case.output_language": "Output Language",
    "case.create_case": "Create Case",
    "case.cancel": "Cancel",
    "case.add_question": "Add Question",
    "case.questions": "Questions",
    "case.settings": "Settings",
    "case.sources": "Sources",
    "case.language": "Language",

    // Playground
    "playground.question_playground": "Question Playground",
    "playground.saved": "Saved",
    "playground.cases": "Cases",
    "playground.ready_to_launch": "Ready to Launch",
    "playground.save_all": "Save All",
    "playground.add_to_case": "Add to Case",
    "playground.run_now": "Run Now",
    "playground.send": "Send",
    "playground.type_placeholder": "Type your challenge or question...",

    // General
    "general.auto": "Auto",
    "general.qualitative": "Qual",
    "general.quantitative": "Quant",
    "general.credits": "credits",
    "general.per_question": "per question",

    // Models
    "models.unified_graph": "Unified Graph",
    "models.unified_graph_desc": "Combined model harmony plus internal for better results",
    "models.harmony_network": "Harmony Information Network",
    "models.harmony_network_desc": "Access to Harmony's knowledge graph",
    "models.org_info": "Organizational Information",
    "models.org_info_desc": "Internal company data and insights",

    // Sources
    "sources.title": "Sources",
    "sources.no_sources": "No sources attached",
    "sources.add_source": "Add source",

    // Thinking
    "thinking.researching": "Deep Research in Progress",
    "thinking.estimated_time": "Estimated time",
    "thinking.hours": "hours",
    "thinking.step1": "Searching across 10M+ social media posts...",
    "thinking.step2": "Analyzing consumer interviews and transcripts...",
    "thinking.step3": "Processing survey responses and sentiment data...",
    "thinking.step4": "Reviewing news articles and industry reports...",
    "thinking.step5": "Cross-referencing Harmony Knowledge Graph...",
    "thinking.step6": "Synthesizing insights and generating report...",
  },

  he: {
    // Sidebar
    "sidebar.harmony": "Harmony AI",
    "sidebar.new_quick_brief": "תקציר מהיר חדש",
    "sidebar.new_case": "מקרה חדש",
    "sidebar.tools": "כלים",
    "sidebar.playground": "מגרש משחקים",
    "sidebar.recent_briefs": "תקצירים אחרונים",
    "sidebar.cases": "מקרים",
    "sidebar.view_all_history": "הצג את כל ההיסטוריה",
    "sidebar.settings": "הגדרות",
    "sidebar.profile": "פרופיל",
    "sidebar.logout": "התנתק",

    // Top Bar
    "topbar.harmony_research": "מחקר הרמוני",

    // Quick Brief
    "quick.ask_placeholder": "שאל את הרמוני... (למשל, למה צרכנים נוטשים אריזות מילוי חוזר?)",
    "quick.ask_harmony_title": "שאל את הרמוני כל דבר..",
    "quick.generate": "צור",
    "quick.generating": "יוצר",
    "quick.recent": "אחרונים",
    "quick.followup_cost": "כל שאלה המשך עולה קרדיט אחד",
    "quick.chat_mode_label": "מצב צ'אט: אפשר לשאול בחופשיות על הדוח",
    "quick.chat_placeholder": "שאל אותי כל דבר על הדוח...",
    "quick.followup_placeholder": "שאל שאלה המשך...",

    // Case
    "case.new_case": "מקרה חדש",
    "case.case_title": "כותרת המקרה",
    "case.business_objective": "מטרת עסקית (אופציונלי)",
    "case.case_type": "סוג מקרה",
    "case.regions": "אזורים",
    "case.data_sources": "מקורות נתונים",
    "case.output_language": "שפת פלט",
    "case.create_case": "צור מקרה",
    "case.cancel": "בטל",
    "case.add_question": "הוסף שאלה",
    "case.questions": "שאלות",
    "case.settings": "הגדרות",
    "case.sources": "מקורות",
    "case.language": "שפה",

    // Playground
    "playground.question_playground": "מגרש שאלות",
    "playground.saved": "נשמר",
    "playground.cases": "מקרים",
    "playground.ready_to_launch": "מוכן להשקה",
    "playground.save_all": "שמור הכל",
    "playground.add_to_case": "הוסף למקרה",
    "playground.run_now": "הרץ עכשיו",
    "playground.send": "שלח",
    "playground.type_placeholder": "הקלד את האתגר או השאלה שלך...",

    // General
    "general.auto": "אוטומטי",
    "general.qualitative": "איכותי",
    "general.quantitative": "כמותי",
    "general.credits": "קרדיטים",
    "general.per_question": "לשאלה",

    // Models
    "models.unified_graph": "גרף משולב",
    "models.unified_graph_desc": "מודל משולב של הרמוני ופנימי לתוצאות טובות יותר",
    "models.harmony_network": "רשת המידע של הרמוני",
    "models.harmony_network_desc": "גישה לגרף הידע של הרמוני",
    "models.org_info": "מידע ארגוני",
    "models.org_info_desc": "נתונים ותובנות פנימיות של החברה",

    // Sources
    "sources.title": "מקורות",
    "sources.no_sources": "לא נוספו מקורות מידע",
    "sources.add_source": "הוסף מקור",
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('harmony_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('harmony_language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' || language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  const isRTL = language === 'he' || language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}