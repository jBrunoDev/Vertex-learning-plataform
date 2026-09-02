# Implement Vertex Home Page

## Goal

Replace the starter `app/page.tsx` with the marketing / discovery home page from `design/vertex-home.png` (also attached in chat). Match desktop layout, typography, color, spacing, and states exactly. Adapt responsively below desktop (stack hero and course grid). Reuse the existing design system; do not invent a second visual language.

## Skills read

- `AGENTS.md` (sections 2, 3, 5, 7 presentational surfaces, 13)
- `.agents/skills/develop/SKILL.md`, `ui-guide.md`, `ui/image.md` (image-sourced UI; fidelity to the mock)
- `design.md` (character + build mandate; tokens in `app/globals.css`)

## Code inspected

- Root Next.js app (no `web/` / `studio/` split yet)
- Design system already shipped: `app/globals.css`, `design.md`, `components/ui/*`, `/design-system`
- Reusable pieces for this page: `Nav`, `Button`, `Input` (search + `⌘ K` shortcut), `CourseCard`, `VertexLogo`
- `app/page.tsx`: temporary link to `/design-system` (to be replaced)
- `app/layout.tsx`: Playfair Display + Inter, Vertex metadata
- No Sanity, Clerk, PostHog, or search route wired yet
- No `docs/scope` or home page spec; product mock + AGENTS.md govern this pass

## Decisions and assumptions

1. **Scope**: home route (`/`) only. Do not build Courses catalog, My Learning, Search results, Clerk, Sanity, or PostHog in this pass.
2. **Design source**: `design/vertex-home.png` is the source of truth. Tokens and components already exist; compose the page within that system.
3. **Course data**: static mock data matching the three cards in the mock (Next.js for Production, Docker Essentials, TypeScript Deep Dive). No Sanity fetch yet. Confirmed with engineer.
4. **Course icons**:
   - Next.js: black rounded square with white **N** (CourseCard fallback or small SVG).
   - Docker: whale mark in brand blue (inline SVG or lucide-adjacent custom icon in `components/icons/`).
   - TypeScript: blue rounded square with white **TS**.
5. **Nav**: reuse `Nav`. On home, **no** nav link is active (neither Courses nor My Learning is primary-colored in the mock). Pass `activeHref` as empty / omit so both stay muted. Keep bell + avatar placeholders (presentational per AGENTS.md). Avatar may use a static portrait placeholder image under `public/` or a neutral photo URL already used elsewhere; prefer a local `public/` asset or a soft initials circle if no asset exists. Match the mock’s circular avatar when practical.
6. **Hero**:
   - Eyebrow pill: `INTELLIGENT LEARNING` (small, uppercase, primary-tinted chip).
   - Display title (Playfair): `Search your learning` / `in plain English.`
   - Body: `Vertex understands what you want to learn and finds the exact lessons across all your courses.`
   - Primary CTA: `Explore Courses` with arrow → links to `/courses` (route may 404 until catalog exists; that is fine).
   - Search `Input`: placeholder `Ask anything about your learning...`, leading search icon, shortcut `⌘ K`. Presentational for this pass: submitting or focusing does not call an LLM. Optional: on Enter, navigate to `/search?q=…` if that route is harmless; otherwise leave as non-submitting UI. Prefer **no new search API**.
7. **All Courses section**:
   - Heading `All Courses` left; text link `View all courses →` right (primary color) → `/courses`.
   - Three `CourseCard`s in a row on desktop; stack / 1-col then 2-col on smaller breakpoints.
   - Meta lines match mock (level, duration, module count).
8. **Footer strip**: star icon + `New courses and lessons added every week.` Soft orange bar-chart / audio-wave decoration at the bottom of the page (CSS or SVG), fading into the cream canvas. Decorative only (`aria-hidden`).
9. **Background**: warm off-white / `neutral-50` canvas; subtle soft orbs or gradients only if already implied by the mock (keep light and calm). Do not add dark mode.
10. **Keyboard shortcut chip**: show `⌘ K` as in the mock (and Input’s existing `shortcut` prop). A global ⌘K handler is optional and out of scope unless trivial; do not block the page on it.
11. **Responsive**: desktop matches the mock. Below ~768px: stack nav actions sensibly if needed, single-column hero, course cards stack or 1–2 columns, wave decoration scales without overflow.
12. **Showcase**: leave `/design-system` untouched.

