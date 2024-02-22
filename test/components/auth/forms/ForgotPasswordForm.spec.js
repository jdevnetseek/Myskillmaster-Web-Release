import {
  mount,
  createLocalVue
  // RouterLinkStub
} from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Axios from '@/test/utils/axios'
import Router from '@/test/utils/router'
import * as UserStore from '@/store/user'
import * as SnackbarStore from '@/store/snackbar'
import ForgotPasswordForm from '@/components/auth/forms/ForgotPasswordForm.vue'

/**
 * Mock component methods & API calls
 * ==================================================================================
 */

const axios = Axios()
const router = Router()

/**
 * Functions
 * ==================================================================================
 */

let localVue, vuetify
function getMountedComponent(
  forgotPassword = {
    email: 'john.doe@test.com',
    token: '1234',
    password: 'password'
  }
) {
  localVue = createLocalVue()
  localVue.use(Vuex)
  vuetify = new Vuetify()

  const store = new Vuex.Store({
    modules: {
      user: {
        namespaced: true,
        ...UserStore
      },
      snackbar: {
        namespaced: true,
        ...SnackbarStore
      }
    }
  })
  store.$axios = axios
  /* Manually add in the nuxtjs/auth global variable */
  store.$auth = {
    loginWith: jest.fn()
  }

  const wrapper = mount(ForgotPasswordForm, {
    store,
    localVue,
    vuetify,
    stubs: {
      // NuxtLink: RouterLinkStub,
      ResendForgotPasswordCode: true
    },
    mocks: {
      $router: router
    }
  })

  wrapper.vm.form.email = forgotPassword.email
  wrapper.vm.form.token = forgotPassword.token
  wrapper.vm.form.password = forgotPassword.password
  wrapper.vm.form.password_confirmation = forgotPassword.password

  return wrapper
}

/**
 * Tests
 * ==================================================================================
 */

beforeEach(() => {
  axios.mockClear()
})

describe('Properties', () => {
  test('should have validation object', async(done) => {
    const wrapper = getMountedComponent()
    expect(wrapper.vm.$v).toBeDefined()

    done()
  })
})

describe('UI/UX', () => {
  test('check if fields exists', async() => {
    const wrapper = getMountedComponent()
    const testField = (payload) => {
      expect(wrapper.findComponent(payload).exists()).toBeTruthy()
    }

    testField({ name: 'v-text-field', placeholder: 'Email' })
    wrapper.vm.nextStep()
    await wrapper.vm.$nextTick()
    testField({ name: 'v-text-field', placeholder: 'Token' })
    testField({ name: 'v-text-field', placeholder: 'Enter new password' })
    testField({ name: 'v-text-field', placeholder: 'Confirm password' })
  })

  test('check if next steps are correct and working', (done) => {
    const wrapper = getMountedComponent()

    expect(wrapper.vm.onEmail).toBeTruthy()
    wrapper.vm.nextStep()
    expect(wrapper.vm.onReset).toBeTruthy()

    done()
  })
})

describe('Behaviors', () => {
  test('should call submit on btn click', (done) => {
    const wrapper = getMountedComponent()
    const spy = jest.spyOn(wrapper.vm, 'submit')

    wrapper.find('.forgot-password-form__actions__submit').trigger('click')
    expect(spy).toHaveBeenCalled()
    wrapper.find('.forgot-password-form__actions__submit').trigger('click')
    expect(spy).toHaveBeenCalledTimes(2)

    done()
  })
})

describe('Actions', () => {
  test('check if payload is complete', async() => {
    const wrapper = getMountedComponent()

    await wrapper.vm.submit()
    expect(axios.post).toHaveBeenCalled()
    const formCheck = axios.post.mock.calls[0][1]
    expect(formCheck.hasOwnProperty('email')).toBeTruthy()

    await wrapper.vm.nextStep()

    axios.post.mockClear()
    await wrapper.vm.submit()
    expect(axios.post).toHaveBeenCalled()
    const formVerify = axios.post.mock.calls[0][1]
    expect(formVerify.hasOwnProperty('email')).toBeTruthy()
    expect(formVerify.hasOwnProperty('token')).toBeTruthy()
    expect(formVerify.hasOwnProperty('password')).toBeTruthy()
  })

  test('check if sending to correct API call', async() => {
    const wrapper = getMountedComponent()

    await wrapper.vm.submit()
    expect(axios.post).toHaveBeenCalled()
    expect(axios.post.mock.calls[0][0]).toBe('auth/forgot-password')

    await wrapper.vm.nextStep()

    axios.mockClear()
    await wrapper.vm.submit()
    expect(axios.post).toHaveBeenCalled()
    expect(axios.post.mock.calls[0][0]).toBe('auth/reset-password')
  })
})
