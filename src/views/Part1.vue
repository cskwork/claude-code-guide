<script setup>
import { ref } from 'vue'

const activeTab = ref('multiinstance')
const copiedCode = ref(null)

const copyCode = (code, id) => {
  navigator.clipboard.writeText(code)
  copiedCode.value = id
  setTimeout(() => copiedCode.value = null, 2000)
}

const sections = [
  {
    id: 'multiinstance',
    title: 'Multi-instance 병렬 개발',
    icon: '🔄',
    description: '여러 터미널에서 독립적인 Claude 인스턴스를 실행하여 동시에 여러 작업을 수행합니다.'
  },
  {
    id: 'tdd',
    title: 'TDD 워크플로우',
    icon: '✅',
    description: '테스트를 먼저 작성하고, Claude가 테스트를 통과하는 코드를 생성하도록 합니다.'
  },
  {
    id: 'conventions',
    title: 'Conventions (claude.md)',
    icon: '📋',
    description: 'claude.md 파일로 코딩 컨벤션과 프로젝트 규칙을 정의합니다.'
  },
  {
    id: 'planning',
    title: 'Planning Mode',
    icon: '🎯',
    description: '실행 전에 계획을 세우고 검토하는 Planning Mode를 활용합니다.'
  }
]

const multiInstanceExample = `# 터미널 1: API 개발
cd backend
claude

"User 리소스에 대한 CRUD API를 만들어줘.
RESTful 설계 원칙을 따르고,
Joi로 입력 검증을 추가해."

# 터미널 2: 테스트 작성
cd backend
claude

"User API에 대한 통합 테스트를 작성해줘.
성공 케이스, 실패 케이스, 엣지 케이스 모두 포함."

# 터미널 3: 데이터베이스 마이그레이션
cd backend
claude

"User 테이블 스키마를 생성하는 마이그레이션 파일을 만들어줘.
createdAt, updatedAt 타임스탬프 포함."`

const tddExample = `# 1단계: 테스트 먼저 작성
claude

"다음 요구사항에 맞는 테스트를 작성해줘:
- 이메일로 사용자 검색 기능
- 이메일이 없으면 null 반환
- 이메일이 있으면 사용자 객체 반환
- 잘못된 이메일 형식이면 ValidationError"

# 2단계: 테스트 실행 (실패 확인)
npm test

# 3단계: Claude에게 구현 요청
claude

"위 테스트를 통과하도록 findUserByEmail 함수를 구현해줘."

# 4단계: 테스트 재실행 (통과 확인)
npm test`

const claudeMdExample = `# Claude.md 파일 예시

## 프로젝트 구조
- \`src/routes/\`: API 라우트
- \`src/services/\`: 비즈니스 로직
- \`src/models/\`: 데이터베이스 모델
- \`src/utils/\`: 유틸리티 함수

## 코딩 컨벤션
### 에러 핸들링
- 모든 API 엔드포인트는 try-catch로 감싸기
- 에러는 \`handleError\` 미들웨어로 처리
- 사용자 정의 에러 클래스 사용 (ValidationError, NotFoundError)

### 데이터베이스 접근
- Service 레이어에서만 DB 직접 접근
- Repository 패턴 사용
- 트랜잭션이 필요한 경우 명시적으로 처리

### 테스트
- 모든 API는 통합 테스트 필수
- 테스트 커버리지 80% 이상 유지
- Jest 사용, describe/it 블록으로 구조화

## API 설계 원칙
- RESTful URI 사용
- HTTP 상태 코드 정확히 사용
- 요청/응답은 JSON 형식
- 페이지네이션: query parameter 사용 (page, limit)`

