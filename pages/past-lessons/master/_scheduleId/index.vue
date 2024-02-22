<template>
  <div class="view-enrollment-page">
    <div class="view-enrollment-page__header screen-border">
      <Back class="view-enrollment-page__header__back my-5" />
    </div>
    <template v-if="hasLessonSchedule">
      <LessonBanner
        class="view-enrollment-page__banner mb-4"
        :images="schedule.lesson.cover_photo"
      />
      <div class="view-enrollment-page__border screen-border">
        <ScheduleDetails :schedule="schedule" class="mb-7" />
        <template v-if="schedule.students_enrolled.length > 1">
          <StudentList :students="schedule.students_enrolled" />
        </template>
        <template v-else-if="schedule.students_enrolled.length === 1">
          <StudentDetails :student="schedule.students_enrolled[0]" />
        </template>
      </div>
    </template>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Past Scheduled Lesson
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import Back from '@/components/global/Back'
import LessonBanner from '@/components/lessons/common/LessonBanner'
import StudentList from '@/components/students/fields/StudentList'
import ScheduleDetails from '@/components/lesson-schedule/common/ScheduleDetails'
import StudentDetails from '@/components/students/common/StudentDetails'

export default {
  name: 'PastSchedulePage',

  components: {
    Back,
    LessonBanner,
    ScheduleDetails,
    StudentList,
    StudentDetails
  },

  props: {
    fetchState: {
      type: Boolean,
      default: false
    }
  },

  head() {
    return {
      title: 'Past Lesson | '
    }
  },

  computed: {
    ...mapState({
      schedule: state => state.lessonSchedule.lessonScheduleDetails
    }),
    ...mapGetters({
      hasLessonSchedule: 'lessonSchedule/hasLessonScheduleDetails'
    })
  }
}
</script>
<style scoped lang="scss">
.view-enrollment-page {
  margin-bottom: 25px;

  > * {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  &__header {
    &__back {
    }

    &__search {
      display: none;
    }
  }

  &__border {
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .view-enrollment-page {
    &__header {
      &__back {
        display: none;
      }

      &__search {
        display: block;
      }
    }
  }
}
</style>
