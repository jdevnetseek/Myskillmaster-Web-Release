<template>
  <EnrollLessonForm :current-step="2" />
</template>
<script>
/**
 * ==================================================================================
 * Enroll: What to learn
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import EnrollLessonForm from '@/components/lessons/forms/EnrollLessonForm'

export default {
  components: {
    EnrollLessonForm
  },

  head() {
    return {
      title: 'Enroll: To learn | '
    }
  },

  computed: {
    ...mapState({
      form: state => state.lesson.lessonEnroll,
      lesson: state => state.lesson.lessonDetails
    })
  },

  mounted() {
    this.validate()
  },

  methods: {
    validate() {
      if (!this.form.schedule_id) {
        this.$router.replace({
          name: 'lessons-slug-enroll',
          params: {
            slug: this.lesson.slug
          }
        })
      }
    }
  }
}
</script>