const planningExample = `# Planning Mode 활용 예시

claude --plan

"대규모 리팩토링을 계획하고 있어.
현재 Sequelize를 사용 중인데 Prisma로 마이그레이션하고 싶어.

1. 현재 코드베이스 분석
2. 의존성 파악
3. 단계별 마이그레이션 로드맵 작성
4. 리스크 평가"

# Claude가 계획을 작성하고 사용자 승인 대기
# 승인 후 실행 모드로 전환하여 단계별 실행`
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-12">
      <div class="flex items-center mb-4">
        <router-link to="/" class="text-primary hover:text-accent mr-3">
          ← 홈으로
        </router-link>
        <span class="text-gray-400">/</span>
        <span class="ml-3 text-gray-600">Part 1</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Part 1: 기본 워크플로우
      </h1>
      <p class="text-xl text-gray-600">
        Claude Code의 핵심 기능을 마스터하여 개발 생산성을 극대화하세요
      </p>
    </div>

    <!-- Tab Navigation -->
    <div class="bg-white rounded-lg shadow-md p-2 mb-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="activeTab = section.id"
          class="px-4 py-3 rounded-md font-medium transition-all text-left"
          :class="activeTab === section.id
            ? 'bg-primary text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-100'"
        >
          <div class="text-2xl mb-1">{{ section.icon }}</div>
          <div class="text-sm">{{ section.title }}</div>
        </button>
      </div>
    </div>

    <!-- Content Sections -->
    <div class="space-y-8">
      <!-- Multi-instance Section -->
      <div v-show="activeTab === 'multiinstance'" class="bg-white rounded-xl shadow-lg p-8">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">🔄</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">Multi-instance 병렬 개발</h2>
            <p class="text-gray-600 mt-2">동시에 여러 작업을 병렬로 처리하여 개발 속도를 획기적으로 향상시킵니다</p>
          </div>
        </div>

        <div class="prose max-w-none mb-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-3">핵심 개념</h3>
          <p class="text-gray-700 leading-relaxed">
            여러 터미널 세션에서 독립적인 Claude 인스턴스를 실행하면, 각각 별도의 컨텍스트를 유지하면서
            서로 다른 작업을 동시에 수행할 수 있습니다. 이를 통해:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mt-3">
            <li>터미널 1: API 엔드포인트 개발</li>
            <li>터미널 2: 해당 API의 테스트 코드 작성</li>
            <li>터미널 3: 데이터베이스 마이그레이션 작업</li>
          </ul>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 relative">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">Multi-instance 예제</span>
            <button
              @click="copyCode(multiInstanceExample, 'multi')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded transition-colors"
            >
              {{ copiedCode === 'multi' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ multiInstanceExample }}</code></pre>
        </div>

        <div class="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-blue-700">
                <strong>Pro Tip:</strong> 각 터미널은 독립적인 컨텍스트를 가지므로,
                한 터미널에서의 변경사항이 다른 터미널의 Claude에게 자동으로 전달되지 않습니다.
                필요시 명시적으로 파일 변경사항을 언급하세요.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- TDD Section -->
      <div v-show="activeTab === 'tdd'" class="bg-white rounded-xl shadow-lg p-8">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">✅</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">TDD 워크플로우</h2>
            <p class="text-gray-600 mt-2">테스트 주도 개발로 버그를 미리 방지하고 코드 품질을 높입니다</p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div class="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
              <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
              테스트 먼저 작성
            </h3>
            <p class="text-sm text-gray-700">
              Claude에게 요구사항을 설명하고 테스트 코드를 먼저 생성하도록 요청합니다.
              성공 케이스, 실패 케이스, 엣지 케이스를 모두 포함하세요.
            </p>
          </div>

          <div class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
              <span class="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
              실패 확인
            </h3>
            <p class="text-sm text-gray-700">
              테스트를 실행하여 실패하는 것을 확인합니다.
              이는 테스트가 제대로 작동하는지 검증하는 중요한 단계입니다.
            </p>
          </div>

          <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
              <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
              구현 요청
            </h3>
            <p class="text-sm text-gray-700">
              Claude에게 테스트를 통과하는 최소한의 코드를 작성하도록 요청합니다.
              over-engineering을 피하고 필요한 기능만 구현합니다.
            </p>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
            <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
              <span class="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
              리팩토링
            </h3>
            <p class="text-sm text-gray-700">
              테스트가 통과하면 코드를 개선합니다.
              중복 제거, 가독성 향상, 성능 최적화 등을 진행하세요.
            </p>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 relative">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">TDD 워크플로우 예제</span>
            <button
              @click="copyCode(tddExample, 'tdd')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded transition-colors"
            >
              {{ copiedCode === 'tdd' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ tddExample }}</code></pre>
        </div>

        <div class="mt-6 bg-green-50 border-l-4 border-green-500 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-green-700">
                <strong>Best Practice:</strong> TDD는 API 개발, 비즈니스 로직 구현,
                유틸리티 함수 작성 등 거의 모든 상황에서 활용할 수 있습니다.
                Claude와 함께라면 테스트 작성도 빠르고 쉬워집니다!
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Conventions Section -->
      <div v-show="activeTab === 'conventions'" class="bg-white rounded-xl shadow-lg p-8">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">📋</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">Conventions (claude.md)</h2>
            <p class="text-gray-600 mt-2">프로젝트 규칙을 명확히 정의하여 일관된 코드 품질을 유지합니다</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-3">claude.md 파일이란?</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            프로젝트 루트에 <code class="bg-gray-100 px-2 py-1 rounded text-sm">claude.md</code> 파일을 생성하면,
            Claude는 자동으로 이 파일을 읽고 프로젝트의 코딩 컨벤션, 아키텍처 패턴,
            베스트 프랙티스를 학습합니다.
          </p>

          <div class="grid md:grid-cols-3 gap-4 mb-6">
            <div class="bg-blue-50 rounded-lg p-4">
              <div class="text-2xl mb-2">🏗️</div>
              <h4 class="font-semibold text-gray-900 mb-1">프로젝트 구조</h4>
              <p class="text-sm text-gray-600">디렉토리 구조와 각 폴더의 역할 정의</p>
            </div>
            <div class="bg-purple-50 rounded-lg p-4">
              <div class="text-2xl mb-2">📝</div>
              <h4 class="font-semibold text-gray-900 mb-1">코딩 규칙</h4>
              <p class="text-sm text-gray-600">에러 핸들링, 네이밍, 포맷팅 규칙</p>
            </div>
            <div class="bg-green-50 rounded-lg p-4">
              <div class="text-2xl mb-2">🎯</div>
              <h4 class="font-semibold text-gray-900 mb-1">API 설계 원칙</h4>
              <p class="text-sm text-gray-600">RESTful 규칙, 응답 형식 등</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 relative">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">claude.md 파일 예제</span>
            <button
              @click="copyCode(claudeMdExample, 'claude-md')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded transition-colors"
            >
              {{ copiedCode === 'claude-md' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ claudeMdExample }}</code></pre>
        </div>

        <div class="mt-6 bg-purple-50 border-l-4 border-purple-500 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-purple-700">
                <strong>팀 협업 Tip:</strong> claude.md를 git에 커밋하면 팀 전체가 동일한 기준으로
                Claude를 활용할 수 있습니다. 새로운 팀원도 빠르게 프로젝트 규칙을 익힐 수 있어요!
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Planning Mode Section -->
      <div v-show="activeTab === 'planning'" class="bg-white rounded-xl shadow-lg p-8">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">🎯</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">Planning Mode</h2>
            <p class="text-gray-600 mt-2">큰 작업을 시작하기 전에 체계적인 계획을 수립합니다</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Planning Mode가 필요한 이유</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            복잡한 리팩토링, 아키텍처 변경, 대규모 기능 추가 등의 작업은 바로 실행하기보다는
            먼저 계획을 세우고 검토하는 것이 중요합니다. Planning Mode를 사용하면:
          </p>

          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div class="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
              <svg class="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">의존성 파악</h4>
                <p class="text-sm text-gray-600">코드베이스 전체를 분석하여 영향받는 부분을 식별합니다</p>
              </div>
            </div>

            <div class="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
              <svg class="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">리스크 평가</h4>
                <p class="text-sm text-gray-600">잠재적 문제점과 해결 방안을 미리 고민합니다</p>
              </div>
            </div>

            <div class="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
              <svg class="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">단계별 로드맵</h4>
                <p class="text-sm text-gray-600">작업을 관리 가능한 단위로 나누어 순서를 정합니다</p>
              </div>
            </div>

            <div class="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
              <svg class="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">사용자 승인</h4>
                <p class="text-sm text-gray-600">계획을 검토하고 승인한 후 실행으로 전환합니다</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 relative">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">Planning Mode 사용 예제</span>
            <button
              @click="copyCode(planningExample, 'planning')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded transition-colors"
            >
              {{ copiedCode === 'planning' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ planningExample }}</code></pre>
        </div>

        <div class="mt-6 bg-orange-50 border-l-4 border-orange-500 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-orange-700">
                <strong>주의:</strong> Planning Mode는 큰 작업에만 사용하세요.
                간단한 버그 수정이나 작은 기능 추가에는 바로 실행하는 것이 더 효율적입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="mt-12 flex justify-between items-center pt-8 border-t border-gray-200">
      <router-link
        to="/"
        class="flex items-center text-gray-600 hover:text-primary transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        홈으로
      </router-link>
      <router-link
        to="/part2"
        class="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
      >
        Part 2: 고급 통합
        <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </router-link>
    </div>
  </div>
</template>
