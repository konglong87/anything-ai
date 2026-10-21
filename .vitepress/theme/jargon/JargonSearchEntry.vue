<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, withBase } from 'vitepress'
import discovery from './discovery.json'
import { buildSearchHref, GUIDE_PATH, HOME_EXAMPLES, LIBRARY_PATH, QUERY_LIMIT, SEARCH_ANCHOR, SEARCH_SHORTCUTS } from '../../../scripts/jargon/search-state.mjs'
import './search-entry.css'

const query = ref('')
const router = useRouter()
function submit() { void router.go(withBase(buildSearchHref({ query: query.value }))) }
</script>

<template>
  <section class="prompt-search-entry" aria-labelledby="prompt-search-title" data-testid="home-prompt-search">
    <div class="prompt-entry-heading">
      <p class="prompt-entry-eyebrow">提示词搜索与组合</p>
      <h2 id="prompt-search-title">把你的想法，变成能直接使用的提示词。</h2>
      <p id="prompt-search-hint">不用先懂专业术语，用自己的话描述需求。找到场景，填写参数，直接复制。</p>
    </div>
    <form class="prompt-entry-form" role="search" aria-label="查找提示词" method="get" :action="`${withBase(LIBRARY_PATH)}#${SEARCH_ANCHOR}`" @submit.prevent="submit">
      <label class="prompt-entry-label" for="home-prompt-query">你想做什么？</label>
      <div class="prompt-entry-input-row">
        <input id="home-prompt-query" v-model="query" name="q" type="search" :maxlength="QUERY_LIMIT" placeholder="例如：简洁大方的后台界面" aria-describedby="prompt-search-hint" data-testid="home-prompt-query" autocomplete="off" />
        <button type="submit" data-testid="home-prompt-submit">找提示词 <span aria-hidden="true">→</span></button>
      </div>
    </form>
    <div class="prompt-entry-examples" aria-label="提示词搜索示例">
      <span>试试</span>
      <a v-for="word in HOME_EXAMPLES" :key="word" :href="withBase(buildSearchHref({ query: word }))" data-testid="home-prompt-example">{{ word }}</a>
    </div>
    <p class="prompt-entry-stats" data-testid="home-prompt-stats">{{ discovery.total }} 条内容 <span aria-hidden="true">·</span> {{ discovery.domains.length }} 个可用领域 <span aria-hidden="true">·</span> 支持填写、复制与组合</p>
    <nav class="prompt-entry-shortcuts" aria-label="按需求查找提示词">
      <a v-for="shortcut in SEARCH_SHORTCUTS" :key="shortcut.label" :href="withBase(buildSearchHref(shortcut))" data-testid="home-prompt-shortcut">{{ shortcut.label }} <span aria-hidden="true">↗</span></a>
    </nav>
    <div class="prompt-entry-footer">
      <a :href="withBase(buildSearchHref())" data-testid="home-prompt-browse">按领域浏览 <span aria-hidden="true">→</span></a>
      <a :href="withBase(GUIDE_PATH)">查看使用方法</a>
      <span>找文章与教程？请用顶部「站内搜索」。</span>
    </div>
  </section>
</template>
