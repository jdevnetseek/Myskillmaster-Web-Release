<template>
  <div class="payout-details-page">
    <StripeLink />
  </div>
</template>

<script>
/**
 * ==================================================================================
 * Settings: Payout Details page
 * ==================================================================================
 **/

import StripeLink from '@/components/stripe/fields/StripeLink'

export default {
  components: { StripeLink },
  head() {
    return {
      title: 'Payout Details | '
    }
  }
}
</script>
<style scoped lang="scss">
.payment-details-page {
}
</style>
