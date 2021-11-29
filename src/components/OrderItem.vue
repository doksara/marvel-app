<script setup lang="ts">
import { Order } from '../interfaces'
import Badge from './Badge.vue'
import BaseButton from './BaseButton.vue';

// Props
interface Props {
  order: Order
}

// Defaults
const props = withDefaults(defineProps<Props>(), {
  order: undefined
})

// Emits
const emit = defineEmits(['cancelOrder'])
</script>

<template>
  <li class="c-order-item">
    <p class="c-order-item__entry">
      <span class="c-order-item__entry-label">Order ID</span>
      <span class="c-order-item__entry-value">{{ props.order.id }}</span>
    </p>
    <p class="c-order-item__entry">
      <span class="c-order-item__entry-label">Created at</span>
      <span class="c-order-item__entry-value">{{ props.order.createdAt }}</span>
    </p>
    <p class="c-order-item__entry">
      <span class="c-order-item__entry-label">Total price</span>
      <span class="c-order-item__entry-value">${{ props.order.totalPrice }}</span>
    </p>
    <Badge text="Pending" badge-style="warning" />
    <BaseButton 
      text="Cancel"
      type="button"
      @click="$emit('cancelOrder', props.order.id)"
    ></BaseButton>
  </li>
</template>

<style lang="scss">
@use '../styles/abstracts' as abs;

.c-order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.15rem;
  padding: .35em .75em;
  border: 1px solid abs.$warm-grey-200;
  border-radius: abs.$border-radius-sm;

  &__entry {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &-label {
      color: abs.$warm-grey-400;
    }

    &-value {
      color: abs.$warm-grey-900;
    }
  }

  &:not(:last-child) {
    margin-bottom: .5rem;
  }
}
</style>