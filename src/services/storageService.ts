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

const STORAGE_KEY = 'animation_studio_academy_v1';

export class StudioStorageService {
  private state: StudioDatabaseState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = this.loadInitialState();
  }

  private loadInitialState(): StudioDatabaseState {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure structure validity
        if (parsed.stats && parsed.weeks && parsed.projects) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using initial state:', e);
    }

    return {
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

  // Reset demo data
  public resetToFactoryDemo() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this.loadInitialState();
    this.persist();
  }
}

export const studioStorage = new StudioStorageService();
