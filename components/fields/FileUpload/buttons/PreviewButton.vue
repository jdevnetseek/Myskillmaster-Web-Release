<template>
  <div class="preview-button d-flex align-center">
    <div class="preview-button__img d-flex align-center mr-1" @click="onClick">
      <div class="preview-button__img__thumbnail mr-3" :style="previewImage" />
      <p class="mb-0">
        {{ filename }}
      </p>
      <Loading :value="loading" :size="24" />
    </div>
    <v-btn color="error" fab icon :disabled="loading" @click="onDelete">
      <v-icon> mdi-trash-can-outline </v-icon>
    </v-btn>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * File upload: Preview button
 * ==================================================================================
 **/

import isEmpty from 'lodash/isEmpty'
import { truncate } from '@/utils/Helpers'
import Loading from '@/components/common/Loading'
import DisplayThumbnailMixin from '@/utils/mixins/DisplayThumbnail'

export default {
  name: 'PreviewButton',
  components: {
    Loading
  },
  mixins: [DisplayThumbnailMixin],
  props: {
    image: {
      type: [Object, String],
      default: () => null
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    previewImage() {
      return {
        backgroundImage: `url('${this.displayThumbnailUrl}')`,
        backgroundPosition: '50% 50%',
        backgroundSize: 'cover'
      }
    },

    filename() {
      return !isEmpty(this.image) ? truncate(this.image.name, 25) : 'Image.jpg'
    }
  },

  methods: {
    onClick() {
      this.$emit('clicked')
    },

    onDelete() {
      this.$emit('deleted')
    }
  }
}
</script>
<style scoped lang="scss">
.preview-button {
  &__img {
    position: relative;
    padding: 8px;
    border: 1.5px solid $border-color;
    border-radius: $border-radius;
    cursor: pointer;

    &__thumbnail {
      width: 36px;
      height: 36px;
      border-radius: $border-radius / 2;
      background-color: #c4c4c4;
    }
  }
}
</style>
