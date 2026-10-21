<script setup lang="ts">
import { withBase } from 'vitepress'
import { KIND_LABELS, type PromptItem } from './types'

defineProps<{ item: PromptItem; selected: boolean; feedback?: string; feedbackError?: boolean }>()
defineEmits<{ add: [id: string] }>()
</script>

<template>
  <article class="jargon-card" data-testid="jargon-card" :data-item-id="item.id">
    <div class="jargon-card-meta">
      <span class="jargon-badge">{{ KIND_LABELS[item.kind] || item.kind }}</span>
      <span v-if="item.status === 'reference'" class="jargon-badge jargon-badge--warning">参考内容</span>
      <span v-if="item.provider" class="jargon-muted">{{ item.provider }}</span>
    </div>
    <h3><a :href="withBase(item.detailPath)" data-testid="jargon-detail-link">{{ item.title }}</a></h3>
    <p class="jargon-card-category">{{ item.domainTitle }}<template v-if="item.subdomainTitle"> / {{ item.subdomainTitle }}</template></p>
    <p class="jargon-card-description">{{ item.description }}</p>
    <p v-if="item.whenToUse" class="jargon-card-use"><strong>适合这样问</strong>{{ item.whenToUse }}</p>
    <p v-if="item.warnings.length" class="jargon-card-warning">含 {{ item.warnings.length }} 条使用提示，请先阅读场景详情。</p>
    <p v-if="item.status === 'reference'" class="jargon-field-hint">待核验或待确认，可单独阅读复制，不加入执行组合。</p>
    <div class="jargon-card-actions">
      <a class="jargon-text-link" :href="withBase(item.detailPath)">填写并复制 <span aria-hidden="true">→</span></a>
      <button
        class="jargon-button jargon-button--small" type="button" data-testid="jargon-add"
        :data-item-id="item.id" :aria-label="`${item.status === 'reference' ? '仅供参考，不能加入执行组合' : selected ? '已加入' : '加入组合'}：${item.title}`"
        :aria-pressed="selected" :disabled="selected || item.status === 'reference'" @click="$emit('add', item.id)"
      >{{ item.status === 'reference' ? '仅供参考' : selected ? '已加入' : '加入组合' }}</button>
    </div>
    <p v-if="feedback" class="jargon-field-hint" :class="{ 'jargon-error': feedbackError }" data-testid="jargon-card-feedback">{{ feedback }}</p>
  </article>
</template>
