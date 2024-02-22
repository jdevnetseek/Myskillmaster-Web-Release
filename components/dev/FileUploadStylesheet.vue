<template>
  <div class="file-upload-stylesheet">
    <h5 class="mb-4">
      File
    </h5>
    <v-card>
      <v-card-text>
        <p class="text-subtitle mb-2">
          Single upload
        </p>
        <FileUpload
          :image="file"
          :loading="fileLoading"
          @input="uploadImage"
          @deleted="deleteImage"
        />
        <v-divider class="my-4" />
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * File upload Stylesheet
 * ==================================================================================
 **/

import findIndex from 'lodash/findIndex'
import FileUpload from '@/components/fields/FileUpload'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  name: 'FileUploadStylesheet',
  components: {
    FileUpload
  },
  mixins: [SnackbarMixin],
  data() {
    return {
      file: null,
      fileLoading: false,

      files: [],
      filesLoading: false
    }
  },

  methods: {
    uploadImage(image) {
      this.changeImage(image, 'Uploaded image!')
    },

    deleteImage() {
      this.changeImage(null, 'Deleted image!')
    },

    async changeImage(image, msg) {
      this.fileLoading = true
      await new Promise((resolve) => {
        setTimeout(() => {
          this.file = image
          this.showSnackbar(msg)
          this.fileLoading = false

          resolve()
        }, 500)
      })
    },

    uploadMultipleImage(images) {
      this.files = [...this.files, ...images]
    },

    deleteMultipleImage(image) {
      const index = findIndex(this.files, image)
      if (index >= 0) {
        this.files.splice(index, 1)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.file-upload-stylesheet {
  //
}
</style>
