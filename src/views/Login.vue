<template>
  <section class="v-login">
    <form @submit.prevent="submit" class="v-login__form">
      <div class="flex flex-col items-center">
        <h1 class="t-heading-primary">Login</h1>
        <FormInput 
          id="username"
          label="Username"
          class="mb-4"
          v-model="username"
        />
        <FormInput 
          id="password"
          label="Password"
          type="password"
          class="mb-4"
          v-model="password"
        />
        <BaseButton 
          text="Sign In"
          type="submit"
        ></BaseButton>
      </div>
    </form>
    <div class="v-login__background"></div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormInput from '../components/FormInput.vue';
import BaseButton from '../components/BaseButton.vue'
import { useAuthStore } from '../store/authStore';

const username = ref('')
const password = ref('')
const authStore = useAuthStore()

const submit = () => {
  authStore.loginUser({
    username: username.value, 
    password: password.value
  })
}
</script>

<style lang="scss" scoped>
.v-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 10px;
  height: 100%;

  &__form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__background {
    background: url('../assets/backgrounds/1-vertical-original.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>