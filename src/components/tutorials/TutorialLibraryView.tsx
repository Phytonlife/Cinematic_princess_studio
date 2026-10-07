import React, { useState } from 'react';
import { Tutorial } from '../../types';
import { Search, ExternalLink, ShieldCheck, AlertCircle, Clock, Globe } from 'lucide-react';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

interface TutorialLibraryViewProps {
  tutorials: Tutorial[];
}

export const TutorialLibraryView: React.FC<TutorialLibraryViewProps> = ({ tutorials }) => {
  const { t, language } = useThemeLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('ALL');

  const filterOptions = [
    'ALL',
    'Blender & 3D Basics',
    'Cinematography',
    'Lighting',
    '2D & 3D Animation',
    'Animation Physics',
    '12 Principles of Animation',
    '2D Frame-by-Frame',
    'Character Design',
    'AI Filmmaking',
    'AI Consistency',
    'Film Editing',
    'Sound & Foley',
    'Commercial-Safe AI',
  ];

  const filteredTutorials = tutorials.filter(tut => {
    const matchesSearch =
      tut.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tut.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tut.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tut.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      selectedSkillFilter === 'ALL' || tut.skill.toLowerCase().includes(selectedSkillFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Search Header */}
      <div className="bg-[#101422] border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                {t('tut_badge')}
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-emerald-400 font-mono">{t('tut_verified_only')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {t('tut_title')}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              {t('tut_desc')}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-[#0b0e18] px-3.5 py-2 rounded-xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{language === 'ru' ? 'Проверено для пайплайна 2026/2027' : 'Audited for 2026/2027 Animation Pipeline'}</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('tut_search_placeholder')}
            className="w-full bg-[#0b0e18] border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        {/* Skill Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-4 border-t border-slate-800/60">
          {filterOptions.map(skill => (
            <button
              key={skill}
              onClick={() => setSelectedSkillFilter(skill)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedSkillFilter === skill
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Tutorial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTutorials.map(tut => {
          const isVerified = tut.status === 'VERIFIED_EXACT' || tut.status === 'VERIFIED_GENERAL';
          return (
            <div
              key={tut.id}
              className="bg-[#101422] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition group"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    {tut.isOfficial && (
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded">
                        ⭐ OFFICIAL
                      </span>
                    )}
                    <span className="text-slate-400 text-[11px] font-medium">
                      {tut.level}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      tut.status === 'VERIFIED_EXACT'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : tut.status === 'VERIFIED_GENERAL'
                        ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                        : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {tut.status === 'VERIFIED_EXACT'
                      ? (language === 'ru' ? 'ТОЧНЫЙ УРОК' : 'EXACT LESSON')
                      : tut.status === 'VERIFIED_GENERAL'
                      ? (language === 'ru' ? 'ОФИЦ. ДОКУМЕНТАЦИЯ' : 'GENERAL DOC')
                      : (language === 'ru' ? 'ПРОВЕРИТЬ' : 'NEEDS RECHECK')}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base leading-snug group-hover:text-amber-300 transition">
                  {tut.title}
                </h3>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed line-clamp-3">
                  {tut.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>{language === 'ru' ? 'Источник:' : 'Source:'}</span>
                    <strong className="text-slate-200">{tut.source}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'ru' ? 'Категория:' : 'Skill Category:'}</span>
                    <strong className="text-amber-400/90">{tut.skill}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'ru' ? 'Длительность и язык:' : 'Duration & Language:'}</span>
                    <span className="text-slate-300">{tut.durationMinutes} min · {tut.language}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{language === 'ru' ? 'Проверено:' : 'Last Checked:'}</span>
                    <span className="font-mono text-slate-400">{tut.lastChecked}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-800">
                {isVerified ? (
                  <a
                    href={tut.verifiedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold text-xs uppercase tracking-wider transition group-hover:bg-amber-500 group-hover:text-slate-950"
                  >
                    <span>{t('open_official_lesson')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs text-center flex items-center justify-center gap-1.5 font-medium">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{language === 'ru' ? 'Урок требует проверки' : 'Tutorial needs verification'}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
