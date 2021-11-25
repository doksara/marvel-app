<template>
  <div class="container mx-auto px-48 pb-10">
    <div class="v-checkout">
    <form @submit.prevent="submit" class="v-login__form">
      <h2 class="t-heading-secondary">Checkout</h2>
      <hr class="v-checkout__divider"/>
        <FormInput 
          id="Full name"
          label="Username"
          class="mb-4"
        />
        <FormInput 
          id="password"
          label="Password"
          type="password"
          class="mb-4"
        />
        <BaseButton 
          text="Sign In"
          type="submit"
          class="w-full"
        ></BaseButton>
    </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormInput from '../components/FormInput.vue';

const submit = () => {
  
}

</script>

<style lang="scss">
@use '../styles/abstracts' as abs;

.v-checkout {
  padding: 2rem;
  margin-right: 1em;
  background: white;
  border-radius: abs.$border-radius-sm;
  box-shadow: abs.$box-shadow-sm;
  width: 70%;

  &__divider {
    background: rgba(255, 255, 255, 0.1);
    margin: 1rem auto;
  }
}
</style>

