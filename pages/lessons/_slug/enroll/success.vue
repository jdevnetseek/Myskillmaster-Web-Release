<template>
  <SuccessPage header="Your lesson has been booked!" :show-carousels="false" />
</template>
<script>
/**
 * ==================================================================================
 * Enroll: Success
 * ==================================================================================
 **/

import SuccessPage from '@/components/pages/SuccessPage.vue'

export default {
  components: {
    SuccessPage
  },

  head() {
    return {
      title: 'Enroll: Success | '
    }
  }
}
</script>
