export type UserRole = 'student' | 'parent';

export type TutorialStatus = 'VERIFIED' | 'NEEDS_RECHECK' | 'BROKEN';
export type SkillLevel = 'BEGINNER' | 'LEARNING' | 'COMPETENT' | 'STRONG' | 'PRODUCTION_READY';
export type ShotStatus = 'TODO' | 'STORYBOARD' | 'LAYOUT' | 'GENERATING' | 'REVIEW' | 'REVISION' | 'APPROVED' | 'FINAL';

export interface Tutorial {
  id: string;
  title: string;
  skill: string;
  source: string;
  verifiedUrl: string;
  isOfficial: boolean;
  durationMinutes: number;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  language: string;
  status: TutorialStatus;
  lastChecked: string;
  description: string;
}

export interface LessonCheckItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface LessonDay {
  id: string;
  dayNumber: number;
  weekNumber: number;
  phaseNumber: number;
  title: string;
  skill: string;
  whyItMatters: string;
  tutorial: Tutorial;
  watchSegment: string;
  practicalTask: string;
  expectedResult: string;
  checklist: LessonCheckItem[];
  completed: boolean;
  completedAt?: string;
  submissionNote?: string;
  artifactName?: string;
  artifactDataUrl?: string;
  xpReward: number;
  estimatedMinutes: number;
  isFilmStudy?: boolean;
}

export interface WeekModule {
  weekNumber: number;
  title: string;
  phaseNumber: number;
  phaseTitle: string;
  focusSummary: string;
  milestoneArtifact: string;
  targetDurationWeeklyMinutes: number;
  days: LessonDay[];
}

export interface PhaseInfo {
  phaseNumber: number;
  weeksRange: string;
  title: string;
  description: string;
  targetArtifact: string;
  isUnlocked: boolean;
}

export interface StudioProject {
  id: string;
  title: string;
  phase: number;
  targetDuration: string; // e.g. "30-90 sec", "2-5 min", "10-20 min"
  logline: string;
  status: 'PLANNING' | 'IN_PRODUCTION' | 'POST_PRODUCTION' | 'COMPLETED' | 'FESTIVAL_CIRCUIT';
  currentStep: string;
  shotCount: number;
  completedShots: number;
  completionPercentage: number;
  directorStatement?: string;
  previewThumbnail?: string;
}

export interface CharacterIP {
  id: string;
  name: string;
  role: string;
  kazakhCulturalInspiration: string;
  personality: string;
  goal: string;
  fear: string;
  strength: string;
  weakness: string;
  visualMotif: string;
  silhouetteNotes: string;
  colorPalette: string[];
  status: 'CONCEPT' | 'BIBLE_IN_PROGRESS' | 'BIBLE_LOCKED' | 'RIGGED';
  expressionsCount: number;
  posesCount: number;
  turnaroundDone: boolean;
}

export interface ProductionShot {
  id: string;
  projectId: string;
  scene: number;
  shotNumber: number;
  codeName: string; // e.g., S01_SH003_V02
  description: string;
  durationSeconds: number;
  status: ShotStatus;
  aiModel?: string;
  prompt?: string;
  references?: string;
  storyboardSketch?: string;
  layoutStatus?: string;
  notes?: string;
  updatedAt: string;
}

export interface ProductionProvenance {
  id: string;
  projectId: string;
  projectName: string;
  originalSketchesCount: number;
  procreateFiles: string[];
  blenderScenes: string[];
  storyboardLockedDate: string;
  scriptVersion: string;
  aiPromptsUsed: number;
  aiModelsUsed: string[];
  musicSource: string;
  musicLicenseType: string;
  soundDesignSource: string;
  voiceCast: string;
  aiDisclosureStatement: string;
  lastUpdated: string;
}

export interface StudioSkill {
  id: string;
  name: string;
  category: 'FOUNDATION' | 'CHARACTER' | 'ANIMATION' | 'CINEMA' | 'TECH_AI' | 'DIRECTING';
  level: SkillLevel;
  currentXp: number;
  targetXp: number;
  iconName: string;
  completedExercisesCount: number;
  verifiedProjects: string[];
}

export interface OpportunityItem {
  id: string;
  title: string;
  category: 'ANIMATION_FESTIVAL' | 'AI_FILM_FESTIVAL' | 'DIGITAL_ART' | 'YOUTH_FILM' | 'SCHOLARSHIP' | 'GAMEDEV' | 'BLENDER_3D' | 'UWC';
  deadline: string;
  location: string;
  eligibility: string;
  description: string;
  verifiedUrl: string;
  isSaved: boolean;
  notes?: string;
}

export interface AIToolWatchItem {
  id: string;
  name: string;
  organization: string;
  primaryRole: string;
  currentVersion: string;
  recommendedWorkflow: string;
  status: 'RECOMMENDED' | 'TESTING' | 'COMMERCIAL_SAFE' | 'DEPRECATED';
  officialUrl: string;
  documentationUrl: string;
  lastAudited: string;
  notes: string;
}

export interface StudioUserStats {
  currentDay: number;
  totalDaysCompleted: number;
  streakDays: number;
  totalHoursLearned: number;
  totalXp: number;
  completedArtifactsCount: number;
  activeFilm: string;
}

export interface StudioDatabaseState {
  currentRole: UserRole;
  stats: StudioUserStats;
  weeks: WeekModule[];
  tutorials: Tutorial[];
  projects: StudioProject[];
  characters: CharacterIP[];
  shots: ProductionShot[];
  provenance: ProductionProvenance[];
  skills: StudioSkill[];
  opportunities: OpportunityItem[];
  aiTools: AIToolWatchItem[];
  isCloudSynced: boolean;
  lastSyncTimestamp: string;
}
