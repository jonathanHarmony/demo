
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Home, Zap, FolderOpen, Clock, Settings, User, Globe, Lightbulb, ChevronDown, Radio, LayoutGrid } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import CreditBalance from "@/components/shared/CreditBalance";
import { LanguageProvider, useLanguage } from "@/components/shared/LanguageProvider";
import { ModelSelectorProvider, useModelSelector, researchModels } from "@/components/shared/ModelSelectorContext";

function LayoutContent({ children, currentPageName }) {
  const location = useLocation();
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => base44.auth.me(),
  });
  const { t, language, setLanguage, isRTL } = useLanguage();
  const { selectedModel, setSelectedModel, currentModel } = useModelSelector();

  const { data: recentBriefs = [] } = useQuery({
    queryKey: ['recent-briefs'],
    queryFn: () => base44.entities.ResearchBrief.list('-created_date', 5),
  });

  const navItems = [
    { icon: Home, label: "Home", path: createPageUrl("Home") },
    { icon: Zap, label: "Quick Brief", path: createPageUrl("Home") + "?tab=quick" },
    { icon: FolderOpen, label: "Cases", path: createPageUrl("Home") + "?tab=case" },
    { icon: Clock, label: "History", path: createPageUrl("Home") },
  ];

  const isActive = (path) => {
    if (path === createPageUrl("Home")) {
      return location.pathname === path && !location.search;
    }
    return location.pathname + location.search === path;
  };

  const languageOptions = [
    { code: 'en', label: 'English', native: 'EN' },
    { code: 'he', label: 'Hebrew', native: 'עב' },
  ];

  const currentLang = languageOptions.find(l => l.code === language) || languageOptions[0];

  return (
    <div className="min-h-screen bg-[#FAFAFA]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Left Sidebar */}
      <aside className={`fixed ${isRTL ? 'right-0' : 'left-0'} top-0 h-full w-56 border-${isRTL ? 'l' : 'r'} border-slate-200 bg-white z-50 flex flex-col`}>
        {/* Logo & New Actions */}
        <div className="p-4 border-b border-slate-200">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 rounded bg-slate-900 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <span className="text-sm font-semibold text-slate-900">{t('sidebar.harmony')}</span>
          </Link>

          <div className="space-y-2">
            <Link
              to={createPageUrl("Home") + "?tab=quick"}
              className={`flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors ${isRTL ? 'flex-row-reverse justify-end text-right' : ''}`}
            >
              <Zap className="w-3.5 h-3.5" />
              {t('sidebar.new_quick_brief')}
            </Link>
            <Link
              to={createPageUrl("Home") + "?tab=case"}
              className={`flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded transition-colors ${isRTL ? 'flex-row-reverse justify-end text-right' : ''}`}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              {t('sidebar.new_case')}
            </Link>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {/* Tools Section */}
          <div className="mb-6">
            <div className={`text-[10px] font-medium text-slate-500 uppercase tracking-wider px-3 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {t('sidebar.tools')}
            </div>
            <div className="space-y-1">
              <Link
                to={createPageUrl("Playground")}
                className={`flex items-center gap-2 px-3 py-2 text-xs rounded transition-colors ${isRTL ? 'flex-row-reverse justify-end text-right' : ''} ${location.pathname === createPageUrl("Playground")
                  ? 'bg-slate-100 text-slate-900 font-medium'
                  : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {isRTL ? 'מעבדת מחקר' : 'Research Playground'}
              </Link>
              <Link
                to={createPageUrl("SignalsHub")}
                className={`flex items-center gap-2 px-3 py-2 text-xs rounded transition-colors ${isRTL ? 'flex-row-reverse justify-end text-right' : ''} ${location.pathname === createPageUrl("SignalsHub")
                  ? 'bg-slate-100 text-slate-900 font-medium'
                  : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <Radio className="w-3.5 h-3.5" />
                Signals Hub
              </Link>
              <Link
                to={createPageUrl("QuickBriefWorkspace")}
                className={`flex items-center gap-2 px-3 py-2 text-xs rounded transition-colors ${isRTL ? 'flex-row-reverse justify-end text-right' : ''} ${location.pathname === createPageUrl("QuickBriefWorkspace")
                  ? 'bg-slate-100 text-slate-900 font-medium'
                  : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                {isRTL ? 'מרחב עבודה' : 'Canvas Workspace'}
              </Link>
              <Link
                to={createPageUrl("DeepResearch")}
                className={`flex items-center gap-2 px-3 py-2 text-xs rounded transition-colors ${isRTL ? 'flex-row-reverse justify-end text-right' : ''} ${location.pathname === createPageUrl("DeepResearch")
                  ? 'bg-slate-100 text-slate-900 font-medium'
                  : 'text-slate-700 hover:bg-slate-50'
                  }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                {isRTL ? 'מחקר מעמיק' : 'Deep Research'}
              </Link>
            </div>
          </div>

          {/* Recent Briefs */}
          <div className="mb-6">
            <div className={`text-[10px] font-medium text-slate-500 uppercase tracking-wider px-3 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {t('sidebar.recent_briefs')}
            </div>
            <div className="space-y-1">
              {recentBriefs.length > 0 ? (
                recentBriefs.map((brief) => (
                  <Link
                    key={brief.id}
                    to={createPageUrl("Home") + "?tab=quick&brief=" + brief.id}
                    className={`w-full text-${isRTL ? 'right' : 'left'} px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded transition-colors line-clamp-1 block`}
                  >
                    {brief.question}
                  </Link>
                ))
              ) : (
                <div className="px-3 py-2 text-xs text-slate-400">No recent briefs</div>
              )}
            </div>
          </div>

          {/* Cases */}
          <div className="mb-6">
            <div className={`text-[10px] font-medium text-slate-500 uppercase tracking-wider px-3 mb-2 ${isRTL ? 'text-right' : ''}`}>
              {t('sidebar.cases')}
            </div>
            <div className="space-y-1">
              <Link
                to="/report2"
                className={`w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded transition-colors line-clamp-1 block ${isRTL ? 'text-right' : 'text-left'}`}
              >
                שביעות רצון cowfree
              </Link>
              <Link
                to="/report3"
                className={`w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded transition-colors line-clamp-1 block ${isRTL ? 'text-right' : 'text-left'}`}
              >
                Cowfree Satisfaction (EN)
              </Link>
            </div>
          </div>

          {/* History */}
          <div>
            <Link
              to={createPageUrl("Home")}
              className={`flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded transition-colors ${isRTL ? 'flex-row-reverse justify-end text-right' : ''}`}
            >
              <Clock className="w-3.5 h-3.5" />
              {t('sidebar.view_all_history')}
            </Link>
          </div>
        </nav>

        {/* Bottom User & Settings */}
        <div className="border-t border-slate-200 p-3 space-y-1">
          <button className={`flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded transition-colors ${isRTL ? 'flex-row-reverse justify-end text-right' : ''}`}>
            <Settings className="w-3.5 h-3.5" />
            {t('sidebar.settings')}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`flex items-center gap-2 w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded transition-colors ${isRTL ? 'flex-row-reverse justify-end text-right' : ''}`}>
                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <span className={`flex-1 ${isRTL ? 'text-right' : 'text-left'} truncate`}>{user?.full_name || 'User'}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>{t('sidebar.profile')}</DropdownMenuItem>
              <DropdownMenuItem>{t('sidebar.settings')}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => base44.auth.logout()}>{t('sidebar.logout')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={isRTL ? 'mr-56' : 'ml-56'}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-8 h-14 flex items-center gap-4">
            {/* User Controls - Language, Credits, Profile - positioned first (left) */}
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className={`h-8 px-2 text-slate-600 hover:text-slate-900 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Globe className={`w-3.5 h-3.5 ${isRTL ? 'ml-1.5' : 'mr-1.5'}`} />
                    <span className="text-xs">{currentLang.native}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languageOptions.map(lang => (
                    <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <CreditBalance available={250} total={300} />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-slate-600" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => base44.auth.logout()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Model Selector - positioned after user controls */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-slate-50 transition-colors rounded px-2 py-1.5 border border-slate-200">
                  <span className="text-sm">{currentModel.icon}</span>
                  <span className="text-xs font-medium text-slate-900">{t(currentModel.labelKey)}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                {researchModels.map((model) => (
                  <DropdownMenuItem
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className="flex items-start gap-3 p-3 cursor-pointer"
                  >
                    <span className="text-base mt-0.5">{model.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900 mb-0.5">{t(model.labelKey)}</div>
                      <div className="text-xs text-slate-500">{t(model.descriptionKey)}</div>
                    </div>
                    {selectedModel === model.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <LanguageProvider>
      <ModelSelectorProvider>
        <LayoutContent children={children} currentPageName={currentPageName} />
      </ModelSelectorProvider>
    </LanguageProvider>
  );
}
