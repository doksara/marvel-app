<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../store/authStore'
import { useGlobalStore } from '../store/globalStore'
import { delay } from '../utils/utils'
import { useRouter } from 'vue-router'
import BaseButton from '../components/BaseButton.vue'
import BaseLink from '../components/BaseLink.vue'
import FormInput from '../components/FormInput.vue'

const authStore = useAuthStore()
const globalStore = useGlobalStore()
const router = useRouter()

const username = ref('')
const password = ref('')
const isLoading = ref(false)

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

    router.push('/')
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
          :is-loading="isLoading"
        ></BaseButton>
        <hr class="v-login__divider"/>
        <BaseLink to="/register">Don't have an account yet? Register here.</BaseLink>
      </div>
    </form>
    <div class="v-login__background"></div>
  </section>
</template>

<style lang="scss" scoped>
@use '../styles/abstracts' as abs;

.v-login {
  display: grid;
  grid-template-columns: 6fr 4.5fr;
  grid-template-rows: auto;
  min-height: 100vh;
  text-align: left;
  background: #eee;

  &__form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__formcontainer {
    background-color: #fff;
    padding: 3.5rem;
    box-shadow: abs.$box-shadow-sm;
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