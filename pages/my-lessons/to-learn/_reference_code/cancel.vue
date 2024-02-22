<template>
  <div class="cancel-lesson screen-border">
    <CancelEnrollmentForm />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Cancel Scheduled Lesson
 * ==================================================================================
 **/

import CancelEnrollmentForm from '~/components/lesson-enrollment/forms/CancelEnrollmentForm.vue'

export default {
  name: 'CancelEnrollmentPage',
  components: {
    CancelEnrollmentForm
  },
  props: {
    fetchState: {
      type: Boolean,
      default: false
    }
  },

  head() {
    return {
      title: 'Cancel enrollment | '
    }
  }
}
</script>
<style scoped lang="scss">
.cancel-lesson {
  //
}
</style>
