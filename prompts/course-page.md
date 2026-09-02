# Implement Vertex Course Detail Page

## Goal

Ship the course detail page from `design/vertex-course.png` at `/courses/[slug]`, fed by the existing Sanity read layer and seeded catalog. Match desktop layout, typography, color, spacing, and states exactly. Adapt responsively below desktop (stack hero, collapse curriculum density). Reuse the design system. Do not invent a second visual language.

## Skills read

- `AGENTS.md` (sections 2–3 UI fidelity, 5 server-only Sanity, 7 progress presentational until wired, 8 course/module/lesson shape, 13 checks)
- `.agents/skills/develop/SKILL.md`, `flow/build.md`, `ui-guide.md` (image-sourced UI)
- `design.md` (character + build mandate; tokens in `app/globals.css`)
- `.agents/skills/sanity-best-practices` patterns already embodied in `lib/sanity/*`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md` (`params` is a `Promise` in this Next version)

## Code inspected

- Design: `design/vertex-course.png`
- No `app/courses/**` route yet. Existing app routes: `/`, `/design-system`, Clerk sign-in/up
- UI ready to reuse: `Nav`, `Breadcrumb`, `Badge` (`popular`), `Button`, `Progress`, lucide icons
- Sanity: `getCourseBySlug`, `getCourseSlugs` in `lib/sanity/fetch.ts`; `COURSE_BY_SLUG_QUERY` already returns title, summary, level, isPopular, studentCount, cover/icon, learningOutcomes, instructor, category, modules with nested lessons + `durationSeconds`
- Seed: 10 courses. Closest to the mock title is **Next.js App Router in Depth** (`nextjs-app-router-in-depth`): popular, intermediate, 4 modules × 3 lessons, 4 learning outcomes, `studentCount` 18240. The mock’s “Next.js for Production / 12 modules” is home mock copy only; **do not hardcode that title or invent 12 modules**
- Home still uses static `lib/home-courses.tsx` (out of scope to rewire)
- No `formatDuration` helper yet; no progress documents or write routes
- Instructor page and lesson page do not exist yet

## Decisions and assumptions

1. **Route**: `app/courses/[slug]/page.tsx`. Public, server-rendered. `generateStaticParams` from `getCourseSlugs`. `notFound()` when slug missing.
2. **Data source**: `getCourseBySlug(slug)` only. No client Sanity token. No mock course document.
3. **Layout sections** (top to bottom, matching the mock):
   - `Nav` with `activeHref="/courses"`
   - Breadcrumb: `All Courses` → `/courses` (404 until catalog ships) · current course title (no href)
   - Hero: large rounded cover/icon left; right column with optional `POPULAR` badge, Playfair title, summary, meta row (level · duration · module count · student count), primary **Continue Learning** + secondary **Bookmark**
   - **What you’ll learn**: 2×2 card grid of learning outcomes with icon + title + description
   - **Course Content**: header with module count and total duration; accordion list of modules; collapsed preview shows first **6** modules when there are more than 6; **Show all N modules** toggles the rest (seed courses have 4 modules, so the toggle is usually hidden; still implement for fidelity)
   - Sticky/bottom strip: **Your Progress** with `Progress` at **0%** (presentational) + **Continue Learning**
4. **Duration formatting**: add a small pure helper (e.g. `lib/format-duration.ts`) that turns seconds into mock-like strings: `45m`, `1h 12m`, `18h 24m`. Use for course total, per-module sum of lesson seconds, and lesson rows when expanded.
5. **Student count**: format compactly like the mock (`2.1k students`) when ≥ 1000; otherwise plain count + ` students`.
6. **Cover / icon**: prefer `coverImage` for the large hero mark; fall back to `icon`. Use `next/image` with existing `cdn.sanity.io` remote pattern. Soft rounded square (~180–200px) as in the mock.
7. **Learning outcome icons**: map schema keys `check | code | layers | shield | clock | users | zap | book` to lucide icons (primary/orange stroke). Unknown key → `BookOpen` or `Check`.
8. **Curriculum accordion**:
   - Each row is a **module** (number circle from `moduleNumber`, title, summary, module duration, chevron).
   - Expanding a module reveals its lessons (title + duration). Lesson rows link to `/lessons/[lessonSlug]` (404 until lesson page ships; that is fine).
   - Do not invent module/lesson copy. Numbers are derived from order already on `CourseDetail`.
9. **Continue Learning**: links to the first lesson in module order (`/lessons/<firstLesson.slug>`). If the course has no lessons, omit the href or disable the control.
10. **Bookmark**: presentational only (secondary button with bookmark icon). No persistence.
11. **Progress**: presentational **0%** via existing `Progress`. Label copy like the mock: `Your Progress` / showLabel so `% complete` appears. No progress schema, no Clerk gating, no write token.
12. **CTA labels**: use **Continue Learning** (with arrow) as in the mock even at 0%, not “Start course”.
13. **Out of scope**: catalog `/courses` index page, lesson page, instructor page, real progress API, PostHog, search, changing seed data, rewiring home mocks, Studio schema changes.
14. **Responsive**: desktop matches the mock. Below ~768px: stack hero image above text, outcome cards 1-col, curriculum full width, progress strip stacks (bar then button).
15. **Soft background**: warm `neutral-50` canvas; optional faint corner wash like the mock if cheap with existing tokens; no dark mode.

## Files expected to touch

| Path | Action |
|------|--------|
| `app/courses/[slug]/page.tsx` | New server page: fetch, metadata, compose sections |
| `components/course/*` | New presentational pieces as needed: hero, outcomes grid, module accordion (client for expand/collapse), progress strip |
| `lib/format-duration.ts` | New duration + student count formatters |
| `lib/learning-outcome-icons.tsx` (or under `components/icons/`) | Icon key → ReactNode map |
| `prompts/course-page.md` | This prompt |

Prefer thin course-specific components over bloating `page.tsx`. Touch `components/ui/*` only if a tiny prop gap blocks fidelity (e.g. `Button` as child of `Link`); prefer `Link` with button classes as home already does.

## Requirements

### Layout (desktop)

1. Full-width header: logo, Courses (active) / My Learning, bell + auth.
2. Breadcrumb under header.
3. Hero row: image left, content right (badge, title, summary, meta, CTAs).
4. What you’ll learn card with 2×2 outcomes.
5. Course Content list with optional “Show all N modules”.
6. Bottom progress strip with 0% bar and Continue Learning.

### Data (grounded)

- Title, summary, popular badge, level, student count, cover/icon from Sanity.
- Course duration = sum of nested lesson `durationSeconds` (already on `CourseDetail`).
- Module count = `modules.length`.
- Module duration = sum of that module’s lesson durations.
- Outcomes = `learningOutcomes` array as authored.
- Never invent courses, modules, timestamps, or counts.

### Behavior

- Unknown slug → `notFound()`.
- Accordion: one or many modules may expand (simple independent toggles are fine).
- Show-all modules toggle only when `modules.length > 6`.
- Bookmark does not navigate or persist.
- Continue Learning → first lesson path.
- Lesson rows → `/lessons/[slug]`.
- Breadcrumb All Courses → `/courses`.

### Metadata

- `generateMetadata`: course title + summary (fallback description).

## Security considerations

- Public read-only page. Fetch only through server `getCourseBySlug` / `getCourseSlugs`.
- Never expose `SANITY_API_READ_TOKEN` or any write token to the client.
- Accordion client components receive serializable props only (no Sanity client).
- External images only via configured Sanity CDN `next/image` patterns.

## Acceptance criteria

- [ ] `/courses/nextjs-app-router-in-depth` matches `design/vertex-course.png` structure at ~1440px (nav, breadcrumb, hero, outcomes, curriculum, progress strip), using **seeded** title/copy/counts (not the home mock’s “Next.js for Production / 12 modules”).
- [ ] Other seeded slugs (e.g. a Docker/TypeScript course) render without hardcoding.
- [ ] Popular badge only when `isPopular`.
- [ ] Durations and student counts are formatted from Sanity numbers.
- [ ] Learning outcomes render with mapped icons from schema keys.
- [ ] Module accordion expands to show real lessons linking to `/lessons/[slug]`.
- [ ] Progress shows **0%**; Bookmark is non-persistent; Continue Learning targets the first lesson.
- [ ] Invalid slug returns 404.
- [ ] Narrow viewport (~375px) stacks without horizontal overflow.
- [ ] Typecheck, lint, and production build pass.

## Checks to run

From repo root:

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build`
4. `npm run dev` and open `/courses/nextjs-app-router-in-depth`

## Manual test steps

1. Open `http://localhost:3000/courses/nextjs-app-router-in-depth` and compare side by side with `design/vertex-course.png` at desktop width (structure and styling; expect seed title **Next.js App Router in Depth** and **4** modules).
2. Confirm Popular badge, meta row, What you’ll learn (4 outcomes), Course Content rows, progress at 0%, both Continue Learning CTAs.
3. Expand a module; confirm lessons list and each links to `/lessons/...` (404 acceptable).
4. Click breadcrumb All Courses; expect `/courses` (404 acceptable).
5. Open another seeded slug (e.g. a non-popular course); confirm badge hidden and content grounded.
6. Open `/courses/does-not-exist`; expect 404.
7. Resize to ~375px; confirm stacked layout and no horizontal scroll.
8. Confirm Courses nav link appears active.
