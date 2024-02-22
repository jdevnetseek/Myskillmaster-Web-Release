import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Axios from '@/test/utils/axios'
import Router from '@/test/utils/router'
import * as UserStore from '@/store/user'
import SignupForm from '@/components/auth/forms/SignupForm.vue'

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
function getMountedComponent(data = {}) {
  const {
    step = 1,
    email = 'john.doe@test.com',
    username = 'john.doe',
    password = 'password'
  } = data

  localVue = createLocalVue()
  localVue.use(Vuex)
  vuetify = new Vuetify()

  const store = new Vuex.Store({
    state: {
      auth: {
        loggedIn: false
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
  store.$auth = {
    loginWith: jest.fn()
  }

  const wrapper = mount(SignupForm, {
    store,
    localVue,
    vuetify,
    propsData: {
      currentStep: step
    },
    stubs: {
      NuxtLink: RouterLinkStub
    },
    mocks: {
      $router: router
    }
  })

  wrapper.vm.form.email = email
  wrapper.vm.form.username = username
  wrapper.vm.form.password = password
  wrapper.vm.form.password_confirmation = password

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
  test('check if required props exists', (done) => {
    const wrapper = getMountedComponent()

    const props = wrapper.vm.$options.props
    expect(props.currentStep).toBeDefined()
    expect(props.currentStep.required).toBeTruthy()

    done()
  })

  test('should have validation object', async(done) => {
    const wrapper = getMountedComponent()
    expect(wrapper.vm.$v).toBeDefined()

    done()
  })
})

describe('UI/UX', () => {
  test('check if fields exists', async(done) => {
    const wrapper = getMountedComponent()
    const changeStep = async(step) => {
      wrapper.setProps({
        currentStep: step
      })
      await wrapper.vm.$nextTick()
    }
    const exist = (component) => {
      expect(wrapper.findComponent(component).exists()).toBeTruthy()
    }

    exist({ name: 'v-text-field', placeholder: 'Enter your email' })
    await changeStep(2)
    exist({ name: 'v-text-field', placeholder: 'Enter your username' })
    exist({ name: 'v-text-field', placeholder: 'Password' })
    exist({ name: 'v-text-field', placeholder: 'Confirm password' })

    done()
  })
})

describe('Behaviors', () => {
  test('should call submit on btn click', (done) => {
    const wrapper = getMountedComponent()
    const spy = jest.spyOn(wrapper.vm, 'submit')

    const button = wrapper.find('.signup-form__actions__submit')
    button.trigger('click')
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
})

describe('Actions', () => {
  test('check if validation is correct', (done) => {
    const falsyWrapper = getMountedComponent({ step: 2, email: null })
    const falsySpy = jest.spyOn(falsyWrapper.vm.$store.$auth, 'loginWith')
    falsyWrapper.vm.submit()
    expect(falsySpy).not.toHaveBeenCalled()

    const truthyWrapper = getMountedComponent({ step: 2 })
    const truthySpy = jest.spyOn(truthyWrapper.vm.$store.$auth, 'loginWith')
    truthyWrapper.vm.submit()
    expect(truthySpy).toHaveBeenCalled()

    done()
  })

  test('check if payload is complete', async(done) => {
    const wrapper = getMountedComponent()
    const spy = jest.spyOn(wrapper.vm.$store.$auth, 'loginWith')
    const changeStep = async(step) => {
      wrapper.setProps({
        currentStep: step
      })
      await wrapper.vm.$nextTick()
    }

    wrapper.vm.submit()
    expect(axios.post).toHaveBeenCalled()
    const emailForm = axios.post.mock.calls[0][1]
    expect(emailForm.hasOwnProperty('email')).toBeTruthy()

    await changeStep(2)
    wrapper.vm.submit()
    expect(spy).toHaveBeenCalled()
    const signupForm = spy.mock.calls[0][1].data
    expect(signupForm.hasOwnProperty('email')).toBeTruthy()
    expect(signupForm.hasOwnProperty('username')).toBeTruthy()
    expect(signupForm.hasOwnProperty('password')).toBeTruthy()
    expect(signupForm.hasOwnProperty('password_confirmation')).toBeTruthy()

    done()
  })

  test('check if sending to correct nuxtjs/auth strategy (local2)', (done) => {
    const wrapper = getMountedComponent({ step: 2 })
    const spy = jest.spyOn(wrapper.vm.$store.$auth, 'loginWith')

    wrapper.vm.submit()
    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toBe('local2')

    done()
  })
})
