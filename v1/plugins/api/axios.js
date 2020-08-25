export default ({ $axios, redirect }) => {
  $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
    'post',
  ])
  $axios.setToken('123', 'Bearer', ['post', 'delete'])
  $axios.onRequest((config) => {
    // console.log('接口 config', config)
    console.log('接口' + config.url)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
