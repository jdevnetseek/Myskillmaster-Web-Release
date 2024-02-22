<template>
  <div class="reschedule-lesson screen-border">
    <RescheduleEnrollmentForm />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Reschedule Enrollment Lesson
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import RescheduleEnrollmentForm from '~/components/lesson-enrollment/forms/RescheduleEnrollmentForm.vue'

export default {
  name: 'RescheduleEnrollmentPage',
  components: {
    RescheduleEnrollmentForm
  },
  props: {
    fetchState: {
      type: Boolean,
      default: false
    }
  },

  head() {
    return {
      title: 'Reschedule enrollment | '
    }
  },

  computed: {
    ...mapState({
      formEnrollment: state => state.lessonEnrollment.lessonEnrollment,
      formLesson: state => state.lesson.lesson,

      lessonEnrollment: state =>
        state.lessonEnrollment.lessonEnrollmentDetails,
      lesson: state => state.lesson.lessonDetails
    }),
    ...mapGetters({
      hasLessonEnrollment: 'lessonEnrollment/hasEnrollmentDetails',
      hasLesson: 'lesson/hasLessonDetails'
    })
  },

  watch: {
    fetchState(value) {
      if (!value && !this.formEnrollment.$busy && this.hasLessonEnrollment) {
        this.fetch()
      }
    }
  },

  mounted() {
    this.refetch()
  },

  methods: {
    refetch() {
      if (!this.hasLessonEnrollment && !this.formEnrollment.$busy) {
        this.$parent.$fetch()
      } else if (this.hasLessonEnrollment) {
        this.fetch()
      }
    },

    async fetch() {
      this.formLesson.$clearErrors()

      if (!this.formLesson.$busy) {
        await this.$store
          .dispatch('lesson/getDetails', this.lessonEnrollment.lesson.slug)
          .then(() => {
            if (!this.hasLesson) {
              this.$nuxt.error({
                statusCode: 404,
                message: 'Enrollments not found'
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
