<template>
  <div class="payout-account">
    <div class="payout-account__border d-flex flex-row align-center">
      <v-radio-group
        :value="payoutAccount.default_for_currency"
        :hide-details="true"
        :disabled="isDisabled"
        class="mt-0 pt-0 mr-1"
      >
        <v-radio :value="true" readonly :ripple="false" @click="onClick" />
      </v-radio-group>
      <div class="payout-account__content d-flex flex-column">
        <p class="mb-0">
          {{ payoutAccount.bank_name }}
        </p>
        <div class="d-flex flex-row">
          <p class="mr-2">
            {{ payoutAccount.routing_number }}
          </p>
          <p>{{ payoutAccount.last4Label }}</p>
        </div>
      </div>
      <v-icon
        :disabled="isDisabled || payoutAccount.default_for_currency"
        color="black"
        @click="toggleDelete"
      >
        mdi-trash-can-outline
      </v-icon>
    </div>

    <ConfirmationModal
      v-model="showPrimary"
      title="Set as default"
      content="Are you sure you want to set this as your default bank account?"
      :loading="form.$busy"
      :close-on-confirm="false"
      @confirm="setAsPrimary"
    />

    <ConfirmationModal
      v-model="showDelete"
      title="Remove bank account"
      content="Are you sure you want to delete this bank account?"
      :loading="form.$busy"
      :close-on-confirm="false"
      @confirm="remove"
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Payout Account
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import ConfirmationModal from '@/components/modals/ConfirmationModal'

export default {
  components: {
    ConfirmationModal
  },
  mixins: [SnackbarMixin],
  props: {
    payoutAccount: {
      type: Object,
      required: true
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showPrimary: false,
      showDelete: false
    }
  },

  computed: {
    ...mapState({
      form: state => state.payoutAccount.payoutAccount
    }),

    isDisabled() {
      return this.disabled || this.form.$busy
    }
  },

  methods: {
    onClick() {
      if (!this.payoutAccount.default_for_currency) {
        this.toggleDefault()
      }
    },

    toggleDefault() {
      this.showPrimary = !this.showPrimary
    },

    toggleDelete() {
      this.showDelete = !this.showDelete
    },

    async setAsPrimary() {
      this.form.$clearErrors()

      if (!this.form.$busy) {
        await this.$store
          .dispatch('payoutAccount/updatePrimaryPayoutAccount', {
            id: this.payoutAccount.id
          })
          .then(() => {
            if (!this.form.$hasErrors()) {
              this.showPrimary = false
              this.showSnackbar('Set as default bank account successfully!')
            } else {
              this.showSnackbar(this.form.$errorMessage, false)
            }
          })
      }
    },

    async remove() {
      this.form.$clearErrors()

      if (!this.form.$busy) {
        await this.$store
          .dispatch('payoutAccount/removePayoutAccount', {
            id: this.payoutAccount.id
          })
          .then(() => {
            if (!this.form.$hasErrors()) {
              this.showDelete = false
              this.showSnackbar('Removed bank account successfully!')
            } else {
              this.showSnackbar(this.form.$errorMessage, false)
            }
          })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.payout-account {
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 10px 15px;

  &__content {
    flex-grow: 1;

    p {
      margin-bottom: 0;
    }
  }
}
</style>
