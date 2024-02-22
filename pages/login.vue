<template>
  <AuthPage class="login-page">
    <LoginForm slot="form" />
    <SignupFooter slot="footer" />
  </AuthPage>
</template>

<script>
/**
 * ==================================================================================
 * Login page
 * ==================================================================================
 **/

import AuthPage from '@/components/auth/AuthPage'
import LoginForm from '@/components/auth/forms/LoginForm'
import SignupFooter from '@/components/auth/fields/SignupFooter'

export default {
  name: 'LoginPage',
  components: {
    AuthPage,
    LoginForm,
    SignupFooter
  },
  layout: 'guest',
  head() {
    return {
      title: 'Login | '
    }
  }
}
</script>
<style lang="scss" scoped>
.login-page {
}
</style>
