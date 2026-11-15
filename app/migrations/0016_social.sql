-- フレンドとランキング (additive only). See src/lib/social.server.ts.
CREATE TABLE IF NOT EXISTS bf_friend_codes (
  uid TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL
);
-- one row per direction (a sees b)
CREATE TABLE IF NOT EXISTS bf_friends (
  a TEXT NOT NULL,
  b TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (a, b)
);
-- the name and icon friends see, the ranking switch (off at first) and this week's miles (only while on)
CREATE TABLE IF NOT EXISTS bf_rank (
  uid TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '',
  rank_on INTEGER NOT NULL DEFAULT 0,
  week TEXT NOT NULL DEFAULT '',
  miles INTEGER NOT NULL DEFAULT 0,
  day TEXT NOT NULL DEFAULT '',
  day_miles INTEGER NOT NULL DEFAULT 0,
  miles_at INTEGER NOT NULL DEFAULT 0,
  add_day TEXT NOT NULL DEFAULT '',
  adds INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL DEFAULT 0
);
