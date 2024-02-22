import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import * as SnackbarStore from '@/store/snackbar'
import Snackbar from '@/components/global/Snackbar.vue'
import SnackbarMixin from '@/utils/mixins/Snackbar.js'

/**
 * Functions
 * ==================================================================================
 */

let vuetify, localVue, store
function getMountedComponent() {
  localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(Vuex)
  vuetify = new Vuetify()
  store = new Vuex.Store({
    modules: {
      snackbar: {
        namespaced: true,
        ...SnackbarStore
      }
    }
  })

  const App = localVue.component('App', {
    components: {
      Snackbar
    },
    mixins: [SnackbarMixin],
    template: `
      <div id="app">
        <Snackbar />
      </div>
    `
  })

  const parent = mount(App, { store, localVue, vuetify })
  return { parent, wrapper: parent.getComponent(Snackbar) }
}

/**
 * Tests
 * ==================================================================================
 */

describe('UI/UX', () => {
  test('should display proper alert message', async(done) => {
    const message = 'This is a sample test message'
    const { parent, wrapper } = getMountedComponent()

    parent.vm.showSnackbar(message)
    await parent.vm.$nextTick()
    expect(wrapper.vm.message).toBe(message)

    done()
  })

  test('should display error or warning theme depending on snackbar/color', async(done) => {
    const { parent, wrapper } = getMountedComponent()

    parent.vm.showSnackbar('Success theme test')
    await parent.vm.$nextTick()
    expect(wrapper.vm.color).toBe('success')

    parent.vm.showSnackbar('Error theme test', false)
    await parent.vm.$nextTick()
    expect(wrapper.vm.color).toBe('red')

    done()
  })
})

describe('Behaviors', () => {
  test('trigger visibility on snackbar/show action', async(done) => {
    const message = 'This is a sample alert message'
    const { parent, wrapper } = getMountedComponent()

    parent.vm.showSnackbar(message)
    await parent.vm.$nextTick()
    expect(wrapper.vm.show).toBeTruthy()

    done()
  })
})
