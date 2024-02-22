<template>
  <NuxtChild :fetch-state="$fetchState.pending" />
</template>
<script>
/**
 * ==================================================================================
 * View Lesson page
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'

export default {
  layout({ route }) {
    switch (route.name) {
      // case 'lessons-slug':
      //   return 'empty'
      default:
        return 'default'
    }
  },

  validate({ params }) {
    return !!params.slug
  },

  async fetch() {
    this.form.$clearErrors()

    await this.$store
      .dispatch('lesson/getDetails', this.$route.params.slug)
      .then(() => {
        if (!this.hasLesson) {
          this.$nuxt.error({
            statusCode: 404,
            message: 'Lesson not found'
          })
        }
      })
  },

  computed: {
    ...mapState({
      form: state => state.lesson.lesson,
      lesson: state => state.lesson.lessonDetails
    }),

    ...mapGetters({
      hasLesson: 'lesson/hasLessonDetails'
    })
  }
}
</script>
