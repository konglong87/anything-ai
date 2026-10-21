<script setup lang="ts">
import { TASK_FIELD_KEY, type PromptItem } from './types'

const props = withDefaults(defineProps<{
  item: PromptItem
  values: Record<string, string>
  prefix: string
  inheritedTask?: string
}>(), { inheritedTask: '' })
const emit = defineEmits<{ 'update:values': [values: Record<string, string>] }>()

function update(key: string, event: Event) {
  const next = { ...props.values }
  const value = (event.target as HTMLInputElement).value
  // An empty module task means inherit the unified goal, not override it.
  if (key === TASK_FIELD_KEY && !value.trim()) delete next[key]
  else next[key] = value
  emit('update:values', next)
}
</script>

<template>
  <div class="jargon-form-fields" data-testid="jargon-parameter-form" :data-item-id="item.id">
    <div class="jargon-field-grid">
      <div v-for="field in item.fields" :key="field.key" class="jargon-field">
        <label :for="`${prefix}-param-${field.key}`">{{ field.label }}</label>
        <textarea
          :id="`${prefix}-param-${field.key}`" :value="values[field.key] || ''" @input="update(field.key, $event)"
          :placeholder="field.key === TASK_FIELD_KEY && inheritedTask ? '留空时使用本次统一目标' : field.placeholder"
          :aria-describedby="field.key === TASK_FIELD_KEY && inheritedTask ? `${prefix}-task-inheritance` : undefined"
          rows="2" data-testid="jargon-field" :data-field-key="field.key" autocomplete="off"
        />
        <p v-if="field.key === TASK_FIELD_KEY && inheritedTask" :id="`${prefix}-task-inheritance`" class="jargon-field-hint">留空时继承统一目标：{{ inheritedTask }}</p>
      </div>
    </div>
    <fieldset v-for="choice in item.choices" :key="choice.key" class="jargon-choice">
      <legend>{{ choice.label }}</legend>
      <label class="jargon-sr-only" :for="`${prefix}-choice-${choice.key}`">{{ choice.label }}</label>
      <select
        :id="`${prefix}-choice-${choice.key}`" :value="values[choice.key] ?? choice.options[0]?.value"
        @change="update(choice.key, $event)" data-testid="jargon-choice" :data-choice-key="choice.key"
        :aria-describedby="`${prefix}-choice-${choice.key}-hint`"
      ><option v-for="option in choice.options" :key="option.value" :value="option.value">{{ option.label }}</option></select>
      <p :id="`${prefix}-choice-${choice.key}-hint`" class="jargon-field-hint">
        单选，默认「{{ choice.options[0]?.label }}」。当前选择：<strong data-testid="jargon-choice-current">{{ choice.options.find((option) => option.value === (values[choice.key] ?? choice.options[0]?.value))?.label }}</strong>；只会复制当前选项的约束。
      </p>
    </fieldset>
  </div>
</template>
