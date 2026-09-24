<script setup>
defineProps({
  label: { type: String, required: true },
  // 'tip' for advice, 'warn' for cautions
  tone: { type: String, default: 'tip' }
})
</script>

<template>
  <aside class="mt-8 flex flex-col gap-3 rounded-xl bg-case px-5 py-4 sm:flex-row sm:items-start sm:gap-4">
    <span
      class="key legend min-h-[30px] shrink-0 self-start px-2.5 !text-[11px] [--travel:2px]"
      :class="tone === 'warn' ? 'key-enter' : 'key-mod'"
    >{{ label }}</span>
    <p class="text-[15px] leading-relaxed text-ink-soft"><slot /></p>
  </aside>
</template>
