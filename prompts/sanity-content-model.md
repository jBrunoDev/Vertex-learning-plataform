# Implement Vertex Content Model, Studio, and Read Data Layer

## Goal

Replace the empty embedded Studio with a standalone Sanity Studio, model course / module / lesson / instructor / category as specified in AGENTS.md section 8, and add a server-only read client plus GROQ fetchers in the Next.js app. Do not wire product pages to live content yet. Do not add video documents, progress, search, or the Context plugin in this pass.

## Skills read

- `AGENTS.md` (sections 5–8, 12–13): standalone Studio + web; private dataset; server-only token; fixed relationships; no `@sanity/context` plugin on Sanity 5
- `.agents/skills/sanity-best-practices/SKILL.md` plus `references/schema.md`, `project-structure.md`, `nextjs.md`, `groq.md`, `typegen.md`, `studio-structure.md`, `image.md`, `portable-text.md`
- `.agents/skills/content-modeling-best-practices/SKILL.md` and `references/reference-vs-embedding.md` (module is embedded; lesson / instructor / category are documents)
- `node_modules/next/dist/docs/01-app/02-guides/environment-variables.md` (`NEXT_PUBLIC_*` is client-safe only)

## Code inspected

- Root Next.js 16.3.4 app (Clerk, home, design system already shipped). No `web/` folder.
- Embedded Studio scaffold: `sanity.config.ts` (`basePath: '/studio'`), `sanity.cli.ts`, `app/studio/[[...tool]]/page.tsx`, empty `sanity/schemaTypes/index.ts` (`types: []`)
- `sanity/lib/client.ts`: `next-sanity` `createClient` with `useCdn: true` and **no token**
- `sanity/lib/live.ts`: `defineLive` without `serverToken` (would imply a browser token later; skip)
- `sanity/env.ts`: asserts `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`
- Root `package.json`: `sanity`, `@sanity/vision`, `styled-components`, `next-sanity`, `@sanity/image-url`
- `.env.example`: Clerk keys only
- Home still uses `lib/home-courses.tsx` mocks
- `next.config.ts`: no `images.remotePatterns`
- `tsconfig.json` includes `**/*.ts`; must exclude the new `studio/` workspace

## Decisions and assumptions

1. **Standalone Studio, Next.js stays at repo root.** Create `studio/` as its own Vite app. Delete the embedded `/studio` route and root `sanity.config.ts` / `sanity.cli.ts` / `sanity/` Studio files. Do **not** move the Next.js app into `web/` in this pass (Clerk + home already live at root). The existing Next.js app is the web workspace.
2. **Reuse the existing Sanity project and dataset** already referenced by `NEXT_PUBLIC_SANITY_*`. Do not create a new project. Never print `.env.local` or token values.
3. **Scope is catalog content + read layer only.** Types: `course`, `module` (object), `lesson`, `instructor`, `category`. Out of scope: video documents, progress records, agent context, search API, Clerk writes, PostHog, Portable Text UI on pages, swapping home mocks for live data.
4. **Private dataset, server-only token.** Web client uses `SANITY_API_READ_TOKEN` (Viewer). Mark client + fetch with `server-only`. No `NEXT_PUBLIC_` token. No `browserToken`. Skip `defineLive` / `<SanityLive />` / Visual Editing this pass so the browser never holds a Sanity token.
5. **Video URLs, not file assets.** Lesson `videoUrl` is an `http`/`https` URL (YouTube / Vimeo / Bunny). Do not add Sanity `file` video fields.
6. **Module is an embedded object** on course (ordered array). Lesson does not store a parent course; parent is a reverse GROQ lookup. Module and lesson numbers (e.g. Module 5, Lesson 5.1) are derived from array order in the data layer, not stored.
7. **Duration is seconds.** Lesson `durationSeconds` is a number. Course duration is the sum of nested lesson durations (computed in the fetch mapper). Do not store course duration.
8. **Price is a USD number** (0 allowed). Level is a closed list: `beginner` | `intermediate` | `advanced`.
9. **Images:** `hotspot: true` plus `alt` on cover, lesson poster, instructor photo, and optional course icon. `urlFor` stays server-side; fetchers return `{ src, alt }` strings for pages.
10. **Notes are Portable Text** (`block` with basic styles/marks/lists, optional image block). No markdown fields. Do not add a page renderer yet; queries may return notes for the lesson fetcher.
11. **Learning-outcome icon** is a string list of semantic keys (`check`, `code`, `layers`, `shield`, `clock`, `users`, `zap`, `book`), not a color or layout field.
12. **TypeGen from Studio.** `studio/sanity.cli.ts` scans `../lib/sanity/**/*.{ts,tsx}` and writes `../sanity.types.ts`. Enable `typegen.enabled`. Commit generated types. Exclude `studio` from the Next.js `tsconfig`.
13. **Studio env.** Use `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET` in the Studio app (same values as the public Next vars). Load from the repo-root `.env.local` via Vite `envDir: '..'` (or a `studio/.env` that is gitignored). Auto-updates on.
14. **Do not install `@sanity/context`.** Sanity is v5; plugin support may lag. No Context document this pass.
15. **Home page stays mock.** Fetchers exist for later catalog / course / lesson / instructor pages.

