create table if not exists studios (
  id text primary key,
  name text not null
);

insert into studios (id, name)
values ('glow-me', 'Glow Me Tan Studio')
on conflict (id) do nothing;

create table if not exists studio_members (
  user_id text primary key,
  studio_id text not null references studios (id),
  role text not null check (role in ('owner', 'staff')),
  created_at timestamptz not null default now()
);

create table if not exists clients (
  id text primary key,
  studio_id text not null references studios (id),
  name text not null,
  email text not null,
  phone text not null default '',
  shade_note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists clients_studio_email on clients (studio_id, lower(email));

create table if not exists booking_requests (
  id text primary key,
  studio_id text not null references studios (id),
  client_id text not null references clients (id),
  service text not null,
  place text not null,
  preferred_date text not null,
  preferred_time text not null,
  party_size integer,
  suburb text not null default '',
  note text not null default '',
  status text not null default 'new' check (status in ('new', 'confirmed', 'done', 'declined')),
  created_at timestamptz not null default now()
);

create index if not exists booking_requests_studio_created on booking_requests (studio_id, created_at desc);
