import State from '@/utils/rawStates/State'
import { getErrorResponse } from '@/utils/Helpers'
import Category from '@/models/Category'

export const state = () => ({
  listing: State({}),
  categories: []
})

export const getters = {
  categories: state => state.categories
}

export const mutations = {
  setCategoriesList(state, list) {
    state.categories = list.map(e =>
      e instanceof Category ? e : new Category(e)
    )
  },

  clearCategories(state) {
    state.categories = []
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
  async getCategories({ commit }, payload = {}) {
    let categories = []

    commit('setFormBusy', { form: 'listing', status: true })
    try {
      commit('clearCategories')

      const { data } = await this.$axios.get('categories', {
        params: {
          ...payload
        }
      })

      categories = data.data

      commit('setCategoriesList', categories)
    } catch (error) {
      commit('setFormErrors', { form: 'listing', response: error })
    } finally {
      commit('setFormBusy', { form: 'listing', status: false })
    }

    return {
      categories
    }
  }
}
