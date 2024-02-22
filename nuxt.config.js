const appName = process.env.VUE_APP_NAME || 'MySkillMaster'

export default {
  ssr: false,
  target: 'static',

  head: {
    titleTemplate: `%s${appName}`,
    title: 'Learn Life Skills from Local Experts | MySkillMaster',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'MySkillMaster is a marketplace app where you can learn a variety of life skills from local experts in your neighborhood. Discover and master skills like surfing, latte art, guitar playing, and more. Choose between in-person lessons or video tutorials. Book affordable 1-3 lesson packages for no more than $200. Start learning today with MySkillMaster!' },
      { hid: 'keywords', name: 'keywords', content: 'life skills, local experts, marketplace app, learn from locals, surfing lessons, latte art classes, guitar lessons, in-person learning, instructional videos, affordable lessons, skill sharing' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      {
        name: 'msapplication-TileImage',
        content: '/favicon/mstile-150x150.png'
      },
      { name: 'msapplication-config', content: '/favicon/browserconfig.xml' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      { rel: 'manifest', href: '/site.webmanifest' }
    ]
  },

  css: ['~assets/scss/index.scss'],

  plugins: [
    '~/plugins/filters',
    '~/plugins/axios',
    '~/plugins/vue-api-query',
    '~/plugins/vue2-datepicker',
    '~/plugins/vue-tel-input-vuetify',
    '~/plugins/vue-slick-carousel',
    '~/plugins/vue-infinite-scroll'
  ],

  components: false,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth', '@nuxtjs/sitemap', '@nuxtjs/gtm'],

  gtm: {
    enabled: true,
    id: process.env.VUE_APP_GTM || '',
    debug: process.env.VUE_APP_GTM_DEBUG || false,
    pageTracking: true,
  },

  sitemap: {
      hostname: 'https://myskillmaster.com/'
  },


  env: {
    appName,
    apiUrl: process.env.VUE_APP_API_URL,
    baseUrl: process.env.BASE_URL || 'localhost:3000',
    isDev: process.env.NODE_ENV !== 'production',
    googlePlacesApiKey: process.env.VUE_APP_GOOGLE_PLACES_API_KEY || '',
    stripePublishableKey: process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY || ''
  },

  axios: {
    baseUrl: process.env.VUE_APP_API_URL,
    /**
     * NOTE: Also check `plugins/axios.js` for additional parameters
     * added on the headers
     */
    headers: {
      post: {
        'Content-Type': 'application/json'
      }
    }
  },

  auth: {
    cookie: {
      options: {
        maxAge: 28800
      }
    },
    watchLoggedIn: false,
    redirect: {
      home: '/',
      login: '/login',
      logout: '/login'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/login',
            method: 'POST',
            propertyName: 'data.access_token'
          },
          logout: false,
          user: {
            url: 'auth/me',
            method: 'GET',
            propertyName: 'data'
          }
        }
      },
      local2: {
        _scheme: 'local',
        endpoints: {
          login: {
            url: 'auth/register',
            method: 'POST',
            propertyName: 'data.access_token'
          },
          logout: false,
          user: {
            url: 'auth/me',
            method: 'GET',
            propertyName: 'data'
          }
        }
      }
    }
  },
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/scss/abstracts/_variables.scss'],
    optionsPath: '~/plugins/vuetify.js'
  },
  router: {
    middleware: ['remember-me']
  },
  build: {}
}
