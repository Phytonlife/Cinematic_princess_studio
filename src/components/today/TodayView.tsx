import React, { useState } from 'react';
import {
  ExternalLink,
  CheckCircle2,
  Circle,
  Sparkles,
  Upload,
  FileCode,
  Maximize2,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Check,
  PlayCircle,
  HelpCircle,
  Lightbulb,
  Copy,
  Folder,
  FolderTree,
  BookOpen,
  Target,
  FileCheck2,
  Video,
  Flame,
} from 'lucide-react';
import { LessonDay } from '../../types';
import { studioStorage } from '../../services/storageService';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

interface TodayViewProps {
  lesson: LessonDay;
  onLaunchFocusMode: () => void;
  onSelectDay: (dayNumber: number) => void;
  totalDaysCompleted: number;
  onNavigateToFiles?: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  lesson,
  onLaunchFocusMode,
  onSelectDay,
  totalDaysCompleted,
  onNavigateToFiles,
}) => {
  const { t, language } = useThemeLanguage();
  const [submissionNote, setSubmissionNote] = useState(lesson.submissionNote || '');
  const [artifactName, setArtifactName] = useState(lesson.artifactName || lesson.saveAsFile || lesson.expectedResult);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(lesson.artifactDataUrl || null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showQnA, setShowQnA] = useState(false);
  const [copiedFile, setCopiedFile] = useState(false);

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
    }, 2800);
  };

  const saveFileTarget = lesson.saveAsFile || lesson.expectedResult;
  const targetFolderName = lesson.targetFolder || '02_Exercises';
  const fullSavePath = `${targetFolderName}/${saveFileTarget}`;

  const handleCopyFileName = () => {
    navigator.clipboard.writeText(fullSavePath);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const learningMins = lesson.learningMinutes || Math.round(lesson.estimatedMinutes * 0.25);
  const practiceMins = lesson.practiceMinutes || Math.round(lesson.estimatedMinutes * 0.75);
  const totalMins = learningMins + practiceMins;

  return (
    <div className="space-y-6 pb-20">
      {/* 🚀 QUICK START & HERO BANNER (START LEARNING IN 10 SECONDS) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121727] via-[#0d101d] to-[#090b14] border border-slate-800/80 p-6 sm:p-8 shadow-2xl">
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
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
                title={t('prev_day')}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectDay(Math.min(365, lesson.dayNumber + 1))}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
                title={t('next_day')}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onLaunchFocusMode}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700/60 text-slate-200 font-bold text-xs uppercase tracking-wider transition"
                title="Fullscreen iPad Focus Mode"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('focus_mode')}</span>
              </button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
            {lesson.title}
          </h1>

          {/* Time & Pacing Breakdown: 20% Theory · 80% Practice */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t('today_skill_label')} <strong className="text-white">{lesson.skill}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 font-medium bg-[#0b0e18] px-3 py-1 rounded-lg border border-slate-800">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <span>
                {language === 'ru'
                  ? `~${totalMins} мин (теория ~${learningMins} мин · практика ~${practiceMins} мин)`
                  : `~${totalMins} min (~${learningMins}m watch · ~${practiceMins}m practice)`}
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-emerald-400 font-mono text-xs bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              <Folder className="w-3.5 h-3.5 shrink-0" />
              <span>{targetFolderName}</span>
            </div>
          </div>

          {/* Instant 10-Second Quick-Start Bar */}
          <div className="mt-5 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <PlayCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  {t('quick_start_title')}
                </div>
                <div className="text-xs text-slate-200">
                  {lesson.tutorial.title} <span className="text-slate-400">({lesson.tutorial.creator || lesson.tutorial.source})</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={lesson.tutorial.verifiedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 active:scale-95 shrink-0"
              >
                <span>{t('open_lesson')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {onNavigateToFiles && (
                <button
                  onClick={onNavigateToFiles}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-300 hover:text-white transition"
                  title={t('view_folder_guide')}
                >
                  <FolderTree className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick 7 Core Director Questions Toggle */}
          <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between">
            <button
              onClick={() => setShowQnA(!showQnA)}
              className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1.5 transition"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showQnA ? t('today_qna_hide') : t('today_qna_show')}</span>
            </button>
            <span className="text-xs text-amber-400 font-mono font-bold">
              {t('today_xp_reward', { xp: lesson.xpReward })}
            </span>
          </div>

          {showQnA && (
            <div className="mt-3 p-4 rounded-2xl bg-[#090c15] border border-slate-800 text-xs space-y-2 text-slate-300 animate-in fade-in">
              <div><strong className="text-amber-400">{t('q1')}</strong> {lesson.skill} — {lesson.title}</div>
              <div><strong className="text-amber-400">{t('q2')}</strong> {lesson.tutorial.source} ({lesson.tutorial.title})</div>
              <div><strong className="text-amber-400">{t('q3')}</strong> {lesson.practicalTask}</div>
              <div><strong className="text-amber-400">{t('q4')}</strong> {totalMins} {language === 'ru' ? 'минут (20% просмотр · 80% практика)' : 'minutes (20% study · 80% practice)'}.</div>
              <div><strong className="text-amber-400">{t('q5')}</strong> <span className="font-mono text-emerald-300">{fullSavePath}</span></div>
              <div><strong className="text-amber-400">{t('q6')}</strong> {language === 'ru' ? `День ${lesson.dayNumber + 1} продолжит развивать этот материал.` : `Day ${lesson.dayNumber + 1} builds on this exact asset.`}</div>
              <div><strong className="text-amber-400">{t('q7')}</strong> {lesson.whyItMatters}</div>
            </div>
          )}
        </div>
      </div>

      {/* 🧭 MAIN 8-STEP LEARNING SYSTEM (2-COLUMN GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Steps 1, 2, 3, 4, 5 (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: WHAT TO LEARN */}
          <div className="bg-[#101422] border border-slate-800/80 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                <Target className="w-4 h-4 text-amber-400" />
                <span>{t('step_1_today')}</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/60">
                1–2 {language === 'ru' ? 'навыка максимум' : 'skills max'}
              </span>
            </div>
            <div className="text-base font-bold text-white mb-1">
              {lesson.title}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="text-slate-400">{language === 'ru' ? 'Ключевой фокус:' : 'Core focus:'}</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-bold font-mono">
                {lesson.skill}
              </span>
            </div>
          </div>

          {/* STEP 2: WHY THIS MATTERS */}
          <div className="bg-[#101422] border border-slate-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>{t('step_2_why')}</span>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">
              {lesson.whyItMatters}
            </p>
          </div>

          {/* STEP 3: EXACT TUTORIAL */}
          <div className="bg-[#101422] border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>{t('step_3_learn')}</span>
              </div>
              <span className="text-[11px] font-mono flex items-center gap-1 font-bold">
                {lesson.tutorial.status === 'VERIFIED_EXACT' && (
                  <span className="text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded">
                    ⭐ {language === 'ru' ? 'ТОЧНЫЙ УРОК' : 'VERIFIED EXACT LESSON'}
                  </span>
                )}
                {lesson.tutorial.status === 'VERIFIED_GENERAL' && (
                  <span className="text-blue-400 bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 rounded">
                    📖 {language === 'ru' ? 'ОФИЦ. ДОКУМЕНТАЦИЯ' : 'GENERAL DOCUMENTATION'}
                  </span>
                )}
                {lesson.tutorial.status === 'NEEDS_RECHECK' && (
                  <span className="text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded">
                    ⚠️ {language === 'ru' ? 'ОБЩИЙ МАТЕРИАЛ' : 'NEEDS RECHECK'}
                  </span>
                )}
              </span>
            </div>

            <div className="bg-[#0b0e18] border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <h3 className="font-bold text-white text-base leading-snug">
                  {lesson.tutorial.title}
                </h3>
                <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>{language === 'ru' ? 'Автор/Источник:' : 'Creator/Source:'} <strong className="text-slate-200">{lesson.tutorial.creator || lesson.tutorial.source}</strong></span>
                  <span>·</span>
                  <span className="text-blue-400 font-medium">⏱️ {lesson.tutorial.durationMinutes} min</span>
                  <span>·</span>
                  <span className="text-slate-300 font-medium">Level: {lesson.tutorial.level}</span>
                  <span>·</span>
                  <span className="text-slate-400 font-mono text-[11px]">{lesson.tutorial.language}</span>
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
          </div>

          {/* STEP 4: EXACT PART TO WATCH */}
          <div className="bg-[#101422] border border-slate-800/80 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              <Video className="w-4 h-4 text-amber-400" />
              <span>{t('step_4_watch')}</span>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-xl text-xs sm:text-sm text-amber-200 font-medium leading-relaxed">
              <span className="font-bold text-amber-300 block mb-1">
                {language === 'ru' ? '🎯 ТОЧНЫЙ ТАЙМКОД / ФРАГМЕНТ:' : '🎯 EXACT TIMECODE / SEGMENT:'}
              </span>
              {lesson.watchSegment}
            </div>
          </div>

          {/* STEP 5: WHAT TO DO (PRACTICE) */}
          <div className="bg-[#101422] border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t('step_5_do')}</span>
              </div>
              <span className="text-xs text-amber-400 font-medium bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                ⏱️ ~{practiceMins} {language === 'ru' ? 'мин практики (80%)' : 'min practice (80%)'}
              </span>
            </div>

            <div className="bg-[#0b0e18] border border-slate-800 rounded-2xl p-5 text-sm text-slate-200 leading-relaxed whitespace-pre-line font-normal">
              {lesson.practicalTask}
            </div>
          </div>
        </div>

        {/* Right Column: Steps 6, 7, 8 (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* STEP 6: EXPECTED RESULT & SAVE AS */}
          <div className="bg-[#101422] border border-slate-800/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                <FileCode className="w-4 h-4 text-amber-400" />
                <span>{t('step_6_result')}</span>
              </div>
              <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 font-bold">
                {targetFolderName}
              </span>
            </div>

            <div className="p-3.5 bg-[#0b0e18] border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileCode className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {t('save_as_label')}
                    </div>
                    <div className="font-mono text-xs font-bold text-emerald-300 truncate">
                      {saveFileTarget}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyFileName}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition shrink-0"
                  title="Copy full file path"
                >
                  {copiedFile ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>{language === 'ru' ? 'Папка в студии:' : 'Target folder:'}</span>
                <span className="font-mono font-bold text-slate-200">{fullSavePath}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              {language === 'ru'
                ? 'Настоящий файл остаётся на вашем компьютере или iPad. На этом сайте сохраняется подтверждение выполнения.'
                : 'The actual project file stays directly on your PC/iPad. The academy records your completion progress.'}
            </p>
          </div>

          {/* STEP 7: CHECKLIST */}
          <div className="bg-[#101422] border border-slate-800/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                <span>{t('step_7_check')}</span>
              </div>
              <span className="text-xs text-slate-400 font-mono font-bold">
                {lesson.checklist.filter(c => c.checked).length} / {lesson.checklist.length}
              </span>
            </div>

            {/* Checklist items */}
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

          {/* OPTIONAL PROOF PREVIEW */}
          <div className="bg-[#101422] border border-slate-800/80 rounded-2xl p-5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              {language === 'ru' ? 'СКРИНШОТ / ПРЕВЬЮ РЕЗУЛЬТАТА (ПО ЖЕЛАНИЮ)' : 'RECORD RESULT / PHOTO (OPTIONAL)'}
            </div>

            <label className="border-2 border-dashed border-slate-700/80 hover:border-amber-500/50 rounded-2xl p-3.5 flex flex-col items-center justify-center cursor-pointer transition bg-[#0b0e18] group">
              <Upload className="w-5 h-5 text-slate-400 group-hover:text-amber-400 transition mb-1" />
              <span className="text-xs font-medium text-slate-300 text-center">
                {t('upload_cta')}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*,video/*"
                onChange={handleFileUpload}
              />
            </label>

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

          {/* STEP 8: COMPLETE DAY BUTTON */}
          <div className="pt-2">
            {lesson.completed ? (
              <div className="w-full py-4 px-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold text-center flex items-center justify-center gap-2 text-sm shadow-sm">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>{t('day_completed_btn', { xp: lesson.xpReward })}</span>
              </div>
            ) : (
              <button
                onClick={handleComplete}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider transition shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
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
