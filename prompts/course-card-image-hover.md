# Fix Course Card Images and Hover

## Goal

Fix homepage (and shared) `CourseCard` marks so Sanity cover/icon photos fill a proper rounded square, and add a clear hover style on linked cards. Match the calm Vertex card language; do not redesign the card.

## Skills / code

- `AGENTS.md` §3 UI fidelity; reuse `components/ui/card.tsx`
- `components/ui/card.tsx`: `Image` at 48×48 without `object-cover`, so landscape Sanity assets shrink into a tiny strip
- `app/page.tsx`: wraps cards in `Link` with only `hover:opacity-95`

## Decisions

1. **Icon mark**: keep `size-12` rounded square; when `iconSrc` is set, use a relative container + `Image` with `fill` and `object-cover` (or `size-full object-cover`). Keep `bg-neutral-100` behind photos so empty load states are soft.
2. **Hover**: on the card (or the wrapping link), use `transition` + slight lift (`-translate-y-0.5` or `translate-y-[-2px]`) + stronger shadow (`shadow-md` / `shadow-lg`), border subtly toward `neutral-300` or primary-tinted if it stays calm. Remove weak opacity-only hover on the home `Link`.
3. **Scope**: `CourseCard` + home link classes. No seed/schema changes. Design-system CourseCard benefits automatically.
4. Prefer implementing hover via optional `className` on the article plus home `Link` styles (`group` / `group-hover` if needed) so non-linked design-system demos stay fine.

## Files

| Path | Action |
|------|--------|
| `components/ui/card.tsx` | Fix image fill; add hover-friendly base transitions if appropriate |
| `app/page.tsx` | Improve link/card hover (group + shadow/lift) |
| `prompts/course-card-image-hover.md` | This prompt |

## Acceptance

- [ ] Icon area is a filled square; photos crop with `object-cover`, not a tiny landscape strip
- [ ] Hover shows lift and/or shadow (not opacity-only)
- [ ] Keyboard focus ring remains visible on the link
- [ ] Lint/typecheck pass

## Checks

1. `npx tsc --noEmit`
2. `npm run lint`
3. Dev: `/` — confirm icons and hover; click still goes to course page
