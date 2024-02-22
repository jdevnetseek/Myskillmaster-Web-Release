<template>
  <SignupForm :current-step="1" />
</template>
<script>
/**
 * ==================================================================================
 * Sign up: Check email page
 * ==================================================================================
 **/

import SignupForm from '@/components/auth/forms/SignupForm'

export default {
  components: {
    SignupForm
  }
}
</script>
