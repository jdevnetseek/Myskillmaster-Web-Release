import { shallowMount, createLocalVue } from '@vue/test-utils'
import TableRowLoader from '@/components/common/TableRowLoader.vue'

/**
 * Mock component methods & API calls
 * ==================================================================================
 */

//

/**
 * Functions
 * ==================================================================================
 */

function getMountedComponent(col = 5) {
  const localVue = createLocalVue()
  const wrapper = shallowMount(TableRowLoader, {
    localVue,
    propsData: {
      col
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
    expect(props.col).toBeDefined()

    done()
  })
})

describe('UI/UX', () => {
  test('check if displaying correct no. of loader', (done) => {
    const noOfLoader = 10
    const wrapper = getMountedComponent(noOfLoader)

    expect(
      wrapper.findAllComponents({ name: 'v-skeleton-loader' }).length
    ).toBe(noOfLoader)

    done()
  })
})
