<template>
  <div class="enroll-lesson">
    <NuxtChild v-if="!fetchState" />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Enroll Lesson
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'EnrollLessonPage',
  props: {
    fetchState: {
      type: Boolean,
      default: false
    }
  },
  head() {
    return {
      title: 'Enroll lesson | '
    }
  },

  computed: {
    ...mapState({
      lesson: state => state.lesson.lessonDetails
    }),

    ...mapGetters({
      hasLesson: 'lesson/hasLessonDetails'
    })
  },

  watch: {
    fetchState(value) {
      if (!value) {
        this.validate()
      }
    }
  },

  mounted() {
    this.validate()
  },

  methods: {
    validate() {
      if (this.hasLesson && (this.lesson.is_owner || !this.lesson.active)) {
        this.$nuxt.error({
          statusCode: 404,
          message: 'Page not found'
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.enroll-lesson {
  //
}
</style>
