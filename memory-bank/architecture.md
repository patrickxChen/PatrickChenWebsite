# Architecture (MVP)

## 1) System Overview

A multi-page React application built with Vite + TypeScript + Tailwind CSS.
Primary goals:
- Present portfolio content in a clean, modern, dark-futuristic style.
- Support robust contact form submission via Supabase backend.
- Keep structure modular to support future Hobbies game expansion.

Core runtime pieces:
- Frontend SPA with route-based pages.
- Supabase Postgres for contact submissions.
- Secure server-side submission path (Supabase Edge Function or API route).
- Vercel deployment with SEO metadata and analytics.

---

## 2) Route Map

Top navigation order is fixed:
1. About Me (`/`)
2. Projects (`/projects`)
3. Contact (`/contact`)
4. Hobbies (`/hobbies`)

Behavior notes:
- About Me page uses hero-style layout and includes CTA to Projects.
- CTA should navigate to `/projects` and scroll to top.
- Hobbies page is a placeholder in MVP; no game logic yet.

---

## 3) Frontend Module Structure

```text
src/
  app/
    router.tsx
  layout/
    MainLayout.tsx
    Header.tsx
    Footer.tsx
  pages/
    AboutPage.tsx
    ProjectsPage.tsx
    ContactPage.tsx
    HobbiesPage.tsx
  components/
    hero/
      HeroIntro.tsx
      HeroCta.tsx
    projects/
      ProjectCard.tsx
      ProjectsGrid.tsx
    contact/
      ContactForm.tsx
      ContactStatus.tsx
    common/
      SectionContainer.tsx
      PageTransition.tsx
  data/
    projects.ts
  services/
    supabaseClient.ts
    contactService.ts
  styles/
    globals.css
    theme.css
  types/
    project.ts
    contact.ts
```

Modularity rules:
- Keep page-level orchestration in `pages/*`.
- Keep reusable view pieces in `components/*`.
- Keep data and network logic out of visual components.
- Keep future Hobbies game code isolated under `components/hobbies/*` when introduced.

---

## 4) Data Model (MVP)

### 4.1 Projects (frontend static data for launch)

`projects.ts` should export exactly 4 project entries for MVP.

`Project` type:
- `id: string`
- `title: string`
- `summary: string`
- `tech: string[]`
- `repoUrl?: string`
- `liveUrl?: string`
- `imageUrl?: string`
- `featured?: boolean`

### 4.2 Contact Submissions (Supabase)

Table: `contact_submissions`

Columns:
- `id uuid primary key default gen_random_uuid()`
- `name text not null`
- `email text not null`
- `message text not null`
- `created_at timestamptz not null default now()`
- `source text not null default 'portfolio-web'`
- `status text not null default 'new'`
- `ip_hash text null` (optional privacy-safe abuse control)

Indexes:
- index on `created_at desc`
- optional index on `email`

Validation expectations:
- Name: non-empty, max length (e.g., 100)
- Email: RFC-like format check
- Message: non-empty, bounded length (e.g., 2000)

---

## 5) Security + Submission Flow

Preferred write path:
1. Frontend `ContactForm` submits to server-side endpoint (`/api/contact` or Edge Function).
2. Endpoint validates payload and honeypot field.
3. Endpoint inserts into Supabase using service role key (server-side only).
4. Endpoint returns normalized success/error response.

Why this path:
- Avoid exposing unrestricted insert patterns directly from client.
- Centralize anti-spam and validation rules.
- Keep room for future notifications (email/webhook) without UI changes.

RLS policy baseline:
- Enable RLS on `contact_submissions`.
- Deny broad public reads.
- Permit insert only through controlled server-side execution path.

Anti-spam baseline:
- Honeypot field.
- Basic per-IP/per-email rate limit at endpoint level.
- Optional cooldown window (e.g., one submission per minute per fingerprint).

---

## 6) UI and Theming Constraints

Theme direction:
- Mostly dark and futuristic.
- Green-laser accents used sparingly for highlights/interactive emphasis.
- Avoid overusing bright green backgrounds.

Suggested token strategy (Tailwind extension):
- Base background: near-black / graphite tones.
- Surface layers: slightly lighter dark tones.
- Accent: neon-green family for focus rings, active nav, CTA glow, micro-highlights.
- Text: high-contrast off-white for readability.

Accessibility constraints:
- Meet contrast for text and UI controls.
- Visible keyboard focus states.
- Reduced-motion fallback for transitions.

---

## 7) Animation Architecture

Library: Framer Motion (UI transitions and reveals).

Animation rules:
- Keep durations consistent (short-to-medium).
- Use subtle stagger for project cards.
- Add page transition wrapper in `PageTransition.tsx`.
- Respect `prefers-reduced-motion` and disable non-essential effects.

Polish direction:
- “Cool but controlled” motion style.
- Minimal jank; avoid heavy continuous animations.

---

## 8) SEO + Analytics

SEO baseline for launch:
- Per-page title + description.
- Canonical URL support.
- Open Graph basic tags.
- Favicon and social preview image placeholders.

Analytics baseline for launch:
- Vercel Analytics enabled.
- Track high-level page visits and route usage.

Custom domain:
- Explicitly deferred until post-MVP.

---

## 9) Deployment Topology

Hosting:
- Frontend on Vercel.
- Supabase project for Postgres + optional Edge Function.

