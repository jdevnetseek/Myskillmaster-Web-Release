import { mount, createLocalVue } from '@vue/test-utils'
import TokenField from '@/components/fields/TokenField.vue'

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
function getMountedComponent(fields = 4) {
  localVue = createLocalVue()

  const App = localVue.component('App', {
    components: { TokenField },
    data() {
      return {
        token: '0000',
        fields
      }
    },
    template: `
      <div id="app">
        <TokenField v-model="token" :fields="fields" />
      </div>
    `
  })

  const parent = mount(App, { localVue })
  return { parent, wrapper: parent.getComponent(TokenField) }
}

/**
 * Tests
 * ==================================================================================
 */

describe('Properties', () => {
  test('check if v-model props exists', (done) => {
    const { wrapper } = getMountedComponent()

    const props = wrapper.vm.$options.props
    expect(props.value).toBeDefined()

    done()
  })
})

describe('UI/UX', () => {
  test('should display correct no. of field depending on field props', (done) => {
    const noOfFields = 3
    const { wrapper } = getMountedComponent(noOfFields)

    expect(wrapper.findAllComponents({ name: 'v-text-field' }).length).toBe(
      noOfFields
    )

    done()
  })
})
