import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue'
import { buildSearchUrl, HISTORY_DELAY, NAVIGATION_EVENT, readSearchState, SEARCH_ANCHOR } from '../../../scripts/jargon/search-state.mjs'

type SearchRefs = { query: Ref<string>; domain: Ref<string>; kind: Ref<string> }
type Options = { domains: string[]; kinds: string[]; defaultDomain: string }

/** A small browser adapter; the shared URL codec remains framework-independent. */
export function useSearchUrl(state: SearchRefs, options: Options) {
  const currentUrl = ref('')
  let mountedPath = ''
  let restoring = false
  let ready = false
  let timer: ReturnType<typeof setTimeout> | undefined
  const cancel = () => { clearTimeout(timer); timer = undefined }
  function restore() {
    cancel()
    if (window.location.pathname !== mountedPath) return
    restoring = true
    const parsed = readSearchState(window.location.search, options)
    state.query.value = parsed.query
    state.domain.value = parsed.domain
    state.kind.value = parsed.kind
    currentUrl.value = buildSearchUrl(window.location.href, parsed, options, { hash: SEARCH_ANCHOR })
    restoring = false
  }
  function updateUrl() {
    if (!ready || restoring || window.location.pathname !== mountedPath) return
    const href = buildSearchUrl(window.location.href, {
      query: state.query.value, domain: state.domain.value, kind: state.kind.value,
    }, options, { hash: SEARCH_ANCHOR })
    if (href !== window.location.href) {
      if (timer) {
        // Write immediately, but coalesce one typing/filter burst into one history entry.
        window.history.replaceState({ ...window.history.state, scrollPosition: window.scrollY }, '', href)
      } else {
        window.history.replaceState({ ...window.history.state, scrollPosition: window.scrollY }, '')
        window.history.pushState({}, '', href)
      }
    }
    currentUrl.value = href
    cancel()
    timer = setTimeout(cancel, HISTORY_DELAY)
  }
  function commit() { updateUrl(); cancel() }
  watch([state.query, state.domain, state.kind], updateUrl, { flush: 'sync' })
  onMounted(() => {
    mountedPath = window.location.pathname
    restore()
    ready = true
    window.addEventListener('popstate', restore)
    window.addEventListener('hashchange', restore)
    window.addEventListener(NAVIGATION_EVENT, restore)
  })
  onUnmounted(() => {
    ready = false
    cancel()
    window.removeEventListener('popstate', restore)
    window.removeEventListener('hashchange', restore)
    window.removeEventListener(NAVIGATION_EVENT, restore)
  })
  return { currentUrl, commit }
}
