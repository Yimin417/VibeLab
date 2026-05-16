-- Run this in your Supabase SQL Editor to create the tables

-- Likes table: one row per user per project
CREATE TABLE IF NOT EXISTS likes (
  id BIGSERIAL PRIMARY KEY,
  project_id TEXT NOT NULL,
  fingerprint TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(project_id, fingerprint)
);

-- Index for fast lookup by project
CREATE INDEX IF NOT EXISTS idx_likes_project_id ON likes(project_id);
CREATE INDEX IF NOT EXISTS idx_likes_created_at ON likes(created_at);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookup by project, sorted by time
CREATE INDEX IF NOT EXISTS idx_comments_project_id ON comments(project_id, created_at DESC);
