<template>
  <div v-if="hasSubscription && !$fetchState.pending" class="subscription-tier">
    <div
      class="subscription-tier__status mb-4"
      :class="{
        'subscription-tier__status--inactive': !isActive,
      }"
    >
      <p class="text-body-2 font-weight-bold">
        {{ activeLabel }}
      </p>
    </div>
    <h5 class="mb-4">
      {{ nameLabel }}
    </h5>
    <p class="text-body-2">
      {{ subscription.description }}
    </p>
    <div class="subscription-tier__divider my-4" />
    <p class="text-body-2">
      {{ paymentLabel }}
    </p>
    <div class="subscription-tier__actions mt-7">
      <v-btn
        :loading="unsubscribeForm.$busy"
        :disabled="unsubscribeForm.$busy || !isActive"
        color="error"
        outlined
        depressed
        class="subscription-tier__actions__cancel mb-4"
        @click="toggleConfirmation"
      >
        Cancel subscription
      </v-btn>
      <v-btn
        :disabled="unsubscribeForm.$busy"
        color="#E6F1F1"
        depressed
        class="subscription-tier__actions__update text-decoration-none"
        :to="{
          name: 'go-pro',
        }"
      >
        Update tier
      </v-btn>
    </div>

    <ConfirmationModal
      v-model="showModal"
      title=""
      content="You will still have access to your account up until the end of the billing period. Would you like to unsubscribe?"
      confirm-label="Unsubscribe"
      @confirm="unsubscribe"
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Subscription Tier
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
      showModal: false
    }
  },

  async fetch() {
    this.form.$clearErrors()

    if (!this.form.$busy) {
      await this.$store
        .dispatch('subscription/getCurrentSubscription')
        .then(() => {
          if (!this.hasSubscription) {
            this.$nuxt.error({
              statusCode: 404,
              message: 'Subscription not found'
            })
          }
        })
    }
  },

  computed: {
    ...mapState({
      form: state => state.subscription.subscription,
      subscription: state => state.subscription.subscriptionDetails,

      unsubscribeForm: state => state.subscription.unsubscribe
    }),

    ...mapGetters({
      hasSubscription: 'subscription/hasSubscriptionDetails'
    }),

    subscriptionDetails() {
      return this.hasSubscription && this.subscription.subscription_details
        ? this.subscription.subscription_details
        : {}
    },

    activeLabel() {
      return this.isActive ? 'Active' : 'Cancelled'
    },

    nameLabel() {
      return `${this.subscription.name} ${
        this.subscription.on_free_trial_period ? '(Free Trial)' : ''
      }`
    },

    paymentLabel() {
      return `${this.isActive ? 'Next payment' : 'Expires on'}: ${
        this.isActive
          ? this.subscriptionDetails.next_payment_date
          : this.subscriptionDetails.cancel_at
      }   ${this.isActive ? '' : 'after this date your current plan will be set to a student plan'}`
    },

    isActive() {
      return (
        this.subscription.is_subscribed && !this.subscriptionDetails.canceled_at
      )
    }
  },

  methods: {
    toggleConfirmation() {
      this.showModal = !this.showModal
    },

    async unsubscribe() {
      if (this.unsubscribeForm.$busy) {
        return
      }

      this.unsubscribeForm.$clearErrors()

      await this.$store.dispatch('subscription/unsubscribe').then(() => {
        if (!this.unsubscribeForm.$hasErrors()) {
          this.showSnackbar('Unsubscription was successful!')
        } else {
          this.showSnackbar(this.unsubscribeForm.$errorMessage, false)
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.subscription-tier {
  max-width: 345px;
  padding: 20px 15px;
  border-radius: 16px;
  border: 1px solid #ececec;
  background: #fafafa;

  &__status {
    display: inline-block;
    padding: 4px 15px;
    background: #2bb826;
    border-radius: 30px;

    &--inactive {
      background: $alert-error;
    }

    p {
      color: #ffffff;
    }
  }

  h5 {
    font-size: 20px;
  }

  p {
    margin-bottom: 0;
  }

  &__divider {
    width: 100%;
    border-top: 1px solid #cfcfcf;
  }

  &__actions {
    .v-btn {
      width: 100%;
      border-radius: 8px !important;
    }

    &__update {
      color: $primary;
    }
  }
}
</style>
