<template>
  <v-overlay
    v-if="value"
    :loading="loading"
    absolute
    opacity="0.01"
    class="loading"
    v-bind="$attrs"
  >
    <v-progress-circular indeterminate color="primary" :size="size" />
  </v-overlay>
</template>
<script>
/**
 * ==================================================================================
 * Loader
 * ==================================================================================
 **/

export default {
  name: 'Loading',

  props: {
    value: {
      type: Boolean,
      default: false
    },

    size: {
      type: Number,
      default: 64
    },

    loading: {
      type: Boolean,
      default: true
    }
  }
}
</script>
