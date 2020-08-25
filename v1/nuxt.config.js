const path = require('path')
const myApiEnv = process.env.MY_API_ENV
let baseURL = 'https://www.wanandroid.com/'
if (myApiEnv === 'local') {
  // 本地环境
  baseURL = 'https://www.wanandroid.com/'
} else if (myApiEnv === 'test') {
  // 测试环境
  baseURL = 'https://www.wanandroid.com/'
} else if (myApiEnv === 'product') {
  // 线上环境
  baseURL = 'https://www.wanandroid.com/'
}

export default {
  srcDir: __dirname,
  buildDir: `.nuxt/v1`,
  server: {
    port: 3001, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [
    {
      src: '@/assets/style/reset.scss',
      lang: 'scss',
    },
    'element-ui/lib/theme-chalk/index.css',
    './static/iconfont/iconfont.css',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/swiper',
    '@/plugins/api/all',
    '@/plugins/api/axios',
    { src: './static/iconfont/iconfont.js', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: 'https://jsonplaceholder.typicode.com/',
    proxy: true,
  },
  proxy: {
    '/api': {
      target: baseURL,
      pathRewrite: {
        '^/api': '/',
      },
    },
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {
      // config.resolve.alias['utils'] = path.join(__dirname, 'utils')
      // config.resolve.alias['com'] = path.join(__dirname, '../com')
      // if (ctx.isClient) {
      //   // 添加 alias 配置
      //   console.log('webpack', path.resolve(__dirname, '../com'))
      //   Object.assign(config.resolve.alias, {
      //     com: path.resolve(__dirname, '../com'),
      //   })
      // }
    },
  },
  router: {
    middleware: 'auth',
  },
  publicRuntimeConfig: {
    // baseURL: process.env.BASE_URL || 'https://nuxtjs.org',
  },
  privateRuntimeConfig: {
    // apiSecret: process.env.API_SECRET,
  },
}
