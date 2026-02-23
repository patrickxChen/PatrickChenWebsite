# Implementation Plan (Rewritten)

## Confirmed Scope (from latest decisions)

- Fishing mini-game is **not in MVP** and will be added later under “Hobbies.”
- Website is **multi-page** (not single-page scroll).
- Top menu order: **About Me → Projects → Contact → Hobbies**.
- Hero includes a CTA that takes users to Projects.
- Contact uses **Supabase** as the real form submission backend service.
- Animations should be polished and modern.
- Visual style should be **mostly dark + futuristic** with **subtle green-laser accents**.

---

## Phase 1 — Project Foundation

### Tasks
1. Initialize Vite + React + TypeScript.
2. Install and configure Tailwind CSS.
3. Add React Router for multi-page navigation.
4. Create base folders:
   - `src/pages`
   - `src/components`
   - `src/layout`
   - `src/data`
   - `src/services`
5. Set up global styles, typography scale, spacing tokens, and container widths.

### Acceptance Criteria
- `npm run dev` starts without errors.
- Tailwind classes render correctly.
- Router works and loads each page route.
- No TypeScript errors in initial scaffold.

---

## Phase 2 — Navigation + App Shell

### Tasks
1. Build shared `MainLayout` with:
   - Header / nav
   - Page content slot (`Outlet`)
   - Footer
2. Create desktop + mobile menu behavior.
3. Add nav items in required order:
   - About Me
   - Projects
   - Contact
   - Hobbies
4. Add active-route styling and keyboard-focus states.

### Acceptance Criteria
- Menu order exactly matches requirement.
- Each menu item routes to its own page.
- Mobile menu is usable and accessible.
- Active page is visually clear.

---

## Phase 3 — Hero (About Me) Page

### Tasks
1. Create `HeroPage` (or `AboutPage`) as the first nav destination.
2. Add:
   - Name
   - Role/title
   - Short intro
   - Primary CTA: “View Projects”
3. Implement CTA behavior to navigate to Projects route and scroll to top.
4. Add subtle entrance animation for hero text + CTA.

### Acceptance Criteria
- Hero content renders cleanly on mobile and desktop.
- CTA reliably lands user in Projects view.
- No layout shift/jank during initial load.

---

## Phase 4 — Projects Page

### Tasks
1. Create reusable `ProjectCard` component.
2. Define project data model in `src/data/projects.ts`.
3. Render project grid/list from data (launch target: **4 projects**).
4. Add card interactions:
   - hover state
   - optional external links (repo/live)
5. Add staggered reveal animation for cards.

### Acceptance Criteria
- Project cards are reusable and data-driven.
- Layout is responsive and readable at small widths.
- Interactions remain smooth with no console warnings.

---

## Phase 5 — Contact Page (Real Backend Service)

### Tasks
1. Build contact form with fields:
   - Name
   - Email
   - Message
2. Add client-side validation (required fields + email format).
3. Integrate Supabase backend:
   - Create `contact_submissions` table.
   - Add RLS policies for secure inserts.
   - Create server-side submission path (preferred: Supabase Edge Function or secure API route).
4. Add loading, success, and error states.
5. Add anti-spam baseline (honeypot + basic rate limiting strategy in backend function).

### Acceptance Criteria
- Form submits to real backend endpoint.
- Submission persists successfully in Supabase.
- Valid form shows success state.
- Invalid/failed submission shows clear error state.
- Submission flow works on deployed environment.

---

## Phase 6 — Hobbies Page (Placeholder for Future Fishing Feature)

### Tasks
1. Create `HobbiesPage` with current non-game content.
2. Add section label indicating “Fishing/books interactive feature coming later.”
3. Keep component structure ready for future mini-game module (separate folder boundary).

### Acceptance Criteria
- Hobbies page is complete and navigable now.
- No fishing game logic is implemented in MVP.
- Future feature integration path is documented.

---

## Phase 7 — Animation + Polish

### Tasks
1. Define animation system rules:
   - consistent durations
   - easing
   - hover/entrance standards
2. Apply “cool but controlled” animations to:
   - page transitions
   - hero content
   - project cards
   - nav interactions
3. Respect reduced-motion preference.
4. Tune spacing/typography for visual balance.
5. Apply theme constraints:
   - dark base palette
   - futuristic UI treatment
   - restrained green accent usage for highlights only

### Acceptance Criteria
- Animations feel polished and consistent.
- Reduced-motion users receive accessible fallback.
- No noticeable performance drop on common devices.

---

## Phase 8 — QA + Deployment

### Tasks
1. Run lint/type checks and fix blocking issues.
2. Verify route navigation and mobile responsiveness.
3. Validate contact backend in production environment.
4. Deploy to Vercel.
5. Add production metadata + analytics:
   - SEO metadata (title/description/canonical + Open Graph basics)
   - Vercel Analytics integration
6. Smoke test live URL.
7. Defer custom domain setup until after MVP launch.

### Acceptance Criteria
- Site is live and all routes function.
- Contact form works end-to-end in production.
- SEO metadata appears correctly in page source and social preview tags exist.
- Analytics events are visible after deployment.
- No critical console/runtime errors.

---

## Deferred Scope (Post-MVP)

- Fishing/books interactive experience under Hobbies.
- Rich game loop, animation states, and book reveal system.

---

## Finalized Defaults (Auto-Selected)

1. First menu label is **About Me** (hero-style page design).
2. Launch project count is **4**.
3. Deployment extras now include **SEO metadata + analytics**, while **custom domain is deferred**.
