<script setup>
import PartLayout from '../components/PartLayout.vue'
import TopicHead from '../components/TopicHead.vue'
import CodeBlock from '../components/CodeBlock.vue'
import Tip from '../components/Tip.vue'

import { SOURCE_URL } from '../data/curriculum.js'

const ragQueries = [
  { query: '결제 실패 시 재시도 로직', result: 'payment, retry, error handling 관련 코드 모두 검색' },
  { query: '비밀번호 암호화는 어떻게 하는지', result: 'hashing, bcrypt, security 관련 코드 찾기' },
  { query: '데이터베이스 트랜잭션 처리', result: 'transaction, rollback, commit 로직 검색' }
]

const slashCommands = [
  { name: '/api-review', title: 'API 엔드포인트 코드 리뷰', detail: '보안, 성능, 에러 처리, 테스트 등 체크리스트 기반 리뷰' },
  { name: '/gen-test', title: '테스트 코드 자동 생성', detail: '현재 파일에 대한 유닛 테스트 및 통합 테스트 생성' },
  { name: '/docs', title: 'API 문서 생성', detail: 'Swagger/OpenAPI 스펙 자동 생성' },
  { name: '/security-check', title: '보안 취약점 스캔', detail: 'OWASP Top 10 기준 보안 검사' }
]

const hooks = [
  { name: 'pre-commit', when: '커밋 전에 실행되는 훅', items: ['TypeScript 타입 체크', 'ESLint 검사', '테스트 실행', '보안 스캔'] },
  { name: 'post-tool-use', when: 'Claude가 파일을 수정한 후 실행', items: ['자동 포맷팅 (Prettier)', 'Import 정리', '코드 스타일 통일'] },
  { name: 'pre-prompt-submit', when: '프롬프트 전송 전에 실행', items: ['민감 정보 검사', '프롬프트 템플릿 적용', '컨텍스트 자동 추가'] },
  { name: 'post-response', when: 'Claude 응답 후 실행', items: ['로그 저장', '메트릭 수집', '팀 대시보드 업데이트'] }
]

const hookBenefits = [
  { title: '품질 보장', body: '버그나 스타일 문제가 있는 코드는 커밋되지 않음' },
  { title: '자동화', body: '수동으로 린트, 테스트를 실행할 필요 없음' },
  { title: '일관성', body: '모든 팀원이 동일한 품질 기준을 자동으로 따름' }
]

