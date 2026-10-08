import { WeekModule, PhaseInfo } from '../types';
import { PHASE_1_WEEKS } from './weeks/phase1';
import { PHASE_2_WEEKS } from './weeks/phase2';
import { PHASE_3_WEEKS } from './weeks/phase3';
import { generateWeeks13To52 } from './weeks/futurePhases';

export const PHASES_INFO: PhaseInfo[] = [
  {
    phaseNumber: 1,
    weeksRange: 'Weeks 1–4',
    title: 'Foundations of Motion & 3D',
    description: 'Week 1: Procreate 2D animation, Week 2: Blender 3D modeling & lighting, Week 3: Blender keyframes & bouncing ball, Week 4: First completed 10–20s animated short.',
    targetArtifact: 'First Completed 10–20s Animated Short Film',
    isUnlocked: true,
  },
  {
    phaseNumber: 2,
    weeksRange: 'Weeks 5–8',
    title: 'Character Design & Kazakh IP',
    description: 'Silhouettes, shape language, Kazakh cultural inspiration, 4-angle turnarounds, expressions, and Character Bible v1.',
    targetArtifact: 'Original Character Bible v1 (Turnarounds + 15 Emotions)',
    isUnlocked: true,
  },
  {
    phaseNumber: 3,
    weeksRange: 'Weeks 9–12',
    title: 'Visual Storytelling & Animatics',
    description: 'Premise, stakes, visual storytelling with minimal dialogue, shot types, full 20-panel storyboard, and timed animatic with temporary sound.',
    targetArtifact: 'Complete Storyboard + Timed Animatic (60–90 seconds)',
    isUnlocked: true,
  },
  {
    phaseNumber: 4,
    weeksRange: 'Weeks 13–16',
    title: 'Film #1 Production (30–90 sec)',
    description: 'First complete production pipeline: Script -> Storyboard -> Animatic -> Blender Layout -> AI Gen -> Edit -> Sound -> Export.',
    targetArtifact: 'Original Animated Short Film #1 (30–90 seconds)',
    isUnlocked: false,
  },
  {
    phaseNumber: 5,
    weeksRange: 'Weeks 17–20',
    title: 'Character Animation & Body Mechanics',
    description: 'Posing official Blender rigs, walk cycles, weight, physics, run & jump, pantomime, and facial acting.',
    targetArtifact: 'Character Walk & Jump Reel with Acting Beats',
    isUnlocked: false,
  },
  {
    phaseNumber: 6,
    weeksRange: 'Weeks 21–24',
    title: 'Cinematography & Visual Hierarchy',
    description: 'Lenses, focal lengths, camera movement (pan, tilt, dolly, truck), 3-point lighting setups, depth of field, and color palettes.',
    targetArtifact: 'Same Scene Filmed 5 Cinematic Ways (Lens & Lighting Reel)',
    isUnlocked: false,
  },
  {
    phaseNumber: 7,
    weeksRange: 'Weeks 25–28',
    title: 'AI Filmmaking & Shot Consistency',
    description: 'Veo and Runway Gen-4 reference workflows, Image-to-Video, first/last frame control, and Sxx_SHxx_Vxx production nomenclature.',
    targetArtifact: '12-Shot Consistent AI Sequence with Locked Characters',
    isUnlocked: false,
  },
  {
    phaseNumber: 8,
    weeksRange: 'Weeks 29–32',
    title: 'Film #2 Production (2–5 minutes)',
    description: 'Multi-character dialogue, location changes, spatial continuity, custom score, voice acting, and opening/closing titles.',
    targetArtifact: 'Original Animated Short Film #2 (2–5 minutes)',
    isUnlocked: false,
  },
  {
    phaseNumber: 9,
    weeksRange: 'Weeks 33–36',
    title: 'Post-Production, DaVinci & Sound Design',
    description: 'DaVinci Resolve Fairlight, foley recording (cloth, footsteps), ambience, dialogue cleanup, and color grading.',
    targetArtifact: 'Full 5.1/Stereo Sound Mix & Color Graded Sequence',
    isUnlocked: false,
  },
  {
    phaseNumber: 10,
    weeksRange: 'Weeks 37–40',
    title: 'World Building & Studio Style Bible',
    description: 'Steppe solarpunk/mythology universe, architectural rules, culture, animals, Studio Style Bible with DO & DONT examples.',
    targetArtifact: 'Studio Style Bible v1 + World Codex',
    isUnlocked: false,
  },
  {
    phaseNumber: 11,
    weeksRange: 'Weeks 41–44',
    title: 'Pilot Production (5–7 minutes)',
    description: 'Full studio shot tracking (TODO -> LAYOUT -> GENERATING -> REVIEW -> APPROVED -> FINAL) for a 5-7 min festival pilot.',
    targetArtifact: 'Studio Pilot Film #3 (5–7 minutes)',
    isUnlocked: false,
  },
  {
    phaseNumber: 12,
    weeksRange: 'Weeks 45–52',
    title: 'Master Short Film (10–20 min) & Cinema Prep',
    description: 'Final short film locked master, 4K 24fps timeline, Kazakh/Russian/English subtitles, DCP package, trailer, and festival submissions.',
    targetArtifact: 'Master Animated Short Film (10–20 min) + Festival Package',
    isUnlocked: false,
  },
];

export const INITIAL_CURRICULUM: WeekModule[] = [
  ...PHASE_1_WEEKS,
  ...PHASE_2_WEEKS,
  ...PHASE_3_WEEKS,
  ...generateWeeks13To52(PHASES_INFO),
];
