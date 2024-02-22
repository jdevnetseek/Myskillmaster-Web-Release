<template>
  <AccountAndPersonalProfileForm
    class="accounts-page__form"
    :has-screen-margin="false"
  />
</template>

<script>
/**
 * ==================================================================================
 * Settings: Accounts and personal profile page
 * ==================================================================================
 **/

import AccountAndPersonalProfileForm from '~/components/accounts/forms/AccountAndPersonalProfileForm.vue'

export default {
  components: { AccountAndPersonalProfileForm },
  head() {
    return {
      title: 'Accounts | '
    }
  }
}
</script>
<style scoped lang="scss">
.accounts-page {
}
</style>
