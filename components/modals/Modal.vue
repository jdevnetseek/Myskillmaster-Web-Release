<template>
  <v-dialog
    content-class="global-modal"
    :value="value"
    :max-width="maxWidth"
    v-bind="$attrs"
    @click:outside="close"
    @keydown.esc="close"
  >
    <v-card class="global-modal__content">
      <div
        class="global-modal__header d-flex justify-space-between align-center"
      >
        <h6>{{ title }}</h6>
        <v-icon
          class="global-modal__close"
          :size="25"
          color="black"
          @click="close"
        >
          mdi-close
        </v-icon>
      </div>
      <div class="global-modal__border">
        <slot />
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
/**
 * ==================================================================================
 * Global Modal
 * ==================================================================================
 **/

import ModalMixin from '@/utils/mixins/Modal'

export default {
  mixins: [ModalMixin],
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .global-modal {
  $padding: 20px;
  .global-modal__content {
    .global-modal__header {
      padding: $padding;
    }

    .global-modal__border {
      padding: 0 $padding $padding $padding;
    }
  }
}
</style>
