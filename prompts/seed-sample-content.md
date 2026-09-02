# Seed sample catalog content into Sanity

## Goal

Load a real, schema-aligned catalog into the existing Sanity project/dataset so catalog pages and later cross-course search have data to query. Reuse the authored catalog in `studio/scripts/seed.ndjson` (6 categories, 5 instructors, 10 courses, 120 lessons on programming, web, AI, data, DevOps, and security). Remap fields to the Studio schema, import via the Sanity CLI, and prove that duration and curriculum relations add up: a module is the sum of its lessons, a course is the sum of its modules.

## Skills read

- `AGENTS.md` (sections 5, 7–9, 12–13): private dataset; server-only token; coherent curriculum; duration is derived, never stored on course/module; video documents are a later ingestion step; CLI import is the load path; report real check output
- `.agents/skills/sanity-migration/SKILL.md` and `references/general.md`: NDJSON + `sanity datasets import --replace`; deterministic ids for reruns; do not bulk-load via MCP; create referenced docs before referrers; validate with counts and reference checks; `_sanityAsset` is CLI-import only
- `.agents/skills/sanity-best-practices/SKILL.md` `references/migration.md`: `_sanityAsset` is resolved only by `sanity datasets import`
- `.agents/skills/content-modeling-best-practices/SKILL.md`: module is embedded; lesson / instructor / category are documents

## Code inspected

- `studio/scripts/seed.ndjson`: 141 NDJSON documents with deterministic ids (`category.*`, `instructor.*`, `lesson.*`, `course.*`)
  - 6 category, 5 instructor, 120 lesson, 10 course
  - Each course has 4 modules × 3 lessons = 12 lessons
  - 0 orphan lessons, 0 missing refs, 0 lessons referenced twice
  - Courses do not store duration (correct)
- `studio/scripts/videos.json`: 120 YouTube lookups keyed by lesson slug. Not imported this pass. Lesson `videoUrl` already points at `https://www.youtube.com/watch?v=<id>`
- Studio schema vs seed field names (must remap before import, or GROQ/Studio will miss the data):
  - lesson: seed `thumbnail` / `duration` / `freePreview` → schema `poster` / `durationSeconds` / `isFreePreview`
  - course: seed `popular` → schema `isPopular`; no `icon` on seed (schema has optional icon)
  - instructor: seed `expertise` string[] + Portable Text `bio` → schema string / text
  - objects: seed `_type: "resource"` → schema `lessonResource`; `learningOutcome` name already matches
  - learning-outcome icons used in seed: `layers`, `code`, `shield` (valid) plus `workflow`, `gauge`, `rocket`, `sparkles`, `puzzle` (not in schema list `check | code | layers | shield | clock | users | zap | book`)
- `lib/sanity/queries.ts` + `lib/sanity/fetch.ts`: catalog duration is `sum(modules[].lessons[]->durationSeconds)`; course detail duration is the same sum via nested modules. No stored course/module duration field.
- `studio/package.json` + `studio/run-with-env.mjs`: Studio CLI loads repo-root `.env.local` (`SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`)
- `studio/sanity.cli.ts`: project/dataset from those Studio env vars (same project the web app uses)
- No `video` document type in the Studio schema. Do not invent video documents.

## Decisions and assumptions

