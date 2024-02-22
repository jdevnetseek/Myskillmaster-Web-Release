<template>
  <div class="payout-account-form">
    <div class="payout-account-form__fields">
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="form.account_name"
            type="text"
            required
            flat
            filled
            hide-details="auto"
            label="Account holder name"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('account_name') ||
                hasError('form.account_name', 'Account name')
            "
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.account_number"
            type="text"
            required
            flat
            filled
            hide-details="auto"
            label="Account number"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('account_number') ||
                hasError('form.account_number', 'Account number')
            "
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="form.account_bsb"
            type="text"
            required
            flat
            filled
            hide-details="auto"
            label="BSB"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('BSB') || hasError('form.BSB', 'BSB')
            "
          />
        </v-col>
        <v-col cols="12">
          <ErrorMessage :error="form.$errorMessage" />
        </v-col>
      </v-row>
    </div>
    <div class="payout-account-form__actions text-left">
      <v-btn
        class="payout-account-form__actions__submit mr-2"
        :disabled="form.$busy"
        :loading="form.$busy"
        color="primary"
        depressed
        @click="submit"
      >
        Save
      </v-btn>
      <v-btn
        class="payout-account-form__actions__cancel"
        :disabled="form.$busy"
        :loading="form.$busy"
        depressed
        @click="$emit('cancel')"
      >
        Discard
      </v-btn>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Payout Account form
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { payoutAccountForm } from '@/validations/payoutAccount/payoutAccount'
import ErrorMessage from '@/components/fields/ErrorMessage'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  components: {
    ErrorMessage
  },
  mixins: [validationMixin, SnackbarMixin],

  computed: {
    hasError,
    ...mapState({
      form: state => state.payoutAccount.payoutAccount
    })
  },

  mounted() {
    this.reset()
  },

  methods: {
    reset() {
      this.form.$reset()
      this.$v.$reset()
    },

    async submit() {
      this.$v.$touch()
      this.form.$clearErrors()

      if (!this.form.$busy && !this.$v.$invalid) {
        await this.$store
          .dispatch('payoutAccount/createPayoutAccountToken', this.form.$data())
          .then(async(token) => {
            if (!this.form.$hasErrors()) {
              await this.$store
                .dispatch('payoutAccount/createPayoutAccount', {
                  external_account: token
                })
                .then(() => {
                  if (!this.form.$hasErrors()) {
                    this.reset()
                    this.showSnackbar('Added bank account successfully!')

                    this.$emit('added')
                  }
                })
            }
          })
          .catch(() => {
            this.showSnackbar(
              'Sorry, we are having trouble connecting to Stripe. Please try again later',
              false
            )
          })
          .finally(() => {
            this.form.$busy = false
          })
      }
    }
  },

  validations() {
    return {
      form: payoutAccountForm
    }
  }
}
</script>
<style scoped lang="scss">
.payout-account-form {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  &__fields {
    margin-bottom: 30px;

    .row > * {
      padding-bottom: 0;
    }
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

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .payout-account-form {
    &__actions {
      display: flex;

      .v-btn {
        max-width: unset;
        width: auto;
        flex-grow: 1;
      }
    }
  }
}
</style>
