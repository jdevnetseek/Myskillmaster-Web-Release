<template>
  <AuthPage class="forgot-password-page">
    <ForgotPasswordForm slot="form" />
    <SigninFooter slot="footer" />
  </AuthPage>
</template>

<script>
/**
 * ==================================================================================
 * Forgot Password page
 * ==================================================================================
 **/

import AuthPage from '@/components/auth/AuthPage'
import ForgotPasswordForm from '@/components/auth/forms/ForgotPasswordForm'
import SigninFooter from '@/components/auth/fields/SigninFooter'

export default {
  components: {
    AuthPage,
    ForgotPasswordForm,
    SigninFooter
  },
  layout: 'guest',
  head() {
    return {
      title: 'Forgot Password | '
    }
  }
}
</script>
<style lang="scss" scoped>
.forgot-password-page {
}
</style>
