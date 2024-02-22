<template>
  <div class="file-multi-upload">
    <div class="file-multi-upload__border">
      <div class="file-multi-upload__menus">
        <v-row>
          <v-col cols="12" class="px-0">
            <UploadButton
              v-if="canUpload"
              :images="images"
              :loading="loading"
              :disabled="disabled"
              :max-size="maxSize"
              :max-image="maxImage"
              :for-update="forUpdate"
              @input="onChange"
            />
          </v-col>
        </v-row>
      </div>
      <div v-if="hasImages" class="file-multi-upload__images">
        <v-row>
          <v-col v-if="showCount" cols="12" align="right">
            <span>{{ countLabel }}</span>
          </v-col>
          <v-col v-for="(img, index) in images" :key="index" cols="12" md="6">
            <UploadImage
              :image="img"
              :disabled="disabled"
              class="file-multi-upload__images__img"
              @delete="onDelete"
              @select-image="onSelectImage"
            />
          </v-col>
        </v-row>
      </div>

      <ViewImage v-model="showImage" />
      <Loading :value="loading" />
    </div>
    <ErrorMessage
      v-if="error"
      :error="error"
      display="sentence"
      class="file-multi-upload__error"
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * File Multiple Upload
 * ==================================================================================
 **/
import UploadButton from '@/components/fields/FileMultiUpload/UploadButton'
import UploadImage from '@/components/fields/FileMultiUpload/UploadImage'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import FileMultiUploadMixin from '@/utils/mixins/FileMultiUpload'
import ViewImage from '@/components/modals/ViewImage'
import Loading from '@/components/common/Loading'
import ErrorMessage from '@/components/fields/ErrorMessage'

export default {
  components: {
    UploadButton,
    UploadImage,
    ViewImage,
    Loading,
    ErrorMessage
  },

  mixins: [SnackbarMixin, FileMultiUploadMixin],

  props: {
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

    showCount: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showImage: false
    }
  },

  computed: {
    countLabel() {
      return `(${this.images.length} / ${this.maxImage})`
    },

    hasImages() {
      return !!(this.images && this.images.length)
    }
  },

  methods: {
    onSelectImage(image) {
      this.showImage = image
    },

    onChange(images) {
      this.$emit('input', images)
    },

    onDelete(image) {
      if (this.canDelete()) {
        this.$emit('delete', image)
      } else {
        this.showSnackbar(
          `Must have a minimum of ${this.minImage} image(s)`,
          false
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.file-multi-upload {
  &__border {
    position: relative;
    min-height: 100px;
  }

  &__menus {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px;

    p {
      margin-bottom: 0;
      color: var(--v-primary-base);
    }
  }

  &__images {
    padding: 20px 0 10px 0;
  }

  &__loading {
    position: relative;
    min-height: 150px;
  }

  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    padding: 30px 0;

    &__msg {
      font-weight: bold;
      max-width: 300px;
      text-transform: uppercase;
      text-align: center;
      color: #d6d6d6;
    }
  }

  &__error {
    margin-top: 5px;
  }
}
</style>
