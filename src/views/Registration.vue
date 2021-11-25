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
          v-model="form.username"
          :validation="form.$validation.username"
        />
        <FormInput 
          id="password"
          label="Password"
          type="password"
          class="mb-4"
          v-model="form.password"
          :validation="form.$validation.password"
        />
        <FormInput 
          id="confirmPassword"
          label="Confirm password"
          type="password"
          class="mb-4"
          v-model="form.confirmPassword"
          :validation="form.$validation.confirmPassword"
        />
        <BaseButton 
          text="Register"
          type="submit"
          class="w-full"
          :is-loading="isLoading"
        ></BaseButton>
        <hr class="v-registration__divider"/>
        <BaseLink class="text-center" to="/login">Already have an account yet? Log in here.</BaseLink>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import FormInput from '../components/FormInput.vue';
import BaseButton from '../components/BaseButton.vue'
import BaseLink from '../components/BaseLink.vue';
import { ref } from 'vue'
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '../store/globalStore';
import { email, minLength, password, required, useValidation } from '../composables/validation';
import { delay } from '../utils/utils';

const authStore = useAuthStore()
const globalStore = useGlobalStore()
const router = useRouter()

const isLoading = ref(false)

// My form with validation rules
const form = useValidation({
  fullName: [required],
  username: [required, minLength(2)],
  password: [
    required,
    minLength(8),
    password,
  ],
  confirmPassword: [
    required,
    minLength(8),
    password,
  ],
  email: [required, email]
});

const submit = async () => {
  isLoading.value = true

  authStore.registerUser({
    fullName: form.fullName,
    username: form.username, 
    password: form.password,
    email: form.email
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
</script>

<style lang="scss" scoped>
@use '../styles/abstracts' as abs;
.v-registration {
  display: grid;
  grid-template-columns: 5fr 6fr;
  grid-template-rows: auto;
  min-height: 100vh;
  color: abs.$warm-grey-900;
  text-align: left;
  background: #eee;

  &__form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__formcontainer {
    width: 45%;
    background-color: white;
    padding: 3.5rem;
    box-shadow: abs.$box-shadow-sm;
  }
  
  &__divider {
    background: rgba(255, 255, 255, 0.1);
    width: 70%;
    margin: 1.25rem auto 1rem auto;
  }

  &__background {
    background: url('../assets/backgrounds/3-vertical-original.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>