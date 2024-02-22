<template>
  <div
    class="payment-method-list"
    :class="{
      'screen-border': hasScreenMargin,
    }"
  >
    <div v-if="hasHeader" class="payment-method-list__header">
      <h5>Payment details</h5>
    </div>
    <div class="payment-method-list__list">
      <template v-if="form.$busy">
        <PaymentMethodSkeleton
          v-for="n in skeletonCount"
          :key="n"
          class="payment-method-list__list__item"
        />
      </template>
      <template v-else-if="showForm">
        <PaymentMethodForm @added="toggleForm" @cancel="toggleForm" />
      </template>
      <template v-else-if="list.length > 0">
        <PaymentMethod
          v-for="(paymentMethod, index) in list"
          :key="index"
          :payment-method="paymentMethod"
          :for-selection="forSelection"
          :is-selected="isSelected(paymentMethod)"
          class="payment-method-list__list__item"
          @clicked="$emit('input', paymentMethod.id)"
        />
      </template>
      <template v-else>
        <div class="payment-method-list__list__placeholder">
          <p class="mb-0">
            No payment method found
          </p>
        </div>
      </template>
    </div>
    <div class="payment-method-list__footer">
      <h6
        v-if="!showForm"
        class="payment-method-list__footer__btn d-flex align-center"
        @click="toggleForm"
      >
        <v-icon color="primary">
          mdi-plus
        </v-icon>
        Add new payment method
      </h6>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Payment List
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import PaymentMethodForm from '../../forms/PaymentMethodForm'
import PaymentMethod from './fields/PaymentMethod'
import PaymentMethodSkeleton from './fields/PaymentMethodSkeleton'

export default {
  components: {
    PaymentMethod,
    PaymentMethodSkeleton,
    PaymentMethodForm
  },
  mixins: [SnackbarMixin],
  props: {
    value: {
      type: [String, Number],
      default: null
    },

    forSelection: {
      type: Boolean,
      default: false
    },

    skeletonCount: {
      type: Number,
      default: 4,
      validator(value) {
        return value > 0
      }
    },

    hasHeader: {
      type: Boolean,
      default: true
    },

    hasScreenMargin: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      showForm: false
    }
  },

  computed: {
    ...mapState({
      form: state => state.paymentMethod.listing,
      list: state => state.paymentMethod.list,
      meta: state => state.paymentMethod.listMeta
    })
  },

  async mounted() {
    await this.fetch()
  },

  methods: {
    toggleForm() {
      this.showForm = !this.showForm

      this.$emit('in-form', this.showForm)
    },

    async fetch() {
      this.form.$clearErrors()

      if (this.form.$busy) {
        return
      }

      await this.$store.dispatch('paymentMethod/getList').then(() => {
        if (this.form.$hasErrors()) {
          this.showSnackbar(this.form.$errorMessage, false)
        }
      })
    },

    isSelected(paymentMethod) {
      return this.forSelection ? this.value === paymentMethod.id : false
    }
  }
}
</script>
<style scoped lang="scss">
.payment-method-list {
  max-width: 600px;

  &__header {
    margin-bottom: 20px;
  }

  &__list {
    margin-bottom: 20px;

    &__item {
      max-width: 470px;

      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }

    &__placeholder {
      width: 100%;
      text-align: center;
      margin: 40px auto;

      > * {
        font-style: italic;
      }
    }
  }

  &__footer {
    &__btn {
      display: inline-block;
      color: $primary;
      cursor: pointer;
    }
  }
}
</style>
