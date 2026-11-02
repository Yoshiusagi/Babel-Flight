-- 表示言語 (display language: ja / en / ko / zh) of each counted visit and lesson (additive).
-- Every row before the display languages existed was Japanese.
ALTER TABLE bf_events ADD COLUMN ui TEXT NOT NULL DEFAULT 'ja';
