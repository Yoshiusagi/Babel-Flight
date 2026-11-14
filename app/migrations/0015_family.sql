-- 家族シェア (additive only): an account flying ファースト shares it with up to two others. See src/lib/family.server.ts.
CREATE TABLE IF NOT EXISTS bf_family_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner TEXT NOT NULL,                  -- Firebase uid of the sharer
  member TEXT NOT NULL UNIQUE,          -- Firebase uid of the member (one family at a time)
  joined_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS bf_family_members_owner ON bf_family_members (owner);
-- Invite codes: one use, 7 days. Used codes stay (used_at counts the joins of the last 30 days).
CREATE TABLE IF NOT EXISTS bf_family_codes (
  code TEXT PRIMARY KEY,
  owner TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  used_by TEXT NOT NULL DEFAULT '',
  used_at INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS bf_family_codes_owner ON bf_family_codes (owner);
