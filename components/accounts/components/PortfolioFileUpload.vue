<template>
  <div class="portfolio-file-upload">
    <FileMultiUpload
      :images="visibleImages"
      :loading="form.$busy"
      class="portfolio-details__uploader"
      @input="uploadPhoto"
      @delete="deletePhoto"
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Bookable: File Upload
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { findIndex } from 'lodash'
import FileMultiUpload from '@/components/fields/FileMultiUpload'
import { hasError, validationMixin } from '@/validations'
import { masterProfileForm } from '@/validations/auth/masterProfile'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import FileMultiUploadMixin from '~/utils/mixins/FileMultiUpload'

export default {
  components: {
    FileMultiUpload
  },
  mixins: [validationMixin, FileMultiUploadMixin, SnackbarMixin],

  data() {
    return {}
  },

  computed: {
    hasError,
    ...mapState({
      form: state => state.masterProfile.masterProfile
    }),

    ...mapGetters({
      hasMasterProfileDetails: 'masterProfile/hasMasterProfileDetails'
    }),

    visibleImages() {
      return this.form.portfolio.filter(image => !image.delete)
    },

    isDisabled() {
      return this.form ? !!this.form.deleted_at : false
    }
  },

  watch: {
    form(newValue, oldValue) {
      this.initForm()
    }
  },

  mounted() {
    this.initForm()
  },

  methods: {
    initForm() {
      if (this.form) {
        this.form.portfolio = this.form.portfolio || []
      }
    },

    uploadPhoto(images) {
      this.form.portfolio = [...this.form.portfolio, ...images]
    },

    deletePhoto(image) {
      const index = findIndex(this.form.portfolio, image)
      if (index >= 0) {
        this.$set(this.form.portfolio[index], 'delete', true)
        this.showSnackbar('Image removed')
      }
    }
  },

  validations() {
    return {
      form: masterProfileForm
    }
  }
}
</script>
