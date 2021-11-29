<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuthStore } from '../store/authStore'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '../store/globalStore'
import { email, minLength, password, required, sameAs, useValidation } from '../composables/validation'
import { delay } from '../utils/utils'
import FormInput from '../components/FormInput.vue'
import BaseButton from '../components/BaseButton.vue'
import BaseLink from '../components/BaseLink.vue'

// Composables and externals
const authStore = useAuthStore()
const globalStore = useGlobalStore()
const router = useRouter()

// Local state and computed values
const isLoading = ref(false)
const form = useValidation({
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
    sameAs("password"),
  ],
  email: [required, email]
})

const canSubmit = computed(() => form.$validation.valid)

// Methods
const submit = async () => {
  if (canSubmit.value) {
    isLoading.value = true
  
    authStore.registerUser({
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
  } else {
    // Execute validation of each individual form field
    Object.values(form.$validation)
      .filter(prop => typeof(prop) !== "boolean")
      .forEach(field => field.validate())
  }
}
</script>

<template>
  <section class="v-registration">
    <div class="v-registration__background"></div>
    <form @submit.prevent="submit" class="v-registration__form">
      <div class="v-registration__formcontainer">
        <h1 class="t-heading-primary">Registration</h1>
        <FormInput 
          id="username"
          label="Username"
          class="mb-3"
          v-model="form.username"
          :validation="form.$validation.username"
        />
        <FormInput 
          id="password"
          label="Password"
          type="password"
          class="mb-3"
          v-model="form.password"
          :validation="form.$validation.password"
        />
        <FormInput 
          id="confirmPassword"
          label="Confirm password"
          type="password"
          class="mb-3"
          v-model="form.confirmPassword"
          :validation="form.$validation.confirmPassword"
        />
        <FormInput 
          id="email"
          label="Email"
          class="mb-4"
          v-model="form.email"
          :validation="form.$validation.email"
        />
        <BaseButton 
          text="Register"
          type="submit"
          class="w-full"
          :is-loading="isLoading"
        ></BaseButton>
        <hr class="v-registration__divider"/>
        <div class="flex justify-center">
          <BaseLink to="/login">Already have an account yet? Log in here.</BaseLink>
        </div>
      </div>
    </form>
  </section>
</template>

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
    background-color: #fff;
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