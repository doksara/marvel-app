<template>
  <div
    class="c-notification-item"
    role="alert"
    aria-live="assertive"
    :class="notificationStyle"
  >
    <font-awesome-icon
      class="c-notification-item__icon"
      size="1x"
      :icon="iconStyle"
    />
    <p class="c-notification__message">
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

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useGlobalStore } from '../store/globalStore';

const globalStore = useGlobalStore()
const timeout = ref()

export interface NotificationItemProps {
  id: string
  message: string
  type: 'success' | 'warning' | 'info' | 'error'
}

const props = defineProps<NotificationItemProps>()


onMounted(() => {
  timeout.value = setTimeout(() => {
    dismissNotification(props.id);
  }, 3000);
})

onUnmounted(() => {
  clearTimeout(timeout.value);
})

const dismissNotification = (id: string) => {
  globalStore.dismissNotification(id)
}


const notificationStyle = computed(() => {
  return {
    'c-notification-item--success': props.type === 'success',
    'c-notification-item--warning': props.type === 'warning',
    'c-notification-item--info': props.type === 'info',
    'c-notification-item--error': props.type === 'error',
  };
})

const iconStyle = computed(() => {
  switch (props.type) {
    case 'success':
      return 'check-circle';
    case 'warning':
      return 'exclamation-circle';
    case 'info':
      return 'info-circle';
    case 'error':
      return 'exclamation-triangle';
    default:
      return 'info-circle';
  }
}) 
</script>

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