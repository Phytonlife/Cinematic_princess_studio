import React, { useState } from 'react';
import { StudioProject, CharacterIP, LessonDay } from '../../types';
import { Sparkles, Share2, Film, Image, Award, Check, ExternalLink } from 'lucide-react';

interface PortfolioViewProps {
  projects: StudioProject[];
  characters: CharacterIP[];
  completedLessons: LessonDay[];
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  projects,
  characters,
  completedLessons,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = async (title: string, text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: window.location.href,
        });
      } catch (err) {
        // Ignored or cancelled
      }
    } else {
      navigator.clipboard.writeText(`${title} - ${text} (Animation Studio Academy)`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Portfolio Header */}
      <div className="bg-[#101422] border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                PUBLIC &amp; FESTIVAL SHOWCASE
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-slate-300">YOUNG DIRECTOR PORTFOLIO</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Studio Archive &amp; Portfolio
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              Curated showcase of finished artwork, Character Bibles, Blender 3D layouts, and animated films ready for family screening and international festivals.
            </p>
          </div>

          <button
            onClick={() => handleShare('Animation Studio Academy Portfolio', 'Check out our 365-day animation studio journey!')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shrink-0 shadow-lg shadow-amber-500/20"
          >
            <Share2 className="w-4 h-4" />
            <span>{copiedLink ? 'COPIED TO CLIPBOARD' : 'SHARE PORTFOLIO'}</span>
          </button>
        </div>
      </div>

      {/* Section 1: Original Characters IP */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Original Character IP &amp; Model Sheets</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">{characters.length} Registered IPs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {characters.map(char => (
            <div
              key={char.id}
              className="bg-[#101422] border border-slate-800 rounded-2xl p-5 space-y-3"
            >
              <div className="h-44 rounded-xl bg-gradient-to-br from-[#182035] to-[#0c0f18] border border-slate-800 flex items-center justify-center p-4 relative overflow-hidden group">
                {/* Visual palette stripes */}
                <div className="absolute top-3 left-3 flex gap-1">
                  {char.colorPalette.map((c, i) => (
                    <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-300 font-black text-xl mb-2">
                    {char.name[0]}
                  </div>
                  <div className="text-white font-bold text-sm">{char.name}</div>
                  <div className="text-[11px] text-amber-400 font-mono">{char.role}</div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold text-sm">{char.name}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{char.kazakhCulturalInspiration}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Status: <strong className="text-emerald-400">{char.status}</strong></span>
                <button
                  onClick={() => handleShare(`${char.name} Character Sheet`, `Original character design from Animation Studio Academy.`)}
                  className="text-amber-400 hover:text-amber-300 font-medium text-xs flex items-center gap-1"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share IP</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Films Pipeline */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Film className="w-4 h-4 text-purple-400" />
            <span>Short Films Production</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">4 Target Films</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map(proj => (
            <div
              key={proj.id}
              className="bg-[#101422] border border-slate-800 rounded-2xl p-6 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                    Target: {proj.targetDuration}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{proj.title}</h3>
                </div>
                <span className="text-xs font-mono text-slate-400 px-2 py-0.5 bg-slate-800 rounded">
                  {proj.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{proj.logline}</p>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">{proj.shotCount} total planned shots</span>
                <button
                  onClick={() => handleShare(proj.title, proj.logline)}
                  className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Film Card</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Verified Artifacts Delivered */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>Delivered Daily Artifacts &amp; Files</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">{completedLessons.length} Artifacts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {completedLessons.map(lesson => (
            <div
              key={lesson.id}
              className="bg-[#101422] border border-slate-800 rounded-xl p-4 text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono">
                <span>DAY {lesson.dayNumber}</span>
                <span className="text-emerald-400">+{lesson.xpReward} XP</span>
              </div>
              <div className="text-white font-semibold truncate">{lesson.title}</div>
              <div className="font-mono text-[11px] text-slate-400 truncate">
                File: <code className="text-emerald-300">{lesson.artifactName || lesson.expectedResult}</code>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
