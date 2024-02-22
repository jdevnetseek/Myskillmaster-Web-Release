<template>
  <div class="change-password-page">
    <div class="change-password-page__border">
      <ChangePasswordForm class="change-password-page__form" />
    </div>
  </div>
</template>

<script>
/**
 * ==================================================================================
 * Change Password
 * ==================================================================================
 **/

import ChangePasswordForm from '~/components/accounts/forms/ChangePasswordForm.vue'
export default {
  components: { ChangePasswordForm },
  head() {
    return {
      title: 'Change Password | '
    }
  }
}
</script>

<style lang="scss" scoped>
.change-password-page {
}
</style>
