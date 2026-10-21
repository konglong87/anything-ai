<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useClipboard } from './useClipboard'

const props = withDefaults(defineProps<{
  text: string
  label?: string
  testId: string
  disabled?: boolean
}>(), { label: '复制完整提示词', disabled: false })
const { state, message, manualText, copy, reset } = useClipboard()
const fallback = ref<HTMLTextAreaElement | null>(null)

watch(() => props.text, reset)

async function handleCopy() {
  if (props.disabled || state.value === 'copying') return
  if (await copy(props.text)) return
  await nextTick()
  fallback.value?.focus()
  fallback.value?.select()
}
</script>

<template>
  <div class="jargon-copy" :data-testid="`${testId}-control`">
    <button
      class="jargon-button jargon-button--primary" type="button"
      :data-testid="testId" :disabled="disabled || !text || state === 'copying'"
      :aria-busy="state === 'copying'" @click="handleCopy"
    >{{ state === 'copying' ? '正在复制…' : state === 'success' ? '已复制' : label }}</button>
    <p
      class="jargon-copy-feedback" :class="{ 'jargon-error': state === 'error' }"
      role="status" aria-live="polite" aria-atomic="true" :data-testid="`${testId}-status`"
    >{{ message }}</p>
    <div v-if="state === 'error'" class="jargon-manual-copy">
      <label :for="`${testId}-manual`">手动复制完整文本</label>
      <textarea
        :id="`${testId}-manual`" ref="fallback" :value="manualText" readonly rows="8"
        :data-testid="`${testId}-manual`" spellcheck="false"
      />
      <button class="jargon-button" type="button" @click="fallback?.focus(); fallback?.select()">全选文本</button>
    </div>
  </div>
</template>
