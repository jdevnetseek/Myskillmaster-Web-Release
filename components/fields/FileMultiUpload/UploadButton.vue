<template>
  <div class="upload-button">
    <v-btn
      color="primary"
      text
      class="upload-button__upload"
      :disabled="loading || disabled || isFull"
      @click="selectImage"
    >
      {{ label }}
    </v-btn>

    <v-file-input
      ref="filePicker"
      v-model="uploaded"
      multiple
      accept="image/*"
      style="display: none"
      @change="onFileChange"
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * File Multiple Upload: Upload Button
 * ==================================================================================
 **/
import SnackbarMixin from '@/utils/mixins/Snackbar'
import FileMultiUploadMixin from '@/utils/mixins/FileMultiUpload'
import IMAGE from '~/utils/Image'

export default {
  mixins: [SnackbarMixin, FileMultiUploadMixin],
  props: {
    label: {
      type: String,
      default: 'Select file(s)'
    },

    loading: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      uploaded: [],
      errors: []
    }
  },

  computed: {
    hasError() {
      return !!this.errors.length
    }
  },

  methods: {
    selectImage() {
      if (this.$refs.filePicker && this.$refs.filePicker.$refs.input) {
        this.$refs.filePicker.$refs.input.click()
      }
    },

    async onFileChange(e) {
      const images = e

      this.reset()

      const validImages = []
      if (images.length + this.images.length > this.maxImage) {
        this.showSnackbar(`Maximum of ${this.maxImage} images only`, false)
      } else {
        for (let i = 0; i < images.length; i++) {
          const file = images[i]

          await IMAGE.toBase64(file)
            .then((image) => {
              validImages.push({
                file: image.file,
                url: image.url
              })
            })
            .catch((error) => {
              this.addError(error.message, false)
            })
        }

        if (validImages.length) {
          this.$emit('input', validImages)
        }

        this.addMessage(images, validImages)
        this.reset()
      }
    },

    addMessage(images, validImages) {
      const count = `${validImages.length}/${images.length}`
      const msgHeader = this.forUpdate
        ? `Uploading ${count} image(s)${
            this.hasError ? ', issue(s) encountered:' : '...'
          }`
        : `Added ${count} image(s)`
      const msgColor = validImages.length > 0

      this.showSnackbar(msgHeader, msgColor, this.errors)
    },

    addError(error) {
      if (this.errors.indexOf(error)) {
        this.errors.push(error)
      }
    },

    reset() {
      this.uploaded = []
      this.errors = []
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px 10px;
  gap: 10px;
  height: 88px;
  border: 1px dashed $primary;

  &__upload {
    color: $primary !important;
  }
}
</style>
