import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import ErrorMessage from '@/components/fields/ErrorMessage.vue'

let localVue = null
let vuetify = null

function getMountedComponent (error = null, display = 'sentence', sign = '*') {
  const wrapper = shallowMount(ErrorMessage, {
    localVue,
    vuetify,
    propsData: {
      display,
      error,
      sign
    }
  })
  return wrapper
}

function withWrapperArray (wrapperArray) {
  return {
    hasText: str => wrapperArray.filter(i => i.text().match(str))
  }
}

beforeEach(() => {
  localVue = createLocalVue()
  vuetify = new Vuetify()
})

/**
 * Tests
 * ==================================================================================
 */

const DISPLAYS = ['sentence', 'single', 'list']

describe('Properties', () => {
  test('check if `error` only allows correct type', (done) => {
    const wrapper = getMountedComponent()
    const props = wrapper.vm.$options.props.error

    expect(props.type).toEqual([String, Array, Object])

    done()
  })

  test('check if `sign` exist', (done) => {
    const wrapper = getMountedComponent()
    const props = wrapper.vm.$options.props.sign

    expect(props.type).toEqual(String)
    expect(props.default).toBeDefined()

    done()
  })

  test('check if `display` only allows correct options', (done) => {
    const wrapper = getMountedComponent()
    const props = wrapper.vm.$options.props.display

    expect(props.type).toBe(String)
    expect(props.default).toBeDefined()

    for (let i = 0; i < DISPLAYS.length; i++) {
      expect(props.validator && props.validator(DISPLAYS[i])).toBeTruthy()
    }

    done()
  })
})

describe('UI/UX', () => {
  let sign = '*'
  const ERROR_IN_STR = 'This is an error message'
  const ERROR_IN_ARR = [ERROR_IN_STR, ERROR_IN_STR, ERROR_IN_STR]

  test('should display correct message depending on display option', (done) => {
    for (var i = 0; i < DISPLAYS.length; i++) {
      const wrapper = getMountedComponent(ERROR_IN_STR, DISPLAYS[i], sign)
      expect(wrapper.text()).toBe(sign + ERROR_IN_STR)
    }

    for (var i = 0; i < DISPLAYS.length; i++) {
      const wrapper = getMountedComponent(
        ERROR_IN_ARR,
        DISPLAYS[i],
        (sign = '')
      )
      switch (DISPLAYS[i]) {
        case 'list':
          withWrapperArray(wrapper.findAll('li')).hasText(ERROR_IN_STR)
          break
        case 'sentence':
          expect(wrapper.text()).toBe(
            `${ERROR_IN_STR}, ${ERROR_IN_STR} and ${ERROR_IN_STR}`
          )
          break
        case 'single':
          expect(wrapper.text()).toBe(ERROR_IN_ARR[0])
          break
      }
    }

    done()
  })
})
