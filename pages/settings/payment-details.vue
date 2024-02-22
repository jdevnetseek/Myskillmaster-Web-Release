<template>
  <PaymentMethodList
    class="payment-details-page__form"
    :has-screen-margin="false"
  />
</template>

<script>
/**
 * ==================================================================================
 * Settings: Payment Details page
 * ==================================================================================
 **/

import PaymentMethodList from '@/components/payment-methods/fields/PaymentMethodList'

export default {
  components: { PaymentMethodList },
  head() {
    return {
      title: 'Payment Details | '
    }
  }
}
</script>
<style scoped lang="scss">
.payment-details-page {
}
</style>
