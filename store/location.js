import State from '@/utils/rawStates/State'
import { getErrorResponse } from '@/utils/Helpers'
import Location from '@/models/Location'

export const state = () => ({
  listing: State({}),
  list: []
})

export const getters = {}

export const mutations = {
  setList(state, locations) {
    state.list = locations.map(e =>
      e instanceof Location ? e : new Location(e)
    )
  },

  clearList(state) {
    state.list = []
  },

  setFormErrors(state, payload) {
    const { errors, status, message } = getErrorResponse(payload.response)
    state[payload.form].$errorMessage = message
    state[payload.form].$errorStatus = status
    state[payload.form].$errors = errors
  },

  setFormBusy(state, payload) {
    state[payload.form].$busy = payload.status
  }
}

export const actions = {
  async getList({ state, commit }, payload = {}) {
    commit('setFormBusy', { form: 'listing', status: true })
    try {
      commit('clearList')

      const { data } = await this.$axios.get('/places')
      commit('setList', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'listing', response: error })
    } finally {
      commit('setFormBusy', { form: 'listing', status: false })
    }
  }
}
