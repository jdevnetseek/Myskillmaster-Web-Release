<template>
  <div v-if="!fetchState" class="reschedule-lesson screen-border">
    <RescheduleScheduleForm />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Reschedule Scheduled Lesson
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import RescheduleScheduleForm from '~/components/lesson-schedule/forms/RescheduleScheduleForm.vue'

export default {
  name: 'RescheduleScheduledPage',
  components: {
    RescheduleScheduleForm
  },

  props: {
    fetchState: {
      type: Boolean,
      default: false
    }
  },

  head() {
    return {
      title: 'Reschedule lesson | '
    }
  },

  computed: {
    ...mapState({
      formSchedule: state => state.lessonSchedule.lessonSchedule,
      formLesson: state => state.lesson.lesson,

      lessonSchedule: state => state.lessonSchedule.lessonScheduleDetails,
      lesson: state => state.lesson.lessonDetails
    }),
    ...mapGetters({
      hasLessonSchedule: 'lessonSchedule/hasLessonScheduleDetails',
      hasLesson: 'lesson/hasLessonDetails'
    })
  },

  watch: {
    fetchState(value) {
      if (!value && !this.formSchedule.$busy && this.hasLessonSchedule) {
        this.fetch()
      }
    }
  },

  mounted() {
    this.refetch()
  },

  methods: {
    refetch() {
      if (!this.hasLessonSchedule && !this.formSchedule.$busy) {
        this.$parent.$fetch()
      } else if (this.hasLessonSchedule) {
        this.fetch()
      }
    },

    async fetch() {
      this.formLesson.$clearErrors()

      if (!this.formLesson.$busy) {
        await this.$store
          .dispatch('lesson/getDetails', this.lessonSchedule.lesson.slug)
          .then(() => {
            if (!this.hasLesson) {
              this.$nuxt.error({
                statusCode: 404,
                message: 'Schedules not found'
              })
            }
          })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.reschedule-lesson {
  //
}
</style>
