import {
  rawListingPayoutAccountForm,
  rawPayoutAccountForm
} from '@/utils/rawStates'
import { find, findIndex, get } from 'lodash'
import { getErrorResponse } from '@/utils/Helpers'
import PayoutAccount from '@/models/PayoutAccount'
import ENV from '@/services/env'

export const state = () => ({
  listing: rawListingPayoutAccountForm(),
  list: [],

  payoutAccount: rawPayoutAccountForm()
})

export const getters = {}

export const mutations = {
  setList(state, list) {
    state.list = list.map(e =>
      e instanceof PayoutAccount ? e : new PayoutAccount(e)
    )
  },

  addToList(state, payment) {
    state.list = [
      ...state.list,
      payment instanceof PayoutAccount ? payment : new PayoutAccount(payment)
    ]
  },

  removeToList(state, payment) {
    const index = findIndex(state.list, { id: payment })
    if (index >= 0) {
      state.list.splice(index, 1)
    }
  },

  setPrimaryOnList(state, payment) {
    const currentPrimary = find(state.list, { default_for_currency: true })
    if (currentPrimary) {
      currentPrimary.default_for_currency = false
    }

    const exist = find(state.list, { id: payment })
    if (exist) {
      exist.default_for_currency = true
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

      const { data } = await this.$axios.get('auth/connect/external-accounts')
      commit('setList', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'listing', response: error })
    } finally {
      commit('setFormBusy', { form: 'listing', status: false })
    }
  },

  async createPayoutAccountToken({ state, commit }, payload = {}) {
    let token = null
    const getTokenParam = (params) => {
      const formData = []
      const details = {
        country: 'AU',
        currency: 'aud',
        account_holder_name: params.account_name,
        account_holder_type: 'individual',
        routing_number: params.account_bsb,
        account_number: params.account_number
      }

      for (const property in details) {
        const encodedKey = encodeURIComponent(property)
        const encodedValue = encodeURIComponent(details[property])
        formData.push('bank_account[' + encodedKey + ']=' + encodedValue)
      }

      return formData.join('&')
    }

    commit('setFormBusy', { form: 'payoutAccount', status: true })
    try {
      const { data } = await this.$axios.post(
        'https://api.stripe.com/v1/tokens',
        getTokenParam(payload),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${ENV.stripePublishableKey}`
          }
        }
      )
      token = data.id
    } catch (error) {
      state.payoutAccount.$errorMessage = get(
        error,
        'response.data.error.message',
        'Sorry, we are having trouble connecting to Stripe. Please try again later'
      )
    } finally {
      commit('setFormBusy', { form: 'payoutAccount', status: false })
    }

    return token
  },

  async createPayoutAccount({ state, commit }, payload = {}) {
    commit('setFormBusy', { form: 'payoutAccount', status: true })
    try {
      const { data } = await this.$axios.post(
        'auth/connect/external-accounts',
        payload
      )
      commit('addToList', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'payoutAccount', response: error })
    } finally {
      commit('setFormBusy', { form: 'payoutAccount', status: false })
    }
  },

  async removePayoutAccount({ state, commit }, payload = {}) {
    commit('setFormBusy', { form: 'payoutAccount', status: true })
    try {
      await this.$axios.delete(`auth/connect/external-accounts/${payload.id}`)
      commit('removeToList', payload.id)
    } catch (error) {
      commit('setFormErrors', { form: 'payoutAccount', response: error })
    } finally {
      commit('setFormBusy', { form: 'payoutAccount', status: false })
    }
  },

  async updatePrimaryPayoutAccount({ state, commit }, payload = {}) {
    commit('setFormBusy', { form: 'payoutAccount', status: true })
    try {
      await this.$axios.put(`auth/connect/external-accounts/${payload.id}`, {
        default_for_currency: true
      })
      commit('setPrimaryOnList', payload.id)
    } catch (error) {
      commit('setFormErrors', { form: 'payoutAccount', response: error })
    } finally {
      commit('setFormBusy', { form: 'payoutAccount', status: false })
    }
  }
}
