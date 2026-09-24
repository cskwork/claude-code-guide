<script setup>
import { computed } from 'vue'
import { parts, getPart, SOURCE_URL } from '../data/curriculum.js'
import { useProgress } from '../composables/useProgress.js'

const progress = useProgress()

const stats = [
  { label: '생산성 증가', value: '5배' },
  { label: 'API 개발 시간', value: '2일 → 4시간' },
  { label: '학습 섹션', value: '4개' },
  { label: '실전 예제', value: '20+' }
]

const benefits = [
  {
    title: '빠른 개발',
    body: 'API 개발 시간을 2일에서 4시간으로 단축. 반복적인 작업은 AI에게 맡기고 핵심 로직에 집중하세요.',
    icon: 'M11 2 4 12h6l-1 8 7-10h-6l1-8Z'
  },
  {
    title: '높은 품질',
    body: 'TDD 워크플로우와 자동화된 테스트로 버그를 미리 방지. 코드 리뷰와 린트도 자동화하세요.',
    icon: 'M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-4a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z'
  },
  {
    title: '팀 협업',
    body: '표준화된 워크플로우와 커스텀 명령어로 팀 전체의 생산성을 향상시키세요.',
    icon: 'M7 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.5 17c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5M13 11.5c3 0 5.5 2 5.5 5'
  }
]

const resume = computed(() => {
  const last = progress.state.last
  if (!last) return null
  const part = getPart(last.part)
  const topic = part && part.topics.find((t) => t.id === last.topic)
  if (!part || !topic) return null
  return { to: `${part.path}#${topic.id}`, label: `Part ${part.n} · ${topic.title}` }
})

const hasProgress = computed(() => progress.doneTotal() > 0 || Boolean(progress.state.last))

function isLast(partId, topicId) {
  const last = progress.state.last
  return Boolean(last && last.part === partId && last.topic === topicId)
}

