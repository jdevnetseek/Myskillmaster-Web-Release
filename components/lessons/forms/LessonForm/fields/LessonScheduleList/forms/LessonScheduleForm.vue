<template>
  <Modal
    class="lesson-slot-form"
    :title="title"
    :max-width="maxWidth"
    :value="value"
    v-bind="$attrs"
    @input="toggle"
  >
    <div class="lesson-slot-form__border">
      <div class="lesson-slot-form__fields">
        <v-row>
          <v-col>
            <b>Lesson Time</b>
            <v-select
              v-model="scheduleForm.days"
              class="select-time-period"
              label="Lesson day(s)"
              hide-details="auto"
              append-icon="mdi-chevron-down"
              :items="dows"
              flat
              filled
              multiple
              clearable
            />
          </v-col>
          <v-col cols="12">
            <DatetimePicker
              v-model="scheduleForm.date"
              :date-format="dateFormat"
              :disable-past-date="true"
              :disabled="disabled"
              type="date"
              flat
              filled
              hide-details="auto"
              label="Start date"
              :error-messages="hasError('scheduleForm.date', 'Date')"
            />
          </v-col>
          <v-col cols="12">
            <DatetimePicker
              v-model="scheduleForm.end_date"
              :date-format="dateFormat"
              :disable-before-date="scheduleForm.date"
              :default-value="scheduleForm.date"
              :disabled="disabled"
              type="date"
              flat
              filled
              hide-details="auto"
              label="End date"
              :error-messages="hasError('scheduleForm.end_date', 'Date')"
            />
          </v-col>
          <v-col cols="12">
            <DatetimePicker
              v-model="scheduleForm.time"
              :time-format="timeFormat"
              :time-date="scheduleForm.date"
              :disable-past-date="true"
              :disabled="disabled"
              type="time"
              flat
              filled
              hide-details="auto"
              label="Lesson time"
              :error-messages="hasError('scheduleForm.time', 'Time')"
            />
          </v-col>
          <v-col cols="12">
            <span class="info-text">*This lesson goes for {{ scheduleForm.duration_in_hours }} hours</span>
          </v-col>
          <v-col cols="12">
            <SelectTimePeriod
              v-if="canSelectReccurrence"
              v-model="scheduleForm.recurrence"
              type="text"
              required
              flat
              filled
              hide-details="auto"
              label="Recurrence"
              autocomplete="off"
              :error-messages="
                hasError('scheduleForm.recurrence', 'Recurrence')
              "
            />
          </v-col>
          <v-col v-if="scheduleForm.recurrence === 'custom'" cols="12">
            <v-text-field
              v-model="scheduleForm.frequency"
              type="text"
              required
              flat
              filled
              hide-details="auto"
              label="Frequency"
              autocomplete="off"
              :disabled="scheduleForm.$busy"
              :error-messages="hasError('scheduleForm.frequency', 'Frequency')"
            />
          </v-col>
          <v-col v-if="scheduleForm.recurrence === 'custom'" cols="12">
            <v-select
              v-model="scheduleForm.period"
              label="Period"
              hide-details="auto"
              :items="periods"
              flat
              filled
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <ErrorMessage :error="scheduleForm.$getError('schedule_start')" />
            <ErrorMessage
              :error="hasError('scheduleForm.schedule_start', 'Schedule')"
            />
            <ErrorMessage
              :error="hasError('scheduleForm.schedule_end', 'End Date')"
            />
            <ErrorMessage
              :error="hasError('scheduleForm.frequency', 'Frequency')"
            />
            <ErrorMessage
              :error="hasError('scheduleForm.duration_in_hours', 'Duration in hours')"
            />
          </v-col>
        </v-row>
      </div>
      <div class="lesson-slot-form__actions">
        <v-btn
          class="lesson-slot-form__actions__submit"
          color="primary"
          depressed
          type="submit"
          align="right"
          :disabled="disabled"
          :loading="disabled"
          @click="validate()"
        >
          Add slot
        </v-btn>
      </div>
    </div>
  </Modal>
