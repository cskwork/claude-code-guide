<script setup>
import { ref } from 'vue'

const activeFeature = ref('thinking')
const copiedCode = ref(null)

const copyCode = (code, id) => {
  navigator.clipboard.writeText(code)
  copiedCode.value = id
  setTimeout(() => copiedCode.value = null, 2000)
}

const thinkingModes = [
  { mode: 'think', tokens: '~1,000', description: '간단한 문제 해결', color: 'bg-green-100 text-green-800' },
  { mode: 'think hard', tokens: '~5,000', description: '중간 복잡도 작업', color: 'bg-blue-100 text-blue-800' },
  { mode: 'think harder', tokens: '~15,000', description: '복잡한 아키텍처 설계', color: 'bg-purple-100 text-purple-800' },
  { mode: 'ultrathink', tokens: '31,999', description: '최고난이도 문제', color: 'bg-orange-100 text-orange-800' }
]

const thinkingExample = `# 복잡한 마이크로서비스 설계
claude --think harder

"사용자 인증, 결제, 주문 처리를 담당하는 마이크로서비스 아키텍처를 설계해줘.
- API Gateway 패턴
- Event-driven communication
- SAGA 패턴으로 분산 트랜잭션
- Circuit breaker와 retry 전략
- 확장성과 장애 격리 고려"

# Claude가 깊이 생각한 후 상세한 설계 제공`

const subagentExample = `# 대규모 리팩토링을 10개의 subagent로 병렬 처리
claude

"10개의 subagent를 생성해서 다음 작업을 병렬로 수행해줘:

Agent 1: src/auth 모듈 분석 및 리팩토링 계획
Agent 2: src/api 라우트 분석
Agent 3: src/services 비즈니스 로직 검토
Agent 4: src/models 데이터 모델 분석
Agent 5: src/utils 유틸리티 함수 정리
Agent 6: tests/ 테스트 커버리지 분석
Agent 7: docs/ 문서화 업데이트
Agent 8: 의존성 관계 다이어그램 작성
Agent 9: 성능 병목 지점 파악
Agent 10: 보안 취약점 스캔"

# 각 agent가 독립적으로 작업 수행`

const logAnalysisExample = `# 실시간 로그 분석
tail -f /var/log/app.log | claude

"이 로그에서:
1. 에러 패턴 찾기
2. 성능 병목 지점 파악
3. 비정상적인 접근 패턴 탐지
4. 요약 리포트 생성"

# 마이크로서비스 로그 병합 분석
kubectl logs -f deployment/api-gateway | \\
kubectl logs -f deployment/auth-service | \\
kubectl logs -f deployment/payment-service | \\
claude

"세 서비스의 로그를 상관 분석해서
분산 트레이싱 문제를 찾아줘"`

