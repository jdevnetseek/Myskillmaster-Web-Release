<template>
  <SuccessPage header="Your lesson has been published!" />
</template>
<script>
/**
 * ==================================================================================
 * Add a lesson: Success page
 * ==================================================================================
 **/

import SuccessPage from '@/components/pages/SuccessPage.vue'

export default {
  components: {
    SuccessPage
  },
  head() {
    return {
      title: 'Add a lesson | '
    }
  }
}
</script>
