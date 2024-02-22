import { shallowMount, createLocalVue } from '@vue/test-utils'
import TableImage from '@/components/common/TableImage.vue'

/**
 * Mock component methods & API calls
 * ==================================================================================
 */

//

/**
 * Functions
 * ==================================================================================
 */

function getMountedComponent(data = {}) {
  const {
    image = 'http://sample-image.com',
    size = 36,
    bg = '#ffffff',
    isRound = false
  } = data
  const localVue = createLocalVue()
  const wrapper = shallowMount(TableImage, {
    localVue,
    propsData: {
      image,
      size,
      bg,
      isRound
    }
  })

  return wrapper
}

/**
 * Tests
 * ==================================================================================
 */

describe('Properties', () => {
  test('check if image props exists', (done) => {
    const wrapper = getMountedComponent()

    const props = wrapper.vm.$options.props
    expect(props.image).toBeDefined()

    done()
  })

  test('check if optional props exists', (done) => {
    const wrapper = getMountedComponent()

    const props = wrapper.vm.$options.props
    expect(props.size).toBeDefined()
    expect(props.bg).toBeDefined()
    expect(props.isRound).toBeDefined()

    done()
  })
})

describe('UI/UX', () => {
  test('check if displaying correct image src', async(done) => {
    const urlString = 'https://image.com/sample-image.png'
    const urlThumbString = 'https://image.com/sample-thumb-image.png'
    const wrapper = getMountedComponent()

    const test = async(image, url) => {
      wrapper.setProps({
        image
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.findComponent({ name: 'v-img' }).props('src')).toBe(url)
    }

    await test({ url: urlString }, urlString)
    await test({ thumb_url: urlThumbString }, urlThumbString)

    done()
  })
})
