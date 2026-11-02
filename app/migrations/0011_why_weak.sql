-- 学ぶ理由 (one id) and 苦手なこと (comma-separated ids) chosen by each counted browser (additive).
-- Only the choice ids are sent (e.g. travel / pron,listen); empty when not answered.
ALTER TABLE bf_events ADD COLUMN why TEXT NOT NULL DEFAULT '';
ALTER TABLE bf_events ADD COLUMN weak TEXT NOT NULL DEFAULT '';
