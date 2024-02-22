<template>
  <div
    :class="{
      'token-field': true,
      [className]: !!className,
    }"
    :style="{ width: `${fields * fieldWidth}px` }"
  >
    <div class="d-flex">
      <template v-for="(v, index) in values">
        <v-text-field
          :key="`${id}-${index}`"
          :ref="iRefs[index]"
          :type="type === 'number' ? 'tel' : type"
          :pattern="type === 'number' ? '[0-9]' : null"
          :auto-focus="autoFocus && !loading && index === autoFocusIndex"
          :style="{
            width: `${fieldWidth}px`,
          }"
          :data-id="index"
          :value="v"
          :disabled="loading || disabled"
          :required="required"
          maxlength="1"
          flat
          filled
          :hide-details="true"
          :error-messages="errorMessages"
          class="token-field__field"
          @input.native="onValueChange"
          @focus="onFocus"
          @keydown="onKeyDown"
        />
      </template>
    </div>
    <ErrorMessage class="mt-2" :error="errorMessages" />
  </div>
</template>

<script>
import ErrorMessage from '@/components/fields/ErrorMessage'

/**
 * Original code is from https://github.com/suweya/vue-verification-token-field.
 * I copied instead of installing to have more control in customizing this component.
 */

const KEY_CODE = {
  backspace: 8,
  left: 37,
  up: 38,
  right: 39,
  down: 40
}

export default {
  components: {
    ErrorMessage
  },
  props: {
    value: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'number'
    },

    className: {
      type: String,
      default: null
    },

    fields: {
      type: Number,
      default: 5
    },

    fieldWidth: {
      type: Number,
      default: 62.5
    },

    fieldHeight: {
      type: Number,
      default: 54
    },

    autoFocus: {
      type: Boolean,
      default: true
    },

    errorMessages: {
      type: [String, Array],
      default: null
    },

    disabled: {
      type: Boolean,
      default: false
    },

    required: {
      type: Boolean,
      default: false
    },

    change: {
      type: Function,
      default: null
    },

    complete: {
      type: Function,
      default: null
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const { fields, values } = this
    let vals
    let autoFocusIndex = 0

    if (values && values.length) {
      vals = []
      for (let i = 0; i < fields; i++) {
        vals.push(values[i] || '')
      }

      autoFocusIndex = values.length >= fields ? 0 : values.length
    } else {
      vals = Array(fields).fill('')
    }

    this.iRefs = []
    for (let i = 0; i < fields; i++) {
      this.iRefs.push(`input_${i}`)
    }

    this.id = +new Date()
    return { values: vals, autoFocusIndex }
  },

  watch: {
    value(newValue, oldValue) {
      if (!newValue) {
        this.reset()
      }
    }
  },

  methods: {
    focus() {
      this.$nextTick(() => {
        const input = this.$refs.input_0
        if (input) {
          input[0].focus()
        }
      })
    },

    onFocus(e) {
      e.target.select(e)
    },

    onValueChange(e) {
      const index = parseInt(e.target.dataset.id)
      const { type, fields } = this

      if (type === 'number') {
        e.target.value = e.target.value.replace(/[^\d]/gi, '')
      }
      // this.handleKeys[index] = false;
      if (
        e.target.value === '' ||
        (type === 'number' && !e.target.validity.valid)
      ) {
        return
      }

      let next
      const value = e.target.value
      let { values } = this
      values = Object.assign([], values)

      if (value.length > 1) {
        let nextIndex = value.length + index - 1
        if (nextIndex >= fields) {
          nextIndex = fields - 1
        }

        next = this.iRefs[nextIndex]
        const split = value.split('')
        split.forEach((item, i) => {
          const cursor = index + i
          if (cursor < fields) {
            values[cursor] = item
          }
        })

        this.values = values
      } else {
        next = this.iRefs[index + 1]
        values[index] = value
        this.values = values
      }

      if (next) {
        const element = this.$refs[next][0]
        element.focus()
      }

      this.triggerChange(values, index + 1 === fields)
    },

    onKeyDown(e) {
      const index = parseInt(e.target.dataset.id)
      const prevIndex = index - 1
      const nextIndex = index + 1
      const prev = this.iRefs[prevIndex]
      const next = this.iRefs[nextIndex]

      switch (e.keyCode) {
        case KEY_CODE.backspace: {
          e.preventDefault()
          const vals = [...this.values]

          if (this.values[index]) {
            vals[index] = ''
            this.values = vals
            this.triggerChange(vals)
          } else if (prev) {
            vals[prevIndex] = ''
            this.$refs[prev][0].focus()
            this.values = vals
            this.triggerChange(vals)
          }
          break
        }

        case KEY_CODE.left:
          e.preventDefault()
          if (prev) {
            this.$refs[prev][0].focus()
          }
          break

        case KEY_CODE.right:
          e.preventDefault()
          if (next) {
            this.$refs[next][0].focus()
          }
          break

        case KEY_CODE.up:
        case KEY_CODE.down:
          e.preventDefault()
          break

        default:
          // this.handleKeys[index] = true;
          break
      }
    },

    triggerChange(values = this.values, onEnd = false) {
      const val = values.join('')
      this.$emit('input', val)
      this.$emit('change', val)

      if (onEnd) {
        this.$emit('complete', val)
      }
    },

    reset() {
      this.values = new Array(this.fields).fill('')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/assets/scss/abstracts/_placeholders';

.token-field {
  position: relative;

  &__field {
    font-size: 1.4rem;
    font-weight: bold;
    border-width: 2px;
    margin-right: 11.5px;
  }
}

.token-field.is-invalid {
  margin-bottom: 10px;

  .token-field__field:active,
  .token-field__field:focus {
    // border-color: $brand-2;
    // color: $brand-2;
  }
}

::v-deep input {
  @extend %h3-style;
  text-align: center;
  max-height: unset;
}
</style>
