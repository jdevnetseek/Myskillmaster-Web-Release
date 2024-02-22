import {
  rawLoginForm,
  rawLogoutForm,
  rawSignupForm,
  rawForgotPasswordForm,
  rawVerifyForm,
  rawProfilePhotoForm,
  rawAccountProfileForm,
  rawChangePasswordForm
} from '@/utils/rawStates'
import State from '@/utils/rawStates/State'
import SETTINGS from '@/utils/enums/Settings'
import Cookies from 'js-cookie'
import { getErrorResponse } from '@/utils/Helpers'

export const state = () => ({
  login: rawLoginForm(),
  logout: rawLogoutForm(),
  signup: rawSignupForm(),

  forgotPassword: rawForgotPasswordForm(),
  forgotPasswordCode: State({}),
  forgotPasswordCodeTimer: null,

  verify: rawVerifyForm(),
  verifyCode: State({}),
  verifyCodeTimer: null,

  profilePhoto: rawProfilePhotoForm(),
  accountProfile: rawAccountProfileForm(),
  changePassword: rawChangePasswordForm(),

  onboarding: State({})
})

export const getters = {
  getUser(state, getters, rootState) {
    return rootState.auth.user
  },

  getUserId(state, getters, rootState) {
    return rootState.auth.user ? rootState.auth.user.id : null
  },

  getUserName(state, getters) {
    return getters.isLoggedIn
      ? `${getters.getUser.first_name} ${getters.getUser.last_name}`
      : null
  },

  isVerified(state, getters) {
    return getters.isLoggedIn ? !!getters.getUser.verified : false
  },

  isOnboarded(state, getters) {
    return getters.isLoggedIn ? !!getters.getUser.onboarded_at : false
  },

  isLoggedIn(state, getters, rootState) {
    return rootState.auth.loggedIn
  },

  hasMasterProfile(state, getters) {
    return getters.isLoggedIn ? !!getters.getUser.has_master_profile : false
  }
}

