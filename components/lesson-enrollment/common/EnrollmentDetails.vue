<template>
  <div class="enrollment-details">
    <div class="enrollment-details__header">
      <h4 class="mb-2">
        {{ enrollmentObj.lesson.title }}
      </h4>
      <p v-if="enrollmentObj.schedule">
        {{ enrollmentObj.schedule.scheduleLabel }} •
        {{ enrollmentObj.lesson.remoteLabel }}
      </p>
    </div>
    <AttendanceConfirmation
      v-if="!isAttendanceConfirmed && isCompleted"
      class="enrollment-details__attendance"
      :lesson-slug="enrollmentObj.lesson?.slug"
      :reference-code="enrollmentObj.reference_code"
    />
    <template v-else-if="!isCompleted">
      <v-btn
        color="#E6F1F1"
        depressed
        class="enrollment-details__btn mt-5"
        @click="cancelLesson"
      >
        Cancel Lesson
      </v-btn>
      <v-btn
        color="#E6F1F1"
        depressed
        class="enrollment-details__btn mt-5"
        @click="rescheduleLesson"
      >
        Reschedule Lesson
      </v-btn>
    </template>
    <div class="enrollment-details__details my-4">
      <h5 class="mb-2">
        Lesson details
      </h5>
      <ReadMore :content="enrollmentObj.lesson.description" />
    </div>
    <LessonBulletedDetails
      :lesson="enrollmentObj.lesson"
      :master-profile="enrollmentObj.master_profile"
      :has-schedule="false"
      :has-exact-address="true"
      class="enrollment-details__list"
    />
    <ConfirmationModal
      v-model="showModal"
      :title="confirmModalHeader"
      :content="confirmModalContent"
      confirm-label="Confirm"
      @confirm="goTo"
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Lesson Details
 * ==================================================================================
 **/

import AttendanceConfirmation from '@/components/lesson-enrollment/fields/AttendanceConfirmation'
import LessonSchedule from '@/models/LessonSchedule'
import ReadMore from '@/components/common/ReadMore'
import ConfirmationModal from '@/components/modals/ConfirmationModal'
import LessonBulletedDetails from '@/components/lessons/common/LessonBulletedDetails'

export default {
  components: {
    AttendanceConfirmation,
    ReadMore,
    ConfirmationModal,
    LessonBulletedDetails
  },
  props: {
    enrollment: {
      type: [LessonSchedule, Object],
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      selectedEvent: null
    }
  },
  computed: {
    enrollmentObj() {
      return this.enrollment
    },

    confirmModalHeader() {
      return `${
        this.selectedEvent === 'cancel' ? 'Cancel' : 'Reschedule'
      } lesson`
    },

    confirmModalContent() {
      return this.selectedEvent === 'cancel'
        ? 'Canceling this lesson in less than 2 days before the schedule means you omit your right for a refund. Would you like to continue?'
        : 'Would you like to continue in re-scheduling this lesson?'
    },

    isCompleted() {
      return this.enrollmentObj?.status === 'completed'
    },

    isAttendanceConfirmed() {
      return this.enrollmentObj?.is_attendance_confirmed
    }
  },

  methods: {
    cancelLesson() {
      this.showModal = true
      this.selectedEvent = 'cancel'
    },
    rescheduleLesson() {
      this.showModal = true
      this.selectedEvent = 'reschedule'
    },
    goTo() {
      if (this.selectedEvent === 'cancel') {
        this.$router.push({
          name: 'my-lessons-to-learn-reference_code-cancel',
          params: {
            slug: this.enrollment.reference_code
          }
        })
      } else {
        this.$router.push({
          name: 'my-lessons-to-learn-reference_code-reschedule',
          params: {
            slug: this.enrollment.reference_code
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
@media (max-width: map-get($grid-breakpoints, 'lg')) {
  .enrollment-details {
    &__btn {
      min-width: 100% !important;
    }
  }
}

.enrollment-details {
  &__btn {
    display: inline-block;
    color: $primary;
    cursor: pointer;
  }

  b {
    font-weight: 500;
  }

  &__attendance {
    margin-top: 32px;
    margin-bottom: 24px;
  }
}
</style>
