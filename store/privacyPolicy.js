import { rawPrivacyPolicyForm } from '@/utils/rawStates'
import { getErrorResponse } from '@/utils/Helpers'
import { isEmpty } from 'lodash'
import PrivacyPolicy from '@/models/PrivacyPolicy'

export const state = () => ({
  privacyPolicy: rawPrivacyPolicyForm(),
  privacyPolicyDetails: null
})

export const getters = {
  hasPrivacyPolicyDetails(state) {
    return !isEmpty(state.privacyPolicyDetails)
  }
}

export const mutations = {
  setPrivacyPolicyDetails(state, privacyPolicy) {
    state.privacyPolicyDetails =
      privacyPolicy instanceof PrivacyPolicy
        ? privacyPolicy
        : new PrivacyPolicy(privacyPolicy)
  },

  clearPrivacyPolicyDetails(state, privacyPolicy) {
    state.privacyPolicyDetails = null
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
  async getPrivacyPolicyDetails({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'privacyPolicy', status: true })
    try {
      commit('clearPrivacyPolicyDetails')
      const { data } = await PrivacyPolicy.params({ raw: 1 }).get()
      commit('setPrivacyPolicyDetails', data[0])
    } catch (error) {
      commit('setFormErrors', { form: 'privacyPolicy', response: error })
    }
    commit('setFormBusy', { form: 'privacyPolicy', status: false })
  }
}
