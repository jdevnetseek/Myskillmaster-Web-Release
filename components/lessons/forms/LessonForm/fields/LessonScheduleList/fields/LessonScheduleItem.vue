<template>
  <div class="lesson-schedule-item">
    <div class="lesson_schedule-item__border d-flex flex-row align-center">
      <v-icon color="#839A9C" size="18" class="mr-3">
        $clock
      </v-icon>
      <p class="mr-2 mb-0">
        {{ scheduleLabel }}
      </p>
      <v-icon
        :disabled="disabled"
        color="#0A2127"
        size="25"
        @click="toggleDelete"
      >
        mdi-close
      </v-icon>
    </div>

    <ErrorMessage :error="errorMessages" />

    <ConfirmationModal
      v-model="showChoicesModal"
      title="Schedule already has student"
      content="The schedule you want to delete already has a student enrolled"
      :loading="disabled"
      cancel-label="Refund"
      confirm-label="Reschedule"
      @cancel="toggleRefund"
      @confirm="toggleReschedule"
    />

    <ConfirmationModal
      v-model="showRefundModal"
      title="Cancel lesson"
      content="Cancelling this lesson will refund the student. Would you like to continue?"
      confirm-label="Confirm"
      @confirm="
        $router.push({
          name: 'my-lessons-to-teach-scheduleId-cancel',
          params: {
            scheduleId: schedule.id,
          },
        })
      "
    />

    <ConfirmationModal
      v-model="showRescheduleModal"
      title="Reschedule lesson"
      content="Would you like to continue in re-scheduling this lesson?"
      confirm-label="Confirm"
      @confirm="
        $router.push({
          name: 'my-lessons-to-teach-scheduleId-reschedule',
          params: {
            scheduleId: schedule.id,
          },
        })
      "
    />

    <ConfirmationModal
      v-model="showRemoveModal"
      title="Remove schedule"
      content="Are you sure you want to delete this schedule?"
      :loading="disabled"
      :close-on-confirm="false"
      @confirm="remove"
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Lesson Schedule Item
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { findIndex } from 'lodash'
import { DATETIME_FORMAT } from '@/utils/enums/LessonSchedule'
import DATE from '@/utils/Date'
import ErrorMessage from '@/components/fields/ErrorMessage'
import ConfirmationModal from '@/components/modals/ConfirmationModal'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  components: {
    ErrorMessage,
    ConfirmationModal
  },
  mixins: [SnackbarMixin],

  props: {
    schedule: {
      type: Object,
      required: true
    },

    errorMessages: {
      type: [String, Array],
      default: null
    }
  },

  data() {
    return {
      showRemoveModal: false,
      showChoicesModal: false,
      showRefundModal: false,
      showRescheduleModal: false
    }
  },

  computed: {
    ...mapState({
      lessonForm: state => state.lesson.lesson,
      scheduleForm: state => state.lesson.lessonSchedule
    }),

    ...mapGetters({
      hasLesson: 'lesson/hasLessonDetails'
    }),

    scheduleDate() {
      return this.schedule.schedule || this.schedule.schedule_start
    },

    duration() {
      return this.schedule.lesson_duration || this.schedule.duration_in_hours
    },

    dows() {
      return this.schedule.dows ? this.schedule.dows.join(', ') : ''
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
      const ddate = new Date(this.scheduleDate)

      const day = ddate.getDay()
      let nthDay = Math.ceil(ddate.getDate() / 7)

      this.schedule.dows.forEach((v) => {
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

      return nthDay + ' ' + this.dows
    },

    recurrence() {
      if (this.schedule.recurrence === 'week') {
        return `Weekly (${this.dows})`
      } else if (this.schedule.recurrence === 'month') {
        return `Monthly (every ${this.weeklyText})`
      } else {
        return `Custom (every ${this.schedule.frequency} ${this.schedule.period}/s)`
      }
    },

    scheduleLabel() {
      return `${this.recurrence} starting ${DATE.format(this.scheduleDate, DATETIME_FORMAT)} (${
        this.duration
      }hr${this.duration > 1 ? 's' : ''})`
    },

    disabled() {
      return this.lessonForm.$busy || this.scheduleForm.$busy
    },

    forUpdate() {
      return this.hasLesson && this.schedule.id
    }
  },

  methods: {
    toggleDelete() {
      if (
        !Object.prototype.hasOwnProperty.call(
          this.schedule,
          'is_available_for_enrollment'
        ) ||
        this.schedule.is_available_for_enrollment
      ) {
        this.showRemoveModal = !this.showRemoveModal
      } else {
        this.toggleChoices()
      }
    },

    toggleChoices() {
      this.showChoicesModal = !this.showChoicesModal
    },

    toggleRefund() {
      this.showRefundModal = !this.showRefundModal
    },

    toggleReschedule() {
      this.showRescheduleModal = !this.showRescheduleModal
    },

    async remove() {
      this.scheduleForm.$clearErrors()

      if (!this.scheduleForm.$busy) {
        if (!this.forUpdate) {
          const index = findIndex(
            this.lessonForm.lesson_schedules,
            this.schedule
          )
          if (index >= 0) {
            this.lessonForm.lesson_schedules.splice(index, 1)
            this.showRemoveModal = false
          }

          this.$emit('deleted')
        } else {
          await this.$store
            .dispatch('lesson/removeLessonSchedule', {
              id: this.schedule.id
            })
            .then(() => {
              if (!this.scheduleForm.$hasErrors()) {
                this.showRemoveModal = false
                this.showSnackbar('Removed schedule successfully!')

                this.$emit('deleted')
              } else {
                this.showSnackbar(this.scheduleForm.$errorMessage, false)
              }
            })
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.lesson-schedule-item {
  &__border {
    > * {
      margin-bottom: 0;
    }

    p {
      flex-grow: 1;
    }
  }
}
</style>
