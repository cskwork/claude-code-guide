<script setup>
import PartLayout from '../components/PartLayout.vue'
import TopicHead from '../components/TopicHead.vue'
import CodeBlock from '../components/CodeBlock.vue'
import Tip from '../components/Tip.vue'

const tddSteps = [
  { title: '테스트 먼저 작성', body: 'Claude에게 요구사항을 설명하고 테스트 코드를 먼저 생성하도록 요청합니다. 성공 케이스, 실패 케이스, 엣지 케이스를 모두 포함하세요.' },
  { title: '실패 확인', body: '테스트를 실행하여 실패하는 것을 확인합니다. 이는 테스트가 제대로 작동하는지 검증하는 중요한 단계입니다.' },
  { title: '구현 요청', body: 'Claude에게 테스트를 통과하는 최소한의 코드를 작성하도록 요청합니다. over-engineering을 피하고 필요한 기능만 구현합니다.' },
  { title: '리팩토링', body: '테스트가 통과하면 코드를 개선합니다. 중복 제거, 가독성 향상, 성능 최적화 등을 진행하세요.' }
]

const planningBenefits = [
  { title: '의존성 파악', body: '코드베이스 전체를 분석하여 영향받는 부분을 식별합니다' },
  { title: '리스크 평가', body: '잠재적 문제점과 해결 방안을 미리 고민합니다' },
  { title: '단계별 로드맵', body: '작업을 관리 가능한 단위로 나누어 순서를 정합니다' },
  { title: '사용자 승인', body: '계획을 검토하고 승인한 후 실행으로 전환합니다' }
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
  <PartLayout part-id="part1" v-slot="{ active }">
    <!-- Multi-instance -->
    <div v-show="active === 'multiinstance'">
      <TopicHead title="Multi-instance 병렬 개발" sub="동시에 여러 작업을 병렬로 처리하여 개발 속도를 획기적으로 향상시킵니다" />

      <h3 class="section-title">핵심 개념</h3>
      <p class="prose-ko">
        여러 터미널 세션에서 독립적인 Claude 인스턴스를 실행하면, 각각 별도의 컨텍스트를 유지하면서
        서로 다른 작업을 동시에 수행할 수 있습니다. 이를 통해:
      </p>
      <ol class="mt-6 grid gap-3 sm:grid-cols-3">
        <li v-for="(t, i) in ['API 엔드포인트 개발', '해당 API의 테스트 코드 작성', '데이터베이스 마이그레이션 작업']" :key="t" class="rounded-xl bg-mod px-4 py-4 text-alpha">
          <span class="legend text-enter">터미널 {{ i + 1 }}</span>
          <span class="mt-2 block text-[15px] font-semibold leading-snug">{{ t }}</span>
        </li>
      </ol>

      <CodeBlock :code="multiInstanceExample" label="Multi-instance 예제" />

      <Tip label="Pro Tip">
        각 터미널은 독립적인 컨텍스트를 가지므로,
        한 터미널에서의 변경사항이 다른 터미널의 Claude에게 자동으로 전달되지 않습니다.
        필요시 명시적으로 파일 변경사항을 언급하세요.
      </Tip>
    </div>

    <!-- TDD -->
    <div v-show="active === 'tdd'">
      <TopicHead title="TDD 워크플로우" sub="테스트 주도 개발로 버그를 미리 방지하고 코드 품질을 높입니다" />

      <ol class="spec sm:grid-cols-2">
        <li v-for="(step, i) in tddSteps" :key="step.title">
          <h4 class="flex items-center gap-2.5">
            <span class="key key-mod legend h-7 w-7 !text-[12px] text-enter [--travel:2px]">{{ i + 1 }}</span>
            {{ step.title }}
          </h4>
          <p class="mt-2">{{ step.body }}</p>
        </li>
      </ol>

      <CodeBlock :code="tddExample" label="TDD 워크플로우 예제" />

      <Tip label="Best Practice">
        TDD는 API 개발, 비즈니스 로직 구현,
        유틸리티 함수 작성 등 거의 모든 상황에서 활용할 수 있습니다.
        Claude와 함께라면 테스트 작성도 빠르고 쉬워집니다!
      </Tip>
    </div>

    <!-- Conventions -->
    <div v-show="active === 'conventions'">
      <TopicHead title="Conventions (claude.md)" sub="프로젝트 규칙을 명확히 정의하여 일관된 코드 품질을 유지합니다" />

      <h3 class="section-title">claude.md 파일이란?</h3>
      <p class="prose-ko">
        프로젝트 루트에 <code class="inline-code">claude.md</code> 파일을 생성하면,
        Claude는 자동으로 이 파일을 읽고 프로젝트의 코딩 컨벤션, 아키텍처 패턴,
        베스트 프랙티스를 학습합니다.
      </p>

      <div class="spec mt-8 sm:grid-cols-3">
        <div>
          <h4>프로젝트 구조</h4>
          <p>디렉토리 구조와 각 폴더의 역할 정의</p>
        </div>
        <div>
          <h4>코딩 규칙</h4>
          <p>에러 핸들링, 네이밍, 포맷팅 규칙</p>
        </div>
        <div>
          <h4>API 설계 원칙</h4>
          <p>RESTful 규칙, 응답 형식 등</p>
        </div>
      </div>

      <CodeBlock :code="claudeMdExample" label="claude.md 파일 예제" />

      <Tip label="팀 협업 Tip">
        claude.md를 git에 커밋하면 팀 전체가 동일한 기준으로
        Claude를 활용할 수 있습니다. 새로운 팀원도 빠르게 프로젝트 규칙을 익힐 수 있어요!
      </Tip>
    </div>

    <!-- Planning -->
    <div v-show="active === 'planning'">
      <TopicHead title="Planning Mode" sub="큰 작업을 시작하기 전에 체계적인 계획을 수립합니다" />

      <h3 class="section-title">Planning Mode가 필요한 이유</h3>
      <p class="prose-ko">
        복잡한 리팩토링, 아키텍처 변경, 대규모 기능 추가 등의 작업은 바로 실행하기보다는
        먼저 계획을 세우고 검토하는 것이 중요합니다. Planning Mode를 사용하면:
      </p>

      <div class="spec mt-8 sm:grid-cols-2">
        <div v-for="item in planningBenefits" :key="item.title">
          <h4 class="flex items-center gap-2">
            <svg aria-hidden="true" viewBox="0 0 16 16" class="h-4 w-4 text-mod" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 8.5 3 3 7-7" /></svg>
            {{ item.title }}
          </h4>
          <p>{{ item.body }}</p>
        </div>
      </div>

      <CodeBlock :code="planningExample" label="Planning Mode 사용 예제" />

      <Tip label="주의" tone="warn">
        Planning Mode는 큰 작업에만 사용하세요.
        간단한 버그 수정이나 작은 기능 추가에는 바로 실행하는 것이 더 효율적입니다.
      </Tip>
    </div>
  </PartLayout>
</template>
