export default function(context) {
  if (context.$auth.$state.loggedIn) {
    return context.redirect({
      name: 'index'
    })
  }
}
