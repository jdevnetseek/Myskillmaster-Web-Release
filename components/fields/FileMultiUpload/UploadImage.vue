<template>
  <div class="upload-image">
    <v-btn
      v-if="!disabled"
      class="upload-image__delete"
      fab
      small
      depressed
      @click="deleteImage"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-img
      v-if="validImage"
      contain
      :src="validImage"
      class="upload-image__image"
      @click="selectImage"
    />
    <p v-else class="upload-image__error">
      Error loading image
    </p>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * File Multiple Upload: Upload Image
 * ==================================================================================
 **/

export default {
  props: {
    image: {
      type: Object,
      default: () => {
        return null
      }
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    validImage() {
      return this.image ? this.image.url : null
    }
  },

  methods: {
    selectImage() {
      this.$emit('select-image', this.image)
    },

    deleteImage() {
      this.$emit('delete', this.image)
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-image {
  position: relative;
  width: 100%;
  min-height: 50px;
  border: 1px solid #f7f7f7;
  background-color: #f7f7f7;
  border-radius: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  &__delete {
    position: absolute;
    top: -15px;
    right: -15px;
    z-index: 1;
    background-color: #f2f8f8 !important;
  }

  &__image {
    max-height: 140px;
    border-radius: 12px;
    cursor: pointer;
  }

  &__error {
    font-weight: bold;
    margin-bottom: 0;
    padding: 50px 0;
    color: gray;
  }
}
</style>
