import { describe, it, expect } from 'vitest'
import { createProgressStore, parseProgress, STORAGE_KEY } from '../src/composables/useProgress.js'

function memoryStorage(initial = {}) {
  const data = { ...initial }
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = String(v) },
    removeItem: (k) => { delete data[k] },
    data
  }
}

describe('parseProgress', () => {
  it('returns an empty state for missing or corrupt data', () => {
    expect(parseProgress(null)).toEqual({ done: [], last: null })
    expect(parseProgress('{not json')).toEqual({ done: [], last: null })
    expect(parseProgress('42')).toEqual({ done: [], last: null })
  })

  it('drops unknown topics and duplicates', () => {
    const raw = JSON.stringify({ done: ['part1/tdd', 'part1/tdd', 'part9/nope'], last: { part: 'part2', topic: 'ghost' } })
    expect(parseProgress(raw)).toEqual({ done: ['part1/tdd'], last: null })
  })
})

describe('progress store', () => {
  it('persists done topics and the last visited topic', () => {
    const storage = memoryStorage()
    const store = createProgressStore(storage)
    store.toggleDone('part1', 'tdd')
    store.visit('part3', 'log')
    expect(store.isDone('part1', 'tdd')).toBe(true)
    expect(store.doneInPart('part1')).toBe(1)
    expect(JSON.parse(storage.data[STORAGE_KEY])).toEqual({ done: ['part1/tdd'], last: { part: 'part3', topic: 'log' } })

    const reloaded = createProgressStore(storage)
    expect(reloaded.isDone('part1', 'tdd')).toBe(true)
    expect(reloaded.state.last).toEqual({ part: 'part3', topic: 'log' })
  })

  it('toggles off and ignores invalid topics', () => {
    const store = createProgressStore(memoryStorage())
    store.toggleDone('part2', 'mcp')
    store.toggleDone('part2', 'mcp')
    store.setDone('part2', 'bogus', true)
    store.visit('part5', 'x')
    expect(store.doneTotal()).toBe(0)
    expect(store.state.last).toBeNull()
  })

  it('keeps working in memory when storage is unavailable or throws', () => {
    const noStore = createProgressStore(null)
    noStore.toggleDone('part4', 'rag')
    expect(noStore.persistent).toBe(false)
    expect(noStore.isDone('part4', 'rag')).toBe(true)

    const throwing = { getItem: () => null, setItem: () => { throw new Error('quota') }, removeItem: () => {} }
    const store = createProgressStore(throwing)
    expect(() => store.toggleDone('part4', 'hooks')).not.toThrow()
    expect(store.isDone('part4', 'hooks')).toBe(true)
  })

  it('reset clears everything', () => {
    const store = createProgressStore(memoryStorage())
    store.toggleDone('part1', 'planning')
    store.visit('part1', 'planning')
    store.reset()
    expect(store.doneTotal()).toBe(0)
    expect(store.state.last).toBeNull()
  })
})
