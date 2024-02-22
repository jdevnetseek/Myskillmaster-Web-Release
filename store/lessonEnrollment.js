import {
  rawListingEnrollmentForm,
  rawEnrollmentCancelForm,
  rawEnrollmentRescheduleForm
} from '@/utils/rawStates'
import { isEmpty } from 'lodash'
import { getErrorResponse } from '@/utils/Helpers'
import State from '@/utils/rawStates/State'
import LessonEnrollment from '@/models/LessonEnrollment'

export const state = () => ({
  listing: rawListingEnrollmentForm({}),
  list: [],
  listMeta: {
    current_page: 1,
    last_page: 1
  },

  lessonEnrollment: State({}),
  lessonEnrollmentDetails: null,
  enrollmentCancel: rawEnrollmentCancelForm(),
  enrollmentReschedule: rawEnrollmentRescheduleForm()
})

export const getters = {
  hasEnrollmentDetails(state) {
    return (
      !isEmpty(state.lessonEnrollmentDetails) &&
      !!state.lessonEnrollmentDetails.reference_code
    )
  }
}

export const mutations = {
  setList(state, list) {
    state.list = list.map(e =>
      e instanceof LessonEnrollment ? e : new LessonEnrollment(e)
    )
  },

  setFetch(state, fetch) {
    state.fetch = fetch
  },

  setEnrollmentDetails(state, details) {
    state.lessonEnrollmentDetails =
      details instanceof LessonEnrollment
        ? details
        : new LessonEnrollment(details)
  },

  addToList(state, update) {
    state.list = [
      ...state.list,
      ...update.map(e =>
        e instanceof LessonEnrollment ? e : new LessonEnrollment(e)
      )
    ]
  },

  setListMeta(state, meta) {
    state.listMeta = meta
  },

  clearList(state) {
    state.list = []
  },

  setFormBusy(state, payload) {
    state[payload.form].$busy = payload.status
  },

  setFormErrors(state, payload) {
    const { errors, status, message } = getErrorResponse(payload.response)
    state[payload.form].$errorMessage = message
    state[payload.form].$errorStatus = status
    state[payload.form].$errors = errors
  }
}

export const actions = {
  async getList({ state, commit }, payload = {}) {
    let list = []
    let meta = {}
    commit('setFormBusy', { form: 'listing', status: true })
    try {
      const params = JSON.parse(JSON.stringify(payload))

      if (!params.concat || params.page === 1) {
        commit('clearList')
      }

      const { data } = await this.$axios.get('lessons/student/to-learn', {
        params: { ...params }
      })

      list = data.data
      meta = data.meta

      if (!params.concat) {
        commit('setList', list)
      } else {
        commit('addToList', list)
      }
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
  },

  async getDetails({ state, commit }, referenceCode) {
    commit('setFormBusy', { form: 'lessonEnrollment', status: true })

    try {
      const { data } = await this.$axios.get(
        `lessons/student/to-learn/${referenceCode}`
      )
      commit('setEnrollmentDetails', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'lessonEnrollment', response: error })
    }

    commit('setFormBusy', { form: 'lessonEnrollment', status: false })
  },

  async getPastLessonDetails({ state, commit }, referenceCode) {
    commit('setFormBusy', { form: 'lessonEnrollment', status: true })

    try {
      const { data } = await this.$axios.get(
        `student/past/lessons/${referenceCode}`
      )
      commit('setEnrollmentDetails', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'lessonEnrollment', response: error })
    }

    commit('setFormBusy', { form: 'lessonEnrollment', status: false })
  },

  async cancelEnrollment({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'enrollmentCancel', status: true })

    try {
      await this.$axios.post(
        `enrollments/${payload.referenceCode}/cancel`,
        payload.form
      )
    } catch (error) {
      commit('setFormErrors', { form: 'enrollmentCancel', response: error })
    }

    commit('setFormBusy', { form: 'enrollmentCancel', status: false })
  },

  async rescheduleEnrollment({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'enrollmentReschedule', status: true })

    try {
      await this.$axios.post(
        `enrollments/${payload.referenceCode}/reschedule`,
        payload.form
      )
    } catch (error) {
      commit('setFormErrors', { form: 'enrollmentReschedule', response: error })
    }

    commit('setFormBusy', { form: 'enrollmentReschedule', status: false })
  }
}
