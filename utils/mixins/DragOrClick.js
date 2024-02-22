export default {
  props: {
    /**
     * Mouse distance in pixels to be triggered as click
     */
    clickDelta: {
      type: Number,
      default: 6
    }
  },

  data() {
    return {
      _dragOrClickElement: null,
      _dragOrClickStartX: 0,
      _dragOrClickStartY: 0
    }
  },

  destroyed() {
    if (this.$data._dragOrClickElement) {
      this.$data._dragOrClickElement.removeEventListener(
        'mousedown',
        this._dragOrClickMouseDown
      )
      this.$data._dragOrClickElement.removeEventListener(
        'mouseup',
        this._dragOrClickMouseUp
      )
    }
  },

  methods: {
    dragOrClick(element = null) {
      const elementObj = element || this.$el
      if (!elementObj) {
        return console.warn(
          'DragOrClick: Cannot initialize as element is missing'
        )
      }

      this.$data._dragOrClickElement = elementObj

      this.$data._dragOrClickElement.addEventListener(
        'mousedown',
        this._dragOrClickMouseDown
      )
      this.$data._dragOrClickElement.addEventListener(
        'mouseup',
        this._dragOrClickMouseUp
      )
    },

    _dragOrClickMouseDown(event) {
      this.$data._dragOrClickStartX = event.pageX
      this.$data._dragOrClickStartY = event.pageY
    },

    _dragOrClickMouseUp(event) {
      const diffX = Math.abs(event.pageX - this.$data._dragOrClickStartX)
      const diffY = Math.abs(event.pageY - this.$data._dragOrClickStartY)

      if (diffX < this.clickDelta && diffY < this.clickDelta) {
        this.$emit('click')
      }
    }
  }
}