</template>
<script>
/**
 * ==================================================================================
 * Lesson Schedule Form
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { hasError, validationMixin } from '@/validations'
import {
  DATE_FORMAT,
  TIME_FORMAT,
  DATETIME_FORMAT
} from '@/utils/enums/LessonSchedule'
// import { WEEKLY, MONTHLY } from '@/utils/enums/TimePeriod'
import { isObject } from '@/utils/Helpers'
import FORMAT from '@/utils/enums/Format'
import DATE from '@/utils/Date'
import Modal from '@/components/modals/Modal'
import ModalMixin from '@/utils/mixins/Modal'
import DatetimePicker from '@/components/fields/DatetimePicker'
import ErrorMessage from '@/components/fields/ErrorMessage'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import SelectTimePeriod from '@/components/fields/SelectTimePeriod'

export default {
  components: {
    Modal,
    DatetimePicker,
    ErrorMessage,
    SelectTimePeriod
  },
  mixins: [ModalMixin, SnackbarMixin, validationMixin],

  props: {
    title: {
      type: String,
      default: 'Add lesson schedule'
    },

    maxWidth: {
      type: Number,
      default: 343
    },

    durationHours: {
      type: Number,
      default: 0
    }

  },

  data() {
    return {
      dows: [
        {
          text: 'All',
          value: 'all'
        },
        {
          text: 'Monday',
          value: 'Mon'
        },
        {
          text: 'Tuesday',
          value: 'Tue'
        },
        {
          text: 'Wednesday',
          value: 'Wed'
        },
        {
          text: 'Thursday',
          value: 'Thu'
        },
        {
          text: 'Friday',
          value: 'Fri'
        },
        {
          text: 'Saturday',
          value: 'Sat'
        },
        {
          text: 'Sunday',
          value: 'Sun'
        }
      ],
      selectedDows: '',
      schedules: [],
      invalidSchedules: [],
      periods: [
        'Week',
        'Month'
      ]
    }
  },

  computed: {
    hasError,
    ...mapState({
      lessonForm: state => state.lesson.lesson,
      scheduleForm: state => state.lesson.lessonSchedule,
      lesson: state => state.lesson.lessonDetails
    }),

    ...mapGetters({
      user: 'user/getUser',
      forUpdate: 'lesson/hasLessonDetails'
    }),

    canSelectReccurrence() {
      return this.scheduleForm.date && this.scheduleForm.days && this.scheduleForm.days.length > 0
    },

    dateFormat() {
      return DATE_FORMAT
    },

    timeFormat() {
      return TIME_FORMAT
    },

    disabled() {
      return this.lessonForm.$busy || this.scheduleForm.$busy
    },

    timezone() {
      return DATE.timezone()
    }
  },

  watch: {
    'scheduleForm.date'() {
      this.updateSchedule()
    },

    'scheduleForm.time'() {
      this.updateSchedule()
    },

    'scheduleForm.end_date'() {
      this.updateSchedule()
    },

    'scheduleForm.days'() {
      this.updateDays()
    },

    durationHours() {
      this.scheduleForm.duration_in_hours = this.durationHours
    }

  },

  methods: {
    updateSchedule() {
      if (this.scheduleForm.date && this.scheduleForm.time) {
        const time = DATE.convert(this.scheduleForm.time)
        const timeOut = time.add(this.durationHours, 'hours')
        const date = new Date(this.scheduleForm.date)
        const endDate = new Date(this.scheduleForm.end_date)

        date.setHours(time.get('hour'))
        date.setMinutes(time.get('minute'))

        endDate.setHours(timeOut.get('hour'))
        endDate.setMinutes(time.get('minute'))

        this.scheduleForm.schedule_start = date
        this.scheduleForm.schedule_end = endDate
      } else {
        this.scheduleForm.schedule_start = ''
        this.scheduleForm.schedule_end = ''
      }
    },

    updateDays() {
      if (this.scheduleForm.days) {
        const all = this.scheduleForm.days.find(v => v === 'all')
        if (all) {
          this.scheduleForm.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      }
    },

    onSuccess() {
      this.close()
      this.showSnackbar(
        `Added schedule successfully${
          this.invalidSchedules.length > 0
            ? ', removed the ff. schedules due to conflicts'
            : '!'
        }`,
        true,
        this.invalidSchedules
      )

      this.$v.$reset()
      this.scheduleForm.$reset()
      this.scheduleForm.duration_in_hours = this.durationHours
      this.schedules = []
      this.invalidSchedules = []
    },

    async validate() {
      this.$v.$touch()
      this.scheduleForm.$clearErrors()

      if (!this.scheduleForm.$busy && !this.$v.$invalid) {
        this.generateRecurringSchedule()

        await this.$store
          .dispatch('lesson/validateLessonSchedule', {
            master_id: this.user.id,
            timezone: this.timezone,
            lesson_schedules: this.schedules
          })
          .then(async() => {
            if (this.scheduleForm.$hasErrors()) {
              this.removeConflictedSchedules(this.scheduleForm.$errors)
            }

            if (this.schedules.length > 0) {
              await this.submit()
            } else {
              this.showSnackbar(
                'Adding of schedule(s) failed due to conflict in schedules',
                false,
                this.invalidSchedules
              )
            }
          })
      }
    },

    async submit() {
      if (!this.forUpdate) {
        this.lessonForm.lesson_schedules.push(...this.schedules)
        this.onSuccess()
      } else {
        await this.$store
          .dispatch('lesson/addLessonSchedule', {
            master_lesson_id: this.lesson.id,
            timezone: this.timezone,
            lesson_schedules: this.schedules
          })
          .then(() => {
            if (!this.scheduleForm.$hasErrors()) {
              this.onSuccess()
            } else {
              this.showSnackbar(this.scheduleForm.$errorMessage, false)
            }
          })
      }
    },

    generateRecurringSchedule() {
      this.schedules = []
      this.invalidSchedules = []

      this.schedules.push(
        this.getScheduleData(this.scheduleForm.schedule_start)
      )

      // NOTE: remove this for the time being because we now won't duplicate schedule for recurring ones
      // if (this.scheduleForm.frequency > 1) {
      //   const date = DATE.convert(this.scheduleForm.schedule_start)
      //   for (let i = 1; i < this.scheduleForm.frequency; i++) {
      //     const newDate = date.add(i, this.scheduleForm.time_period)

      //     if (this.validateDate(newDate)) {
      //       this.schedules.push(this.getScheduleData(newDate))
      //     } else {
      //       this.invalidSchedules.push(DATE.format(newDate, DATETIME_FORMAT))
      //     }
      //   }
      // }
    },

    validateDate(value) {
      const start = DATE.convert(value)
      const end = start.add(this.scheduleForm.duration_in_hours, 'hour')

      for (const date of this.lessonForm.lesson_schedules) {
        const compareStart = DATE.convert(date.schedule || date.schedule_start)
        const compareEnd = compareStart.add(date.lesson_duration, 'hour')
        if (DATE.isBetweenRange(start, end, compareStart, compareEnd) && this.hasOverlappingDays()) {
          return false
        }
      }

      return true
    },

    hasOverlappingDays() {
      let result = false

      this.lessonForm.lesson_schedules.forEach((sched) => {
        sched.dows.forEach((daySelected) => {
          this.scheduleForm.days.forEach((day) => {
            if (day === daySelected) {
              result = true
            }
          })
        })
      })

      return result
    },

    removeConflictedSchedules(errors) {
      const removedSchedules = new Set()
      if (isObject(errors)) {
        for (const error in errors) {
          if (error && error.includes('lesson_schedules')) {
            const schedule = this.schedules[error.split('.')[1]]
            this.invalidSchedules.push(
              DATE.format(schedule.schedule_start, DATETIME_FORMAT)
            )

            removedSchedules.add(schedule)
          }
        }

        this.schedules = this.schedules.filter(x => !removedSchedules.has(x))
      }
    },

    getScheduleData(schedule) {
      return {
        schedule_start: DATE.format(schedule, FORMAT.laravelFormat),
        schedule_end: DATE.format(this.scheduleForm.end_date, FORMAT.laravelFormat),
        duration_in_hours: this.scheduleForm.duration_in_hours,
        timezone: this.timezone,
        dows: this.scheduleForm.days,
        recurrence: this.scheduleForm.recurrence,
        frequency: this.scheduleForm.frequency,
        period: this.scheduleForm.period
      }
    }
  },

  validations() {
    const rules = {
      date: {
        required
      },
      time: {
        required
      },
      duration_in_hours: {
        required
      },
      schedule_start: {
        required,
        lessonScheduleConflict(value) {
          return this.validateDate(value)
        }
      },
      end_date: {
        required
      },
      frequency: {
      },
      period: {
      },
      recurrence: {
        required
      }
    }

    if (this.scheduleForm.recurrence === 'custom') {
      rules.frequency.required = required
      rules.period.required = required
    }

    return {
      scheduleForm: rules
    }
  }
}
</script>
<style scoped lang="scss">
.info-text {
  color: #007675;
  font-size: 0.8em;
}
.lesson-slot-form {
  &__fields {
    margin-bottom: 40px;

    .col {
      padding-bottom: 0;
    }

    &__duration {
      font-weight: 400;
      color: $secondary-text;
    }
  }

  &__actions {
    &__submit {
      width: 100%;
    }
  }
}
</style>
