import { rawMasterProfileForm } from '@/utils/rawStates'
import { isEmpty } from 'lodash'
import { getErrorResponse } from '@/utils/Helpers'

export const state = () => ({
  masterProfile: rawMasterProfileForm(),
  masterProfileDetails: null
})

export const getters = {
  hasMasterProfileDetails(state) {
    return !isEmpty(state.masterProfileDetails)
  }
}

export const mutations = {
  setMasterProfileDetails(state, details) {
    state.masterProfileDetails = details
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
  async getMasterProfile({ commit, rootState }) {
    commit('setFormBusy', { form: 'masterProfile', status: true })

    try {
      const { data } = await this.$axios.get('auth/master-profile')
      commit('setMasterProfileDetails', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'masterProfile', response: error })
    }

    commit('setFormBusy', { form: 'masterProfile', status: false })
  },

  async updateMasterProfile({ commit, rootState }, payload = {}) {
    commit('setFormBusy', { form: 'masterProfile', status: true })

    try {
      const { data } = await this.$axios.post('auth/master-profile', payload)
      rootState.auth.user.has_master_profile = true
      commit('setMasterProfileDetails', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'masterProfile', response: error })
    }

    commit('setFormBusy', { form: 'masterProfile', status: false })
  },

  async deleteMasterProfile({ commit, rootState }) {
    commit('setFormBusy', { form: 'masterProfile', status: true })

    try {
      await this.$axios.delete('auth/master-profile')
      rootState.auth.user.has_master_profile = false
      commit('setMasterProfileDetails', null)
    } catch (error) {
      commit('setFormErrors', { form: 'masterProfile', response: error })
    }

    commit('setFormBusy', { form: 'masterProfile', status: false })
  }
}
