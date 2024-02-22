<template>
  <AuthFooter
    :label="label"
    :button-label="buttonLabel"
    :to="to"
    class="signup-footer"
  />
</template>
<script>
/**
 * ==================================================================================
 * Sign-up Footer
 * ==================================================================================
 **/

import AuthFooter from '@/components/auth/fields/AuthFooter'

export default {
  components: {
    AuthFooter
  },
  props: {
    label: {
      type: String,
      default: "Haven't had an account?"
    },

    buttonLabel: {
      type: String,
      default: 'Sign up'
    },

    to: {
      type: String,
      default: 'sign-up'
    }
  }
}
</script>
<style scoped lang="scss">
.signup-footer {
}
</style>