## Files expected to touch

| Path | Action |
|------|--------|
| `studio/` | New standalone Studio (package.json, sanity.config.ts, sanity.cli.ts, schema, structure) |
| `studio/schemaTypes/documents/{course,lesson,instructor,category}.ts` | New documents |
| `studio/schemaTypes/objects/{module,learning-outcome,lesson-resource}.ts` | New objects |
| `studio/schemaTypes/index.ts` | Register types |
| `studio/structure.ts` | Courses, Lessons, Instructors, Categories |
| `app/studio/**` | Delete embedded Studio route |
| `sanity.config.ts`, `sanity.cli.ts`, `sanity/**` | Delete embedded scaffold |
| `lib/sanity/env.ts` | Project id, dataset, api version (no token export to client) |
| `lib/sanity/client.ts` | Server-only `createClient` with token, `useCdn: true` |
| `lib/sanity/token.ts` | Server-only read token helper |
| `lib/sanity/image.ts` | `urlFor` |
| `lib/sanity/queries.ts` | `defineQuery` GROQ |
| `lib/sanity/fetch.ts` | Typed fetchers + derived module/lesson labels |
| `sanity.types.ts` | Generated (commit) |
| `package.json` / lockfile | Drop Studio-only deps from the Next app; add `server-only`; keep `next-sanity` + `@sanity/image-url` |
| `next.config.ts` | `images.remotePatterns` for `cdn.sanity.io` |
| `tsconfig.json` | Exclude `studio` |
| `.env.example` | Add Sanity public vars + `SANITY_API_READ_TOKEN` + Studio vars (placeholders) |
| `.gitignore` | Ignore `studio/node_modules`, `studio/dist` |
| `prompts/sanity-content-model.md` | This prompt |

Root `package.json` may add `"studio": "npm run dev --prefix studio"` for convenience. No npm workspaces required.

## Requirements

### Studio workspace

1. Scaffold with `npm create sanity@latest` (clean TypeScript template, existing project + dataset, `--output-path studio`) **or** equivalent manual package if the CLI is non-interactive. Reuse the current project id and dataset.
2. Title the Studio **Vertex**.
3. Plugins: `structureTool` + `visionTool` only.
4. Desk: Courses, Lessons, then divider, Instructors, Categories. No leftover generic lists.
5. Icons from `@sanity/icons/<IconName>` (v5 subpath imports). Do not import from `@sanity/icons` root.
6. `defineType` / `defineField` / `defineArrayMember` everywhere. Previews with title + media.
7. Let Sanity generate document `_id`s. No slug-derived ids.

### Schema (fixed relationships)

**category** (document): `title`, `slug` (from title), `description` (text).

**instructor** (document): `name`, `slug` (from name), `photo` (image + alt + hotspot), `expertise` (string), `bio` (text).

**lesson** (document): `title`, `slug`, `videoUrl` (url, http/https), `poster` (image + alt + hotspot), `durationSeconds` (number, min 0), `isFreePreview` (boolean, default false; presentational only), `studentCount` (number, min 0), `notes` (Portable Text), `keyPoints` (array of strings), `proTip` (optional text), `resources` (array of objects: `type` list `pdf` \| `github` \| `article` \| `download` \| `link`, `title`, `description`, `url`). No parent-course field.

**module** (object, not a document): `title`, `summary`, `lessons` (ordered array of references to `lesson`).

**course** (document): `title`, `slug`, `summary` (text), `coverImage`, optional `icon` (small mark for cards/search), `level` (radio list), `price` (number, min 0), `isPopular` (boolean), `studentCount`, `learningOutcomes` (array of `{ icon, title, description }`), `instructor` (reference), `category` (reference), `modules` (ordered array of `module`).

Validation: required title/name, slug, and the references a published course needs (instructor, category). Slug custom uniqueness per type. URL fields use `rule.uri({ scheme: ['http', 'https'] })`. Empty curriculum may warn rather than hard-error so drafts can exist.

Field groups on course: Marketing | Curriculum.

### Web read client

1. `import 'server-only'` on client, token, queries (if they import the client), and fetch helpers.
2. `createClient` from `next-sanity`: `projectId`, `dataset`, dated `apiVersion` (keep `2026-09-02` or current date), `useCdn: true`, `token` from `SANITY_API_READ_TOKEN`.
3. Token missing → throw a clear server error. Never assert the token in a file that could be imported from a Client Component.
4. Public env: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, optional `NEXT_PUBLIC_SANITY_API_VERSION`. These may reach the browser (image builder / config). The token must not.
5. Do not export the client from a barrel that client components import.

### GROQ + fetchers

