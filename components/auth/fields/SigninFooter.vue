<template>
  <AuthFooter
    :label="label"
    :button-label="buttonLabel"
    :to="to"
    class="signin-footer"
  />
</template>
<script>
/**
 * ==================================================================================
 * Sign-in Footer
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
      default: 'Already a member?'
    },

    buttonLabel: {
      type: String,
      default: 'Sign in'
    },

    to: {
      type: String,
      default: 'login'
    }
  }
}
</script>
<style scoped lang="scss">
.signin-footer {
}
</style>
