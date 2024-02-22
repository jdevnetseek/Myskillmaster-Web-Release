<template>
  <OnboardingForm :current-step="1" />
</template>

<script>
/**
 * ==================================================================================
 * Onboarding: What do you want to learn page
 * ==================================================================================
 **/

import OnboardingForm from '@/components/auth/forms/OnboardingForm'

export default {
  components: {
    OnboardingForm
  }
}
</script>
