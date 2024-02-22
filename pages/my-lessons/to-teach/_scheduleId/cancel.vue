<template>
  <div class="cancel-lesson screen-border">
    <CancelScheduleForm />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Cancel Scheduled Lesson
 * ==================================================================================
 **/

import CancelScheduleForm from '~/components/lesson-schedule/forms/CancelScheduleForm.vue'

export default {
  name: 'CancelScheduledPage',
  components: {
    CancelScheduleForm
  },

  props: {
    fetchState: {
      type: Boolean,
      default: false
    }
  },

  head() {
    return {
      title: 'Cancel lesson | '
    }
  }
}
</script>
<style scoped lang="scss">
.cancel-lesson {
  //
}
</style>
