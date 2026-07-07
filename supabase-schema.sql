-- Supabase SQL schema for {bengkel_users, bengkel_bookings, bengkel_complaints, bengkel_promos}

-- 1. Table: bengkel_users
-- This holds member and staff accounts including tier and points.
CREATE TABLE IF NOT EXISTS public.bengkel_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text,
  email text UNIQUE,
  password text,
  phone text,
  address text,
  role text DEFAULT 'Member',
  status text DEFAULT 'Aktif',
  membership_tier text DEFAULT 'Regular Member',
  levelMembership text DEFAULT 'Regular Member',
  points integer DEFAULT 0,
  loyalty_points integer DEFAULT 0,
  reward_points integer DEFAULT 0,
  last_product text,
  promo_status text,
  user_source text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Table: bengkel_bookings
-- This stores all customer booking requests.
CREATE TABLE IF NOT EXISTS public.bengkel_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid REFERENCES public.bengkel_users(id) ON DELETE SET NULL,
  member_name text,
  email text,
  vehicle text,
  service text,
  date date,
  complaint text,
  status text DEFAULT 'Terjadwal',
  price integer DEFAULT 0,
  discount_rate integer DEFAULT 0,
  total_price integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. Table: bengkel_complaints
-- This stores support/complaint tickets.
CREATE TABLE IF NOT EXISTS public.bengkel_complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid REFERENCES public.bengkel_users(id) ON DELETE SET NULL,
  member_name text,
  email text,
  phone text,
  vehicle text,
  complaint text,
  status text DEFAULT 'Open',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. Table: bengkel_promos
-- This stores promo campaigns and coupon records.
CREATE TABLE IF NOT EXISTS public.bengkel_promos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE,
  name text,
  discount text,
  type text,
  exp_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. Optional index improvements
CREATE INDEX IF NOT EXISTS idx_bengkel_users_role ON public.bengkel_users(role);
CREATE INDEX IF NOT EXISTS idx_bengkel_bookings_member_id ON public.bengkel_bookings(member_id);
CREATE INDEX IF NOT EXISTS idx_bengkel_complaints_member_id ON public.bengkel_complaints(member_id);
CREATE INDEX IF NOT EXISTS idx_bengkel_promos_code ON public.bengkel_promos(code);

-- 6. Update existing table schema if needed (Supabase SQL ALTER statements)
-- Use these if bengkel_users already exists and needs tier/points columns.
ALTER TABLE IF EXISTS public.bengkel_users
  ADD COLUMN IF NOT EXISTS membership_tier text DEFAULT 'Regular Member';
ALTER TABLE IF EXISTS public.bengkel_users
  ADD COLUMN IF NOT EXISTS levelMembership text DEFAULT 'Regular Member';
ALTER TABLE IF EXISTS public.bengkel_users
  ADD COLUMN IF NOT EXISTS points integer DEFAULT 0;
ALTER TABLE IF EXISTS public.bengkel_users
  ADD COLUMN IF NOT EXISTS loyalty_points integer DEFAULT 0;
ALTER TABLE IF EXISTS public.bengkel_users
  ADD COLUMN IF NOT EXISTS reward_points integer DEFAULT 0;
