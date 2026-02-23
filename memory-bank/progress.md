# Progress Log

## 2026-02-22 — Phase 1 Complete (Project Foundation)

Completed:
- Initialized Vite + React + TypeScript at repository root.
- Installed and configured Tailwind CSS + PostCSS + Autoprefixer.
- Added React Router and initial route scaffolding.
- Created modular base folders:
	- `src/pages`
	- `src/components`
	- `src/layout`
	- `src/data`
	- `src/services`
	- `src/styles`
	- `src/app`
- Added theme tokens and global style foundation:
	- `src/styles/theme.css`
	- `src/styles/globals.css`

Validation:
- `npm run build` passes.

Notes:
- Fishing/game work remains deferred (post-MVP).

---

## 2026-02-22 — Phase 2 Complete (Navigation + App Shell)

Completed:
- Added shared layout shell:
	- `src/layout/MainLayout.tsx`
	- `src/layout/Header.tsx`
	- `src/layout/Footer.tsx`
- Updated router to nested layout structure with `Outlet`.
- Implemented required menu order in header navigation:
	1. About Me
	2. Projects
	3. Contact
	4. Hobbies
- Implemented responsive navigation behavior:
	- Desktop nav links
	- Mobile menu toggle and collapsible nav
- Added active-route styling with `NavLink`.
- Added keyboard focus-visible states for accessibility.

Validation:
- `npm run build` passes after Step 2 changes.

Pending next phase:
- Phase 3 (Hero/About content details and CTA behavior polish).

---

## 2026-02-22 — Phase 3 Complete (Hero / About Me)

Completed:
- Implemented reusable hero components:
	- `src/components/hero/HeroIntro.tsx`
	- `src/components/hero/HeroCta.tsx`
- Replaced About page placeholder with real hero content:
	- Name, role/title, and intro copy in `src/pages/AboutPage.tsx`
- Added primary CTA (`View Projects`) that navigates to:
	- `/projects#projects-section`
- Added projects anchor target in `src/pages/ProjectsPage.tsx` for direct CTA landing.
- Added subtle hero entrance animation with reduced-motion fallback in `src/styles/globals.css`.

Validation:
- `npm run build` passes after Step 3 changes.

Pending next phase:
- Phase 4 (Projects data model + reusable project cards).

---

## 2026-02-22 — Phase 4 Complete (Projects Section)

Completed:
- Created project domain type model:
	- `src/types/project.ts`
- Added data-driven launch project list (4 entries):
	- `src/data/projects.ts`
- Implemented reusable projects UI components:
	- `src/components/projects/ProjectCard.tsx`
	- `src/components/projects/ProjectsGrid.tsx`
- Added required card structure:
	- Icon box on each project card
	- Technologies Used section below with technology chips
- Added optional outbound links on cards:
	- GitHub button
	- Live Demo button (when provided)
- Updated `src/pages/ProjectsPage.tsx` to render from data model.
- Added subtle staggered reveal + hover polish styles for project cards in `src/styles/globals.css`.

Validation:
- `npm run build` passes after Phase 4 changes.

Pending next phase:
- Phase 5 (Contact form + Supabase backend flow).

---

## 2026-02-22 — Phase 5 Complete (Contact + Supabase Flow)

Completed:
- Added contact domain types:
	- `src/types/contact.ts`
- Added frontend contact submission service:
	- `src/services/contactService.ts`
- Implemented modular contact UI components:
	- `src/components/contact/ContactForm.tsx`
	- `src/components/contact/ContactStatus.tsx`
- Replaced Contact page placeholder with functional contact section:
	- `src/pages/ContactPage.tsx`
	- Includes direct email link to `patrickccc47@gmail.com`
- Added form capabilities:
	- Name, Email, Message fields
	- Client-side validation
	- Loading, success, and error states
	- Character count and max length constraints
	- Honeypot field for spam mitigation
- Added server-side submission endpoint for Supabase insert:
	- `api/contact.js`
	- Payload validation
	- Basic in-memory rate limiting
	- Honeypot rejection
	- Insert into `contact_submissions` via Supabase REST API
- Added contact input styling utilities in `src/styles/globals.css`.

Validation:
- `npm run build` passes after Phase 5 changes.

Next setup required (deployment/runtime):
- Add environment variables:
	- `SUPABASE_URL`
	- `SUPABASE_SERVICE_ROLE_KEY`
	- optional: `CONTACT_RATE_LIMIT_WINDOW_MS`
	- optional: `CONTACT_RATE_LIMIT_MAX`

Pending next phase:
- Phase 6 (Hobbies page placeholder polish for deferred feature).

---

## 2026-02-22 — Deferred Scope Started (Post-MVP Fishing + Books)

Completed:
- Implemented deferred Hobbies interactive mini-system:
	- `src/components/hobbies/FishingGame.tsx`
	- Cast line interaction, miss/catch outcomes, and shelf progress tracking
- Added structured favorite books dataset with descriptions:
	- `src/data/favoriteBooks.ts`
	- `src/types/book.ts`
- Integrated online cover lookup for books via Open Library search/covers API in `src/pages/HobbiesPage.tsx`.
- Replaced Hobbies placeholder page with playable fishing flow and collectible book shelf UI.
- Added styles for fishing panel, progress bar, and caught-book cards in `src/styles/globals.css`.
- Updated awards chapter Inspirit AI entry to user-provided wording and local image:
	- `src/pages/AwardsPage.tsx`
	- image source: `/images/inspiritAI.webp`

Validation:
- `npm run build` passes after deferred-scope implementation.
