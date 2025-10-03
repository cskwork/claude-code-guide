<script setup>
import { ref } from 'vue'

const activeWorkflow = ref('rag')
const copiedCode = ref(null)

const copyCode = (code, id) => {
  navigator.clipboard.writeText(code)
  copiedCode.value = id
  setTimeout(() => copiedCode.value = null, 2000)
}

const ragExample = `# RAG 기반 코드 검색 설정
claude mcp add claude-context \\
  -e OPENAI_API_KEY=sk-your-openai-api-key \\
  -e MILVUS_TOKEN=your-zilliz-cloud-api-key \\
  -- npx @zilliz/claude-context-mcp@latest

# 의미론적 검색 활용
claude
"사용자 인증 로직을 어떻게 구현했는지 찾아줘"
# → 파일명이 auth가 아니어도 의미상 관련된 코드를 모두 찾음

"결제 실패 시 재시도 로직이 어디 있어?"
# → retry, payment, error handling 관련 코드를 모두 검색

# 토큰 사용량 40% 절감
# - 전체 코드베이스 읽기 대신
# - 의미론적으로 관련된 부분만 선택적으로 로드`

const slashCommandExample = `# .claude/commands/api-review.md 생성
---
name: api-review
description: API 엔드포인트 코드 리뷰
---

다음 체크리스트에 따라 API 코드를 리뷰해줘:

## 보안
- [ ] 인증/인가 제대로 구현되었는가?
- [ ] SQL Injection 방어가 되어있는가?
- [ ] Rate limiting이 적용되었는가?

## 성능
- [ ] N+1 쿼리 문제가 없는가?
- [ ] 페이지네이션이 구현되었는가?
- [ ] 캐싱 전략이 적절한가?

## 에러 처리
- [ ] 모든 에러 케이스가 처리되는가?
- [ ] 에러 메시지가 적절한가?
- [ ] 로깅이 충분한가?

## 테스트
- [ ] 유닛 테스트가 있는가?
- [ ] 통합 테스트가 있는가?
- [ ] 엣지 케이스 테스트가 있는가?

# 사용법
claude /api-review

# 팀 전체가 동일한 기준으로 리뷰 가능`

const hooksExample = `# .claude/hooks/pre-commit.sh
#!/bin/bash

# TypeScript 타입 체크
echo "Running TypeScript type check..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ Type check failed"
  exit 1
fi

# ESLint
echo "Running ESLint..."
npx eslint src/
if [ $? -ne 0 ]; then
  echo "❌ Lint failed"
  exit 1
fi

# Tests
echo "Running tests..."
npm test
if [ $? -ne 0 ]; then
  echo "❌ Tests failed"
  exit 1
fi

echo "✅ All checks passed"

# .claude/hooks/post-tool-use.sh
#!/bin/bash

# 코드 변경 후 자동으로 포맷팅
if [[ "$TOOL_NAME" == "Edit" || "$TOOL_NAME" == "Write" ]]; then
  prettier --write "$FILE_PATH"
  echo "✨ Formatted $FILE_PATH"
fi`

