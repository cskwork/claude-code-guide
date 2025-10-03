<script setup>
import { ref } from 'vue'

const activeSection = ref('mcp')
const copiedCode = ref(null)

const copyCode = (code, id) => {
  navigator.clipboard.writeText(code)
  copiedCode.value = id
  setTimeout(() => copiedCode.value = null, 2000)
}

const mcpExample = `# PostgreSQL MCP 연결
claude mcp add postgres \\
  -e DATABASE_URL=postgresql://user:pass@localhost:5432/mydb

# 이제 Claude에게 직접 데이터베이스 쿼리 요청 가능
claude
"users 테이블에서 최근 7일간 가입한 사용자 수를 알려줘"

# GitHub MCP 연결
claude mcp add github -e GITHUB_TOKEN=ghp_xxxxx

"이 프로젝트의 최근 PR 목록과 리뷰 상태를 보여줘"`

const screenshotExample = `# API 문서 스크린샷 활용
claude
"첨부한 Swagger 문서 스크린샷을 보고,
이 엔드포인트에 맞는 클라이언트 함수를 작성해줘"

# URL로 문서 참조
claude
"https://docs.stripe.com/api/charges/create 이 문서를 참고해서
Stripe 결제 통합 코드를 작성해줘"`

const checklistExample = `# 체크리스트 기반 마이그레이션
claude
"다음 체크리스트에 따라 Sequelize를 Prisma로 마이그레이션해줘:

- [ ] Prisma 설치 및 초기화
- [ ] 기존 Sequelize 모델 → Prisma schema 변환
- [ ] User 모델 마이그레이션
- [ ] Post 모델 마이그레이션
- [ ] Comment 모델 마이그레이션
- [ ] 관계 설정 (1:N, N:M)
- [ ] 마이그레이션 파일 생성
- [ ] 기존 데이터 migration 스크립트
- [ ] Service 레이어 코드 업데이트
- [ ] 테스트 코드 업데이트
- [ ] 통합 테스트 실행"

# Claude가 각 항목을 순차적으로 완료하며 체크`

