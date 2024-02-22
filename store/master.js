import State from '@/utils/rawStates/State'
import { getErrorResponse } from '@/utils/Helpers'
import Master from '@/models/Master'

export const state = () => ({
  listing: State({}),
  list: [],
  listMeta: {
    current_page: 1,
    last_page: 1
  }
})

export const getters = {}

export const mutations = {
  setList(state, list) {
    state.list = list.map(e => (e instanceof Master ? e : new Master(e)))
  },

  clearList(state) {
    state.list = []
  },

  setListMeta(state, meta) {
    state.listMeta = meta
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
    let list = []
    let meta = {}

    commit('setFormBusy', { form: 'listing', status: true })
    try {
      commit('clearList')

      const { data } = await this.$axios.get('masters', {
        params: {
          ...payload
        }
      })
      list = data.data
      meta = data.meta

      commit('setList', list)
      commit('setListMeta', meta)
    } catch (error) {
      commit('setFormErrors', { form: 'listing', response: error })
    } finally {
      commit('setFormBusy', { form: 'listing', status: false })
    }

    return {
      list,
      meta
    }
  }
}
