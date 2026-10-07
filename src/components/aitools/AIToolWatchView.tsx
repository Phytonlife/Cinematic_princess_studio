import React, { useState } from 'react';
import { AIToolWatchItem } from '../../types';
import { Cpu, ExternalLink, ShieldCheck, AlertTriangle, Layers, BookOpen, Clock } from 'lucide-react';

interface AIToolWatchViewProps {
  tools: AIToolWatchItem[];
}

export const AIToolWatchView: React.FC<AIToolWatchViewProps> = ({ tools }) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-[#101422] border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            FUTURE-PROOF TECHNOLOGY RADAR
          </span>
          <span className="text-xs text-slate-500">·</span>
          <span className="text-xs text-slate-400">ACTIVE PIPELINE WATCH</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          AI &amp; Software Tool Watch
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Technology changes rapidly. We continuously audit Blender, DaVinci Resolve, Google Veo, Flow, Runway, and Adobe Firefly. Old projects always preserve their original tool metadata.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tools.map(tool => {
          const statusBadges: Record<string, { bg: string; text: string }> = {
            RECOMMENDED: { bg: 'bg-emerald-500/15 border-emerald-500/30', text: 'text-emerald-400' },
            COMMERCIAL_SAFE: { bg: 'bg-blue-500/15 border-blue-500/30', text: 'text-blue-400' },
            TESTING: { bg: 'bg-amber-500/15 border-amber-500/30', text: 'text-amber-400' },
            DEPRECATED: { bg: 'bg-rose-500/15 border-rose-500/30', text: 'text-rose-400' },
          };
          const badge = statusBadges[tool.status] || statusBadges.RECOMMENDED;

          return (
            <div
              key={tool.id}
              className="bg-[#101422] border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                    {tool.organization}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{tool.name}</h3>
                </div>

                <span className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border font-bold ${badge.bg} ${badge.text}`}>
                  {tool.status}
                </span>
              </div>

              <div className="text-xs text-slate-300">
                <span className="text-slate-400 font-mono text-[10px] uppercase block">PRIMARY PIPELINE ROLE:</span>
                <span className="font-medium text-white">{tool.primaryRole}</span>
              </div>

              {/* Recommended Workflow */}
              <div className="bg-[#0b0e18] p-3.5 rounded-xl border border-slate-800 text-xs">
                <span className="text-amber-400 font-mono text-[10px] uppercase block mb-1">RECOMMENDED STUDIO WORKFLOW:</span>
                <p className="text-slate-300 leading-relaxed font-mono">{tool.recommendedWorkflow}</p>
              </div>

              {/* Notes */}
              <p className="text-xs text-slate-400 leading-relaxed">
                {tool.notes}
              </p>

              {/* Version & audit */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Version: <strong className="text-slate-200">{tool.currentVersion}</strong></span>
                <span>Audited: {tool.lastAudited}</span>
              </div>

              {/* Links */}
              <div className="flex items-center gap-2 pt-2">
                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center transition flex items-center justify-center gap-1.5"
                >
                  <span>Official Tool</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={tool.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-300 text-xs font-semibold text-center transition flex items-center justify-center gap-1.5"
                >
                  <span>Docs / Training</span>
                  <BookOpen className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
