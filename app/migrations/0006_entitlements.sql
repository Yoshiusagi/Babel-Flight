-- Features an account may use beyond the free app (additive only).
-- plan 'all' = test account: every feature, no status locks, no daily AI limits.
-- Future paid plans and hidden rewards are recorded here too.
CREATE TABLE IF NOT EXISTS bf_entitlements (
  uid TEXT PRIMARY KEY,           -- Firebase user id
  plan TEXT NOT NULL,             -- 'all' today; later e.g. 'economy' / 'business' / 'first'
  source TEXT NOT NULL,           -- 'tester', later 'purchase' / 'reward'
  granted_at INTEGER NOT NULL
);
