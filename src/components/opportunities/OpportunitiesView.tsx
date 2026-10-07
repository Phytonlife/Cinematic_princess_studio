import React, { useState } from 'react';
import { OpportunityItem } from '../../types';
import { Radar, Bookmark, ExternalLink, Calendar, MapPin, Award, Check } from 'lucide-react';
import { studioStorage } from '../../services/storageService';

interface OpportunitiesViewProps {
  opportunities: OpportunityItem[];
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({ opportunities }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'ANIMATION_FESTIVAL',
    'AI_FILM_FESTIVAL',
    'DIGITAL_ART',
    'YOUTH_FILM',
    'BLENDER_3D',
    'UWC',
    'SCHOLARSHIP',
  ];

  const filtered = opportunities.filter(item => {
    if (selectedCategory === 'ALL') return true;
    return item.category === selectedCategory;
  });

  const handleToggleSave = (id: string) => {
    studioStorage.toggleOpportunitySaved(id);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-[#101422] border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            FUTURE SCOUTING RADAR
          </span>
          <span className="text-xs text-slate-500">·</span>
          <span className="text-xs text-slate-400">INTERNATIONAL REACH</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Festivals &amp; Opportunity Radar
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Long-term radar for our completed films: International animation festivals (Annecy, Zagreb), AI film competitions, and prestigious youth arts scholarships (UWC).
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-slate-800/80">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(item => (
          <div
            key={item.id}
            className="bg-[#101422] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                  {item.category.replace('_', ' ')}
                </span>

                <button
                  onClick={() => handleToggleSave(item.id)}
                  className={`p-1.5 rounded-lg border transition ${
                    item.isSaved
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title={item.isSaved ? 'Bookmarked on Radar' : 'Save to Radar'}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
              </div>

              <h3 className="font-bold text-white text-base leading-snug group-hover:text-amber-300 transition">
                {item.title}
              </h3>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Target Deadline: <strong className="text-slate-200">{item.deadline}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Location: <span className="text-slate-300">{item.location}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Eligibility: <span className="text-slate-300">{item.eligibility}</span></span>
                </div>
              </div>

              {item.notes && (
                <div className="mt-3 p-2.5 bg-[#0b0e18] rounded-xl border border-slate-800/80 text-[11px] text-amber-300/90 font-mono">
                  Family note: {item.notes}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800">
              <a
                href={item.verifiedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              >
                <span>VISIT OFFICIAL FESTIVAL SITE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
