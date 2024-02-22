import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import AuthPage from '@/components/auth/AuthPage.vue'

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
function getMountedComponent() {
  localVue = createLocalVue()
  localVue.use(Vuetify)
  vuetify = new Vuetify()

  const App = localVue.component('App', {
    components: { AuthPage },
    template: `
      <div id="app">
        <AuthPage>
          <div class="default" />
          <div class="form" slot="form" />
          <div class="footer" slot="footer" />
        </AuthPage>
      </div>
    `
  })

  const parent = mount(App, { localVue, vuetify })
  return { parent, wrapper: parent.getComponent(AuthPage) }
}

/**
 * Tests
 * ==================================================================================
 */

describe('UI/UX', () => {
  test('check if slot elements are placed properly', (done) => {
    const { parent } = getMountedComponent()

    expect(parent.find('.auth-page__border > .default').exists()).toBeTruthy()
    expect(parent.find('.auth-page__form > .form').exists()).toBeTruthy()
    expect(parent.find('.auth-page__footer > .footer').exists()).toBeTruthy()

    done()
  })
})
