<script setup lang="ts">
import { computed } from 'vue'

// Types
export type ButtonType = 'button' | 'reset' | 'submit'
export type ButtonStyle = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
export type ButtonSize = 'small' | 'medium' | 'large' | 'adaptive'

// Props
interface Props {
  text: string
  type?: ButtonType
  buttonStyle?: ButtonStyle
  size?: ButtonSize
  disabled?: boolean
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  text: undefined,
  type: 'button',
  buttonStyle: 'primary',
  size: 'medium',
  disabled: false,
  isLoading: false
})

const styleClasses = computed(() => {
  return {
    'c-btn--primary': props.buttonStyle === 'primary',
    'c-btn--secondary': props.buttonStyle === 'secondary',
    'c-btn--success': props.buttonStyle === 'success',
    'c-btn--small': props.size === 'small',
    'c-btn--medium': props.size === 'medium',
    'c-btn--large': props.size === 'large',
    'c-btn--adaptive': props.size === 'adaptive',
  };
})
</script>

<template>
  <button
    class="c-btn"
    :class="styleClasses"
    :type="props.type"
    :disabled="props.disabled || props.isLoading"
    :title="props.text"
  >
    <div class="c-btn__inner">
      <span v-if="props.text" class="c-btn__text">
        {{ text }}
      </span>
      <slot></slot>
      <svg v-if="props.isLoading" class="c-btn__spinner">
        <use xlink:href="../assets/icons/symbol-defs.svg#icon-spinner" />
      </svg>
    </div>
  </button>
</template>

<style lang="scss">
@use '../styles/abstracts' as abs;
 
.c-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
 
  padding: .35rem abs.$spacing-md;
  font-weight: 500;
  transition: all .3s ease;
  outline: none;

  border-radius: abs.$border-radius-sm;
  border-width: 1px;
  border-style: solid;
  color: abs.$warm-grey-050;

  &:disabled {
    color: abs.$warm-grey-050 !important;
    border-color: abs.$warm-grey-300 !important;
    background: abs.$warm-grey-300 !important;
  }
 
  &__inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;

    // Icon in slot
    & > svg {
      width: .9em;
      height: .9em;
      fill: currentColor;
      margin-left: .2em;
    }
  }

  &__spinner {
    width: 1rem;
    height: 1rem;
    fill: white;
    margin-left: .35rem;

    animation-name: spin;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 
  }
 
  &--primary {
    border-color: abs.$red-500;
    background: abs.$red-500;
 
    &:hover,
    &:active {
      color: abs.$red-900;
      border-color: abs.$red-500;
      background-color: abs.$red-100;
    }
  }
 
  &--secondary {
    border-color: abs.$warm-grey-500;
    background: abs.$warm-grey-500;
 
    &:hover,
    &:active {
      border-color: abs.$warm-grey-500;
      background: abs.$warm-grey-400;
    }
  }
 
  // Styles

  &--success {
    border-color: hsl(123, 35%, 51%);
    background: hsl(123, 35%, 51%);
    color: white;
    
    &:hover,
    &:active {
      border-color: hsl(123, 35%, 51%);
      background: hsl(122, 42%, 75%);
      color: hsl(125, 86%, 14%);
    }
  }

  // Sizes
 
  &--small {
    font-size: abs.$font-size-sm;
    padding: .35rem abs.$spacing-md;
  }
 
  &--medium {
    font-size: abs.$font-size-md;
    padding: 0.3rem 1.25rem;
  }
 
  &--large {
    font-size: 1.125rem;
    padding: 0.4rem 1.5rem;
  }
 
  &--adaptive {
    font-size: inherit;
  }

  @keyframes spin {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
}
}
</style>