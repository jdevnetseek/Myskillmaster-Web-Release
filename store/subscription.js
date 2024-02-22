import State from '@/utils/rawStates/State'
import { rawSubscribeForm } from '@/utils/rawStates'
import { isEmpty } from 'lodash'
import { getErrorResponse } from '@/utils/Helpers'
import Subscription from '@/models/Subscription'

export const state = () => ({
  subscription: rawSubscribeForm(),
  subscriptionDetails: null,

  unsubscribe: State({})
})

export const getters = {
  hasSubscriptionDetails(state) {
    return !isEmpty(state.subscriptionDetails)
  }
}

export const mutations = {
  setSubscription(state, plan) {
    state.subscriptionDetails =
      plan instanceof Subscription ? plan : new Subscription(plan)
  },

  clearSubscription() {
    state.subscriptionDetails = null
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
  async getSubscription({ state, commit }, payload = {}) {
    commit('setFormBusy', { form: 'subscription', status: true })
    try {
      commit('clearSubscription')

      const { data } = await this.$axios.get(
        `subscription/client-secret/${payload.planId}`
      )
      commit('setSubscription', data)
    } catch (error) {
      commit('setFormErrors', { form: 'subscription', response: error })
    } finally {
      commit('setFormBusy', { form: 'subscription', status: false })
    }
  },

  async getCurrentSubscription({ state, commit }, payload = {}) {
    commit('setFormBusy', { form: 'subscription', status: true })
    try {
      commit('clearSubscription')

      const { data } = await this.$axios.get('user/active/subscription')
      commit('setSubscription', data.data)
    } catch (error) {
      commit('setFormErrors', { form: 'subscription', response: error })
    } finally {
      commit('setFormBusy', { form: 'subscription', status: false })
    }
  },

  async checkSubscriptionLimit({ commit }) {
    commit('setFormBusy', { form: 'subscription', status: true })
    try {
      await this.$axios.post('subscription/lesson/limit/checker')
    } catch (error) {
      commit('setFormErrors', { form: 'subscription', response: error })
    } finally {
      commit('setFormBusy', { form: 'subscription', status: false })
    }
  },

  async subscribe({ state, commit, rootState }, payload = {}) {
    commit('setFormBusy', { form: 'subscription', status: true })
    try {
      const requestUrl = !payload.isFreeTrial
        ? 'user/subscribe'
        : `user/subscribe/free-trial/${payload.plan}`

      const response = await this.$axios.post(requestUrl, payload)
      rootState.auth.user.is_subscribed = true
      return response
    } catch (error) {
      commit('setFormErrors', { form: 'subscription', response: error })
    } finally {
      commit('setFormBusy', { form: 'subscription', status: false })
    }
  },

  async unsubscribe({ state, commit }) {
    commit('setFormBusy', { form: 'unsubscribe', status: true })
    try {
      await this.$axios.post('user/unsubscribe')
      state.subscriptionDetails.subscription_details.canceled_at = new Date()
      state.subscriptionDetails.subscription_details.cancel_at =
        state.subscriptionDetails.subscription_details.next_payment_date
    } catch (error) {
      commit('setFormErrors', { form: 'unsubscribe', response: error })
    } finally {
      commit('setFormBusy', { form: 'unsubscribe', status: false })
    }
  }
}