Environment variables (example names):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
- `CONTACT_RATE_LIMIT_WINDOW_MS`
- `CONTACT_RATE_LIMIT_MAX`

Rules:
- Never expose service role key to client bundle.
- Keep all secret-bearing logic server-side.

---

## 10) Launch Definition (MVP Complete)

MVP is complete when:
- 4 routes/pages are fully navigable in required order.
- About Me hero page includes CTA to Projects.
- Projects page displays 4 projects with responsive cards.
- Contact form validates, submits, and persists to Supabase via secure backend flow.
- Hobbies page exists as placeholder for future feature.
- Dark futuristic styling with restrained green accents is applied consistently.
- SEO metadata and analytics are configured.
- App is deployed with no critical runtime errors.

---

## 11) Post-MVP Extension Point (Hobbies Game)

Future fishing/books game should be added without disrupting MVP pages.
Recommended expansion path:
- Add `components/hobbies/game/*` modules.
- Add dedicated state model for game loop.
- Keep data contracts and animation systems separate from core portfolio pages.

---

## 12) Current File Responsibilities (Implemented)

### Root and Tooling

- `package.json`
  - Defines scripts (`dev`, `build`, `lint`, `preview`) and project dependencies.
  - Contains React, React Router, Tailwind, TypeScript, and Vite toolchain dependencies.

- `tailwind.config.js`
  - Defines Tailwind scan paths (`index.html`, `src/**/*.{ts,tsx}`).
  - Maps CSS variables (`--color-*`) to Tailwind theme tokens for consistent theming.

- `postcss.config.js`
  - Enables Tailwind and Autoprefixer in CSS build pipeline.

- `vite.config.ts`
  - Configures Vite with React plugin.

### App Entry and Routing

- `src/main.tsx`
  - React entry point.
  - Mounts app and imports `styles/globals.css`.

- `src/App.tsx`
  - App root component.
  - Renders `RouterProvider` with the central router instance.

- `src/app/router.tsx`
  - Route definitions for all MVP pages.
  - Uses nested route structure with `MainLayout` and `Outlet`.

### Layout (Step 2)

- `src/layout/MainLayout.tsx`
  - Shared page shell with `Header`, route content area, and `Footer`.

- `src/layout/Header.tsx`
  - Primary navigation component.
  - Implements required nav order.
  - Supports responsive desktop/mobile behavior.
  - Provides active-route styling and keyboard focus-visible accessibility.

- `src/layout/Footer.tsx`
  - Shared footer displayed on all routes.

### Pages (Step 1 scaffolding)

- `src/pages/AboutPage.tsx`
  - Hosts the implemented About Me hero section.
  - Composes `HeroIntro` and `HeroCta` components.

- `src/pages/ProjectsPage.tsx`
  - Renders data-driven projects section for launch content.
  - Exposes `id="projects-section"` anchor for Hero CTA hash navigation.
  - Composes `ProjectsGrid` with project data from `src/data/projects.ts`.

- `src/pages/ContactPage.tsx`
  - Renders the contact section with direct email and form submission flow.
  - Composes `ContactForm` and status messaging.

- `src/pages/HobbiesPage.tsx`
  - Placeholder page for future hobbies/fishing interactive feature.

### Styling

- `src/styles/theme.css`
  - Central design tokens (colors, typography family, layout widths, spacing).
  - Encodes dark futuristic base and green accent palette.

- `src/styles/globals.css`
  - Tailwind directives and global base styles.
  - Defines shared utility component class (`app-container`) for responsive page width.
  - Defines hero entrance animation utility with reduced-motion fallback.

### Hero Components (Step 3)

- `src/components/hero/HeroIntro.tsx`
  - Reusable hero text block for name, title, and intro copy.
  - Applies subtle entrance animation class for initial load polish.

- `src/components/hero/HeroCta.tsx`
  - Reusable primary CTA component for hero section actions.
  - Routes to Projects using hash target (`/projects#projects-section`).

### Projects Components (Step 4)

- `src/types/project.ts`
  - Canonical project domain type used by data and UI components.

- `src/data/projects.ts`
  - Launch project dataset (4 projects) rendered by the Projects page.
  - Holds icon-box text and technologies used for each project.

- `src/components/projects/ProjectCard.tsx`
  - Reusable card component for project display.
  - Includes icon box, summary, technology chips, and optional GitHub/Live links.

- `src/components/projects/ProjectsGrid.tsx`
  - Grid container that maps project data to `ProjectCard`.
  - Provides consistent layout for responsive rendering.

### Contact Modules (Step 5)

- `src/types/contact.ts`
  - Contact form and submission result types.

- `src/services/contactService.ts`
  - Frontend service that posts validated form payloads to `/api/contact`.
  - Normalizes response messages for UI state handling.

- `src/components/contact/ContactForm.tsx`
  - Contact form UI and client-side validation.
  - Includes honeypot field, loading state, and success/error rendering.

- `src/components/contact/ContactStatus.tsx`
  - Reusable status banner for success and error feedback.

- `api/contact.js`
  - Server-side endpoint for secure Supabase insertion.
  - Enforces method checks, payload validation, honeypot rejection, and basic rate limiting.
  - Uses `SUPABASE_SERVICE_ROLE_KEY` server-side only.

### Reserved Module Folders

- `src/components/`, `src/data/`, `src/services/`
  - Present as modular boundaries for reusable UI, project/static data, and API/service logic.
  - Currently seeded for phased implementation to prevent monolithic growth.
