import React from 'react';
import {
  Sparkles,
  Flame,
  User,
  Smartphone,
  Maximize2,
  Check,
  Sun,
  Moon,
  Database,
} from 'lucide-react';
import { UserRole, StudioUserStats } from '../../types';
import { studioStorage } from '../../services/storageService';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

interface HeaderProps {
  stats: StudioUserStats;
  currentRole: UserRole;
  onOpenInstallModal: () => void;
  onOpenFocusMode: () => void;
  onOpenBackupModal: () => void;
  isInstalled: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  currentRole,
  onOpenInstallModal,
  onOpenFocusMode,
  onOpenBackupModal,
  isInstalled,
}) => {
  const { language, setLanguage, theme, toggleTheme, t } = useThemeLanguage();

  const toggleRole = () => {
    const nextRole: UserRole = currentRole === 'student' ? 'parent' : 'student';
    studioStorage.setRole(nextRole);
  };

  return (
    <header className="border-b border-slate-800/80 bg-[#0b0d14]/90 backdrop-blur-md sticky top-0 z-40 px-3 sm:px-4 lg:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Studio Identity & Day Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 text-xs tracking-wider shrink-0">
            ASA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white hidden md:inline">
                {t('app_title')}
              </span>
              <span className="font-bold text-sm tracking-tight text-white md:hidden">
                {t('app_short')}
              </span>
              <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold whitespace-nowrap">
                {t('day_badge', { day: stats.currentDay })}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 hidden lg:block truncate max-w-xs">
              {t('active_mission')} <span className="text-slate-200">{stats.activeFilm}</span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Toggles */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* LANGUAGE SELECTOR RU / EN */}
          <div className="flex items-center bg-[#101422] border border-slate-800 rounded-xl p-0.5 text-xs font-bold shadow-sm">
            <button
              onClick={() => setLanguage('ru')}
              className={`px-2 py-1 rounded-lg transition text-[11px] font-mono ${
                language === 'ru'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : theme === 'light'
                  ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              title="Переключить на русский язык"
              aria-label="Русский язык"
            >
              RU
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg transition text-[11px] font-mono ${
                language === 'en'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : theme === 'light'
                  ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
              title="Switch to English"
              aria-label="English language"
            >
              EN
            </button>
          </div>

          {/* THEME TOGGLE: LIGHT / DARK */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition shadow-sm ${
              theme === 'light'
                ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800 hover:text-amber-600'
                : 'bg-[#101422] hover:bg-slate-800/80 border-slate-800 text-slate-300 hover:text-amber-400'
            }`}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Переключить на тёмную тему'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Streak Indicator */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold"
            title="Daily Production Streak"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 shrink-0" />
            <span>{t('streak_label', { days: stats.streakDays })}</span>
          </div>

          {/* XP Indicator */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold"
            title="Studio Experience Points"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{t('xp_label', { xp: stats.totalXp })}</span>
          </div>

          {/* Studio Backup Quick Action */}
          <button
            onClick={onOpenBackupModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-xs font-semibold text-slate-200 hover:text-white transition shadow-sm"
            title={language === 'ru' ? 'Резервная копия студии (Экспорт / Импорт JSON)' : 'Studio Backup (Export / Restore JSON)'}
          >
            <Database className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">{language === 'ru' ? 'Бэкап' : 'Backup'}</span>
          </button>

          {/* Focus Mode Quick Action (iPad friendly) */}
          <button
            onClick={onOpenFocusMode}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-xs font-medium text-slate-200 hover:text-white transition"
            title="Launch Distraction-Free Focus Mode for iPad"
          >
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('focus_mode')}</span>
          </button>

          {/* PWA Install Button */}
          {!isInstalled ? (
            <button
              onClick={onOpenInstallModal}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 hover:text-white text-xs font-medium transition"
              title="Install PWA on device"
            >
              <Smartphone className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('install_app')}</span>
            </button>
          ) : (
            <div className="hidden xl:flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              <Check className="w-3 h-3" />
              <span>{t('installed')}</span>
            </div>
          )}

          {/* Role Switcher */}
          <button
            onClick={toggleRole}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition ${
              currentRole === 'parent'
                ? 'bg-purple-600/20 border-purple-500/40 text-purple-300 hover:bg-purple-600/30'
                : 'bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25'
            }`}
            title="Switch between Student and Dad view"
          >
            <User className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">
              {currentRole === 'student' ? t('role_student') : t('role_dad')}
            </span>
            <span className="sm:hidden">
              {currentRole === 'student' ? 'Aila' : 'Dad'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
