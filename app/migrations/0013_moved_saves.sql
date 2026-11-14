-- Progress copied from the old site (Higgsfield) by the "Move data" workflow (additive only).
-- The account's own copy on this site is never overwritten by the move: the old copy waits here,
-- and the page merges it into the account (keeping the best of both, like two devices syncing)
-- the next time the person signs in, then marks it merged. See src/lib/move.server.ts.
CREATE TABLE IF NOT EXISTS bf_moved_saves (
  uid TEXT PRIMARY KEY,                  -- Firebase user id
  data TEXT NOT NULL,                    -- the old site's saved progress (JSON)
  t INTEGER NOT NULL DEFAULT 0,          -- ms; when that copy was saved on the old site
  merged_t INTEGER NOT NULL DEFAULT 0,   -- t of the copy the page has merged (merged when >= t)
  updated_at INTEGER NOT NULL DEFAULT 0  -- ms; when the move last wrote this row
);
