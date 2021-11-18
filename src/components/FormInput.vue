<template>
  <div class="c-input">
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
        @input="updateValue"
      />
    </div>
  </div>
</template>
 
<script setup lang="ts">
// Types
type InputType = 'text' | 'number' | 'email' | 'tel' | 'password'

// Props
interface Props {
  id: string
  label: string
  placeholder?: string
  disabled?: boolean
  focused?: boolean
  type?: InputType
  modelValue?: string | number
}

// Defaults
const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  label: undefined,
  placeholder: undefined,
  disabled: false,
  focused: false,
  type: 'text',
  modelValue: undefined
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: any) => {
  emit('update:modelValue', event.target.value)
}
</script>

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
    font-size: abs.$font-size-md;
    font-weight: 500;
    flex-shrink: 0;
    margin-right: abs.$spacing-lg;
  }

  &__field {
    display: block;
    position: relative;
    border-radius: 4px;
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