<template>
  <date-picker
    ref="datepicker"
    v-model="date"
    v-bind="datepickerAttrs"
    class="datetime-picker"
    :open.sync="open"
    :type="type"
    :clearable="false"
    :show-second="false"
    :use12h="true"
    :disabled="disabled || readonly"
    :disabled-date="disabledDate"
    :disabled-time="disabledTime"
    @input="selectDate"
  >
    <v-text-field
      slot="input"
      readonly
      :value="parsedDate"
      v-bind="textfieldAttrs"
      :disabled="disabled"
      :error-messages="errors"
      append-icon="mdi-chevron-down"
    />
  </date-picker>
</template>
<script>
/**
 * ==================================================================================
 * Date/Time picker using `vue2-datepicker`
 * (https://github.com/mengxiong10/vue2-datepicker)
 * ==================================================================================
 **/

import FORMAT from '@/utils/enums/Format'
import DATE from '@/utils/Date'

export default {
  name: 'DatetimePicker',
  props: {
    value: {
      type: [String, Date],
      default: null
    },

    /**
     * Used by `time` types only, will be the default date when checking
     * the greater/less than logic
     */
    timeDate: {
      type: [String, Date],
      default: null
    },

    dateFormat: {
      type: String,
      default: FORMAT.dateFormat
    },

    timeFormat: {
      type: String,
      default: FORMAT.timeFormat
    },

    datetimeFormat: {
      type: String,
      default: FORMAT.datetimeFormat
    },

    disabled: {
      type: Boolean,
      default: false
    },

    readonly: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      /* date|time|datetime */
      default: 'date',
      validator: value => ['date', 'time', 'datetime'].includes(value)
    },

    defaultValue: {
      type: [String, Date],
      default: ''
    },

    errorMessages: {
      type: [String, Array],
      default: null
    },

    /**
     * Disables the date/time selector greater/less than the specified date
     * NOTE: For `date` type, if time set and is greater than 00:00AM it will disable that date already
     */
    greaterThan: {
      type: [String, Date],
      default: null
    },

    lessThan: {
      type: [String, Date],
      default: null
    },

    disablePastDate: {
      type: Boolean,
      default: false
    },

    disableBeforeDate: {
      type: [String, Date],
      default: ''
    }
  },

  data() {
    return {
      open: false,
      /**
       * Datepicker component v-model
       */
      date: null,
      /**
       * Textfield component v-model
       */
      parsedDate: null,
      /**
       * Allowed bindable attributes to the datepicker component
       * (https://github.com/mengxiong10/vue2-datepicker#props)
       */
      datepickerOptions: ['range', 'editable'],
      dateError: null
    }
  },

  computed: {
    format() {
      switch (this.type) {
        case 'datetime':
          return this.datetimeFormat
        case 'time':
          return this.timeFormat
        case 'date':
        default:
          return this.dateFormat
      }
    },

    datepickerAttrs() {
      return this.remap(key => this.datepickerOptions.includes(key))
    },

    textfieldAttrs() {
      return this.remap(key => !this.datepickerOptions.includes(key))
    },

    errors() {
      const formError = Array.isArray(this.errorMessages)
        ? this.errorMessages
        : [this.errorMessages]
      return [...formError, this.dateError].filter(e => e)
    }
  },

  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.init()
        this.validate()
      }
    },

    defaultValue(val) {
      this.date = val
      this.selectDate()
    },

    timeDate() {
      if (this.type === 'time' && this.value) {
        this.selectDate()
      }
    },

    greaterThan(newValue) {
      if (newValue) {
        this.validate()
      }
    },

    lessThan(newValue) {
      if (newValue) {
        this.validate()
      }
    }
  },

  created() {
    this.init()

    this.$root.$on('datetimeOpen', (datetimePicker) => {
      if (datetimePicker !== this) {
        this.toggleCalendar(false)
      }
    })
  },

  methods: {
    init() {
      this.date = this.value
      this.parsedDate = this.parse(this.date)
    },

    toggleCalendar(bool = null) {
      const show = bool === null ? !this.open : bool
      this.open = show

      if (show) {
        this.$root.$emit('datetimeOpen', this)
      }
    },

    selectDate() {
      if (this.validate()) {
        let date = this.date

        /**
         * For `time` type, Update date, month & year depending on the
         * `timeDate` props
         */
        if (this.type === 'time') {
          const time = DATE.convert(this.date)
          date = new Date(this.timeDate || new Date())
          date.setHours(time.get('hour'))
          date.setMinutes(time.get('minute'))
        }

        this.$emit('input', date)
      }
    },

    /**
     * Check if selected date passed the greater/less than logic
     */
    validate() {
      if (!this.date) {
        return true
      }
      this.dateError = null
      /**
       * For time checking, if not on the same day then we don't
       * need to check it
       */
      if (this.greaterThan && DATE.isBefore(this.date, this.greaterThan)) {
        this.dateError = `Must be after ${this.parse(
          this.greaterThan,
          FORMAT.datetimeFormat
        )}`
        return false
      } else if (this.lessThan && DATE.isAfter(this.date, this.lessThan)) {
        this.dateError = `Must be before ${this.parse(
          this.lessThan,
          FORMAT.datetimeFormat
        )}`
      }

      return !this.dateError
    },

    disabledDate(date) {
      if (this.disablePastDate) {
        return DATE.isBefore(date, new Date(), 'day')
      }
      if (this.disableBeforeDate !== '') {
        console.log(DATE.isBefore(date, this.disableBeforeDate, 'day'))
        return DATE.isBefore(date, this.disableBeforeDate, 'day')
      }

      return false
    },

    disabledTime(time) {
      const currentDate = new Date()
      const currentTime = new Date(this.timeDate || new Date())
      currentTime.setHours(time.getHours())
      currentTime.setMinutes(time.getMinutes())

      if (
        this.disablePastDate &&
        DATE.isSame(currentTime, currentDate, 'day')
      ) {
        return DATE.isSameOrBefore(currentTime, currentDate)
      }

      return false
    },

    parse(value, format = this.format) {
      if (!value) {
        return ''
      }
      return DATE.format(value, format)
    },

    remap(filter) {
      return Object.keys(this.$attrs)
        .filter(key => filter(key))
        .reduce((obj, key) => {
          obj[key] = this.$attrs[key]
          return obj
        }, {})
    }
  }
}
</script>
<style scoped lang="scss">
.datetime-picker {
  width: 100%;

  ::v-deep .mx-input-wrapper {
    .mx-icon-calendar {
      display: none;
    }
  }
}
</style>
