<script setup lang="ts">
import { computed } from 'vue';

// Props
interface Props {
  index: number
  currentStep: number
  title: string
}

// Defaults
const props = defineProps<Props>()

// Local state and computed values
const isActive = computed(() => props.index === props.currentStep)
const isFinished = computed(() => props.index < props.currentStep)
const styleClasses = computed(() => {
  return {
    'c-progress-bar__step--active': isActive.value,
    'c-progress-bar__step--finished': isFinished.value,
  }
})
</script>

<template>
  <div class="c-progress-bar__step" :class="styleClasses">
    <span class="c-progress-bar__text">
      {{ title }}
    </span>
    <span class="c-progress-bar__border">
      <svg v-if="isFinished" class="c-progress-bar__icon mr-1">
        <use xlink:href="../assets/icons/symbol-defs.svg#icon-check" />
      </svg>
      <span v-else class="c-progress-bar__icontext">
        {{ index }}
      </span>
    </span>
  </div>
</template>
