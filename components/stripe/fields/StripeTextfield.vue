<template>
  <div
    class="stripe-textfield"
    :class="{
      'stripe-textfield--focus': attributes.focus,
      'stripe-textfield--value': attributes.value,
      'stripe-textfield--error': attributes.error,
    }"
  >
    <div class="stripe-textfield__input">
      <label
        v-if="!initializing"
        class="stripe-textfield__input__placeholder"
      >{{ placeholder }}</label>
      <div :id="id" ref="input" />
    </div>
    <template v-if="initializing">
      <v-skeleton-loader type="chip" transition="fade-transition" />
    </template>
    <ErrorMessage class="mt-2 ml-3" :error="errors" />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Stripe Textfield
 * ==================================================================================
 **/

import ErrorMessage from '@/components/fields/ErrorMessage'

export default {
  components: {
    ErrorMessage
  },
  props: {
    id: {
      type: String,
      required: true
    },

    placeholder: {
      type: String,
      default: 'Placeholder'
    },

    errorMessages: {
      type: Array,
      default: () => []
    },

    stripeElements: {
      type: Object,
      default: () => null
    }
  },

  data() {
    return {
      initializing: true,
      textfield: null,

      validateError: null,
      attributes: {
        focus: false,
        empty: false,
        error: false,
        complete: false
      }
    }
  },

  computed: {
    /**
     * Style setup when using card elements
     * (https://stripe.com/docs/js/appendix/style)
     */
    style() {
      return {
        /* All other variants inherit from these styles */
        base: {
          fontFamily: 'Satoshi, sans-serif',
          fontWeight: '500',
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          color: '#0a2127',
          /* Hide the placeholder as the Custom Input will re-create one */
          '::placeholder': {
            color: 'transparent',
            textShadow: 'none'
          }
        },
        /* Applied when the Element has valid input */
        complete: {},
        /* Applied when the Element has no customer input */
        empty: {},
        /* Applied when the Element has invalid input */
        invalid: {}
      }
    },

    errors() {
      return (
        this.errorMessages.length ? this.errorMessages : [this.validateError]
      ).filter(a => !!a)
    }
  },

  watch: {
    stripeElements() {
      this.init()
    }
  },

  mounted() {
    this.init()
  },

  destroyed() {
    if (this.textfield) {
      this.textfield.unmount()
      this.textfield = null
    }
  },

  methods: {
    /**
     * Create a Stripe element and mount to element
     * https://stripe.com/docs/js/elements_object/create_element?type=card
     */
    async init(component = null, onError = null) {
      if (!this.stripeElements) {
        return
      }

      this.initializing = true
      this.textfield = null

      this.textfield = this.stripeElements.create(this.id, {
        style: this.style
      })
      await this.textfield.mount(`#${this.id}`)

      /* Trigger attribute changes on stripe native field */
      this.observeClass('StripeElement--focus', (state) => {
        this.attributes.focus = state
      })
      this.observeClass('StripeElement--empty', (state) => {
        this.attributes.value = !state
      })
      this.observeClass('StripeElement--invalid', (state) => {
        this.attributes.error = state
      })
      this.observeClass('StripeElement--complete', (state) => {
        this.attributes.complete = state

        if (state) {
          this.attributes.error = false
          this.setError(null)
        }
      })

      /**
       * Add in Stripe's error handling
       * https://stripe.com/docs/js/element/events/on_change?type=cardElement#element_on_change-event
       */
      this.textfield.on('change', ({ error }) => {
        if (error) {
          this.setError(error.message)
        } else {
          this.attributes.error = false
          this.setError(null)
        }
      })

      this.initializing = false
    },

    validate() {
      let error = null

      if (!this.attributes.complete) {
        error = `${this.placeholder} is required`
        this.attributes.error = true
      } else {
        this.attributes.error = false
      }

      this.setError(error)

      return !error
    },

    setError(error) {
      this.validateError = error
    },

    /**
     * As Stripe creates their own element, capture the available
     * attributes and add it to this element
     *
     * @param  {String}   cls      Stripe element CSS class
     * @param  {Function} callback
     */
    observeClass(cls, callback) {
      const stripeElem = this.$el.getElementsByClassName('StripeElement')[0]
      if (stripeElem) {
        let prevClassState = stripeElem.classList.contains(cls)
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
              const currentClassState = mutation.target.classList.contains(cls)
              if (prevClassState !== currentClassState) {
                prevClassState = currentClassState
                callback(currentClassState)
              }
            }
          })
        })

        observer.observe(stripeElem, { attributes: true })
      }
    }
  }
}
</script>
<style scoped lang="scss">
$input-height: 54px;
$input-top: 10px;
$input-line: 12px;
/* Indent depending on bootstap vue input's padding */
$input-left: 12px;

.stripe-textfield {
  ::v-deep .v-skeleton-loader {
    width: 100%;

    > * {
      width: 100%;
      padding: 0;
    }
  }

  /**
   * Manually add in styling for stripe textfield, making it similar to the default
   * vuetify and custom styling
   */
  &__input {
    position: relative;
    overflow: hidden;

    &__placeholder {
      position: absolute;
      font-size: 16px;
      top: 15px;
      left: $input-left;
      pointer-events: none;
      color: $primary-s3;

      @include transition(all 0.3s ease);
    }

    /**
   * Parent container of the Stripe element holding the iFrame
   */
    .StripeElement {
      @include transition(padding 0.3s ease);

      height: $input-height;
      padding: 27px 10px 10px $input-left;
      border-radius: $border-radius;
      border: 1px solid $border-color;
      background-color: #ffffff;
    }
  }
}

.stripe-textfield--value {
  .stripe-textfield__input {
    &__placeholder {
      font-size: 12px;
      top: 7px;
    }
  }
}

.stripe-textfield:focus,
.stripe-textfield--focus {
  .stripe-textfield__input {
    &__placeholder {
      font-size: 12px;
      top: 7px;
    }

    .StripeElement {
      border-color: $primary;
    }
  }
}

.stripe-textfield--error {
  .stripe-textfield__input {
    .StripeElement {
      border-color: $alert-error;
      border-width: 2px;
    }
  }
}
</style>