const headlessExample = `# CI/CD 파이프라인에 통합
# .github/workflows/code-review.yml

name: AI Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Claude Code Review
        run: |
          claude -p "이 PR의 변경사항을 리뷰하고,
          코드 품질, 보안, 성능 관점에서 피드백을 제공해줘.
          결과를 review.md에 작성." > review.md
      - name: Post Review
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs')
            const review = fs.readFileSync('review.md', 'utf8')
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              body: review
            })

# 린트 에러 자동 수정
claude -p "린트 에러를 모두 수정해줘" && git commit -am "fix: auto-fix lint errors"`
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-12">
      <div class="flex items-center mb-4">
        <router-link to="/" class="text-primary hover:text-accent mr-3">← 홈으로</router-link>
        <span class="text-gray-400">/</span>
        <span class="ml-3 text-gray-600">Part 3</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Part 3: 확장 기능
      </h1>
      <p class="text-xl text-gray-600">
        Claude Code의 고급 기능으로 복잡한 문제를 해결하고 워크플로우를 최적화합니다
      </p>
    </div>

    <!-- Feature Cards -->
    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <button
        @click="activeFeature = 'thinking'"
        class="text-left p-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        :class="activeFeature === 'thinking' ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : 'bg-white hover:shadow-xl'"
      >
        <div class="text-4xl mb-3">🧠</div>
        <h3 class="text-xl font-bold mb-2">Extended Thinking</h3>
        <p :class="activeFeature === 'thinking' ? 'text-blue-100' : 'text-gray-600'">
          복잡한 문제에 더 많은 사고 시간을 할당
        </p>
      </button>

      <button
        @click="activeFeature = 'subagent'"
        class="text-left p-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        :class="activeFeature === 'subagent' ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white' : 'bg-white hover:shadow-xl'"
      >
        <div class="text-4xl mb-3">🤖</div>
        <h3 class="text-xl font-bold mb-2">Subagent 병렬 처리</h3>
        <p :class="activeFeature === 'subagent' ? 'text-purple-100' : 'text-gray-600'">
          최대 10개의 독립적인 Claude 인스턴스 생성
        </p>
      </button>

      <button
        @click="activeFeature = 'log'"
        class="text-left p-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        :class="activeFeature === 'log' ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' : 'bg-white hover:shadow-xl'"
      >
        <div class="text-4xl mb-3">📊</div>
        <h3 class="text-xl font-bold mb-2">로그 분석</h3>
        <p :class="activeFeature === 'log' ? 'text-green-100' : 'text-gray-600'">
          파이프로 로그를 실시간 분석
        </p>
      </button>

      <button
        @click="activeFeature = 'headless'"
        class="text-left p-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        :class="activeFeature === 'headless' ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white' : 'bg-white hover:shadow-xl'"
      >
        <div class="text-4xl mb-3">⚙️</div>
        <h3 class="text-xl font-bold mb-2">Headless Mode</h3>
        <p :class="activeFeature === 'headless' ? 'text-orange-100' : 'text-gray-600'">
          CI/CD 파이프라인에 통합
        </p>
      </button>
    </div>

    <!-- Content -->
    <div class="bg-white rounded-xl shadow-lg p-8">
      <!-- Extended Thinking -->
      <div v-show="activeFeature === 'thinking'">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">🧠</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">Extended Thinking Modes</h2>
            <p class="text-gray-600 mt-2">복잡한 문제에 더 많은 "생각" 토큰을 할당하여 더 깊은 분석을 수행합니다</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">사고 모드 비교</h3>
          <div class="grid gap-4">
            <div
              v-for="mode in thinkingModes"
              :key="mode.mode"
              class="flex items-center justify-between p-4 rounded-lg border-2"
              :class="mode.color"
            >
              <div class="flex items-center space-x-4">
                <div class="text-3xl">💭</div>
                <div>
                  <h4 class="font-bold text-lg">{{ mode.mode }}</h4>
                  <p class="text-sm">{{ mode.description }}</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm opacity-75">최대 토큰</div>
                <div class="font-bold text-lg">{{ mode.tokens }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 class="text-lg font-semibold mb-3">Extended Thinking이 필요한 경우</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>복잡한 마이크로서비스 아키텍처 설계</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>성능 최적화 알고리즘 분석 및 개선</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>보안 취약점 심층 분석</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>레거시 코드베이스 리팩토링 전략 수립</span>
            </li>
          </ul>
        </div>

        <div class="bg-gray-900 rounded-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">Extended Thinking 예제</span>
            <button
              @click="copyCode(thinkingExample, 'thinking')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded"
            >
              {{ copiedCode === 'thinking' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ thinkingExample }}</code></pre>
        </div>
      </div>

      <!-- Subagent -->
      <div v-show="activeFeature === 'subagent'">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">🤖</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">Subagent 병렬 처리</h2>
            <p class="text-gray-600 mt-2">최대 10개의 독립적인 Claude 인스턴스로 작업을 병렬 수행합니다</p>
          </div>
        </div>

        <div class="mb-6">
          <div class="bg-purple-50 p-6 rounded-lg mb-6">
            <h3 class="text-lg font-semibold mb-3">Subagent vs Multi-instance 차이</h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Multi-instance (Part 1)</h4>
                <ul class="text-sm space-y-1 text-gray-600">
                  <li>• 사용자가 여러 터미널을 수동으로 관리</li>
                  <li>• 각 터미널에서 별도 작업 요청</li>
                  <li>• 동시성은 있지만 조율은 수동</li>
                </ul>
              </div>
              <div class="bg-white p-4 rounded-lg">
                <h4 class="font-semibold mb-2">Subagent (Part 3)</h4>
                <ul class="text-sm space-y-1 text-gray-600">
                  <li>• 하나의 명령으로 여러 agent 생성</li>
                  <li>• 자동으로 작업 분배 및 조율</li>
                  <li>• 결과를 통합하여 보고</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 class="text-xl font-semibold mb-4">활용 사례</h3>
          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">📦 대규모 모노레포 분석</h4>
              <p class="text-sm text-gray-600">
                각 subagent가 서로 다른 패키지/모듈을 분석하고 의존성을 파악
              </p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🔍 전체 코드베이스 검색</h4>
              <p class="text-sm text-gray-600">
                여러 디렉토리를 동시에 탐색하여 패턴 찾기
              </p>
            </div>
            <div class="bg-orange-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🎯 병렬 리팩토링</h4>
              <p class="text-sm text-gray-600">
                독립적인 모듈들을 동시에 리팩토링
              </p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">📊 다각도 분석</h4>
              <p class="text-sm text-gray-600">
                성능, 보안, 코드 품질 등을 동시에 분석
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">Subagent 병렬 처리 예제</span>
            <button
              @click="copyCode(subagentExample, 'subagent')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded"
            >
              {{ copiedCode === 'subagent' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ subagentExample }}</code></pre>
        </div>
      </div>

      <!-- Log Analysis -->
      <div v-show="activeFeature === 'log'">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">📊</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">실시간 로그 분석</h2>
            <p class="text-gray-600 mt-2">파이프를 통해 로그를 실시간으로 분석하고 인사이트를 도출합니다</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">로그 분석으로 할 수 있는 일</h3>
          <div class="space-y-4 mb-6">
            <div class="flex items-start space-x-3 bg-red-50 p-4 rounded-lg">
              <div class="text-3xl">🚨</div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">에러 패턴 탐지</h4>
                <p class="text-sm text-gray-600">
                  반복적으로 발생하는 에러를 찾아내고 근본 원인을 파악합니다.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-3 bg-orange-50 p-4 rounded-lg">
              <div class="text-3xl">⚡</div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">성능 병목 지점 식별</h4>
                <p class="text-sm text-gray-600">
                  느린 쿼리, API 호출 타임아웃 등 성능 문제를 찾아냅니다.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-3 bg-yellow-50 p-4 rounded-lg">
              <div class="text-3xl">🔐</div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">보안 위협 탐지</h4>
                <p class="text-sm text-gray-600">
                  비정상적인 접근 패턴, 무차별 대입 공격 등을 탐지합니다.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-3 bg-blue-50 p-4 rounded-lg">
              <div class="text-3xl">🔗</div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">분산 트레이싱</h4>
                <p class="text-sm text-gray-600">
                  여러 마이크로서비스의 로그를 상관 분석하여 요청 흐름을 추적합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">로그 분석 예제</span>
            <button
              @click="copyCode(logAnalysisExample, 'log')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded"
            >
              {{ copiedCode === 'log' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ logAnalysisExample }}</code></pre>
        </div>

        <div class="bg-green-50 border-l-4 border-green-500 p-4">
          <p class="text-sm text-green-700">
            <strong>DevOps Tip:</strong> 장애 발생 시 수천 줄의 로그를 수동으로 분석하는 대신,
            Claude에게 파이프로 전달하면 몇 초 만에 핵심 원인을 찾아냅니다.
          </p>
        </div>
      </div>

      <!-- Headless Mode -->
      <div v-show="activeFeature === 'headless'">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">⚙️</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">Headless Mode 자동화</h2>
            <p class="text-gray-600 mt-2">CI/CD 파이프라인에 Claude를 통합하여 자동화된 워크플로우를 구축합니다</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">Headless Mode 활용 사례</h3>
          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🔍 자동 코드 리뷰</h4>
              <p class="text-sm text-gray-600">
                PR마다 자동으로 코드 품질, 보안, 성능을 검토하고 피드백 제공
              </p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🛠️ 린트 자동 수정</h4>
              <p class="text-sm text-gray-600">
                린트 에러를 자동으로 수정하고 커밋
              </p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">📊 테스트 커버리지 분석</h4>
              <p class="text-sm text-gray-600">
                테스트가 부족한 부분을 찾아 개선 방안 제안
              </p>
            </div>
            <div class="bg-orange-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">📝 릴리스 노트 생성</h4>
              <p class="text-sm text-gray-600">
                커밋 히스토리를 분석하여 자동으로 릴리스 노트 작성
              </p>
            </div>
          </div>

          <div class="bg-orange-50 p-6 rounded-lg mb-6">
            <h3 class="text-lg font-semibold mb-3">-p 플래그의 힘</h3>
            <p class="text-gray-700 mb-2">
              <code class="bg-white px-2 py-1 rounded">claude -p "프롬프트"</code> 형식으로 사용하면
              대화형 인터페이스 없이 명령만 실행하고 결과를 반환합니다.
            </p>
            <p class="text-sm text-gray-600">
              이를 통해 스크립트, GitHub Actions, GitLab CI, Jenkins 등 모든 CI/CD 도구에 통합 가능합니다.
            </p>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">Headless Mode & CI/CD 통합 예제</span>
            <button
              @click="copyCode(headlessExample, 'headless')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded"
            >
              {{ copiedCode === 'headless' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ headlessExample }}</code></pre>
        </div>

        <div class="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p class="text-sm text-blue-700">
            <strong>자동화 팁:</strong> Headless mode를 활용하면 개발자가 잠든 사이에도
            Claude가 코드 리뷰, 린트 수정, 테스트 생성 등을 자동으로 수행할 수 있습니다.
          </p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="mt-12 flex justify-between items-center pt-8 border-t border-gray-200">
      <router-link
        to="/part2"
        class="flex items-center text-gray-600 hover:text-primary transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Part 2: 고급 통합
      </router-link>
      <router-link
        to="/part4"
        class="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
      >
        Part 4: 팀 워크플로우
        <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </router-link>
    </div>
  </div>
</template>
