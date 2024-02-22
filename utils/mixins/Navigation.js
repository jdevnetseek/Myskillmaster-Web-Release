import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      controls: {
        drawer: true
      }
    }
  },

  computed: {
    ...mapState({
      drawer: state => state.drawer
    })
  },

  methods: {
    ...mapMutations({
      toggleDrawer: 'toggleDrawer'
    })
  },

  created() {
    this.controls.drawer = this.drawer
  },

  watch: {
    drawer(val) {
      this.controls.drawer = val
    },

    'controls.drawer'(val) {
      this.toggleDrawer(val)
    }
  }
}
