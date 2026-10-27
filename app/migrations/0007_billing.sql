-- Paid classes bought through Stripe (additive only). One row per account: the latest subscription.
-- plan: 'premium' / 'business' / 'first'; status: Stripe's subscription status
-- (active / trialing / past_due keep the class; canceled / unpaid / incomplete... don't).
CREATE TABLE IF NOT EXISTS bf_billing (
  uid TEXT PRIMARY KEY,                 -- Firebase user id
  customer TEXT NOT NULL,               -- Stripe customer id
  subscription TEXT NOT NULL DEFAULT '',
  plan TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT '',
  period_end INTEGER NOT NULL DEFAULT 0,  -- ms; the next renewal date
  cancel_at INTEGER NOT NULL DEFAULT 0,   -- ms; set when the plan ends at that date
  livemode INTEGER NOT NULL DEFAULT 0,    -- 0 = Stripe test mode
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS bf_billing_customer ON bf_billing (customer);
