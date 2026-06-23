-- ============ ENUMS ============
create type public.disaster_type as enum ('flood','earthquake','drought','landslide','storm','wildfire','other');
create type public.report_status as enum ('submitted','under_review','matched','in_progress','resolved');
create type public.org_category as enum ('government','non_profit','community','donor');

-- ============ PROFILES ============
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  location text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update to authenticated using (auth.uid() = id);

-- ============ DISASTER REPORTS ============
create table public.disaster_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  disaster_type public.disaster_type not null,
  location text not null,
  description text not null,
  severity int not null default 3,
  needs text[] not null default '{}',
  status public.report_status not null default 'submitted',
  ai_summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.disaster_reports to authenticated;
grant all on public.disaster_reports to service_role;

alter table public.disaster_reports enable row level security;

create policy "Users can view own reports" on public.disaster_reports
  for select to authenticated using (auth.uid() = user_id);
create policy "Users can insert own reports" on public.disaster_reports
  for insert to authenticated with check (auth.uid() = user_id);
create policy "Users can update own reports" on public.disaster_reports
  for update to authenticated using (auth.uid() = user_id);
create policy "Users can delete own reports" on public.disaster_reports
  for delete to authenticated using (auth.uid() = user_id);

-- ============ AID ORGANIZATIONS (public directory) ============
create table public.aid_organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category public.org_category not null,
  description text not null,
  region text not null default 'National',
  amount_label text,
  deadline text,
  verified boolean not null default true,
  website text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

grant select on public.aid_organizations to anon, authenticated;
grant all on public.aid_organizations to service_role;

alter table public.aid_organizations enable row level security;

create policy "Anyone can view aid organizations" on public.aid_organizations
  for select to anon, authenticated using (true);

-- ============ SUPPORT GROUPS (public directory) ============
create table public.support_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  topic text not null,
  region text not null default 'National',
  member_count int not null default 0,
  created_at timestamptz not null default now()
);

grant select on public.support_groups to anon, authenticated;
grant all on public.support_groups to service_role;

alter table public.support_groups enable row level security;

create policy "Anyone can view support groups" on public.support_groups
  for select to anon, authenticated using (true);

-- ============ RELIEF UPDATES (public feed) ============
create table public.relief_updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  region text not null default 'National',
  severity text not null default 'info',
  created_at timestamptz not null default now()
);

grant select on public.relief_updates to anon, authenticated;
grant all on public.relief_updates to service_role;

alter table public.relief_updates enable row level security;

create policy "Anyone can view relief updates" on public.relief_updates
  for select to anon, authenticated using (true);

-- ============ ASSISTANCE CENTERS (public map) ============
create table public.assistance_centers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  region text not null default 'National',
  services text[] not null default '{}',
  is_open boolean not null default true,
  phone text,
  lat double precision,
  lng double precision,
  created_at timestamptz not null default now()
);

grant select on public.assistance_centers to anon, authenticated;
grant all on public.assistance_centers to service_role;

alter table public.assistance_centers enable row level security;

create policy "Anyone can view assistance centers" on public.assistance_centers
  for select to anon, authenticated using (true);

-- ============ updated_at trigger ============
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();
create trigger disaster_reports_updated_at before update on public.disaster_reports
  for each row execute function public.handle_updated_at();

-- ============ auto-create profile on signup ============
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