1. **Reuse the existing catalog, do not generate a second one.** Ten distinct courses already cover Next.js, React, TypeScript, LLMs, RAG, Python/data, system design, PostgreSQL, Docker/Kubernetes, and web security. That meets “at least 10” and “programming, development, AI, and so on.” Curriculum is already coherent: each module’s three lessons belong to that module’s topic, and each lesson is referenced by exactly one module.
2. **Align the seed to the schema, not the schema to the seed.** GROQ already reads `poster`, `durationSeconds`, `isFreePreview`, `isPopular`, string `expertise`, text `bio`, and `lessonResource`. Rewriting 141 documents is smaller and safer than changing the content model and TypeGen.
3. **Duration is derived, never stored on course or module.** After remap, each lesson keeps `durationSeconds` from the existing `duration` (which already matches `videos.json`). A module’s duration is the sum of its lesson seconds. A course’s duration is the sum of its modules (equivalently, the sum of all nested lesson seconds). Assert this with GROQ after import. Do not add duration fields to course or module.
4. **Deterministic ids stay.** Migration default for a rerunnable fixture. `--replace` converges on `category.*` / `instructor.*` / `lesson.*` / `course.*`. Warn that `--replace` overwrites those ids if anything already exists.
5. **Transform in place, then import.** Rewrite `studio/scripts/seed.ndjson` so it is the canonical fixture. Do not keep a parallel unaligned file. `videos.json` is read-only this pass (cross-check only).
6. **Field remap rules (mechanical):**
   - lesson: `thumbnail` → `poster`; `duration` → `durationSeconds`; `freePreview` → `isFreePreview`; drop the old keys
   - course: `popular` → `isPopular`; drop `popular`
   - instructor `expertise`: join the array with `", "` into one string
   - instructor `bio`: flatten Portable Text blocks to plain text (paragraphs joined by `\n\n`)
   - resource objects: `_type: "resource"` → `_type: "lessonResource"` (keep `type: "link"`)
   - learning-outcome icons not in the schema list map to the closest allowed key: `workflow` → `layers`, `gauge` → `clock`, `rocket` → `zap`, `sparkles` → `zap`, `puzzle` → `book`. Leave `layers` / `code` / `shield` unchanged
7. **Course icon.** Schema has optional `icon` used on cards/search. Seed has none. Copy each course’s `coverImage` `_sanityAsset` onto `icon` with alt `"Icon for <title>"` so cards have a mark without inventing new artwork.
8. **Target is the existing project/dataset** from `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET` in `.env.local`. Do not create a new project. Never print tokens or env values.
9. **Load path:** from `studio/`, `node run-with-env.mjs datasets import ./scripts/seed.ndjson <dataset> --replace`. Dataset name comes from env, not hardcoded. `_sanityAsset` URLs (ytimg thumbs, randomuser portraits, picsum covers) are resolved only by this CLI import.
10. **Auth:** import needs a write-capable token or an existing `sanity login`. The committed `SANITY_API_READ_TOKEN` is Viewer and will not write. If the CLI is not logged in, stop and report that; do not put a write token in the repo.
11. **Do not change Studio schema, GROQ, or Next.js pages.** This pass is content only.
12. **Do not deploy Studio/schema** unless import itself requires it (it should not).
13. **Out of scope:** video documents / transcript ingestion, search agent, wiring catalog pages to live fetchers, MCP bulk creates.

## Files expected to touch

| Path | Action |
|------|--------|
| `studio/scripts/seed.ndjson` | Rewrite in place with schema field names (same 141 docs, same ids) |
| `studio/scripts/videos.json` | Read only. Count/id cross-check. Do not edit |
| `prompts/seed-sample-content.md` | This prompt |

A one-off Node transform run in the terminal is fine; do not add a committed generator unless it is the cleanest way to rewrite the NDJSON. No application or schema files.

## Requirements

1. Transform `seed.ndjson` using the remap rules above. Keep `_id`, slugs, titles, summaries, notes, keyPoints, proTip, resources urls, module titles/summaries, lesson refs, instructor/category refs, prices, levels, student counts, and `_sanityAsset` URLs.
2. After transform, re-validate the file locally before import:
   - counts: 6 / 5 / 120 / 10
   - every lesson id is referenced by exactly one module; no missing refs
   - no leftover keys: `thumbnail`, `duration` (on lessons), `freePreview`, `popular`
   - every lesson has `poster`, `durationSeconds`, `isFreePreview`
   - every course has `isPopular` and `icon`
   - every instructor `expertise` is a string and `bio` is a string
   - every resource `_type` is `lessonResource`
   - every learning-outcome `icon` is one of `check | code | layers | shield | clock | users | zap | book`
   - for each course, `sum(module lesson durationSeconds) === sum(all nested lesson durationSeconds)`
