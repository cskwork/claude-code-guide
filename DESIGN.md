---
name: Claude Code 마스터
description: A four-part Claude Code study guide built as a mechanical keyboard you learn to play.
colors:
  case: "#E3E6EA"
  case-deep: "#D6DAE0"
  case-line: "#C3C9D2"
  alpha: "#F7F8F9"
  alpha-side: "#CDD3DB"
  ink: "#151B2B"
  ink-soft: "#3F4A5E"
  ink-mute: "#566074"
  mod: "#1C2640"
  mod-side: "#0C1222"
  mod-legend: "#C9D2E6"
  mod-soft: "#2A3656"
  enter: "#FFC21A"
  enter-side: "#C98F00"
typography:
  display:
    fontFamily: "Pretendard Variable, Pretendard, -apple-system, Apple SD Gothic Neo, sans-serif"
    fontSize: "72px (40px mobile)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Pretendard Variable, sans-serif"
    fontSize: "56px (34px mobile)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Pretendard Variable, sans-serif"
    fontSize: "34px (28px mobile)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Pretendard Variable, sans-serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "JetBrains Mono Variable, Pretendard Variable, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.08em"
  code:
    fontFamily: "JetBrains Mono Variable, Pretendard Variable, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.75
rounded:
  key: "10px"
  panel: "12px"
  sheet: "16px"
  hero: "28px"
spacing:
  key-x: "20px"
  sheet-x: "40px"
  sheet-x-mobile: "20px"
  section: "96px"
components:
  key:
    backgroundColor: "{colors.alpha}"
    textColor: "{colors.ink}"
    rounded: "{rounded.key}"
    padding: "0 20px"
    height: "52px"
  key-mod:
    backgroundColor: "{colors.mod}"
    textColor: "{colors.alpha}"
    rounded: "{rounded.key}"
    padding: "0 20px"
    height: "48px"
  key-enter:
    backgroundColor: "{colors.enter}"
    textColor: "{colors.mod}"
    rounded: "{rounded.key}"
    padding: "0 28px"
    height: "60px"
  sheet:
    backgroundColor: "{colors.alpha}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.sheet}"
    padding: "48px 40px"
  plate:
    backgroundColor: "{colors.case-deep}"
    rounded: "{rounded.sheet}"
    padding: "20px"
  code-block:
    backgroundColor: "{colors.mod}"
    textColor: "#EEF2FA"
    rounded: "{rounded.sheet}"
    padding: "20px"
---

# Design System: Claude Code 마스터

## Overview

**Creative North Star: "The Keycap Set"**

The guide is a custom mechanical keyboard on a light aluminium case. Each part is a row of keys, each topic a keycap the reader presses, each example the output they type. The reader is a backend developer at a desk in daylight with a terminal beside the browser, so the page is light, calm and dense enough to read long Korean paragraphs, with the navy of modifier keys carrying the code and the one yellow Enter key reserved for the next step.

Depth is physical and small: keys have a top and a skirt and travel down when pressed; sheets sit on the case; plates are recessed. Motion is the key press itself plus one short "strike" when a topic changes. Nothing glows, nothing is gradient-filled, and no emoji stands in for an icon.

**Key Characteristics:**
- Light aluminium case ground, near-white keycaps, navy modifiers, one signal-yellow Enter key.
- Every control is a keycap; active state is a pressed key, not a color swap alone.
- One Hangul-capable grotesk for everything; monospace only for code and keycap legends.
- Progress is a mark: a check legend for done topics and a yellow homing bump for where you stopped.

## Colors

A restrained colorway: cool neutrals plus navy for structure and one yellow for the primary action.

