<template>
  <NuxtChild :fetch-state="$fetchState.pending" />
</template>
<script>
/**
 * ==================================================================================
 * Schedule Parent page
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ScheduleParentPage',

  validate({ params }) {
    return !!params.scheduleId
  },

  async fetch() {
    this.form.$clearErrors()

    if (!this.form.$busy) {
      await this.$store
        .dispatch('lessonSchedule/getDetails', this.$route.params.scheduleId)
        .then(() => {
          if (!this.hasLessonSchedule) {
            this.$nuxt.error({
              statusCode: 404,
              message: 'Schedule not found'
            })
          }
        })
    }
  },

  computed: {
    ...mapState({
      form: state => state.lessonSchedule.lessonSchedule,
      schedule: state => state.lessonSchedule.lessonScheduleDetails
    }),
    ...mapGetters({
      hasLessonSchedule: 'lessonSchedule/hasLessonScheduleDetails'
    })
  }
}
</script>
