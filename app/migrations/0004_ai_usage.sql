-- Daily AI usage per account (additive only). Used for the per-account and site-wide daily limits.
CREATE TABLE IF NOT EXISTS bf_ai_usage (
  uid TEXT NOT NULL,
  day TEXT NOT NULL,              -- Japan-time date, YYYY-MM-DD
  ask INTEGER NOT NULL DEFAULT 0, -- 「AIに質問」 answers
  atc_start INTEGER NOT NULL DEFAULT 0, -- ATC role-play sessions started
  atc_turn INTEGER NOT NULL DEFAULT 0,  -- ATC role-play replies
  PRIMARY KEY (uid, day)
);
CREATE INDEX IF NOT EXISTS bf_ai_usage_day ON bf_ai_usage (day);
