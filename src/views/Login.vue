<template>
  <section class="v-login">
    <form @submit.prevent="submit" class="v-login__form">
      <div class="v-login__formcontainer">
        <h1 class="t-heading-primary mb-2">Login</h1>
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
          class="w-full"
          :isLoading="isLoading"
        ></BaseButton>
        <hr class="v-login__divider"/>
        <router-link class="v-login__link" to="/register">Don't have an account yet? Register here.</router-link>
      </div>
    </form>
    <div class="v-login__background"></div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormInput from '../components/FormInput.vue'
import BaseButton from '../components/BaseButton.vue'
import { useAuthStore } from '../store/authStore'
import { useGlobalStore } from '../store/globalStore'
import { delay } from '../utils/utils'

const username = ref('')
const password = ref('')
const isLoading = ref(false)

const authStore = useAuthStore()
const globalStore = useGlobalStore()

const submit = async () => {
  isLoading.value = true

  // Simulate waiting..
  await delay(1500)

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

defineExpose({
  isLoading
})

</script>

<style lang="scss" scoped>
@use '../styles/abstracts' as abs;
.v-login {
  display: grid;
  grid-template-columns: 6fr 4.5fr;
  grid-template-rows: auto;
  min-height: 100vh;
  color: white;
  text-align: left;
  background-color: abs.$warm-grey-700;
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

  &__form {
    display: flex;
    align-items: center;
    justify-content: center;
    color: abs.$warm-grey-100;
  }

  &__formcontainer {
    background-color: rgba(abs.$warm-grey-600, .85);
    padding: 3.5rem;
  }

  &__divider {
    background: rgba(255, 255, 255, 0.1);
    width: 70%;
    margin: 1.25rem auto 1rem auto;
  }

  &__link {
    color: white;

    &:hover,
    &:active {
      color: abs.$red-200;
    }
  }

  &__background {
    background: url('../assets/backgrounds/1-vertical-original.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>