import { onUnmounted, ref } from 'vue'

export function useClipboard() {
  const state = ref<'idle' | 'copying' | 'success' | 'error'>('idle')
  const message = ref('')
  const manualText = ref('')
  let attempt = 0
  let disposed = false

  function reset() {
    attempt += 1
    state.value = 'idle'
    message.value = ''
    manualText.value = ''
  }

  async function copy(text: string): Promise<boolean> {
    const current = ++attempt
    manualText.value = ''
    state.value = 'copying'
    message.value = '正在复制…'
    try {
      if (!text.trim()) throw new Error('Empty clipboard content')
      if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(text)
      if (disposed || current !== attempt) return false
      state.value = 'success'
      message.value = '已复制完整文本。'
      return true
    } catch {
      if (disposed || current !== attempt) return false
      state.value = 'error'
      manualText.value = text
      message.value = '自动复制未成功。请在下方选中文本后手动复制（Ctrl/Cmd + C，手机可长按）。'
      return false
    }
  }

  onUnmounted(() => { disposed = true; attempt += 1 })
  return { state, message, manualText, copy, reset }
}
