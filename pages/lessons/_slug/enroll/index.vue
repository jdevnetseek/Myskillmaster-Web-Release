<template>
  <EnrollLessonForm :current-step="1" />
</template>
<script>
/**
 * ==================================================================================
 * Enroll: Select Schedules/Slots
 * ==================================================================================
 **/

import EnrollLessonForm from '@/components/lessons/forms/EnrollLessonForm'

export default {
  components: {
    EnrollLessonForm
  },

  head() {
    return {
      title: 'Enroll: Schedule selection | '
    }
  }
}
</script>
