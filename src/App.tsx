/**
 * Animation Studio Academy
 * Personal 365-Day Family Animation Studio & Production Dashboard
 */

import React, { useState, useEffect } from 'react';
import { studioStorage } from './services/storageService';
import { StudioDatabaseState } from './types';
import { usePWA } from './hooks/usePWA';
import { Header } from './components/common/Header';
import { Navigation, NavTab } from './components/common/Navigation';
import { OfflineBanner } from './components/common/OfflineBanner';
import { PWAInstallModal } from './components/common/PWAInstallModal';
import { FocusModeModal } from './components/common/FocusModeModal';
import { BackupModal } from './components/common/BackupModal';

import { TodayView } from './components/today/TodayView';
import { CurriculumView } from './components/curriculum/CurriculumView';
import { TutorialLibraryView } from './components/tutorials/TutorialLibraryView';
import { StudioHubView } from './components/studio/StudioHubView';
import { StudioFilesView } from './components/files/StudioFilesView';
import { SkillTreeView } from './components/skilltree/SkillTreeView';
import { FilmStudyView } from './components/filmstudy/FilmStudyView';
import { OpportunitiesView } from './components/opportunities/OpportunitiesView';
import { AIToolWatchView } from './components/aitools/AIToolWatchView';
import { ParentDashboardView } from './components/parent/ParentDashboardView';
import { PortfolioView } from './components/portfolio/PortfolioView';
import { ThemeLanguageProvider, useThemeLanguage } from './context/ThemeLanguageContext';

function StudioAcademyApp() {
  const [state, setState] = useState<StudioDatabaseState>(studioStorage.getState());
  const [activeTab, setActiveTab] = useState<NavTab>('today');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(state.stats.currentDay);
  const [isFocusModeOpen, setIsFocusModeOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);

  const { isInstallable, isInstalled, isIOS, isOnline, install } = usePWA();
  const { theme } = useThemeLanguage();

  useEffect(() => {
    const unsubscribe = studioStorage.subscribe(() => {
      setState({ ...studioStorage.getState() });
    });
    return unsubscribe;
  }, []);

  // Resolve current active lesson day
  const getSelectedLesson = () => {
    for (const week of state.weeks) {
      for (const day of week.days) {
        if (day.dayNumber === selectedDayNumber) {
          return day;
        }
      }
    }
    return state.weeks[0].days[0];
  };

  const currentLesson = getSelectedLesson();

  const handleSelectDay = (dayNum: number) => {
    setSelectedDayNumber(dayNum);
    setActiveTab('today');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Collect all completed lesson items for portfolio
  const completedLessonsList = state.weeks
    .flatMap(w => w.days)
    .filter(d => d.completed);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme === 'light' ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#0b0d14] text-slate-100'} flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200`}>
      {/* Offline Status Warning */}
      <OfflineBanner isOnline={isOnline} />

      {/* Primary Header with RU/EN and Light/Dark Toggles */}
      <Header
        stats={state.stats}
        currentRole={state.currentRole}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        onOpenFocusMode={() => setIsFocusModeOpen(true)}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
        isInstalled={isInstalled}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Navigation Sidebar (Desktop & Tablet Landscape) */}
        <Navigation
          activeTab={activeTab}
          onSelectTab={tab => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          currentRole={state.currentRole}
          currentDay={state.stats.currentDay}
        />

        {/* Dynamic Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 max-w-7xl mx-auto overflow-x-hidden">
          {activeTab === 'today' && (
            <TodayView
              lesson={currentLesson}
              onLaunchFocusMode={() => setIsFocusModeOpen(true)}
              onSelectDay={handleSelectDay}
              totalDaysCompleted={state.stats.totalDaysCompleted}
              onNavigateToFiles={() => {
                setActiveTab('files');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'curriculum' && (
            <CurriculumView
              weeks={state.weeks}
              currentRole={state.currentRole}
              currentDay={state.stats.currentDay}
              onSelectDay={handleSelectDay}
            />
          )}

          {activeTab === 'tutorials' && (
            <TutorialLibraryView tutorials={state.tutorials} />
          )}

          {activeTab === 'studio' && (
            <StudioHubView
              projects={state.projects}
              characters={state.characters}
              shots={state.shots}
              provenance={state.provenance}
            />
          )}

          {activeTab === 'files' && (
            <StudioFilesView
              currentLesson={currentLesson}
              onOpenBackupModal={() => setIsBackupModalOpen(true)}
            />
          )}

          {activeTab === 'skills' && (
            <SkillTreeView skills={state.skills} />
          )}

          {activeTab === 'filmstudy' && (
            <FilmStudyView />
          )}

          {activeTab === 'opportunities' && (
            <OpportunitiesView opportunities={state.opportunities} />
          )}

          {activeTab === 'aitools' && (
            <AIToolWatchView tools={state.aiTools} />
          )}

          {activeTab === 'portfolio' && (
            <PortfolioView
              projects={state.projects}
              characters={state.characters}
              completedLessons={completedLessonsList}
            />
          )}

          {activeTab === 'parent' && (
            <ParentDashboardView state={state} />
          )}
        </main>
      </div>

      {/* Focus Mode Fullscreen Modal for iPad & Deep Study */}
      <FocusModeModal
        lesson={currentLesson}
        isOpen={isFocusModeOpen}
        onClose={() => setIsFocusModeOpen(false)}
      />

      {/* PWA Guided Installation Modal */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        isIOS={isIOS}
        onInstallChromium={install}
      />

      {/* Studio Progress Backup & Restore Modal */}
      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        stats={state.stats}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeLanguageProvider>
      <StudioAcademyApp />
    </ThemeLanguageProvider>
  );
}
