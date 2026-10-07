import React, { useState } from 'react';
import { Video, Film, CheckCircle2, Save, Sparkles, BookOpen, Clock } from 'lucide-react';

interface FilmStudyEntry {
  id: string;
  filmTitle: string;
  sceneName: string;
  wideShotNote: string;
  mediumShotNote: string;
  closeUpNote: string;
  cameraMovement: string;
  lightingSetup: string;
  characterEmotion: string;
  soundAndFoley: string;
  musicScore: string;
  cuttingPacing: string;
  date: string;
}

const INITIAL_STUDIES: FilmStudyEntry[] = [
  {
    id: 'fs-01',
    filmTitle: 'The Boy and the Heron (Studio Ghibli)',
    sceneName: 'Tower Staircase Ascent',
    wideShotNote: 'Opens with massive architectural wide shot emphasizing tiny character scale.',
    mediumShotNote: 'Switches to medium tracking shot when character begins climbing.',
    closeUpNote: 'Close-up on hands gripping stone steps to communicate physical exhaustion.',
    cameraMovement: 'Slow vertical tilt up following the tower spire height.',
    lightingSetup: 'Cold teal shadows with intense golden lantern rim light.',
    characterEmotion: 'Apprehensive determination; heavy breathing.',
    soundAndFoley: 'Echoing stone footfalls and quiet distant bird cry.',
    musicScore: 'Minimal solo piano notes with long reverbs.',
    cuttingPacing: 'Slow contemplative cuts (average shot length 6 seconds).',
    date: '2026-10-04',
  },
];

export const FilmStudyView: React.FC = () => {
  const [studies, setStudies] = useState<FilmStudyEntry[]>(INITIAL_STUDIES);
  const [filmTitle, setFilmTitle] = useState('');
  const [sceneName, setSceneName] = useState('');
  const [wideShotNote, setWideShotNote] = useState('');
  const [mediumShotNote, setMediumShotNote] = useState('');
  const [closeUpNote, setCloseUpNote] = useState('');
  const [cameraMovement, setCameraMovement] = useState('');
  const [lightingSetup, setLightingSetup] = useState('');
  const [characterEmotion, setCharacterEmotion] = useState('');
  const [soundAndFoley, setSoundAndFoley] = useState('');
  const [musicScore, setMusicScore] = useState('');
  const [cuttingPacing, setCuttingPacing] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveStudy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filmTitle || !sceneName) return;

    const newEntry: FilmStudyEntry = {
      id: `fs-${Date.now()}`,
      filmTitle,
      sceneName,
      wideShotNote,
      mediumShotNote,
      closeUpNote,
      cameraMovement,
      lightingSetup,
      characterEmotion,
      soundAndFoley,
      musicScore,
      cuttingPacing,
      date: new Date().toISOString().slice(0, 10),
    };

    setStudies([newEntry, ...studies]);
    setSavedSuccess(true);
    setFilmTitle('');
    setSceneName('');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-[#101422] border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            SUNDAY CINEMATOGRAPHY WORKSHOP
          </span>
          <span className="text-xs text-slate-500">·</span>
          <span className="text-xs text-slate-400">EDUCATIONAL FILM ANALYSIS ONLY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Weekly Film Study Laboratory
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Pick one 60–90 second scene from master cinema each Sunday. Deconstruct shot types, camera moves, lighting, character emotion, and sound grammar without copying characters.
        </p>
      </div>

      {/* Two Column Layout: New Analysis Form & Past Archives */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column (7 cols) */}
        <form onSubmit={handleSaveStudy} className="lg:col-span-7 bg-[#101422] border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Log Today's Scene Breakdown</h2>
            <span className="text-xs text-amber-400 font-mono">+40 Studio XP</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Film Title</label>
              <input
                type="text"
                value={filmTitle}
                onChange={e => setFilmTitle(e.target.value)}
                placeholder="e.g. Spider-Man: Into the Spider-Verse"
                className="w-full bg-[#0b0e18] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">Scene Name / Timecode</label>
              <input
                type="text"
                value={sceneName}
                onChange={e => setSceneName(e.target.value)}
                placeholder="e.g. Leap of Faith (01:14:20)"
                className="w-full bg-[#0b0e18] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Wide Shot Purpose</label>
              <input
                type="text"
                value={wideShotNote}
                onChange={e => setWideShotNote(e.target.value)}
                placeholder="World / scale establishing..."
                className="w-full bg-[#0b0e18] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Medium Shot Action</label>
              <input
                type="text"
                value={mediumShotNote}
                onChange={e => setMediumShotNote(e.target.value)}
                placeholder="Body language & physical interaction..."
                className="w-full bg-[#0b0e18] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Close-Up Emotion</label>
              <input
                type="text"
                value={closeUpNote}
                onChange={e => setCloseUpNote(e.target.value)}
                placeholder="Eyes, tears, hesitation..."
                className="w-full bg-[#0b0e18] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Camera Movement (Pan, Tilt, Dolly, Tracking)</label>
              <input
                type="text"
                value={cameraMovement}
                onChange={e => setCameraMovement(e.target.value)}
                placeholder="Dynamic tracking down with character..."
                className="w-full bg-[#0b0e18] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Lighting &amp; Colors</label>
              <input
                type="text"
                value={lightingSetup}
                onChange={e => setLightingSetup(e.target.value)}
                placeholder="High contrast neon against dark rain..."
                className="w-full bg-[#0b0e18] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Sound &amp; Foley</label>
              <input
                type="text"
                value={soundAndFoley}
                onChange={e => setSoundAndFoley(e.target.value)}
                placeholder="Wind rush, glass crunch..."
                className="w-full bg-[#0b0e18] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Music Impact</label>
              <input
                type="text"
                value={musicScore}
                onChange={e => setMusicScore(e.target.value)}
                placeholder="Silence dropping into orchestral rise..."
                className="w-full bg-[#0b0e18] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Cutting Rhythm</label>
              <input
                type="text"
                value={cuttingPacing}
                onChange={e => setCuttingPacing(e.target.value)}
                placeholder="Rapid on beat vs 10s unbroken hold..."
                className="w-full bg-[#0b0e18] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            {savedSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Study logged successfully!
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
            >
              SAVE FILM STUDY LOG
            </button>
          </div>
        </form>

        {/* Past Logs Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-base font-bold text-white">Archived Film Studies ({studies.length})</h2>

          <div className="space-y-3">
            {studies.map(entry => (
              <div
                key={entry.id}
                className="bg-[#101422] border border-slate-800 rounded-2xl p-4 text-xs space-y-2 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-sm">{entry.filmTitle}</h3>
                    <div className="text-amber-400 text-[11px] font-mono mt-0.5">{entry.sceneName}</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{entry.date}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">LIGHTING:</span>
                    {entry.lightingSetup}
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">CAMERA MOVE:</span>
                    {entry.cameraMovement}
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">SOUND:</span>
                    {entry.soundAndFoley}
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-mono">MUSIC:</span>
                    {entry.musicScore}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
