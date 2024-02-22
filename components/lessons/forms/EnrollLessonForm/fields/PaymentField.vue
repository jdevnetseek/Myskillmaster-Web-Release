<template>
  <div class="payment-field">
    <PaymentMethodList
      v-model="form.payment_method_id"
      :for-selection="true"
      :has-header="false"
      :has-screen-margin="false"
      @in-form="emit"
    />
    <ErrorMessage
      class="mt-2"
      :error="
        form.$getError('payment_method_id') ||
          hasError('form.payment_method_id', 'Payment method')
      "
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Payment Field
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { lessonEnrollPayment } from '@/validations/lesson/lessonEnrollPayment'
import PaymentMethodList from '@/components/payment-methods/fields/PaymentMethodList'
import ErrorMessage from '@/components/fields/ErrorMessage'

export default {
  components: { PaymentMethodList, ErrorMessage },
  mixins: [validationMixin],
  computed: {
    hasError,
    ...mapState({
      form: state => state.lesson.lessonEnroll
    })
  },

  methods: {
    emit(value) {
      this.$emit('in-form', value)
    }
  },

  validations() {
    return {
      form: lessonEnrollPayment
    }
  }
}
</script>
<style scoped lang="scss">
.payment-field {
  //
}
</style>
