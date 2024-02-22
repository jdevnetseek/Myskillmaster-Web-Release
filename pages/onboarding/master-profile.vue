<template>
  <MasterProfileForm redirect="onboarding-subscribe" button-label="Continue" />
</template>

<script>
/**
 * ==================================================================================
 * Onboarding: Master profile page
 * ==================================================================================
 **/

import MasterProfileForm from '~/components/accounts/forms/MasterProfileForm.vue'

export default {
  components: {
    MasterProfileForm
  },

  head() {
    return {
      title: 'Onboarding: Master Profile | '
    }
  }
}
</script>
