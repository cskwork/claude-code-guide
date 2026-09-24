<script setup>
defineProps({
  title: { type: String, required: true },
  sub: { type: String, required: true }
})
</script>

<template>
  <header class="mb-8">
    <h2 class="text-[28px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[34px]">{{ title }}</h2>
    <p class="mt-3 max-w-measure text-[17px] leading-relaxed text-ink-soft">{{ sub }}</p>
  </header>
</template>
