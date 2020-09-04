import path from 'path'
import fs from 'fs'

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
    server: {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, '/root/nginx/ssl/key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, '/root/nginx/ssl/cert.pem')),
      },
    },
  },
  render: {
    compressor: false, // 关闭默认gzip打包
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
    'element-ui/lib/theme-chalk/index.css',
    '~/static/iconfont/iconfont.css',
    {
      src: '~/assets/style/reset.scss',
      lang: 'scss',
    },
    {
      src: '~/assets/style/common.scss',
      lang: 'scss',
    },
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/element-ui',
    '~/plugins/swiper',
    '~/plugins/vue-global.js',
    '~/plugins/axios',
    // '~/plugins/sticky',
    // { src: '~/plugins/sticky', ssr: false },
    { src: '~/static/iconfont/iconfont.js', ssr: false },
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
    // Doc: https://github.com/nuxt/content
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    '@nuxtjs/svg',
    '@nuxt/content',
    [
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 60,
      },
    ],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: 'https://jsonplaceholder.typicode.com/',
    proxy: true,
    credentials: true,
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
    middleware: ['auth'],
  },
  publicRuntimeConfig: {
    // baseURL: process.env.BASE_URL || 'https://nuxtjs.org',
  },
  privateRuntimeConfig: {
    // apiSecret: process.env.API_SECRET,
  },
  auth: {
    plugins: ['~/plugins/auth.js'], // 扩展auth插件
    localStorage: false,
    cookie: {
      prefix: '123cookie.',
      options: {
        path: '/',
        expires: 2 / 24 / 60, // 两分钟 兼容ie 用户不操作后 用户操作就一直更新
        // maxAge: 2 * 60, // 两分钟
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
    },
    strategies: {
      local: {
        autoFetchUser: false, // 登录后请求用户接口
        // tokenRequired: false, // 此选项可用于禁用所有令牌处理
        // tokenType: Bearer, // 在axios请求中使用的授权标头类型
        globalToken: false, // 为所有axios请求设置授权标头
        endpoints: {
          login: {
            url: '/api/user/login',
            method: 'post',
            propertyName: false,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              // Referer: 'https://www.wanandroid.com/index',
            },
          },
          logout: { url: '/api/user/logout/json', method: 'get' },
          user: { url: '/api/friend/json', method: 'get', propertyName: false },
        },
      },
    },
  },
}
