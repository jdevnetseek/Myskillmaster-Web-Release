import State from '@/utils/rawStates/State'
import { isEmpty } from 'lodash'
import { getErrorResponse } from '@/utils/Helpers'
import SubscriptionPlan from '@/models/SubscriptionPlan'

export const state = () => ({
  listing: State({}),
  list: [],

  selected: null
})

export const getters = {
  hasSelected(state) {
    return !isEmpty(state.selected)
  }
}

export const mutations = {
  setList(state, providers) {
    state.list = providers.map(e =>
      e instanceof SubscriptionPlan ? e : new SubscriptionPlan(e)
    )
  },

  clearList(state) {
    state.list = []
  },

  setSelected(state, plan) {
    state.selected = plan
  },

  clearSelected(state) {
    state.selected = null
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

      const { data } = await this.$axios.get('user/plans')
      commit('setList', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'listing', response: error })
    } finally {
      commit('setFormBusy', { form: 'listing', status: false })
    }
  }
}
