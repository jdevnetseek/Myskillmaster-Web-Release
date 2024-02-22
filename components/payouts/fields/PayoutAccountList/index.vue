<template>
  <div
    class="payout-account-list"
    :class="{
      'screen-border': hasScreenMargin,
    }"
  >
    <div v-if="hasHeader" class="payout-account-list__header">
      <h5>Payout details</h5>
    </div>
    <div class="payout-account-list__list">
      <template v-if="form.$busy">
        <PayoutAccountSkeleton
          v-for="n in skeletonCount"
          :key="n"
          class="payout-account-list__list__item"
        />
      </template>
      <template v-else-if="showForm">
        <PayoutAccountForm @added="toggleForm" @cancel="toggleForm" />
      </template>
      <template v-else-if="list.length <= 0">
        <div class="payout-account-list__list__placeholder">
          <p class="mb-0">
            No bank account found
          </p>
        </div>
      </template>
      <template v-else>
        <PayoutAccount
          v-for="(payoutAccount, index) in list"
          :key="index"
          :payout-account="payoutAccount"
          :disabled="isPayoutItemDisabled"
          class="payout-account-list__list__item"
          @clicked="$emit('input', payoutAccount.id)"
        />
      </template>
    </div>
    <div class="payout-account-list__footer">
      <h6
        v-if="!showForm"
        class="payout-account-list__footer__btn d-flex align-center"
        @click="toggleForm"
      >
        <v-icon color="primary">
          mdi-plus
        </v-icon>
        Add bank account
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
import PayoutAccountForm from '../../forms/PayoutAccountForm'
import PayoutAccount from './fields/PayoutAccount'
import PayoutAccountSkeleton from './fields/PayoutAccountSkeleton'

export default {
  components: {
    PayoutAccount,
    PayoutAccountSkeleton,
    PayoutAccountForm
  },
  mixins: [SnackbarMixin],
  props: {
    value: {
      type: [String, Number],
      default: null
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
      form: state => state.payoutAccount.listing,
      list: state => state.payoutAccount.list,
      meta: state => state.payoutAccount.listMeta,

      stripeBalanceForm: state => state.stripe.stripeBalance
    }),

    isPayoutItemDisabled() {
      return this.stripeBalanceForm.$busy
    }
  },

  async mounted() {
    await this.fetch()
  },

  methods: {
    toggleForm() {
      this.showForm = !this.showForm
    },

    async fetch() {
      this.form.$clearErrors()

      if (this.form.$busy) {
        return
      }

      await this.$store.dispatch('payoutAccount/getList').then(() => {
        if (this.form.$hasErrors()) {
          this.showSnackbar(this.form.$errorMessage, false)
        } else if (this.list.length <= 0) {
          this.toggleForm()
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.payout-account-list {
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

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .payout-account-list {
    &__footer {
      &__btn {
        width: 100%;
      }
    }
  }
}
</style>
