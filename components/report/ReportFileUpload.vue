<template>
  <div>
    <h5>Support documents</h5>
    <!-- <p>Lorem ipsum dolor sit amet consectetur.</p> -->
    <FileMultiUpload
      :images="visibleImages"
      class="portfolio-details__uploader"
      @input="uploadPhoto"
      @delete="deletePhoto"
    />
  </div>
</template>
<script>
import { findIndex } from 'lodash'
import FileMultiUpload from '@/components/fields/FileMultiUpload'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import FileMultiUploadMixin from '@/utils/mixins/FileMultiUpload'

export default {
  name: 'ReportFileUpload',
  components: {
    FileMultiUpload
  },
  mixins: [FileMultiUploadMixin, SnackbarMixin],

  props: {
    value: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    reportImages: {
      get() {
        return this.value
      },
      set(image) {
        this.$emit('input', [...image])
      }
    },

    visibleImages() {
      return this.reportImages.filter(image => !image.delete)
    }
  },

  methods: {
    uploadPhoto(images) {
      this.reportImages = [...this.reportImages, ...images]
    },

    deletePhoto(image) {
      const index = findIndex(this.reportImages, image)
      if (index >= 0) {
        this.reportImages.splice(index, 1)
        this.showSnackbar('Image removed')
      }
    }
  }
}
</script>