const commitExample = `# Conventional Commits 형식으로 자동 커밋
claude
"변경사항을 커밋해줘. Conventional Commits 형식으로."

# Claude가 생성하는 커밋 메시지 예시:
feat(auth): implement JWT refresh token rotation

- Add refresh token generation and storage
- Implement token rotation on refresh
- Add Redis caching for revoked tokens
- Update auth middleware to handle refresh logic

BREAKING CHANGE: Old refresh tokens will be invalidated

# 자동 PR 생성
claude
"이 브랜치로 PR을 만들어줘"

# Claude가 생성하는 PR 설명:
## Summary
- Implemented JWT refresh token rotation for enhanced security
- Added Redis integration for token blacklisting

## Technical Details
...

## Testing
- [ ] Unit tests for token rotation
- [ ] Integration tests for auth flow
- [ ] Manual testing with Postman`
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-12">
      <div class="flex items-center mb-4">
        <router-link to="/" class="text-primary hover:text-accent mr-3">← 홈으로</router-link>
        <span class="text-gray-400">/</span>
        <span class="ml-3 text-gray-600">Part 2</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Part 2: 고급 통합
      </h1>
      <p class="text-xl text-gray-600">
        외부 시스템과 연동하고 워크플로우를 자동화하여 더 강력한 개발 환경을 구축합니다
      </p>
    </div>

    <!-- Section Cards -->
    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <button
        @click="activeSection = 'mcp'"
        class="text-left p-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        :class="activeSection === 'mcp' ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : 'bg-white hover:shadow-xl'"
      >
        <div class="text-4xl mb-3">🔗</div>
        <h3 class="text-xl font-bold mb-2">MCP 통합</h3>
        <p :class="activeSection === 'mcp' ? 'text-blue-100' : 'text-gray-600'">
          데이터베이스, GitHub, Slack 등 외부 시스템과 직접 연결
        </p>
      </button>

      <button
        @click="activeSection = 'screenshot'"
        class="text-left p-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        :class="activeSection === 'screenshot' ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white' : 'bg-white hover:shadow-xl'"
      >
        <div class="text-4xl mb-3">📸</div>
        <h3 class="text-xl font-bold mb-2">Screenshot/URL 컨텍스트</h3>
        <p :class="activeSection === 'screenshot' ? 'text-purple-100' : 'text-gray-600'">
          이미지와 URL로 복잡한 정보를 빠르게 공유
        </p>
      </button>

      <button
        @click="activeSection = 'checklist'"
        class="text-left p-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        :class="activeSection === 'checklist' ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white' : 'bg-white hover:shadow-xl'"
      >
        <div class="text-4xl mb-3">✅</div>
        <h3 class="text-xl font-bold mb-2">체크리스트 기반 마이그레이션</h3>
        <p :class="activeSection === 'checklist' ? 'text-orange-100' : 'text-gray-600'">
          대규모 리팩토링을 체계적으로 관리
        </p>
      </button>

      <button
        @click="activeSection = 'commit'"
        class="text-left p-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        :class="activeSection === 'commit' ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' : 'bg-white hover:shadow-xl'"
      >
        <div class="text-4xl mb-3">💾</div>
        <h3 class="text-xl font-bold mb-2">자동 커밋 & PR</h3>
        <p :class="activeSection === 'commit' ? 'text-green-100' : 'text-gray-600'">
          커밋 메시지와 PR 설명을 자동으로 생성
        </p>
      </button>
    </div>

    <!-- Content -->
    <div class="bg-white rounded-xl shadow-lg p-8">
      <!-- MCP Section -->
      <div v-show="activeSection === 'mcp'">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">🔗</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">Model Context Protocol (MCP)</h2>
            <p class="text-gray-600 mt-2">Claude를 데이터베이스, API, 외부 툴과 직접 연결합니다</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">MCP로 할 수 있는 일</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">🗄️ 데이터베이스 직접 쿼리</h4>
              <p class="text-sm text-gray-600">
                PostgreSQL, MySQL 등에 직접 연결하여 스키마 분석, 데이터 조회, 쿼리 최적화
              </p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">🐙 GitHub 통합</h4>
              <p class="text-sm text-gray-600">
                이슈, PR, 코드 리뷰 등 GitHub 작업을 Claude와 함께 수행
              </p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">💬 Slack/JIRA 연동</h4>
              <p class="text-sm text-gray-600">
                메시지 전송, 티켓 관리 등 협업 도구와 연동
              </p>
            </div>
            <div class="bg-orange-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">📊 실시간 데이터 분석</h4>
              <p class="text-sm text-gray-600">
                운영 중인 시스템의 로그, 메트릭, 상태를 실시간으로 분석
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">MCP 사용 예제</span>
            <button
              @click="copyCode(mcpExample, 'mcp')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded"
            >
              {{ copiedCode === 'mcp' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ mcpExample }}</code></pre>
        </div>

        <div class="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p class="text-sm text-blue-700">
            <strong>Pro Tip:</strong> MCP를 사용하면 수동으로 데이터를 복사-붙여넣기할 필요가 없어집니다.
            Claude가 직접 시스템에 접근하여 필요한 정보를 가져오고 작업을 수행합니다.
          </p>
        </div>
      </div>

      <!-- Screenshot/URL Section -->
      <div v-show="activeSection === 'screenshot'">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">📸</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">Screenshot & URL 컨텍스트</h2>
            <p class="text-gray-600 mt-2">복잡한 정보를 시각적으로 공유하여 소통을 간소화합니다</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">활용 사례</h3>
          <div class="space-y-4">
            <div class="flex items-start space-x-4 bg-purple-50 p-4 rounded-lg">
              <div class="text-3xl">📄</div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">API 문서 스크린샷</h4>
                <p class="text-sm text-gray-600">
                  Swagger, Postman Collection 등 API 문서를 스크린샷으로 찍어 Claude에게 전달하면
                  해당 API를 사용하는 코드를 자동으로 생성합니다.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4 bg-blue-50 p-4 rounded-lg">
              <div class="text-3xl">🎨</div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">디자인 목업</h4>
                <p class="text-sm text-gray-600">
                  Figma, Sketch 디자인을 스크린샷으로 공유하여 UI 컴포넌트를 빠르게 구현할 수 있습니다.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4 bg-green-50 p-4 rounded-lg">
              <div class="text-3xl">🐛</div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">에러 메시지</h4>
                <p class="text-sm text-gray-600">
                  복잡한 스택 트레이스나 에러 화면을 스크린샷으로 공유하면 Claude가 문제를 빠르게 진단합니다.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4 bg-orange-50 p-4 rounded-lg">
              <div class="text-3xl">🔗</div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">공식 문서 URL</h4>
                <p class="text-sm text-gray-600">
                  라이브러리의 공식 문서 URL을 붙여넣으면 Claude가 최신 API를 참고하여 코드를 작성합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">Screenshot/URL 활용 예제</span>
            <button
              @click="copyCode(screenshotExample, 'screenshot')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded"
            >
              {{ copiedCode === 'screenshot' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ screenshotExample }}</code></pre>
        </div>

        <div class="bg-purple-50 border-l-4 border-purple-500 p-4">
          <p class="text-sm text-purple-700">
            <strong>Best Practice:</strong> 긴 텍스트 설명보다 스크린샷 하나가 훨씬 효과적입니다.
            특히 시각적 정보 (UI, 다이어그램, 에러 화면)는 스크린샷으로 공유하세요.
          </p>
        </div>
      </div>

      <!-- Checklist Section -->
      <div v-show="activeSection === 'checklist'">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">✅</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">체크리스트 기반 마이그레이션</h2>
            <p class="text-gray-600 mt-2">대규모 작업을 작은 단위로 나누어 체계적으로 진행합니다</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">체크리스트 접근법의 장점</h3>
          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">📊 진행상황 추적</h4>
              <p class="text-sm text-gray-600">
                완료된 항목과 남은 작업을 한눈에 파악할 수 있습니다
              </p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">🎯 집중력 유지</h4>
              <p class="text-sm text-gray-600">
                한 번에 하나의 작업에만 집중하여 실수를 줄입니다
              </p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">🔄 재개 용이</h4>
              <p class="text-sm text-gray-600">
                중간에 멈췄다가 다시 시작하기 쉽습니다
              </p>
            </div>
            <div class="bg-orange-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">👥 팀 협업</h4>
              <p class="text-sm text-gray-600">
                여러 명이 체크리스트를 나눠서 작업할 수 있습니다
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">체크리스트 마이그레이션 예제</span>
            <button
              @click="copyCode(checklistExample, 'checklist')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded"
            >
              {{ copiedCode === 'checklist' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ checklistExample }}</code></pre>
        </div>

        <div class="bg-orange-50 border-l-4 border-orange-500 p-4">
          <p class="text-sm text-orange-700">
            <strong>팁:</strong> Claude는 체크리스트의 각 항목을 순차적으로 완료하면서 체크 표시를 업데이트합니다.
            진행 상황을 실시간으로 확인할 수 있어 안심하고 작업을 맡길 수 있습니다.
          </p>
        </div>
      </div>

      <!-- Commit/PR Section -->
      <div v-show="activeSection === 'commit'">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">💾</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">자동 커밋 & PR 생성</h2>
            <p class="text-gray-600 mt-2">일관된 형식의 커밋 메시지와 상세한 PR 설명을 자동으로 작성합니다</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">Conventional Commits</h3>
          <p class="text-gray-700 mb-4">
            Claude는 Conventional Commits 형식을 자동으로 따릅니다:
          </p>

          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <code class="text-sm">type(scope): subject</code>
            <ul class="mt-3 space-y-2 text-sm">
              <li><code class="bg-white px-2 py-1 rounded">feat</code>: 새로운 기능</li>
              <li><code class="bg-white px-2 py-1 rounded">fix</code>: 버그 수정</li>
              <li><code class="bg-white px-2 py-1 rounded">refactor</code>: 리팩토링</li>
              <li><code class="bg-white px-2 py-1 rounded">test</code>: 테스트 추가</li>
              <li><code class="bg-white px-2 py-1 rounded">docs</code>: 문서 업데이트</li>
              <li><code class="bg-white px-2 py-1 rounded">chore</code>: 빌드, 설정 변경</li>
            </ul>
          </div>

          <h3 class="text-xl font-semibold mb-4 mt-6">자동 PR 설명 생성</h3>
          <p class="text-gray-700 mb-4">
            Claude가 생성하는 PR 설명에는 다음이 포함됩니다:
          </p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">📝 Summary</h4>
              <p class="text-sm text-gray-600">변경사항의 핵심 요약</p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🔧 Technical Details</h4>
              <p class="text-sm text-gray-600">기술적 구현 세부사항</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">✅ Testing</h4>
              <p class="text-sm text-gray-600">테스트 계획 및 체크리스트</p>
            </div>
            <div class="bg-orange-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">⚠️ Breaking Changes</h4>
              <p class="text-sm text-gray-600">호환성 관련 주의사항</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">자동 커밋 & PR 예제</span>
            <button
              @click="copyCode(commitExample, 'commit')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded"
            >
              {{ copiedCode === 'commit' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ commitExample }}</code></pre>
        </div>

        <div class="bg-green-50 border-l-4 border-green-500 p-4">
          <p class="text-sm text-green-700">
            <strong>팀 협업:</strong> 일관된 커밋 메시지와 상세한 PR 설명은 팀원들의 코드 리뷰를 훨씬 수월하게 만듭니다.
            Claude가 자동으로 문서화를 해주므로 개발자는 코드 작성에만 집중할 수 있습니다.
          </p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="mt-12 flex justify-between items-center pt-8 border-t border-gray-200">
      <router-link
        to="/part1"
        class="flex items-center text-gray-600 hover:text-primary transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Part 1: 기본 워크플로우
      </router-link>
      <router-link
        to="/part3"
        class="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
      >
        Part 3: 확장 기능
        <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </router-link>
    </div>
  </div>
</template>
