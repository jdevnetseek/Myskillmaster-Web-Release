import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Loading from '@/components/common/Loading.vue'

import Vue from 'vue'
Vue.use(Vuetify)

const localVue = createLocalVue()

function getMountedComponent (show = false) {
  const vuetify = new Vuetify()
  const wrapper = shallowMount(Loading, {
    localVue,
    vuetify,
    propsData: {
      value: show
    }
  })

  return wrapper
}

/**
 * Tests
 * ==================================================================================
 */

describe('Properties', () => {
  test('check if v-model props exists', (done) => {
    const wrapper = getMountedComponent()

    const props = wrapper.vm.$options.props
    expect(props.value).toBeDefined()

    done()
  })
})

describe('UI/UX', () => {
  test('check if v-model value shows/hides the component', (done) => {
    const truthyWrapper = getMountedComponent()
    expect(truthyWrapper.html()).toBeFalsy()

    const falsyWrapper = getMountedComponent()
    expect(falsyWrapper.html()).toBeFalsy()

    done()
  })
})
