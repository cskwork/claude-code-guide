# Architecture

Claude Code Guide is a static single-page app: Vue 3 + Vue Router 4, built by Vite 7, styled with Tailwind CSS 3, and served by Vercel.
There is no backend. The only runtime state is the reader's progress, which lives in `localStorage`.

## Components

| Module | Path | Responsibility |
|---|---|---|
| Entry | `index.html`, `src/main.js` | Meta/OG tags, hero image preload, fonts (Pretendard, JetBrains Mono), mounts the app with the router |
| Router | `src/router/index.js` | Routes `/`, `/part1`–`/part4`, catch-all 404. `scrollBehavior` returns `false` for same-path navigation (a hash change), otherwise restores or scrolls to top. `afterEach` sets `document.title` |
| Curriculum | `src/data/curriculum.js` | 4 parts × 4 topics (id, title, summary), `SITE_NAME`, `SOURCE_URL`, `topicKey`, `resolveTopic`, `neighbours`, `getPart`, `totalTopics` |
| Shell | `src/App.vue` | Skip link, header nav built from `parts`, mobile menu, footer with source link |
| Home | `src/views/Home.vue` | Roadmap from `parts`, per-part done counts, "continue where you left off" card from `progress.state.last`, reset with confirm |
| Part layout | `src/components/PartLayout.vue` | Topic "keys" (a tablist), active topic from `route.hash`, `router.replace({ hash })` on select, arrow/Home/End keys inside the tablist, number keys 1–4 globally (ignored in inputs, with modifiers or during IME composition), done toggle, next-topic button, prev/next part pager |
| Part views | `src/views/Part1.vue`–`Part4.vue` | Topic content. Each panel is `v-show="active === '<topic id>'"` inside `PartLayout`'s slot |
| Code block | `src/components/CodeBlock.vue` | Renders an example with `#` comment highlighting and a copy button with idle/copied/failed states |
| Copy helper | `src/composables/copyText.js` | `navigator.clipboard.writeText`, then a hidden textarea with `execCommand('copy')`. Returns `true`/`false` and never throws |
| Progress store | `src/composables/useProgress.js` | `createProgressStore(storage)` returns a reactive, read-only state plus `isDone`, `setDone`, `toggleDone`, `visit`, `doneInPart`, `doneTotal`, `reset`. `useProgress()` is a module-level singleton |
| Hosting | `vercel.json` | Rewrites `/(.*)` to `/index.html` for history-mode deep links. `Cache-Control: public, max-age=31536000, immutable` on `/assets/*` |

## Data flow

### Opening a shared link `/part2#commit`

1. Vercel rewrites the path to `index.html` (`vercel.json`), and Vue Router matches `/part2` → `Part2.vue`.
2. `PartLayout` resolves the hash: `resolveTopic(part, '#commit')` → `'commit'`. An unknown or empty hash falls back to the first topic.
3. A watcher on `active` (immediate) calls `progress.visit('part2', 'commit')`, which writes `{ done, last }` to `localStorage['ccg:progress:v1']`.
4. The Home page later reads `state.last` to show the "continue" card.

### Switching topics

`select(id)` calls `router.replace({ hash: '#' + id })`. Because the path is unchanged, `scrollBehavior` returns `false`, so the page does not jump to an element. The `route.hash` watcher updates `active`.

### Marking a topic done

`toggleDone(part, topic)` → `setDone` checks the key against the set of valid `part/topic` keys from the curriculum, updates the reactive array and persists it. Done counts on Home and in the part header are derived from that array.

## External dependencies (`package.json`)

| Package | Version | Use |
|---|---|---|
| `vue` | ^3.5.22 | UI framework |
| `vue-router` | ^4.5.1 | Routing, history mode |
| `pretendard`, `@fontsource-variable/jetbrains-mono` | ^1.3.9, ^5.3.0 | Self-hosted fonts |
| `vite`, `@vitejs/plugin-vue` | ^7.1.7, ^6.0.1 | Dev server and build |
| `tailwindcss`, `postcss`, `autoprefixer` | ^3.4.18 | Styling (`tailwind.config.js` defines the keycap palette) |
| `vitest` | ^3.2.7 | Unit tests (Node environment, no DOM library) |

There are no runtime network calls. The only external link is the source blog (`SOURCE_URL`).

## Failure handling

| Situation | Behavior | Where |
|---|---|---|
| `localStorage` blocked (private mode, disabled) | The probe write fails, so the store runs in memory with `persistent: false` | `safeStorage()` in `useProgress.js` |
| Quota or write error | `persist()` swallows it and keeps the in-memory state | `useProgress.js` |
| Corrupt or stale stored data | `parseProgress` returns an empty state, or drops unknown/duplicate topic keys and an invalid `last` | `useProgress.js` |
| Clipboard API missing or denied | Falls back to textarea + `execCommand`. If that fails too, the code is selected and a "press Ctrl/⌘+C" message appears for 6 s | `copyText.js`, `CodeBlock.vue` |
| Unknown topic hash | Shows the first topic | `resolveTopic` |
| Unknown path | `NotFound.vue` via the catch-all route | `src/router/index.js` |

## Build, test, deploy

- `npm run build` → `dist/` (one JS chunk, about 157 KB / 58 KB gzip, measured 2026-10-28)
- `npm test` → Vitest over `tests/*.test.js`
- CI: `.github/workflows/ci.yml` runs `npm ci`, `npm test` and `npm run build` on pull requests and on pushes to `main`
- Deploy: Vercel builds from git. The deploy configuration lives outside this repository, except for `vercel.json`
