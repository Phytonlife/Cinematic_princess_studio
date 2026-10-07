import React, { useState } from 'react';
import { StudioDatabaseState } from '../../types';
import { POSTGRES_SCHEMA_SQL } from '../../services/schemaDefinition';
import { studioStorage } from '../../services/storageService';
import {
  Shield,
  Database,
  Download,
  Upload,
  RefreshCw,
  Copy,
  CheckCircle2,
  Clock,
  Award,
  Film,
  Sparkles,
  AlertCircle,
  Code,
} from 'lucide-react';

interface ParentDashboardViewProps {
  state: StudioDatabaseState;
}

export const ParentDashboardView: React.FC<ParentDashboardViewProps> = ({ state }) => {
  const [showSqlSchema, setShowSqlSchema] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleCopySql = () => {
    navigator.clipboard.writeText(POSTGRES_SCHEMA_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleExportJson = () => {
    const jsonStr = studioStorage.exportStudioArchiveJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studio-academy-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        const content = ev.target?.result as string;
        const success = studioStorage.importStudioArchiveJson(content);
        if (success) {
          setImportStatus('Backup restored successfully!');
        } else {
          setImportStatus('Failed to parse studio backup JSON.');
        }
        setTimeout(() => setImportStatus(null), 3000);
      };
      reader.readAsText(file);
    }
  };

  // Student readiness status matrix without school grades
  const studentReadiness = [
    { skill: 'Drawing & Procreate Anatomy', status: 'MASTERED FOR CURRENT LEVEL', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { skill: 'Blender Viewport & Navigation', status: 'READY', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
    { skill: 'Cinematic Camera Framing', status: 'READY', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
    { skill: 'Bouncing Ball & Graph Editor', status: 'NEEDS PRACTICE', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { skill: 'Character Model Sheet Turnaround', status: 'READY', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
    { skill: 'AI Diffusion Prompting & Consistency', status: 'NEEDS PRACTICE', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-[#121626] border border-purple-500/30 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                DIRECTOR FATHER CONTROL CONSOLE
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-slate-300">TECHNICAL PIPELINE &amp; SYNC</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Dad Management Dashboard
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Managing the technical architecture for your daughter: pipeline automation, AI models, PostgreSQL cloud synchronization, and forward curriculum audits.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
            >
              <Download className="w-4 h-4" />
              <span>Export Studio Backup</span>
            </button>
            <label className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Restore Backup</span>
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>
          </div>
        </div>

        {importStatus && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{importStatus}</span>
          </div>
        )}
      </div>

      {/* Progress & Time Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#101422] border border-slate-800 rounded-2xl p-5">
          <div className="text-[10px] font-mono text-slate-400 uppercase">CURRENT LESSON DAY</div>
          <div className="text-3xl font-black text-white mt-1">Day {state.stats.currentDay}</div>
          <div className="text-xs text-slate-400 mt-1">Target: Day 365</div>
        </div>

        <div className="bg-[#101422] border border-slate-800 rounded-2xl p-5">
          <div className="text-[10px] font-mono text-slate-400 uppercase">TIME INVESTED</div>
          <div className="text-3xl font-black text-blue-400 mt-1">{state.stats.totalHoursLearned} Hours</div>
          <div className="text-xs text-slate-400 mt-1">Paced at 30-60m weekdays, 90m Sat</div>
        </div>

        <div className="bg-[#101422] border border-slate-800 rounded-2xl p-5">
          <div className="text-[10px] font-mono text-slate-400 uppercase">PRODUCTION STREAK</div>
          <div className="text-3xl font-black text-orange-400 mt-1">{state.stats.streakDays} Days 🔥</div>
          <div className="text-xs text-slate-400 mt-1">Consistency without burnout</div>
        </div>

        <div className="bg-[#101422] border border-slate-800 rounded-2xl p-5">
          <div className="text-[10px] font-mono text-slate-400 uppercase">FINISHED MOVIE ARTIFACTS</div>
          <div className="text-3xl font-black text-emerald-400 mt-1">{state.stats.completedArtifactsCount} Saved</div>
          <div className="text-xs text-slate-400 mt-1">Original studio files archived</div>
        </div>
      </div>

      {/* Student Readiness Matrix (NO SCHOOL GRADES) */}
      <div className="bg-[#101422] border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">Studio Readiness Matrix</h2>
            <p className="text-xs text-slate-400">
              No school grades or test scores. Evaluations are purely studio-oriented: <em>READY</em>, <em>NEEDS PRACTICE</em>, or <em>MASTERED FOR CURRENT LEVEL</em>.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400">PRACTICAL SKILL EVALUATION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {studentReadiness.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-[#0b0e18] rounded-xl border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
            >
              <span className="text-white font-medium">{item.skill}</span>
              <span className={`px-2.5 py-1 rounded-lg border font-mono text-[10px] font-bold shrink-0 ${item.color}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cloud & Database Schema Console */}
      <div className="bg-[#101422] border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-purple-400" />
              <h2 className="text-base font-bold text-white">PostgreSQL &amp; Supabase Database Console</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Cross-device family synchronization: iPad Procreate exports, PC Blender renders, and mobile progress.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSqlSchema(!showSqlSchema)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
            >
              <Code className="w-3.5 h-3.5 text-purple-400" />
              <span>{showSqlSchema ? 'Hide SQL Schema' : 'View PostgreSQL Schema'}</span>
            </button>
            <button
              onClick={handleCopySql}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              {copiedSql ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'Copied SQL' : 'Copy DDL'}</span>
            </button>
          </div>
        </div>

        {showSqlSchema && (
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#080a11] p-4 text-xs font-mono text-purple-200/90 max-h-96 overflow-y-auto space-y-2">
            <div className="text-slate-400 text-[11px] pb-2 border-b border-slate-800">
              -- 11 Tables: users, curriculum, weeks, lessons, tutorials, skills, projects, characters, shots, provenance, opportunities
            </div>
            <pre className="whitespace-pre-wrap">{POSTGRES_SCHEMA_SQL}</pre>
          </div>
        )}

        <div className="p-4 bg-[#0b0e18] rounded-2xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Local &amp; Offline Indexed Storage: <strong>Active &amp; Ready</strong></span>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">
            Last Synced: {new Date(state.lastSyncTimestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};