## Files expected to touch

| Path | Action |
|------|--------|
| `app/page.tsx` | Replace starter with home page composition |
| `components/home/*` (optional) | Extract Hero, CourseGrid, HomeFooterWave if `page.tsx` would be crowded |
| `components/icons/*` | Docker / TypeScript / Next course marks if not inlinable in mock data |
| `public/` (optional) | Avatar or course icon assets if needed |
| `components/ui/nav.tsx` | Only if `activeHref` must support “none active”; prefer prop usage without API break |
| `components/ui/card.tsx` | Only if CourseCard needs a small tweak to match home icon treatment (e.g. custom `icon` ReactNode); keep changes minimal |
| `prompts/home-page.md` | This prompt |

Do not change `app/globals.css` tokens unless a missing token blocks fidelity (prefer existing primary / neutral scale).

## Requirements

### Layout (desktop)

1. Full-width header: logo left, Courses / My Learning, bell + avatar right.
2. Centered hero: eyebrow → display headline → supporting copy → Explore Courses button → large search field.
3. All Courses: section header row + 3-up course cards.
4. Centered weekly note + bottom wave decoration.

### Copy (exact)

- Eyebrow: `INTELLIGENT LEARNING`
- H1: `Search your learning in plain English.` (line break after “learning” as in the mock)
- Subcopy: `Vertex understands what you want to learn and finds the exact lessons across all your courses.`
- CTA: `Explore Courses`
- Search placeholder: `Ask anything about your learning...`
- Section: `All Courses` / `View all courses →`
- Courses:
  1. **Next.js for Production** — Build scalable, high-performance web applications with Next.js. — Intermediate · 18h 24m · 12 modules
  2. **Docker Essentials** — Containerize applications and streamline your development workflow. — Beginner · 10h 12m · 8 modules
  3. **TypeScript Deep Dive** — Go beyond the basics and write safer, more expressive code. — Intermediate · 14h 36m · 10 modules
- Footer note: `New courses and lessons added every week.`

### Behavior

- Explore Courses and View all courses → `/courses`.
- Course cards may link to `#` or `/courses` for now (no course detail routes required). Prefer wrapping the card in a link to `/courses` or leaving non-linked until course pages exist; do not invent slugs.
- Search is UI-only (no MCP / LLM).
- Bell and avatar are presentational.

### Out of scope

- Sanity schema / GROQ catalog fetch
- Clerk auth (avatar stays placeholder)
- PostHog events
- Real search results page and API
- Studio workspace split
- Dark mode
- Pixel-perfect redraws of brand logos beyond simple SVG marks

## Security considerations

- Public, read-only marketing page; no secrets or tokens in the client.
- Do not add Sanity or write tokens.
- No new env vars.
- External images only if necessary; prefer local `public/` or inline SVG. If using `next/image` with a remote host, configure `images.remotePatterns` deliberately.

## Acceptance criteria

- [ ] `/` matches `design/vertex-home.png` at ~1440px (header, hero, search, course grid, footer note, wave).
- [ ] Reuses `Nav`, `Button`, `Input`, `CourseCard` (or thin wrappers); no duplicate design system.
- [ ] Three courses use the static mock copy and levels / durations / module counts from the mock.
- [ ] No nav item appears active on home.
- [ ] Explore Courses and View all courses point to `/courses`.
- [ ] Search input shows placeholder + `⌘ K` chip; no server search wiring required.
- [ ] Narrow viewport (~375px) stacks without horizontal overflow.
- [ ] `/design-system` still works unchanged.
- [ ] Typecheck and lint pass; production build passes (home route change).

## Checks to run

From repo root:

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build`
4. `npm run dev` and open `/`

## Manual test steps

1. Open `http://localhost:3000/` and compare side by side with `design/vertex-home.png` at desktop width.
2. Confirm Playfair headline, Inter UI, primary CTA, search field, three course cards, footer star line, and bottom wave.
3. Confirm Courses / My Learning are not highlighted as active.
4. Click Explore Courses and View all courses; expect navigation to `/courses` (404 is acceptable until catalog exists).
5. Focus the search input; confirm focus ring / border treatment from the design system.
6. Resize to ~375px; confirm stacked layout and no horizontal scroll.
7. Open `/design-system` and confirm it still renders.
