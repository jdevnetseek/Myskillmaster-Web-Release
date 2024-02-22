<template>
  <EnrollLessonForm :current-step="4" />
</template>
<script>
/**
 * ==================================================================================
 * Enroll: Payment
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
      title: 'Enroll: Payment | '
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
      let name = null
      if (!this.form.to_learn) {
        name = 'lessons-slug-enroll-to-learn'
      } else if (!this.form.schedule_id) {
        name = 'lessons-slug-enroll'
      }

      if (name) {
        this.$router.replace({
          name,
          params: {
            slug: this.lesson.slug
          }
        })
      }
    }
  }
}
</script>
