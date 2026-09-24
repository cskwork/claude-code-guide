// Copy text with the async Clipboard API, falling back to a hidden textarea
// for insecure contexts or browsers that reject clipboard access.
// Resolves true on success, false when both routes fail (caller shows the error state).
export async function copyText(text, doc = globalThis.document, nav = globalThis.navigator) {
  try {
    if (nav && nav.clipboard && typeof nav.clipboard.writeText === 'function') {
      await nav.clipboard.writeText(text)
      return true
    }
  } catch {
    /* fall through to the legacy route */
  }
  if (!doc || !doc.body) return false
  const area = doc.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  area.style.pointerEvents = 'none'
  doc.body.appendChild(area)
  area.select()
  let ok = false
  try {
    ok = typeof doc.execCommand === 'function' && doc.execCommand('copy')
  } catch {
    ok = false
  }
  doc.body.removeChild(area)
  return Boolean(ok)
}
