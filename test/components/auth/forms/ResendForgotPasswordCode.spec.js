import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Axios from '@/test/utils/axios'
import * as UserStore from '@/store/user'
import ResendForgotPasswordCode from '@/components/auth/forms/ResendForgotPasswordCode.vue'

/**
 * Mock component methods & API calls
 * ==================================================================================
 */

const axios = Axios()

const userObj = {
  id: 1,
  email: 'sample.email@example.com',
  onboarded_at: new Date()
}
const $auth = {
  loginWith: jest.fn(),
  user: userObj
}

/**
 * Functions
 * ==================================================================================
 */

let localVue
function getMountedComponent() {
  localVue = createLocalVue()
  localVue.use(Vuex)

  const store = new Vuex.Store({
    state: {
      auth: {
        loggedIn: true,
        user: userObj
      }
    },
    modules: {
      user: {
        namespaced: true,
        ...UserStore
      }
    }
  })
  store.$axios = axios
  /* Manually add in the nuxtjs/auth global variable */
  store.$auth = $auth

  const wrapper = shallowMount(ResendForgotPasswordCode, {
    store,
    localVue,
    mocks: { $auth },
    propsData: {
      email: userObj.email
    }
  })

  return wrapper
}

/**
 * Tests
 * ==================================================================================
 */

beforeEach(() => {
  axios.mockClear()
})

describe('UI/UX', () => {
  test('check if resend button exists', async(done) => {
    const wrapper = getMountedComponent()
    expect(wrapper.find('a').exists()).toBeTruthy()

    done()
  })
})

describe('Behaviors', () => {
  test('should call submit on link click', (done) => {
    const wrapper = getMountedComponent()
    const spy = jest.spyOn(wrapper.vm, 'submit')

    wrapper.find('.resend-forgot-password-code a').trigger('click')
    expect(spy).toHaveBeenCalled()

    done()
  })

  test('should clear all errors before submit call', (done) => {
    const wrapper = getMountedComponent({})

    wrapper.vm.form.$errorMessage = 'Sample error'
    wrapper.vm.form.$errors = {
      email: ['Sample error']
    }
    expect(wrapper.vm.form.$hasErrors()).toBeTruthy()
    wrapper.vm.submit()
    expect(wrapper.vm.form.$hasErrors()).toBeFalsy()

    done()
  })

  test('should start timer after successful submit call', async(done) => {
    const wrapper = getMountedComponent()
    const spy = jest.spyOn(wrapper.vm.$store, 'commit')

    await wrapper.vm.submit()
    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[1][0]).toBe('user/startForgotPasswordCodeTimer')

    done()
  })

  test('should start timer after VUEX state trigger has been changed', async(done) => {
    const wrapper = getMountedComponent()
    const spy = jest.spyOn(wrapper.vm, 'startTimer')

    wrapper.vm.$store.state.user.forgotPasswordCodeTimer = 'Trigger me'
    await wrapper.vm.$nextTick()
    expect(spy).toHaveBeenCalled()

    done()
  })
})

describe('Actions', () => {
  test('check if sending to correct API call', async(done) => {
    const wrapper = getMountedComponent()

    await wrapper.vm.submit()
    expect(axios.post).toHaveBeenCalled()
    expect(axios.post.mock.calls[0][0]).toBe('auth/forgot-password')

    done()
  })
})
