import {
  StudioDatabaseState,
  UserRole,
  LessonDay,
  ProductionShot,
  CharacterIP,
  StudioProject,
  OpportunityItem,
  AIToolWatchItem,
} from '../types';
import { INITIAL_CURRICULUM } from '../data/curriculumData';
import { TUTORIAL_LIBRARY } from '../data/tutorialLibrary';
import {
  INITIAL_USER_STATS,
  INITIAL_SKILLS,
  INITIAL_PROJECTS,
  INITIAL_CHARACTERS,
  INITIAL_SHOTS,
  INITIAL_PROVENANCE,
  INITIAL_OPPORTUNITIES,
  INITIAL_AI_TOOLS,
} from '../data/initialStudioData';

export const CURRICULUM_VERSION = 3;
const STORAGE_KEY = 'animation_studio_academy_v3';
const LEGACY_STORAGE_KEYS = [
  'animation_studio_academy_v2',
  'animation_studio_academy_v1',
];
const AUTO_BACKUP_KEY = 'animation_studio_academy_pre_reset_backup';

export class StudioStorageService {
  private state: StudioDatabaseState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = this.loadInitialState();
  }

  private createFreshInitialState(): StudioDatabaseState {
    const freshWeeks = INITIAL_CURRICULUM.map(week => ({
      ...week,
      days: week.days.map(day => ({
        ...day,
        completed: false,
        completedAt: undefined,
        submissionNote: undefined,
        artifactName: undefined,
        artifactDataUrl: undefined,
        checklist: day.checklist.map(item => ({ ...item, checked: false })),
      })),
    }));

    const freshSkills = INITIAL_SKILLS.map(skill => ({
      ...skill,
      currentXp: 0,
      completedExercisesCount: 0,
      verifiedProjects: [],
    }));

    return {
      curriculumVersion: CURRICULUM_VERSION,
      currentRole: 'student',
      stats: {
        currentDay: 1,
        totalDaysCompleted: 0,
        streakDays: 0,
        totalHoursLearned: 0,
        totalXp: 0,
        completedArtifactsCount: 0,
        activeFilm: 'Film #1: Student Original Short (30–90 sec)',
      },
      weeks: freshWeeks,
      tutorials: TUTORIAL_LIBRARY,
      projects: INITIAL_PROJECTS,
      characters: INITIAL_CHARACTERS,
      shots: INITIAL_SHOTS,
      provenance: [INITIAL_PROVENANCE],
      skills: freshSkills,
      opportunities: INITIAL_OPPORTUNITIES,
      aiTools: INITIAL_AI_TOOLS,
      storageMode: 'LOCAL_PROGRESS',
      lastSavedTimestamp: new Date().toISOString(),
    };
  }

  private loadInitialState(): StudioDatabaseState {
    try {
      // 1. Try to load from current storage key
      let stored = localStorage.getItem(STORAGE_KEY);
      let isFromLegacyKey = false;

      // 2. Check legacy storage keys if current key does not exist
      if (!stored) {
        for (const legKey of LEGACY_STORAGE_KEYS) {
          const legVal = localStorage.getItem(legKey);
          if (legVal) {
            stored = legVal;
            isFromLegacyKey = true;
            break;
          }
        }
      }

      if (stored) {
        const parsed = JSON.parse(stored);

        // Detect if stored data is from old pre-launch dev seeds
        // The real student has not started yet; dev seed had Day 4, fake XP, or was saved under older schema
        const isPreLaunchSeed =
          isFromLegacyKey ||
          !parsed.curriculumVersion ||
          parsed.curriculumVersion < CURRICULUM_VERSION ||
          parsed.stats?.currentDay === 4 ||
          parsed.stats?.totalDaysCompleted === 3 ||
          parsed.stats?.totalXp === 180 ||
          parsed.weeks?.[0]?.days?.[0]?.title?.includes('Blender');

        if (isPreLaunchSeed) {
          console.info('[Curriculum Migration] Pre-launch seed or legacy version detected. Backing up and resetting to clean Day 1 launch state.');
          try {
            localStorage.setItem(AUTO_BACKUP_KEY, stored);
            LEGACY_STORAGE_KEYS.forEach(k => localStorage.removeItem(k));
          } catch (e) {
            // ignore
          }

          const freshState = this.createFreshInitialState();
          // Save the clean launch state to v3 storage key
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(freshState));
          } catch (e) {
            // ignore
          }
          return freshState;
        }

        // 3. User is running CURRICULUM_VERSION >= 3 with genuine progress!
        // Perform safe curriculum schema synchronization:
        // Bundled INITIAL_CURRICULUM is authoritative for titles, descriptions, tutorials, tasks, checklists.
        // User progress (completions, notes, artifacts, checkmarks) is preserved.
        const completedDaysMap = new Map<string, Partial<LessonDay>>();
        if (Array.isArray(parsed.weeks)) {
          for (const oldWeek of parsed.weeks) {
            if (Array.isArray(oldWeek.days)) {
              for (const oldDay of oldWeek.days) {
                if (oldDay.completed || oldDay.submissionNote || oldDay.artifactName || oldDay.artifactDataUrl) {
                  completedDaysMap.set(oldDay.id, {
                    completed: oldDay.completed,
                    completedAt: oldDay.completedAt,
                    submissionNote: oldDay.submissionNote,
                    artifactName: oldDay.artifactName,
                    artifactDataUrl: oldDay.artifactDataUrl,
                    checklist: oldDay.checklist,
                  });
                }
              }
            }
          }
        }

        // Deep merge bundled curriculum with user completions
        const synchronizedWeeks = INITIAL_CURRICULUM.map(week => ({
          ...week,
          days: week.days.map(day => {
            const userSaved = completedDaysMap.get(day.id);
            if (userSaved && userSaved.completed) {
              return {
                ...day,
                completed: true,
                completedAt: userSaved.completedAt || new Date().toISOString(),
                submissionNote: userSaved.submissionNote,
                artifactName: userSaved.artifactName,
                artifactDataUrl: userSaved.artifactDataUrl,
                checklist: day.checklist.map(item => {
                  const savedItem = userSaved.checklist?.find(c => c.id === item.id);
                  return savedItem ? { ...item, checked: savedItem.checked } : item;
                }),
              };
            }
            return {
              ...day,
              completed: false,
              completedAt: undefined,
              submissionNote: undefined,
              artifactName: undefined,
              artifactDataUrl: undefined,
              checklist: day.checklist.map(item => ({ ...item, checked: false })),
            };
          }),
        }));

        const actualCompletedCount = synchronizedWeeks.flatMap(w => w.days).filter(d => d.completed).length;
        const actualXp = synchronizedWeeks
          .flatMap(w => w.days)
          .filter(d => d.completed)
          .reduce((sum, d) => sum + (d.xpReward || 50), 0);
        const actualArtifactsCount = synchronizedWeeks
          .flatMap(w => w.days)
          .filter(d => d.completed && (d.artifactName || d.artifactDataUrl)).length;

        const currentDayNum = actualCompletedCount === 0 ? 1 : Math.min(365, actualCompletedCount + 1);

        const state: StudioDatabaseState = {
          curriculumVersion: CURRICULUM_VERSION,
          currentRole: parsed.currentRole || 'student',
          weeks: synchronizedWeeks,
          tutorials: TUTORIAL_LIBRARY,
          projects: parsed.projects?.length ? parsed.projects : INITIAL_PROJECTS,
          characters: parsed.characters?.length ? parsed.characters : INITIAL_CHARACTERS,
          shots: parsed.shots?.length ? parsed.shots : INITIAL_SHOTS,
          provenance: parsed.provenance?.length ? parsed.provenance : [INITIAL_PROVENANCE],
          skills: parsed.skills?.length ? parsed.skills : INITIAL_SKILLS,
          opportunities: parsed.opportunities?.length ? parsed.opportunities : INITIAL_OPPORTUNITIES,
          aiTools: INITIAL_AI_TOOLS,
          stats: {
            ...INITIAL_USER_STATS,
            ...parsed.stats,
            currentDay: currentDayNum,
            totalDaysCompleted: actualCompletedCount,
            totalXp: actualXp,
            completedArtifactsCount: actualArtifactsCount,
          },
          storageMode: 'LOCAL_PROGRESS',
          lastSavedTimestamp: new Date().toISOString(),
        };

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
          // ignore
        }

        return state;
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using initial clean launch state:', e);
    }

    const pristineState = this.createFreshInitialState();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pristineState));
    } catch (e) {
      // ignore
    }
    return pristineState;
  }

  private persist() {
    try {
      this.state.lastSavedTimestamp = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Storage persist error:', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  public getState(): StudioDatabaseState {
    return this.state;
  }

  public setRole(role: UserRole) {
    this.state.currentRole = role;
    this.persist();
  }

  // Complete a lesson day
  public completeDay(
    dayId: string,
    submissionNote?: string,
    artifactName?: string,
    artifactDataUrl?: string
  ) {
    let completedLesson: LessonDay | null = null;

    // Search and update day
    for (const week of this.state.weeks) {
      for (const day of week.days) {
        if (day.id === dayId) {
          day.completed = true;
          day.completedAt = new Date().toISOString();
          if (submissionNote) day.submissionNote = submissionNote;
          if (artifactName) day.artifactName = artifactName;
          if (artifactDataUrl) day.artifactDataUrl = artifactDataUrl;
          day.checklist.forEach(item => (item.checked = true));
          completedLesson = day;
          break;
        }
      }
      if (completedLesson) break;
    }

    if (completedLesson) {
      this.state.stats.totalDaysCompleted += 1;
      this.state.stats.streakDays += 1;
      this.state.stats.totalXp += completedLesson.xpReward;
      this.state.stats.totalHoursLearned += Math.round((completedLesson.estimatedMinutes / 60) * 10) / 10;
      this.state.stats.completedArtifactsCount += 1;

      // Advance to next day if this was current day
      if (completedLesson.dayNumber === this.state.stats.currentDay) {
        this.state.stats.currentDay = Math.min(365, this.state.stats.currentDay + 1);
      }

      // Update skill XP
      const relatedSkill = this.state.skills.find(
        s => s.name.toLowerCase().includes(completedLesson!.skill.toLowerCase()) ||
             completedLesson!.skill.toLowerCase().includes(s.name.toLowerCase())
      );
      if (relatedSkill) {
        relatedSkill.currentXp += completedLesson.xpReward;
        relatedSkill.completedExercisesCount += 1;
        if (relatedSkill.currentXp >= relatedSkill.targetXp && relatedSkill.level !== 'PRODUCTION_READY') {
          // Promote level
          const levels = ['BEGINNER', 'LEARNING', 'COMPETENT', 'STRONG', 'PRODUCTION_READY'] as const;
          const idx = levels.indexOf(relatedSkill.level);
          if (idx < levels.length - 1) {
            relatedSkill.level = levels[idx + 1];
            relatedSkill.targetXp += 300;
          }
        }
      }
    }

    this.persist();
  }

  // Toggle checklist item
  public toggleChecklistItem(dayId: string, checkId: string) {
    for (const week of this.state.weeks) {
      for (const day of week.days) {
        if (day.id === dayId) {
          const item = day.checklist.find(c => c.id === checkId);
          if (item) {
            item.checked = !item.checked;
          }
          break;
        }
      }
    }
    this.persist();
  }

  // Get active day
  public getActiveLesson(): LessonDay {
    const currentDayNum = this.state.stats.currentDay;
    for (const week of this.state.weeks) {
      for (const day of week.days) {
        if (day.dayNumber === currentDayNum) {
          return day;
        }
      }
    }
    return this.state.weeks[0].days[0];
  }

  // Update shot status
  public updateShotStatus(shotId: string, status: ProductionShot['status']) {
    const shot = this.state.shots.find(s => s.id === shotId);
    if (shot) {
      shot.status = status;
      shot.updatedAt = new Date().toISOString();
      this.persist();
    }
  }

  // Add new shot
  public addShot(shot: ProductionShot) {
    this.state.shots.push(shot);
    this.persist();
  }

  // Toggle opportunity saved status
  public toggleOpportunitySaved(oppId: string) {
    const opp = this.state.opportunities.find(o => o.id === oppId);
    if (opp) {
      opp.isSaved = !opp.isSaved;
      this.persist();
    }
  }

  // Parent admin: update upcoming curriculum (NEVER BREAKS PAST HISTORY!)
  public updateUpcomingCurriculum(fromWeekNumber: number, reviewNotes: string) {
    // Only inspect weeks >= fromWeekNumber
    for (const week of this.state.weeks) {
      if (week.weekNumber >= fromWeekNumber) {
        // Ensure no completed days are touched
        for (const day of week.days) {
          if (!day.completed) {
            day.whyItMatters = `${day.whyItMatters} [Audited & Refreshed by Director Dad for 2026/2027 Pipeline]`;
          }
        }
      }
    }
    this.persist();
  }

  // Export studio archive for backup / cross-device transfer (lightweight, no bulky media strings)
  public exportStudioArchiveJson(): string {
    const cleanState = JSON.parse(JSON.stringify(this.state));
    if (cleanState.weeks) {
      cleanState.weeks.forEach((w: any) => {
        if (w.days) {
          w.days.forEach((d: any) => {
            delete d.artifactDataUrl;
          });
        }
      });
    }
    return JSON.stringify(cleanState, null, 2);
  }

  // Import studio archive
  public importStudioArchiveJson(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.stats && parsed.weeks && parsed.projects) {
        this.state = parsed;
        this.persist();
        return true;
      }
    } catch (e) {
      console.error('Import failed:', e);
    }
    return false;
  }

  // Start Fresh action with automatic backup before reset
  public startFreshWithBackup(): { backupCreated: boolean } {
    try {
      const currentRaw = localStorage.getItem(STORAGE_KEY);
      if (currentRaw) {
        localStorage.setItem(AUTO_BACKUP_KEY, currentRaw);
      }
    } catch (e) {
      console.warn('Could not save pre-reset backup:', e);
    }

    localStorage.removeItem(STORAGE_KEY);
    this.state = {
      currentRole: 'student',
      stats: INITIAL_USER_STATS,
      weeks: INITIAL_CURRICULUM,
      tutorials: TUTORIAL_LIBRARY,
      projects: INITIAL_PROJECTS,
      characters: INITIAL_CHARACTERS,
      shots: INITIAL_SHOTS,
      provenance: [INITIAL_PROVENANCE],
      skills: INITIAL_SKILLS,
      opportunities: INITIAL_OPPORTUNITIES,
      aiTools: INITIAL_AI_TOOLS,
      storageMode: 'LOCAL_PROGRESS',
      lastSavedTimestamp: new Date().toISOString(),
    };
    this.persist();
    return { backupCreated: true };
  }

  // Reset demo data
  public resetToFactoryDemo() {
    this.startFreshWithBackup();
  }
}

export const studioStorage = new StudioStorageService();
