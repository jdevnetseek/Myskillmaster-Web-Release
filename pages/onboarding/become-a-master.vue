<template>
  <OnboardingForm :current-step="2" />
</template>

<script>
/**
 * ==================================================================================
 * Onboarding: Become a master page
 * ==================================================================================
 **/

import OnboardingForm from '@/components/auth/forms/OnboardingForm'

export default {
  components: {
    OnboardingForm
  },

  head() {
    return {
      title: 'Onboarding: Become a master | '
    }
  }
}
</script>
