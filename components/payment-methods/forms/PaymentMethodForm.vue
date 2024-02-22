<template>
  <div class="payment-method-form">
    <div class="payment-method-form__fields">
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
            :disabled="form.$busy"
            :error-messages="
              form.$getError('name') || hasError('form.name', 'Name')
            "
          />
        </v-col>
      </v-row>
      <StripeFields
        v-if="clientSecret"
        ref="stripe"
        :client-secret="clientSecret"
      />
      <v-row>
        <v-col cols="12">
          <ErrorMessage class="mt-2" :error="errors" />
        </v-col>
      </v-row>
    </div>
    <div class="payment-method-form__actions text-left">
      <v-btn
        class="payment-method-form__actions__submit mr-2"
        :disabled="form.$busy"
        :loading="form.$busy"
        color="primary"
        depressed
        @click="submit"
      >
        Save
      </v-btn>
      <v-btn
        class="payment-method-form__actions__cancel"
        :disabled="form.$busy"
        :loading="form.$busy"
        depressed
        @click="$emit('cancel')"
      >
        Cancel
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
import { paymentMethodForm } from '@/validations/paymentMethod/paymentMethod'
import ErrorMessage from '@/components/fields/ErrorMessage'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import StripeFields from '@/components/stripe/fields/StripeFields'

export default {
  components: {
    StripeFields,
    ErrorMessage
  },
  mixins: [validationMixin, SnackbarMixin],

  computed: {
    hasError,
    ...mapState({
      form: state => state.paymentMethod.paymentMethod,
      clientSecret: state => state.paymentMethod.clientSecret
    }),

    ...mapGetters({
      hasClientSecret: 'paymentMethod/hasClientSecret'
    }),

    errors() {
      return this.hasError('form.source', 'Source') || this.form.$errorMessage
    }
  },

  watch: {
    plan() {
      this.fetchSecretKey()
    }
  },

  mounted() {
    this.init()
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

            await this.$store
              .dispatch('paymentMethod/createPaymentMethod', this.form.$data())
              .then(() => {
                if (this.form.$hasErrors()) {
                  this.showSnackbar(this.form.$errorMessage, false)
                } else {
                  this.reset()
                  this.showSnackbar('Added payment method successfully!')

                  this.$emit('added')
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

      if (this.hasClientSecret || this.form.$busy) {
        return
      }

      await this.$store.dispatch('paymentMethod/getClientSecret').then(() => {
        if (this.form.$hasErrors()) {
          this.showSnackbar(this.form.$errorMessage, false)
        }
      })
    }
  },

  validations() {
    return {
      form: paymentMethodForm
    }
  }
}
</script>
<style scoped lang="scss">
.payment-method-form {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  &__fields {
    margin-bottom: 30px;
  }

  &__actions {
    text-align: center;

    .v-btn {
      width: 100%;
      max-width: 157px;
      max-height: 56px;
    }
  }
}
</style>
