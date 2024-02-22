import { find, findIndex } from 'lodash'
import {
  rawListingPaymentMethodForm,
  rawPaymentMethodForm
} from '@/utils/rawStates'
import { getErrorResponse } from '@/utils/Helpers'
import PaymentMethod from '@/models/PaymentMethod'

export const state = () => ({
  listing: rawListingPaymentMethodForm(),
  list: [],

  clientSecret: null,
  paymentMethod: rawPaymentMethodForm()
})

export const getters = {
  hasClientSecret(state) {
    return !!state.clientSecret
  }
}

export const mutations = {
  setList(state, list) {
    state.list = list.map(e =>
      e instanceof PaymentMethod ? e : new PaymentMethod(e)
    )
  },

  addToList(state, payment) {
    state.list = [
      ...state.list,
      payment instanceof PaymentMethod ? payment : new PaymentMethod(payment)
    ]
  },

  removeToList(state, payment) {
    const index = findIndex(state.list, { id: payment })
    if (index >= 0) {
      state.list.splice(index, 1)
    }
  },

  setPrimaryOnList(state, payment) {
    const currentPrimary = find(state.list, { is_default: true })
    if (currentPrimary) {
      currentPrimary.is_default = false
    }

    const exist = find(state.list, { id: payment })
    if (exist) {
      exist.is_default = true
    }
  },

  clearList(state) {
    state.list = []
  },

  setClientSecret(state, secret) {
    state.clientSecret = secret
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

      const { data } = await this.$axios.get('auth/payment-methods')
      commit('setList', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'listing', response: error })
    } finally {
      commit('setFormBusy', { form: 'listing', status: false })
    }
  },

  async getClientSecret({ state, commit }) {
    commit('setFormBusy', { form: 'paymentMethod', status: true })
    try {
      const { data } = await this.$axios.post(
        'auth/payment-methods/create-client-secret'
      )
      commit('setClientSecret', data.client_secret)
    } catch (error) {
      commit('setFormErrors', { form: 'paymentMethod', response: error })
    } finally {
      commit('setFormBusy', { form: 'paymentMethod', status: false })
    }
  },

  async createPaymentMethod({ state, commit }, payload = {}) {
    commit('setFormBusy', { form: 'paymentMethod', status: true })
    try {
      const { data } = await this.$axios.post('auth/payment-methods', payload)
      commit('addToList', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'paymentMethod', response: error })
    } finally {
      commit('setFormBusy', { form: 'paymentMethod', status: false })
    }
  },

  async removePaymentMethod({ state, commit }, payload = {}) {
    commit('setFormBusy', { form: 'paymentMethod', status: true })
    try {
      await this.$axios.delete(`auth/payment-methods/${payload.id}`)
      commit('removeToList', payload.id)
    } catch (error) {
      commit('setFormErrors', { form: 'paymentMethod', response: error })
    } finally {
      commit('setFormBusy', { form: 'paymentMethod', status: false })
    }
  },

  async updatePrimaryPaymentMethod({ state, commit }, payload = {}) {
    commit('setFormBusy', { form: 'paymentMethod', status: true })
    try {
      await this.$axios.post(`auth/payment-methods/${payload.id}/default`)
      commit('setPrimaryOnList', payload.id)
    } catch (error) {
      commit('setFormErrors', { form: 'paymentMethod', response: error })
    } finally {
      commit('setFormBusy', { form: 'paymentMethod', status: false })
    }
  }
}
