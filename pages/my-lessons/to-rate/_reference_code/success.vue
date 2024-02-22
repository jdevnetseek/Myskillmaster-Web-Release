<template>
  <SuccessPage
    header="Your rating has been published!"
    :icon="require('@/assets/icons/rating-success.svg')"
    :show-carousels="false"
  />
</template>
<script>
/**
 * ==================================================================================
 * Rate: Success page
 * ==================================================================================
 **/

import SuccessPage from '@/components/pages/SuccessPage.vue'

export default {
  components: {
    SuccessPage
  },
  head() {
    return {
      title: 'Rate: Success | '
    }
  }
}
</script>
