<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPart, neighbours, resolveTopic } from '../data/curriculum.js'
import { useProgress } from '../composables/useProgress.js'

const props = defineProps({
  partId: { type: String, required: true }
})

const part = getPart(props.partId)
const { prev, next } = neighbours(props.partId)
const route = useRoute()
const router = useRouter()
const progress = useProgress()

const active = ref(resolveTopic(part, route.hash))
const tabRefs = ref({})
const panelTop = ref(null)

const activeIndex = computed(() => part.topics.findIndex((t) => t.id === active.value))
const activeTopic = computed(() => part.topics[activeIndex.value])
const nextTopic = computed(() => part.topics[activeIndex.value + 1] || null)
const doneCount = computed(() => progress.doneInPart(part.id))
const activeDone = computed(() => progress.isDone(part.id, active.value))

watch(() => route.hash, (hash) => { active.value = resolveTopic(part, hash) })
watch(active, (id) => progress.visit(part.id, id), { immediate: true })

function select(id, { focus = false, scroll = false } = {}) {
  if (id !== active.value) {
    active.value = id
    router.replace({ hash: '#' + id })
  }
  nextTick(() => {
    if (focus) tabRefs.value[id]?.focus()
    if (scroll && panelTop.value) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      panelTop.value.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    }
  })
}

function onTabKeydown(event) {
  const ids = part.topics.map((t) => t.id)
  const i = ids.indexOf(active.value)
  const map = {
    ArrowRight: (i + 1) % ids.length,
    ArrowDown: (i + 1) % ids.length,
    ArrowLeft: (i - 1 + ids.length) % ids.length,
    ArrowUp: (i - 1 + ids.length) % ids.length,
    Home: 0,
    End: ids.length - 1
  }
  if (event.key in map) {
    event.preventDefault()
    select(ids[map[event.key]], { focus: true })
  }
}

// Number keys 1-4 press the matching topic key, like a real keyboard row.
function onGlobalKeydown(event) {
  if (event.metaKey || event.ctrlKey || event.altKey || event.isComposing) return
  const t = event.target
  if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return
  const n = Number(event.key)
  if (Number.isInteger(n) && n >= 1 && n <= part.topics.length) {
    select(part.topics[n - 1].id, { focus: true })
  }
}

