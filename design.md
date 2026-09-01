# Vertex design system

**Status**: Active  
**Source**: image (`design/vertex-designsystem.png`)  
**Version**: 1.0 · May 2025

## Character

Clean, modern, and calm. Warm orange primary on cool slate neutrals. Display titles use Playfair Display for a quiet editorial feel; UI and body use Inter for clarity. Soft cards, generous 4px-based spacing, and rounded 12px controls. Focus stays on what learners need next.

## Build mandate

Reproduce the design sheet and product mocks exactly. Do not invent a second visual language. Prefer existing `components/ui` pieces and Tailwind tokens from `app/globals.css` before adding new ones. Desktop matches the references; below that, stack columns and collapse dense sidebars sensibly. Never restyle beyond the reference.

## Principles

1. **Clarity first** — every element should communicate clearly.
2. **Consistency** — use components and patterns consistently across the platform.
3. **Focus and care** — remove noise and help learners focus on what matters.
4. **Accessible** — design with accessibility and inclusivity in mind.

## Tokens

Token values live in `app/globals.css` (`:root` and Tailwind v4 `@theme inline`). Do not duplicate hex tables here.

## Component inventory

Shared UI under `components/ui/`:

- Button, Input, Select
- Badge, Status, Progress
- CourseCard, LessonCard (video / lesson), ResourceCard
- Nav, Breadcrumb, Pagination
- VertexLogo

Showcase: `/design-system`
