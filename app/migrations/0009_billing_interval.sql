-- Monthly or yearly plan (additive). Existing rows were all monthly.
ALTER TABLE bf_billing ADD COLUMN billing_interval TEXT NOT NULL DEFAULT 'month';
