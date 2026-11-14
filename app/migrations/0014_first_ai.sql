-- ファーストクラスのAI (additive only): 専属AIコーチの週のプラン作り and AI添削つき日記, counted per account and day.
ALTER TABLE bf_ai_usage ADD COLUMN coach INTEGER NOT NULL DEFAULT 0;
ALTER TABLE bf_ai_usage ADD COLUMN diary INTEGER NOT NULL DEFAULT 0;