const templateContents = [
  { title: '프로젝트 구조', items: ['디렉토리 레이아웃', '파일 네이밍 규칙', '모듈 분리 전략'] },
  { title: '설정 파일', items: ['TypeScript/ESLint 설정', 'Jest/Prettier 설정', 'Docker/CI 설정'] },
  { title: 'Claude 설정', items: ['claude.md 컨벤션', 'Slash commands', 'Quality hooks'] },
  { title: '문서', items: ['README 템플릿', 'API 문서 구조', '기여 가이드'] }
]

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
  <PartLayout part-id="part4">
    <template #default="{ active }">
      <!-- RAG -->
      <div v-show="active === 'rag'">
        <TopicHead title="RAG 기반 코드 검색" sub="벡터 검색으로 의미상 관련된 코드를 빠르게 찾습니다" />

        <h3 class="section-title">기존 검색 vs RAG 검색</h3>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-xl bg-case px-5 py-5">
            <h4 class="flex items-center gap-2 font-semibold text-ink">
              <svg aria-hidden="true" viewBox="0 0 16 16" class="h-4 w-4 text-ink-mute" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m4 4 8 8M12 4l-8 8" /></svg>
              기존 키워드 검색
            </h4>
            <ul class="bullets mt-3 space-y-2 text-sm text-ink-soft">
              <li>정확한 단어가 일치해야만 검색</li>
              <li>"auth"로 검색하면 "authentication"은 못 찾음</li>
              <li>전체 코드베이스를 컨텍스트에 로드</li>
              <li>토큰 사용량이 매우 많음</li>
              <li>관련 없는 코드도 함께 로드</li>
            </ul>
          </div>
          <div class="rounded-xl bg-mod px-5 py-5 text-alpha">
            <h4 class="flex items-center gap-2 font-semibold">
              <svg aria-hidden="true" viewBox="0 0 16 16" class="h-4 w-4 text-enter" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m3 8.5 3 3 7-7" /></svg>
              RAG 의미론적 검색
            </h4>
            <ul class="bullets bullets-light mt-3 space-y-2 text-sm text-mod-legend">
              <li>의미가 유사하면 모두 검색</li>
              <li>"로그인 로직"으로 auth 관련 코드 찾기</li>
              <li>필요한 부분만 선택적 로드</li>
              <li>토큰 사용량 40% 절감</li>
              <li>관련성 높은 코드만 로드</li>
            </ul>
          </div>
        </div>

        <h3 class="section-title">활용 예시</h3>
        <ul class="space-y-4">
          <li v-for="q in ragQueries" :key="q.query" class="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
            <span class="key key-mod legend shrink-0 self-start px-2.5 py-1 !text-[11px] text-enter [--travel:2px]">Query</span>
            <span>
              <span class="block font-semibold text-ink">"{{ q.query }}"</span>
              <span class="mt-1 block text-[15px] text-ink-soft">→ {{ q.result }}</span>
            </span>
          </li>
        </ul>

        <CodeBlock :code="ragExample" label="RAG 코드 검색 설정 예제" />

        <Tip label="대규모 코드베이스">
          수십만 줄의 코드가 있는 프로젝트에서 RAG는 필수입니다.
          토큰 제한 없이 전체 코드베이스를 효율적으로 탐색할 수 있습니다.
        </Tip>
      </div>

      <!-- Slash commands -->
      <div v-show="active === 'slash'">
        <TopicHead title="Slash Commands" sub="팀 전용 커스텀 명령어로 반복 작업을 자동화합니다" />

        <h3 class="section-title">Slash Commands의 장점</h3>
        <div class="spec sm:grid-cols-3">
          <div>
            <h4>일관성</h4>
            <p>팀 전체가 동일한 기준과 절차를 따릅니다</p>
          </div>
          <div>
            <h4>효율성</h4>
            <p>긴 프롬프트를 매번 작성할 필요 없음</p>
          </div>
          <div>
            <h4>지식 공유</h4>
            <p>베스트 프랙티스를 코드화하여 공유</p>
          </div>
        </div>

        <h3 class="section-title">실전 Slash Command 예시</h3>
        <div class="spec">
          <div v-for="cmd in slashCommands" :key="cmd.name">
            <h4 class="flex flex-wrap items-center gap-3">
              <code class="key key-mod legend px-2.5 py-1 !text-[12.5px] !normal-case !tracking-normal [--travel:2px]">{{ cmd.name }}</code>
              <span class="text-[15px]">{{ cmd.title }}</span>
            </h4>
            <p class="mt-2">{{ cmd.detail }}</p>
          </div>
        </div>

        <CodeBlock :code="slashCommandExample" label="Slash Command 생성 예제" />

        <Tip label="팀 온보딩">
          새로운 팀원도 slash command를 사용하면
          베테랑과 동일한 수준의 작업을 수행할 수 있습니다. 학습 곡선을 크게 줄여줍니다.
        </Tip>
      </div>

      <!-- Hooks -->
      <div v-show="active === 'hooks'">
        <TopicHead title="Quality Hooks" sub="코드 품질을 자동으로 관리하는 훅 시스템" />

        <h3 class="section-title">사용 가능한 Hooks</h3>
        <div class="spec sm:grid-cols-2">
          <div v-for="hook in hooks" :key="hook.name">
            <h4><code class="text-[14px] text-mod">{{ hook.name }}</code></h4>
            <p>{{ hook.when }}</p>
            <ul class="bullets mt-2 space-y-1">
              <li v-for="item in hook.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <h3 class="section-title">Hooks의 이점</h3>
        <ul class="space-y-3 text-[16px] text-ink-soft">
          <li v-for="b in hookBenefits" :key="b.title" class="flex items-start gap-3">
            <svg aria-hidden="true" viewBox="0 0 16 16" class="mt-1 h-4 w-4 shrink-0 text-mod" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m3 8.5 3 3 7-7" /></svg>
            <span><strong class="font-semibold text-ink">{{ b.title }}:</strong> {{ b.body }}</span>
          </li>
        </ul>

        <CodeBlock :code="hooksExample" label="Quality Hooks 예제" />

        <Tip label="자동 품질 관리">
          Hooks를 설정해두면 Claude가 만든 코드도 자동으로 검증되어
          항상 높은 품질이 유지됩니다. 사람이 실수할 일이 없어집니다.
        </Tip>
      </div>

      <!-- Templates -->
      <div v-show="active === 'template'">
        <TopicHead title="프로젝트 템플릿" sub="재사용 가능한 프로젝트 구조로 빠르게 시작합니다" />

        <h3 class="section-title">프로젝트 템플릿의 이점</h3>
        <div class="spec sm:grid-cols-2">
          <div>
            <h4>빠른 시작</h4>
            <p>보일러플레이트 코드 작성 없이 바로 비즈니스 로직 개발 시작</p>
          </div>
          <div>
            <h4>베스트 프랙티스</h4>
            <p>검증된 아키텍처와 설정을 자동으로 적용</p>
          </div>
          <div>
            <h4>일관성</h4>
            <p>모든 프로젝트가 동일한 구조와 규칙을 따름</p>
          </div>
          <div>
            <h4>팀 협업</h4>
            <p>팀원들이 어떤 프로젝트든 쉽게 이해하고 기여 가능</p>
          </div>
        </div>

        <h3 class="section-title">템플릿에 포함할 내용</h3>
        <div class="grid gap-x-8 gap-y-6 rounded-xl bg-case px-5 py-6 sm:grid-cols-2">
          <div v-for="group in templateContents" :key="group.title">
            <h4 class="font-semibold text-ink">{{ group.title }}</h4>
            <ul class="bullets mt-2 space-y-1 text-sm text-ink-soft">
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <CodeBlock :code="templateExample" label="프로젝트 템플릿 예제" />

        <Tip label="스타트업 팁">
          마이크로서비스 아키텍처를 사용한다면,
          각 서비스 타입(API, Worker, Gateway 등)별로 템플릿을 만들어두면
          새 서비스를 몇 분 만에 생성할 수 있습니다.
        </Tip>
      </div>
    </template>

    <template #after>
      <section aria-labelledby="finish-title" class="mt-14 overflow-hidden rounded-2xl bg-mod text-alpha">
        <div class="grid gap-8 px-6 py-10 sm:px-12 sm:py-14 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 id="finish-title" class="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">축하합니다!</h2>
            <p class="mt-4 max-w-measure text-lg leading-relaxed text-mod-legend">
              Claude Code의 모든 핵심 기능을 마스터했습니다.
              이제 팀 전체의 생산성을 5배로 올릴 준비가 되었습니다!
            </p>
          </div>
          <div class="flex flex-col gap-4 sm:flex-row md:flex-col">
            <router-link to="/" class="key key-enter min-h-[56px] px-6 text-base font-bold">처음부터 다시 보기</router-link>
            <a :href="SOURCE_URL" target="_blank" rel="noopener" class="key min-h-[52px] px-6 text-[15px]">원본 블로그 방문</a>
          </div>
        </div>
      </section>
    </template>
  </PartLayout>
</template>