function confirmReset() {
  if (window.confirm('학습 기록(완료 표시와 마지막 위치)을 모두 지울까요?')) progress.reset()
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-16">
      <div>
        <h1 class="text-[40px] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[72px]">
          Claude Code로
          <span class="whitespace-nowrap"><mark class="rounded-lg bg-enter px-2 text-mod">생산성 5배</mark></span>
          올리기
        </h1>
        <p class="mt-6 max-w-measure text-lg leading-relaxed text-ink-soft sm:text-xl">
          백엔드 개발자를 위한 완벽한 가이드. 터미널 기반 AI 코딩 도구로 API 개발부터 테스트, 배포까지 모든 과정을 혁신하세요.
        </p>
        <div class="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <router-link
            :to="resume ? resume.to : '/part1'"
            class="key key-enter min-h-[60px] px-7 text-lg font-bold"
          >
            {{ resume ? '이어서 학습하기' : '학습 시작하기' }}
            <svg aria-hidden="true" viewBox="0 0 20 20" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4v6a2 2 0 0 1-2 2H4m3-3-3 3 3 3" /></svg>
          </router-link>
          <a
            :href="SOURCE_URL"
            target="_blank"
            rel="noopener"
            class="key min-h-[52px] px-5 text-[15px]"
          >
            원본 블로그 보기
            <svg aria-hidden="true" viewBox="0 0 16 16" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 3h7v7M13 3 4 12" /></svg>
          </a>
        </div>
        <p v-if="resume" class="mt-4 text-sm text-ink-mute">마지막 위치: {{ resume.label }}</p>

        <dl class="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-case-line sm:grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="bg-case px-4 py-4">
            <dt class="text-[13px] text-ink-mute">{{ stat.label }}</dt>
            <dd class="mt-1 text-xl font-bold tracking-[-0.02em] text-ink tabular-nums">{{ stat.value }}</dd>
          </div>
        </dl>
      </div>

      <figure class="relative mx-auto w-full max-w-[420px]">
        <img
          src="/images/hero-keyboard-600.webp"
          srcset="/images/hero-keyboard-600.webp 600w, /images/hero-keyboard-960.webp 960w"
          sizes="(min-width: 1024px) 420px, 88vw"
          width="960"
          height="1200"
          alt="햇빛이 드는 회색 책상 위의 기계식 키보드. 흰색 키캡 사이에 남색 조합 키와 노란색 엔터 키 하나가 놓여 있습니다"
          class="aspect-[4/5] w-full rounded-[28px] object-cover shadow-[0_30px_60px_-30px_rgba(21,27,43,0.55)]"
          fetchpriority="high"
          decoding="async"
        />
      </figure>
    </section>

    <!-- Roadmap keyboard -->
    <section aria-labelledby="roadmap-title" class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="roadmap-title" class="text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">단계별 학습 로드맵</h2>
          <p class="mt-3 max-w-measure text-ink-soft">네 개의 파트가 네 줄의 키입니다. 파트 키로 시작하거나 원하는 주제 키를 바로 누르세요.</p>
        </div>
        <p class="text-sm text-ink-mute tabular-nums">전체 완료 <strong class="font-semibold text-ink">{{ progress.doneTotal() }} / {{ progress.total }}</strong></p>
      </div>

      <div class="plate space-y-4 p-3 sm:p-5">
        <div
          v-for="part in parts"
          :key="part.id"
          class="grid grid-cols-2 gap-3 lg:grid-cols-[minmax(0,1.7fr)_repeat(4,minmax(0,1fr))]"
        >
          <router-link
            :to="part.path"
            class="key key-mod group col-span-2 !flex-col !items-start !justify-between gap-3 px-5 pb-5 pt-4 text-left lg:col-span-1 lg:min-h-[168px]"
          >
            <span class="flex w-full items-center justify-between">
              <span class="legend text-enter">STEP {{ part.n }}</span>
              <span class="text-xs font-normal text-mod-legend tabular-nums">{{ progress.doneInPart(part.id) }}/{{ part.topics.length }} 완료</span>
            </span>
            <span>
              <span class="block text-xl font-bold leading-snug tracking-[-0.02em]">Part {{ part.n }}: {{ part.title }}</span>
              <span class="mt-1.5 block text-sm font-normal leading-relaxed text-mod-legend">{{ part.summary }}</span>
            </span>
            <span class="flex items-center gap-1.5 text-sm text-enter">
              학습하기
              <svg aria-hidden="true" viewBox="0 0 16 16" class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
            </span>
          </router-link>

          <router-link
            v-for="(topic, i) in part.topics"
            :key="topic.id"
            :to="`${part.path}#${topic.id}`"
            class="key !flex-col !items-start !justify-between min-h-[96px] px-4 pb-4 pt-3 text-left lg:min-h-[168px]"
          >
            <span class="flex w-full items-center justify-between">
              <span class="legend text-ink-mute">{{ part.n }}.{{ i + 1 }}</span>
              <svg v-if="progress.isDone(part.id, topic.id)" viewBox="0 0 16 16" class="h-4 w-4 text-mod" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="완료"><path d="m3 8.5 3 3 7-7" /></svg>
            </span>
            <span class="text-[15px] font-bold leading-snug tracking-[-0.01em]">{{ topic.title }}</span>
            <span
              v-if="isLast(part.id, topic.id)"
              class="homing"
              role="img"
              aria-label="마지막으로 본 주제"
            />
          </router-link>
        </div>
      </div>
      <p class="mt-4 text-sm text-ink-mute">
        노란 돌기는 마지막으로 본 주제, 체크는 완료로 표시한 주제입니다. 기록은 이 브라우저에만 저장됩니다.
        <button v-if="hasProgress" type="button" class="ml-1 rounded underline decoration-case-line underline-offset-4 hover:text-ink hover:decoration-ink" @click="confirmReset">기록 초기화</button>
      </p>
    </section>

    <!-- Why -->
    <section aria-labelledby="why-title" class="mt-24 bg-mod text-alpha">
      <div class="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 id="why-title" class="max-w-2xl text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">Claude Code를 배워야 하는 이유</h2>
        <div class="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          <div v-for="b in benefits" :key="b.title" class="border-t border-white/15 pt-6">
            <svg aria-hidden="true" viewBox="0 0 20 20" class="h-6 w-6 text-enter" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path :d="b.icon" /></svg>
            <h3 class="mt-4 text-xl font-bold">{{ b.title }}</h3>
            <p class="mt-3 leading-relaxed text-mod-legend">{{ b.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Getting started -->
    <section aria-labelledby="start-title" class="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div class="sheet grid gap-8 px-6 py-10 sm:px-12 sm:py-14 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 id="start-title" class="text-3xl font-extrabold tracking-[-0.03em] text-ink">지금 바로 시작하세요</h2>
          <p class="mt-4 max-w-measure leading-relaxed text-ink-soft">
            Part 1부터 차근차근 학습하면서 Claude Code의 강력한 기능들을 마스터하세요.
            각 섹션에는 실전 예제와 인터랙티브 가이드가 포함되어 있습니다.
          </p>
        </div>
        <router-link to="/part1" class="key key-enter min-h-[60px] px-7 text-lg font-bold">
          Part 1 시작하기
          <svg aria-hidden="true" viewBox="0 0 20 20" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4v6a2 2 0 0 1-2 2H4m3-3-3 3 3 3" /></svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* The homing bump: the raised bar on F and J, here marking where you stopped. */
.homing {
  position: absolute;
  left: 50%;
  bottom: 9px;
  width: 22px;
  height: 4px;
  margin-left: -11px;
  border-radius: 999px;
  background: var(--enter);
  box-shadow: 0 1px 0 var(--enter-side);
}
</style>
