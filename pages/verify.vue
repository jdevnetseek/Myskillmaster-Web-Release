<template>
  <AuthPage class="verify-page">
    <VerifyForm slot="form" />
  </AuthPage>
</template>
<script>
/**
 * ==================================================================================
 * Verify page
 * ==================================================================================
 **/

import AuthPage from '@/components/auth/AuthPage'
import VerifyForm from '@/components/user/forms/VerifyForm'

export default {
  components: {
    AuthPage,
    VerifyForm
  },
  head() {
    return {
      title: 'Verify | '
    }
  }
}
</script>
<style scoped lang="scss">
.verify-page {
  //
}
</style>
