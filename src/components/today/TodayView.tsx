import React, { useState } from 'react';
import {
  ExternalLink,
  CheckCircle2,
  Circle,
  Sparkles,
  Upload,
  FileCode,
  Maximize2,
  Film,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Camera,
  Check,
  PlayCircle,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { LessonDay } from '../../types';
import { studioStorage } from '../../services/storageService';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

interface TodayViewProps {
  lesson: LessonDay;
  onLaunchFocusMode: () => void;
  onSelectDay: (dayNumber: number) => void;
  totalDaysCompleted: number;
}

export const TodayView: React.FC<TodayViewProps> = ({
  lesson,
  onLaunchFocusMode,
  onSelectDay,
  totalDaysCompleted,
}) => {
  const { t, language } = useThemeLanguage();
  const [submissionNote, setSubmissionNote] = useState(lesson.submissionNote || '');
  const [artifactName, setArtifactName] = useState(lesson.artifactName || lesson.expectedResult);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(lesson.artifactDataUrl || null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showQnA, setShowQnA] = useState(false);

  const handleToggleCheck = (checkId: string) => {
    studioStorage.toggleChecklistItem(lesson.id, checkId);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArtifactName(file.name);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = ev => {
          setUploadedPreview(ev.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleComplete = () => {
    studioStorage.completeDay(
      lesson.id,
      submissionNote || (language === 'ru' ? 'Выполнено на iPad в Studio Academy' : 'Completed on iPad Studio Academy'),
      artifactName,
      uploadedPreview || undefined
    );
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Mission Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121727] via-[#0d101d] to-[#090b14] border border-slate-800/80 p-6 sm:p-8 shadow-2xl">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300">
                {t('today_hero_badge', { day: lesson.dayNumber })}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {t('today_phase_week', { phase: lesson.phaseNumber, week: lesson.weekNumber })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectDay(Math.max(1, lesson.dayNumber - 1))}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
                title={t('prev_day')}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectDay(Math.min(365, lesson.dayNumber + 1))}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
                title={t('next_day')}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onLaunchFocusMode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition shadow-md shadow-amber-500/20"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{t('focus_mode')}</span>
              </button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
            {lesson.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t('today_skill_label')} <strong className="text-white">{lesson.skill}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{t('today_time_label')} <strong className="text-white">{lesson.estimatedMinutes} min</strong></span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Film className="w-4 h-4 text-purple-400" />
              <span>{t('today_result_label')} <code className="text-emerald-300 font-mono text-xs">{lesson.expectedResult}</code></span>
            </div>
          </div>

          {/* Quick 7 Questions Toggle for Clarity */}
          <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between">
            <button
              onClick={() => setShowQnA(!showQnA)}
              className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1.5 transition"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showQnA ? t('today_qna_hide') : t('today_qna_show')}</span>
            </button>
            <span className="text-xs text-amber-400/80 font-mono">
              {t('today_xp_reward', { xp: lesson.xpReward })}
            </span>
          </div>

          {showQnA && (
            <div className="mt-3 p-4 rounded-2xl bg-[#090c15] border border-slate-800 text-xs space-y-2 text-slate-300 animate-in fade-in">
              <div><strong className="text-amber-400">{t('q1')}</strong> {lesson.skill} — {lesson.title}</div>
              <div><strong className="text-amber-400">{t('q2')}</strong> {lesson.tutorial.source} ({lesson.tutorial.title})</div>
              <div><strong className="text-amber-400">{t('q3')}</strong> {lesson.practicalTask}</div>
              <div><strong className="text-amber-400">{t('q4')}</strong> {lesson.estimatedMinutes} {language === 'ru' ? 'минут' : 'minutes'}.</div>
              <div><strong className="text-amber-400">{t('q5')}</strong> <span className="font-mono text-emerald-300">{lesson.expectedResult}</span></div>
              <div><strong className="text-amber-400">{t('q6')}</strong> {language === 'ru' ? `День ${lesson.dayNumber + 1} продолжит развивать этот материал.` : `Day ${lesson.dayNumber + 1} builds on this exact asset.`}</div>
              <div><strong className="text-amber-400">{t('q7')}</strong> {lesson.whyItMatters}</div>
            </div>
          )}
        </div>
      </div>

      {/* Main 2-Column Workflow Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Learn, Watch, Do (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 2. WHY */}
          <div className="bg-[#101422] border border-slate-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>{t('step_2_why')}</span>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">
              {lesson.whyItMatters}
            </p>
          </div>

          {/* 3. LEARN & WATCH */}
          <div className="bg-[#101422] border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                {t('step_3_learn')} &amp; {t('step_4_watch')}
              </div>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                {t('official_source_badge')}
              </span>
            </div>

            <div className="bg-[#0b0e18] border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-white text-base leading-snug">
                  {lesson.tutorial.title}
                </h3>
                <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>{language === 'ru' ? 'Источник:' : 'Source:'} <strong className="text-slate-300">{lesson.tutorial.source}</strong></span>
                  <span>·</span>
                  <span>{lesson.tutorial.durationMinutes} min</span>
                  <span>·</span>
                  <span>{lesson.tutorial.language}</span>
                </div>
              </div>

              <a
                href={lesson.tutorial.verifiedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shrink-0 shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <span>{t('open_lesson')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200/90 font-medium">
              <strong className="text-amber-300 font-mono block mb-0.5">{language === 'ru' ? 'ТОЧНЫЙ ФРАГМЕНТ ДЛЯ ПРОСМОТРА:' : 'EXACT PART TO WATCH:'}</strong>
              {lesson.watchSegment}
            </div>
          </div>

          {/* 5. DO (PRACTICAL EXERCISE) */}
          <div className="bg-[#101422] border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                {t('step_5_do')}
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {t('practice_ratio')}
              </span>
            </div>

            <div className="bg-[#0b0e18] border border-slate-800 rounded-2xl p-5 text-sm text-slate-200 leading-relaxed whitespace-pre-line">
              {lesson.practicalTask}
            </div>
          </div>
        </div>

        {/* Right Column: Result, Checklist, Upload & Done (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* 6. RESULT TARGET */}
          <div className="bg-[#101422] border border-slate-800/80 rounded-2xl p-5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              {t('step_6_result')}
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#0b0e18] border border-slate-800 rounded-xl">
              <FileCode className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="font-mono text-xs font-bold text-emerald-300 break-all">
                  {lesson.expectedResult}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {t('save_in_project_folder')}
                </div>
              </div>
            </div>
          </div>

          {/* 7. CHECKLIST */}
          <div className="bg-[#101422] border border-slate-800/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                {t('step_7_check')}
              </div>
              <span className="text-xs text-slate-400">
                {lesson.checklist.filter(c => c.checked).length} / {lesson.checklist.length}
              </span>
            </div>

            <div className="space-y-2">
              {lesson.checklist.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleToggleCheck(item.id)}
                  className="w-full flex items-start gap-2.5 p-2.5 rounded-xl bg-[#0b0e18] border border-slate-800/80 hover:border-slate-700 text-left transition text-xs"
                >
                  {item.checked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  )}
                  <span className={item.checked ? 'text-slate-400 line-through' : 'text-slate-200'}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* UPLOAD RESULT / CAM */}
          <div className="bg-[#101422] border border-slate-800/80 rounded-2xl p-5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              {t('upload_proof_label')}
            </div>

            <label className="border-2 border-dashed border-slate-700/80 hover:border-amber-500/50 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition bg-[#0b0e18] group">
              <Upload className="w-6 h-6 text-slate-400 group-hover:text-amber-400 transition mb-1" />
              <span className="text-xs font-medium text-slate-300 text-center">
                {t('upload_cta')}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5">
                {t('upload_sub')}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*,video/*,.blend,.procreate,.pdf"
                onChange={handleFileUpload}
              />
            </label>

            {artifactName && (
              <div className="text-xs text-slate-300 font-mono bg-[#0b0e18] p-2 rounded-lg border border-slate-800 truncate">
                File: {artifactName}
              </div>
            )}

            {uploadedPreview && (
              <div className="mt-2 rounded-xl overflow-hidden border border-slate-800 max-h-36">
                <img
                  src={uploadedPreview}
                  alt="Lesson proof preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* 8. COMPLETE DAY BUTTON */}
          <div className="pt-2">
            {lesson.completed ? (
              <div className="w-full py-4 px-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-center flex items-center justify-center gap-2 text-sm">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>{t('day_completed_btn', { xp: lesson.xpReward })}</span>
              </div>
            ) : (
              <button
                onClick={handleComplete}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider transition shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 active:scale-[0.98]"
              >
                <Sparkles className="w-5 h-5" />
                <span>{t('step_8_complete', { day: lesson.dayNumber })}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Celebration Modal Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in zoom-in duration-200">
          <div className="bg-[#14192b] border border-amber-500/40 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto mb-4 text-amber-400">
              <Award className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-white">{t('celebration_title')}</h3>
            <p className="text-sm text-slate-300 mt-2">
              {t('celebration_desc')}
            </p>
            <div className="mt-4 p-3 bg-amber-500/15 border border-amber-500/30 rounded-xl text-amber-300 font-bold text-base">
              +{lesson.xpReward} Studio XP
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

