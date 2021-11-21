<template>
  <section class="v-login">
    <form @submit.prevent="submit" class="v-login__form">
      <div class="v-login__formcontainer">
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
          :is-loading="isLoading"
        ></BaseButton>
        <br>
        <router-link to="/register">Don't have an account yet? Register here.</router-link>
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
import { useGlobalStore } from '../store/globalStore';

const username = ref('')
const password = ref('')
const isLoading = ref()

const authStore = useAuthStore()
const globalStore = useGlobalStore()

const submit = () => {
  isLoading.value = true

  authStore.loginUser({
    username: username.value, 
    password: password.value
  })

  if (authStore.currentUser) {
    globalStore.pushNotification({
      message: 'Successful login. Redirecting..',
      type: 'success'
    })
  } 
  
  else {
    globalStore.pushNotification({
      message: 'Incorrect username / password.',
      type: 'error'
    })
  }

  isLoading.value = false
}
</script>

<style lang="scss" scoped>
@use '../styles/abstracts' as abs;
.v-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  min-height: 100vh;
  background-color: abs.$warm-grey-300;

  &__form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__formcontainer {
    background-color: abs.$warm-grey-500;
    padding: 3rem;
  }

  &__background {
    background: url('../assets/backgrounds/1-vertical-original.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>