3. From `studio/`, with env loaded:
   ```
   node run-with-env.mjs datasets import ./scripts/seed.ndjson <dataset> --replace
   ```
   Confirm the dataset name in the CLI output without dumping the rest of `.env.local`.
4. After import, query live counts:
   ```
   count(*[_type == "category"])
   count(*[_type == "instructor"])
   count(*[_type == "lesson"])
   count(*[_type == "course"])
   ```
   Expected: 6 / 5 / 120 / 10.
5. After import, prove duration relations with GROQ (or equivalent). Every course must satisfy:
   - `courseSeconds == sum(moduleSeconds)`
   - each `moduleSeconds == sum(that module’s lesson durationSeconds)`
   - `courseSeconds` is the sum of nested `lessons[]->durationSeconds` (no stored course duration field)
6. Cross-check `videos.json`: 120 keys; every lesson `_id` `lesson.<key>` exists; every lesson `videoUrl` contains the matching YouTube `id`; every lesson `durationSeconds` equals the JSON `duration`.
7. Spot-check one course and one lesson in Studio or GROQ: title, slug, instructor/category refs, modules with lesson refs, `poster` / `durationSeconds` / `isPopular` populated, image assets resolved (not leftover `_sanityAsset` strings).
8. If import fails on auth, assets, or missing project, stop. Do not invent a workaround that mutates env files or makes the dataset public.

## Security considerations

- Dataset is private. Do not log or paste tokens, `.env.local`, or the read token.
- Import is a write. Use CLI auth / an Editor token locally; do not add a write token to `.env.example` or commit one.
- `_sanityAsset` URLs are public thumbs/portraits (ytimg, randomuser, picsum). No user PII.
- Do not expose the dataset or make it public to make import easier.

## Out of scope

- Video document schema or transcript ingestion
- Changing Studio schema or GROQ to match the old seed names
- Studio/schema deploy
- Wiring pages to live content
- Search agent / Context document
- MCP bulk creates
- Generating a second catalog from scratch

## Acceptance criteria

- [ ] `seed.ndjson` matches the Studio schema field names
- [ ] File still has 6 categories, 5 instructors, 10 courses, 120 lessons
- [ ] Every lesson belongs to exactly one module; every module’s lessons belong to that module’s topic
- [ ] No duration stored on course or module; live GROQ shows course duration = sum of modules = sum of lessons
- [ ] CLI import of `seed.ndjson` completed (`--replace`)
- [ ] Live counts: 6 category, 5 instructor, 120 lesson, 10 course
- [ ] 120 `videos.json` keys match 120 lessons and their YouTube ids
- [ ] Sample course/lesson refs and images exist in the dataset; `poster`, `durationSeconds`, `isPopular` are populated
- [ ] `videos.json` unmodified
- [ ] Real CLI and count output reported; no claimed success without running it

## Checks to run

From `studio/` (env loaded via `run-with-env.mjs`):

1. Local transform validation (counts, refs, field names, duration sums) before import
2. `node run-with-env.mjs datasets import ./scripts/seed.ndjson <dataset> --replace`
3. GROQ counts for the four types
4. GROQ duration identity per course (module sum == course sum == nested lesson sum)

No Next.js typecheck/lint/build required (no application code change).

## Manual test steps

1. Open Studio (`npm run dev` in `studio/`, typically `http://localhost:3333`).
2. Confirm Courses (10), Lessons (120), Instructors (5), Categories (6).
3. Open **Next.js App Router in Depth**: four modules, three lessons each; instructor Mira Kovac; category Web Development; Popular is checked; duration in any UI that sums lessons should match the twelve lesson lengths.
4. Open the first lesson of that course: title, notes, YouTube URL, poster, duration in seconds, free-preview flag present.
5. Open an AI course (**Building AI Apps with LLMs** or **Retrieval-Augmented Generation from Scratch**) and confirm its modules are about that topic, not mixed with unrelated lessons.
6. If an image is missing, note which asset URL failed; fix the `_sanityAsset` URL if it is a typo, otherwise report it.
