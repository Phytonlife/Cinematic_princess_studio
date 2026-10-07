/**
 * Animation Studio Academy — Relational Database Schema
 * PostgreSQL / Supabase Compatible DDL Script
 *
 * For Dad (Developer Father) to review or deploy to Supabase/PostgreSQL.
 */

export const POSTGRES_SCHEMA_SQL = `
-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS & ROLES
CREATE TYPE user_role AS ENUM ('student', 'parent', 'mentor');

CREATE TABLE IF NOT EXISTS studio_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  current_day INT NOT NULL DEFAULT 1,
  total_xp INT NOT NULL DEFAULT 0,
  streak_days INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TUTORIALS CATALOG
CREATE TYPE tutorial_status AS ENUM ('VERIFIED', 'NEEDS_RECHECK', 'BROKEN');
CREATE TYPE skill_level AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

CREATE TABLE IF NOT EXISTS tutorials (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  skill TEXT NOT NULL,
  source TEXT NOT NULL,
  verified_url TEXT NOT NULL,
  is_official BOOLEAN NOT NULL DEFAULT true,
  duration_minutes INT NOT NULL,
  level skill_level NOT NULL DEFAULT 'BEGINNER',
  language TEXT NOT NULL DEFAULT 'English',
  status tutorial_status NOT NULL DEFAULT 'VERIFIED',
  last_checked DATE NOT NULL DEFAULT CURRENT_DATE,
  description TEXT NOT NULL
);

-- 4. CURRICULUM WEEKS & LESSONS
CREATE TABLE IF NOT EXISTS curriculum_weeks (
  week_number INT PRIMARY KEY,
  phase_number INT NOT NULL,
  phase_title TEXT NOT NULL,
  title TEXT NOT NULL,
  focus_summary TEXT NOT NULL,
  milestone_artifact TEXT NOT NULL,
  target_weekly_minutes INT NOT NULL DEFAULT 240,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS curriculum_lessons (
  id TEXT PRIMARY KEY,
  day_number INT NOT NULL UNIQUE,
  week_number INT NOT NULL REFERENCES curriculum_weeks(week_number) ON DELETE CASCADE,
  phase_number INT NOT NULL,
  title TEXT NOT NULL,
  skill TEXT NOT NULL,
  why_it_matters TEXT NOT NULL,
  tutorial_id TEXT NOT NULL REFERENCES tutorials(id),
  watch_segment TEXT NOT NULL,
  practical_task TEXT NOT NULL,
  expected_result TEXT NOT NULL,
  xp_reward INT NOT NULL DEFAULT 50,
  estimated_minutes INT NOT NULL DEFAULT 45,
  is_film_study BOOLEAN NOT NULL DEFAULT false
);

-- 5. STUDENT PROGRESS & SUBMISSIONS
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES studio_users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL REFERENCES curriculum_lessons(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  checklist_state JSONB NOT NULL DEFAULT '[]'::jsonb,
  submission_note TEXT,
  artifact_name TEXT,
  artifact_storage_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- 6. STUDIO PROJECTS
CREATE TYPE project_status AS ENUM ('PLANNING', 'IN_PRODUCTION', 'POST_PRODUCTION', 'COMPLETED', 'FESTIVAL_CIRCUIT');

CREATE TABLE IF NOT EXISTS studio_projects (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES studio_users(id),
  title TEXT NOT NULL,
  phase INT NOT NULL,
  target_duration TEXT NOT NULL,
  logline TEXT NOT NULL,
  status project_status NOT NULL DEFAULT 'PLANNING',
  current_step TEXT NOT NULL,
  shot_count INT NOT NULL DEFAULT 0,
  completed_shots INT NOT NULL DEFAULT 0,
  completion_percentage INT NOT NULL DEFAULT 0,
  director_statement TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. CHARACTER IP & BIBLES
CREATE TABLE IF NOT EXISTS characters (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  kazakh_inspiration TEXT NOT NULL,
  personality TEXT NOT NULL,
  goal TEXT NOT NULL,
  fear TEXT NOT NULL,
  strength TEXT NOT NULL,
  weakness TEXT NOT NULL,
  visual_motif TEXT NOT NULL,
  silhouette_notes TEXT NOT NULL,
  color_palette JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'CONCEPT',
  expressions_count INT NOT NULL DEFAULT 0,
  poses_count INT NOT NULL DEFAULT 0,
  turnaround_done BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. SHOT TRACKER
CREATE TYPE shot_status AS ENUM ('TODO', 'STORYBOARD', 'LAYOUT', 'GENERATING', 'REVIEW', 'REVISION', 'APPROVED', 'FINAL');

CREATE TABLE IF NOT EXISTS shots (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES studio_projects(id) ON DELETE CASCADE,
  scene INT NOT NULL,
  shot_number INT NOT NULL,
  code_name TEXT NOT NULL, -- e.g. S01_SH001_V02
  description TEXT NOT NULL,
  duration_seconds NUMERIC(4,1) NOT NULL,
  status shot_status NOT NULL DEFAULT 'TODO',
  ai_model TEXT,
  prompt TEXT,
  references TEXT,
  storyboard_sketch TEXT,
  layout_status TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. PRODUCTION PROVENANCE & AI DISCLOSURE
CREATE TABLE IF NOT EXISTS production_provenance (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL UNIQUE REFERENCES studio_projects(id) ON DELETE CASCADE,
  original_sketches_count INT NOT NULL DEFAULT 0,
  procreate_files JSONB NOT NULL DEFAULT '[]'::jsonb,
  blender_scenes JSONB NOT NULL DEFAULT '[]'::jsonb,
  storyboard_locked_date DATE,
  script_version TEXT NOT NULL,
  ai_prompts_used INT NOT NULL DEFAULT 0,
  ai_models_used JSONB NOT NULL DEFAULT '[]'::jsonb,
  music_source TEXT NOT NULL,
  music_license_type TEXT NOT NULL,
  sound_design_source TEXT NOT NULL,
  voice_cast TEXT NOT NULL,
  ai_disclosure_statement TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. OPPORTUNITY RADAR & FESTIVALS
CREATE TABLE IF NOT EXISTS opportunities (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  deadline TEXT NOT NULL,
  location TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  description TEXT NOT NULL,
  verified_url TEXT NOT NULL,
  is_saved BOOLEAN NOT NULL DEFAULT false,
  notes TEXT
);

-- 11. AI TOOL WATCH
CREATE TABLE IF NOT EXISTS ai_tools_watch (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  organization TEXT NOT NULL,
  primary_role TEXT NOT NULL,
  current_version TEXT NOT NULL,
  recommended_workflow TEXT NOT NULL,
  status TEXT NOT NULL,
  official_url TEXT NOT NULL,
  documentation_url TEXT NOT NULL,
  last_audited DATE NOT NULL,
  notes TEXT
);

-- INDEXES FOR SPEED
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_shots_project ON shots(project_id);
CREATE INDEX IF NOT EXISTS idx_shots_status ON shots(status);
`;
