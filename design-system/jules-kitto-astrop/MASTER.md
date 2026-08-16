# Jules Kitto-Astrop — Design System

Source: UI/UX Pro Max searches (verified 2026-08-17), then adapted to project rules.

## Product

Personal portfolio for a student leader / event coordinator / digital builder. Audience: conference partners, youth collaborators, leadership opportunities. Stack: React 19 + Vite.

## Verified recommendations used

| Domain | Result used |
|--------|-------------|
| Landing | **Portfolio Grid / Hero-Centric** — Hero (name/role) → work showcase → about/philosophy → contact |
| Style | **Editorial Grid / Magazine** — asymmetric grid, pull quotes, large imagery, print-inspired hierarchy |
| Style (secondary) | Brutalism’s *asymmetric, anti-template* stance only — not 0px radius or instant motion |
| Typography mood | Editorial / magazine (distinctive heading + clean body) |
| Icons | Phosphor outline, `Envelope` for email. No emoji as icons |
| UX | Visible `:focus-visible` rings; sticky nav must not cover focus; semantic `button`/`nav` |
| React | `lazy()` for routes; semantic HTML |
| Motion | 300–450ms stagger; skip under `prefers-reduced-motion` |

## Overrides (project rules beat dataset defaults)

The generator suggested Brutalism + Caveat/Quicksand and a gray `#FAFAFA` canvas with pink `#EC4899` CTA. Those conflict with this repo’s design rules, so they are **not** used.

| Token | Dataset default | This site |
|-------|-----------------|-----------|
| Background | `#FAFAFA` | `#DFF2FC` |
| Heading | Libre Bodoni / Caveat | Clash Display |
| Body | Public Sans / Quicksand | Satoshi |
| CTA | `#EC4899` pink or `#2563EB` blue | Terracotta `#B55242` |
| Radius | 0px (brutalism) | 10px cards / 16px hero |
| Motion | Instant | 320–420ms |

## Color tokens

```css
--color-background: #DFF2FC;
--color-foreground: #1B2C3A;
--color-primary: #234056;
--color-on-primary: #FFF6EC;
--color-accent: #B55242;
--color-on-accent: #FFFAF6;
--color-card: #FFF6EC;
--color-muted: #C8E8F6;
--color-muted-foreground: #3A5163;
--color-border: rgba(27, 44, 58, 0.14);
--color-ring: #234056;
```

Text on background and cards must stay ≥ 4.5:1.

## Type

- Display: Clash Display 500–700, tracking tight, 2–3 heading sizes
- Body: Satoshi 400/500/700
- Labels/eyebrows: 0.78rem, uppercase, sage `#4F6F5E`
- Long-form measure: max ~38–46rem

## Layout

- Asymmetric editorial grid, not equal card rows
- 8px spacing rhythm (8 / 16 / 24 / 32 / 48)
- Hero photo offset; chapters slightly different in composition
- Mini CTA at the end of each chapter; climax CTA in the footer band
- Sticky header with `scroll-padding-top` so focus is never fully covered

## Interaction

- `cursor: pointer` on links and buttons
- Hover: lift or soft rotate, 280–420ms, not identical on every card
- Focus: 3px ring, 3px offset, never `outline: none` without a replacement
- Icon-only controls need an accessible name
- Decorative Phosphor icons beside visible text: `aria-hidden`

## Motion

Stagger lists 300–450ms. Under reduced motion: no translate/opacity animation; render final state.

## Anti-patterns (do not ship)

- Emoji as navigation or system icons
- Generic “Get started” CTAs
- AI purple/pink gradients, neon glow, perfectly even card grids
- Removing focus outlines
- Importing every route eagerly
