import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Part1 from '../views/Part1.vue'
import Part2 from '../views/Part2.vue'
import Part3 from '../views/Part3.vue'
import Part4 from '../views/Part4.vue'
import NotFound from '../views/NotFound.vue'
import { SITE_NAME } from '../data/curriculum.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/part1',
    name: 'Part1',
    component: Part1,
    meta: { title: 'Part 1: 기본 워크플로우' }
  },
  {
    path: '/part2',
    name: 'Part2',
    component: Part2,
    meta: { title: 'Part 2: 고급 통합' }
  },
  {
    path: '/part3',
    name: 'Part3',
    component: Part3,
    meta: { title: 'Part 3: 확장 기능' }
  },
  {
    path: '/part4',
    name: 'Part4',
    component: Part4,
    meta: { title: 'Part 4: 팀 워크플로우' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '페이지를 찾을 수 없습니다' }
  }
]

// Hashes on part pages name topics, not elements: switching topics must not jump the page.
export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition
  if (from && to.path === from.path) return false
  return { top: 0 }
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · ${SITE_NAME}` : `${SITE_NAME} · 백엔드 개발자를 위한 Claude Code 가이드`
})

export default router
