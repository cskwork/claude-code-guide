# 0001. Curriculum as a single data source; topics addressed by URL hash

- Status: accepted (commit `ad93dbf` added `src/data/curriculum.js`; commit `97d55ed` moved the views onto it with linkable topics)
- Code: `src/data/curriculum.js`, `src/components/PartLayout.vue`, `src/router/index.js`, `src/App.vue`, `src/views/Home.vue`

## Context

In the first version (`436ae63`), each of the four part pages hard-coded its own topic list, and the nav and home page repeated it.
The redesign added features that all need the same outline: a topic switcher, done marks, "continue where you left off", a prev/next pager, and shareable topic links.

## Decision

- Put the outline (parts, topic ids, titles, summaries) in one module, `src/data/curriculum.js`, together with small pure helpers (`resolveTopic`, `neighbours`, `topicKey`, `getPart`).
- Address a topic as a URL hash on its part route (`/part2#commit`), not as a nested route. `PartLayout` owns the active topic and writes it with `router.replace({ hash })`.
- Make `scrollBehavior` return `false` for same-path navigation so a hash change switches the panel without scrolling to an element.

## Consequences

- Nav, home roadmap, pager, topic keys and progress validation stay consistent. A topic added to the outline appears everywhere.
- Topic content still lives in `Part1-4.vue`, matched by id string (`v-show="active === 'tdd'"`). The test `has a content panel in each part view for every curriculum topic` (`tests/navigation.test.js`) catches an id that drifts between the two.
- `router.replace` keeps topic switches out of browser history, so Back leaves the part instead of stepping through topics.
- Route `meta.title` in `src/router/index.js` still repeats the part titles. Renaming a part takes two edits.

## Alternatives considered

- **Nested routes per topic (`/part2/commit`)**: four times as many routes, and switching topics would remount the view and reset its scroll unless special-cased.
- **Markdown content files with front matter**: would make the content data-driven too, but would need a markdown pipeline and lose the Vue components (`CodeBlock`, `Tip`) inside the content. Not done.
