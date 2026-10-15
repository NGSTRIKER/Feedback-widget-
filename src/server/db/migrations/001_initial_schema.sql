-- Migration: 001_initial_schema.sql
-- Description: Core tables for Projects and Feedback submissions

CREATE TABLE IF NOT EXISTS _migrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_key VARCHAR(64) UNIQUE NOT NULL,
  name VARCHAR(128) NOT NULL,
  allowed_origins TEXT[] NOT NULL DEFAULT ARRAY['*'],
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  category VARCHAR(32) NOT NULL CHECK (category IN ('bug', 'feature', 'general', 'other')),
  message TEXT NOT NULL CHECK (char_length(message) >= 1 AND char_length(message) <= 5000),
  rating SMALLINT CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
  email VARCHAR(255),
  context JSONB NOT NULL DEFAULT '{}'::jsonb,
  triage_status VARCHAR(32) NOT NULL DEFAULT 'new' CHECK (triage_status IN ('new', 'in_review', 'resolved', 'archived')),
  triage_notes TEXT,
  client_ip_hash VARCHAR(64),
  user_agent TEXT,
  idempotency_key VARCHAR(128),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_key ON projects(project_key);
CREATE INDEX IF NOT EXISTS idx_feedback_project_created ON feedback(project_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_project_category ON feedback(project_id, category);
CREATE INDEX IF NOT EXISTS idx_feedback_project_triage ON feedback(project_id, triage_status);
CREATE INDEX IF NOT EXISTS idx_feedback_idempotency ON feedback(project_id, idempotency_key) WHERE idempotency_key IS NOT NULL;
