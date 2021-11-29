<script setup lang="ts">
import { computed } from 'vue'

// Types
type BadgeStyle = 'info' | 'success' | 'warning' | 'error'

// Props
interface Props {
  text: string
  badgeStyle: BadgeStyle
}

// Defaults
const props = withDefaults(defineProps<Props>(), {
  text: '',
  badgeStyle: 'success',
})

// Local state and computed values
const styleClasses = computed(() => {
  return {
    'c-badge--info': props.badgeStyle === 'info',
    'c-badge--success': props.badgeStyle === 'success',
    'c-badge--warning': props.badgeStyle === 'warning',
    'c-badge--error': props.badgeStyle === 'error'
  }
}) 
</script>

<template>
  <span class="c-badge" :class="styleClasses">
    {{ text }}
  </span>
</template>

<style lang="scss" scoped>
@use '../styles/abstracts' as abs;

.c-badge {
  font-size: 0.85em;
  font-weight: 500;
  padding: 0.3em 1em;
  border-radius: 12px;
  min-width: 20ch;

  &--success {
    color: hsl(125, 86%, 14%);
    background: hsl(122, 42%, 75%);
    border-color: hsl(123, 35%, 51%);
  }

  &--warning {
    color: hsl(42, 86%, 17%);
    background: hsl(45, 86%, 81%);
    border-color: hsl(43, 89%, 70%);
  }

  &--info {
    color: hsl(205, 100%, 21%);
    background: hsl(205, 84%, 74%);
    border-color: hsl(205, 65%, 55%);
  }

  &--error {
    color: hsl(360, 92%, 20%);
    background: hsl(360, 77%, 78%);
    border-color: hsl(360, 64%, 55%);
  }
}

</style>
