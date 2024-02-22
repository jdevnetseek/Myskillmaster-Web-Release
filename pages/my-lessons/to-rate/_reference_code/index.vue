<template>
  <div class="rate-lesson screen-border">
    <div v-if="hasEnrollmentDetails" class="rate-lesson__border">
      <RatingForm
        :master-profile="enrollment.master_profile"
        :reference-code="$route.params.reference_code"
      />
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Rate Master Page
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import RatingForm from '@/components/lesson-enrollment/forms/RatingForm'

export default {
  name: 'RatingPage',

  components: {
    RatingForm
  },

  props: {
    fetchState: {
      type: Boolean,
      default: false
    }
  },

  head() {
    return {
      title: 'Rate: Master | '
    }
  },

  computed: {
    ...mapState({
      enrollment: state => state.lessonEnrollment.lessonEnrollmentDetails
    }),

    ...mapGetters({
      hasEnrollmentDetails: 'lessonEnrollment/hasEnrollmentDetails'
    })
  }
}
</script>
<style scoped lang="scss">
.rate-lesson {
  &__border {
    max-width: 770px;
    margin: 0 auto;
  }
}
</style>
