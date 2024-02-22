export default {
  props: {
    value: {
      type: [Boolean, String],
      default: false
    },

    maxWidth: {
      type: Number,
      default: 650
    }
  },

  watch: {
    value(value) {
      this.$emit(value ? 'opened' : 'closed')
    }
  },

  methods: {
    toggle(bool = null, emit = null) {
      this.$emit('input', bool === null ? !this.value : bool)

      if (emit) {
        this.$emit(emit)
      }
    },

    open() {
      this.toggle(true)
    },
    close() {
      this.toggle(false)
    }
  }
}
