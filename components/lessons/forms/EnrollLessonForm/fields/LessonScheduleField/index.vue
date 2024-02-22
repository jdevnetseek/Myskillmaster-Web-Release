<template>
  <div class="lesson-schedule-field">
    <div v-if="hasLesson" class="lesson-schedule-field__list">
      <template v-if="lesson.lesson_schedules.length > 0">
        <LessonScheduleItem
          v-for="(schedule, index) in lesson.lesson_schedules"
          :key="index"
          :schedule="schedule"
          :selected="isSelected(schedule)"
          class="lesson-schedule-field__list__item"
          @clicked="select"
        />
      </template>
      <template v-else>
        <div class="lesson-schedule-field__list__placeholder">
          <p class="mb-0">
            No schedules found
          </p>
        </div>
      </template>
    </div>
    <ErrorMessage
      class="mt-2"
      :error="
        form.$getError('schedule_id') ||
          hasError('form.schedule_id', 'Schedule')
      "
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Lesson Schedule Field
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { lessonEnrollSchedule } from '@/validations/lesson/lessonEnrollSchedule'
import ErrorMessage from '@/components/fields/ErrorMessage'
import LessonScheduleItem from './fields/LessonScheduleItem'

export default {
  components: {
    LessonScheduleItem,
    ErrorMessage
  },
  mixins: [validationMixin],
  computed: {
    hasError,
    ...mapState({
      form: state => state.lesson.lessonEnroll,
      lesson: state => state.lesson.lessonDetails
    }),

    ...mapGetters({
      hasLesson: 'lesson/hasLessonDetails'
    })
  },

  methods: {
    select(id) {
      this.form.schedule_id = id
    },

    isSelected(schedule) {
      return this.form.schedule_id === schedule.id
    }
  },

  validations() {
    return {
      form: lessonEnrollSchedule
    }
  }
}
</script>
<style scoped lang="scss">
.lesson-schedule-field {
  &__list {
    max-height: 71vh;
    overflow: auto;

    &__item {
      &:not(:last-child) {
        margin-bottom: 15px;
      }
    }

    &__placeholder {
      margin: 40px 0;
      text-align: center;

      > * {
        font-style: italic;
      }
    }
  }
}
</style>
