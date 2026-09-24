<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { parts, SITE_NAME, SOURCE_URL } from './data/curriculum.js'
import { useProgress } from './composables/useProgress.js'

const route = useRoute()
const progress = useProgress()
const mobileMenuOpen = ref(false)

watch(() => route.path, () => (mobileMenuOpen.value = false))

function isCurrent(path) {
  return route.path === path
}
</script>

<template>
  <a href="#main" class="key key-enter fixed left-4 top-3 z-[60] -translate-y-24 px-4 py-2 text-sm focus:translate-y-0">본문으로 건너뛰기</a>

  <header class="sticky top-0 z-50 border-b border-case-line/70 bg-case/90 backdrop-blur-md supports-[backdrop-filter]:bg-case/80">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <router-link to="/" class="flex items-center gap-3 rounded-lg" :aria-label="`${SITE_NAME} 홈`">
        <span aria-hidden="true" class="key key-mod h-9 w-9 shrink-0 [--travel:2px]">
          <svg viewBox="0 0 20 20" class="h-4 w-4 text-enter" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 6 4 4-4 4M11 15h4" /></svg>
        </span>
        <span class="text-[17px] font-extrabold tracking-[-0.02em] text-ink">{{ SITE_NAME }}</span>
      </router-link>

      <nav aria-label="파트" class="hidden items-center gap-2 lg:flex">
        <router-link
          v-for="p in parts"
          :key="p.id"
          :to="p.path"
          class="key min-h-[38px] px-3 text-[13px] [--travel:2px]"
          :class="isCurrent(p.path) ? 'key-mod is-pressed' : ''"
          :aria-current="isCurrent(p.path) ? 'page' : undefined"
        >
          <span class="legend" :class="isCurrent(p.path) ? 'text-enter' : 'text-ink-mute'">{{ p.n }}</span>
          {{ p.title }}
        </router-link>
        <span class="ml-3 text-[13px] text-ink-mute tabular-nums" :title="`전체 ${progress.total}개 주제 중 완료한 주제 수`">
          완료 <strong class="font-semibold text-ink">{{ progress.doneTotal() }}</strong>/{{ progress.total }}
        </span>
      </nav>

      <button
        type="button"
        class="key min-h-[40px] px-3 text-sm lg:hidden [--travel:2px]"
        :aria-expanded="mobileMenuOpen"
        aria-controls="mobile-menu"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <path v-if="!mobileMenuOpen" d="M3 6h14M3 10h14M3 14h14" />
          <path v-else d="m5 5 10 10M15 5 5 15" />
        </svg>
        {{ mobileMenuOpen ? '닫기' : '목차' }}
      </button>
    </div>

    <div v-show="mobileMenuOpen" id="mobile-menu" class="border-t border-case-line/70 bg-case lg:hidden">
      <nav aria-label="파트 (모바일)" class="mx-auto grid max-w-6xl gap-3 px-4 py-4 sm:grid-cols-2 sm:px-6">
        <router-link
          to="/"
          class="key min-h-[52px] !justify-start px-4 text-[15px]"
          :class="isCurrent('/') ? 'key-mod is-pressed' : ''"
          :aria-current="isCurrent('/') ? 'page' : undefined"
        >홈</router-link>
        <router-link
          v-for="p in parts"
          :key="p.id"
          :to="p.path"
          class="key min-h-[52px] !justify-start px-4 text-[15px]"
          :class="isCurrent(p.path) ? 'key-mod is-pressed' : ''"
          :aria-current="isCurrent(p.path) ? 'page' : undefined"
        >
          <span class="legend" :class="isCurrent(p.path) ? 'text-enter' : 'text-ink-mute'">{{ p.n }}</span>
          Part {{ p.n }}: {{ p.title }}
          <span class="ml-auto text-xs font-normal tabular-nums" :class="isCurrent(p.path) ? 'text-mod-legend' : 'text-ink-mute'">{{ progress.doneInPart(p.id) }}/{{ p.topics.length }}</span>
        </router-link>
      </nav>
    </div>
  </header>

  <main id="main" tabindex="-1" class="focus:outline-none">
    <router-view />
  </main>

  <footer class="mt-10 bg-mod text-mod-legend">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
      <div>
        <p class="text-base font-bold text-alpha">{{ SITE_NAME }}</p>
        <p class="mt-2 max-w-measure text-sm leading-relaxed">
          Claude Code 생산성 5배 올리는 법 - 백엔드 개발자를 위한 가이드
        </p>
      </div>
      <p class="text-sm">
        Based on
        <a :href="SOURCE_URL" class="font-semibold text-enter underline decoration-enter/40 hover:decoration-enter" target="_blank" rel="noopener">MemoryHub</a>
        blog series
      </p>
    </div>
  </footer>
</template>
