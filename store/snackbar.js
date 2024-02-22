export const state = () => ({
  message: '',
  list: '',
  color: ''
})

export const getters = {}

export const mutations = {
  setMessage(state, message) {
    state.message = message
  },

  setList(state, list) {
    state.list = list
  },

  setColor(state, color) {
    state.color = color
  }
}

export const actions = {
  show({ commit }, data) {
    commit('setMessage', data.message)
    commit('setList', data.list)
    commit('setColor', data.color)
  }
}
