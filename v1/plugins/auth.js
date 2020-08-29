export default function ({ $auth }) {
  // console.log('plugh auth', $auth)
  if (!$auth.loggedIn) {
    return
  }
  const username = $auth.user.username
}
