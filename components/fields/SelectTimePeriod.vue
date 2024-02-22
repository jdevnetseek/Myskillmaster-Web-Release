<template>
  <div>
    <v-select
      class="select-time-period"
      :value="value"
      :items="validItems"
      :label="placeholder"
      :loading="loading"
      :disabled="disabled"
      append-icon="mdi-chevron-down"
      v-bind="$attrs"
      @input="onChange"
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Select Time Period
 * ==================================================================================
 **/

import { mapState } from 'vuex'

export default {
  props: {
    value: {
      type: [String, Number],
      default: null
    },

    placeholder: {
      type: String,
      default: 'Recurrence'
    },

    loading: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    }

  },

  computed: {

    ...mapState({
      scheduleForm: state => state.lesson.lessonSchedule
    }),

    validItems() {
      const items = [{
        text: 'Weekly (' + this.dows + ' every week)',
        value: 'week',
        max: 52
      },
      {
        text: 'Monthly every ' + this.weeklyText,
        value: 'month',
        max: 12
      },
      {
        text: 'Custom',
        value: 'custom',
        max: 365
      }]
      return items
    },

    dows() {
      return this.scheduleForm.days ? this.scheduleForm.days.join(', ') : ''
    },

    weeklyText() {
      const days = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
      ]
      let earliestDow = 10

      if (this.scheduleForm.date) {
        const ddate = new Date(this.scheduleForm.date)

        const day = ddate.getDay()
        let nthDay = Math.ceil(ddate.getDate() / 7)

        if (this.scheduleForm.days) {
          this.scheduleForm.days.forEach((v) => {
            const vIndex = days.indexOf(v)
            if (vIndex >= 0 && vIndex < earliestDow) {
              earliestDow = vIndex
            }
          })
        }

        if (earliestDow < day - 1) {
          nthDay = nthDay + 1
        }
        nthDay = nthDay.toString()

        if (nthDay === '1') {
          nthDay = nthDay + 'st'
        } else if (nthDay === '2') {
          nthDay = nthDay + 'nd'
        } else if (nthDay === '3') {
          nthDay = nthDay + 'rd'
        } else {
          nthDay += 'th'
        }

        return nthDay + ' ' + this.dows
      }
      return ''
    }

  },

  methods: {
    onChange(value) {
      this.$emit('input', value)
    }
  }
}
</script>
