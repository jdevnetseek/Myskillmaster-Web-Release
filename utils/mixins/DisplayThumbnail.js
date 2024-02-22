import IMAGE from '@/utils/Image'

export default {
  props: {
    image: {
      type: [String, Boolean, Object],
      default: () => null
    }
  },

  data() {
    return {
      __displayAsThumbnail: true
    }
  },

  computed: {
    displayThumbnailUrl() {
      return IMAGE.url(
        this.displayThumbnailVariable,
        this.$data.__displayAsThumbnail
      )
    },

    displayThumbnailVariable() {
      return this.image
    }
  },

  watch: {
    displayThumbnailUrl(newValue, oldValue) {
      this.$data.__displayAsThumbnail = false
      this.__displayThumbnailIsValid(newValue)
    }
  },

  mounted() {
    if (this.displayThumbnailUrl) {
      this.__displayThumbnailIsValid(this.displayThumbnailUrl)
    }
  },

  methods: {
    __displayThumbnailIsValid(url) {
      if (this.$data.__displayAsThumbnail) {
        const image = new Image()
        image.addEventListener('error', () => {
          this.$data.__displayAsThumbnail = false
        })

        image.src = url
      }
    }
  }
}
