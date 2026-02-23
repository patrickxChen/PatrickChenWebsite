# PatrickChenWebsite
Personal Website / Portfolio.

## Run locally

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build production bundle: `npm run build`

## Supabase contact setup

The contact form posts to `api/contact.js`.

### 1) Create table in Supabase

- Open your Supabase SQL Editor.
- Run [supabase/contact_submissions.sql](supabase/contact_submissions.sql).

### 2) Add Vercel environment variables

In your Vercel project settings, add:

- `SUPABASE_URL` (example: `https://your-project-id.supabase.co`)
- `SUPABASE_SERVICE_ROLE_KEY` (service role key from Supabase)

Optional rate limiting:

- `CONTACT_RATE_LIMIT_WINDOW_MS` (default `60000`)
- `CONTACT_RATE_LIMIT_MAX` (default `5`)

### 3) Redeploy

- Run: `npx vercel --prod --yes`

After redeploy, the contact form stores messages in `public.contact_submissions`.
