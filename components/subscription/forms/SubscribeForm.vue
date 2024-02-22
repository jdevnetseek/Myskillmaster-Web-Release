<template>
  <div class="subscribe-form">
    <div class="subscribe-form">
      <h4 class="subscribe-form__header">
        Enter payment details
      </h4>
    </div>
    <div class="subscribe-form__fields">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="form.name"
            type="text"
            required
            flat
            filled
            hide-details="auto"
            label="Name on card"
            :disabled="isFormDisabled"
            :error-messages="
              form.$getError('name') || hasError('form.name', 'Name')
            "
          />
        </v-col>
      </v-row>
      <StripeFields
        v-if="hasClientSecret"
        ref="stripe"
        :client-secret="subscription.client_secret"
      />
      <div v-else class="d-flex mt-6">
        <v-progress-circular class="mx-auto" indeterminate color="primary" />
      </div>
      <v-row>
        <v-col cols="12">
          <ErrorMessage class="mt-2" :error="errors" />
        </v-col>
      </v-row>
    </div>
    <div class="subscribe-form__actions">
      <v-btn
        class="subscribe-form__actions__submit"
        :disabled="isFormDisabled"
        :loading="form.$busy"
        color="primary"
        depressed
        @click="submit"
      >
        Subscribe
      </v-btn>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Subscribe form
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { subscribeForm } from '@/validations/subscription/subscribe'
import ErrorMessage from '@/components/fields/ErrorMessage'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import StripeFields from '@/components/stripe/fields/StripeFields'

export default {
  components: {
    StripeFields,
    ErrorMessage
  },
  mixins: [validationMixin, SnackbarMixin],
  props: {
    plan: {
      type: Object,
      required: true
    },

    redirectOnSuccess: {
      type: String,
      default: 'index'
    }
  },

  computed: {
    hasError,
    ...mapState({
      form: state => state.subscription.subscription,
      subscription: state => state.subscription.subscriptionDetails
    }),

    ...mapGetters({
      hasSubscription: 'subscription/hasSubscriptionDetails'
    }),

    errors() {
      return (
        this.hasError('form.source', 'Source') ||
        this.hasError('form.plan', 'Plan') ||
        this.form.$errorMessage
      )
    },

    hasClientSecret() {
      return !!this.subscription?.client_secret
    },

    isFormDisabled() {
      return this.form.$busy || !this.hasClientSecret
    }
  },

  watch: {
    plan() {
      this.fetchSecretKey()
    }
  },

  mounted() {
    this.init()
    console.log(this.plan)
  },

  methods: {
    init() {
      this.reset()
      this.fetchSecretKey()
    },

    reset() {
      this.form.$reset()
    },

    async submit() {
      this.$v.$touch()
      this.form.$clearErrors()

      const stripeValidation = this.$refs.stripe.validate()
      if (!this.form.$busy && !this.$v.$invalid && stripeValidation) {
        this.form.$busy = true

        await this.$refs.stripe
          .createToken()
          .then(async(token) => {
            this.form.source = token.id
            this.form.plan = this.plan.id

            const payload = this.form.$data()
            payload.isFreeTrial = this.plan.isFreeTrial

            await this.$store
              .dispatch('subscription/subscribe', payload)
              .then((response) => {
                if (this.form.$hasErrors()) {
                  this.showSnackbar(this.form.$errorMessage, false)
                } else {
                  this.reset()

                  this.$gtm.push({ event: 'purchase', ...response.data.analytics })

                  this.$router.push({
                    name: this.redirectOnSuccess
                  })

                  this.showSnackbar(
                    `You are now subscribed to ${this.plan.name}!`
                  )
                }
              })
          })
          .catch(() => {
            this.showSnackbar(
              'Please check your card details and try again',
              false
            )
          })
          .finally(() => {
            this.form.$busy = false
          })
      }
    },

    async fetchSecretKey() {
      this.form.$clearErrors()

      if (!this.plan || this.form.$busy) {
        return
      }

      await this.$store
        .dispatch('subscription/getSubscription', {
          planId: this.plan.id
        })
        .then(() => {
          if (this.form.$hasErrors()) {
            this.showSnackbar(this.form.$errorMessage, false)
          }
        })
    }
  },

  validations() {
    return {
      form: subscribeForm
    }
  }
}
</script>
<style scoped lang="scss">
.subscribe-form {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  &__header {
    margin-bottom: 20px;
  }

  &__fields {
    margin-bottom: 30px;
  }

  &__actions {
    text-align: center;

    &__submit {
      width: 100%;
      max-height: 56px;
    }
  }
}
</style>
