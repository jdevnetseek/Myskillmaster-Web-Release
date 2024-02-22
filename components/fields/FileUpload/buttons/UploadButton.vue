<template>
  <v-btn
    small
    outlined
    color="primary"
    class="upload-button text-subtitle-2"
    :loading="loading"
    :disabled="disabled"
    @click="onClick"
  >
    <v-icon left>
      mdi-tray-arrow-up
    </v-icon>
    {{ label }}
  </v-btn>
</template>
<script>
/**
 * ==================================================================================
 * File upload: Upload Button
 * ==================================================================================
 **/

export default {
  name: 'UploadButton',
  props: {
    loading: {
      type: Boolean,
      default: false
    },

    label: {
      type: String,
      default: 'Upload Image'
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onClick() {
      this.$emit('clicked')
    }
  }
}
</script>
<style scoped lang="scss">
.upload-button {
  //
}
</style>
