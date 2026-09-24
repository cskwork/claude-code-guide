# Product

<!-- impeccable:product-schema 1 -->

> Inferred record. The owner approved the revamp without an interview round
> ("전체 다 진행 ... 권장대로 승인 진행하기", 2026-09-24). Every fact below is
> inferred from the repository and the live site and is labeled where it is an
> assumption. Confirm or correct at the next session.

## Platform

web

## Users

- Primary (inferred from copy): Korean-speaking backend developers who already
  work in a terminal and want to adopt Claude Code in daily API, test and
  deployment work. They read on a laptop at their desk, often with a terminal
  open beside the browser, and copy examples straight into it.
- Secondary (assumption): team leads evaluating how to standardize Claude Code
  use across a team (Part 4 content).

## Product Purpose

"Claude Code 마스터" is a free, four-part Korean study guide: "Claude Code 생산성
5배 올리는 법 - 백엔드 개발자를 위한 가이드". It turns a MemoryHub blog series
(https://memoryhub.tistory.com) into a structured, navigable course with
copyable command and prompt examples. Success: a reader finishes Part 1-4 and
has copied working examples into their own terminal and repository.

## Positioning

A Korean-language, backend-first curriculum organized as a learning path
(basic workflow -> advanced integration -> extended features -> team workflow)
rather than a feature reference. Every topic pairs a short concept with a
copyable terminal/prompt example and a practical tip.

## Operating Context

- Readers alternate between this page and a terminal running `claude`.
- Examples are copied with a copy button and pasted into a shell or editor.
- Readers return across sessions to continue where they left off (assumption).

## Capabilities and Constraints

- Static Vue 3 + Vite + Vue Router + Tailwind CSS SPA, deployed on Vercel.
  No backend, accounts, or analytics.
- Routes: `/` (overview + roadmap), `/part1` 기본 워크플로우, `/part2` 고급 통합,
  `/part3` 확장 기능, `/part4` 팀 워크플로우.
- Each part is organized into four topics, shown one at a time, each with
  concept text, example code, and a tip.
- Content language is Korean with English technical terms.

## Brand Commitments

- Name: "Claude Code 마스터".
- Source attribution to the MemoryHub blog series must stay visible.
- Must not imply it is an official Anthropic product (assumption, but required
  for honesty).

## Evidence on Hand

- Content: the four part pages in `src/views/`.
- Claims already present in the original copy: "생산성 5배", "API 개발 시간
  2일 → 4시간", "20+ 실전 예제". These come from the blog series and are kept as
  the author's claims; do not add new benchmarks, users, or testimonials.
- No screenshots, logos, testimonials, or user data exist. Do not fabricate them.

## Product Principles

1. Copyable over quotable: every idea should end in something the reader can
   run.
2. Path, not pile: the four parts are a sequence; always show where the reader
   is and what comes next.
3. Terminal-native: respect the reader's working context and keep examples
   exact.
4. Honest source: credit the blog series and never overstate official status.

## Accessibility & Inclusion

- Korean body text needs comfortable line-height and a Hangul-capable font.
- Keyboard-operable topic tabs and copy buttons; visible focus states.
- Respect `prefers-reduced-motion`.
