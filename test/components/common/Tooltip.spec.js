import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Tooltip from '@/components/common/Tooltip.vue'

import Vue from 'vue'
Vue.use(Vuetify)

const localVue = createLocalVue()

function getMountedComponent(icon = null) {
  const vuetify = new Vuetify()
  const wrapper = mount(Tooltip, {
    localVue,
    vuetify,
    propsData: {
      icon
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

    const props = wrapper.vm.$options.props
    expect(props.icon).toBeDefined()
    expect(props.disabled).toBeDefined()

    done()
  })
})

describe('UI/UX', () => {
  test('check if tooltip component exists', (done) => {
    const wrapper = getMountedComponent()
    expect(wrapper.findComponent({ name: 'v-tooltip' })).toBeTruthy()

    done()
  })

  test('check if displaying icon base on props', (done) => {
    const icon = 'sample-icon'
    const wrapper = getMountedComponent(icon)

    expect(
      wrapper.findComponent({ name: 'v-icon' }).classes().includes(icon)
    ).toBeTruthy()

    done()
  })
})
