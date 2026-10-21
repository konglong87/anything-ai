<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import catalog from './catalog.json'
import { renderPrompt } from '../../../scripts/jargon/prompt-core.mjs'
import CopyPanel from './CopyPanel.vue'
import PromptFields from './PromptFields.vue'
import { useSelection } from './selection'
import { COMPOSER_ID, KIND_LABELS, LIBRARY_PATH, type PromptCatalog } from './types'
import './jargon.css'

const props = defineProps<{ id: string }>()
const data = catalog as PromptCatalog
const item = computed(() => data.items.find((entry) => entry.id === props.id))
const values = ref<Record<string, string>>({})
const selection = useSelection(data.items)
const { feedback, storageNotice, selectedItems } = selection
const preview = computed(() => item.value ? renderPrompt(item.value, values.value) : '')
const remainingFields = computed(() => item.value?.fields.filter((field) => !values.value[field.key]?.trim()).length || 0)
const composerPath = withBase(`${LIBRARY_PATH}#${COMPOSER_ID}`)

watch(item, (entry) => {
  values.value = Object.fromEntries((entry?.choices || []).map((choice) => [choice.key, choice.options[0]?.value || '']))
}, { immediate: true })
</script>

<template>
  <div class="jargon-ui jargon-prompt" data-testid="jargon-prompt" :data-item-id="id">
    <template v-if="item">
      <div class="jargon-prompt-breadcrumb">
        <a :href="withBase(LIBRARY_PATH)">返回提示词库</a>
        <span aria-hidden="true">/</span><span>{{ item.domainTitle }}</span>
      </div>
      <div class="jargon-card-meta">
        <span class="jargon-badge">{{ KIND_LABELS[item.kind] || item.kind }}</span>
        <span v-if="item.status === 'reference'" class="jargon-badge jargon-badge--warning" data-testid="jargon-reference-status">待核验 / 待确认</span>
        <span v-if="item.provider" class="jargon-muted">适用工具：{{ item.provider }}</span>
      </div>
      <p class="jargon-prompt-description">{{ item.description }}</p>
      <div v-if="item.whenToUse" class="jargon-use-case"><strong>什么时候用</strong><p>{{ item.whenToUse }}</p></div>
      <aside v-if="item.warnings.length || item.status === 'reference'" class="jargon-notice" aria-label="使用前请注意" data-testid="jargon-warnings">
        <strong>使用前请注意</strong>
        <p v-if="item.status === 'reference'">这份内容尚待核验或确认，可以单独阅读和复制，但不能加入执行组合。请先核实适用边界，勿把参考内容当作已验证结论。</p>
        <ul v-if="item.warnings.length"><li v-for="warning in item.warnings" :key="warning">{{ warning }}</li></ul>
      </aside>

      <section v-if="item.fields.length || item.choices.length" class="jargon-parameters" aria-labelledby="jargon-parameters-title">
        <p class="jargon-eyebrow">01 · 带入你的需求</p>
        <h2 id="jargon-parameters-title">填写场景参数</h2>
        <p class="jargon-muted">填写内容仅在当前页面使用，不写入浏览器存储。留空时保留明确的「待填写」标记。</p>
        <PromptFields :item="item" v-model:values="values" prefix="jargon" />
      </section>

      <section class="jargon-prompt-output" aria-labelledby="jargon-preview-title">
        <p class="jargon-eyebrow">02 · 看懂之后，再复制</p>
        <div class="jargon-preview-heading"><h2 id="jargon-preview-title">完整提示词</h2><span class="jargon-muted">实时预览 · 原样复制</span></div>
        <p class="jargon-field-hint" role="status" aria-live="polite" data-testid="jargon-remaining-fields">{{ remainingFields ? `还有 ${remainingFields} 项参数待填写；可以先复制，再补充。` : '场景参数已填写；请核对约束和适用边界。' }}</p>
        <pre class="jargon-preview" tabindex="0" aria-label="可直接复制的完整提示词" data-testid="jargon-prompt-preview">{{ preview }}</pre>
        <CopyPanel :text="preview" test-id="jargon-copy-prompt" />
      </section>

      <section class="jargon-add-section" aria-label="加入组合">
        <div class="jargon-inline-actions">
          <button
            type="button" class="jargon-button" data-testid="jargon-prompt-add"
            :disabled="item.status === 'reference' || selection.has(item.id)" :aria-pressed="selection.has(item.id)"
            :aria-describedby="item.status === 'reference' ? 'jargon-reference-reason' : 'jargon-selection-hint'"
            @click="selection.add(item.id)"
          >{{ item.status === 'reference' ? '参考内容 · 不参与组合' : selection.has(item.id) ? '已加入组合' : '加入我的组合' }}</button>
          <a class="jargon-text-link" :href="composerPath" data-testid="jargon-view-combination">前往组合区（{{ selectedItems.length }}）<span aria-hidden="true"> →</span></a>
        </div>
        <p v-if="item.status === 'reference'" id="jargon-reference-reason" class="jargon-field-hint">待核验或待确认的资料不能用于执行组合，请先单独核实。</p>
        <p v-else id="jargon-selection-hint" class="jargon-field-hint">加入组合只保存模块选择，当前填写的参数不会同步。你可以在组合区重新设置参数与单选项，或用上方按钮复制当前版本。</p>
        <p class="jargon-selection-feedback" role="status" aria-live="polite" aria-atomic="true" data-testid="jargon-selection-feedback">{{ feedback }}</p>
        <p v-if="storageNotice" class="jargon-notice" role="status">{{ storageNotice }}</p>
      </section>

      <details class="jargon-source jargon-disclosure" data-testid="jargon-source">
        <summary>来源与版本</summary>
        <dl>
          <dt>源文件</dt><dd><a :href="item.sourceUrl" target="_blank" rel="noopener noreferrer">{{ item.sourcePath }} <span class="jargon-sr-only">（在新标签页打开）</span></a></dd>
          <dt>固定提交</dt><dd><code>{{ data.source.commit }}</code></dd>
          <template v-if="data.source.license"><dt>许可证</dt><dd>{{ data.source.license }}</dd></template>
        </dl>
        <p v-if="item.sourceFiles.length" class="jargon-muted">本条内容展开以下来源文件，阅读与复制不需要访问本机路径：</p>
        <ul v-if="item.sourceFiles.length"><li v-for="file in item.sourceFiles" :key="file"><code>{{ file }}</code></li></ul>
      </details>
    </template>
    <div v-else class="jargon-empty" data-testid="jargon-prompt-not-found">
      <h2>没有找到这条提示词</h2>
      <p>它可能已被更新或移除，请返回提示词库查找。</p>
      <a class="jargon-button" :href="withBase(LIBRARY_PATH)">返回提示词库</a>
    </div>
  </div>
</template>
