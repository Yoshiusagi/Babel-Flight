-- AI example-sentence practice (「AIの例文練習」): daily count per account. Additive only.
ALTER TABLE bf_ai_usage ADD COLUMN drill INTEGER NOT NULL DEFAULT 0;
