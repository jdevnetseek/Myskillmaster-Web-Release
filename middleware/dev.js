export default function ({ store, error, redirect }) {
  if (!store.getters.isDev) {
    error({ statusCode: 404 })
  }
}
