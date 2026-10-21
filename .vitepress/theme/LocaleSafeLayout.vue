<script setup lang="ts">
import { computed, provide } from 'vue'
import { dataSymbol, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ViewCount from './ViewCount.vue'

const data = useData()
const BaseLayout = DefaultTheme.Layout
// Jargon currently has Chinese originals only. Do not generate phantom English
// equivalents. Override per-layout injection, never the shared site singleton.
provide(dataSymbol, {
  ...data,
  theme: computed(() => data.page.value.relativePath.startsWith('prompts/jargon/')
    ? { ...data.theme.value, i18nRouting: false }
    : data.theme.value)
})
</script>

<template>
  <BaseLayout>
    <template #nav-bar-title-after><ViewCount /></template>
  </BaseLayout>
</template>
