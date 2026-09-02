# Add Clerk Authentication

## Goal

Wire Clerk into the existing Vertex Next.js app so learners can sign in, sign up, and see a signed-in user control in the existing nav. Use the Clerk CLI, link to Clerk application `app_3IjKvtivSdC7jCzD5M5voUtSCJX`, keep browsing public, and do not add progress tracking, gated catalog, or extra auth pages beyond what `clerk init` and the nav need.

## Skills read

- `AGENTS.md` (sections 2, 5, 6, 7, 12, 13): Clerk via Next.js middleware, secret key server only, browsing public, gate only what a feature marks as protected
- `.agents/skills/clerk/SKILL.md`: current SDK is `@clerk/nextjs` v7+
- `.agents/skills/clerk-setup/SKILL.md`: CLI-first setup; existing project + existing app
- `.agents/skills/clerk-nextjs-patterns/SKILL.md` and `references/middleware-strategies.md`: `await auth()`, public-first matcher, `proxy.ts` for Next.js 16
- `.agents/skills/clerk-custom-ui/SKILL.md`: `<Show>` for signed-in / signed-out; skip custom flows
- User playbook: Clerk CLI install, `clerk auth login` before `clerk init`, `--app app_3IjKvtivSdC7jCzD5M5voUtSCJX`, matcher `'/__clerk/:path*'`, nav auth controls, `clerk doctor`

## Code inspected

- Root Next.js 16.3.4 App Router app (`package.json`, `package-lock.json` → npm). No `web/` / `studio/` split yet
- No `@clerk/nextjs` dependency, no `proxy.ts` / `middleware.ts`, no root `components.json` (not shadcn)
- `app/layout.tsx`: fonts and metadata; children inside `<body>`; no `ClerkProvider`
- `components/ui/nav.tsx`: presentational bell + static SVG avatar placeholder
- Home page already uses `Nav`; avatar was a placeholder per `prompts/home-page.md`
- No committed root `.env.example` yet
- Dev server may already be running (`npm run dev`)

## Decisions and assumptions

1. **Existing project, existing Clerk app.** Run `clerk auth login` first, then `clerk init --app app_3IjKvtivSdC7jCzD5M5voUtSCJX`. Do not pass `--framework` or `--pm`. npm is already the package manager.
2. **CLI order.** Check/install/update Clerk CLI from repo root, then login, then init. Do not list apps or run init before auth.
3. **Public-first.** Catalog, home, and other current routes stay public. Do not `auth.protect()` the whole site. Progress and My Learning gating come later.
4. **Provider placement.** `ClerkProvider` wraps children inside `<body>`, not `<html>`. Keep existing fonts and metadata.
5. **Auth controls live in `Nav`.** Replace the static avatar with Clerk controls:
   - Signed out: `SignInButton` and `SignUpButton` (styled to match existing Button / nav density; do not invent a second visual language)
   - Signed in: `UserButton` in the avatar slot
   - Keep the notifications bell as presentational (AGENTS.md)
6. **Client boundary.** `Nav` will need `'use client'` (or a small client child for the auth cluster) because Clerk buttons are client components. Prefer a thin `NavAuth` client component so the rest of the header can stay a Server Component if practical.
7. **Proxy matcher.** After init, ensure `proxy.ts` (Next.js 16) includes `'/__clerk/:path*'` once, after `'/(api|trpc)(.*)'`. Add it if missing. Do not switch to `middleware.ts`.
8. **Env.** Let `clerk init` / `clerk env pull` write keys. Do not read or print `.env` / `.env.local`. Add a committed `.env.example` listing `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` as placeholders only. Never expose the secret key to the client.
9. **SDK.** Use `@clerk/nextjs` (v7+). `auth()` is async. No `@clerk/clerk-react`. No `@clerk/ui` shadcn theme (no root `components.json`).
10. **No extra product work.** No progress documents, no protected My Learning, no custom sign-in pages unless `clerk init` creates routes that are required. Reuse Clerk modal/button components in the nav.
11. **Restart.** If the current `npm run dev` is running, restart it after env and proxy land so keys and middleware take effect.

## Files expected to touch

| Path | Action |
|------|--------|
| `package.json` / lockfile | `@clerk/nextjs` via `clerk init` |
| `proxy.ts` | Clerk middleware + matcher including `'/__clerk/:path*'` |
| `app/layout.tsx` | `ClerkProvider` inside `<body>` |
| `components/ui/nav.tsx` and/or `components/ui/nav-auth.tsx` | Sign in / sign up / user button |
| `.env.local` | Written by CLI only; never commit or print |
| `.env.example` | Placeholder key names only |
| `prompts/clerk-auth.md` | This prompt |

`clerk init` may also add auth route files; keep those if the CLI creates them, and still surface controls in the nav.

## Requirements

1. Install or update the Clerk CLI, then `clerk auth login`, then `clerk init --app app_3IjKvtivSdC7jCzD5M5voUtSCJX`.
2. `ClerkProvider` inside `<body>` in `app/layout.tsx`.
3. `proxy.ts` uses `clerkMiddleware` and the standard Next.js matchers plus `'/__clerk/:path*'`.
4. Nav shows Sign in and Sign up when signed out, and `UserButton` when signed in.
5. Browsing `/` stays public without a forced login wall.
6. Only `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is client-safe; `CLERK_SECRET_KEY` stays server only.
7. Run `clerk doctor` after init and fix reported issues that this pass owns.

## Security considerations

- Dataset and Sanity tokens are out of scope; do not add them.
- Never print env file contents or secret keys.
- Do not put `CLERK_SECRET_KEY` in client components or `NEXT_PUBLIC_*`.
- Middleware stays public-first so unauthenticated learners can still browse.
- Writes of learner progress remain out of scope; no write token in this pass.

## Acceptance criteria

- [ ] Project is linked to Clerk app `app_3IjKvtivSdC7jCzD5M5voUtSCJX`
- [ ] `@clerk/nextjs` is installed; `ClerkProvider` is inside `<body>`
- [ ] `proxy.ts` matcher includes `'/(api|trpc)(.*)'` and `'/__clerk/:path*'`
- [ ] Signed-out nav shows Sign in and Sign up; signed-in nav shows `UserButton`
- [ ] Home remains public
- [ ] `.env.example` lists the two Clerk keys without real values
- [ ] `clerk doctor` is clean or only reports items the user must fix in the Dashboard
- [ ] Typecheck and lint pass; production build passes (layout / proxy / env wiring)

## Checks to run

From repo root:

1. `clerk doctor`
2. `npx tsc --noEmit` (or `npm run typecheck`)
3. `npm run lint`
4. `npm run build`
5. Restart `npm run dev` and open `/`

## Manual test steps

1. Open `http://localhost:3000/` signed out. Confirm Sign in and Sign up in the nav, and that the home page still loads.
2. Click Sign up, create the first test user, and confirm a profile icon (`UserButton`) replaces the signed-out actions.
3. If a Clerk "Configure your application" callout appears, click it.
4. Sign out and confirm Sign in / Sign up return.
5. Confirm the notifications bell is still presentational and the rest of the home layout is unchanged.
6. Confirm `/design-system` still renders.
