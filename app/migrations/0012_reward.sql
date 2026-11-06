-- The hidden reward (裏設定, additive only): right answers counted on the server, at most 300 a day
-- (Japan time). Reaching 10,000 once gives ファースト for 90 days. See src/lib/reward.server.ts.
CREATE TABLE IF NOT EXISTS bf_reward (
  uid TEXT PRIMARY KEY,                 -- Firebase user id
  total INTEGER NOT NULL DEFAULT 0,     -- right answers counted so far
  day TEXT NOT NULL DEFAULT '',         -- Japan-time date (YYYY-MM-DD) of day_n
  day_n INTEGER NOT NULL DEFAULT 0,     -- counted on that day
  last_at INTEGER NOT NULL DEFAULT 0,   -- ms; the last lesson counted
  granted_at INTEGER NOT NULL DEFAULT 0, -- ms; 0 = not reached yet (given once only)
  until INTEGER NOT NULL DEFAULT 0      -- ms; ファースト lasts until then
);
