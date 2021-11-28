<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useGlobalStore } from '../store/globalStore'

// Types
export interface NotificationItemProps {
  id: string
  message: string
  type: 'success' | 'info' | 'error'
}

// Props
const props = defineProps<NotificationItemProps>()

// Lifecycle methods
onMounted(() => {
  timeout.value = setTimeout(() => {
    dismissNotification(props.id)
  }, 3000)
})

onUnmounted(() => {
  clearTimeout(timeout.value)
})

// Composables and externals
const globalStore = useGlobalStore()

// Local state and computed 
const timeout = ref()
const notificationStyle = computed(() => {
  return {
    'c-notification-item--success': props.type === 'success',
    'c-notification-item--info': props.type === 'info',
    'c-notification-item--error': props.type === 'error',
  }
})

// Methods
const dismissNotification = (id: string) => {
  globalStore.dismissNotification(id)
}

</script>

<template>
  <div
    class="c-notification-item"
    role="alert"
    aria-live="assertive"
    :class="notificationStyle"
  >
    <svg class="c-notification-item__icon">
      <use v-if="props.type === 'success'" xlink:href="../assets/icons/symbol-defs.svg#icon-check-circle" />
      <use v-if="props.type === 'error'" xlink:href="../assets/icons/symbol-defs.svg#icon-x-circle" />
      <use v-if="props.type === 'info'" xlink:href="../assets/icons/symbol-defs.svg#icon-alert-circle" />
    </svg>
    <p class="c-notification-item__message">
      {{ props.message }}
    </p>
    <button
      class="c-notification-item__dismiss"
      type="button"
      aria-label="Dismiss notification"
      @click="dismissNotification(props.id)"
    >
      &times;
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/abstracts' as abs;
.c-notification-item {
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, .25);
  border-radius: abs.$border-radius-sm;
  border-width: 1px;
  border-style: solid;

  font-size: 1.125rem;
  padding: .65rem;  
  margin-bottom: abs.$spacing-md;

  &__icon {
    width: 1rem;
    height: 1rem;
    fill: currentColor;
    margin-right: abs.$spacing-sm;
  }

  &__dismiss {
    @include abs.default-button-appearance;
    cursor: pointer;

    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    line-height: 1;
    font-size: 32px;
    padding-left: abs.$spacing-md;
    margin-left: auto;
    margin-right: abs.$spacing-md;
  }

  &--success {
    color: hsl(125, 86%, 14%);
    background: hsl(122, 42%, 75%);
    border-color: hsl(123, 35%, 51%);
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