import { describe, it, expect } from 'vitest'
import { parts, resolveTopic, neighbours, totalTopics } from '../src/data/curriculum.js'
import { copyText } from '../src/composables/copyText.js'

describe('curriculum', () => {
  it('has four parts with four topics each and unique topic ids per part', () => {
    expect(parts).toHaveLength(4)
    expect(totalTopics).toBe(16)
    for (const p of parts) {
      expect(new Set(p.topics.map((t) => t.id)).size).toBe(p.topics.length)
    }
  })

  it('resolves a URL hash to a topic, falling back to the first topic', () => {
    const part2 = parts[1]
    expect(resolveTopic(part2, '#commit')).toBe('commit')
    expect(resolveTopic(part2, '')).toBe('mcp')
    expect(resolveTopic(part2, '#unknown')).toBe('mcp')
  })

  it('links parts in order', () => {
    expect(neighbours('part1').prev).toBeNull()
    expect(neighbours('part1').next.id).toBe('part2')
    expect(neighbours('part4').next).toBeNull()
  })
})

describe('copyText', () => {
  it('uses the async clipboard when available', async () => {
    let written
    const ok = await copyText('hello', null, { clipboard: { writeText: async (t) => { written = t } } })
    expect(ok).toBe(true)
    expect(written).toBe('hello')
  })

  it('reports failure when clipboard rejects and no document fallback exists', async () => {
    const ok = await copyText('x', null, { clipboard: { writeText: async () => { throw new Error('denied') } } })
    expect(ok).toBe(false)
  })

  it('falls back to a hidden textarea and execCommand when the clipboard API is missing', async () => {
    const doc = fakeDocument(() => true)
    const ok = await copyText('npm test', doc, {})
    expect(ok).toBe(true)
    expect(doc.copied).toBe('npm test')
    expect(doc.body.children).toHaveLength(0)
  })

  it('cleans up and reports failure when execCommand throws', async () => {
    const doc = fakeDocument(() => { throw new Error('blocked') })
    const ok = await copyText('x', doc, { clipboard: { writeText: async () => { throw new Error('denied') } } })
    expect(ok).toBe(false)
    expect(doc.body.children).toHaveLength(0)
  })
})

// Minimal document stand-in: records what was selected when "copy" runs.
function fakeDocument(exec) {
  const doc = {
    copied: null,
    body: {
      children: [],
      appendChild(el) { this.children.push(el) },
      removeChild(el) { this.children.splice(this.children.indexOf(el), 1) }
    },
    createElement() {
      return { value: '', style: {}, setAttribute() {}, select() { doc.selected = this.value } }
    },
    execCommand(cmd) {
      const ok = exec()
      if (cmd === 'copy' && ok) doc.copied = doc.selected
      return ok
    }
  }
  return doc
}
