<template>
  <EnrollLessonForm :current-step="3" />
</template>
<script>
/**
 * ==================================================================================
 * Enroll: Price
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
      title: 'Enroll: Confirmation | '
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
      if (!this.form.to_learn) {
        this.$router.replace({
          name: 'lessons-slug-enroll-to-learn',
          params: {
            slug: this.lesson.slug
          }
        })
      }
    }
  }
}
</script>
