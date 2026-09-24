<script setup>
import { parts } from '../data/curriculum.js'
</script>

<template>
  <div class="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8 lg:py-24">
    <div>
      <h1 class="text-4xl font-extrabold leading-tight tracking-[-0.03em] text-ink sm:text-5xl">이 키는 비어 있습니다</h1>
      <p class="mt-4 max-w-measure text-lg leading-relaxed text-ink-soft">
        요청한 주소에 해당하는 페이지가 없습니다. 주소를 다시 확인하거나 아래에서 학습할 파트를 고르세요.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <router-link to="/" class="key key-enter min-h-[52px] px-6 text-base font-bold">홈으로 가기</router-link>
        <router-link
          v-for="p in parts"
          :key="p.id"
          :to="p.path"
          class="key min-h-[52px] px-4 text-[15px]"
        ><span class="legend text-ink-mute">{{ p.n }}</span>{{ p.title }}</router-link>
      </div>
    </div>
    <img
      src="/images/missing-key-720.webp"
      width="720"
      height="720"
      alt="회색 책상 위에 뒤집힌 남색 키캡 하나가 놓여 있고, 옆 키보드에는 그 키가 빠진 빈 스위치 자리가 보입니다"
      class="w-full rounded-2xl"
      loading="lazy"
      decoding="async"
    />
  </div>
</template>
