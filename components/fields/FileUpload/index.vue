<template>
  <div class="file-upload">
    <div class="file-upload__action">
      <UploadButton
        v-if="!hasImage"
        :loading="loading"
        :disabled="disabled || loading"
        :label="buttonLabel"
        @clicked="selectImage"
      />
      <PreviewButton
        v-else
        :image="image"
        :loading="loading"
        @clicked="selectImage"
        @deleted="removeImage"
      />
      <v-file-input
        ref="filePicker"
        multiple
        accept="image/*"
        style="display: none;"
        :loading="true"
        @change="onFileChange"
      />
    </div>
    <ErrorMessage :error="errors" class="mt-2" />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * File Upload
 * ==================================================================================
 **/

import IMAGE from '@/utils/Image'
import UploadButton from '@/components/fields/FileUpload/buttons/UploadButton'
import PreviewButton from '@/components/fields/FileUpload/buttons/PreviewButton'
import ErrorMessage from '@/components/fields/ErrorMessage'

export default {
  name: 'FileUpload',
  components: {
    UploadButton,
    PreviewButton,
    ErrorMessage
  },
  props: {
    image: {
      type: [Object, String],
      default: () => null
    },

    /**
     * Max file size in MB
     */
    maxSize: {
      type: Number,
      default: 2
    },

    loading: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    error: {
      type: [String, Array],
      default: null
    },

    buttonLabel: {
      type: String,
      default: 'Upload Image'
    }
  },

  data() {
    return {
      imageError: null
    }
  },

  computed: {
    hasImage() {
      return !!this.image
    },

    errors() {
      const formError = Array.isArray(this.error) ? this.error : [this.error]
      return [...formError, this.imageError].filter(e => e)
    }
  },

  methods: {
    selectImage() {
      if (this.$refs.filePicker && this.$refs.filePicker.$refs.input) {
        this.$refs.filePicker.$refs.input.click()
      }
    },

    removeImage() {
      this.$emit('deleted')
    },

    async onFileChange(e) {
      const file = event.target.files[0]
      if (file) {
        this.reset()
        await IMAGE.toBase64(file, this.maxSize)
          .then((image) => {
            this.$emit('input', image)
          })
          .catch((error) => {
            this.imageError = error.message
          })
      }
    },

    reset() {
      this.imageError = null
    }
  }
}
</script>
<style scoped lang="scss">
.file-upload {
  &__action {
    > .v-btn {
      min-width: 160px;
    }
  }
}
</style>
