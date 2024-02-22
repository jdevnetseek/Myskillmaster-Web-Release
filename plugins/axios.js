export default ({ $axios, app }) => {
  $axios.onRequest((config) => {
    config.headers['x-tenant-domain'] = 'eventbuddy'
  })
  $axios.setHeader('Timezone', Intl.DateTimeFormat().resolvedOptions().timeZone)
  $axios.onError((error) => {
    if (error.response.status === 401) {
      // TOOD: implement logout user, clear user's state.
      //   console.log('Logging out...')
    }
  })
}
