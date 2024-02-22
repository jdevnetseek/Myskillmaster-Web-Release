import { rawTermsForm } from '@/utils/rawStates'
import { getErrorResponse } from '@/utils/Helpers'
import { isEmpty } from 'lodash'
import Terms from '@/models/Terms'

export const state = () => ({
  terms: rawTermsForm(),
  termsDetails: null
})

export const getters = {
  hasTermsDetails(state) {
    return !isEmpty(state.termsDetails)
  }
}

export const mutations = {
  setTermsDetails(state, terms) {
    state.termsDetails = terms instanceof Terms ? terms : new Terms(terms)
  },

  clearTermsDetails(state, terms) {
    state.termsDetails = null
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
  async getTermsDetails({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'terms', status: true })
    try {
      commit('clearTermsDetails')
      const { data } = await Terms.params({ raw: 1 }).get()
      commit('setTermsDetails', data[0])
    } catch (error) {
      commit('setFormErrors', { form: 'terms', response: error })
    }
    commit('setFormBusy', { form: 'terms', status: false })
  }
}
