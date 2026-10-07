import React, { useState } from 'react';
import { Folder, FolderTree, Copy, Check, HardDrive, Laptop, Smartphone, FileCode, Sparkles, ExternalLink, Database, Download, Upload } from 'lucide-react';
import { LessonDay } from '../../types';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

interface StudioFilesViewProps {
  currentLesson: LessonDay;
  onOpenBackupModal?: () => void;
}

export const StudioFilesView: React.FC<StudioFilesViewProps> = ({ currentLesson, onOpenBackupModal }) => {
  const { t, language } = useThemeLanguage();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedTodayFile, setCopiedTodayFile] = useState(false);

  const folders = [
    {
      name: '01_Lessons',
      purpose: language === 'ru' ? 'Исходные файлы ежедневных обучающих заданий' : 'Daily tutorial source files and notes',
      types: '.blend, .procreate, .txt',
      example: 'day-001-first-blender.blend',
    },
    {
      name: '02_Exercises',
      purpose: language === 'ru' ? 'Практические упражнения (физика, свет, камеры)' : 'Hands-on practice exercises (lighting, cameras, physics)',
      types: '.blend, .png, .mp4',
      example: 'day-004-lighting-moods.blend',
    },
    {
      name: '03_Characters',
      purpose: language === 'ru' ? 'Официальные модел-шиты, повороты 4-х ракурсов, библия персонажей' : 'Character IP: 4-angle turnarounds, expressions, Character Bible v1',
      types: '.procreate, .psd, .png, .pdf',
      example: '048-ayla-official-turnaround.png',
    },
    {
      name: '04_Storyboards',
      purpose: language === 'ru' ? 'Раскадровки, сценарии, бит-шиты и тайминги' : 'Storyboards, scripts, beat sheets, and panel exports',
      types: '.pdf, .png, .txt',
      example: '069-film-one-full-storyboard.pdf',
    },
    {
      name: '05_Blender',
      purpose: language === 'ru' ? '3D сцены, риги, лайаут локаций и виртуальные камеры' : '3D sets, rigs, location blockouts, and virtual cameras',
      types: '.blend, .fbx, .obj',
      example: 'day-079-steppe-set-blockout.blend',
    },
    {
      name: '06_Animations',
      purpose: language === 'ru' ? 'Анимационные тесты, походки, циклы и промежуточные рендеры' : 'Animation tests, walk cycles, 2D loops, body mechanics',
      types: '.blend, .procreate, .mp4',
      example: 'day-013-two-balls-weight.mp4',
    },
    {
      name: '07_Films',
      purpose: language === 'ru' ? 'Монтаж в DaVinci Resolve, чистовые кадры и финальные фильмы' : 'DaVinci Resolve project archives, animatics, mastered films',
      types: '.drp, .mp4, .mov (ProRes)',
      example: '016-film-one-final-master.mp4',
    },
    {
      name: '08_Portfolio',
      purpose: language === 'ru' ? 'Лучшие работы года для показа семье, фестивалям и в YouTube' : 'Curated showcase exports ready for YouTube & film festivals',
      types: '.mp4, .pdf, .jpg',
      example: '055-ayla-character-bible-v1.pdf',
    },
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const todaySaveTarget = `${currentLesson.targetFolder || '02_Exercises'}/${currentLesson.saveAsFile || currentLesson.expectedResult}`;

  const handleCopyTodayFile = () => {
    navigator.clipboard.writeText(todaySaveTarget);
    setCopiedTodayFile(true);
    setTimeout(() => setCopiedTodayFile(false), 2000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-[#101422] border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            {language === 'ru' ? 'СТРУКТУРА ПАПОК СТУДИИ' : 'STUDIO FILE SYSTEM'}
          </span>
          <span className="text-xs text-slate-500">·</span>
          <span className="text-xs text-slate-400">IPAD &amp; PC WORKFLOW</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'ru' ? 'Файлы и папки моей студии' : 'My Studio Files Guide'}
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
          {language === 'ru'
            ? 'Все настоящие файлы мультфильма (.blend, .procreate, .mp4) живут на вашем iPad и компьютере. На этом сайте сохраняется ваш прогресс, а правильные папки защищают проект от потери файлов.'
            : 'All your actual movie files live directly on your iPad and PC. The website tracks your curriculum journey, while this folder standard ensures no animation assets are ever lost.'}
        </p>
      </div>

      {/* TODAY RESULT SAVE CALLOUT */}
      <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono text-amber-300 font-bold uppercase">
              {language === 'ru' ? `КУДА СОХРАНИТЬ РЕЗУЛЬТАТ ДНЯ ${currentLesson.dayNumber}:` : `WHERE TO SAVE TODAY'S RESULT (DAY ${currentLesson.dayNumber}):`}
            </span>
          </div>
          <div className="font-mono text-base font-bold text-white mt-1 break-all">
            📁 {todaySaveTarget}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {language === 'ru' ? 'Урок:' : 'Lesson:'} <strong>{currentLesson.title}</strong>
          </div>
        </div>

        <button
          onClick={handleCopyTodayFile}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shrink-0 shadow-md shadow-amber-500/20 active:scale-95"
        >
          {copiedTodayFile ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copiedTodayFile ? (language === 'ru' ? 'СКОПИРОВАНО' : 'COPIED') : (language === 'ru' ? 'СКОПИРОВАТЬ ИМЯ' : 'COPY PATH')}</span>
        </button>
      </div>

      {/* BACKUP EXPORT & RESTORE SECTION */}
      {onOpenBackupModal && (
        <div className="bg-[#101422] border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {language === 'ru' ? 'Резервная копия студии (JSON Backup)' : 'Studio Progress Backup (JSON Archive)'}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {language === 'ru'
                  ? 'Сохраняйте и восстанавливайте уроки, чек-листы, XP и проекты между устройствами без сторонних облаков.'
                  : 'Export and restore completed lessons, checklists, XP, and IP metadata between devices.'}
              </div>
            </div>
          </div>

          <button
            onClick={onOpenBackupModal}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/60 text-slate-100 hover:text-white font-bold text-xs uppercase tracking-wider transition shrink-0 shadow-sm"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>{language === 'ru' ? 'ЭКСПОРТ / ИМПОРТ' : 'EXPORT / RESTORE'}</span>
          </button>
        </div>
      )}

      {/* Recommended 8 Studio Folders */}
      <div className="bg-[#101422] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FolderTree className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">
              {language === 'ru' ? '8 обязательных папок вашей студии' : '8 Essential Studio Folders'}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {language === 'ru' ? 'Создайте на iPad и ПК' : 'Create on iPad & PC'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {folders.map((f, idx) => (
            <div
              key={f.name}
              className="bg-[#0b0e18] border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Folder className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-sm font-black text-white">{f.name}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {f.types}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {f.purpose}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 text-[11px] truncate mr-2">
                  {language === 'ru' ? 'Пример:' : 'Example:'} <code className="text-emerald-300">{f.example}</code>
                </span>
                <button
                  onClick={() => handleCopy(f.name, idx)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition shrink-0"
                  title="Copy folder name"
                >
                  {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hardware & Syncing Tips for Family Studio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#101422] border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-amber-400">
            <Smartphone className="w-5 h-5" />
            <h3 className="font-bold text-sm text-white">iPad &amp; Procreate</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'ru'
              ? 'Сохраняйте холсты Procreate в папку приложения или делайте экспорт в iCloud Drive в папки 03_Characters и 06_Animations в форматах .procreate и .png.'
              : 'Keep your Procreate artwork organized by creating Stacks matching these 8 folders, or export layered files into iCloud Drive 03_Characters and 06_Animations.'}
          </p>
        </div>

        <div className="bg-[#101422] border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-blue-400">
            <Laptop className="w-5 h-5" />
            <h3 className="font-bold text-sm text-white">PC &amp; Blender</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'ru'
              ? 'Храните .blend файлы в папке 05_Blender на быстром SSD. Включайте File -> External Data -> Automatically Pack Resources, чтобы текстуры не терялись.'
              : 'Save .blend scenes in 05_Blender on a fast drive. Always enable File -> External Data -> Automatically Pack Resources so all textures stay embedded inside the .blend file.'}
          </p>
        </div>

        <div className="bg-[#101422] border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <HardDrive className="w-5 h-5" />
            <h3 className="font-bold text-sm text-white">
              {language === 'ru' ? 'Внешний бэкап' : 'Weekly External Backup'}
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'ru'
              ? 'Каждое воскресенье папа копирует всю папку на внешний SSD-диск. Плюс в этом приложении нажимайте кнопку "СКАЧАТЬ БЭКАП" для сохранения статуса академии.'
              : 'Every Sunday, copy the main project folder onto an external drive. Plus, use the "Export Backup" button in this PWA to preserve all your curriculum and streak data.'}
          </p>
        </div>
      </div>
    </div>
  );
};
