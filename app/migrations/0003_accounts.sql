-- Optional Babel Flight accounts (additive only).
-- Email addresses and passwords live in Firebase Authentication, never here.

CREATE TABLE IF NOT EXISTS bf_users (
  uid TEXT PRIMARY KEY,          -- Firebase user id
  provider TEXT NOT NULL,        -- 'google.com' or 'password'
  created_at INTEGER NOT NULL,
  last_login INTEGER NOT NULL
);

-- One progress document per account; rev increases on every write (optimistic locking).
CREATE TABLE IF NOT EXISTS bf_saves (
  uid TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  t INTEGER NOT NULL,
  rev INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- SHA-256 of the session token (the token itself only lives in the HttpOnly cookie).
CREATE TABLE IF NOT EXISTS bf_acct_sessions (
  token_hash TEXT PRIMARY KEY,
  uid TEXT NOT NULL,
  expires INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS bf_acct_sessions_uid ON bf_acct_sessions (uid);