### Primary
- **Modifier Navy** (#1C2640): code panels, active and pressed keys, part keys on the roadmap, the "why" band and footer. Legends on navy use Legend Blue-Grey (#C9D2E6) or Enter Yellow.
- **Enter Yellow** (#FFC21A): the primary action on a screen (start, continue, next part), text selection, the headline highlight and the homing bump. Its skirt is #C98F00.

### Neutral
- **Aluminium Case** (#E3E6EA): page ground and header.
- **Recessed Plate** (#D6DAE0): switch plates that hold rows of keys.
- **Hairline** (#C3C9D2): 1px dividers and spec-grid gaps, scrollbar thumbs.
- **Keycap White** (#F7F8F9): alpha keys and reading sheets; skirt #CDD3DB.
- **Ink** (#151B2B): headings and key titles.
- **Ink Soft** (#3F4A5E): body copy.
- **Ink Mute** (#566074): captions, legends, secondary labels (holds 4.5:1 on the case ground).

### Named Rules
**The One Enter Key Rule.** Yellow is the Enter key. A screen has at most one or two yellow keys, and they always mean "go forward".
**The Navy Holds Code Rule.** Every copyable example lives on navy modifier plastic; code never sits on white.

## Typography

**Body and Display Font:** Pretendard Variable (self-hosted dynamic subset; system Korean fallbacks)
**Label/Mono Font:** JetBrains Mono Variable, with Pretendard for Hangul inside code

**Character:** One neutral grotesk carries display and prose so Hangul and Latin stay in the same voice; the mono appears only where a real keyboard would print a legend or a terminal would print output.

### Hierarchy
- **Display** (800, 72px desktop / 40px mobile, 1.08, -0.035em): home headline only.
- **Headline** (800, 56px / 34px, 1.1, -0.03em): part page titles and section headings on home (36px).
- **Title** (700, 34px / 28px, 1.2, -0.02em): topic headings inside the sheet.
- **Body** (400, 16.5px, 1.8): prose, held to a 42rem measure.
- **Label** (500 mono, 11px, 0.08em, uppercase): keycap legends such as topic numbers, STEP n, tip labels.

### Named Rules
**The Legend Rule.** Monospace is for code and keycap legends only, never for decorative "technical" flavor.

## Layout

Content sits in a 72rem (max-w-6xl) container with 16/24/32px gutters. Home hero is a two-column grid (text, 420px key-art); the roadmap is one plate holding four rows, each a wide navy part key plus four topic keys (`1.7fr + 4 x 1fr`), collapsing to a full-width part key over a 2x2 key grid on mobile. Part pages stack header, topic-key plate (4 across on desktop, 2x2 on mobile), one reading sheet, then the part pager. Sections breathe at 96px; more space above headings than below.

## Elevation & Depth

Depth is physical: a keycap's skirt and a soft cast shadow, recessed plates via inset shadow, and a single lifted sheet per page.

### Shadow Vocabulary
- **Key at rest** (`inset 0 -2px 0 rgba(21,27,43,.05), inset 0 1px 0 rgba(255,255,255,.9), 0 3px 0 #CDD3DB, 0 5px 10px rgba(21,27,43,.16)`): every alpha key.
- **Key pressed** (`translateY(2px)` and `0 1px 0 skirt, 0 2px 4px rgba(21,27,43,.14)`): active tab, current nav item, `aria-pressed` toggles, `:active`.
- **Sheet** (`0 12px 32px -12px rgba(21,27,43,.22), 0 2px 6px rgba(21,27,43,.06)`): the reading surface.
- **Plate** (`inset 0 2px 6px rgba(21,27,43,.14), inset 0 -1px 0 rgba(255,255,255,.6)`): rows of keys.

### Named Rules
**The Travel Rule.** Pressed means the key moved down and lost its skirt. Never show selection with color alone.

## Shapes

Keycap corners (10px) on every control, 12px on in-sheet panels and tips, 16px on sheets, plates and code blocks, 28px on the hero photograph. Borders are 1px hairlines only; no colored side stripes.

## Components

### Keys (buttons and links)
- **Alpha key:** Keycap White, Ink text, 10px radius, 48-52px tall; hover lightens to white; pressed travels down.
- **Modifier key:** Navy with white text; used for active topics, secondary forward actions ("다음 주제") and tip labels.
- **Enter key:** Yellow with navy text, 56-60px tall, trailing return-arrow icon; the primary action only.
- **Focus:** 2px navy outline, 3px offset (yellow inside code blocks).

### Topic keys (tabs)
A plate of four keys with `role="tablist"`. Each key carries a mono number legend (the keyboard shortcut 1-4), a bold title, a summary on desktop, and a check legend when done. Arrow keys, Home/End and number keys switch topics; the URL hash (`/part2#commit`) records the topic.

### Reading sheet
One Keycap White sheet per topic with the topic title, prose, spec grids, a navy code block, a tip, and a footer row with the done toggle and the next-topic key.

### Spec grid
Short items laid in a grid whose 1px gaps show the hairline color; no nested cards, no icons in tiles.

### Code block
Navy figure with a caption row (prompt glyph, label, copy key) and a `pre` whose comment lines are muted blue-grey. Copy falls back to a hidden textarea and, if both fail, selects the code and explains how to copy manually.

### Navigation
Sticky case-colored header with the navy logo key and four small part keys (current one pressed navy) plus a done counter; on mobile a "목차" key opens a sheet of full-width keys with per-part progress.

### Homing bump (signature)
A 22x4px yellow bar at the bottom of the roadmap key the reader last visited, like the F/J bumps.

## Do's and Don'ts

### Do:
- **Do** make every new control a keycap (alpha, modifier or Enter) with the Travel Rule for its pressed state.
- **Do** put every copyable example in the navy code block with a working copy key.
- **Do** keep body copy at 16.5px/1.8 inside a 42rem measure.
- **Do** mark progress with legends (check, homing bump), not rings or bars.

### Don't:
- **Don't** use gradients, glass, or glowing edges; the world is matte plastic and aluminium.
- **Don't** use emoji or Unicode glyphs as icons; draw 16-20px stroke SVGs.
- **Don't** use yellow for anything but the forward action, selection and the homing bump.
- **Don't** add eyebrow/kicker labels above headings; legends belong inside keys only.
