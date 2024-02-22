<template>
  <v-dialog
    :value="value"
    content-class="view-image"
    @click:outside="close"
    @keydown.esc="close"
  >
    <v-card class="view-image__border">
      <v-card-title class="view-image__title justify-space-between">
        <h6>View Content</h6>
        <v-btn fab icon class="view-image__close" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="view-image__content">
        <img v-if="url" :src="url">
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
/**
 * ==================================================================================
 * View image on modal
 * ==================================================================================
 **/

import IMAGE from '@/utils/Image'

export default {
  name: 'ViewImage',
  props: {
    value: {
      type: [String, Boolean, Object],
      default: () => null
    }
  },

  data() {
    return {}
  },

  computed: {
    url() {
      return IMAGE.url(this.value)
    }
  },

  methods: {
    close() {
      this.$emit('input', null)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .view-image {
  width: auto;
  height: 100%;
  box-shadow: none;

  .view-image__border {
    .view-image__content {
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      flex-grow: 1;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>
