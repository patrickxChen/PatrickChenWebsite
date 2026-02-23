create extension if not exists pgcrypto;

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 120),
  message text not null check (char_length(message) between 1 and 2000),
  source text not null default 'portfolio-web',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- Server-side API uses service role key, so public access can remain locked down.
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'contact_submissions'
      and policyname = 'No public direct access'
  ) then
    create policy "No public direct access"
      on public.contact_submissions
      as permissive
      for all
      to public
      using (false)
      with check (false);
  end if;
end $$;
