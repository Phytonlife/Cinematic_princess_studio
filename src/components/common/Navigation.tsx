import React from 'react';
import {
  Compass,
  CalendarCheck,
  Layers,
  BookOpen,
  Film,
  Award,
  Video,
  Radar,
  Cpu,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react';
import { UserRole } from '../../types';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

export type NavTab =
  | 'today'
  | 'curriculum'
  | 'tutorials'
  | 'studio'
  | 'skills'
  | 'filmstudy'
  | 'opportunities'
  | 'aitools'
  | 'parent'
  | 'portfolio';

interface NavigationProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentRole: UserRole;
  currentDay: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  currentRole,
  currentDay,
}) => {
  const { t, language } = useThemeLanguage();

  const navItems = [
    { id: 'today' as NavTab, label: t('nav_today'), icon: CalendarCheck, badge: language === 'ru' ? `День ${currentDay}` : `Day ${currentDay}`, highlight: true },
    { id: 'curriculum' as NavTab, label: t('nav_curriculum'), icon: Layers },
    { id: 'tutorials' as NavTab, label: t('nav_tutorials'), icon: BookOpen },
    { id: 'studio' as NavTab, label: t('nav_studio'), icon: Film },
    { id: 'skills' as NavTab, label: t('nav_skills'), icon: Award },
    { id: 'filmstudy' as NavTab, label: t('nav_filmstudy'), icon: Video },
    { id: 'opportunities' as NavTab, label: t('nav_opportunities'), icon: Radar },
    { id: 'aitools' as NavTab, label: t('nav_aitools'), icon: Cpu },
    { id: 'portfolio' as NavTab, label: t('nav_portfolio'), icon: Sparkles },
    ...(currentRole === 'parent'
      ? [{ id: 'parent' as NavTab, label: t('nav_parent'), icon: Settings }]
      : []),
  ];

  return (
    <>
      {/* Desktop / iPad Landscape Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800/80 bg-[#090b12] p-4 shrink-0 h-[calc(100vh-61px)] sticky top-[61px] overflow-y-auto">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 py-2 font-bold">
          {language === 'ru' ? 'НАВИГАЦИЯ СТУДИИ' : 'STUDIO NAVIGATION'}
        </div>
        <nav className="space-y-1 mt-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 whitespace-nowrap">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Studio Philosophy Note */}
        <div className="mt-auto pt-4 border-t border-slate-800/60 text-[11px] text-slate-400 p-2.5 bg-[#0c0f18] rounded-xl">
          <div className="font-semibold text-slate-300 mb-1">{t('nav_rule_title')}</div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            {t('nav_rule_desc')}
          </p>
        </div>
      </aside>

      {/* Mobile / Tablet Portrait Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090b12]/95 backdrop-blur-lg border-t border-slate-800 safe-bottom">
        <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
          {/* Learn / Curriculum */}
          <button
            onClick={() => onSelectTab('curriculum')}
            className={`flex flex-col items-center gap-1 p-1 text-[10px] font-medium transition ${
              activeTab === 'curriculum' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span>{language === 'ru' ? 'Курс' : 'Learn'}</span>
          </button>

          {/* Tutorials */}
          <button
            onClick={() => onSelectTab('tutorials')}
            className={`flex flex-col items-center gap-1 p-1 text-[10px] font-medium transition ${
              activeTab === 'tutorials' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>{language === 'ru' ? 'Уроки' : 'Library'}</span>
          </button>

          {/* LARGE CENTRAL TODAY BUTTON */}
          <button
            onClick={() => onSelectTab('today')}
            className="flex flex-col items-center -mt-5 transition group"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
              activeTab === 'today'
                ? 'bg-amber-400 text-slate-950 shadow-amber-500/40 ring-4 ring-amber-400/20'
                : 'bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/20'
            }`}>
              <CalendarCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-bold text-amber-400 mt-1 uppercase tracking-wider">
              {language === 'ru' ? 'СЕГОДНЯ' : 'TODAY'}
            </span>
          </button>

          {/* Studio Pipeline */}
          <button
            onClick={() => onSelectTab('studio')}
            className={`flex flex-col items-center gap-1 p-1 text-[10px] font-medium transition ${
              activeTab === 'studio' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Film className="w-5 h-5" />
            <span>{language === 'ru' ? 'Студия' : 'Studio'}</span>
          </button>

          {/* Skills / More */}
          <button
            onClick={() => onSelectTab(currentRole === 'parent' ? 'parent' : 'skills')}
            className={`flex flex-col items-center gap-1 p-1 text-[10px] font-medium transition ${
              activeTab === 'skills' || activeTab === 'parent'
                ? 'text-amber-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {currentRole === 'parent' ? (
              <Settings className="w-5 h-5" />
            ) : (
              <Award className="w-5 h-5" />
            )}
            <span>{currentRole === 'parent' ? (language === 'ru' ? 'Папа' : 'Dad') : (language === 'ru' ? 'Навыки' : 'Skills')}</span>
          </button>
        </div>
      </nav>
    </>
  );
};
