<template>
  <section class="v-registration">
    <div class="v-registration__background"></div>
    <form @submit.prevent="submit" class="v-registration__form">
      <div class="flex flex-col items-center">
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
        ></BaseButton>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import FormInput from '../components/FormInput.vue';
import BaseButton from '../components/BaseButton.vue'
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const registrationDetails = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  name: ''
})

const submit = () => {
  authStore.registerUser({
    username: registrationDetails.username, 
    password: registrationDetails.password,
    name: registrationDetails.name
  })
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.v-registration {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  min-height: 100vh;

  &__form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__background {
    background: url('../assets/backgrounds/3-vertical-original.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>