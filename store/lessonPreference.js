import { rawInterestForm } from '@/utils/rawStates'
import { isEmpty } from 'lodash'
import { getErrorResponse } from '@/utils/Helpers'

export const state = () => ({
  lessonPreference: rawInterestForm(),
  lessonPreferenceDetails: []
})

export const getters = {
  hasLessonPreferenceDetails(state) {
    return !isEmpty(state.lessonPreferenceDetails)
  }
}

export const mutations = {
  setLessonPreferenceDetails(state, details) {
    state.lessonPreferenceDetails = details
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
  async getLessonPreference({ commit }) {
    commit('setFormBusy', { form: 'lessonPreference', status: true })
    try {
      const { data } = await this.$axios.get('auth/lesson-preferences')
      commit('setLessonPreferenceDetails', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'lessonPreference', response: error })
    }

    commit('setFormBusy', { form: 'lessonPreference', status: false })
  },

  async addLessonPreference({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'lessonPreference', status: true })

    try {
      const { data } = await this.$axios.post('auth/lesson-preferences', payload)
      commit('setLessonPreferenceDetails', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'lessonPreference', response: error })
    }

    commit('setFormBusy', { form: 'lessonPreference', status: false })
  }
}
