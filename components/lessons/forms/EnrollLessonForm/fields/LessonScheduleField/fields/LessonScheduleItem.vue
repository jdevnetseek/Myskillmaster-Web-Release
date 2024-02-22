<template>
  <div
    class="lesson-schedule-item d-flex flex-row align-center"
    :class="{
      'lesson-schedule-item--selected': selected,
      'lesson-schedule-item--disabled': disabled,
    }"
    @click="onClick"
  >
    <p>
      {{ scheduleLabel }}
    </p>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Lesson Schedule Item
 * ==================================================================================
 **/

import { DATE_FORMAT, TIME_FORMAT } from '@/utils/enums/LessonSchedule'
import DATE from '@/utils/Date'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import { MONTHLY, WEEKLY } from '~/utils/enums/TimePeriod'

export default {
  mixins: [SnackbarMixin],
  props: {
    schedule: {
      type: Object,
      required: true
    },

    selected: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    startDate() {
      return DATE.format(this.schedule.schedule_start, DATE_FORMAT)
    },

    endDate() {
      return DATE.format(this.schedule.schedule_end, DATE_FORMAT)
    },

    timeStart() {
      return DATE.format(this.schedule.schedule_start, TIME_FORMAT)
    },

    timeEnd() {
      return DATE.format(this.schedule.schedule_end, TIME_FORMAT)
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
      const ddate = new Date(this.schedule.schedule_start)

      const day = ddate.getDay()
      let nthDay = Math.ceil(ddate.getDate() / 7)
      // explode schedule.dows
      const dows = this.schedule.dows.split(', ')
      dows.forEach((v) => {
        const vIndex = days.indexOf(v)
        if (vIndex >= 0 && vIndex < earliestDow) {
          earliestDow = vIndex
        }
      })

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

      return nthDay + ' ' + this.schedule.dows
    },

    scheduleLabel() {
      if (this.schedule.recurrence === WEEKLY) {
        return `Weekly (every ${this.schedule.dows}) ${this.timeStart}
         - ${this.timeEnd} from
         ${this.startDate} to
         ${this.endDate}`
      } else if (this.schedule.recurrence === MONTHLY) {
        return `Monthly (every ${this.weeklyText}) ${this.timeStart}
         - ${this.timeEnd} from
         ${this.startDate} to
         ${this.endDate}`
      }
      return `Every ${this.schedule.frequency} ${this.schedule.period}/s starting
        ${this.startDate} until
        ${this.endDate} at
        ${this.timeStart} to ${this.timeEnd}`
    },

    disabled() {
      return (
        !this.schedule.is_available_for_enrollment || this.schedule.slots <= 0
      )
    }
  },

  methods: {
    onClick() {
      if (this.disabled) {
        return
      }
      this.$emit('clicked', this.schedule.id)
    }
  }
}
</script>
<style scoped lang="scss">
.lesson-schedule-item {
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;

  p {
    font-weight: 500;
    margin-bottom: 0;
  }
}

.lesson-schedule-item--selected {
  border-color: $primary;

  p {
    color: $primary;
  }
}

.lesson-schedule-item--disabled {
  border-color: $inactive-text;
  cursor: not-allowed;

  p {
    color: $inactive-text;
  }
}
</style>
