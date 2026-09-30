-- Practice Studio initial PostgreSQL schema
-- Product-owned, tenant-aware, append-oriented.

create extension if not exists pgcrypto;

create table if not exists ps_tenants (
  tenant_id text primary key,
  name text not null,
  operator_type text not null,
  status text not null default 'active',
  configuration jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists ps_employees (
  employee_id text primary key,
  tenant_id text not null references ps_tenants(tenant_id),
  registered_name text not null,
  preferred_name text,
  role_id text not null,
  pathway_id text,
  team_id text,
  manager_id text,
  contract_start timestamptz,
  contract_end timestamptz,
  employment_status text not null default 'active',
  timezone text not null default 'America/New_York',
  profile jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ps_employees_tenant_idx on ps_employees(tenant_id);

create table if not exists ps_people (
  person_id text primary key,
  tenant_id text not null references ps_tenants(tenant_id),
  person_type text not null,
  name text not null,
  role text not null,
  team text,
  authority_scope jsonb not null default '[]'::jsonb,
  knowledge_scope jsonb not null default '[]'::jsonb,
  relationship_state jsonb not null default '{}'::jsonb,
  memory_state jsonb not null default '{}'::jsonb,
  channels jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists ps_people_tenant_idx on ps_people(tenant_id);

create table if not exists ps_world_state (
  tenant_id text primary key references ps_tenants(tenant_id),
  state_version bigint not null default 0,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists ps_events (
  event_id text primary key,
  tenant_id text not null references ps_tenants(tenant_id),
  employee_id text,
  occurred_at timestamptz not null,
  workplace_day integer,
  actor_type text not null,
  actor_id text not null,
  source_system text not null,
  event_type text not null,
  object_type text,
  object_id text,
  context_id text not null,
  visible_to jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  authoritative boolean not null default false,
  causation_id text,
  correlation_id text,
  state_version bigint,
  created_at timestamptz not null default now()
);

create index if not exists ps_events_tenant_time_idx on ps_events(tenant_id, occurred_at);
create index if not exists ps_events_context_idx on ps_events(tenant_id, context_id, occurred_at);
create index if not exists ps_events_employee_idx on ps_events(tenant_id, employee_id, occurred_at);

create table if not exists ps_consequences (
  consequence_id text primary key,
  tenant_id text not null references ps_tenants(tenant_id),
  triggering_event_id text not null references ps_events(event_id),
  applied_at timestamptz not null,
  target_type text not null,
  target_id text not null,
  before_state jsonb not null default '{}'::jsonb,
  after_state jsonb not null default '{}'::jsonb,
  reversible boolean not null default true,
  severity text not null default 'normal',
  visibility text not null default 'system',
  state_version bigint not null
);

create index if not exists ps_consequences_trigger_idx on ps_consequences(tenant_id, triggering_event_id);

create table if not exists ps_evidence (
  evidence_id text primary key,
  tenant_id text not null references ps_tenants(tenant_id),
  employee_id text not null references ps_employees(employee_id),
  timestamp timestamptz not null,
  workplace_day integer,
  source_system text not null,
  context_id text not null,
  event_type text not null,
  information_available jsonb not null default '[]'::jsonb,
  employee_action text not null,
  artifact_or_target text,
  immediate_result text,
  downstream_consequence text,
  evidence_reference text,
  competency_tags jsonb not null default '[]'::jsonb,
  confidence numeric,
  assessor_visibility text not null default 'reviewable',
  integrity_hash text,
  created_at timestamptz not null default now()
);

create index if not exists ps_evidence_employee_time_idx on ps_evidence(tenant_id, employee_id, timestamp);
create index if not exists ps_evidence_context_idx on ps_evidence(tenant_id, context_id, timestamp);

create table if not exists ps_artifacts (
  artifact_id text primary key,
  tenant_id text not null references ps_tenants(tenant_id),
  employee_id text references ps_employees(employee_id),
  context_id text,
  artifact_type text not null,
  storage_uri text not null,
  media_type text,
  version integer not null default 1,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists ps_capability_records (
  capability_record_id text primary key,
  tenant_id text not null references ps_tenants(tenant_id),
  employee_id text not null references ps_employees(employee_id),
  competency_id text not null,
  status text not null,
  evidence_ids jsonb not null default '[]'::jsonb,
  assessor_notes text,
  demonstrated_at timestamptz,
  review_state text not null default 'pending',
  updated_at timestamptz not null default now()
);

create unique index if not exists ps_capability_employee_competency_uq
  on ps_capability_records(tenant_id, employee_id, competency_id);

create table if not exists ps_scheduled_events (
  scheduled_id text primary key,
  tenant_id text not null references ps_tenants(tenant_id),
  employee_id text,
  run_at timestamptz not null,
  payload jsonb not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  processed_at timestamptz
);

create index if not exists ps_scheduled_due_idx
  on ps_scheduled_events(status, run_at);

create table if not exists ps_person_memory (
  memory_id uuid primary key default gen_random_uuid(),
  tenant_id text not null references ps_tenants(tenant_id),
  person_id text not null references ps_people(person_id),
  memory_key text not null,
  memory_value jsonb not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(tenant_id, person_id, memory_key)
);

-- Row-level security is expected in production.
-- Application code must set an authenticated tenant context and never trust client-supplied tenant_id.
