import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({
      _showSnackbar: 'snackbar/show'
    }),

    showSnackbar(message, success = true, list = null) {
      this._showSnackbar({
        message,
        list,
        color: success ? 'success' : 'red'
      })
    },

    showResponseError(error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        error = error.response.data.message
      }
      this.showSnackbar(error, false)
    }
  }
}