insert into public.aid_organizations (name, category, description, region, amount_label, deadline, verified, website, tags) values
<<<<<<< HEAD
('Kenya Red Cross Society (KRCS)', 'non_profit', 'Emergency rescue, first aid, temporary tents, water purification, and survival kit distribution across flood and landslide hit counties.', 'National', 'Emergency Aid', 'Ongoing', true, 'https://www.redcross.or.ke/', '{emergency,shelter,first_aid,flood}'),
('NDMA Drought Cash Transfers', 'government', 'Cash disbursements via the Hunger Safety Net Programme (HSNP) to registered vulnerable families in Arid and Semi-Arid Land (ASAL) counties.', 'National', 'Up to KES 20,000', 'Rolling', true, 'https://ndma.go.ke/', '{drought,grants,agriculture}'),
('Safaricom Foundation Disaster Grant', 'donor', 'Support for local community groups, reconstruction of schools and hospitals, and mobile money aid transfers.', 'National', 'Varies', 'Ongoing', true, 'https://www.safaricomfoundation.org/', '{grants,rebuilding,medical}'),
('Ministry of Devolution and ASALs Relief', 'government', 'Government food distribution networks, iron sheets for roofing rebuilds, and direct relief supplies.', 'National', 'In-kind support', 'Ongoing', true, 'https://www.devolution.go.ke/', '{food,materials,emergency}'),
('Equity Group Foundation Recovery Loans', 'non_profit', 'Rehabilitation loans and agricultural inputs grants for smallholder farmers and businesses affected by climate shocks.', 'Rift Valley', 'Up to KES 500,000', 'Dec 31', true, 'https://equitygroupholdings.com/foundation/', '{loans,grants,agriculture}'),
('Budalangi Flood Rebuild Fund', 'community', 'Crowdfunded local building materials pool (timber, cement, roofing sheets) managed by community elders.', 'Western Region', 'Available now', 'Ongoing', true, 'https://www.busiacounty.go.ke/', '{materials,rebuilding,flood}'),
('ActionAid Kenya Livelihood Grants', 'non_profit', 'Direct recovery cash transfers and rebuilding materials focusing on vulnerable women and child-headed households.', 'Coastal Region', 'Up to KES 50,000', 'Ongoing', true, 'https://actionaid-kenya.org/', '{grants,housing,community}'),
('Kenya Farmers Mutual Aid Chama', 'community', 'Grassroots mutual support coordinating seed distribution, tractor sharing, and soil recovery volunteers.', 'Rift Valley', 'Volunteer-led', 'Ongoing', true, 'https://www.kenaff.org/', '{community,volunteers,food,drought}');
=======
('Kenya Red Cross Society (KRCS)', 'non_profit', 'Emergency rescue, first aid, temporary tents, water purification, and survival kit distribution across flood and landslide hit counties.', 'National', 'Emergency Aid', 'Ongoing', true, 'https://www.redcross.or.ke', '{emergency,shelter,first_aid,flood}'),
('NDMA Drought Cash Transfers', 'government', 'Cash disbursements via the Hunger Safety Net Programme (HSNP) to registered vulnerable families in Arid and Semi-Arid Land (ASAL) counties.', 'National', 'Up to KES 20,000', 'Rolling', true, 'https://www.ndma.go.ke', '{drought,grants,agriculture}'),
('Safaricom Foundation Disaster Grant', 'donor', 'Support for local community groups, reconstruction of schools and hospitals, and mobile money aid transfers.', 'National', 'Varies', 'Ongoing', true, 'https://foundation.safaricom.co.ke', '{grants,rebuilding,medical}'),
('Ministry of Devolution and ASALs Relief', 'government', 'Government food distribution networks, iron sheets for roofing rebuilds, and direct relief supplies.', 'National', 'In-kind support', 'Ongoing', true, 'https://meac.go.ke', '{food,materials,emergency}'),
('Equity Group Foundation Recovery Loans', 'non_profit', 'Rehabilitation loans and agricultural inputs grants for smallholder farmers and businesses affected by climate shocks.', 'Rift Valley', 'Up to KES 500,000', 'Dec 31', true, 'https://equitygroupholdings.com', '{loans,grants,agriculture}'),
('Budalangi Flood Rebuild Fund', 'community', 'Crowdfunded local building materials pool (timber, cement, roofing sheets) managed by community elders.', 'Western Region', 'Available now', 'Ongoing', true, 'https://www.busiacounty.go.ke', '{materials,rebuilding,flood}'),
('ActionAid Kenya Livelihood Grants', 'non_profit', 'Direct recovery cash transfers and rebuilding materials focusing on vulnerable women and child-headed households.', 'Coastal Region', 'Up to KES 50,000', 'Ongoing', true, 'https://actionaid-kenya.org', '{grants,housing,community}'),
('Kenya Farmers Mutual Aid Chama', 'community', 'Grassroots mutual support coordinating seed distribution, tractor sharing, and soil recovery volunteers.', 'Rift Valley', 'Volunteer-led', 'Ongoing', true, 'https://www.kenaff.org', '{community,volunteers,food,drought}');
>>>>>>> 00f978814274f8ce9876951e87be1f526dbf8f3e

