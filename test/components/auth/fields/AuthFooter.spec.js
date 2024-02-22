import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Router from '@/test/utils/router'
import AuthFooter from '@/components/auth/fields/AuthFooter.vue'

/**
 * Mock component methods & API calls
 * ==================================================================================
 */

const router = Router()

/**
 * Functions
 * ==================================================================================
 */

let localVue
function getMountedComponent(data = {}) {
  const { label = 'Label', buttonLabel = 'Button', to = 'index' } = data
  localVue = createLocalVue()

  const wrapper = shallowMount(AuthFooter, {
    localVue,
    propsData: {
      label,
      buttonLabel,
      to
    },
    stubs: {
      NuxtLink: RouterLinkStub
    },
    mocks: {
      $router: router
    }
  })

  return wrapper
}

/**
 * Tests
 * ==================================================================================
 */

beforeEach(() => {
  router.mockClear()
})

describe('Properties', () => {
  test('check if required props exists', (done) => {
    const wrapper = getMountedComponent()
    const test = (prop) => {
      expect(prop).toBeDefined()
      expect(prop.required).toBeTruthy()
    }

    const props = wrapper.vm.$options.props
    test(props.label)
    test(props.buttonLabel)
    test(props.to)

    done()
  })
})

describe('UI/UX', () => {
  test('check if button/link exist', (done) => {
    const wrapper = getMountedComponent()

    expect(wrapper.find('a').exists()).toBeTruthy()

    done()
  })

  test('check if correct labels', async(done) => {
    const label = 'This is my label'
    const buttonLabel = 'This is my button label'
    const wrapper = getMountedComponent({
      label,
      buttonLabel: ''
    })

    expect(wrapper.find('p').text()).toBe(label)
    await wrapper.setProps({
      buttonLabel
    })
    expect(wrapper.find('a').text()).toBe(buttonLabel)

    done()
  })

  test('check if correct redirect link', (done) => {
    const routeName = 'home'
    const wrapper = getMountedComponent({
      to: routeName
    })

    expect(wrapper.find('a').props('to')).toStrictEqual({ name: routeName })

    done()
  })
})
