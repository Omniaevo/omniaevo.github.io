---
name: omniaevo-design
description: Design system "A1 Strati" of the Omniaevo Hugo site (accordion of 5 strips, lean tokens, keyword mark, card rules, icons). Use whenever you write or change CSS, templates, partials, i18n labels or CMS fields that affect how the site looks, or when you build a section of the redesign (steps in docs/redesign/ACCORDION.md).
---

# Omniaevo design system — A1 «Strati»

Sources of truth (read them, do not copy values from memory):
- `docs/redesign/TOKENS.md`: colors, type scale, spaces, radii, motion, marker, icons, cards, contacts, images. **Authoritative for style.**
- `docs/redesign/ACCORDION.md`: structure, behavior and the numbered build steps (00–04, steps 1–14).
- `assets/css/tokens.css`: the token values. Other CSS files: `base`, `layout`, `components`, `pages`.

## Working rules (from the user)
1. **Mock style only.** Do not invent surfaces, buttons, colors or sizes. If something is not in the mock or in TOKENS.md, **stop and warn the user** before using it.
2. **Discuss before implementing** any new style decision. Show options visually (an Artifact page with the real tokens) and wait for approval.
3. **Never `git add` or `git commit`.** Only propose a commit message at the end (conventional commits, English).
4. Fill empty data with a visible placeholder (`placeholderValue` i18n), never invent real data (no made-up numbers).
5. If a new token or rule is approved, write it in `TOKENS.md` in the same change.

## Token cheat sheet
- **Colors (8):** `--blue` titles/links/numbers · `--ink` body text · `--muted` labels · `--orange` fills only (never text on white) · `--orange-dark` small orange text on white · `--mist` filled cards · `--line` borders · `--white`.
- **Sizes (6):** `--fs-display`, `--fs-h2`, `--fs-h3`, `--fs-lead`, `--fs-body`, `--fs-small`. Weights 400/600/800. Bricolage 800 for titles, Schibsted for text.
- **Spaces:** `--space-1..6` = 8, 16, 24, 32, 48, 64. **Radii:** `--r-s` 12, `--r-m` 16. **Line:** `--bw` 2px.
- **Motion:** `--t-fast`, `--t-slow`. Zero under `prefers-reduced-motion`.
- **Breakpoints:** 1100px (accordion), 720px (columns), 560px height (normal flow).
- No raw colors, font sizes, spaces or durations in CSS.

## Component rules
- **Marker `.mark`:** orange band behind the lower-middle of one word, **only in the page title (h1)**, never in h2, card titles or links. Field "Parola evidenziata" in the CMS.
- **Cards:** *filled* (`--mist`) informs; *outlined* (2px `--line`, white) opens or links. Never both. No shadows. Equal sizes with line clamps (category 1, title 2, text 3). Hover: `--mist` background, arrow circle turns orange and moves 2px.
- **Images in cards:** fixed inset, radius `--r-s`. Management photo 200×250, container query puts it above the text under 400px. Case history C2: 16:9 cover, inset 8px.
- **Icons:** one SVG family in `layouts/_partials/icon.html` (stroke 1.8, `currentColor`, `aria-hidden`), 22px in a 44px circle. Not in area or case cards.
- **Emails:** `white-space: nowrap`, rows ≥340px.
- **Focus:** ink on light, orange on dark (`data-dark`).
- Contrast: never orange text on white, never white text on orange. Small text on orange = ink.

## Hugo conventions
- Hugo extended ≥0.146 layout (`layouts/_partials/`). Strings in `i18n/it.toml` and `en.toml` (add both). Page data in `content/{it,en}/_index.md` and `data/contacts.toml`; CMS fields in `.pages.yml`.
- Accordion works without JS (`:target` + `:has()`); JS only enhances (step 8).
- Follow the `hugo-best-practices` skill; end template changes with a short Hugo Review.

## Verify every change
```
hugo --gc --minify --printPathWarnings --printI18nWarnings --panicOnWarning
hugo server -p 1399 &
google-chrome --headless=new --no-sandbox --hide-scrollbars --window-size=W,H \
  --virtual-time-budget=4000 --screenshot=<scratchpad>/x.png http://localhost:1399/
pkill -x hugo   # never `pkill -f`: it kills the shell
```
Check at 1440×900, ~1100 wide and 400 wide. Look for wrapped emails, cropped text, unequal cards.
