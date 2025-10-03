<script setup>
import { ref } from 'vue'

const features = [
  {
    title: 'Part 1: 기본 워크플로우',
    description: 'Multi-instance 병렬 개발, TDD 워크플로우, Planning Mode 활용',
    icon: '🚀',
    path: '/part1',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Part 2: 고급 통합',
    description: 'MCP 통합, Screenshot/URL 컨텍스트 공유, 자동화된 커밋 생성',
    icon: '🔧',
    path: '/part2',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Part 3: 확장 기능',
    description: 'Extended Thinking, Subagent 병렬 처리, 로그 분석, Headless Mode',
    icon: '⚡',
    path: '/part3',
    color: 'from-orange-500 to-orange-600'
  },
  {
    title: 'Part 4: 팀 워크플로우',
    description: 'RAG 코드 검색, Slash Commands, Quality Hooks, 프로젝트 템플릿',
    icon: '👥',
    path: '/part4',
    color: 'from-green-500 to-green-600'
  }
]

const stats = [
  { label: '생산성 증가', value: '5배', icon: '📈' },
  { label: 'API 개발 시간', value: '2일 → 4시간', icon: '⏱️' },
  { label: '학습 섹션', value: '4개', icon: '📚' },
  { label: '실전 예제', value: '20+', icon: '💡' }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Claude Code로
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              생산성 5배
            </span>
            올리기
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            백엔드 개발자를 위한 완벽한 가이드. 터미널 기반 AI 코딩 도구로 API 개발부터 테스트, 배포까지 모든 과정을 혁신하세요.
          </p>
          <div class="flex justify-center gap-4">
            <router-link
              to="/part1"
              class="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              학습 시작하기
            </router-link>
            <a
              href="https://memoryhub.tistory.com"
              target="_blank"
              class="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all border border-gray-200"
            >
              원본 블로그 보기
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-4xl mb-2">{{ stat.icon }}</div>
            <div class="text-3xl font-bold text-gray-900">{{ stat.value }}</div>
            <div class="text-sm text-gray-600 mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
        단계별 학습 로드맵
      </h2>
      <div class="grid md:grid-cols-2 gap-8">
        <router-link
          v-for="(feature, index) in features"
          :key="feature.path"
          :to="feature.path"
          class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
        >
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity" :class="feature.color"></div>
          <div class="p-8">
            <div class="flex items-center mb-4">
              <span class="text-5xl mr-4">{{ feature.icon }}</span>
              <div>
                <div class="text-sm font-semibold text-gray-500 mb-1">
                  STEP {{ index + 1 }}
                </div>
                <h3 class="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {{ feature.title }}
                </h3>
              </div>
            </div>
            <p class="text-gray-600 leading-relaxed">
              {{ feature.description }}
            </p>
            <div class="mt-6 flex items-center text-primary font-semibold">
              학습하기
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Key Benefits -->
    <div class="bg-gradient-to-r from-secondary to-blue-900 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center mb-12">
          Claude Code를 배워야 하는 이유
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="text-5xl mb-4">⚡</div>
            <h3 class="text-xl font-bold mb-3">빠른 개발</h3>
            <p class="text-blue-100">
              API 개발 시간을 2일에서 4시간으로 단축. 반복적인 작업은 AI에게 맡기고 핵심 로직에 집중하세요.
            </p>
          </div>
          <div class="text-center">
            <div class="text-5xl mb-4">🎯</div>
            <h3 class="text-xl font-bold mb-3">높은 품질</h3>
            <p class="text-blue-100">
              TDD 워크플로우와 자동화된 테스트로 버그를 미리 방지. 코드 리뷰와 린트도 자동화하세요.
            </p>
          </div>
          <div class="text-center">
            <div class="text-5xl mb-4">🤝</div>
            <h3 class="text-xl font-bold mb-3">팀 협업</h3>
            <p class="text-blue-100">
              표준화된 워크플로우와 커스텀 명령어로 팀 전체의 생산성을 향상시키세요.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Getting Started -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="bg-gradient-to-r from-orange-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          지금 바로 시작하세요
        </h2>
        <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
          Part 1부터 차근차근 학습하면서 Claude Code의 강력한 기능들을 마스터하세요.
          각 섹션에는 실전 예제와 인터랙티브 가이드가 포함되어 있습니다.
        </p>
        <router-link
          to="/part1"
          class="inline-block px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          Part 1 시작하기 →
        </router-link>
      </div>
    </div>
  </div>
</template>
