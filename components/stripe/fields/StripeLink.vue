<template>
  <div class="stripe-link">
    <h5>{{ header }}</h5>
    <p v-if="!hasStripeCompleted">
      Connect with Stripe to upload identity verification requirements.
    </p>
    <div v-else class="d-inline-block">
      <h6
        class="stripe-link__btn my-4 d-flex align-center"
        :class="{
          'font-color-inactive': stripeLinkForm.$busy,
        }"
        @click="redirectToStripe"
      >
        <v-icon color="primary">
          mdi-chevron-left
        </v-icon>
        {{ label }}
      </h6>
    </div>
    <div class="stripe-link__content">
      <PayoutDashboard
        v-if="hasStripeCompleted"
        class="stripe-link__dashboard mt-2 mb-10"
      />

      <template v-if="!hasStripeCompleted">
        <v-alert
          v-if="hasWarning"
          type="warning"
          outlined
          icon="mdi-alert-outline"
          class="stripe-link__content__warning d-inline-block pa-3"
        >
          <small class="text-body-2">{{ warningLabel }}</small>
          <ul v-if="warningList.length > 0">
            <li v-for="(warning, index) in warningList" :key="index">
              <small>{{ warning }}</small>
            </li>
          </ul>
        </v-alert>
        <v-btn
          color="primary"
          :disabled="busy"
          :outlined="busy"
          class="d-block"
          @click="redirectToStripe"
        >
          {{ label }}
        </v-btn>
      </template>
      <template v-else>
        <PayoutAccountList :has-header="false" :has-screen-margin="false" />
      </template>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Stripe: Link account button
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { getFullPath } from '@/utils/Helpers'
import PayoutAccountList from '@/components/payouts/fields/PayoutAccountList'
import PayoutDashboard from '@/components/payouts/fields/PayoutDashboard'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  components: {
    PayoutAccountList,
    PayoutDashboard
  },
  mixins: [SnackbarMixin],
  computed: {
    ...mapState({
      stripeAccountForm: state => state.stripe.stripeAccount,
      stripeLinkForm: state => state.stripe.stripeLink,

      stripeAccount: state => state.stripe.stripeAccountDetails,
      stripeLink: state => state.stripe.stripeLinkDetails
    }),

    ...mapGetters({
      hasStripeAccount: 'stripe/hasStripeAccountDetails',
      hasStripeLink: 'stripe/hasStripeLinkDetails'
    }),

    busy() {
      return this.stripeAccountForm.$busy || this.stripeLinkForm.$busy
    },

    header() {
      return `Payout ${this.hasStripeCompleted ? 'history' : 'details'}`
    },

    label() {
      if (this.stripeAccountForm.$busy || this.stripeLinkForm.$busy) {
        return 'Checking your stripe account...'
      }

      if (this.hasStripeCompleted) {
        return 'View Stripe details'
      }

      if (this.hasStripeAccount) {
        return 'Update Stripe account'
      }

      return 'Connect to Stripe'
    },

    warningLabel() {
      if (!this.hasStripeAccount) {
        return ''
      }

      if (!this.hasStripeCompleted) {
        return 'Your Stripe setup still has pending requirements or verification'
      }

      return ''
    },

    warningList() {
      return this.hasStripeAccount ? this.stripeAccount.pendingRequirements : []
    },

    stripeLinkURL() {
      return this.hasStripeLink ? this.stripeLink.url : null
    },

    hasStripeCompleted() {
      return this.hasStripeAccount && !this.stripeAccount.hasRequirementDue
    },

    hasWarning() {
      return !!this.warningLabel
    }
  },

  mounted() {
    this.fetchStripeAccount()
  },

  methods: {
    goToStripeURL() {
      window.location.href = this.stripeLinkURL
    },

    async fetchStripeLink() {
      const returnRoute = getFullPath(
        this.$router.resolve({ name: this.$route.name }).href
      )

      await this.$store
        .dispatch('stripe/getStripeLink', {
          refresh_url: returnRoute,
          return_url: returnRoute
        })
        .then(() => {
          if (this.stripeLinkForm.$hasErrors()) {
            this.showSnackbar(this.stripeLinkForm.$errorMessage, false)
          } else {
            this.goToStripeURL()
          }
        })
    },

    async fetchStripeAccount() {
      if (this.stripeAccountForm.$busy) {
        return
      }

      await this.$store.dispatch('stripe/getStripeAccount')
    },

    redirectToStripe() {
      if (!this.hasStripeLink) {
        this.fetchStripeLink()
      } else if (this.stripeLinkURL) {
        this.goToStripeURL()
      } else {
        this.showSnackbar('Stripe link not found', false)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.stripe-link {
  max-width: 470px;

  .v-btn {
    min-width: 228px !important;
  }

  &__btn {
    display: inline-block;
    color: $primary;
    cursor: pointer;

    &.font-color-inactive {
      color: $inactive-text;
      cursor: not-allowed;
    }
  }

  &__content {
    &__warning {
      max-height: 115px;
      overflow: auto;
    }
  }
}
</style>
