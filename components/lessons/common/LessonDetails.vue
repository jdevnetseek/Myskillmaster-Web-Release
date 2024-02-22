<template>
  <div class="lesson-details">
    <div class="lesson-details__header">
      <h4>{{ lessonObj.title }}</h4>
      <div class="d-flex flex-row align-center">
        <h5>{{ lessonObj.priceLabel }} ({{ lessonObj.durationLabel() }})</h5>
        <span
          v-if="lessonObj.is_enrolled"
          class="lesson-details__header__status ml-4 mt-1"
        >
          Already enrolled
        </span>
      </div>
    </div>
    <h6
      v-if="lessonObj.is_owner"
      class="lesson-details__btn mt-2"
      @click="goToEdit"
    >
      <v-icon color="primary">
        $edit
      </v-icon>
      Edit Lesson
    </h6>
    <v-btn
      v-else-if="!lessonObj.is_enrolled"
      class="lesson-details__enroll mt-5"
      color="primary"
      depressed
      @click="goToEnroll"
    >
      Enroll lesson
    </v-btn>
    <div class="lesson-details__details my-4">
      <h5 class="mb-2">
        Lesson details
      </h5>
      <ReadMore :content="lessonObj.description" />
    </div>
    <LessonBulletedDetails
      :lesson="lessonObj"
      :master-profile="lessonObj.master_profile"
      class="lesson-details__list"
    />
    <ConfirmationModal
      v-model="showModal"
      title=""
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

import { mapState } from 'vuex'
import Lesson from '@/models/Lesson'
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
    lesson: {
      type: [Lesson, Object],
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
    ...mapState({
      enrollForm: state => state.lesson.lessonEnroll
    }),

    lessonObj() {
      return this.lesson instanceof Lesson
        ? this.lesson
        : new Lesson(this.lesson)
    },

    confirmModalContent() {
      return this.selectedEvent === 'cancel'
        ? 'Cancelling this lesson will refund the student. Would you like to continue?'
        : 'Would you like to continue in re-scheduling this lesson?'
    }
  },

  methods: {
    goToEdit() {
      this.$router.push({
        name: 'lessons-slug-edit',
        params: {
          slug: this.lesson.slug
        },
        query: {
          from: 'details'
        }
      })
    },
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
          name: 'lessons-slug-cancel',
          params: {
            slug: this.lesson.slug
          }
        })
      } else {
        this.$router.push({
          name: 'lessons-slug-reschedule',
          params: {
            slug: this.lesson.slug
          }
        })
      }
    },
    goToEnroll() {
      this.enrollForm.$reset()
      this.$router.push({
        name: 'lessons-slug-enroll',
        params: {
          slug: this.lessonObj.slug
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
@media (max-width: map-get($grid-breakpoints, 'lg')) {
  .lesson-details {
    &__btn {
      min-width: 100% !important;
    }
  }
}

.lesson-details {
  &__header {
    &__status {
      font-size: 0.8em;
      font-weight: 700;
      background: $alert-success;
      color: #ffffff;
      padding: 3px 10px;
      border-radius: 20px;
    }
  }

  &__btn {
    display: inline-block;
    color: $primary;
    cursor: pointer;
  }

  &__enroll {
  }

  b {
    font-weight: 500;
  }

  &__list {
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .lesson-details {
    &__enroll {
      width: 100%;
    }
  }
}
</style>
