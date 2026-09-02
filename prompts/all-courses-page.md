# Implement All Courses Page

## Goal

Add a simple `/courses` catalog page: Nav with Courses active, an **All Courses** heading, and a responsive grid of every seeded Sanity course. Reuse `CourseCard` and the same hover lift/shadow used on the home page. No filters, search, or pagination in this pass.

## Skills / code inspected

- `AGENTS.md` §§3, 5, 7, 13
- `getCourses()` in `lib/sanity/fetch.ts` (already title-sorted)
- Home grid pattern in `app/page.tsx` (Link + `CourseCard` + `group-hover:-translate-y-1` / shadow)
- Course detail at `app/courses/[slug]/page.tsx` (do not break it)
- No dedicated All Courses design mock; keep layout minimal and consistent with home / design system

## Decisions

1. **Route**: `app/courses/page.tsx` (sibling of `[slug]`).
2. **Data**: `await getCourses()` server-side. Show **all** courses. Empty list → short empty copy + link home if useful.
3. **Chrome**: `Nav` with `activeHref="/courses"`. Page title `All Courses` (`text-heading-1`). Optional count subtitle (`N courses`) is fine if light; no breadcrumb (engineer chose nav + title + grid only).
4. **Cards**: same mapping as home (summary, levelLabel, `formatDuration`, module count, icon/cover `iconSrc`). Each card links to `/courses/[slug]`.
5. **Hover**: extract shared linked-card classes (or a tiny `CourseCardLink` wrapper) so home and catalog share identical hover/focus (lift, border, shadow, focus ring). Do not leave hover only on home.
6. **Layout**: `max-w-6xl` grid `1 / 2 / 3` cols like home; `bg-neutral-50`; generous padding.
7. **Metadata**: title `All Courses` (or `All Courses | Vertex` if layout already suffixes).
8. **Out of scope**: filters, sort UI, category chips, pagination, PostHog, rewriting seed.

## Files

| Path | Action |
|------|--------|
| `app/courses/page.tsx` | New catalog page |
| `components/course/course-card-link.tsx` (or similar) | Optional shared Link+hover wrapper used by home + catalog |
| `app/page.tsx` | Switch to shared wrapper if extracted |
| `prompts/all-courses-page.md` | This prompt |

## Acceptance

- [ ] `/courses` lists all Sanity courses with real titles/meta/icons
- [ ] Courses nav link is active
- [ ] Hover/focus matches home cards (lift + shadow)
- [ ] Card click → `/courses/<slug>`
- [ ] Typecheck, lint, build pass

## Checks

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build`
4. Dev: `/courses` hover + navigate; home still works

## Manual test

1. Open `/courses` — all ~10 seeded courses in a grid.
2. Hover several cards — lift + shadow.
3. Click one → course detail.
4. From home, “View all courses” / “Explore Courses” land here (no 404).
5. Narrow viewport stacks without overflow.
