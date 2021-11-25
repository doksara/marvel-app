<script setup lang="ts">
import { computed, ref } from 'vue';
import { Validator } from '../composables/validation'

// Types
type InputType = 'text' | 'number' | 'email' | 'tel' | 'password'

// Props
interface Props {
  id: string
  label: string
  placeholder?: string
  disabled?: boolean
  type?: InputType
  modelValue?: string | number
  validation?: Validator
}

// Defaults
const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  label: undefined,
  placeholder: undefined,
  disabled: false,
  type: 'text',
  modelValue: undefined,
  validation: undefined
})

const showErrors = ref(false);
const isValid = computed(() => {
  if (!props.validation) {
    return true;
  }

  return !props.validation.errors;
})

const onInput = (event: any) => {
  showErrors.value = false;
  emit('update:modelValue', event.target.value)
}

const onBlur = (event: any) => {
  if (!props.validation) {
    return;
  }

  props.validation.validate();
  showErrors.value = !!props.validation.errors;
}

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="c-input" :class="{ 'c-input--error': !isValid }">
    <label class="c-input__label" :for="props.id">
      {{ props.label }}
    </label>
    <div class="c-input__body">
      <input
        class="c-input__field"
        :disabled="props.disabled"
        :type="props.type"
        :id="props.id"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        @input="onInput"
        @blur="onBlur"
      />
    <p
      class="text-sm text-red-600"
      v-if="showErrors"
    >
      {{ props.validation && props.validation.errors && props.validation.errors[0] }}
    </p>
    </div>
  </div>
</template>

<style lang="scss"> 
@use '../styles/abstracts' as abs;

.c-input {
  text-align: left;

  &__body {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__icon {
    @include abs.absolute-center(y);
    right: abs.$spacing-lg;

    font-size: 1.15em;
    color: abs.$red-500;
  }

  &__label {
    font-size: 1rem;
    font-weight: 500;
    flex-shrink: 0;
    margin-right: abs.$spacing-lg;
  }

  &__field {
    display: block;
    position: relative;
    border-radius: 2px;
    font-size: 1.15em;
    padding: .3rem;
    color: abs.$warm-grey-900;
    width: 100%;
    border: 1px solid rgba(#333, .3);
    background: white;
    text-indent: abs.$text-indent-md;

    &:focus {      
      outline: 2px solid abs.$yellow-vivid-400;
    }
  }

  &__note {
    display: block;
    text-align: right;
    color: abs.$red-500;
    font-size: abs.$font-size-sm;
    font-weight: 300;
    margin-top: abs.$spacing-xs;
  }

  &--error {
    .c-input__field {
      border: 1px solid abs.$red-500;
      background-color: abs.$red-100;
    }
  }
}
</style>