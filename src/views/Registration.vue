<template>
  <section class="v-registration">
    <div class="v-registration__background"></div>
    <form @submit.prevent="submit" class="v-registration__form">
      <div class="v-registration__formcontainer">
        <h1 class="t-heading-primary">Registration</h1>
        <FormInput 
          id="username"
          label="Username"
          class="mb-4"
          v-model="registrationDetails.username"
        />
        <FormInput 
          id="password"
          label="Password"
          type="password"
          class="mb-4"
          v-model="registrationDetails.password"
        />
        <FormInput 
          id="confirmPassword"
          label="Confirm password"
          type="password"
          class="mb-4"
          v-model="registrationDetails.confirmPassword"
        />
        <BaseButton 
          text="Register"
          type="submit"
          class="w-full"
          :is-loading="isLoading"
        ></BaseButton>
        <hr class="v-registration__divider"/>
        <router-link class="v-registration__link" to="/login">Already have an account yet? Log in here.</router-link>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import FormInput from '../components/FormInput.vue';
import BaseButton from '../components/BaseButton.vue'
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';
import { delay } from '../utils/utils';
import { useGlobalStore } from '../store/globalStore';

const authStore = useAuthStore()
const globalStore = useGlobalStore()
const router = useRouter()

const isLoading = ref(false)
const registrationDetails = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  name: ''
})

const submit = async () => {
  if (registrationDetails.username !== '' && registrationDetails.password !== '' && registrationDetails.confirmPassword !== '') {
    isLoading.value = true
  
    authStore.registerUser({
      username: registrationDetails.username, 
      password: registrationDetails.password,
      name: registrationDetails.name
    })
  
    globalStore.pushNotification({
      message: 'Successful registration. Redirecting..',
      type: 'success'
    })
  
    // Simulate waiting..
    await delay(1500)

    isLoading.value = false
  
    router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
@use '../styles/abstracts' as abs;
.v-registration {
  display: grid;
  grid-template-columns: 5fr 6fr;
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
    background: url('../assets/backgrounds/3-vertical-original.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>