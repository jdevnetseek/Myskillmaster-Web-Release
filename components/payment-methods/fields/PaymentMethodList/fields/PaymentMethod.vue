<template>
  <div class="payment-method">
    <div class="payment-method__border d-flex flex-row align-center">
      <v-radio-group
        :value="selected"
        :hide-details="true"
        class="mt-0 pt-0 mr-1"
      >
        <v-radio :value="true" readonly :ripple="false" @click="onClick" />
      </v-radio-group>
      <v-img
        v-if="paymentMethod.cardLogo"
        :src="paymentMethod.cardLogo"
        max-width="32"
        height="20"
        contain
        class="rounded-0 mr-3"
      />
      <p class="mb-0">
        {{ label }}
      </p>
      <v-icon
        v-if="!forSelection"
        :disabled="form.$busy"
        color="black"
        @click="toggleDelete"
      >
        mdi-trash-can-outline
      </v-icon>
    </div>

    <ConfirmationModal
      v-model="showPrimary"
      title="Set as default"
      content="Are you sure you want to set this as your default payment method?"
      :loading="form.$busy"
      :close-on-confirm="false"
      @confirm="setAsPrimary"
    />

    <ConfirmationModal
      v-model="showDelete"
      title="Remove payment method"
      content="Are you sure you want to delete this payment method?"
      :loading="form.$busy"
      :close-on-confirm="false"
      @confirm="remove"
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Payment Method
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
    paymentMethod: {
      type: Object,
      required: true
    },

    isSelected: {
      type: Boolean,
      default: false
    },

    forSelection: {
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
      form: state => state.paymentMethod.paymentMethod
    }),

    selected() {
      return this.forSelection ? this.isSelected : this.paymentMethod.is_default
    },

    label() {
      return `Card ending ${this.paymentMethod.cardLast4}`
    }
  },

  methods: {
    onClick() {
      if (this.forSelection) {
        this.$emit('clicked')
      } else if (!this.paymentMethod.is_default) {
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
          .dispatch('paymentMethod/updatePrimaryPaymentMethod', {
            id: this.paymentMethod.id
          })
          .then(() => {
            if (!this.form.$hasErrors()) {
              this.showPrimary = false
              this.showSnackbar('Set as default payment method successfully!')
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
          .dispatch('paymentMethod/removePaymentMethod', {
            id: this.paymentMethod.id
          })
          .then(() => {
            if (!this.form.$hasErrors()) {
              this.showDelete = false
              this.showSnackbar('Removed payment method successfully!')
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
.payment-method {
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 20px 15px;

  p {
    flex-grow: 1;
  }
}
</style>
