import React, { useState } from 'react';
import {
  StudioProject,
  CharacterIP,
  ProductionShot,
  ProductionProvenance,
  ShotStatus,
} from '../../types';
import {
  Film,
  Users,
  Grid,
  Shield,
  Clapperboard,
  Plus,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Download,
  Copy,
  Sparkles,
  Layers,
  FileText,
  Sliders,
  Tv,
} from 'lucide-react';
import { studioStorage } from '../../services/storageService';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';

interface StudioHubViewProps {
  projects: StudioProject[];
  characters: CharacterIP[];
  shots: ProductionShot[];
  provenance: ProductionProvenance[];
}

export const StudioHubView: React.FC<StudioHubViewProps> = ({
  projects,
  characters,
  shots,
  provenance,
}) => {
  const { t, language } = useThemeLanguage();
  const [activeSubTab, setActiveSubTab] = useState<
    'shots' | 'characters' | 'projects' | 'provenance' | 'cinema'
  >('shots');

  const [selectedShotStatusFilter, setSelectedShotStatusFilter] = useState<string>('ALL');
  const [copiedDisclosure, setCopiedDisclosure] = useState(false);

  // Shot status counters
  const totalShots = shots.length;
  const todoShots = shots.filter(s => s.status === 'TODO').length;
  const storyboardShots = shots.filter(s => s.status === 'STORYBOARD').length;
  const layoutShots = shots.filter(s => s.status === 'LAYOUT').length;
  const generatingShots = shots.filter(s => s.status === 'GENERATING').length;
  const reviewShots = shots.filter(s => s.status === 'REVIEW' || s.status === 'REVISION').length;
  const approvedShots = shots.filter(s => s.status === 'APPROVED' || s.status === 'FINAL').length;

  const filteredShots = shots.filter(s => {
    if (selectedShotStatusFilter === 'ALL') return true;
    return s.status === selectedShotStatusFilter;
  });

  const handleUpdateShotStatus = (shotId: string, newStatus: ShotStatus) => {
    studioStorage.updateShotStatus(shotId, newStatus);
  };

  const currentProv = provenance[0] || null;

  const copyDisclosureToClipboard = () => {
    if (currentProv) {
      navigator.clipboard.writeText(currentProv.aiDisclosureStatement);
      setCopiedDisclosure(true);
      setTimeout(() => setCopiedDisclosure(false), 2500);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Studio Header */}
      <div className="bg-[#101422] border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                {t('studio_badge')}
              </span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-slate-300">{t('studio_sub')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {t('studio_title')}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              {t('studio_desc')}
            </p>
          </div>
        </div>

        {/* Studio Sub-Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setActiveSubTab('shots')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'shots'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>{t('tab_shots')} ({shots.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('characters')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'characters'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{t('tab_characters')} ({characters.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'projects'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>{t('tab_projects')} ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('provenance')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'provenance'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>{t('tab_provenance')}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('cinema')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'cinema'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>{t('tab_cinema')}</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: SHOT TRACKER */}
      {activeSubTab === 'shots' && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  DEMO EXAMPLE — DO NOT COPY
                </span>
                <span className="font-bold text-amber-300">Production Shot Tracker:</span>
              </div>
              <p className="text-slate-300">
                These initial 4 sample shots demonstrate professional pipeline workflow. In Week 12, the student defines and tracks HER OWN Film #1 master shots!
              </p>
            </div>
          </div>

          {/* Status Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <div className="bg-[#101422] border border-slate-800 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400">TOTAL SHOTS</div>
              <div className="text-2xl font-black text-white mt-1">{totalShots}</div>
            </div>
            <div className="bg-[#101422] border border-slate-800 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400">TODO</div>
              <div className="text-2xl font-black text-slate-400 mt-1">{todoShots}</div>
            </div>
            <div className="bg-[#101422] border border-slate-800 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400">STORYBOARD</div>
              <div className="text-2xl font-black text-blue-400 mt-1">{storyboardShots}</div>
            </div>
            <div className="bg-[#101422] border border-slate-800 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400">LAYOUT (3D)</div>
              <div className="text-2xl font-black text-purple-400 mt-1">{layoutShots}</div>
            </div>
            <div className="bg-[#101422] border border-slate-800 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400">GENERATING</div>
              <div className="text-2xl font-black text-amber-400 mt-1">{generatingShots}</div>
            </div>
            <div className="bg-[#101422] border border-slate-800 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400">REVIEW</div>
              <div className="text-2xl font-black text-orange-400 mt-1">{reviewShots}</div>
            </div>
            <div className="bg-[#101422] border border-slate-800 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400">APPROVED / FINAL</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">{approvedShots}</div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-4 flex-wrap bg-[#0b0e18] p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-400 mr-2 font-mono">STATUS FILTER:</span>
              {['ALL', 'TODO', 'STORYBOARD', 'LAYOUT', 'GENERATING', 'REVIEW', 'APPROVED'].map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedShotStatusFilter(status)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition ${
                    selectedShotStatusFilter === status
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800/50 text-slate-400 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-slate-400">
              Active Project: <strong className="text-amber-300">Film #1 (Student Original Short)</strong>
            </div>
          </div>

          {/* Shot Cards List */}
          <div className="space-y-3">
            {filteredShots.map(shot => {
              const statusColors: Record<ShotStatus, string> = {
                TODO: 'bg-slate-800 text-slate-300 border-slate-700',
                STORYBOARD: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
                LAYOUT: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
                GENERATING: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
                REVIEW: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
                REVISION: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
                APPROVED: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
                FINAL: 'bg-emerald-500 text-slate-950 font-bold border-emerald-400',
              };

              return (
                <div
                  key={shot.id}
                  className="bg-[#101422] border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-amber-400 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        {shot.codeName}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Scene {shot.scene} · Shot {shot.shotNumber} · {shot.durationSeconds}s
                      </span>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Status:</span>
                      <select
                        value={shot.status}
                        onChange={e => handleUpdateShotStatus(shot.id, e.target.value as ShotStatus)}
                        className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border focus:outline-none transition ${statusColors[shot.status]}`}
                      >
                        <option value="TODO">TODO</option>
                        <option value="STORYBOARD">STORYBOARD</option>
                        <option value="LAYOUT">LAYOUT</option>
                        <option value="GENERATING">GENERATING</option>
                        <option value="REVIEW">REVIEW</option>
                        <option value="REVISION">REVISION</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="FINAL">FINAL</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-200 leading-relaxed font-mono">
                    {shot.description}
                  </p>

                  {/* AI Metadata & References */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-[#0b0e18] p-3.5 rounded-xl border border-slate-800/80">
                    <div>
                      <div className="text-slate-400 font-mono text-[10px] uppercase">
                        AI MODEL &amp; PROMPT:
                      </div>
                      <div className="text-amber-300 font-mono font-medium mt-0.5">
                        {shot.aiModel || 'Not assigned yet'}
                      </div>
                      {shot.prompt && (
                        <p className="text-slate-400 mt-1 italic line-clamp-2">
                          "{shot.prompt}"
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="text-slate-400 font-mono text-[10px] uppercase">
                        REFERENCES &amp; 3D LAYOUT:
                      </div>
                      <div className="text-slate-200 mt-0.5">
                        {shot.references || 'Standard Character Bible'}
                      </div>
                      {shot.notes && (
                        <div className="text-slate-400 mt-1">
                          Note: {shot.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CHARACTERS IP */}
      {activeSubTab === 'characters' && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  DEMO EXAMPLE — DO NOT COPY
                </span>
                <span className="font-bold text-amber-300">Your Original IP Freedom:</span>
              </div>
              <p className="text-slate-300">
                The entries below are sample reference profiles to illustrate Character Bible structure. The student creates her OWN original characters, names, personalities, designs, and story world in Weeks 5–8!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {characters.map(char => (
              <div
                key={char.id}
                className="bg-[#101422] border border-slate-800 rounded-3xl p-6 space-y-5 hover:border-slate-700 transition relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold border border-slate-700/60">
                        DEMO EXAMPLE
                      </span>
                      <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                        {char.role}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white mt-0.5">{char.name}</h3>
                  </div>

                  <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold shrink-0">
                    {char.status}
                  </span>
                </div>

                {/* Cultural Inspiration Box */}
                <div className="bg-[#0b0e18] p-4 rounded-2xl border border-slate-800 text-xs space-y-1">
                  <div className="text-slate-400 font-mono text-[10px] uppercase">KAZAKH CULTURAL ROOTS:</div>
                  <p className="text-slate-200 leading-relaxed">{char.kazakhCulturalInspiration}</p>
                </div>

                {/* Personality & Motifs */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#0b0e18] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">GOAL:</span>
                    <span className="text-slate-200 font-medium">{char.goal}</span>
                  </div>
                  <div className="bg-[#0b0e18] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">FEAR:</span>
                    <span className="text-slate-200 font-medium">{char.fear}</span>
                  </div>
                  <div className="bg-[#0b0e18] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">STRENGTH:</span>
                    <span className="text-emerald-300 font-medium">{char.strength}</span>
                  </div>
                  <div className="bg-[#0b0e18] p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">WEAKNESS:</span>
                    <span className="text-rose-300 font-medium">{char.weakness}</span>
                  </div>
                </div>

                {/* Palette */}
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase mb-1.5">
                    OFFICIAL PALETTE:
                  </div>
                  <div className="flex items-center gap-2">
                    {char.colorPalette.map((col, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-lg border border-slate-700 shadow-sm"
                        style={{ backgroundColor: col }}
                        title={col}
                      />
                    ))}
                    <span className="text-xs font-mono text-slate-400 ml-2">
                      Visual Motif: <strong className="text-amber-300">{char.visualMotif}</strong>
                    </span>
                  </div>
                </div>

                {/* Turnaround Status */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    4-Angle Model Sheet: <strong className={char.turnaroundDone ? 'text-emerald-400' : 'text-amber-400'}>{char.turnaroundDone ? 'Completed ✓' : 'In Progress'}</strong>
                  </span>
                  <span className="text-slate-400">
                    {char.expressionsCount} Expressions · {char.posesCount} Poses
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: PROJECTS */}
      {activeSubTab === 'projects' && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  DEMO EXAMPLE — DO NOT COPY
                </span>
                <span className="font-bold text-amber-300">Studio Roadmap Examples:</span>
              </div>
              <p className="text-slate-300">
                These project loglines serve as professional pitch examples. Film #1 is 100% written, designed, and directed by the student!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(proj => (
              <div
                key={proj.id}
                className="bg-[#101422] border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider font-bold">
                      Target: {proj.targetDuration} · Phase {proj.phase}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">{proj.title}</h3>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/30">
                    {proj.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {proj.logline}
                </p>

                <div className="bg-[#0b0e18] p-3.5 rounded-xl border border-slate-800 text-xs">
                  <div className="text-slate-400 font-mono text-[10px] uppercase">CURRENT MILESTONE STEP:</div>
                  <div className="text-white font-medium mt-0.5">{proj.currentStep}</div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs text-slate-400 font-mono mb-1">
                    <span>SHOT PRODUCTION</span>
                    <span>{proj.completedShots} / {proj.shotCount} shots ({proj.completionPercentage}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                      style={{ width: `${proj.completionPercentage}%` }}
                    />
                  </div>
                </div>

                {proj.directorStatement && (
                  <div className="pt-2 text-xs text-slate-400 italic">
                    Director Note: "{proj.directorStatement}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: PROVENANCE & AI DISCLOSURE */}
      {activeSubTab === 'provenance' && currentProv && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  DEMO EXAMPLE — DO NOT COPY
                </span>
                <span className="font-bold text-amber-300">Film Festival Provenance Tracker:</span>
              </div>
              <p className="text-slate-300">
                This audit log illustrates how to document human authorship for festival submissions (Annecy, Sundance). Your real film provenance will record your own original assets!
              </p>
            </div>
          </div>

          <div className="bg-[#101422] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    LEGAL &amp; FESTIVAL SUBMISSION PROOF
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Production Provenance: {currentProv.projectName}
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Demonstrates verifiable creative human authorship: sketches, Procreate layers, Blender rigs, and ethical AI assistance documentation.
                </p>
              </div>

              <button
                onClick={copyDisclosureToClipboard}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shrink-0 shadow-lg shadow-amber-500/20"
              >
                {copiedDisclosure ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedDisclosure ? 'COPIED TO CLIPBOARD' : 'COPY OFFICIAL DISCLOSURE'}</span>
              </button>
            </div>

            {/* Provenance breakdown cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#0b0e18] p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-mono text-amber-400 text-[10px] uppercase font-bold block">
                  1. HAND-DRAWN ORIGINALS
                </span>
                <div className="text-white font-bold text-base">
                  {currentProv.originalSketchesCount} Sketches Archived
                </div>
                <ul className="text-slate-400 space-y-1">
                  {currentProv.procreateFiles.map((f, i) => (
                    <li key={i} className="truncate">· {f}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0b0e18] p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-mono text-blue-400 text-[10px] uppercase font-bold block">
                  2. 3D &amp; CAMERA BLOCKOUT
                </span>
                <div className="text-white font-bold text-base">
                  Blender 4.3 Sets Locked
                </div>
                <ul className="text-slate-400 space-y-1">
                  {currentProv.blenderScenes.map((b, i) => (
                    <li key={i} className="truncate">· {b}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0b0e18] p-4 rounded-2xl border border-slate-800 space-y-2">
                <span className="font-mono text-purple-400 text-[10px] uppercase font-bold block">
                  3. SOUND &amp; MUSIC RIGHTS
                </span>
                <div className="text-white font-bold text-base">
                  {currentProv.musicLicenseType}
                </div>
                <p className="text-slate-400 text-xs">
                  Music: {currentProv.musicSource}
                </p>
                <p className="text-slate-400 text-xs">
                  Foley: {currentProv.soundDesignSource}
                </p>
              </div>
            </div>

            {/* Official AI Disclosure Textbox */}
            <div className="bg-[#0b0e18] p-5 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-slate-300 font-bold">
                  OFFICIAL FESTIVAL AI DISCLOSURE STATEMENT
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  Last Updated: {currentProv.lastUpdated.slice(0, 10)}
                </span>
              </div>
              <div className="p-4 bg-[#080a11] border border-slate-800/80 rounded-xl font-mono text-xs text-amber-200/90 leading-relaxed whitespace-pre-line">
                {currentProv.aiDisclosureStatement}
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Required for submissions to Annecy, TIFF Kids, Runway AI Film Festival, and international youth cinema showcases.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: FROM YOUTUBE TO CINEMA */}
      {activeSubTab === 'cinema' && (
        <div className="space-y-6">
          <div className="bg-[#101422] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  MASTERING WORKFLOW GUIDE
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                From YouTube to Cinema
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                How professional studios deliver films for both online release and real theatrical cinema projection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-[#0b0e18] p-5 rounded-2xl border border-slate-800 space-y-3">
                <span className="font-mono text-xs font-bold text-amber-400 block">
                  1. MASTER TIMELINE
                </span>
                <h4 className="text-sm font-bold text-white">4K UHD · 24.000 FPS</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Always edit on a genuine 24 fps timeline in DaVinci Resolve. 24 fps is the global language of cinema. Keep master in Apple ProRes 422 HQ or Avid DNxHR HQX.
                </p>
              </div>

              <div className="bg-[#0b0e18] p-5 rounded-2xl border border-slate-800 space-y-3">
                <span className="font-mono text-xs font-bold text-blue-400 block">
                  2. MULTILINGUAL MASTERS
                </span>
                <h4 className="text-sm font-bold text-white">Kazakh, Russian &amp; English</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Prepare three separate distribution packages:
                  <br />• <strong>Kazakh Master:</strong> Original native language audio.
                  <br />• <strong>Russian Master:</strong> Regional dub.
                  <br />• <strong>English Subtitles:</strong> Standard SRT/VTT for international festivals.
                </p>
              </div>

              <div className="bg-[#0b0e18] p-5 rounded-2xl border border-slate-800 space-y-3">
                <span className="font-mono text-xs font-bold text-purple-400 block">
                  3. THE DCP PACKAGE
                </span>
                <h4 className="text-sm font-bold text-white">Digital Cinema Package</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cinemas do not play MP4 files from USB sticks. They require a DCP (DCI compliant JPEG 2000 sequence + 24-bit 48kHz audio). DaVinci Resolve Studio can export DCPs directly.
                </p>
              </div>
            </div>

            {/* Festival Package Checklist */}
            <div className="bg-[#0b0e18] p-5 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-sm">Festival Submission Package Checklist</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
                {[
                  'Film Master (ProRes 422 HQ)',
                  '60s Teaser Trailer',
                  'High-Res Poster (A3 300 DPI)',
                  'Short & Long Synopsis',
                  'Director Statement',
                  'Director Bio & Headshot',
                  'English Subtitles (.srt)',
                  'Production Stills (5 frames)',
                  'Character Art Bible',
                  'Behind The Scenes Photos',
                  'Official AI Disclosure',
                  'Festival Screener Link (Vimeo)',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-[#121626] rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-300 truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
