import { getErrorResponse } from '@/utils/Helpers'
import { isEmpty } from 'lodash'
import StripeAccount from '@/models/StripeAccount'
import StripeLink from '@/models/StripeLink'
import StripeBalance from '@/models/StripeBalance'
import State from '@/utils/rawStates/State'

export const state = () => ({
  stripeAccount: State(),
  stripeLink: State(),
  stripeBalance: State(),

  stripeAccountDetails: null,
  stripeLinkDetails: null,
  stripeBalanceDetails: null
})

export const getters = {
  hasStripeAccountDetails(state) {
    return !isEmpty(state.stripeAccountDetails)
  },

  hasStripeLinkDetails(state) {
    return !isEmpty(state.stripeLinkDetails)
  },

  hasStripeBalanceDetails(state) {
    return !isEmpty(state.stripeBalanceDetails)
  }
}

export const mutations = {
  setStripeAccount(state, stripeAccount) {
    state.stripeAccountDetails =
      StripeAccount instanceof StripeAccount
        ? stripeAccount
        : new StripeAccount(stripeAccount)
  },

  clearStripeAccount(state, product) {
    state.stripeAccountDetails = null
  },

  setStripeLinkDetails(state, stripeLink) {
    state.stripeLinkDetails =
      stripeLink instanceof StripeLink ? stripeLink : new StripeLink(stripeLink)
  },

  clearStripeLinkDetails(state) {
    state.stripeLinkDetails = null
  },

  setStripeBalanceDetails(state, stripeBalance) {
    state.stripeBalanceDetails =
      stripeBalance instanceof StripeBalance
        ? stripeBalance
        : new StripeBalance(stripeBalance)
  },

  clearStripeBalanceDetails(state) {
    state.stripeBalanceDetails = null
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
  async getStripeAccount({ commit }, payload) {
    commit('setFormBusy', { form: 'stripeAccount', status: true })
    try {
      commit('clearStripeAccount')
      const { data } = await this.$axios.get('auth/connect/account')
      commit('setStripeAccount', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'stripeAccount', response: error })
    }
    commit('setFormBusy', { form: 'stripeAccount', status: false })
  },

  async getStripeLink({ commit }, payload) {
    commit('setFormBusy', { form: 'stripeLink', status: true })
    try {
      commit('clearStripeLinkDetails')
      const { data } = await this.$axios.post(
        'auth/connect/account-links',
        payload
      )
      commit('setStripeLinkDetails', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'stripeLink', response: error })
    }
    commit('setFormBusy', { form: 'stripeLink', status: false })
  },

  async getStripeBalance({ commit }, payload) {
    commit('setFormBusy', { form: 'stripeBalance', status: true })
    try {
      commit('clearStripeLinkDetails')
      const { data } = await this.$axios.get('auth/connect/balance', payload)
      commit('setStripeBalanceDetails', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'stripeBalance', response: error })
    }
    commit('setFormBusy', { form: 'stripeBalance', status: false })
  },

  async payoutBalance({ commit }, payload) {
    commit('setFormBusy', { form: 'stripeBalance', status: true })
    try {
      await this.$axios.post('auth/connect/balance/payout', payload)
    } catch (error) {
      commit('setFormErrors', { form: 'stripeBalance', response: error })
    }
    commit('setFormBusy', { form: 'stripeBalance', status: false })
  }
}
