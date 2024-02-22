<template>
  <div class="stripe-fields">
    <form id="payment-form">
      <div id="payment-element">
        <v-row>
          <v-col cols="12">
            <StripeTextfield
              id="cardNumber"
              ref="cardNumber"
              :stripe-elements="stripeElements"
              placeholder="Card Number"
            />
          </v-col>
          <v-col cols="6">
            <StripeTextfield
              id="cardExpiry"
              ref="cardExpiry"
              :stripe-elements="stripeElements"
              placeholder="Expiry"
            />
          </v-col>
          <v-col cols="6">
            <StripeTextfield
              id="cardCvc"
              ref="cardCvc"
              :stripe-elements="stripeElements"
              placeholder="CVC"
            />
          </v-col>
        </v-row>
      </div>
    </form>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Stripe Fields
 * ==================================================================================
 **/

import { loadStripe } from '@stripe/stripe-js'
import State from '@/utils/rawStates/State'
import ENV from '@/services/env'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import StripeTextfield from './StripeTextfield'

export default {
  components: {
    StripeTextfield
  },
  mixins: [SnackbarMixin],
  props: {
    clientSecret: {
      type: String,
      required: true
    },

    inputCss: {
      type: Object,
      default: () => {
        return { border: '1px solid #cfcfcf', boxShadow: 'none' }
      }
    },

    inputFocusCss: {
      type: Object,
      default: () => {
        return {
          border: '1px solid #007675',
          boxShadow: 'none'
        }
      }
    }
  },

  data() {
    return {
      stripeForm: State({}),
      stripe: null,
      stripeElements: null,
      stripePayment: null
    }
  },

  computed: {
    /**
     * Style setup when using payment elements
     * https://stripe.com/docs/elements/appearance-api#theme
     *
     * @NOTE: NOT IN USE!
     */
    appearance() {
      return {
        labels: 'floating',
        variables: {
          colorPrimary: '#007675'
        },
        rules: {
          '.Input': this.inputCss,
          '.Input:hover': this.inputFocusCss,
          '.Input:focus': this.inputFocusCss,
          '.Label': {
            color: '#839a9c'
          }
        }
      }
    },

    hasStripe() {
      return !!this.stripe
    }
  },

  watch: {
    clientSecret() {
      this.initStripe()
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initStripe()
    })
  },

  methods: {
    async initStripe() {
      if (this.stripeForm.$busy) {
        return
      }

      if (!this.clientSecret || !ENV.stripePublishableKey) {
        this.showSnackbar(
          'Something went wrong loading the payment details, please try again later.',
          false
        )

        return
      }

      this.stripeForm.$busy = true

      if (document.getElementById('payment-element')) {
        // Set your publishable key: remember to change this to your live publishable key in production
        // See your keys here: https://dashboard.stripe.com/apikeys
        this.stripe = await loadStripe(ENV.stripePublishableKey)
        // Set up Stripe.js and Elements to use in checkout form, passing the client secret
        this.stripeElements = this.stripe.elements({
          clientSecret: this.clientSecret,
          appearance: this.appearance
        })
      }

      this.stripeForm.$busy = false
    },

    reset() {
      this.stripe = null
      this.stripeElements = null
    },

    validate() {
      /**
       * Store in an array for all the methods to run
       * and not stop when one fails
       */
      return (
        [
          !this.$refs.cardNumber.validate(),
          !this.$refs.cardExpiry.validate(),
          !this.$refs.cardCvc.validate()
        ].filter(a => a).length === 0
      )
    },

    createToken() {
      return new Promise((resolve, reject) => {
        if (!this.validate()) {
          reject(new Error('Missing card details'))
        }

        this.stripe
          .createToken(
            this.$refs.cardNumber.textfield,
            this.$refs.cardExpiry.textfield,
            this.$refs.cardCvc.textfield
          )
          .then(function(result) {
            if (result.error) {
              reject(result.error)
            } else {
              resolve(result.token)
            }
          })
          .catch(() => {
            this.showSnackbar(
              'Please check your card details and try again',
              false
            )
          })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.stripe-fields {
  .row {
    .col {
      padding-bottom: 0;
    }
  }
}
</style>
