<script setup>
import PartLayout from '../components/PartLayout.vue'
import TopicHead from '../components/TopicHead.vue'
import CodeBlock from '../components/CodeBlock.vue'
import Tip from '../components/Tip.vue'

const commitTypes = [
  { type: 'feat', label: '새로운 기능' },
  { type: 'fix', label: '버그 수정' },
  { type: 'refactor', label: '리팩토링' },
  { type: 'test', label: '테스트 추가' },
  { type: 'docs', label: '문서 업데이트' },
  { type: 'chore', label: '빌드, 설정 변경' }
]

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
  <PartLayout part-id="part2" v-slot="{ active }">
    <!-- MCP -->
    <div v-show="active === 'mcp'">
      <TopicHead title="Model Context Protocol (MCP)" sub="Claude를 데이터베이스, API, 외부 툴과 직접 연결합니다" />

      <h3 class="section-title">MCP로 할 수 있는 일</h3>
      <div class="spec sm:grid-cols-2">
        <div>
          <h4>데이터베이스 직접 쿼리</h4>
          <p>PostgreSQL, MySQL 등에 직접 연결하여 스키마 분석, 데이터 조회, 쿼리 최적화</p>
        </div>
        <div>
          <h4>GitHub 통합</h4>
          <p>이슈, PR, 코드 리뷰 등 GitHub 작업을 Claude와 함께 수행</p>
        </div>
        <div>
          <h4>Slack/JIRA 연동</h4>
          <p>메시지 전송, 티켓 관리 등 협업 도구와 연동</p>
        </div>
        <div>
          <h4>실시간 데이터 분석</h4>
          <p>운영 중인 시스템의 로그, 메트릭, 상태를 실시간으로 분석</p>
        </div>
      </div>

      <CodeBlock :code="mcpExample" label="MCP 사용 예제" />

      <Tip label="Pro Tip">
        MCP를 사용하면 수동으로 데이터를 복사-붙여넣기할 필요가 없어집니다.
        Claude가 직접 시스템에 접근하여 필요한 정보를 가져오고 작업을 수행합니다.
      </Tip>
    </div>

    <!-- Screenshot / URL -->
    <div v-show="active === 'screenshot'">
      <TopicHead title="Screenshot & URL 컨텍스트" sub="복잡한 정보를 시각적으로 공유하여 소통을 간소화합니다" />

      <h3 class="section-title">활용 사례</h3>
      <div class="spec">
        <div>
          <h4>API 문서 스크린샷</h4>
          <p>
            Swagger, Postman Collection 등 API 문서를 스크린샷으로 찍어 Claude에게 전달하면
            해당 API를 사용하는 코드를 자동으로 생성합니다.
          </p>
        </div>
        <div>
          <h4>디자인 목업</h4>
          <p>Figma, Sketch 디자인을 스크린샷으로 공유하여 UI 컴포넌트를 빠르게 구현할 수 있습니다.</p>
        </div>
        <div>
          <h4>에러 메시지</h4>
          <p>복잡한 스택 트레이스나 에러 화면을 스크린샷으로 공유하면 Claude가 문제를 빠르게 진단합니다.</p>
        </div>
        <div>
          <h4>공식 문서 URL</h4>
          <p>라이브러리의 공식 문서 URL을 붙여넣으면 Claude가 최신 API를 참고하여 코드를 작성합니다.</p>
        </div>
      </div>

      <CodeBlock :code="screenshotExample" label="Screenshot/URL 활용 예제" />

      <Tip label="Best Practice">
        긴 텍스트 설명보다 스크린샷 하나가 훨씬 효과적입니다.
        특히 시각적 정보 (UI, 다이어그램, 에러 화면)는 스크린샷으로 공유하세요.
      </Tip>
    </div>

    <!-- Checklist -->
    <div v-show="active === 'checklist'">
      <TopicHead title="체크리스트 기반 마이그레이션" sub="대규모 작업을 작은 단위로 나누어 체계적으로 진행합니다" />

      <h3 class="section-title">체크리스트 접근법의 장점</h3>
      <div class="spec sm:grid-cols-2">
        <div>
          <h4>진행상황 추적</h4>
          <p>완료된 항목과 남은 작업을 한눈에 파악할 수 있습니다</p>
        </div>
        <div>
          <h4>집중력 유지</h4>
          <p>한 번에 하나의 작업에만 집중하여 실수를 줄입니다</p>
        </div>
        <div>
          <h4>재개 용이</h4>
          <p>중간에 멈췄다가 다시 시작하기 쉽습니다</p>
        </div>
        <div>
          <h4>팀 협업</h4>
          <p>여러 명이 체크리스트를 나눠서 작업할 수 있습니다</p>
        </div>
      </div>

      <CodeBlock :code="checklistExample" label="체크리스트 마이그레이션 예제" />

      <Tip label="팁">
        Claude는 체크리스트의 각 항목을 순차적으로 완료하면서 체크 표시를 업데이트합니다.
        진행 상황을 실시간으로 확인할 수 있어 안심하고 작업을 맡길 수 있습니다.
      </Tip>
    </div>

    <!-- Commit / PR -->
    <div v-show="active === 'commit'">
      <TopicHead title="자동 커밋 & PR 생성" sub="일관된 형식의 커밋 메시지와 상세한 PR 설명을 자동으로 작성합니다" />

      <h3 class="section-title">Conventional Commits</h3>
      <p class="prose-ko">Claude는 Conventional Commits 형식을 자동으로 따릅니다:</p>
      <div class="mt-5 rounded-xl bg-case px-5 py-5">
        <code class="text-[15px] font-semibold text-mod">type(scope): subject</code>
        <dl class="mt-4 grid gap-x-8 gap-y-2.5 text-[15px] sm:grid-cols-2">
          <div v-for="c in commitTypes" :key="c.type" class="flex items-baseline gap-3">
            <dt><code class="key legend min-w-[72px] px-2 py-1 !text-[12px] !normal-case [--travel:2px]">{{ c.type }}</code></dt>
            <dd class="text-ink-soft">{{ c.label }}</dd>
          </div>
        </dl>
      </div>

      <h3 class="section-title">자동 PR 설명 생성</h3>
      <p class="prose-ko">Claude가 생성하는 PR 설명에는 다음이 포함됩니다:</p>
      <div class="spec mt-5 sm:grid-cols-2">
        <div>
          <h4>Summary</h4>
          <p>변경사항의 핵심 요약</p>
        </div>
        <div>
          <h4>Technical Details</h4>
          <p>기술적 구현 세부사항</p>
        </div>
        <div>
          <h4>Testing</h4>
          <p>테스트 계획 및 체크리스트</p>
        </div>
        <div>
          <h4>Breaking Changes</h4>
          <p>호환성 관련 주의사항</p>
        </div>
      </div>

      <CodeBlock :code="commitExample" label="자동 커밋 & PR 예제" />

      <Tip label="팀 협업">
        일관된 커밋 메시지와 상세한 PR 설명은 팀원들의 코드 리뷰를 훨씬 수월하게 만듭니다.
        Claude가 자동으로 문서화를 해주므로 개발자는 코드 작성에만 집중할 수 있습니다.
      </Tip>
    </div>
  </PartLayout>
</template>