function goNextTopic() {
  if (nextTopic.value) select(nextTopic.value.id, { scroll: true })
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onGlobalKeydown))
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8 lg:pt-14">
    <!-- Header -->
    <header class="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <nav aria-label="현재 위치" class="mb-5 flex items-center gap-2 text-sm text-ink-mute">
          <router-link to="/" class="rounded underline decoration-case-line hover:text-ink hover:decoration-ink">홈</router-link>
          <svg aria-hidden="true" viewBox="0 0 16 16" class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m6 3 5 5-5 5" /></svg>
          <span aria-current="page" class="text-ink-soft">Part {{ part.n }}</span>
        </nav>
        <h1 class="text-[34px] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[56px]">
          Part {{ part.n }}: {{ part.title }}
        </h1>
        <p class="mt-4 max-w-measure text-lg leading-relaxed text-ink-soft">{{ part.lede }}</p>
      </div>
      <p class="flex items-center gap-3 text-sm text-ink-mute lg:justify-end">
        <span class="flex gap-1" aria-hidden="true">
          <span
            v-for="t in part.topics"
            :key="t.id"
            class="h-2.5 w-5 rounded-[3px]"
            :class="progress.isDone(part.id, t.id) ? 'bg-mod' : 'bg-case-line'"
          />
        </span>
        <span>이 파트 완료 <strong class="font-semibold text-ink tabular-nums">{{ doneCount }} / {{ part.topics.length }}</strong></span>
      </p>
    </header>

    <!-- Topic keys -->
    <div class="plate p-3 sm:p-4">
      <div
        role="tablist"
        :aria-label="`Part ${part.n} 주제`"
        class="grid grid-cols-2 gap-3 lg:grid-cols-4"
        @keydown="onTabKeydown"
      >
        <button
          v-for="(topic, i) in part.topics"
          :id="`tab-${topic.id}`"
          :key="topic.id"
          :ref="(el) => (tabRefs[topic.id] = el)"
          type="button"
          role="tab"
          :aria-selected="active === topic.id"
          :aria-controls="`panel-${part.id}`"
          :tabindex="active === topic.id ? 0 : -1"
          class="key !flex-col !items-start !justify-start min-h-[92px] w-full px-4 pb-4 pt-3 text-left lg:min-h-[132px]"
          :class="active === topic.id ? 'key-mod is-pressed' : ''"
          @click="select(topic.id)"
        >
          <span class="flex w-full items-center justify-between">
            <span class="legend" :class="active === topic.id ? 'text-enter' : 'text-ink-mute'">{{ i + 1 }}</span>
            <span v-if="progress.isDone(part.id, topic.id)" class="flex items-center gap-1 text-[11px] font-medium" :class="active === topic.id ? 'text-mod-legend' : 'text-ink-mute'">
              <svg aria-hidden="true" viewBox="0 0 16 16" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 8.5 3 3 7-7" /></svg>
              완료
            </span>
          </span>
          <span class="mt-2 text-[15px] font-bold leading-snug tracking-[-0.01em]">{{ topic.title }}</span>
          <span
            class="mt-1.5 hidden text-[13px] font-normal leading-snug lg:block"
            :class="active === topic.id ? 'text-mod-legend' : 'text-ink-mute'"
          >{{ topic.summary }}</span>
        </button>
      </div>
      <p class="mt-3 hidden px-1 text-xs text-ink-mute md:block">
        키보드 <kbd class="legend rounded bg-alpha px-1.5 py-0.5 text-ink">1</kbd>–<kbd class="legend rounded bg-alpha px-1.5 py-0.5 text-ink">{{ part.topics.length }}</kbd> 또는 방향키로 주제를 바꿀 수 있습니다.
      </p>
    </div>

    <!-- Topic panel -->
    <div ref="panelTop" class="scroll-mt-24" />
    <section
      :id="`panel-${part.id}`"
      role="tabpanel"
      :aria-labelledby="`tab-${active}`"
      tabindex="-1"
      class="sheet mt-6 px-5 py-8 sm:px-10 sm:py-12 focus:outline-none"
    >
      <div :key="active" class="strike">
        <slot :active="active" />
      </div>

      <div class="mt-12 flex flex-col gap-4 border-t border-case-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          class="key min-h-[48px] px-5 text-[15px]"
          :aria-pressed="activeDone"
          @click="progress.toggleDone(part.id, active)"
        >
          <span
            aria-hidden="true"
            class="flex h-5 w-5 items-center justify-center rounded-[5px] border-2"
            :class="activeDone ? 'border-mod bg-mod text-enter' : 'border-ink-mute'"
          >
            <svg v-if="activeDone" viewBox="0 0 16 16" class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m3 8.5 3 3 7-7" /></svg>
          </span>
          {{ activeDone ? '학습 완료' : '학습 완료로 표시' }}
        </button>
        <button
          v-if="nextTopic"
          type="button"
          class="key key-mod min-h-[48px] px-5 text-[15px]"
          @click="goNextTopic"
        >
          다음 주제: {{ nextTopic.title }}
          <svg aria-hidden="true" viewBox="0 0 16 16" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
        </button>
      </div>
      <p v-if="!progress.persistent" class="mt-4 text-sm text-ink-mute">
        이 브라우저는 저장소 사용이 막혀 있어 학습 기록이 이번 방문에만 유지됩니다.
      </p>
    </section>

    <slot name="after" />

    <!-- Part pager -->
    <nav aria-label="파트 이동" class="mt-14 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
      <router-link
        :to="prev ? prev.path : '/'"
        class="key min-h-[52px] px-5 text-[15px]"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M13 8H3M7 4 3 8l4 4" /></svg>
        {{ prev ? `Part ${prev.n}: ${prev.title}` : '홈으로' }}
      </router-link>
      <router-link
        v-if="next"
        :to="next.path"
        class="key key-enter min-h-[56px] px-6 text-base font-bold"
      >
        Part {{ next.n }}: {{ next.title }}
        <svg aria-hidden="true" viewBox="0 0 20 20" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4v6a2 2 0 0 1-2 2H4m3-3-3 3 3 3" /></svg>
      </router-link>
      <router-link
        v-else
        to="/"
        class="key min-h-[52px] px-5 text-[15px]"
      >
        홈으로 돌아가기
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
.strike {
  animation: strike 260ms var(--ease-out) both;
}
@keyframes strike {
  from { opacity: 0.35; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
</style>
