<script setup lang="ts">
import { computed, ref } from 'vue'
import { email, phone, required, useValidation } from '../composables/validation'
import BaseButton from '../components/BaseButton.vue'
import BaseNavbar from '../components/BaseNavbar.vue'
import Carousel from '../components/Carousel.vue'
import FormInput from '../components/FormInput.vue'
import ProgressBar from '../components/ProgressBar.vue'

// Local state and computed values
const currentStep = ref(1)
const steps = [
  'Contact information',
  'Delivery information'
]

const contactInformationForm = useValidation({
  firstName: [required],
  lastName: [required],
  phoneNumber: [required, phone],
  email: [required, email]
})

const deliveryInformationForm = useValidation({
  address: [required],
  zipCode: [required],
  city: [required],
  country: [required]
})

const stepsMap = new Array(
  contactInformationForm,
  deliveryInformationForm
)

const isFirstStep = computed(() => currentStep.value === 1)
const isLastStep = computed(() => currentStep.value === steps.length)
const buttonText = computed(() => {
  return isLastStep.value ? 'Finish' : 'Next step'
})

// Methods
const goToNextStep = () => {
  // Check if we can go to next step
  if (stepsMap[currentStep.value - 1].$validation.valid){
    // If it's not last step,
    // go to next step
    if (!isLastStep.value){
      currentStep.value += 1
    // Else submit the form
    } else {
      submit()
    }
  } else {

  }
}

const goToPreviousStep = () => {
  // If it's not first step,
  // go to previous step
  if (currentStep.value !== 1) {
    currentStep.value -= 1;
  }
}

const submit = () => {
  
}
</script>

<template>
  <Carousel />
  <BaseNavbar />
  <div class="container mx-auto px-48 pb-10">
    <div class="v-checkout">
      <aside class="v-checkout__aside">
        <ProgressBar
          :steps="steps"
          :currentStep="currentStep"
        />
      </aside>
      <form class="v-checkout__form" @submit.prevent="submit">
        <h2 class="t-heading-secondary">Checkout</h2>
        <hr class="v-checkout__divider"/>
          <fieldset v-if="currentStep == 1" class="grid grid-cols-2 gap-x-4 gap-y-2">
            <FormInput 
              id="firstName"
              label="First name"
              class="mb-4"
              placeholder="John"
              v-model="contactInformationForm.firstName"
              :validation="contactInformationForm.$validation.firstName"
            />
            <FormInput 
              id="lastName"
              label="Last name"
              class="mb-4"
              placeholder="Doe"
              v-model="contactInformationForm.lastName"
              :validation="contactInformationForm.$validation.lastName"
            />
            <FormInput 
              id="email"
              label="Email"
              class="mb-4"
              placeholder="john.doe@gmail.com"
              v-model="contactInformationForm.email"
              :validation="contactInformationForm.$validation.email"
            />
            <FormInput 
              id="phoneNumber"
              label="Contact number"
              type="number"
              class="mb-4"
              placeholder="+123456780"
              v-model="contactInformationForm.phoneNumber"
              :validation="contactInformationForm.$validation.phoneNumber"
            />
          </fieldset>
          <fieldset v-if="currentStep == 2" class="flex flex-wrap">
            <FormInput 
              id="address"
              label="Address"
              class="w-2/3 mb-4"
              placeholder="Sesame Street 4"
              v-model="deliveryInformationForm.address"
              :validation="deliveryInformationForm.$validation.address"
            />
            <FormInput 
              id="zipCode"
              label="Zip Code"
              class="flex-grow ml-4 mb-4"
              placeholder="42000"
              v-model="deliveryInformationForm.zipCode"
              :validation="deliveryInformationForm.$validation.zipCode"
            />
            <FormInput 
              id="country"
              label="Country"
              class="w-1/2 mb-4"
              placeholder="Croatia"
              v-model="deliveryInformationForm.country"
              :validation="deliveryInformationForm.$validation.country"
            />
            <FormInput 
              id="city"
              label="City"
              class="flex-grow ml-4 mb-4"
              placeholder="Varazdin"
              v-model="deliveryInformationForm.city"
              :validation="deliveryInformationForm.$validation.city"
            />
          </fieldset>
          <div class="flex justify-end">
            <BaseButton
              v-if="!isFirstStep"
              text="Previous step"
              type="button"
              class="mr-2"
              @click="goToPreviousStep" 
            ></BaseButton>
            <BaseButton 
              :text="buttonText"
              type="button"
              @click="goToNextStep" 
            ></BaseButton>
          </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
@use '../styles/abstracts' as abs;

.v-checkout {
  display: flex;
  align-items: flex-start;
  background: white;
  padding: 2em;
  border-radius: abs.$border-radius-sm;
  box-shadow: abs.$box-shadow-sm;
  max-width: 60rem;
  margin: 0 auto;

  &__aside {
    margin-top: 5.5rem;
  }

  &__form {
    flex-grow: 1;
    margin-left: 2rem;
  }

  &__divider {
    background: rgba(255, 255, 255, 0.1);
    margin: 1rem auto;
  }
}
</style>

