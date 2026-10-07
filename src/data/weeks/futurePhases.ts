import { WeekModule, LessonDay } from '../../types';
import { TUTORIAL_LIBRARY } from '../tutorialLibrary';

const getTut = (id: string) => TUTORIAL_LIBRARY.find(t => t.id === id) || TUTORIAL_LIBRARY[0];

export const generateWeeks13To52 = (phasesInfo: Array<{ phaseNumber: number; title: string }>): WeekModule[] => {
  const weekConfigs = [
    // Phase 4: Film #1 Production (Weeks 13–16)
    { w: 13, p: 4, title: 'Film #1: Asset Preparation & Shot Setup', focus: 'Prepare characters, 3D sets, and AI prompts for S01_SH001 to S01_SH008.', milestone: 'film-1-assets-ready.zip' },
    { w: 14, p: 4, title: 'Film #1: Animation & AI Generation Sprint', focus: 'Generate and animate Shots 1 through 4 with consistent character seeds.', milestone: 'film-1-shots-1-to-4.mp4' },
    { w: 15, p: 4, title: 'Film #1: Climax Shots & Assembly', focus: 'Generate Shots 5 through 8, assemble in DaVinci Resolve, trim cuts.', milestone: 'film-1-rough-cut.mp4' },
    { w: 16, p: 4, title: 'Film #1: Color, Sound & Final Festival Master', focus: 'Fairlight audio polish, color grade, titles, export 60–90s short film.', milestone: '016-film-one-final-master.mp4' },

    // Phase 5: Character Animation & Body Mechanics (Weeks 17–20)
    { w: 17, p: 5, title: 'The Character Walk Cycle: Contact, Down, Pass & Up', focus: 'Official Blender rig walk cycle: weight transfer, hip dips, head arcs.', milestone: 'walk-cycle-loop.blend' },
    { w: 18, p: 5, title: 'Personality Walk Cycles: Sneak, Strut & Heavy Trot', focus: 'Modifying walk cycles to communicate emotion (stealth, joy, exhaustion).', milestone: 'personality-walks-reel.mp4' },
    { w: 19, p: 5, title: 'Runs, Jumps & Physical Balance', focus: 'Fast locomotion: 12-frame run cycles, leaps across obstacles, dynamic balance.', milestone: 'run-and-jump-test.mp4' },
    { w: 20, p: 5, title: 'Facial Acting & Lip Sync Fundamentals', focus: 'Phonemes (M, B, P, O, E, F), eye dart, subtle breathing, dialogue acting.', milestone: '020-acting-dialogue-reel.mp4' },

    // Phase 6: Cinematography & Visual Hierarchy (Weeks 21–24)
    { w: 21, p: 6, title: 'Lenses & Spatial Distortion in Animation', focus: '18mm ultra-wide vs 50mm natural vs 135mm telephoto background compression.', milestone: 'lens-focal-study.png' },
    { w: 22, p: 6, title: 'Dynamic Camera Movements: Dolly, Pan & Crane', focus: 'Camera curves in 3D: moving camera with motivation, parallax layers.', milestone: 'camera-movement-reel.mp4' },
    { w: 23, p: 6, title: 'Color Scripting & Emotional Palette Shifts', focus: 'Designing color scripts that shift from cool blue mystery to warm amber dawn.', milestone: 'color-script-board.png' },
    { w: 24, p: 6, title: 'Cinematic Reel: Same Scene Filmed 5 Ways', focus: 'Cap-stone cinematographic challenge: Film 1 scene with 5 distinct moods.', milestone: '024-same-scene-5-ways.mp4' },

    // Phase 7: AI Filmmaking & Consistency (Weeks 25–28)
    { w: 25, p: 7, title: 'Google Veo & Runway Gen-4 Reference Workflows', focus: 'Multi-reference conditioning: locking character faces across varied angles.', milestone: 'veo-reference-lock-test.mp4' },
    { w: 26, p: 7, title: 'First Frame / Last Frame Guided Generation', focus: 'Controlling beginning and end poses to eliminate AI morphing glitches.', milestone: 'first-last-frame-sequence.mp4' },
    { w: 27, p: 7, title: '3D Layout Hybrid Workflows in AI Production', focus: 'Using simple 3D blockout renders as guidance for high-res AI diffusion.', milestone: 'hybrid-3d-ai-test.mp4' },
    { w: 28, p: 7, title: '12-Shot Consistent AI Sequence Capstone', focus: 'Deliver 12 consecutive shots of your original characters without visual drift.', milestone: '028-twelve-shot-ai-sequence.mp4' },

    // Phase 8: Film #2 Production (2–5 Minutes) (Weeks 29–32)
    { w: 29, p: 8, title: 'Film #2: Story, Script & Expanded World', focus: 'Write a 2–5 minute script with multi-character interactions and stakes.', milestone: 'film-2-script-bible.pdf' },
    { w: 30, p: 8, title: 'Film #2: Complete Storyboard & Animatic', focus: 'Draw 45-panel storyboard, assemble 3-minute timed animatic with audio.', milestone: 'film-2-timed-animatic.mp4' },
    { w: 31, p: 8, title: 'Film #2: Production Sprint (Shots 1 to 24)', focus: 'Full production pipeline execution: 3D sets, animation, and AI generations.', milestone: 'film-2-production-assembly.mp4' },
    { w: 32, p: 8, title: 'Film #2: DaVinci Polish & Final 2-5 Min Master', focus: 'Sound mix, custom music, color grade, titles, and festival export.', milestone: '032-film-two-master.mp4' },

    // Phase 9: Post-Production & Sound Design (Weeks 33–36)
    { w: 33, p: 9, title: 'Foley Recording: Building an Original Sound Library', focus: 'Record real physical textures: cloth, boots on gravel, metal tools, wind.', milestone: 'original-foley-pack.wav' },
    { w: 34, p: 9, title: 'Fairlight Audio Mixing & Surround Ambience', focus: 'Multitrack mixing in DaVinci: EQ, compression, panning, sub-bass rumbles.', milestone: 'fairlight-mix-project.drp' },
    { w: 35, p: 9, title: 'Cinematic Color Grading with DaVinci Color Wheels', focus: 'LUTs, primary wheels, skin-tone protect, contrast curves, film grain.', milestone: 'color-grading-mastery.drp' },
    { w: 36, p: 9, title: 'Film Audio & Grade Remastering Showcase', focus: 'Remaster Film #1 and Film #2 with pristine sound and cinema color.', milestone: '036-remastered-showcase.mp4' },

    // Phase 10: World Building & Studio Style Bible (Weeks 37–40)
    { w: 37, p: 10, title: 'Steppe Solarpunk Architecture & Vehicles', focus: 'Designing nomad yurts with solar panels, wind gliders, and water harvesters.', milestone: 'solarpunk-vehicles-sheet.png' },
    { w: 38, p: 10, title: 'Creatures & Steppe Spirits Concepting', focus: 'Mythological Kazakh creatures: Samruk bird, snow leopards, nature spirits.', milestone: 'creatures-codex.png' },
    { w: 39, p: 10, title: 'Studio Style Bible: Design Rules, DOs & DONTs', focus: 'Compile linework rules, texture palettes, and composition guidelines.', milestone: 'studio-style-bible-v1.pdf' },
    { w: 40, p: 10, title: 'World Codex v1 & Interactive Map', focus: 'Interactive map of the fantasy world and lore documentation.', milestone: '040-world-codex-v1.pdf' },

    // Phase 11: Pilot Production (5–7 Minutes) (Weeks 41–44)
    { w: 41, p: 11, title: 'Pilot: Story & 60-Panel Animatic', focus: 'Pre-production for our biggest film yet: 5–7 minute festival pilot.', milestone: 'pilot-timed-animatic.mp4' },
    { w: 42, p: 11, title: 'Pilot: Production Sprint Part 1 (Acts 1 & 2)', focus: 'Asset execution, 3D set blockouts, and shot deliveries.', milestone: 'pilot-rough-assembly.mp4' },
    { w: 43, p: 11, title: 'Pilot: Production Sprint Part 2 (Climax & Finale)', focus: 'Climactic sequences, visual effects, and credits generation.', milestone: 'pilot-picture-lock.mp4' },
    { w: 44, p: 11, title: 'Pilot: Festival Master Film #3 (5–7 Minutes)', focus: 'Final sound mix, color grade, trailer export, and festival cut.', milestone: '044-pilot-film-three-master.mp4' },

    // Phase 12: Master Short Film (10–20 Min) & Cinema Prep (Weeks 45–52)
    { w: 45, p: 12, title: 'Final Master Film: Script & Complete Pre-Production', focus: 'The culmination of 365 days of studio learning: Original Master Film.', milestone: 'final-film-script-and-bible.pdf' },
    { w: 46, p: 12, title: 'Final Master Film: Full Animatic & Scratch Voices', focus: '12-minute complete animatic locked with voice actors and music.', milestone: 'final-film-locked-animatic.mp4' },
    { w: 47, p: 12, title: 'Final Master Film: Production Wave 1 (Shots 1 to 20)', focus: 'Opening sequence and journey animation production.', milestone: 'final-film-wave-1.mp4' },
    { w: 48, p: 12, title: 'Final Master Film: Production Wave 2 (Shots 21 to 40)', focus: 'Center conflict and obstacle sequence production.', milestone: 'final-film-wave-2.mp4' },
    { w: 49, p: 12, title: 'Final Master Film: Production Wave 3 (Climax & Resolution)', focus: 'Emotional climax, finale animation, and picture lock.', milestone: 'final-film-picture-lock.mp4' },
    { w: 50, p: 12, title: 'Final Master Film: 5.1 Surround Sound & Orchestral Mix', focus: 'Master sound design, Kazakh native voice track, and soundtrack balance.', milestone: 'final-film-audio-mix.wav' },
    { w: 51, p: 12, title: '4K Cinema Mastering: DCP Package & Subtitles', focus: 'Create theatrical DCP package, 4K ProRes master, Kazakh/Russian/English subtitles.', milestone: 'final-film-dcp-package.zip' },
    { w: 52, p: 12, title: 'Studio Graduation: Festival Submissions & YouTube Launch', focus: 'Launch official studio website, YouTube premiere, and festival circuit.', milestone: '052-studio-graduation-package.zip' },
  ];

  return weekConfigs.map(cfg => {
    const days: LessonDay[] = Array.from({ length: 7 }, (_, dIdx) => {
      const dNum = (cfg.w - 1) * 7 + (dIdx + 1);
      const isSat = dIdx === 5;
      const isSun = dIdx === 6;

      const dayTitle = isSat
        ? `Saturday Production: ${cfg.title} Sprint`
        : isSun
        ? `Sunday Film Study: Directorial Analysis (Week ${cfg.w})`
        : `${cfg.title} · Day ${dIdx + 1}`;

      const targetFolder = isSat ? '07_Films' : isSun ? '01_Lessons' : '02_Exercises';
      const saveAsFile = isSat
        ? `day-${String(dNum).padStart(3, '0')}-${cfg.milestone}`
        : isSun
        ? `day-${String(dNum).padStart(3, '0')}-film-study-w${cfg.w}.txt`
        : `day-${String(dNum).padStart(3, '0')}-exercise.blend`;

      return {
        id: `w${cfg.w}-d${dNum}`,
        dayNumber: dNum,
        weekNumber: cfg.w,
        phaseNumber: cfg.p,
        title: dayTitle,
        skill: isSun ? 'Cinematography Analysis' : isSat ? 'Production Sprint' : 'Film Production',
        whyItMatters: isSun
          ? 'Deepening cinematic observation skills through master animated films.'
          : `Building tangible assets for Week ${cfg.w} milestone: ${cfg.milestone}.`,
        tutorial: getTut('tut-blender-fundamentals-01'),
        watchSegment: isSun
          ? 'Weekly scene study: framing, pacing, emotion, and sound'
          : `Directing and executing the ${cfg.title} production task`,
        learningMinutes: isSun ? 12 : 15,
        practiceMinutes: isSat ? 85 : isSun ? 23 : 35,
        estimatedMinutes: isSat ? 100 : isSun ? 35 : 50,
        saveAsFile,
        targetFolder,
        practicalTask: isSat
          ? `Complete the weekly sprint and export ${cfg.milestone} into your studio folder.`
          : isSun
          ? `Perform weekly film scene analysis focusing on shot grammar and camera motion.`
          : `Execute practical production exercise for ${cfg.title}. Save project file.`,
        expectedResult: `${targetFolder}/${saveAsFile}`,
        checklist: [
          { id: 'c1', label: isSun ? 'Watched analysis clip' : 'Reviewed production requirements', checked: false },
          { id: 'c2', label: isSun ? 'Noted shot types and camera angles' : 'Executed practical production work', checked: false },
          { id: 'c3', label: `Saved file as ${saveAsFile}`, checked: false },
        ],
        completed: false,
        xpReward: isSat ? 150 : isSun ? 40 : 70,
        isFilmStudy: isSun,
      };
    });

    return {
      weekNumber: cfg.w,
      title: cfg.title,
      phaseNumber: cfg.p,
      phaseTitle: phasesInfo.find(p => p.phaseNumber === cfg.p)?.title || 'Animation Studio',
      focusSummary: cfg.focus,
      milestoneArtifact: cfg.milestone,
      targetDurationWeeklyMinutes: 280,
      days,
    };
  });
};
