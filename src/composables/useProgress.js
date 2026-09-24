import { reactive, readonly } from 'vue'
import { parts, topicKey, totalTopics } from '../data/curriculum.js'

export const STORAGE_KEY = 'ccg:progress:v1'

const validKeys = new Set(parts.flatMap((p) => p.topics.map((t) => topicKey(p.id, t.id))))

// Parse whatever is in storage into a clean state; unknown or corrupt data is dropped.
export function parseProgress(raw) {
  const empty = { done: [], last: null }
  if (!raw) return empty
  let data
  try {
    data = JSON.parse(raw)
  } catch {
    return empty
  }
  if (!data || typeof data !== 'object') return empty
  const done = Array.isArray(data.done) ? [...new Set(data.done.filter((k) => validKeys.has(k)))] : []
  const last = data.last && validKeys.has(topicKey(data.last.part, data.last.topic))
    ? { part: data.last.part, topic: data.last.topic }
    : null
  return { done, last }
}

function safeStorage() {
  try {
    const s = globalThis.localStorage
    const probe = '__ccg_probe__'
    s.setItem(probe, '1')
    s.removeItem(probe)
    return s
  } catch {
    return null // private mode or blocked storage: progress works for this visit only
  }
}

export function createProgressStore(storage = safeStorage()) {
  const state = reactive(parseProgress(storage ? storage.getItem(STORAGE_KEY) : null))

  function persist() {
    if (!storage) return
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify({ done: state.done, last: state.last }))
    } catch {
      /* quota or blocked storage: keep in-memory state */
    }
  }

  function isDone(partId, topicId) {
    return state.done.includes(topicKey(partId, topicId))
  }

  function setDone(partId, topicId, value) {
    const key = topicKey(partId, topicId)
    if (!validKeys.has(key)) return
    const has = state.done.includes(key)
    if (value && !has) state.done.push(key)
    if (!value && has) state.done.splice(state.done.indexOf(key), 1)
    persist()
  }

  function toggleDone(partId, topicId) {
    setDone(partId, topicId, !isDone(partId, topicId))
  }

  function visit(partId, topicId) {
    if (!validKeys.has(topicKey(partId, topicId))) return
    state.last = { part: partId, topic: topicId }
    persist()
  }

  function doneInPart(partId) {
    return state.done.filter((k) => k.startsWith(partId + '/')).length
  }

  function doneTotal() {
    return state.done.length
  }

  function reset() {
    state.done.splice(0)
    state.last = null
    persist()
  }

  return {
    state: readonly(state),
    persistent: Boolean(storage),
    isDone,
    setDone,
    toggleDone,
    visit,
    doneInPart,
    doneTotal,
    total: totalTopics,
    reset
  }
}

let store
export function useProgress() {
  if (!store) store = createProgressStore()
  return store
}
