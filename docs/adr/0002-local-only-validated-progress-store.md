# 0002. Local-only progress store that validates and degrades

- Status: accepted (commit `ad93dbf`)
- Code: `src/composables/useProgress.js`, `tests/progress.test.js`

## Context

The guide should remember finished topics and the last topic visited, but it is a static site with no accounts or backend.
Stored data can go stale when topics are renamed, can be corrupted, or can be unavailable (private browsing, blocked storage, quota).

## Decision

- Store `{ done: ["part/topic", ...], last: { part, topic } }` as JSON under a versioned key, `ccg:progress:v1`.
- Parse defensively: on bad JSON or a non-object, start empty. Keep only `done` keys that exist in the current curriculum, without duplicates, and keep `last` only if it points to a real topic.
- Probe storage once with a write and a remove. If that fails, run in memory and expose `persistent: false`. Write failures later are swallowed.
- Inject storage into `createProgressStore(storage)` so tests use an in-memory fake. The app uses one module-level instance through `useProgress()`.

## Consequences

- Renaming or removing a topic can't break the UI. Stale keys silently drop out.
- Progress never leaves the browser: no privacy concerns, and no cross-device sync.
- The `v1` suffix allows a future shape change without misreading old data.
- The store is plain Vue reactivity with no Pinia or Vuex dependency. It is unit-tested in Node with no DOM (`tests/progress.test.js`, 6 tests).

## Alternatives considered

- **Pinia store with a persistence plugin**: one more dependency for two fields. The plugin would also not validate against the curriculum.
- **Cookie or server-side progress**: needs a backend and accounts, which the product avoids.
