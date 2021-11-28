<script setup lang="ts">
import { NotificationItemProps } from '../interfaces'
import NotificationItem from './NotificationItem.vue'

// Types
interface Props {
  list: Array<NotificationItemProps>
}

// Props
const props = withDefaults(defineProps<Props>(), {
  list: undefined
})
</script>

<template>
  <div class="c-notification-list">
    <transition-group name="list" tag="p">
      <NotificationItem
        v-for="item in props.list"
        :id="item.id"
        :key="item.id"
        :message="item.message"
        :type="item.type"
      />
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/abstracts' as abs;

.c-notification-list {
  position: fixed;
  bottom: 0;
  right: abs.$spacing-md;
  min-width: 320px;
}
</style>