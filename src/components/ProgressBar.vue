<script setup lang="ts">
import ProgressBarStep from './ProgressBarStep.vue'

// Props
interface Props {
  steps: Array<string>
  currentStep: number
}

// Defaults
const props = defineProps<Props>()
</script>

<template>
  <div role="progressbar" class="c-progress-bar">
    <ProgressBarStep
      v-for="(stepTitle, stepIndex) in steps"
      :key="stepIndex"
      :title="stepTitle"
      :index="stepIndex + 1"
      :currentStep="currentStep"
    />
  </div>
</template>

<style lang="scss">
@use '../styles/abstracts' as abs;

.c-progress-bar {
  display: inline-flex;
  flex-direction: column;
  
  &__step {
    position: relative;
    display: flex;
    align-items: center;
    color: abs.$warm-grey-300;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }

    &:not(:last-child) .c-progress-bar__border::after {
      position: absolute;
      bottom: calc(-2rem - 6px);
      left: 50%;
      transform: translateX(-50%);
      content: "";
      display: inline-block;

      width: 2px;
      height: calc(2rem + 4px);
      background-color: abs.$red-500;
      background-position: center;
    }

    /* ------ States ------ */

    &--active {
      color: abs.$red-500;

      .c-progress-bar__icon {
        width: 1.5rem;
        height: 1.5rem;
      }

      .c-progress-bar__text {
        
      }
    }

    &--finished {
      
      .c-progress-bar__icon {
        color: #fff;
      }

      .c-progress-bar__border {
        border-color: abs.$red-500;
        background-color: abs.$red-500;
      }
    }
  }


  &__border {
    display: block;
    position: relative;
    border-radius: 50%;
    border: 2px solid currentColor;
    background: #fff;
    
    width: 2.5rem;
    height: 2.5rem;
  }

  &__icon {
    @include abs.absolute-center(xy);
    width: 1em;
    height: 1em;
    fill: currentColor;
    
    transition: color .5s ease;
  }

  &__icontext {
    @include abs.absolute-center(xy);

    font-size: 1.25rem;
    font-weight: bold;
    transition: color .5s ease;
  }

  &__text {
    transform: translateX(calc(-50% + 1.25rem));
    
    max-width: 15ch;
    font-family: inherit;
    font-size: .875rem;
    font-weight: 300;
    text-transform: uppercase;
    text-align: center;
    color: currentColor;
    transition: all .5s ease;
  }
}
</style>