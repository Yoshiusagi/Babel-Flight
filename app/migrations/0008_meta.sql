-- Small key/value notes the server keeps for itself (e.g. how far the move to the new site got).
CREATE TABLE IF NOT EXISTS bf_meta (
  k TEXT PRIMARY KEY,
  v TEXT NOT NULL
);
