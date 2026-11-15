-- 共同フライト (additive only). See src/lib/social.server.ts.
-- One row per person: who they want to fly with. Flying together = both rows point at each other.
CREATE TABLE IF NOT EXISTS bf_coop (
  uid TEXT PRIMARY KEY,
  partner TEXT NOT NULL DEFAULT '',
  week TEXT NOT NULL DEFAULT '',
  n INTEGER NOT NULL DEFAULT 0,
  day TEXT NOT NULL DEFAULT '',
  dn INTEGER NOT NULL DEFAULT 0,
  at INTEGER NOT NULL DEFAULT 0,
  trips INTEGER NOT NULL DEFAULT 0,
  since INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS bf_coop_partner ON bf_coop (partner);
