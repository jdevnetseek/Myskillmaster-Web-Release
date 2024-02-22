export default function({ $auth }) {
  const rememberExpires = $auth.$storage.getCookie('remember_expires')
  if (rememberExpires) {
    $auth.options.cookie.options.expires = rememberExpires
  } else {
    $auth.options.cookie.options.expires = null
  }
}