export const mutations = {
  clearGoogleToken(state) {
    if (
      window.gapi &&
      window.gapi.auth2 &&
      window.gapi.auth2.getAuthInstance()
    ) {
      window.gapi.auth2.getAuthInstance().disconnect()
    }
  },

  setRememberMe(state, payload = 7) {
    this.$auth.$storage.setCookie('remember_expires', payload, {
      expires: payload
    })
  },

  removeRememberMe() {
    this.$auth.$storage.removeCookie('remember_expires')
  },

  startForgotPasswordCodeTimer(state) {
    state.forgotPasswordCodeTimer = Cookies.set(
      SETTINGS.cookie.forgotPasswordCode,
      new Date()
    )
  },

  resetForgotPasswordCodeTimer(state) {
    Cookies.remove(SETTINGS.cookie.forgotPasswordCode)
    state.forgotPasswordCodeTimer = null
  },

  startVerifyCodeTimer(state) {
    state.verifyCodeTimer = Cookies.set(SETTINGS.cookie.verifyCode, new Date())
  },

  resetVerifyCodeTimer(state) {
    Cookies.remove(SETTINGS.cookie.verifyCode)
    state.verifyCodeTimer = null
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
  /**
   * Authentications
   * ==================================================================================
   **/
  async login({ commit, getters, rootGetters }, payload) {
    commit('setFormBusy', { form: 'login', status: true })
    try {
      await this.$auth
        .loginWith('local', {
          data: payload
        })
        .then(() => {
          if (payload.remember_me) {
            commit('setRememberMe')
          } else {
            commit('removeRememberMe')
          }

          const routeName = 'index'
          this.$router.replace({ name: routeName })
        })
    } catch (error) {
      commit('setFormErrors', { form: 'login', response: error })
    }
    commit('setFormBusy', { form: 'login', status: false })
  },

  async logout({ commit }) {
    commit('setFormBusy', { form: 'logout', status: true })
    try {
      await this.$auth.logout()
      commit('removeRememberMe')
      commit('clearGoogleToken')
      this.$router.replace({ name: 'index' })
    } catch (error) {
      commit('setFormErrors', { form: 'logout', response: error })
    }
    commit('setFormBusy', { form: 'logout', status: false })
  },

  async checkEmail({ commit }, payload) {
    let result = null
    commit('setFormBusy', { form: 'signup', status: true })
    try {
      const { data } = await this.$axios.post(
        'auth/check-email-availability',
        payload
      )
      result = data.data
    } catch (error) {
      commit('setFormErrors', { form: 'signup', response: error })
    }
    commit('setFormBusy', { form: 'signup', status: false })
    return result
  },

  async signup({ commit }, payload) {
    commit('setFormBusy', { form: 'signup', status: true })
    try {
      await this.$auth.loginWith('local2', {
        data: payload
      })
      commit('removeRememberMe')
      this.$router.push({ name: 'verify' })
    } catch (error) {
      commit('setFormErrors', { form: 'signup', response: error })
    }
    commit('setFormBusy', { form: 'signup', status: false })
  },

  async forgotPasswordCode({ state, commit }, payload = {}) {
    commit('setFormBusy', { form: 'forgotPassword', status: true })

    try {
      await this.$axios.post('auth/forgot-password', payload)
      commit('startForgotPasswordCodeTimer')
    } catch (error) {
      commit('setFormErrors', { form: 'forgotPassword', response: error })
    }

    commit('setFormBusy', { form: 'forgotPassword', status: false })
  },

  async forgotPasswordChange({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'forgotPassword', status: true })

    try {
      await this.$axios.post('auth/reset-password', payload)
    } catch (error) {
      commit('setFormErrors', { form: 'forgotPassword', response: error })
    }

    commit('setFormBusy', { form: 'forgotPassword', status: false })
  },

  /**
   * Verification
   * ==================================================================================
   **/
  async resendVerificationToken({ commit }) {
    commit('setFormBusy', { form: 'verify', status: true })

    try {
      await this.$axios.post('auth/verification/resend', {
        via: 'email'
      })
      commit('startVerifyCodeTimer')
    } catch (error) {
      commit('setFormErrors', { form: 'verify', response: error })
    }

    commit('setFormBusy', { form: 'verify', status: false })
  },

  async verifyEmail({ commit, getters }, payload) {
    commit('setFormBusy', { form: 'verify', status: true })

    try {
      const formData = {
        ...payload,
        via: 'email'
      }
      await this.$axios.post('auth/verification/verify', formData)
      getters.getUser.verified = true
    } catch (error) {
      commit('setFormErrors', { form: 'verify', response: error })
    }

    commit('setFormBusy', { form: 'verify', status: false })
  },

  /**
   * User
   * ==================================================================================
   **/
  async updateProfile({ commit, rootState }, payload = {}) {
    commit('setFormBusy', { form: 'accountProfile', status: true })

    try {
      const { data } = await this.$axios.put('auth/profile', payload)
      rootState.auth.user = data.data
    } catch (error) {
      commit('setFormErrors', { form: 'accountProfile', response: error })
    }

    commit('setFormBusy', { form: 'accountProfile', status: false })
  },

  async changePassword({ commit }, payload = {}) {
    commit('setFormBusy', { form: 'changePassword', status: true })
    try {
      await this.$axios.post('auth/change/password', payload)
    } catch (error) {
      commit('setFormErrors', { form: 'changePassword', response: error })
    }

    commit('setFormBusy', { form: 'changePassword', status: false })
  },

  async uploadPhoto({ commit, rootState }, payload) {
    commit('setFormBusy', { form: 'profilePhoto', status: true })
    try {
      const { data } = await this.$axios.post('auth/profile/avatar', payload)
      rootState.auth.user.avatar = data.data
    } catch (error) {
      commit('setFormErrors', { form: 'profilePhoto', response: error })
    }

    commit('setFormBusy', { form: 'profilePhoto', status: false })
  },

  async onboard({ commit, rootState }, payload = {}) {
    commit('setFormBusy', { form: 'onboarding', status: true })
    try {
      await this.$axios.post('auth/onboarding/complete', payload)
      rootState.auth.user.onboarded_at = new Date()
    } catch (error) {
      commit('setFormErrors', { form: 'onboarding', response: error })
    }

    commit('setFormBusy', { form: 'onboarding', status: false })
  }
}
