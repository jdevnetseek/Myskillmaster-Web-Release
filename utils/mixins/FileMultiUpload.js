import ImageMixin from '@/utils/Image'

export default {
  mixins: [ImageMixin],
  props: {
    images: {
      type: Array,
      default: () => {
        return []
      }
    },

    /**
     * Max image count
     */
    maxImage: {
      type: Number,
      default: 10
    },

    minImage: {
      type: Number,
      default: 0
    },

    maxSize: {
      type: Number,
      default: 2
    },

    forUpdate: {
      type: Boolean,
      default: false
    },

    canUpload: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    hasMinimumImage() {
      return this.minImage > 0
    },

    isFull() {
      return this.images.length === this.maxImage
    }
  },

  methods: {
    canDelete() {
      return this.forUpdate && this.hasMinimumImage
        ? this.images.length > this.minImage
        : true
    }
  }
}