insert into public.support_groups (name, description, topic, region, member_count) values
('Flood Survivors - Budalangi & Nyando', 'A chama-style support circle for those rebuilding after floods in Busia, Kisumu, and Tana River.', 'Flood Recovery', 'Western Region', 1420),
('Drought Resilience ASAL Network', 'Connect with pastoralists and dryland farmers sharing water management tips and NDMA relief updates.', 'Drought', 'Northern Kenya', 945),
('Landslide Support - West Pokot & Muranga', 'Community help, contractor references, and mutual aid for land restoration in landslide-prone hilly areas.', 'Landslide', 'Rift Valley', 388),
('Nairobi Urban Flood Help', 'Coordination of rescue, volunteer cleanups, and emergency shelter sharing in Nairobi estates.', 'Storm', 'Nairobi', 2105),
('Volunteers & Helpers Kenya Hub', 'For volunteers offering M-Pesa donations, transport, construction skills, and sorting relief items.', 'Volunteering', 'National', 3560),
('Community Mental Health & Support Kenya', 'A safe, compassionate counseling and trauma recovery space led by local mental health volunteers.', 'Wellbeing', 'National', 1224);

insert into public.relief_updates (title, body, region, severity) values
('Severe Flood Warning - Tana River Basin', 'Water levels in the Tana River have reached critical thresholds. Residents in Garissa and Tana River lowlands are urged to move to higher ground immediately.', 'Coastal Region', 'high'),
('NDMA Drought Cash Transfers Disbursed', 'The Hunger Safety Net Programme (HSNP) funds for this quarter have been released to banks and mobile money agents. Check Huduma Centers for updates.', 'Northern Kenya', 'info'),
('Free Building Iron Sheets Distribution', 'Kenya Red Cross is distributing roofing iron sheets, poles, and treated mosquito nets in Budalangi and Nyando this week.', 'Western Region', 'info'),
('Safaricom Foundation MSME Grants Extended', 'Rebuilding grants applications for local shops and traders affected by landslide or flood debris extended to October 30.', 'National', 'medium');

insert into public.assistance_centers (name, address, region, services, is_open, phone, lat, lng) values
('Nairobi Central Relief Station', 'Huduma Centre GPO, Nairobi', 'Nairobi', '{Water,Hot Meals,Power Charging,Wifi,Information}', true, '0800-555-111', -1.2847, 36.8244),
('Garissa Drought Relief Hub', 'NDMA Office, Garissa-Mombasa Road', 'Northern Kenya', '{Water,Food,Livestock Feed,First Aid}', true, '0800-555-222', -0.4560, 39.6405),
('Budalangi Flood Rescue Hall', 'Budalangi Primary School Hall, Busia', 'Western Region', '{Shelter,First Aid,Supplies,Pet Care}', true, '0800-555-333', 0.1205, 34.0510),
('Nyando Relief Distribution Point', 'Ahero Multipurpose Center, Kisumu', 'Nyanza', '{Water,Food,Supplies,Tools}', true, '0800-555-444', -0.1740, 34.9200),
('Kapenguria Landslide Support Center', 'Kapenguria District Hospital Annexe, West Pokot', 'Rift Valley', '{First Aid,Shelter,Food,Mental Health}', false, '0800-555-555', 1.2390, 35.1220);