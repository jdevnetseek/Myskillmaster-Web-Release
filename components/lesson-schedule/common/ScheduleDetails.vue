<template>
  <div class="schedule-details">
    <div class="schedule-details__header mb-5">
      <h4 class="mb-2">
        {{ scheduleObj.lesson.title }}
      </h4>
      <p>{{ scheduleObj.scheduleLabel }} • {{ scheduleObj.remoteLabel }}</p>
    </div>
    <template v-if="!isAttendanceConfirmed">
      <v-btn
        color="#E6F1F1"
        depressed
        class="schedule-details__btn mt-5"
        @click="cancelLesson"
      >
        Cancel Lesson
      </v-btn>
      <v-btn
        color="#E6F1F1"
        depressed
        class="schedule-details__btn mt-5"
        @click="rescheduleLesson"
      >
        Reschedule Lesson
      </v-btn>
    </template>
    <div class="schedule-details__details my-4">
      <h5 class="mb-2">
        Lesson details
      </h5>
      <ReadMore :content="scheduleObj.lesson.description" />
    </div>

    <LessonBulletedDetails
      :lesson="scheduleObj.lesson"
      :master-profile="scheduleObj.master_profile"
      :has-schedule="false"
      :has-exact-address="true"
      class="schedule-details__list"
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

import LessonSchedule from '@/models/LessonSchedule'
import ReadMore from '@/components/common/ReadMore'
import ConfirmationModal from '@/components/modals/ConfirmationModal'
import LessonBulletedDetails from '@/components/lessons/common/LessonBulletedDetails'

export default {
  components: {
    ReadMore,
    ConfirmationModal,
    LessonBulletedDetails
  },
  props: {
    schedule: {
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
    scheduleObj() {
      return this.schedule instanceof LessonSchedule
        ? this.schedule
        : new LessonSchedule(this.schedule)
    },

    confirmModalHeader() {
      return `${
        this.selectedEvent === 'cancel' ? 'Cancel' : 'Reschedule'
      } lesson`
    },

    confirmModalContent() {
      return this.selectedEvent === 'cancel'
        ? 'Cancelling this lesson will refund the student. Would you like to continue?'
        : 'Would you like to continue in re-scheduling this lesson?'
    },

    isAttendanceConfirmed() {
      return this.scheduleObj?.is_attendance_confirmed
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
          name: 'my-lessons-to-teach-scheduleId-cancel',
          params: {
            slug: this.schedule.scheduleId
          }
        })
      } else {
        this.$router.push({
          name: 'my-lessons-to-teach-scheduleId-reschedule',
          params: {
            slug: this.schedule.scheduleId
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
@media (max-width: map-get($grid-breakpoints, 'lg')) {
  .schedule-details {
    &__btn {
      min-width: 100% !important;
    }
  }
}

.schedule-details {
  &__btn {
    display: inline-block;
    color: $primary;
    cursor: pointer;
  }

  b {
    font-weight: 500;
  }
}
</style>
