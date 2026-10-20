-- Babel Flight anonymous usage counts + the /stats passphrase (additive only).
-- Stored: a random per-browser id, the Japan-time date, lesson language/mode.
-- Never stored: names, IP addresses, user agents, answers.

CREATE TABLE IF NOT EXISTS bf_visitors (
  vid TEXT PRIMARY KEY,
  first_day TEXT NOT NULL,
  last_day TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS bf_visitors_first_day ON bf_visitors (first_day);

CREATE TABLE IF NOT EXISTS bf_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  day TEXT NOT NULL,
  ts INTEGER NOT NULL,
  vid TEXT NOT NULL,
  kind TEXT NOT NULL,
  lang TEXT NOT NULL,
  mode TEXT NOT NULL,
  track TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS bf_events_day ON bf_events (day);
CREATE INDEX IF NOT EXISTS bf_events_vid_day ON bf_events (vid, day);

-- One row only (id = 1): PBKDF2 hash of the owner's passphrase, chosen on first visit to /stats.
CREATE TABLE IF NOT EXISTS bf_auth (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  salt TEXT NOT NULL,
  hash TEXT NOT NULL,
  iter INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);

-- SHA-256 of the session token (the token itself only lives in the HttpOnly cookie).
CREATE TABLE IF NOT EXISTS bf_sessions (
  token_hash TEXT PRIMARY KEY,
  expires INTEGER NOT NULL
);

-- Failed passphrase attempts per hour (brute-force brake).
CREATE TABLE IF NOT EXISTS bf_login_fail (
  hour INTEGER PRIMARY KEY,
  n INTEGER NOT NULL
);
