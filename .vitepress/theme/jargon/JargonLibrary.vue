<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import catalog from './catalog.json'
import { exportCollection } from '../../../scripts/jargon/prompt-core.mjs'
import JargonCard from './JargonCard.vue'
import JargonComposer from './JargonComposer.vue'
import CopyPanel from './CopyPanel.vue'
import { useSelection } from './selection'
import { COMPOSER_ID, DOWNLOAD_MIME, KIND_LABELS, type PromptCatalog, type SelectionResult } from './types'
import './jargon.css'

const props = withDefaults(defineProps<{ domain?: string }>(), { domain: '' })
const data = catalog as PromptCatalog
const PAGE_SIZE = 12
const DOWNLOAD_REVOKE_DELAY = 1000
const query = ref('')
const domain = ref(props.domain)
const kind = ref('')
const visibleCount = ref(PAGE_SIZE)
const downloadNotice = ref('')
const downloadFailed = ref(false)
const lastAttempt = ref<{ id: string; result: SelectionResult } | null>(null)
const selection = useSelection(data.items)
const { selectedItems, feedback, storageNotice } = selection
const activeDomains = computed(() => data.domains.filter((item) => item.count > 0))
const kinds = computed(() => [...new Set(data.items.map((item) => item.kind))])
const searchIndex = new Map(data.items.map((item) => [item.id, [
  item.title, item.description, item.whenToUse, item.domainTitle, item.subdomainTitle, ...item.aliases,
].join(' ').toLocaleLowerCase()]))
const filteredItems = computed(() => {
  const terms = query.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
  return data.items.filter((item) => (!domain.value || item.domainId === domain.value)
    && (!kind.value || item.kind === kind.value)
    && terms.every((term) => searchIndex.get(item.id)?.includes(term)))
})
const visibleItems = computed(() => filteredItems.value.slice(0, visibleCount.value))
const activeDomain = computed(() => data.domains.find((item) => item.id === domain.value))
const collectionText = computed(() => filteredItems.value.length ? exportCollection(filteredItems.value) : '')
const hasFilters = computed(() => Boolean(query.value || domain.value || kind.value))

watch([query, domain, kind], () => { visibleCount.value = PAGE_SIZE; downloadNotice.value = '' })
watch(() => props.domain, (value) => { domain.value = value })

function addToSelection(id: string) {
  lastAttempt.value = { id, result: selection.add(id) }
}

function resetFilters() {
  query.value = ''
  domain.value = ''
  kind.value = ''
}

function downloadCollection() {
  if (!collectionText.value || typeof document === 'undefined') return
  let url: string | undefined
  let link: HTMLAnchorElement | undefined
  try {
    url = URL.createObjectURL(new Blob(['\uFEFF', collectionText.value], { type: DOWNLOAD_MIME }))
    link = document.createElement('a')
    link.href = url
    link.download = `jargon-${domain.value || 'all'}-${kind.value || 'all'}-${filteredItems.value.length}.txt`
    document.body.appendChild(link)
    link.click()
    downloadFailed.value = false
    downloadNotice.value = `已发起下载，共 ${filteredItems.value.length} 条；请查看浏览器下载列表。`
  } catch {
    downloadFailed.value = true
    downloadNotice.value = '未能发起下载，请使用「复制当前合集」或下方合集预览手动保存。'
  } finally {
    link?.remove()
    if (url) setTimeout(() => URL.revokeObjectURL(url!), DOWNLOAD_REVOKE_DELAY)
  }
}
</script>

