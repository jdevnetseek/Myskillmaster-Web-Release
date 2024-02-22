import { shallowMount, createLocalVue } from '@vue/test-utils'
import SigninFooter from '@/components/auth/fields/SigninFooter.vue'
import AuthFooter from '@/components/auth/fields/AuthFooter'

/**
 * Mock component methods & API calls
 * ==================================================================================
 */

//

/**
 * Functions
 * ==================================================================================
 */

let localVue
function getMountedComponent(data = {}) {
  const { label = 'Label', buttonLabel = 'Button', to = 'index' } = data
  localVue = createLocalVue()

  const wrapper = shallowMount(SigninFooter, {
    localVue,
    propsData: {
      label,
      buttonLabel,
      to
    }
  })

  return wrapper
}

/**
 * Tests
 * ==================================================================================
 */

describe('Properties', () => {
  test('check if optional props exists', (done) => {
    const wrapper = getMountedComponent()
    const test = (prop) => {
      expect(prop).toBeDefined()
      expect(prop.default).toBeTruthy()
    }

    const props = wrapper.vm.$options.props
    test(props.label)
    test(props.buttonLabel)
    test(props.to)

    done()
  })
})

describe('UI/UX', () => {
  test('check if Auth Footer component exist', (done) => {
    const label = 'This is my label'
    const buttonLabel = 'This is my button label'
    const to = 'home'
    const wrapper = getMountedComponent({
      label,
      buttonLabel,
      to
    })

    expect(wrapper.findComponent(AuthFooter).exists()).toBeTruthy()
    expect(wrapper.attributes('label')).toBe(label)
    expect(wrapper.attributes('buttonlabel')).toBe(buttonLabel)
    expect(wrapper.attributes('to')).toBe(to)

    done()
  })
})
