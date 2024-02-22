<template>
  <div>
    <input
      ref="filePicker"
      type="file"
      style="display:none"
      accept="image/*"
      @change="onFileChange"
    >
    <v-dialog v-model="show" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">
          Crop Image
        </v-card-title>
        <v-card-text>
          <div v-if="imgSrc">
            <vue-cropper
              ref="cropper"
              :guides="true"
              drag-mode="crop"
              :src="imgSrc"
              :aspect-ratio="1 / 1"
              :initial-aspect-ratio="1 / 1"
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn text @click="cancel">
            Cancel
          </v-btn>
          <v-btn v-if="imgSrc" color="primary" @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  components: {
    VueCropper
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      show: this.value,
      imgSrc: null
    }
  },

  watch: {
    value(val) {
      if (this.imgSrc) {
        this.show = val
      }
      if (val && !this.imgSrc) {
        this.launchFilePicker()
      }
    },

    show(val) {
      this.$emit('input', val)
      this.imgSrc = null
    }
  },

  mounted() {
    document.body.onfocus = () => {
      if (!this.imgSrc && !this.show) {
        this.$emit('input', false)
      }
    }
  },

  methods: {
    launchFilePicker() {
      this.$refs.filePicker.click()
    },

    onFileChange(event) {
      const file = event.target.files[0]
      if (file && this.isImage(file)) {
        this.show = true
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = (e) => {
          this.imgSrc = e.target.result
        }
      } else {
        this.imgSrc = null
        this.show = false
      }
    },

    save() {
      this.$refs.filePicker.value = null
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        this.imgSrc = null
        this.show = false
        this.$emit('change', blob)
      })
    },

    cancel() {
      this.show = false
      this.imgSrc = null
    },

    isImage(file) {
      return file && file.type.split('/')[0] === 'image'
    }
  }
}
</script>

<style></style>
