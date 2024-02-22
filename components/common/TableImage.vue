<template>
  <v-img
    class="table-image rounded"
    :class="{
      'table-image--round': isRound,
    }"
    :max-width="size"
    :max-height="size"
    :min-width="size"
    :min-height="size"
    :src="displayThumbnailUrl"
    :style="{
      backgroundColor: bg,
    }"
    v-bind="$attrs"
  />
</template>
<script>
/**
 * ==================================================================================
 * Table image
 * ==================================================================================
 **/

import DisplayThumbnailMixin from '@/utils/mixins/DisplayThumbnail'

export default {
  name: 'TableImage',
  mixins: [DisplayThumbnailMixin],
  props: {
    image: {
      type: [String, Object, Boolean],
      default: () => null
    },

    size: {
      type: Number,
      default: 36
    },

    bg: {
      type: String,
      default: '#C4C4C4'
    },

    isRound: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="scss">
.table-image {
  &--round {
    border-radius: 50% !important;
  }
}
</style>
