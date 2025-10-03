import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Part1 from '../views/Part1.vue'
import Part2 from '../views/Part2.vue'
import Part3 from '../views/Part3.vue'
import Part4 from '../views/Part4.vue'

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
    meta: { title: '기본 워크플로우' }
  },
  {
    path: '/part2',
    name: 'Part2',
    component: Part2,
    meta: { title: '고급 통합' }
  },
  {
    path: '/part3',
    name: 'Part3',
    component: Part3,
    meta: { title: '확장 기능' }
  },
  {
    path: '/part4',
    name: 'Part4',
    component: Part4,
    meta: { title: '팀 워크플로우' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
