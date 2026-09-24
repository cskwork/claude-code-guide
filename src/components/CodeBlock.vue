<script setup>
import { computed, ref, onBeforeUnmount } from 'vue'
import { copyText } from '../composables/copyText.js'

const props = defineProps({
  code: { type: String, required: true },
  label: { type: String, required: true }
})

// idle | copied | failed
const status = ref('idle')
const pre = ref(null)
let timer

const lines = computed(() =>
  props.code.split('\n').map((text) => ({ text, comment: /^\s*#(?!!)/.test(text) }))
)

function selectCode() {
  const el = pre.value
  if (!el || typeof window === 'undefined') return
  const range = document.createRange()
  range.selectNodeContents(el)
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

async function copy() {
  clearTimeout(timer)
  const ok = await copyText(props.code)
  status.value = ok ? 'copied' : 'failed'
  if (!ok) selectCode()
  timer = setTimeout(() => (status.value = 'idle'), ok ? 2000 : 6000)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <figure class="code-block my-8 overflow-hidden rounded-2xl bg-mod text-mod-legend">
    <figcaption class="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
      <span class="flex items-center gap-2.5 text-[13px] font-medium text-mod-legend">
        <svg aria-hidden="true" viewBox="0 0 16 16" class="h-4 w-4 text-enter" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4.5 6.5 8 3 11.5M8.5 12h4.5" /></svg>
        {{ label }}
      </span>
      <button
        type="button"
        class="key key-mod min-h-[36px] shrink-0 px-3 text-[13px] !bg-mod-soft"
        :class="{ '!bg-enter !text-mod': status === 'copied' }"
        :aria-label="`${label} 복사`"
        @click="copy"
      >
        <svg v-if="status !== 'copied'" aria-hidden="true" viewBox="0 0 16 16" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="5" width="8.5" height="8.5" rx="1.5" /><path d="M10.5 5V3.5A1.5 1.5 0 0 0 9 2H3.5A1.5 1.5 0 0 0 2 3.5V9a1.5 1.5 0 0 0 1.5 1.5H5" /></svg>
        <svg v-else aria-hidden="true" viewBox="0 0 16 16" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 8.5 3 3 7-7" /></svg>
        <span>{{ status === 'copied' ? '복사됨' : '복사' }}</span>
      </button>
    </figcaption>
    <pre
      ref="pre"
      class="overflow-x-auto px-4 py-5 text-[13px] leading-[1.75] sm:px-5"
      tabindex="0"
      :aria-label="label"
    ><code><span
      v-for="(line, i) in lines"
      :key="i"
      class="block min-h-[1.75em]"
      :class="line.comment ? 'text-[#8E9BBA]' : 'text-[#EEF2FA]'"
    >{{ line.text }}</span></code></pre>
    <p class="sr-only" aria-live="polite">{{ status === 'copied' ? '클립보드에 복사했습니다' : status === 'failed' ? '복사하지 못했습니다. 코드를 선택해 두었으니 직접 복사하세요.' : '' }}</p>
    <p v-if="status === 'failed'" class="border-t border-white/10 px-4 py-3 text-[13px] text-enter sm:px-5">
      브라우저가 클립보드 접근을 막았습니다. 코드를 선택해 두었으니 <kbd class="font-mono">Ctrl/⌘ + C</kbd>로 직접 복사하세요.
    </p>
  </figure>
</template>

<style scoped>
.code-block pre {
  tab-size: 2;
  scrollbar-color: #3a4768 transparent;
}
.code-block pre::selection,
.code-block pre *::selection {
  background: var(--enter);
  color: var(--mod);
}
.code-block pre:focus-visible {
  outline-offset: -3px;
  outline-color: var(--enter);
}
</style>
