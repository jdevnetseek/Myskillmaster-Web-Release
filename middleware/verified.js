export default function(context) {
  const route = context.route.name

  /**
   * Do not check verified status on the ff. pages
   */
  if (!['index', 'accounts'].includes(route)) {
    if (!context.$auth.loggedIn) {
      return context.redirect({ name: 'login' })
    }

    const isOnVerify = ['verify'].includes(route)
    const user = context.$auth.user

    if (isOnVerify && user.verified) {
      return context.redirect({
        name: 'index'
      })
    }

    /**
     * NOTE: Non-verified users aren't restricted to any
     * page or features for now
     */
    // if (!isOnVerify && !user.verified) {
    //   return context.redirect({
    //     name: 'verify'
    //   })
    // }
  }
}
