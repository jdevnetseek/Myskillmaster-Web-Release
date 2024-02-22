import {
  rawListingScheduleForm,
  rawScheduleCancelForm,
  rawScheduleRescheduleForm
} from '@/utils/rawStates'
import { isEmpty } from 'lodash'
import { getErrorResponse } from '@/utils/Helpers'
import State from '@/utils/rawStates/State'
import LessonSchedule from '@/models/LessonSchedule'

export const state = () => ({
  fetch: 'lessons/master/to-teach',
  listing: rawListingScheduleForm({}),
  list: [],
  listMeta: {
    current_page: 1,
    last_page: 1
  },

  lessonSchedule: State({}),
  lessonScheduleDetails: null,
  scheduleCancel: rawScheduleCancelForm(),
  scheduleReschedule: rawScheduleRescheduleForm()
})

export const getters = {
  hasLessonScheduleDetails(state) {
    return (
      !isEmpty(state.lessonScheduleDetails) && !!state.lessonScheduleDetails.id
    )
  }
}

export const mutations = {
  setList(state, list) {
    state.list = list.map(e =>
      e instanceof LessonSchedule ? e : new LessonSchedule(e)
    )
  },

  setFetch(state, fetch) {
    state.fetch = fetch
  },

  setLessonScheduleDetails(state, details) {
    state.lessonScheduleDetails =
      details instanceof LessonSchedule ? details : new LessonSchedule(details)
  },

  addToList(state, update) {
    state.list = [
      ...state.list,
      ...update.map(e =>
        e instanceof LessonSchedule ? e : new LessonSchedule(e)
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

      const { data } = await this.$axios.get(state.fetch, {
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

  async getDetails({ state, commit }, scheduleId) {
    commit('setFormBusy', { form: 'lessonSchedule', status: true })

    try {
      const { data } = await this.$axios.get(`${state.fetch}/${scheduleId}`)
      commit('setLessonScheduleDetails', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'lessonSchedule', response: error })
    }

    commit('setFormBusy', { form: 'lessonSchedule', status: false })
  },

  async getPastScheduleDetails({ state, commit }, scheduleId) {
    commit('setFormBusy', { form: 'lessonSchedule', status: true })

    try {
      const { data } = await this.$axios.get(`/master/past/lessons/${scheduleId}`)
      commit('setLessonScheduleDetails', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'lessonSchedule', response: error })
    }

    commit('setFormBusy', { form: 'lessonSchedule', status: false })
  },

  async cancelSchedule({ commit, state }, payload = {}) {
    commit('setFormBusy', { form: 'scheduleCancel', status: true })

    try {
      await this.$axios.post(
        `${state.fetch}/${payload.scheduleId}/cancel`,
        payload.form
      )
    } catch (error) {
      commit('setFormErrors', { form: 'scheduleCancel', response: error })
    }

    commit('setFormBusy', { form: 'scheduleCancel', status: false })
  },

  async rescheduleSchedule({ commit, state }, payload = {}) {
    commit('setFormBusy', { form: 'scheduleReschedule', status: true })

    try {
      await this.$axios.post(
        `${state.fetch}/${payload.scheduleId}/reschedule`,
        payload.form
      )
    } catch (error) {
      commit('setFormErrors', { form: 'scheduleReschedule', response: error })
    }

    commit('setFormBusy', { form: 'scheduleReschedule', status: false })
  }
}
