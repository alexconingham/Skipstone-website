-- ============================================================
--  Remember to Die — Blog Posts
--  Paste this entire file into the Supabase SQL Editor and Run
-- ============================================================

CREATE TABLE IF NOT EXISTS posts (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT        NOT NULL,
  slug         TEXT        NOT NULL UNIQUE,
  excerpt      TEXT,
  content      TEXT        NOT NULL,         -- Markdown
  cover_image  TEXT,                          -- Optional URL
  published_at TIMESTAMPTZ,                   -- NULL = draft; future = scheduled
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── Row Level Security ──────────────────────────────────────
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read posts whose publish date has passed
CREATE POLICY "anon_read_published"
  ON posts FOR SELECT
  TO anon, authenticated
  USING (published_at IS NOT NULL AND published_at <= NOW());

-- ── Auto-update updated_at ──────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER posts_set_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
