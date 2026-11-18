# Initialize PostHog in the web app

## Goal

Add the PostHog browser SDK to the Next.js app, so that a deployed build sends product events. Keep local builds silent, so that development sessions do not add noise to the shared PostHog project.

## Skills read

- `AGENTS.md` (sections 5, 6, 7, 12, 13): PostHog runs in the browser with the public project key. A private PostHog key stays on the server.
- PostHog Next.js docs (`https://posthog.com/docs/libraries/next-js.md`): initialize `posthog-js` in `instrumentation-client.ts` with `defaults: '2026-08-30'`.
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/instrumentation-client.md`: the file is at the project root and runs in the browser before the app becomes interactive.

## Code inspected

- `package.json`: no `posthog-js` and no `posthog-node`.
- `app/layout.tsx`: no PostHog reference. The open Clerk branch also changes this file.
- `.gitignore`: ignores `.env*`, so `.env.example` needs an exception.
- Open branches: no branch has a PostHog file, a PostHog dependency, or `instrumentation-client.ts`.

## Decisions and assumptions

1. Initialize in `instrumentation-client.ts`, not in `app/layout.tsx`. This is the location the PostHog docs give for Next.js. It also does not conflict with the `ClerkProvider` change on the open Clerk branch.
2. Initialize only when `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` has a value and the hostname is not `localhost`, `127.0.0.1`, or `[::1]`. The gate stops all capture on a local build, including exception autocapture.
3. Use `defaults: '2026-08-30'`. This gives automatic `$pageview` and `$pageleave` on App Router navigation.
4. Set `capture_exceptions: true` for error tracking.
5. Do not add custom events, `identify`, `posthog-node`, or a reverse proxy in this change. The pages that need custom events and the Clerk login are on branches that are not merged yet.

## Files to touch

| Path | Action |
|------|--------|
| `package.json`, `package-lock.json` | Add `posthog-js` |
| `instrumentation-client.ts` | New. Initialize PostHog |
| `.env.example` | New. PostHog variable names |
| `.gitignore` | Allow `.env.example` |
| `prompts/posthog-analytics.md` | This prompt |

## Requirements

1. One PostHog initialization in the app.
2. No token or host value in source code. Read both from env.
3. No PostHog call on `localhost`, `127.0.0.1`, or `[::1]`.
4. No PostHog call when the token is empty.

## Security

- The project token is public by design. It can go to the browser.
- No private PostHog key in this change.

## Acceptance criteria

- A deployed build with the env variables sends `$pageview` events with the deployed host.
- A local build sends no events.

## Checks

- `npm run typecheck`
- `npm run lint`
- `npm run build`

## Manual test

1. Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.local` and to the hosting provider.
2. Run `npm run dev` and open `http://localhost:3000`. In the browser network tab, make sure that no request goes to the PostHog host.
3. Deploy a preview build and open it.
4. In PostHog Activity, make sure that a `$pageview` event arrives with `$host` set to the preview host.
