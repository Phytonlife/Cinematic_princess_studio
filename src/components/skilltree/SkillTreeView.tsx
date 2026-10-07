import React from 'react';
import { StudioSkill, SkillLevel } from '../../types';
import { Award, CheckCircle2, Lock, Sparkles, BookOpen, Film, Clapperboard } from 'lucide-react';

interface SkillTreeViewProps {
  skills: StudioSkill[];
}

export const SkillTreeView: React.FC<SkillTreeViewProps> = ({ skills }) => {
  const levelOrder: SkillLevel[] = ['BEGINNER', 'LEARNING', 'COMPETENT', 'STRONG', 'PRODUCTION_READY'];

  const levelColors: Record<SkillLevel, string> = {
    BEGINNER: 'bg-slate-800 text-slate-300 border-slate-700',
    LEARNING: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    COMPETENT: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    STRONG: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    PRODUCTION_READY: 'bg-emerald-500 text-slate-950 font-bold border-emerald-400',
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-[#101422] border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            STUDIO COMPETENCY MATRIX
          </span>
          <span className="text-xs text-slate-500">·</span>
          <span className="text-xs text-slate-400">PROJECT-VERIFIED ADVANCEMENT ONLY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Visual Animation Skill Tree
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Skills are never leveled up by watching tutorials alone. Levels are unlocked by saving real project files (.blend, .procreate, animatics, renders).
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map(skill => {
          const progressPercent = Math.min(100, Math.round((skill.currentXp / skill.targetXp) * 100));
          return (
            <div
              key={skill.id}
              className="bg-[#101422] border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                    {skill.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{skill.name}</h3>
                </div>

                <span className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border font-bold ${levelColors[skill.level]}`}>
                  {skill.level}
                </span>
              </div>

              {/* XP Progress Bar */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>EXP: {skill.currentXp} XP</span>
                  <span>TARGET: {skill.targetXp} XP ({progressPercent}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Verified Projects List */}
              <div className="pt-2 border-t border-slate-800/80 text-xs">
                <span className="text-slate-400 font-mono text-[10px] uppercase block mb-1.5">
                  VERIFIED PROJECTS DELIVERED:
                </span>
                {skill.verifiedProjects.length > 0 ? (
                  <div className="space-y-1">
                    {skill.verifiedProjects.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{p}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-400 italic">No project submissions yet</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
