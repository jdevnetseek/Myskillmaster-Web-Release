import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import SelectCountry from '@/components/fields/SelectCountry.vue'
import COUNTRIES from '@/utils/enums/Countries'

/**
 * Mock component methods & API calls
 * ==================================================================================
 */

//

/**
 * Functions
 * ==================================================================================
 */

let vuetify, localVue
function getMountedComponent(placeholder = null) {
  localVue = createLocalVue()
  localVue.use(Vuetify)
  vuetify = new Vuetify()

  const App = localVue.component('App', {
    components: { SelectCountry },
    data() {
      return {
        country: null,
        placeholder
      }
    },
    template: `
      <div id="app">
        <SelectCountry v-model="country" :placeholder="placeholder" />
      </div>
    `
  })

  const parent = mount(App, { localVue, vuetify })
  return { parent, wrapper: parent.findComponent(SelectCountry) }
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

  test('check if optional props exists', (done) => {
    const { wrapper } = getMountedComponent()

    const props = wrapper.vm.$options.props
    expect(props.placeholder).toBeDefined()
    expect(props.loading).toBeDefined()
    expect(props.disabled).toBeDefined()
    expect(props.valueColumn).toBeDefined()
    expect(props.textColumn).toBeDefined()

    done()
  })
})

describe('UI/UX', () => {
  test('should match proper placeholder', (done) => {
    const placeholder = 'This is a sample placeholder'
    const { wrapper } = getMountedComponent(placeholder)
    const input = wrapper.find('input')

    expect(input.attributes('placeholder')).toBe(placeholder)

    done()
  })

  test('should have all the countries as option', (done) => {
    const { wrapper } = getMountedComponent()
    expect(wrapper.vm.validItems).toStrictEqual(COUNTRIES)

    done()
  })
})

describe('Behaviors', () => {
  test('check if changes to the input reflects to the v-model variable', (done) => {
    const { parent } = getMountedComponent()

    const value =
      COUNTRIES[Math.floor(Math.random() * (COUNTRIES.length - 1 - 0 + 1) + 0)]
        .name
    const input = parent.find('input')
    input.element.value = value
    input.trigger('input')
    expect(parent.vm.country).toBe(value)

    done()
  })
})
