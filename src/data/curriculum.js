// Single source of truth for the four-part path.
// Nav, home roadmap, topic keys, pager, page titles and progress all read from here.

export const parts = [
  {
    id: 'part1',
    n: 1,
    path: '/part1',
    title: '기본 워크플로우',
    lede: 'Claude Code의 핵심 기능을 마스터하여 개발 생산성을 극대화하세요',
    summary: 'Multi-instance 병렬 개발, TDD 워크플로우, Planning Mode 활용',
    topics: [
      { id: 'multiinstance', title: 'Multi-instance 병렬 개발', summary: '여러 터미널에서 독립적인 Claude 인스턴스를 실행하여 동시에 여러 작업을 수행합니다.' },
      { id: 'tdd', title: 'TDD 워크플로우', summary: '테스트를 먼저 작성하고, Claude가 테스트를 통과하는 코드를 생성하도록 합니다.' },
      { id: 'conventions', title: 'Conventions (claude.md)', summary: 'claude.md 파일로 코딩 컨벤션과 프로젝트 규칙을 정의합니다.' },
      { id: 'planning', title: 'Planning Mode', summary: '실행 전에 계획을 세우고 검토하는 Planning Mode를 활용합니다.' }
    ]
  },
  {
    id: 'part2',
    n: 2,
    path: '/part2',
    title: '고급 통합',
    lede: '외부 시스템과 연동하고 워크플로우를 자동화하여 더 강력한 개발 환경을 구축합니다',
    summary: 'MCP 통합, Screenshot/URL 컨텍스트 공유, 자동화된 커밋 생성',
    topics: [
      { id: 'mcp', title: 'MCP 통합', summary: '데이터베이스, GitHub, Slack 등 외부 시스템과 직접 연결' },
      { id: 'screenshot', title: 'Screenshot/URL 컨텍스트', summary: '이미지와 URL로 복잡한 정보를 빠르게 공유' },
      { id: 'checklist', title: '체크리스트 기반 마이그레이션', summary: '대규모 리팩토링을 체계적으로 관리' },
      { id: 'commit', title: '자동 커밋 & PR', summary: '커밋 메시지와 PR 설명을 자동으로 생성' }
    ]
  },
  {
    id: 'part3',
    n: 3,
    path: '/part3',
    title: '확장 기능',
    lede: 'Claude Code의 고급 기능으로 복잡한 문제를 해결하고 워크플로우를 최적화합니다',
    summary: 'Extended Thinking, Subagent 병렬 처리, 로그 분석, Headless Mode',
    topics: [
      { id: 'thinking', title: 'Extended Thinking', summary: '복잡한 문제에 더 많은 사고 시간을 할당' },
      { id: 'subagent', title: 'Subagent 병렬 처리', summary: '최대 10개의 독립적인 Claude 인스턴스 생성' },
      { id: 'log', title: '로그 분석', summary: '파이프로 로그를 실시간 분석' },
      { id: 'headless', title: 'Headless Mode', summary: 'CI/CD 파이프라인에 통합' }
    ]
  },
  {
    id: 'part4',
    n: 4,
    path: '/part4',
    title: '팀 워크플로우',
    lede: '팀 전체의 생산성을 높이는 표준화된 워크플로우를 구축합니다',
    summary: 'RAG 코드 검색, Slash Commands, Quality Hooks, 프로젝트 템플릿',
    topics: [
      { id: 'rag', title: 'RAG 코드 검색', summary: '의미론적 검색으로 대규모 코드베이스 효율적 탐색' },
      { id: 'slash', title: 'Slash Commands', summary: '팀 전용 커스텀 명령어로 워크플로우 표준화' },
      { id: 'hooks', title: 'Quality Hooks', summary: '코드 품질을 자동으로 관리하는 훅 시스템' },
      { id: 'template', title: '프로젝트 템플릿', summary: '재사용 가능한 프로젝트 구조로 빠른 시작' }
    ]
  }
]

export const SITE_NAME = 'Claude Code 마스터'
export const SOURCE_URL = 'https://memoryhub.tistory.com'

export const totalTopics = parts.reduce((sum, p) => sum + p.topics.length, 0)

export function getPart(id) {
  return parts.find((p) => p.id === id) || null
}

export function topicKey(partId, topicId) {
  return `${partId}/${topicId}`
}

// Resolve a URL hash ("#tdd") to a valid topic id of the part, else the first topic.
export function resolveTopic(part, hash) {
  const wanted = (hash || '').replace(/^#/, '')
  const match = part.topics.find((t) => t.id === wanted)
  return match ? match.id : part.topics[0].id
}

export function neighbours(partId) {
  const i = parts.findIndex((p) => p.id === partId)
  return { prev: i > 0 ? parts[i - 1] : null, next: i >= 0 && i < parts.length - 1 ? parts[i + 1] : null }
}
