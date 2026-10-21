import { computed, onMounted, readonly, ref } from 'vue'
import { checkSelection, MAX_SELECTION } from '../../../scripts/jargon/prompt-core.mjs'
import { SELECTION_STORAGE_KEY, type PromptItem, type SelectionResult } from './types'

function createSelection(items: readonly PromptItem[]) {
  const byId = new Map(items.map((item) => [item.id, item]))
  const ids = ref<string[]>([])
  const feedback = ref('')
  const storageNotice = ref('')
  const selectedItems = computed(() => ids.value.flatMap((id) => {
    const item = byId.get(id)
    return item ? [item] : []
  }))
  let restored = false

  function persist() {
    if (typeof window === 'undefined') return
    try {
      if (ids.value.length) window.sessionStorage.setItem(SELECTION_STORAGE_KEY, JSON.stringify(ids.value))
      else window.sessionStorage.removeItem(SELECTION_STORAGE_KEY)
    } catch {
      storageNotice.value = '浏览器暂不允许保存选择；本页仍可使用，刷新后选择可能丢失。'
    }
  }

  function restore() {
    if (restored || typeof window === 'undefined') return
    restored = true
    try {
      const saved = window.sessionStorage.getItem(SELECTION_STORAGE_KEY)
      if (!saved) return
      const parsed: unknown = JSON.parse(saved)
      const savedIds = Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
      const valid: PromptItem[] = []
      for (const id of [...new Set(savedIds)]) {
        const item = byId.get(id)
        if (item && valid.length < MAX_SELECTION && checkSelection([...valid, item]).ok) valid.push(item)
      }
      ids.value = valid.map((item) => item.id)
      if (valid.length !== savedIds.length) feedback.value = '已恢复有效选择；失效或不兼容的条目已移除。'
      persist()
    } catch {
      // A malformed value should not prevent the library from loading.
      ids.value = []
      persist()
      storageNotice.value = '未能恢复上次选择，请重新添加；提示词库仍可正常使用。'
    }
  }

  function add(id: string): SelectionResult {
    const item = byId.get(id)
    if (!item) return report({ ok: false, message: '这条提示词已不可用，请刷新目录后重试。' })
    if (ids.value.includes(id)) return report({ ok: true, message: `「${item.title}」已在组合中。` })
    const result: SelectionResult = checkSelection([...selectedItems.value, item])
    if (!result.ok) return report(result)
    ids.value = [...ids.value, id]
    persist()
    return report({ ok: true, message: `已加入「${item.title}」，当前 ${ids.value.length} / ${MAX_SELECTION} 条。` })
  }

  function report(result: SelectionResult) {
    feedback.value = result.message
    return result
  }

  function remove(id: string) {
    const item = byId.get(id)
    ids.value = ids.value.filter((selected) => selected !== id)
    persist()
    feedback.value = item ? `已移除「${item.title}」。` : '已移除该条提示词。'
  }

  function clear() {
    ids.value = []
    persist()
    feedback.value = '已清空组合。'
  }

  return {
    ids: readonly(ids), selectedItems, feedback: readonly(feedback), storageNotice: readonly(storageNotice),
    restore, add, remove, clear, has: (id: string) => ids.value.includes(id),
  }
}

let clientSelection: ReturnType<typeof createSelection> | undefined

export function useSelection(items: readonly PromptItem[]) {
  // Never share reactive selection state across server-rendered requests.
  const selection = typeof window === 'undefined'
    ? createSelection(items)
    : (clientSelection ??= createSelection(items))
  onMounted(selection.restore)
  return selection
}
