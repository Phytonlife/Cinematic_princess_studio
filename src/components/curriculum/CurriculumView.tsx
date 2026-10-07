import React, { useState } from 'react';
import {
  WeekModule,
  PhaseInfo,
  UserRole,
  LessonDay,
} from '../../types';
import { PHASES_INFO } from '../../data/curriculumData';
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Sliders,
  Check,
  AlertTriangle,
  PlayCircle,
  FileCode,
} from 'lucide-react';
import { studioStorage } from '../../services/storageService';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

interface CurriculumViewProps {
  weeks: WeekModule[];
  currentRole: UserRole;
  currentDay: number;
  onSelectDay: (dayNumber: number) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  weeks,
  currentRole,
  currentDay,
  onSelectDay,
}) => {
  const { t, language } = useThemeLanguage();
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  const [expandedWeek, setExpandedWeek] = useState<number>(1);
  const [showParentUpdateModal, setShowParentUpdateModal] = useState<boolean>(false);
  const [updateAuditNotes, setUpdateAuditNotes] = useState<string>('Refreshed tool stack with latest Veo 2 and Blender 4.3 LTS');
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState<string | null>(null);

  const activePhase = PHASES_INFO.find(p => p.phaseNumber === selectedPhase) || PHASES_INFO[0];
  const phaseWeeks = weeks.filter(w => w.phaseNumber === selectedPhase);

  const handleParentUpdate = () => {
    // Current week number
    const currentWeekNum = Math.ceil(currentDay / 7);
    studioStorage.updateUpcomingCurriculum(currentWeekNum + 1, updateAuditNotes);
    setShowParentUpdateModal(false);
    setUpdateSuccessMsg(language === 'ru' 
      ? `Будущая программа (Недели ${currentWeekNum + 1}–52) успешно актуализирована без изменения прошлых уроков!`
      : `Future curriculum (Weeks ${currentWeekNum + 1}–52) audited successfully without touching past lessons!`);
    setTimeout(() => setUpdateSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner & Parent Action */}
      <div className="bg-[#101422] border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              {t('curriculum_badge')}
            </span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-400">{t('curriculum_meta')}</span>
          </div>
          <h1 className="text-2xl font-black text-white">{t('curriculum_title')}</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {t('curriculum_desc')}
          </p>
        </div>

        {currentRole === 'parent' && (
          <button
            onClick={() => setShowParentUpdateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-bold transition shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t('update_curriculum_btn')}</span>
          </button>
        )}
      </div>

      {updateSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{updateSuccessMsg}</span>
        </div>
      )}

      {/* 12 Phase Selector Tabs */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {PHASES_INFO.map(phase => {
            const isSelected = selectedPhase === phase.phaseNumber;
            return (
              <button
                key={phase.phaseNumber}
                onClick={() => setSelectedPhase(phase.phaseNumber)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-[#101422] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{language === 'ru' ? `Фаза ${phase.phaseNumber}` : `Phase ${phase.phaseNumber}`}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${isSelected ? 'bg-slate-900/20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                  {phase.weeksRange}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Phase Overview Box */}
      <div className="bg-[#0b0e18] border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-bold">
            {t('phase_goal', { phase: activePhase.phaseNumber })}
          </span>
          <h2 className="text-xl font-bold text-white mt-0.5">{activePhase.title}</h2>
          <p className="text-xs text-slate-300 mt-1">{activePhase.description}</p>
        </div>
        <div className="bg-[#121626] border border-slate-800 rounded-xl p-3 shrink-0 text-xs">
          <div className="text-slate-400 text-[10px] uppercase font-mono">{t('target_deliverable')}</div>
          <div className="font-semibold text-emerald-400 mt-0.5">{activePhase.targetArtifact}</div>
        </div>
      </div>

      {/* Weeks list inside selected Phase */}
      <div className="space-y-4">
        {phaseWeeks.map(week => {
          const isExpanded = expandedWeek === week.weekNumber;
          const completedDaysInWeek = week.days.filter(d => d.completed).length;
          const totalDaysInWeek = week.days.length;

          return (
            <div
              key={week.weekNumber}
              className="bg-[#101422] border border-slate-800 rounded-2xl overflow-hidden transition"
            >
              {/* Week Accordion Header */}
              <button
                onClick={() => setExpandedWeek(isExpanded ? 0 : week.weekNumber)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-[#14192b]/50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-mono font-bold text-sm text-amber-400 shrink-0">
                    W{week.weekNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-snug">
                      {language === 'ru' ? `Неделя ${week.weekNumber}: ${week.title}` : `Week ${week.weekNumber}: ${week.title}`}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {week.focusSummary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-mono font-medium text-slate-300">
                      {completedDaysInWeek} / {totalDaysInWeek} {language === 'ru' ? 'дней' : 'days'}
                    </span>
                    <div className="text-[10px] text-emerald-400 font-mono">
                      {week.milestoneArtifact}
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Week Days List */}
              {isExpanded && (
                <div className="border-t border-slate-800/80 bg-[#0c0f18] p-4 sm:p-5 space-y-3">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono pb-2 border-b border-slate-800/40">
                    <span>{t('week_milestone')} <strong className="text-amber-300">{week.milestoneArtifact}</strong></span>
                    <span>{week.targetDurationWeeklyMinutes} MIN TOTAL TIME</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {week.days.map(day => (
                      <div
                        key={day.id}
                        className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                          day.dayNumber === currentDay
                            ? 'bg-amber-500/10 border-amber-500/40'
                            : day.completed
                            ? 'bg-[#101422] border-emerald-500/20'
                            : 'bg-[#101422] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => onSelectDay(day.dayNumber)}
                            className="mt-0.5 shrink-0"
                          >
                            {day.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-500 hover:text-amber-400" />
                            )}
                          </button>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-mono text-amber-400 font-bold">
                                {language === 'ru' ? `ДЕНЬ ${day.dayNumber}` : `DAY ${day.dayNumber}`}
                              </span>
                              {day.isFilmStudy && (
                                <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded">
                                  FILM STUDY
                                </span>
                              )}
                              {day.dayNumber === currentDay && (
                                <span className="text-[10px] font-mono bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded">
                                  {language === 'ru' ? 'СЕГОДНЯ' : 'CURRENT TODAY'}
                                </span>
                              )}
                            </div>
                            <h4 className="font-semibold text-white text-sm mt-0.5">
                              {day.title}
                            </h4>
                            <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                              <span>Skill: <strong className="text-slate-300">{day.skill}</strong></span>
                              <span>·</span>
                              <span>Time: {day.estimatedMinutes} min</span>
                              <span>·</span>
                              <span>Result: <code className="text-emerald-300 font-mono text-[11px]">{day.expectedResult}</code></span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <a
                            href={day.tutorial.verifiedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                            title="Open Official Lesson Link"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => onSelectDay(day.dayNumber)}
                            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
                          >
                            {t('go_to_day')}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Parent Admin Update Curriculum Modal */}
      {showParentUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121624] border border-purple-500/40 rounded-2xl p-6 max-w-lg w-full text-slate-200 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Update Upcoming Curriculum</h3>
                <p className="text-xs text-slate-400">Director Father Control · Safe Forward Audit</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-300 leading-relaxed">
                <strong>Safety Rule Enforced:</strong> This action only reviews and refreshes FUTURE weeks (Week {Math.ceil(currentDay / 7) + 1} to 52). All completed lessons, past streak records, and saved files will NEVER be altered.
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  Audit Notes &amp; Pipeline Stack Update
                </label>
                <textarea
                  value={updateAuditNotes}
                  onChange={e => setUpdateAuditNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-[#0d0f17] border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500"
                  placeholder="e.g. Audited for Veo 2, updated Runway references to Gen-4, verified Blender 4.3 LTS..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowParentUpdateModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleParentUpdate}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow-lg shadow-purple-500/20"
              >
                Apply Future Curriculum Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
