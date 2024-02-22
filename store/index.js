export const strict = false

export const state = () => ({
  drawer: false,
  showDeleteAccountModal: false
})

export const mutations = {
  toggleDeleteAccountModal(state, value) {
    state.showDeleteAccountModal = value
  },

  toggleDrawer(state, value) {
    state.drawer = value
  }
}

export const getters = {
  appName() {
    return process.env.appName
  },

  isDev() {
    return process.env.isDev
  }
}

export const actions = {}
