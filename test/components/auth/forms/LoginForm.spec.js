import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import * as UserStore from '@/store/user'
import LoginForm from '@/components/auth/forms/LoginForm.vue'

/**
 * Mock component methods & API calls
 * ==================================================================================
 */

//

/**
 * Functions
 * ==================================================================================
 */

let localVue, vuetify
function getMountedComponent(
  login = {
    email: 'john.doe@test.com',
    password: 'password'
  },
  isLoggedIn = false
) {
  localVue = createLocalVue()
  localVue.use(Vuex)
  vuetify = new Vuetify()

  const store = new Vuex.Store({
    state: {
      auth: {
        loggedIn: isLoggedIn
      }
    },
    modules: {
      user: {
        namespaced: true,
        ...UserStore
      }
    }
  })
  /* Manually add in the nuxtjs/auth global variable */
  store.$auth = {
    loginWith: jest.fn()
  }

  const wrapper = mount(LoginForm, {
    store,
    localVue,
    vuetify,
    stubs: {
      NuxtLink: RouterLinkStub
    }
  })

  wrapper.vm.form.email = login.email
  wrapper.vm.form.password = login.password

  return wrapper
}

/**
 * Tests
 * ==================================================================================
 */

describe('Properties', () => {
  test('should have validation object', async(done) => {
    const wrapper = getMountedComponent()
    expect(wrapper.vm.$v).toBeDefined()

    done()
  })
})

describe('UI/UX', () => {
  test('check if fields exists', (done) => {
    const wrapper = getMountedComponent()

    expect(
      wrapper
        .findComponent({
          name: 'v-text-field',
          placeholder: 'Enter your email'
        })
        .exists()
    ).toBeTruthy()
    expect(
      wrapper
        .findComponent({
          name: 'v-text-field',
          placeholder: 'Enter your password'
        })
        .exists()
    ).toBeTruthy()

    done()
  })
})

describe('Behaviors', () => {
  test('should call submit on btn click', (done) => {
    const wrapper = getMountedComponent()
    const spy = jest.spyOn(wrapper.vm, 'submit')

    const button = wrapper.find('.login-form__actions__submit')
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
    const falsyWrapper = getMountedComponent({})
    const falsySpy = jest.spyOn(falsyWrapper.vm.$store.$auth, 'loginWith')
    falsyWrapper.vm.submit()
    expect(falsySpy).not.toHaveBeenCalled()

    const truthyWrapper = getMountedComponent()
    const truthySpy = jest.spyOn(truthyWrapper.vm.$store.$auth, 'loginWith')
    truthyWrapper.vm.submit()
    expect(truthySpy).toHaveBeenCalled()

    done()
  })

  test('check if payload is complete', (done) => {
    const wrapper = getMountedComponent()
    const spy = jest.spyOn(wrapper.vm.$store.$auth, 'loginWith')

    wrapper.vm.submit()
    expect(spy.mock.calls[0]).toBeTruthy()
    const form = spy.mock.calls[0][1].data
    expect(form.hasOwnProperty('email')).toBeTruthy()
    expect(form.hasOwnProperty('password')).toBeTruthy()

    done()
  })

  test('check if sending to correct nuxtjs/auth strategy (local)', (done) => {
    const wrapper = getMountedComponent()
    const spy = jest.spyOn(wrapper.vm.$store.$auth, 'loginWith')

    wrapper.vm.submit()
    expect(spy.mock.calls[0]).toBeTruthy()
    expect(spy.mock.calls[0][0]).toBe('local')

    done()
  })
})
