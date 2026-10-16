<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed, onMounted, ref, watch } from 'vue'

type GoatCounter = {
  count?: (options: { path: string; title: string }) => void
}

declare global {
  interface Window {
    goatcounter?: GoatCounter
  }
}

const COUNTER_ENDPOINT = 'https://konglong87.goatcounter.com'
const route = useRoute()
const status = ref<'loading' | 'ready' | 'unavailable'>('loading')
const count = ref('')
let activeController: AbortController | null = null

function currentPath() {
  return decodeURI(window.location.pathname || '/')
}

function trackCurrentPage() {
  const counter = window.goatcounter
  if (typeof counter?.count !== 'function') return false
  counter.count({ path: currentPath(), title: document.title })
  return true
}

function trackWhenReady() {
  if (trackCurrentPage()) return
  const startedAt = Date.now()
  const timer = window.setInterval(() => {
    if (trackCurrentPage() || Date.now() - startedAt > 10000) {
      window.clearInterval(timer)
    }
  }, 50)
}

async function loadCount() {
  activeController?.abort()
  const controller = new AbortController()
  activeController = controller
  status.value = 'loading'

  try {
    const path = currentPath()
    const response = await fetch(
      `${COUNTER_ENDPOINT}/counter/${encodeURIComponent(path)}.json`,
      { credentials: 'omit', signal: controller.signal }
    )
    const data = await response.json()
    const nextCount = data.count ?? data.count_unique
    // GoatCounter returns HTTP 404 with a JSON count of 0 for paths without history.
    if (nextCount === undefined || (!response.ok && response.status !== 404)) {
      throw new Error(`GoatCounter responded with ${response.status}`)
    }
    count.value = String(nextCount)
    status.value = 'ready'
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return
    status.value = 'unavailable'
  }
}

const label = computed(() => {
  if (status.value === 'ready') return `访问量 ${count.value}`
  if (status.value === 'unavailable') return '访问量暂不可用'
  return '访问量统计中…'
})

onMounted(() => {
  loadCount()
  trackWhenReady()
  watch(() => route.path, () => {
    loadCount()
    trackWhenReady()
  })
})
</script>

<template>
  <span class="anything-ai-view-count" :data-state="status" aria-live="polite">
    {{ label }}
  </span>
</template>
