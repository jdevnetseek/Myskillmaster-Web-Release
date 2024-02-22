import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import PasswordField from '@/components/fields/PasswordField.vue'

let vuetify, localVue

function getMountedComponent (placeholder = null) {
  localVue = createLocalVue()
  localVue.use(Vuetify)
  vuetify = new Vuetify()

  const App = localVue.component('App', {
    components: { PasswordField },
    data () {
      return {
        password: 'password',
        placeholder
      }
    },
    template: `
      <div id="app">
        <PasswordField v-model="password" :placeholder="placeholder" />
      </div>
    `
  })

  const parent = mount(App, { localVue, vuetify })
  return { parent, wrapper: parent.getComponent(PasswordField) }
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
  test('should show/hide password on eye icon toggle', async (done) => {
    const { wrapper } = getMountedComponent()
    const input = wrapper.find('input')

    expect(input.attributes('type')).toBe('password')
    wrapper.vm.toggle()
    await wrapper.vm.$nextTick()
    expect(input.attributes('type')).toBe('text')

    done()
  })

  test('should match proper placeholder', (done) => {
    const placeholder = 'This is a sample placeholder'
    const { wrapper } = getMountedComponent(placeholder)
    const input = wrapper.find('input')

    expect(input.attributes('placeholder')).toBe(placeholder)

    done()
  })
})

describe('Behaviors', () => {
  test('check if changes to the input reflects to the v-model variable', (done) => {
    const { parent } = getMountedComponent()

    const value = 'password123'
    const input = parent.find('input')
    input.element.value = value
    input.trigger('input')
    expect(parent.vm.password).toBe(value)

    done()
  })
})
