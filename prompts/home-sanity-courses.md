# Wire Home Course Cards to Sanity

## Goal

Replace the static `homeCourses` mocks on `/` with three courses from the seeded Sanity catalog, so the home grid shows real titles, summaries, levels, durations, module counts, and icons. Keep the existing home layout and design system; only the data source changes.

## Skills read

- `AGENTS.md` (sections 5 server-only Sanity, 7 grounded data, 13 checks)
- Existing fetch layer from `prompts/sanity-content-model.md` / `lib/sanity/fetch.ts`
- `prompts/home-page.md` (layout stays; mock data decision is superseded here)
- `prompts/course-page.md` (duration formatting + course detail links)

## Code inspected

- `app/page.tsx`: sync Server Component using `lib/home-courses.tsx` mocks; cards not linked
- `lib/sanity/fetch.ts` `getCourses()` → `CourseListItem[]` with slug, summary, levelLabel, durationSeconds, moduleCount, icon/coverImage, isPopular
- `lib/format-duration.ts`: `formatDuration` already exists from the course page
- `components/ui/card.tsx` `CourseCard`: accepts `iconSrc` / `iconAlt` / `iconFallback` for Sanity images
- Seed: 10 courses; several with `isPopular: true` (including Next.js / TypeScript / AI / Python)

## Decisions and assumptions

1. **Data**: `await getCourses()` on the home page (server-only). No client Sanity token.
2. **Selection**: take up to **3** courses: all `isPopular` first (stable sort by title among popular), then fill remaining slots from non-popular ordered by title. Engineer choice confirmed.
3. **Card fields**: title, summary (description), `levelLabel` (fallback `"—"` or omit empty), `formatDuration(durationSeconds)`, `` `${moduleCount} modules` ``, `icon` DTO → `iconSrc`/`iconAlt` (fallback coverImage, then title initial).
4. **Links**: wrap each card (or make the card a link) to `/courses/[slug]` so home connects to the course page. Prefer a `Link` around the card or an `href` prop if adding one keeps changes small; do not invent a catalog page.
5. **Empty catalog**: if Sanity returns zero courses, render an empty grid (no fake mocks). Optional short empty line is fine; do not resurrect `homeCourses`.
6. **Cleanup**: remove `lib/home-courses.tsx` if nothing else imports it. Keep `components/icons/course-icons.tsx` only if still used elsewhere (e.g. design-system); otherwise leave icons alone if design-system still needs them.
7. **Out of scope**: building `/courses` catalog, PostHog, search wiring, changing CourseCard visuals beyond link affordance if needed.

## Files expected to touch

| Path | Action |
|------|--------|
| `app/page.tsx` | Async fetch; map 3 selected courses into `CourseCard`; link to course pages |
| `lib/home-courses.tsx` | Delete if unused |
| `prompts/home-sanity-courses.md` | This prompt |

Optional tiny helper in `lib/` for “pick 3 popular-first” if it keeps `page.tsx` clear.

## Requirements

1. Home All Courses section shows up to 3 Sanity courses, popular-first then title.
2. Meta lines use real duration and module counts (formatted).
3. Icons use Sanity `icon` (or cover) via `next/image` / `iconSrc`.
4. Each card navigates to `/courses/[slug]`.
5. No mock course titles remain on `/`.
6. Typecheck and lint pass; build if the home route data path changes (yes).

## Security considerations

- Fetch only via server `getCourses()`. Never pass the read token to the client.
- Image URLs only from configured Sanity CDN.

## Acceptance criteria

- [ ] `/` course titles/summaries match seeded Sanity (not “Next.js for Production” mock unless that exact title exists in seed).
- [ ] At most 3 cards; popular courses preferred.
- [ ] Clicking a card opens `/courses/<slug>` for that course.
- [ ] Durations/modules derived from Sanity numbers.
- [ ] `lib/home-courses.tsx` removed if unused.
- [ ] Typecheck, lint, build pass.

## Checks to run

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build`
4. Dev: open `/` and confirm cards + navigation

## Manual test steps

1. Open `http://localhost:3001/` (or current dev port).
2. Confirm All Courses shows up to 3 real seeded titles (e.g. Next.js App Router in Depth among popular).
3. Confirm level, duration, module count look grounded (not the old mock `18h 24m` / `12 modules` unless seed matches).
4. Click a card; land on `/courses/<slug>`.
5. Confirm Explore / View all still go to `/courses`.
