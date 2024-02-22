import {
  rawListingLessonForm,
  rawLessonForm,
  rawLessonScheduleForm,
  rawLessonEnrollForm
} from '@/utils/rawStates'
import { isEmpty, findIndex } from 'lodash'
import { getErrorResponse } from '@/utils/Helpers'
import Lesson from '@/models/Lesson'
import LessonEnroll from '@/models/LessonEnroll'

export const state = () => ({
  listing: rawListingLessonForm({}),
  list: [],
  listMeta: {
    current_page: 1,
    last_page: 1
  },

  lesson: rawLessonForm(),
  lessonDetails: null,
  lessonEnrollDetails: null,

  lessonSchedule: rawLessonScheduleForm(),
  lessonEnroll: rawLessonEnrollForm()
})

export const getters = {
  hasLessonDetails(state) {
    return !isEmpty(state.lessonDetails) && !!state.lessonDetails.id
  },

  hasLessonEnrollDetails(state) {
    return !isEmpty(state.lessonEnrollDetails)
  }
}

export const mutations = {
  setList(state, list) {
    state.list = list.map(e => (e instanceof Lesson ? e : new Lesson(e)))
  },

  addToList(state, update) {
    state.list = [
      ...state.list,
      ...update.map(e => (e instanceof Lesson ? e : new Lesson(e)))
    ]
  },

  clearList(state) {
    state.list = []
  },

  setListMeta(state, meta) {
    state.listMeta = meta || {
      current_page: 1,
      last_page: 1
    }
  },

  clearListMeta(state) {
    state.listMeta = {
      current_page: 1,
      last_page: 1
    }
  },

  setLessonDetails(state, details) {
    state.lessonDetails =
      details instanceof Lesson ? details : new Lesson(details)
  },

  setLessonDetailsAddress(state, address) {
    if (state.lessonDetails) {
      state.lessonDetails.address_or_link = address
    }
  },

  setLessonDetailsSchedules(state, schedules) {
    if (state.lessonDetails) {
      state.lessonDetails.lesson_schedules = schedules
    }
  },

  clearLessonDetails(state) {
    state.lessonDetails = null
  },

  addLessonDetailsImages(state, images) {
    state.lessonDetails.cover_photo = [
      ...state.lessonDetails.cover_photo,
      ...images
    ]
  },

  removeLessonDetailsImages(state, imageId) {
    const index = findIndex(state.lessonDetails.cover_photo, { id: imageId })
    if (index >= 0) {
      state.lessonDetails.cover_photo.splice(index, 1)
    }
  },

  addLessonDetailsSchedule(state, schedules) {
    state.lessonDetails.lesson_schedules = [
      ...state.lessonDetails.lesson_schedules,
      ...schedules
    ]
  },

  removeLessonDetailsSchedule(state, schedule) {
    const index = findIndex(state.lessonDetails.lesson_schedules, {
      id: schedule
    })
    if (index >= 0) {
      state.lessonDetails.lesson_schedules.splice(index, 1)
    }
  },

  setLessonEnrollDetails(state, details) {
    state.lessonEnrollDetails =
      details instanceof LessonEnroll ? details : new LessonEnroll(details)
  },

  clearLessonEnrollDetails(state) {
    state.lessonEnrollDetails = null
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
      const params = JSON.parse(JSON.stringify(payload))

      if (!params.concat || params.page === 1) {
        commit('clearList')
      }

      let fetch = 'lessons'
      if (params.popular) {
        fetch = 'popular/lessons'
      } else if (Object.prototype.hasOwnProperty.call(params, 'search')) {
        fetch = 'search/lessons'
        params['filter[search]'] = decodeURIComponent(params.search)
        delete params.search
      }

      if (Object.prototype.hasOwnProperty.call(params, 'active')) {
        params['filter[active]'] = params.active ?? params.active
      }
      delete params.active

      const { data } = await this.$axios.get(fetch, {
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

  async getDetails({ commit }, slug) {
    commit('setFormBusy', { form: 'lesson', status: true })

    try {
      const { data } = await this.$axios.get(
        `lessons/${slug}?exclude_past_schedules=true`
      )
      commit('setLessonDetails', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'lesson', response: error })
    }

    commit('setFormBusy', { form: 'lesson', status: false })
  },

  async getAddress({ commit }, id) {
    let address = ''
    commit('setFormBusy', { form: 'lesson', status: true })

    try {
      const { data } = await this.$axios.get(`lessons/address/${id}`)
      address = data.data.address_or_link
      commit('setLessonDetailsAddress', address)
    } catch (error) {
      commit('setFormErrors', { form: 'lesson', response: error })
    }

    commit('setFormBusy', { form: 'lesson', status: false })
    return address
  },

  async createLesson({ commit }, payload = {}) {
    let result = null
    commit('setFormBusy', { form: 'lesson', status: true })

    try {
      const { data } = await this.$axios.post('lessons', payload)
      result = data.data
    } catch (error) {
      commit('setFormErrors', { form: 'lesson', response: error })
    }

    commit('setFormBusy', { form: 'lesson', status: false })
    return result
  },

  async updateLesson({ commit }, payload = {}) {
    let result = null
    commit('setFormBusy', { form: 'lesson', status: true })

    try {
      const { data } = await this.$axios.put(`lessons/${payload.id}`, payload)
      result = data.data
      commit('setLessonDetails', result)
    } catch (error) {
      commit('setFormErrors', { form: 'lesson', response: error })
    }

    commit('setFormBusy', { form: 'lesson', status: false })
    return result
  },

  async deleteLesson({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'lesson', status: true })

    try {
      await this.$axios.delete(`lessons/${payload.id}`)
    } catch (error) {
      commit('setFormErrors', { form: 'lesson', response: error })
    }

    commit('setFormBusy', { form: 'lesson', status: false })
  },

  async addLessonImage({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'lesson', status: true })

    try {
      const { data } = await this.$axios.post(
        `lessons/${payload.get('id')}/cover-photos`,
        payload
      )
      commit('addLessonDetailsImages', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'lesson', response: error })
    }

    commit('setFormBusy', { form: 'lesson', status: false })
  },

  async removeLessonImage({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'lesson', status: true })

    try {
      await this.$axios.delete(
        `lessons/${payload.id}/cover-photos/${payload.mediaId}`,
        payload
      )
      commit('removeLessonDetailsImages', payload.mediaId)
    } catch (error) {
      commit('setFormErrors', { form: 'lesson', response: error })
    }

    commit('setFormBusy', { form: 'lesson', status: false })
  },

  /**
   * Schedule/Slot
   * ==================================================================================
   **/

  async validateLessonSchedule({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'lessonSchedule', status: true })

    try {
      await this.$axios.post('lesson/schedule/duplicate/checker', payload)
    } catch (error) {
      commit('setFormErrors', { form: 'lessonSchedule', response: error })
    }

    commit('setFormBusy', { form: 'lessonSchedule', status: false })
  },

  async addLessonSchedule({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'lessonSchedule', status: true })

    try {
      const { data } = await this.$axios.post('lesson/schedule', payload)
      commit('setLessonDetailsSchedules', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'lessonSchedule', response: error })
    }

    commit('setFormBusy', { form: 'lessonSchedule', status: false })
  },

  async removeLessonSchedule({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'lessonSchedule', status: true })

    try {
      await this.$axios.delete(`lesson/schedule/${payload.id}`)
      commit('removeLessonDetailsSchedule', payload.id)
    } catch (error) {
      commit('setFormErrors', { form: 'lessonSchedule', response: error })
    }

    commit('setFormBusy', { form: 'lessonSchedule', status: false })
  },

  /**
   * Enroll
   * ==================================================================================
   **/

  async getEnrollDetails({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'lessonEnroll', status: true })

    try {
      const { data } = await this.$axios.post(
        'enrollment/calculate-payment',
        payload
      )
      commit('setLessonEnrollDetails', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'lessonEnroll', response: error })
    }

    commit('setFormBusy', { form: 'lessonEnroll', status: false })
  },

  async enrollLesson({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'lessonEnroll', status: true })

    try {
      const { data } = await this.$axios.post(
        `lessons/${payload.id}/enroll`,
        payload
      )
      commit('setLessonEnrollDetails', data.data)
      commit('setFormBusy', { form: 'lessonEnroll', status: false })
      return data
    } catch (error) {
      commit('setFormErrors', { form: 'lessonEnroll', response: error })
    }
    commit('setFormBusy', { form: 'lessonEnroll', status: false })
  }
}
