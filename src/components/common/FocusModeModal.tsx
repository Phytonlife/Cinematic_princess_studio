import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, Circle, Sparkles, Upload, FileText, Check, Award } from 'lucide-react';
import { LessonDay } from '../../types';
import { studioStorage } from '../../services/storageService';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

interface FocusModeModalProps {
  lesson: LessonDay;
  isOpen: boolean;
  onClose: () => void;
}

export const FocusModeModal: React.FC<FocusModeModalProps> = ({ lesson, isOpen, onClose }) => {
  const { t, language } = useThemeLanguage();
  const [submissionNote, setSubmissionNote] = useState('');
  const [artifactName, setArtifactName] = useState(lesson.expectedResult);
  const [isCompleted, setIsCompleted] = useState(lesson.completed);
  const [showCelebration, setShowCelebration] = useState(false);

  if (!isOpen) return null;

  const handleToggleCheck = (checkId: string) => {
    studioStorage.toggleChecklistItem(lesson.id, checkId);
  };

  const handleComplete = () => {
    studioStorage.completeDay(
      lesson.id,
      submissionNote || (language === 'ru' ? 'Выполнено в фокус-режиме' : 'Completed in Focus Mode'),
      artifactName
    );
    setIsCompleted(true);
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090b12] flex flex-col text-slate-100 overflow-y-auto safe-top safe-bottom animate-in fade-in duration-200">
      {/* Top Focus Bar */}
      <div className="border-b border-slate-800/80 px-6 py-4 flex items-center justify-between sticky top-0 bg-[#090b12]/95 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-sm">
            F
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-mono font-bold">
              {language === 'ru' ? 'ФОКУС-РЕЖИМ ОБУЧЕНИЯ (IPAD)' : 'FOCUS LEARNING MODE'}
            </div>
            <div className="text-sm font-semibold text-white">
              {language === 'ru' ? `День ${lesson.dayNumber} · ${lesson.title}` : `Day ${lesson.dayNumber} · ${lesson.title}`}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition flex items-center gap-1.5 text-xs font-medium"
        >
          <X className="w-4 h-4" />
          <span>{language === 'ru' ? 'Выйти из фокуса' : 'Exit Focus'}</span>
        </button>
      </div>

      {/* Main Focus Content Container */}
      <div className="max-w-3xl mx-auto w-full p-6 space-y-8 pb-24">
        {/* 1. TODAY */}
        <section className="bg-[#101422] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">{t('step_1_today')}</span>
            <span className="text-xs text-amber-400 font-medium">{lesson.estimatedMinutes} min</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{lesson.title}</h1>
          <div className="text-sm text-slate-300">
            <strong>{t('today_skill_label')}</strong> {lesson.skill}
          </div>
        </section>

        {/* 2. WHY */}
        <section className="bg-[#101422] border border-slate-800 rounded-2xl p-6">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">{t('step_2_why')}</span>
          <p className="text-slate-300 text-sm leading-relaxed">
            {lesson.whyItMatters}
          </p>
        </section>

        {/* 3. LEARN */}
        <section className="bg-[#101422] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">{t('step_3_learn')}</span>
            <span className="text-xs text-emerald-400 font-mono">{t('official_source_badge')}</span>
          </div>
          <div className="bg-[#0b0d16] border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-white text-base">{lesson.tutorial.title}</h3>
              <div className="text-xs text-slate-400 mt-1">
                {language === 'ru' ? 'Источник:' : 'Source:'} {lesson.tutorial.source} · {lesson.tutorial.durationMinutes} min · {lesson.tutorial.language}
              </div>
            </div>
            <a
              href={lesson.tutorial.verifiedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shrink-0 shadow-lg shadow-amber-500/20"
            >
              <span>{t('open_lesson')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* 4. WATCH / READ */}
        <section className="bg-[#101422] border border-slate-800 rounded-2xl p-6">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">{t('step_4_watch')}</span>
          <div className="p-3 bg-[#0b0d16] border border-slate-800/60 rounded-xl text-amber-200/90 text-sm font-medium">
            🎯 {lesson.watchSegment}
          </div>
        </section>

        {/* 5. DO */}
        <section className="bg-[#101422] border border-slate-800 rounded-2xl p-6">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">{t('step_5_do')}</span>
          <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line bg-[#0b0d16] p-4 rounded-xl border border-slate-800">
            {lesson.practicalTask}
          </p>
        </section>

        {/* 6. RESULT */}
        <section className="bg-[#101422] border border-slate-800 rounded-2xl p-6">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">{t('step_6_result')}</span>
          <div className="flex items-center gap-3 bg-[#0b0d16] p-3 rounded-xl border border-slate-800">
            <FileText className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="font-mono text-sm text-emerald-400 font-semibold">{lesson.expectedResult}</span>
          </div>
        </section>

        {/* 7. CHECK */}
        <section className="bg-[#101422] border border-slate-800 rounded-2xl p-6">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 font-bold">{t('step_7_check')}</span>
          <div className="space-y-2.5">
            {lesson.checklist.map(item => (
              <button
                key={item.id}
                onClick={() => handleToggleCheck(item.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#0b0d16] border border-slate-800 hover:border-slate-700 text-left transition"
              >
                {item.checked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500 shrink-0" />
                )}
                <span className={`text-sm ${item.checked ? 'text-slate-300 line-through' : 'text-white'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* UPLOAD & NOTES */}
        <section className="bg-[#101422] border border-slate-800 rounded-2xl p-6 space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-bold">
            {language === 'ru' ? 'СТУДИЙНЫЙ ОТЧЁТ РЕЖИССЁРА' : 'STUDIO SUBMISSION'}
          </span>
          <div>
            <label className="text-xs text-slate-400 block mb-1">
              {language === 'ru' ? 'Имя файла или ссылка' : 'Result file name or cloud link'}
            </label>
            <input
              type="text"
              value={artifactName}
              onChange={e => setArtifactName(e.target.value)}
              className="w-full bg-[#0b0d16] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
              placeholder="e.g. 001-first-blender.blend"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">
              {language === 'ru' ? 'Заметки режиссёра (что получилось, что обсудить с папой?)' : 'Director notes (what did you learn?)'}
            </label>
            <textarea
              value={submissionNote}
              onChange={e => setSubmissionNote(e.target.value)}
              rows={2}
              className="w-full bg-[#0b0d16] border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              placeholder={language === 'ru' ? 'Что далось легко? Что было сложно?' : 'What felt easy? What should dad review with you?'}
            />
          </div>
        </section>

        {/* 8. COMPLETE BUTTON */}
        <div className="pt-4">
          {isCompleted ? (
            <div className="w-full py-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-center flex items-center justify-center gap-2">
              <Check className="w-5 h-5" />
              <span>{t('day_completed_btn', { xp: lesson.xpReward })}</span>
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base uppercase tracking-wider transition shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 active:scale-[0.99]"
            >
              <Sparkles className="w-5 h-5" />
              <span>{t('step_8_complete', { day: lesson.dayNumber })}</span>
            </button>
          )}
        </div>
      </div>

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in zoom-in duration-300">
          <div className="bg-[#14192b] border border-amber-500/40 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto mb-4 text-amber-400">
              <Award className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="text-2xl font-black text-white">{t('celebration_title')}</h3>
            <p className="text-sm text-amber-200 mt-2">{t('celebration_desc')}</p>
            <div className="mt-4 p-3 bg-amber-500/10 rounded-xl text-amber-300 font-bold text-base">
              +{lesson.xpReward} Studio XP
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