<template>
  <div class="jargon-ui jargon-library" data-testid="jargon-library">
    <header class="jargon-library-intro">
      <p class="jargon-eyebrow">FEELING → JARGON</p>
      <h2>把模糊的感觉，变成能执行的提示词。</h2>
      <p>先找场景，再看拆解。填写必要参数，直接复制；需要更完整的指令时，把互补模块加入组合。</p>
      <div class="jargon-stats" aria-label="提示词库概览">
        <span><strong>{{ data.items.length }}</strong> 条可阅读内容</span>
        <span><strong>{{ activeDomains.length }}</strong> 个可用领域</span>
        <span><strong>{{ data.stats.templates }}</strong> 个结构化模板</span>
      </div>
    </header>

    <section class="jargon-filters" aria-label="搜索与分类" data-testid="jargon-filters">
      <div class="jargon-search-row">
        <div class="jargon-field jargon-search-field">
          <label for="jargon-search">用你的话找场景</label>
          <input id="jargon-search" v-model="query" type="search" placeholder="搜索标题、白话描述或别名…" data-testid="jargon-search" autocomplete="off" />
        </div>
        <div class="jargon-field jargon-kind-field">
          <label for="jargon-kind">内容类型</label>
          <select id="jargon-kind" v-model="kind" data-testid="jargon-kind">
            <option value="">全部类型</option>
            <option v-for="value in kinds" :key="value" :value="value">{{ KIND_LABELS[value] || value }}</option>
          </select>
        </div>
      </div>
      <div class="jargon-domain-filters" role="group" aria-label="按领域筛选">
        <button class="jargon-filter" type="button" :aria-pressed="!domain" data-testid="jargon-domain-all" @click="domain = ''">全部 <span>{{ data.items.length }}</span></button>
        <button
          v-for="item in activeDomains" :key="item.id" class="jargon-filter" type="button"
          :aria-pressed="domain === item.id" data-testid="jargon-domain" :data-domain-id="item.id" @click="domain = item.id"
        >{{ item.title }} <span>{{ item.count }}</span></button>
      </div>
      <p v-if="activeDomain?.description" class="jargon-domain-description">{{ activeDomain.description }}</p>
    </section>

    <div class="jargon-results-heading">
      <p role="status" aria-live="polite" aria-atomic="true" data-testid="jargon-result-count">找到 <strong>{{ filteredItems.length }}</strong> 条内容<template v-if="activeDomain"> · {{ activeDomain.title }}</template></p>
      <div class="jargon-inline-actions">
        <button v-if="hasFilters" class="jargon-button jargon-button--small" type="button" data-testid="jargon-reset" @click="resetFilters">重置筛选</button>
        <a class="jargon-text-link" :href="`#${COMPOSER_ID}`" data-testid="jargon-selection-link">我的组合（{{ selectedItems.length }}）<span aria-hidden="true"> ↓</span></a>
      </div>
    </div>
    <p class="jargon-selection-feedback" role="status" aria-live="polite" aria-atomic="true" data-testid="jargon-selection-feedback">{{ feedback }}</p>
    <p v-if="storageNotice" class="jargon-notice" role="status">{{ storageNotice }}</p>

    <div v-if="filteredItems.length" class="jargon-card-grid" data-testid="jargon-results">
      <JargonCard
        v-for="item in visibleItems" :key="item.id" :item="item" :selected="selection.has(item.id)"
        :feedback="lastAttempt?.id === item.id ? lastAttempt.result.message : undefined"
        :feedback-error="lastAttempt?.id === item.id && !lastAttempt.result.ok" @add="addToSelection"
      />
    </div>
    <div v-else class="jargon-empty" data-testid="jargon-no-results">
      <h3>暂时没有匹配的场景</h3>
      <p>试试更短的关键词，或换一种白话描述。也可以清除筛选，从分类开始找。</p>
      <button class="jargon-button" type="button" data-testid="jargon-empty-reset" @click="resetFilters">重置，查看全部内容</button>
    </div>
    <div v-if="visibleCount < filteredItems.length" class="jargon-load-more">
      <button class="jargon-button" type="button" data-testid="jargon-load-more" @click="visibleCount += PAGE_SIZE">再看 {{ Math.min(PAGE_SIZE, filteredItems.length - visibleCount) }} 条</button>
      <span class="jargon-muted">已展示 {{ visibleItems.length }} / {{ filteredItems.length }}</span>
    </div>

    <section class="jargon-collection" aria-labelledby="jargon-collection-title">
      <div class="jargon-section-heading">
        <div>
          <p class="jargon-eyebrow">分类收藏</p>
          <h2 id="jargon-collection-title">把当前合集带走</h2>
        </div>
        <span class="jargon-count" data-testid="jargon-collection-count">{{ filteredItems.length }} 条</span>
      </div>
      <p class="jargon-muted">按当前领域、类型与关键词导出全部匹配内容，不受「再看更多」影响。各条保持独立分隔，适合收藏学习，不建议当成一个任务发送给 AI。</p>
      <div class="jargon-collection-actions">
        <CopyPanel :text="collectionText" label="复制当前合集" test-id="jargon-copy-collection" :disabled="!filteredItems.length" />
        <button class="jargon-button" type="button" data-testid="jargon-download-collection" :disabled="!filteredItems.length" @click="downloadCollection">下载 TXT</button>
      </div>
      <p class="jargon-download-feedback" :class="{ 'jargon-error': downloadFailed }" role="status" aria-live="polite" data-testid="jargon-download-status">{{ downloadNotice }}</p>
      <details v-if="filteredItems.length" class="jargon-disclosure" data-testid="jargon-collection-disclosure">
        <summary>阅读当前合集预览</summary>
        <pre class="jargon-preview jargon-preview--compact" tabindex="0" aria-label="当前分类合集全文" data-testid="jargon-collection-preview">{{ collectionText }}</pre>
      </details>
    </section>

    <JargonComposer :items="selectedItems" @remove="selection.remove" @clear="selection.clear" />
    <p class="jargon-provenance">来源固定版本：<code>{{ data.source.commit.slice(0, 12) }}</code>。草稿与旧版聚合内容不计入本列表；参考项可阅读复制，但不能加入执行组合；请结合原文与使用提示判断适用范围。</p>
  </div>
</template>
