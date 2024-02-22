<template>
  <div class="payout-dashboard">
    <div v-if="hasStripeBalance" class="payout-dashboard__data d-flex flex-row">
      <div class="payout-dashboard__data__column mr-10">
        <p>This week</p>
        <h4 class="mb-1">
          {{ stripeBalance.currentWeekBalance }}
        </h4>
        <caption>
          {{
            stripeBalance.currentLessonsCountLabel
          }}
        </caption>
      </div>
      <div class="payout-dashboard__data__column">
        <p>Your balance</p>
        <h4>{{ stripeBalance.availableBalance }}</h4>
      </div>
    </div>
    <div v-else class="payout-dashboard__placeholder">
      <v-skeleton-loader
        type="list-item-three-line"
        transition="fade-transition"
      />
    </div>
    <div class="payout-dashboard__actions">
      <v-btn
        class="payout-dashboard__actions__submit mr-2"
        color="primary"
        depressed
        :disabled="!isPayoutEnable"
        @click="toggleConfirmation()"
      >
        Pay out now
      </v-btn>
    </div>

    <ConfirmationModal
      v-model="showConfirmation"
      title="Pay out now"
      content="Do you want to proceed?"
      @confirm="submit()"
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Payout Dashboard
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import ConfirmationModal from '@/components/modals/ConfirmationModal'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  components: {
    ConfirmationModal
  },
  mixins: [SnackbarMixin],
  data() {
    return {
      showConfirmation: false
    }
  },

  computed: {
    ...mapState({
      listingForm: state => state.payoutAccount.listing,
      list: state => state.payoutAccount.list,
      payoutAccountform: state => state.payoutAccount.payoutAccount,

      form: state => state.stripe.stripeBalance,
      stripeBalance: state => state.stripe.stripeBalanceDetails
    }),

    ...mapGetters({
      hasStripeBalance: 'stripe/hasStripeBalanceDetails'
    }),

    disabled() {
      return (
        this.listingForm.$busy ||
        this.payoutAccountform.$busy ||
        this.form.$busy
      )
    },

    hasPayoutAccount() {
      return this.list.length > 0
    },

    isPayoutEnable() {
      return this.hasPayoutAccount && !this.disabled
    }
  },

  mounted() {
    this.fetch()
  },

  methods: {
    toggleConfirmation() {
      this.showConfirmation = !this.showConfirmation
    },

    async submit() {
      this.form.$clearErrors()

      if (!this.form.$busy) {
        await this.$store.dispatch('stripe/payoutBalance').then(() => {
          if (!this.form.$hasErrors()) {
            this.showSnackbar('Manual payout has been processed successfully!')
            this.fetch()
          } else {
            this.showSnackbar(this.form.$errorMessage, false)
          }
        })
      }
    },

    async fetch() {
      this.form.$clearErrors()

      if (!this.form.$busy) {
        await this.$store.dispatch('stripe/getStripeBalance').then(() => {
          if (this.form.$hasErrors()) {
            this.showSnackbar(this.form.$errorMessage, false)
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.payout-dashboard {
  &__data {
    margin-bottom: 20px;

    &__column {
      p {
        margin-bottom: 5px;
      }

      h4 {
      }

      caption {
        display: block;
        text-align: left;
        color: $secondary-text;
      }
    }
  }

  &__placeholder {
    > ::v-deep * {
      width: 100%;

      .v-skeleton-loader__list-item-three-line {
        background: transparent;
      }
    }
  }

  &__actions {
    &__submit {
      width: 100%;
    }
  }
}
</style>
