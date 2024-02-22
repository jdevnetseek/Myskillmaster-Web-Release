<template>
  <NuxtChild :fetch-state="$fetchState.pending" />
</template>
<script>
/**
 * ==================================================================================
 * Past Enrollment Parent page
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PastEnrollmentParentPage',

  validate({ params }) {
    return !!params.reference_code
  },

  async fetch() {
    this.form.$clearErrors()

    if (!this.form.$busy) {
      await this.$store
        .dispatch(
          'lessonEnrollment/getPastLessonDetails',
          this.$route.params.reference_code
        )
        .then(() => {
          if (!this.hasLessonEnrollment) {
            this.$nuxt.error({
              statusCode: 404,
              message: 'Enrollment not found'
            })
          }
        })
    }
  },

  computed: {
    ...mapState({
      form: state => state.lessonEnrollment.lessonEnrollment,
      enrollment: state => state.lessonEnrollment.lessonEnrollmentDetails
    }),

    ...mapGetters({
      hasLessonEnrollment: 'lessonEnrollment/hasEnrollmentDetails'
    })
  }
}
</script>
