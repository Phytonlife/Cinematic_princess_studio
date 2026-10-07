import React, { useState } from 'react';
import { X, Download, Upload, CheckCircle2, AlertCircle, Shield, FileText, Sparkles, Check, Database } from 'lucide-react';
import { studioStorage } from '../../services/storageService';
import { StudioUserStats } from '../../types';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: StudioUserStats;
}

export const BackupModal: React.FC<BackupModalProps> = ({ isOpen, onClose, stats }) => {
  const { t, language } = useThemeLanguage();
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    try {
      const jsonStr = studioStorage.exportStudioArchiveJson();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `animation-studio-backup-day${stats.currentDay}-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);

      setStatusMessage({
        type: 'success',
        text: language === 'ru' 
          ? 'Резервная копия успешно экспортирована в файл JSON!' 
          : 'Backup JSON downloaded successfully!',
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (e) {
      setStatusMessage({
        type: 'error',
        text: language === 'ru' ? 'Ошибка при экспорте резервной копии.' : 'Failed to export backup.',
      });
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const content = ev.target?.result as string;
          const success = studioStorage.importStudioArchiveJson(content);
          if (success) {
            setStatusMessage({
              type: 'success',
              text: language === 'ru'
                ? 'Прогресс студии успешно восстановлен из резервной копии!'
                : 'Studio progress restored successfully!',
            });
            setTimeout(() => {
              setStatusMessage(null);
              onClose();
            }, 1800);
          } else {
            setStatusMessage({
              type: 'error',
              text: language === 'ru' ? 'Неверный формат файла бэкапа.' : 'Invalid backup JSON file structure.',
            });
          }
        } catch (err) {
          setStatusMessage({
            type: 'error',
            text: language === 'ru' ? 'Ошибка чтения файла.' : 'Error reading backup file.',
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#101422] border border-slate-700/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
              {language === 'ru' ? 'СЕМЕЙНЫЙ АРХИВ СТУДИИ' : 'PRIVATE STUDIO ARCHIVE'}
            </span>
            <h3 className="text-xl font-black text-white">
              {language === 'ru' ? 'Резервная копия и синхронизация' : 'Studio Backup & Restore'}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-5">
          {language === 'ru'
            ? 'Ваши исходные файлы (.blend, .procreate, .mp4) всегда хранятся на вашем iPad или компьютере. Файл бэкапа сохраняет пройденные уроки, чеклисты, XP, персонажей и статус фильма в лёгкий JSON.'
            : 'Your original animation source files (.blend, .procreate, .mp4) remain safely stored on your iPad/PC. This backup saves completed lessons, checklists, XP, characters, and shot metadata into a lightweight JSON file.'}
        </p>

        {/* Current State Summary Pill */}
        <div className="grid grid-cols-3 gap-2.5 bg-[#0b0e18] p-3.5 rounded-2xl border border-slate-800 text-center mb-6">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">
              {language === 'ru' ? 'ДЕНЬ' : 'DAY'}
            </div>
            <div className="text-lg font-bold text-white mt-0.5">{stats.currentDay} / 365</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">
              {language === 'ru' ? 'ПРОЙДЕНО' : 'COMPLETED'}
            </div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">{stats.totalDaysCompleted}</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase">XP</div>
            <div className="text-lg font-bold text-amber-400 mt-0.5">{stats.totalXp}</div>
          </div>
        </div>

        {statusMessage && (
          <div
            className={`p-3.5 rounded-xl border mb-5 text-xs flex items-center gap-2.5 animate-in fade-in ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* EXPORT BUTTON */}
          <button
            onClick={handleExport}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 active:scale-95 group"
          >
            <Download className="w-6 h-6 mb-1.5 transition-transform group-hover:-translate-y-0.5" />
            <span>{language === 'ru' ? 'СКАЧАТЬ БЭКАП (.JSON)' : 'EXPORT BACKUP (.JSON)'}</span>
            <span className="text-[10px] font-normal text-slate-950/80 mt-0.5">
              {language === 'ru' ? 'Сохранить весь прогресс' : 'Save all studio progress'}
            </span>
          </button>

          {/* IMPORT BUTTON */}
          <label className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer active:scale-95 group">
            <Upload className="w-6 h-6 mb-1.5 text-amber-400 transition-transform group-hover:-translate-y-0.5" />
            <span>{language === 'ru' ? 'ЗАГРУЗИТЬ БЭКАП' : 'IMPORT BACKUP'}</span>
            <span className="text-[10px] font-normal text-slate-400 mt-0.5">
              {language === 'ru' ? 'Восстановить из файла' : 'Restore from JSON file'}
            </span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'ru' ? '100% приватное локальное хранение' : '100% private local storage'}</span>
          </span>
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition"
          >
            {language === 'ru' ? 'Закрыть' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
