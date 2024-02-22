<template>
  <div class="accounts-page">
    <div class="accounts-page__border">
      <AccountAndPersonalProfileForm class="accounts-page__form" />
      <MyInterestForm class="accounts-page__form mt-10" />
      <MasterProfileForm class="accounts-page__form mt-10" />
    </div>
  </div>
</template>

<script>
/**
 * ==================================================================================
 * Accounts page
 * NOTE: Please do not remove this for now. For future reference
 * ==================================================================================
 **/

import AccountAndPersonalProfileForm from '~/components/accounts/forms/AccountAndPersonalProfileForm.vue'
import MyInterestForm from '~/components/accounts/forms/MyInterestForm.vue'
import MasterProfileForm from '~/components/accounts/forms/MasterProfileForm.vue'

export default {
  name: 'AccountsPage',
  components: {
    AccountAndPersonalProfileForm,
    MyInterestForm,
    MasterProfileForm
  },
  head() {
    return {
      title: 'Accounts | '
    }
  }
}
</script>
<style scoped lang="scss">
.accounts-page {
  &__border {
  }
}
</style>
