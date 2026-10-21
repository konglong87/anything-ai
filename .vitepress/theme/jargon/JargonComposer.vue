<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import { checkSelection, composePrompts, MAX_SELECTION } from '../../../scripts/jargon/prompt-core.mjs'
import CopyPanel from './CopyPanel.vue'
import PromptFields from './PromptFields.vue'
import { COMPOSER_ID, type PromptItem } from './types'

const props = defineProps<{ items: PromptItem[] }>()
const emit = defineEmits<{ remove: [id: string]; clear: [] }>()
const goal = ref('')
// User-supplied text and option values stay in this component's memory only.
const moduleValues = ref<Record<string, Record<string, string>>>({})
const validation = computed(() => props.items.length ? checkSelection(props.items, moduleValues.value) : { ok: false, message: '' })
const preview = computed(() => validation.value.ok
  ? composePrompts(props.items, { ...moduleValues.value, goal: goal.value })
  : '')

watch(() => props.items.map((item) => item.id), () => {
  moduleValues.value = Object.fromEntries(props.items.map((item) => [item.id, moduleValues.value[item.id]
    || Object.fromEntries(item.choices.map((choice) => [choice.key, choice.options[0]?.value || '']))]))
}, { immediate: true })

function clear() {
  goal.value = ''
  moduleValues.value = {}
  emit('clear')
}
</script>

<template>
  <section :id="COMPOSER_ID" class="jargon-composer" aria-labelledby="jargon-composer-title" data-testid="jargon-composer">
    <div class="jargon-section-heading">
      <div>
        <p class="jargon-eyebrow">自由组合 · 明确边界</p>
        <h2 id="jargon-composer-title">我的提示词组合 <span class="jargon-count">{{ items.length }} / {{ MAX_SELECTION }}</span></h2>
      </div>
      <button v-if="items.length" type="button" class="jargon-button" data-testid="jargon-clear-selection" @click="clear">清空组合</button>
    </div>
    <p class="jargon-muted">同一领域内组合互补模块；互斥方向和不兼容工具不能混用。只在当前标签页保存选择，不保存你输入的目标或参数。</p>
    <div v-if="!items.length" class="jargon-composer-empty" data-testid="jargon-composer-empty">
      <strong>先选一个你想解决的问题</strong>
      <p>点击场景卡片的「加入组合」，再补充这次任务的目标。</p>
    </div>
    <template v-else>
      <div class="jargon-field jargon-goal-field">
        <label for="jargon-goal">这次想完成什么？<span class="jargon-muted">选填</span></label>
        <textarea id="jargon-goal" v-model="goal" data-testid="jargon-goal" rows="3" placeholder="描述交付物、目标用户与需要满足的约束…" aria-describedby="jargon-goal-hint" />
        <p id="jargon-goal-hint" class="jargon-field-hint">展开下面的模块，可分别填写参数并调整单选项；未单独填写的任务目标继承此处的统一目标。所有编辑仅保留到本页离开或刷新为止。</p>
      </div>
      <ol class="jargon-selection-list" data-testid="jargon-selection-list">
        <li v-for="(item, index) in items" :key="item.id" :data-item-id="item.id">
          <div class="jargon-selection-row">
            <span class="jargon-selection-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="jargon-selection-title">
              <a :href="withBase(item.detailPath)">{{ item.title }}</a>
              <span class="jargon-muted">{{ item.subdomainTitle || item.domainTitle }}</span>
            </div>
            <button class="jargon-button jargon-button--small" type="button" data-testid="jargon-remove" :aria-label="`移除：${item.title}`" @click="emit('remove', item.id)">移除</button>
          </div>
          <details v-if="item.fields.length || item.choices.length" class="jargon-module-fields" data-testid="jargon-module-editor" :data-item-id="item.id">
            <summary>调整参数与单选项 <span class="jargon-muted">{{ item.fields.length + item.choices.length }} 项</span></summary>
            <PromptFields :item="item" v-model:values="moduleValues[item.id]" :prefix="`compose-${item.id}`" :inherited-task="goal.trim()" />
          </details>
        </li>
      </ol>
      <p v-if="!validation.ok" role="alert" class="jargon-notice jargon-error" data-testid="jargon-combination-conflict">{{ validation.message }}</p>
      <template v-else>
        <div class="jargon-preview-heading"><h3>组合预览</h3><span class="jargon-muted">复制内容与预览一致</span></div>
        <pre class="jargon-preview" tabindex="0" aria-label="组合后的完整提示词" data-testid="jargon-composer-preview">{{ preview }}</pre>
        <CopyPanel :text="preview" label="复制组合提示词" test-id="jargon-copy-combination" />
      </template>
    </template>
  </section>
</template>
