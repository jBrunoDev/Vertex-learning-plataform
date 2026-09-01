# Implement Vertex Design System

## Goal

Port the Vertex Design System from `design/vertex-designsystem.png` into the Next.js app as design tokens, shared UI components, and a `/design-system` showcase page that mirrors the sheet. Use the Home, Course, Lesson, and Search mocks only as usage context for component shapes and states. Do not build those product pages in this pass.

## Skills read

- `AGENTS.md` (sections 2, 3, 5, 6, 13)
- `.agents/skills/develop/SKILL.md` and `ui-guide.md` / `ui/image.md` (image-sourced UI; fidelity to the sheet)
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` (`next/font` for Playfair Display and Inter)

## Code inspected

- Root Next.js 16.3.4 + React 19 scaffold (single app at repo root; no `web/` / `studio/` split yet)
- `app/layout.tsx`: Geist fonts, default metadata
- `app/page.tsx`: create-next-app starter home
- `app/globals.css`: Tailwind v4 `@import "tailwindcss"` + minimal `:root` / `@theme inline` tokens; default dark `prefers-color-scheme` flip
- `package.json`: `next`, `react`, `tailwindcss` v4, no UI library, no icon package, no `clsx` / `cva`
- `design/*.png`: designsystem (source of truth), plus home / course / lesson / search for component usage
- No `docs/`, no existing `design.md`, no `components/` yet

## Decisions and assumptions

1. **Scope**: tokens + reusable components + `/design-system` showcase only. Product routes stay out of scope.
2. **Workspace**: implement in the existing root Next.js app. Do not create the Studio workspace or move the app into `web/` in this pass.
3. **Token source of truth**: CSS custom properties mapped through Tailwind v4 `@theme inline` in `app/globals.css`. Exact hex values from the sheet.
4. **Fonts**: replace Geist with `Playfair_Display` (display titles) and `Inter` (UI / body) via `next/font/google`. Expose `--font-display` and `--font-sans`.
5. **No dark mode for now**: the sheet is light only. Remove the starter `prefers-color-scheme: dark` flip so the system stays light and matches the mocks.
6. **Icons**: add `lucide-react` for outline / filled sets shown on the sheet. Match 24×24, 2px stroke, rounded line caps as closely as Lucide allows.
7. **Class merging**: add a tiny `cn()` helper (`clsx` + `tailwind-merge`) for component variants. No shadcn / Radix install unless a native control is inaccessible without it; prefer native `<button>`, `<input>`, `<select>` styled to the sheet.
8. **Art direction file**: write `design.md` at the repo root with character, build mandate, and a pointer to `app/globals.css`. Do not duplicate token hex tables there.
9. **Showcase route**: `app/design-system/page.tsx` reproduces the sheet sections (01–14) with live components and static token swatches. Placeholder / demo content only; no Sanity, Clerk, or search wiring.
10. **Starter home**: leave `app/page.tsx` as-is or add a single link to `/design-system` if useful for local testing. Do not redesign the marketing home in this pass.
11. **Responsive**: desktop matches the sheet. Below that, stack section grids and card rows sensibly. No mobile mock exists.
12. **Naming**: Tailwind color tokens use the sheet names (`primary-500`, `neutral-900`, etc.). Components use semantic variant names from the sheet (Primary / Secondary / Tertiary / Text buttons; Video / Lesson / Popular badges).

## Files expected to touch

| Path | Action |
|------|--------|
| `app/globals.css` | Replace starter tokens with full Vertex theme (colors, radii, shadows, type scale, spacing) |
| `app/layout.tsx` | Playfair Display + Inter; update metadata to Vertex |
| `app/design-system/page.tsx` | New showcase page matching the sheet layout |
| `design.md` | New art direction + token pointer |
| `lib/cn.ts` | New `cn()` helper |
| `components/ui/button.tsx` | Primary / Secondary / Tertiary / Text; default / hover / disabled |
| `components/ui/input.tsx` | Search / text input (44px height, 12px radius, focus `#E2E8F0` border → primary ring per sheet) |
| `components/ui/select.tsx` | Styled native select matching “Most Relevant” |
| `components/ui/badge.tsx` | Video / Lesson / Popular |
| `components/ui/status.tsx` | In Progress / Completed / Now Playing / Locked |
| `components/ui/progress.tsx` | Progress bar + “35% complete” label pattern |
| `components/ui/card.tsx` (or split files) | CourseCard, LessonCardVideo, LessonCardLesson, ResourceCard |
| `components/ui/nav.tsx` | Logo + Courses / My Learning active link pattern |
| `components/ui/breadcrumb.tsx` | Breadcrumb trail |
| `components/ui/pagination.tsx` | Page control as on the sheet |
| `components/icons/vertex-logo.tsx` | Vertex mark + wordmark used in nav / showcase header |
| `package.json` / lockfile | Add `lucide-react`, `clsx`, `tailwind-merge` |
| `prompts/design-system.md` | This prompt (already written) |

Optional small shared pieces if needed while matching the sheet: `components/ui/section-label.tsx`, icon demo strip inside the showcase only.

## Requirements

### Tokens (exact from sheet)

**Primary:** 500 `#F97316`, 400 `#FB923C`, 300 `#FDBA74`, 200 `#FED7AA`, 100 `#FFEDD5`

**Neutral:** 900 `#0F172A`, 700 `#334155`, 500 `#64748B`, 300 `#CBD5E1`, 200 `#E2E8F0`, 100 `#F1F5F9`, 50 `#FAFAFC`, White `#FFFFFF`

**Typography:** Playfair Display (Display 1/2), Inter (Heading 1–3, Body Large, Body, Small)

**Type scale (size / line-height / weight):**

| Style | Font | Size / LH | Weight |
|-------|------|-----------|--------|
| Display 1 | Playfair | 48 / 56 | Bold |
| Display 2 | Playfair | 36 / 44 | Bold |
| Heading 1 | Inter | 28 / 36 | Semi Bold |
| Heading 2 | Inter | 22 / 30 | Semi Bold |
| Heading 3 | Inter | 18 / 26 | Medium |
| Body Large | Inter | 16 / 24 | Regular |
| Body | Inter | 14 / 20 | Regular |
| Small | Inter | 12 / 16 | Regular |

**Spacing:** 4px base; scale 4, 8, 12, 16, 24, 32, 40, 48, 64

**Radius:** 4, 8, 12, 16, 24, full

**Shadows:** Sm / Md / Lg / Xl as on the sheet (use the listed rgba values)

### Components (match sheet specs)

- **Buttons:** height 44px, padding 16×24 (or 16×16 md for icon-adjacent), radius 12px, Inter Medium 14–16px. Variants: Primary (filled primary-500, white text), Secondary (white, primary-tinted border/text), Tertiary (light fill), Text (no fill). States: default, hover, disabled.
- **Inputs:** height 44px, radius 12px, padding 0 16px, border `#E2E8F0`, focus border `#F97316` (or as shown). Search variant with leading search icon and trailing shortcut chip (`⌘ K`).
- **Badges:** Video (orange outline/fill), Lesson (soft orange/peach), Popular (solid primary).
- **Status:** In Progress, Completed (green check), Now Playing (primary), Locked (muted).
- **Progress:** track + primary fill, optional percent label.
- **Cards:** four types with the structure shown (course meta, video lesson with Watch from CTA, lesson with View lesson CTA, resource with type/size + external affordance).
- **Navigation:** logo left; Courses / My Learning; active link in primary; right side may show bell + avatar placeholders on the showcase if present on product mocks, but the sheet’s nav strip is the minimum.
- **Breadcrumb / Pagination:** as section 13.

### Showcase page

Reproduce sections 01–14 from the designsystem sheet with live components where interactive, and swatches / type specimens for tokens. Background canvas ≈ neutral-50 / white cards with soft borders. Section numbering and titles as on the sheet. Principles (14) as static copy from the sheet.

### Out of scope

- Sanity schema, Clerk, PostHog, search API, video ingestion
- Real Home / Course / Lesson / Search product pages
- Studio workspace split
- Dark mode
- Pixel-perfect icon redraws beyond Lucide approximations

## Security considerations

- Showcase is public and read only; no secrets, tokens, or user data.
- Do not add client-side Sanity or write tokens.
- Keep any future env keys out of this pass; no `.env` changes required.

## Acceptance criteria

- [ ] `app/globals.css` exposes the full color, type, spacing, radius, and shadow tokens from the sheet via Tailwind v4 `@theme`.
- [ ] Root layout loads Playfair Display + Inter; Geist is removed.
- [ ] Shared components exist under `components/ui/` for buttons, inputs, select, badges, status, progress, the four card types, nav, breadcrumb, pagination.
- [ ] `/design-system` renders a showcase that visually matches `design/vertex-designsystem.png` at desktop width (layout, typography, colors, component states).
- [ ] `design.md` records character + build mandate and points at the CSS token file.
- [ ] Light theme only; no accidental dark flip from the starter template.
- [ ] Typecheck and lint pass in the app workspace.
- [ ] Showcase is usable on a narrow viewport without horizontal overflow (stacked sections).

## Checks to run

From repo root:

1. `npx tsc --noEmit` (or project typecheck if script added)
2. `npm run lint`
3. `npm run build` (layout, global CSS, and new route)
4. `npm run dev` and open `/design-system`

## Manual test steps

1. Start the dev server and open `http://localhost:3000/design-system`.
2. Compare the page side by side with `design/vertex-designsystem.png` at ~1440px width: colors, type samples, spacing ramp, radii, shadows, icon strip, button states, inputs, badges, status, progress, cards, nav / breadcrumb / pagination, principles.
3. Hover Primary / Secondary / Tertiary / Text buttons; confirm hover and disabled look like the sheet.
4. Focus the search input; confirm border / ring treatment.
5. Change the select value; confirm it stays styled.
6. Resize to ~375px width; confirm sections stack and nothing clips.
7. Confirm the default home route still loads (starter page is acceptable).