Wrap every query in `defineQuery` from `next-sanity`. Unique names. Always project fields (never `*[_type == "x"]` with no projection). Include `_key` on arrays. Expand references with a single `->` per hop. Use `_ref` in filters, not `->` in filters.

Queries (minimum):

- `COURSES_QUERY` — catalog cards: title, slug, summary, level, price, isPopular, studentCount, cover/icon, instructor name, category title, module count, summed duration
- `COURSE_BY_SLUG_QUERY` — full course: marketing fields, outcomes, instructor, category, modules with nested lessons (title, slug, duration, preview flag, poster). Do **not** return lesson `notes` here (keep the course payload small).
- `LESSON_BY_SLUG_QUERY` — lesson fields including notes, keyPoints, resources, plus parent course via reverse reference (`*[_type == "course" && references(^._id)][0]` with modules/lessons enough to derive labels)
- `INSTRUCTOR_BY_SLUG_QUERY` — instructor + courses that reference them
- `CATEGORIES_QUERY` — title, slug, description
- slug lists for later `generateStaticParams`: courses, lessons, instructors

Fetch helpers return mapped DTOs: derive `moduleNumber` / `lessonNumber` / labels like `Lesson 5.1 in Data Fetching and Caching` in TypeScript from array order. `notFound`-friendly: return `null` when missing. Never invent titles, prices, or counts.

Never return video `chunks` / transcripts (those types do not exist yet; do not add them).

### TypeGen

From `studio/`: extract + generate after schemas and queries exist. Script `typegen` on the Studio package. Root typecheck must see `sanity.types.ts`.

### Env example (placeholders only)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=2026-09-02
SANITY_API_READ_TOKEN=
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=
```

Keep existing Clerk keys in `.env.example`. Do not commit `.env.local`.

## Security considerations

- Dataset is private. Viewer token is server-only. Browser never calls Sanity or MCP.
- No write token this pass. No client-side `createClient`.
- Do not log tokens or dump env files.
- Image CDN host allowlist is explicit (`cdn.sanity.io` only).
- `isFreePreview` is a label, not access control.
- CORS: add `http://localhost:3000` if missing (`npx sanity cors add http://localhost:3000 --credentials` from studio, or document as a user step if the CLI needs login).

## Out of scope

- Video / progress / agent context schemas
- `@sanity/context` plugin, search route, LLM
- Wiring `/`, `/courses`, lesson, or instructor pages to Sanity
- Portable Text React renderer on the lesson page
- Visual Editing, draft mode, `defineLive`
- Moving Next.js into `web/`
- Content import / seed documents (authors use Studio)
- Studio application deploy (call out as a user step; required later for Context MCP)

## Acceptance criteria

- [ ] `studio/` runs with `npm run dev` in that folder (Vite, ~3333) and shows Courses, Lessons, Instructors, Categories
- [ ] Embedded `/studio` route is gone; Next `npm run build` no longer compiles Sanity Studio
- [ ] Schema matches AGENTS.md relationships: module object on course; lesson has no parent field; instructor and category are references
- [ ] Lesson video is a URL, not a Sanity file
- [ ] Web client is `server-only` and uses `SANITY_API_READ_TOKEN`
- [ ] Fetch helpers exist for catalog, course-by-slug, lesson-by-slug (with reverse course), instructor-by-slug, categories
- [ ] TypeGen output exists and typecheck uses it
- [ ] `.env.example` lists Sanity public vars + read token name
- [ ] Home page still uses mock courses
- [ ] Typecheck and lint pass in the Next app; Studio package typechecks if it has a script

## Checks to run

Next app (repo root):

1. `npm run typecheck`
2. `npm run lint`
3. `npm run build` (Studio route removed; `lib/sanity` is server code)

Studio (`studio/`):

1. `npm run typegen` (or extract + generate)
2. `npx tsc --noEmit` if a tsconfig exists
3. `npm run dev` — Studio loads

If a Viewer token is present in `.env.local`, smoke-fetch one query from a short `npx tsx` or a temporary server log **without printing the token**. If the token is missing, do not fail the pass; note it under Needs your attention.

Do not claim Studio/schema deploy succeeded unless `sanity schema deploy` / `sanity deploy` actually ran. Prefer documenting those as user steps if interactive login is required.

## Manual test steps

1. From `studio/`, run `npm run dev` and open the Studio URL (typically `http://localhost:3333`).
2. Confirm the four lists. Create one category, one instructor, two lessons (with video URLs), and one course with two modules referencing those lessons. Confirm module order is drag-reorderable.
3. Confirm a lesson document has no “parent course” field.
4. Open Vision and run the catalog GROQ; results should match authored docs only (no invented rows).
5. Start Next `npm run dev`. Confirm `/` is unchanged (mock courses) and `/studio` is not a Studio (404 is correct).
6. Confirm `.env.example` has the Sanity keys listed above and no real secrets.
7. If `SANITY_API_READ_TOKEN` is set, call `getCourses()` from a temporary server-only path or script and confirm real documents return; then remove the temporary path.
