<script setup>
import PartLayout from '../components/PartLayout.vue'
import TopicHead from '../components/TopicHead.vue'
import CodeBlock from '../components/CodeBlock.vue'
import Tip from '../components/Tip.vue'

const thinkingModes = [
  { mode: 'think', tokens: '~1,000', description: '간단한 문제 해결', value: 1000 },
  { mode: 'think hard', tokens: '~5,000', description: '중간 복잡도 작업', value: 5000 },
  { mode: 'think harder', tokens: '~15,000', description: '복잡한 아키텍처 설계', value: 15000 },
  { mode: 'ultrathink', tokens: '31,999', description: '최고난이도 문제', value: 31999 }
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
  <PartLayout part-id="part3" v-slot="{ active }">
    <!-- Extended Thinking -->
    <div v-show="active === 'thinking'">
      <TopicHead title="Extended Thinking Modes" sub="복잡한 문제에 더 많은 &quot;생각&quot; 토큰을 할당하여 더 깊은 분석을 수행합니다" />

      <h3 class="section-title">사고 모드 비교</h3>
      <table class="w-full border-collapse text-left">
        <caption class="sr-only">사고 모드별 최대 토큰</caption>
        <thead>
          <tr class="border-b border-case-line text-[13px] text-ink-mute">
            <th scope="col" class="py-2 pr-4 font-medium">모드</th>
            <th scope="col" class="hidden py-2 pr-4 font-medium sm:table-cell">용도</th>
            <th scope="col" class="w-[40%] py-2 pr-4 font-medium">사고 예산</th>
            <th scope="col" class="py-2 text-right font-medium">최대 토큰</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mode in thinkingModes" :key="mode.mode" class="border-b border-case-line/70 align-middle">
            <th scope="row" class="py-4 pr-4">
              <code class="key legend whitespace-nowrap px-2.5 py-1.5 !text-[12.5px] !normal-case !tracking-normal [--travel:2px]">{{ mode.mode }}</code>
              <span class="mt-1.5 block text-[13px] font-normal text-ink-mute sm:hidden">{{ mode.description }}</span>
            </th>
            <td class="hidden py-4 pr-4 text-[15px] text-ink-soft sm:table-cell">{{ mode.description }}</td>
            <td class="py-4 pr-4">
              <span class="block h-2.5 rounded-full bg-case">
                <span class="block h-2.5 rounded-full bg-mod" :style="{ width: Math.max(4, (mode.value / 31999) * 100) + '%' }" />
              </span>
            </td>
            <td class="py-4 text-right font-mono text-[14px] font-semibold tabular-nums text-ink">{{ mode.tokens }}</td>
          </tr>
        </tbody>
      </table>

      <h3 class="section-title">Extended Thinking이 필요한 경우</h3>
      <ul class="bullets space-y-2.5 text-[16px] text-ink-soft">
        <li>복잡한 마이크로서비스 아키텍처 설계</li>
        <li>성능 최적화 알고리즘 분석 및 개선</li>
        <li>보안 취약점 심층 분석</li>
        <li>레거시 코드베이스 리팩토링 전략 수립</li>
      </ul>

      <CodeBlock :code="thinkingExample" label="Extended Thinking 예제" />
    </div>

    <!-- Subagent -->
    <div v-show="active === 'subagent'">
      <TopicHead title="Subagent 병렬 처리" sub="최대 10개의 독립적인 Claude 인스턴스로 작업을 병렬 수행합니다" />

      <h3 class="section-title">Subagent vs Multi-instance 차이</h3>
      <div class="spec sm:grid-cols-2">
        <div>
          <h4>Multi-instance (Part 1)</h4>
          <ul class="bullets mt-2 space-y-1.5">
            <li>사용자가 여러 터미널을 수동으로 관리</li>
            <li>각 터미널에서 별도 작업 요청</li>
            <li>동시성은 있지만 조율은 수동</li>
          </ul>
        </div>
        <div>
          <h4>Subagent (Part 3)</h4>
          <ul class="bullets mt-2 space-y-1.5">
            <li>하나의 명령으로 여러 agent 생성</li>
            <li>자동으로 작업 분배 및 조율</li>
            <li>결과를 통합하여 보고</li>
          </ul>
        </div>
      </div>

      <h3 class="section-title">활용 사례</h3>
      <div class="spec sm:grid-cols-2">
        <div>
          <h4>대규모 모노레포 분석</h4>
          <p>각 subagent가 서로 다른 패키지/모듈을 분석하고 의존성을 파악</p>
        </div>
        <div>
          <h4>전체 코드베이스 검색</h4>
          <p>여러 디렉토리를 동시에 탐색하여 패턴 찾기</p>
        </div>
        <div>
          <h4>병렬 리팩토링</h4>
          <p>독립적인 모듈들을 동시에 리팩토링</p>
        </div>
        <div>
          <h4>다각도 분석</h4>
          <p>성능, 보안, 코드 품질 등을 동시에 분석</p>
        </div>
      </div>

      <CodeBlock :code="subagentExample" label="Subagent 병렬 처리 예제" />
    </div>

    <!-- Log analysis -->
    <div v-show="active === 'log'">
      <TopicHead title="실시간 로그 분석" sub="파이프를 통해 로그를 실시간으로 분석하고 인사이트를 도출합니다" />

      <h3 class="section-title">로그 분석으로 할 수 있는 일</h3>
      <div class="spec">
        <div>
          <h4>에러 패턴 탐지</h4>
          <p>반복적으로 발생하는 에러를 찾아내고 근본 원인을 파악합니다.</p>
        </div>
        <div>
          <h4>성능 병목 지점 식별</h4>
          <p>느린 쿼리, API 호출 타임아웃 등 성능 문제를 찾아냅니다.</p>
        </div>
        <div>
          <h4>보안 위협 탐지</h4>
          <p>비정상적인 접근 패턴, 무차별 대입 공격 등을 탐지합니다.</p>
        </div>
        <div>
          <h4>분산 트레이싱</h4>
          <p>여러 마이크로서비스의 로그를 상관 분석하여 요청 흐름을 추적합니다.</p>
        </div>
      </div>

      <CodeBlock :code="logAnalysisExample" label="로그 분석 예제" />

      <Tip label="DevOps Tip">
        장애 발생 시 수천 줄의 로그를 수동으로 분석하는 대신,
        Claude에게 파이프로 전달하면 몇 초 만에 핵심 원인을 찾아냅니다.
      </Tip>
    </div>

    <!-- Headless -->
    <div v-show="active === 'headless'">
      <TopicHead title="Headless Mode 자동화" sub="CI/CD 파이프라인에 Claude를 통합하여 자동화된 워크플로우를 구축합니다" />

      <h3 class="section-title">Headless Mode 활용 사례</h3>
      <div class="spec sm:grid-cols-2">
        <div>
          <h4>자동 코드 리뷰</h4>
          <p>PR마다 자동으로 코드 품질, 보안, 성능을 검토하고 피드백 제공</p>
        </div>
        <div>
          <h4>린트 자동 수정</h4>
          <p>린트 에러를 자동으로 수정하고 커밋</p>
        </div>
        <div>
          <h4>테스트 커버리지 분석</h4>
          <p>테스트가 부족한 부분을 찾아 개선 방안 제안</p>
        </div>
        <div>
          <h4>릴리스 노트 생성</h4>
          <p>커밋 히스토리를 분석하여 자동으로 릴리스 노트 작성</p>
        </div>
      </div>

      <h3 class="section-title">-p 플래그의 힘</h3>
      <p class="prose-ko">
        <code class="inline-code">claude -p "프롬프트"</code> 형식으로 사용하면
        대화형 인터페이스 없이 명령만 실행하고 결과를 반환합니다.
      </p>
      <p class="prose-ko mt-3">
        이를 통해 스크립트, GitHub Actions, GitLab CI, Jenkins 등 모든 CI/CD 도구에 통합 가능합니다.
      </p>

      <CodeBlock :code="headlessExample" label="Headless Mode & CI/CD 통합 예제" />

      <Tip label="자동화 팁">
        Headless mode를 활용하면 개발자가 잠든 사이에도
        Claude가 코드 리뷰, 린트 수정, 테스트 생성 등을 자동으로 수행할 수 있습니다.
      </Tip>
    </div>
  </PartLayout>
</template>
