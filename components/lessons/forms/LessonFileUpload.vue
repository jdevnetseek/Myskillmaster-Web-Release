<template>
  <div class="lesson-file-upload">
    <FileMultiUpload
      :images="form.cover_photo"
      :loading="form.$busy"
      :for-update="hasLesson"
      :error="
        form.$getError('cover_photo') ||
          form.$getError('images') ||
          form.$getError('media')
      "
      class="lesson-details__uploader"
      @input="uploadPhoto"
      @delete="deletePhoto"
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Lesson: File Upload
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { findIndex } from 'lodash'
import { parseToFormData } from '@/utils/Helpers'
import FileMultiUpload from '@/components/fields/FileMultiUpload'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import FileMultiUploadMixin from '@/utils/mixins/FileMultiUpload'

export default {
  components: {
    FileMultiUpload
  },
  mixins: [FileMultiUploadMixin, SnackbarMixin],

  data() {
    return {}
  },

  computed: {
    ...mapState({
      form: state => state.lesson.lesson,
      lesson: state => state.lesson.lessonDetails
    }),

    ...mapGetters({
      hasLesson: 'lesson/hasLessonDetails'
    }),

    isDisabled() {
      return null
    }
  },

  methods: {
    initForm() {
      if (this.hasLesson) {
        this.form.cover_photo = this.lesson.cover_photo
      }
    },

    async uploadPhoto(images) {
      if (this.hasLesson) {
        this.form.$clearErrors()

        if (!this.form.$busy) {
          const form = this.getUpdateFormData()
          form.images = images

          const formData = new FormData()
          parseToFormData(formData, form)

          await this.$store
            .dispatch('lesson/addLessonImage', formData)
            .then(() => {
              if (this.form.$hasErrors()) {
                this.showSnackbar(this.form.$errorMessage, false)
              } else {
                this.initForm()
                this.showSnackbar('Image uploaded successfully!')
              }
            })
        }
      } else {
        this.form.cover_photo = [...this.form.cover_photo, ...images]
      }
    },

    async deletePhoto(image) {
      if (this.hasLesson) {
        this.form.$clearErrors()

        if (!this.form.$busy) {
          const form = this.getUpdateFormData()
          form.mediaId = image.id

          await this.$store
            .dispatch('lesson/removeLessonImage', form)
            .then(() => {
              if (this.form.$hasErrors()) {
                this.showSnackbar(this.form.$errorMessage, false)
              } else {
                this.showSnackbar('Image removed successfully!')
              }
            })
        }
      } else {
        this.removeImage(image)
      }
    },

    removeImage(image) {
      const index = findIndex(this.form.cover_photo, image)
      if (index >= 0) {
        this.form.cover_photo.splice(index, 1)
      }
    },

    getUpdateFormData() {
      const payload = {
        id: this.lesson.id
      }

      return payload
    }
  }
}
</script>
