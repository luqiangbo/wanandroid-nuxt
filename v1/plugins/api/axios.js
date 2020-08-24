export default ({ $axios, redirect }) => {
  $axios.onRequest((config) => {
    console.log(config)
    console.log('接口' + config.url)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