const templateExample = `# 프로젝트 템플릿 생성
mkdir my-express-api-template
cd my-express-api-template

# .claude/template.json
{
  "name": "Express TypeScript API",
  "description": "Production-ready Express API with TypeScript",
  "structure": {
    "src/": {
      "routes/": "API routes",
      "services/": "Business logic",
      "models/": "Database models",
      "middlewares/": "Express middlewares",
      "utils/": "Utility functions",
      "types/": "TypeScript types"
    },
    "tests/": "Test files"
  },
  "dependencies": [
    "express",
    "typescript",
    "@types/express",
    "joi",
    "prisma"
  ],
  "devDependencies": [
    "jest",
    "supertest",
    "eslint",
    "prettier"
  ],
  "scripts": {
    "dev": "ts-node-dev src/index.ts",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src/"
  }
}

# 새 프로젝트 생성
claude
"my-express-api-template을 기반으로
새 프로젝트 'user-service'를 생성해줘"

# Claude가 자동으로:
# - 디렉토리 구조 생성
# - package.json 설정
# - TypeScript 설정
# - ESLint/Prettier 설정
# - 기본 Express 서버 코드
# - claude.md 파일 복사`
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-12">
      <div class="flex items-center mb-4">
        <router-link to="/" class="text-primary hover:text-accent mr-3">← 홈으로</router-link>
        <span class="text-gray-400">/</span>
        <span class="ml-3 text-gray-600">Part 4</span>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Part 4: 팀 워크플로우
      </h1>
      <p class="text-xl text-gray-600">
        팀 전체의 생산성을 높이는 표준화된 워크플로우를 구축합니다
      </p>
    </div>

    <!-- Workflow Cards -->
    <div class="grid md:grid-cols-2 gap-6 mb-8">
      <button
        @click="activeWorkflow = 'rag'"
        class="text-left p-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        :class="activeWorkflow === 'rag' ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : 'bg-white hover:shadow-xl'"
      >
        <div class="text-4xl mb-3">🔍</div>
        <h3 class="text-xl font-bold mb-2">RAG 코드 검색</h3>
        <p :class="activeWorkflow === 'rag' ? 'text-blue-100' : 'text-gray-600'">
          의미론적 검색으로 대규모 코드베이스 효율적 탐색
        </p>
      </button>

      <button
        @click="activeWorkflow = 'slash'"
        class="text-left p-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        :class="activeWorkflow === 'slash' ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white' : 'bg-white hover:shadow-xl'"
      >
        <div class="text-4xl mb-3">⚡</div>
        <h3 class="text-xl font-bold mb-2">Slash Commands</h3>
        <p :class="activeWorkflow === 'slash' ? 'text-purple-100' : 'text-gray-600'">
          팀 전용 커스텀 명령어로 워크플로우 표준화
        </p>
      </button>

      <button
        @click="activeWorkflow = 'hooks'"
        class="text-left p-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        :class="activeWorkflow === 'hooks' ? 'bg-gradient-to-br from-green-500 to-green-600 text-white' : 'bg-white hover:shadow-xl'"
      >
        <div class="text-4xl mb-3">🔧</div>
        <h3 class="text-xl font-bold mb-2">Quality Hooks</h3>
        <p :class="activeWorkflow === 'hooks' ? 'text-green-100' : 'text-gray-600'">
          코드 품질을 자동으로 관리하는 훅 시스템
        </p>
      </button>

      <button
        @click="activeWorkflow = 'template'"
        class="text-left p-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
        :class="activeWorkflow === 'template' ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white' : 'bg-white hover:shadow-xl'"
      >
        <div class="text-4xl mb-3">📦</div>
        <h3 class="text-xl font-bold mb-2">프로젝트 템플릿</h3>
        <p :class="activeWorkflow === 'template' ? 'text-orange-100' : 'text-gray-600'">
          재사용 가능한 프로젝트 구조로 빠른 시작
        </p>
      </button>
    </div>

    <!-- Content -->
    <div class="bg-white rounded-xl shadow-lg p-8">
      <!-- RAG Code Search -->
      <div v-show="activeWorkflow === 'rag'">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">🔍</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">RAG 기반 코드 검색</h2>
            <p class="text-gray-600 mt-2">벡터 검색으로 의미상 관련된 코드를 빠르게 찾습니다</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">기존 검색 vs RAG 검색</h3>
          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div class="bg-red-50 p-6 rounded-lg border-2 border-red-200">
              <h4 class="font-semibold text-red-900 mb-3">❌ 기존 키워드 검색</h4>
              <ul class="text-sm space-y-2 text-gray-700">
                <li>• 정확한 단어가 일치해야만 검색</li>
                <li>• "auth"로 검색하면 "authentication"은 못 찾음</li>
                <li>• 전체 코드베이스를 컨텍스트에 로드</li>
                <li>• 토큰 사용량이 매우 많음</li>
                <li>• 관련 없는 코드도 함께 로드</li>
              </ul>
            </div>

            <div class="bg-green-50 p-6 rounded-lg border-2 border-green-200">
              <h4 class="font-semibold text-green-900 mb-3">✅ RAG 의미론적 검색</h4>
              <ul class="text-sm space-y-2 text-gray-700">
                <li>• 의미가 유사하면 모두 검색</li>
                <li>• "로그인 로직"으로 auth 관련 코드 찾기</li>
                <li>• 필요한 부분만 선택적 로드</li>
                <li>• 토큰 사용량 40% 절감</li>
                <li>• 관련성 높은 코드만 로드</li>
              </ul>
            </div>
          </div>

          <div class="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 class="text-lg font-semibold mb-3">활용 예시</h3>
            <div class="space-y-3 text-sm">
              <div class="flex items-start">
                <div class="bg-blue-200 text-blue-900 rounded px-2 py-1 mr-3 text-xs font-mono">Query</div>
                <div class="flex-1">
                  <div class="font-semibold">"결제 실패 시 재시도 로직"</div>
                  <div class="text-gray-600 mt-1">→ payment, retry, error handling 관련 코드 모두 검색</div>
                </div>
              </div>
              <div class="flex items-start">
                <div class="bg-blue-200 text-blue-900 rounded px-2 py-1 mr-3 text-xs font-mono">Query</div>
                <div class="flex-1">
                  <div class="font-semibold">"비밀번호 암호화는 어떻게 하는지"</div>
                  <div class="text-gray-600 mt-1">→ hashing, bcrypt, security 관련 코드 찾기</div>
                </div>
              </div>
              <div class="flex items-start">
                <div class="bg-blue-200 text-blue-900 rounded px-2 py-1 mr-3 text-xs font-mono">Query</div>
                <div class="flex-1">
                  <div class="font-semibold">"데이터베이스 트랜잭션 처리"</div>
                  <div class="text-gray-600 mt-1">→ transaction, rollback, commit 로직 검색</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">RAG 코드 검색 설정 예제</span>
            <button
              @click="copyCode(ragExample, 'rag')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded"
            >
              {{ copiedCode === 'rag' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ ragExample }}</code></pre>
        </div>

        <div class="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p class="text-sm text-blue-700">
            <strong>대규모 코드베이스:</strong> 수십만 줄의 코드가 있는 프로젝트에서 RAG는 필수입니다.
            토큰 제한 없이 전체 코드베이스를 효율적으로 탐색할 수 있습니다.
          </p>
        </div>
      </div>

      <!-- Slash Commands -->
      <div v-show="activeWorkflow === 'slash'">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">⚡</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">Slash Commands</h2>
            <p class="text-gray-600 mt-2">팀 전용 커스텀 명령어로 반복 작업을 자동화합니다</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">Slash Commands의 장점</h3>
          <div class="grid md:grid-cols-3 gap-4 mb-6">
            <div class="bg-purple-50 p-4 rounded-lg">
              <div class="text-3xl mb-2">🎯</div>
              <h4 class="font-semibold mb-2">일관성</h4>
              <p class="text-sm text-gray-600">
                팀 전체가 동일한 기준과 절차를 따릅니다
              </p>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="text-3xl mb-2">⚡</div>
              <h4 class="font-semibold mb-2">효율성</h4>
              <p class="text-sm text-gray-600">
                긴 프롬프트를 매번 작성할 필요 없음
              </p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <div class="text-3xl mb-2">📚</div>
              <h4 class="font-semibold mb-2">지식 공유</h4>
              <p class="text-sm text-gray-600">
                베스트 프랙티스를 코드화하여 공유
              </p>
            </div>
          </div>

          <h3 class="text-xl font-semibold mb-4">실전 Slash Command 예시</h3>
          <div class="space-y-3 mb-6">
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <code class="bg-purple-200 text-purple-900 px-2 py-1 rounded text-sm mr-2">/api-review</code>
                <span class="text-sm text-gray-600">API 엔드포인트 코드 리뷰</span>
              </div>
              <p class="text-xs text-gray-500">보안, 성능, 에러 처리, 테스트 등 체크리스트 기반 리뷰</p>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <code class="bg-blue-200 text-blue-900 px-2 py-1 rounded text-sm mr-2">/gen-test</code>
                <span class="text-sm text-gray-600">테스트 코드 자동 생성</span>
              </div>
              <p class="text-xs text-gray-500">현재 파일에 대한 유닛 테스트 및 통합 테스트 생성</p>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <code class="bg-green-200 text-green-900 px-2 py-1 rounded text-sm mr-2">/docs</code>
                <span class="text-sm text-gray-600">API 문서 생성</span>
              </div>
              <p class="text-xs text-gray-500">Swagger/OpenAPI 스펙 자동 생성</p>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <code class="bg-orange-200 text-orange-900 px-2 py-1 rounded text-sm mr-2">/security-check</code>
                <span class="text-sm text-gray-600">보안 취약점 스캔</span>
              </div>
              <p class="text-xs text-gray-500">OWASP Top 10 기준 보안 검사</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">Slash Command 생성 예제</span>
            <button
              @click="copyCode(slashCommandExample, 'slash')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded"
            >
              {{ copiedCode === 'slash' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ slashCommandExample }}</code></pre>
        </div>

        <div class="bg-purple-50 border-l-4 border-purple-500 p-4">
          <p class="text-sm text-purple-700">
            <strong>팀 온보딩:</strong> 새로운 팀원도 slash command를 사용하면
            베테랑과 동일한 수준의 작업을 수행할 수 있습니다. 학습 곡선을 크게 줄여줍니다.
          </p>
        </div>
      </div>

      <!-- Quality Hooks -->
      <div v-show="activeWorkflow === 'hooks'">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">🔧</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">Quality Hooks</h2>
            <p class="text-gray-600 mt-2">코드 품질을 자동으로 관리하는 훅 시스템</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">사용 가능한 Hooks</h3>
          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🔍 pre-commit</h4>
              <p class="text-sm text-gray-600 mb-2">
                커밋 전에 실행되는 훅
              </p>
              <ul class="text-xs space-y-1 text-gray-600">
                <li>• TypeScript 타입 체크</li>
                <li>• ESLint 검사</li>
                <li>• 테스트 실행</li>
                <li>• 보안 스캔</li>
              </ul>
            </div>

            <div class="bg-purple-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">✏️ post-tool-use</h4>
              <p class="text-sm text-gray-600 mb-2">
                Claude가 파일을 수정한 후 실행
              </p>
              <ul class="text-xs space-y-1 text-gray-600">
                <li>• 자동 포맷팅 (Prettier)</li>
                <li>• Import 정리</li>
                <li>• 코드 스타일 통일</li>
              </ul>
            </div>

            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">📝 pre-prompt-submit</h4>
              <p class="text-sm text-gray-600 mb-2">
                프롬프트 전송 전에 실행
              </p>
              <ul class="text-xs space-y-1 text-gray-600">
                <li>• 민감 정보 검사</li>
                <li>• 프롬프트 템플릿 적용</li>
                <li>• 컨텍스트 자동 추가</li>
              </ul>
            </div>

            <div class="bg-orange-50 p-4 rounded-lg">
              <h4 class="font-semibold mb-2">🚀 post-response</h4>
              <p class="text-sm text-gray-600 mb-2">
                Claude 응답 후 실행
              </p>
              <ul class="text-xs space-y-1 text-gray-600">
                <li>• 로그 저장</li>
                <li>• 메트릭 수집</li>
                <li>• 팀 대시보드 업데이트</li>
              </ul>
            </div>
          </div>

          <div class="bg-green-50 p-6 rounded-lg mb-6">
            <h3 class="text-lg font-semibold mb-3">Hooks의 이점</h3>
            <ul class="space-y-2 text-sm">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span><strong>품질 보장:</strong> 버그나 스타일 문제가 있는 코드는 커밋되지 않음</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span><strong>자동화:</strong> 수동으로 린트, 테스트를 실행할 필요 없음</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span><strong>일관성:</strong> 모든 팀원이 동일한 품질 기준을 자동으로 따름</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">Quality Hooks 예제</span>
            <button
              @click="copyCode(hooksExample, 'hooks')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded"
            >
              {{ copiedCode === 'hooks' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ hooksExample }}</code></pre>
        </div>

        <div class="bg-green-50 border-l-4 border-green-500 p-4">
          <p class="text-sm text-green-700">
            <strong>자동 품질 관리:</strong> Hooks를 설정해두면 Claude가 만든 코드도 자동으로 검증되어
            항상 높은 품질이 유지됩니다. 사람이 실수할 일이 없어집니다.
          </p>
        </div>
      </div>

      <!-- Project Templates -->
      <div v-show="activeWorkflow === 'template'">
        <div class="flex items-center mb-6">
          <span class="text-5xl mr-4">📦</span>
          <div>
            <h2 class="text-3xl font-bold text-gray-900">프로젝트 템플릿</h2>
            <p class="text-gray-600 mt-2">재사용 가능한 프로젝트 구조로 빠르게 시작합니다</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-xl font-semibold mb-4">프로젝트 템플릿의 이점</h3>
          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="text-3xl mb-2">🚀</div>
              <h4 class="font-semibold mb-2">빠른 시작</h4>
              <p class="text-sm text-gray-600">
                보일러플레이트 코드 작성 없이 바로 비즈니스 로직 개발 시작
              </p>
            </div>
            <div class="bg-purple-50 p-4 rounded-lg">
              <div class="text-3xl mb-2">🎯</div>
              <h4 class="font-semibold mb-2">베스트 프랙티스</h4>
              <p class="text-sm text-gray-600">
                검증된 아키텍처와 설정을 자동으로 적용
              </p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <div class="text-3xl mb-2">🔄</div>
              <h4 class="font-semibold mb-2">일관성</h4>
              <p class="text-sm text-gray-600">
                모든 프로젝트가 동일한 구조와 규칙을 따름
              </p>
            </div>
            <div class="bg-orange-50 p-4 rounded-lg">
              <div class="text-3xl mb-2">👥</div>
              <h4 class="font-semibold mb-2">팀 협업</h4>
              <p class="text-sm text-gray-600">
                팀원들이 어떤 프로젝트든 쉽게 이해하고 기여 가능
              </p>
            </div>
          </div>

          <h3 class="text-xl font-semibold mb-4">템플릿에 포함할 내용</h3>
          <div class="bg-gray-50 p-6 rounded-lg mb-6">
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 class="font-semibold mb-2">📁 프로젝트 구조</h4>
                <ul class="space-y-1 text-gray-600">
                  <li>• 디렉토리 레이아웃</li>
                  <li>• 파일 네이밍 규칙</li>
                  <li>• 모듈 분리 전략</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-2">⚙️ 설정 파일</h4>
                <ul class="space-y-1 text-gray-600">
                  <li>• TypeScript/ESLint 설정</li>
                  <li>• Jest/Prettier 설정</li>
                  <li>• Docker/CI 설정</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-2">📋 Claude 설정</h4>
                <ul class="space-y-1 text-gray-600">
                  <li>• claude.md 컨벤션</li>
                  <li>• Slash commands</li>
                  <li>• Quality hooks</li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-2">📝 문서</h4>
                <ul class="space-y-1 text-gray-600">
                  <li>• README 템플릿</li>
                  <li>• API 문서 구조</li>
                  <li>• 기여 가이드</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 rounded-lg p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-400 text-sm">프로젝트 템플릿 예제</span>
            <button
              @click="copyCode(templateExample, 'template')"
              class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded"
            >
              {{ copiedCode === 'template' ? '✓ 복사됨' : '📋 복사' }}
            </button>
          </div>
          <pre class="text-green-400 text-sm overflow-x-auto"><code>{{ templateExample }}</code></pre>
        </div>

        <div class="bg-orange-50 border-l-4 border-orange-500 p-4">
          <p class="text-sm text-orange-700">
            <strong>스타트업 팁:</strong> 마이크로서비스 아키텍처를 사용한다면,
            각 서비스 타입(API, Worker, Gateway 등)별로 템플릿을 만들어두면
            새 서비스를 몇 분 만에 생성할 수 있습니다.
          </p>
        </div>
      </div>
    </div>

    <!-- Final CTA -->
    <div class="mt-12 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-white text-center">
      <h2 class="text-3xl font-bold mb-4">축하합니다! 🎉</h2>
      <p class="text-lg mb-6 text-blue-100">
        Claude Code의 모든 핵심 기능을 마스터했습니다.
        이제 팀 전체의 생산성을 5배로 올릴 준비가 되었습니다!
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/"
          class="px-8 py-3 bg-white text-primary font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          처음부터 다시 보기
        </router-link>
        <a
          href="https://memoryhub.tistory.com"
          target="_blank"
          class="px-8 py-3 bg-gray-900 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          원본 블로그 방문
        </a>
      </div>
    </div>

    <!-- Navigation -->
    <div class="mt-12 flex justify-between items-center pt-8 border-t border-gray-200">
      <router-link
        to="/part3"
        class="flex items-center text-gray-600 hover:text-primary transition-colors"
      >
        <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Part 3: 확장 기능
      </router-link>
      <router-link
        to="/"
        class="flex items-center text-gray-600 hover:text-primary transition-colors"
      >
        홈으로 돌아가기
        <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
      </router-link>
    </div>
  </div>
</template>
