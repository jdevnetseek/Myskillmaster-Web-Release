<template>
  <div class="edit-lesson screen-border">
    <LessonForm v-if="!fetchState && hasLesson" :redirect-to-page="redirect" />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Edit Lesson
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import LessonForm from '~/components/lessons/forms/LessonForm'

export default {
  name: 'EditLessonPage',
  components: {
    LessonForm
  },
  props: {
    fetchState: {
      type: Boolean,
      default: false
    }
  },

  head() {
    return {
      title: 'Edit lesson | '
    }
  },

  computed: {
    ...mapState({
      form: state => state.lesson.lesson,
      lesson: state => state.lesson.lessonDetails
    }),

    ...mapGetters({
      hasLesson: 'lesson/hasLessonDetails'
    }),

    redirect() {
      return this.$route.query.from === 'details'
    }
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
      if (this.hasLesson && !this.lesson.is_owner) {
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
.edit-lesson {
  //
}
</style>
