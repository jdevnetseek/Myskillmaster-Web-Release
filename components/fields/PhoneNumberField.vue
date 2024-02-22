<template>
  <div
    class="phone-number-field"
    :class="{
      'phone-number-field--error': hasError,
      'phone-number-field--disabled': disabled
    }"
  >
    <VueTelInputVuetify
      ref="input"
      v-model="phoneNumber"
      class="phone-number-field__input align-start"
      outlined
      :disabled="disabled"
      :placeholder="placeholder"
      :default-country="defaultCountry"
      :disabled-fetching-country="true"
      mode="international"
      v-bind="$attrs"
      @input="onChange"
      @validate="onValidate"
      @blur="onBlur"
    />
    <ErrorMessage :error="errors" class="mt-2 ml-2" />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Phone Number field
 * ==================================================================================
 **/

import PHONE from '@/utils/Phone'
import COUNTRY from '@/utils/Country'
import ErrorMessage from '@/components/fields/ErrorMessage'

export default {
  name: 'PhoneNumberField',
  components: {
    ErrorMessage
  },
  props: {
    value: {
      type: String,
      default: null
    },

    disabled: {
      type: Boolean,
      default: false
    },

    errorMessages: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      phoneNumber: '',
      placeholder: 'Enter a Phone Number',

      tempValidateError: null,
      validateError: null
    }
  },

  computed: {
    errors() {
      return (this.errorMessages.length
        ? this.errorMessages
        : [this.validateError]
      ).filter(a => !!a)
    },

    /**
     * NOTE: `vue-tel-input-vuetify` relies on an external API to get the
     * country code from the IP, problem is the API breaks sometimes making
     * the phone number display breaks its format
     */
    defaultCountry() {
      return COUNTRY.getCountryCode() || 'US'
    },

    hasError() {
      return !!this.errors.length
    }
  },

  watch: {
    value(newValue, oldValue) {
      if (
        newValue !== oldValue &&
        newValue !== PHONE.cleanNumber(this.phoneNumber)
      ) {
        this.init()
      }
    }
  },

  mounted() {
    this.init()
    this.removeFocusOnCountrySelector()
  },

  methods: {
    init() {
      this.phoneNumber = this.value
      this.updatePlaceholder()
    },

    updatePlaceholder() {
      let prefix = ''
      const inputElement = this.$refs.input

      if (inputElement) {
        const country = inputElement.findCountry(inputElement.activeCountryCode)
        if (country) {
          prefix = country.dialCode
        }
      }

      this.placeholder =
        (prefix ? `(+${prefix}) ` : '') + 'Enter a Phone Number'
    },

    onValidate(validate) {
      if (this.phoneNumber && !validate.isValid) {
        this.tempValidateError = 'Invalid phone number'
      } else {
        this.tempValidateError = null
        this.validateError = null
      }
    },

    onBlur() {
      this.validateError = this.tempValidateError
    },

    onChange(value, validate) {
      this.onValidate(validate)
      this.$emit('input', PHONE.cleanNumber(value))
    },

    removeFocusOnCountrySelector() {
      this.$nextTick(() => {
        const input = this.$refs.input
        if (this.$refs.input) {
          const element = input.$el.querySelector('.country-code input')
          const tabIndex = '-1'
          if (element && element.tabIndex !== tabIndex) {
            element.tabIndex = tabIndex
          }
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.phone-number-field {
  $borderColor: #e0e0e0;
  @mixin theme($borderColor) {
    ::v-deep fieldset {
      border-color: $borderColor !important;
    }
  }

  &:focus-within {
    @include theme($primary);
  }

  &--error,
  &--error:focus-within {
    @include theme($alert-error);
  }

  &--disabled,
  &--disabled:focus-within {
    @include theme($borderColor);
  }

  &__input {
    ::v-deep .country-code {
      width: 42px;

      .v-input__slot {
        margin-bottom: 0 !important;

        fieldset {
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
          border-right: none;
        }
      }
      .v-text-field__details {
        display: none;
      }
    }

    > ::v-deep .v-input {
      .v-input__slot {
        margin-bottom: 0 !important;

        fieldset {
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
          border-left: none;
        }
      }
    }
  }
}
</style>
