<template>
  <v-skeleton-loader
    :type="type"
    transition="fade-transition"
    class="lesson-card-skeleton"
    :boilerplate="true"
  />
</template>
<script>
/**
 * ==================================================================================
 * Lesson Card Skeleton
 * ==================================================================================
 **/

import { ORIENTATIONS, PORTRAIT } from '@/utils/enums/Orientation'

export default {
  props: {
    orientation: {
      type: String,
      default: PORTRAIT,
      validator(value) {
        return ORIENTATIONS.includes(value)
      }
    }
  },

  computed: {
    type() {
      return this.orientation === PORTRAIT ? 'card' : 'list-item-three-line'
    }
  }
}
</script>
<style scoped lang="scss">
$cardRadius: 8px;
.lesson-card-skeleton {
  border-radius: $cardRadius;
  background: #ffffff;
  box-shadow: $card-box-shadow;

  ::v-deep .v-skeleton-loader__image {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
