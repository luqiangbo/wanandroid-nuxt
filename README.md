# web-nuxt

# 前言

基于鸿洋大佬的 [api](https://www.wanandroid.com/blog/show/2) ，从零开始实现一个 nuxt 项目的设计思路和主要实现步骤，并开源代码。有需要的小伙伴可以按照该教程从零实现自己 nuxt（实现起来并不复杂，该教程只是提供思路，并非最佳实践）

Github：[传送门](https://github.com/luqiangbo/web-nuxt)

演示地址：[传送门](https://nuxt.commok.com/)

![预览](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7c05763341040fb853efcc6cc7c84b0~tplv-k3u1fbpfcp-watermark.image)

## 技术栈

---

### 前端：

`vue`: 三选一，毕竟是nuxt。

`vuex`: 状态管理

`sass`: 样式

`element-ui`: 优秀

`lodash`: 工具类

`swiper`: 知名滑动插件

### 服务端

`nginx`: 端口转发

`docker`: 部署

## 工程搭建

---

基于nuxt官网搭建，详细步骤请查看官网， 我这里只展示有差异的地方。

我的触发点是搭建一套环境，多项目部署，省事。使用到了`npm-run-all`

```
|--v1
  |-- api                 // 接口目录
  |-- assets              // 文件
  |-- components          // 组件
  |-- layout              // 页面布局
  |-- middleware          // 中间件  
  |-- page                // 页面  
  |-- plugins             // 插件  
  |-- static              // 静态文件 
  |-- store               // 状态管理
  |-- util                // 常用工具集合
|--v2
```

这里简单介绍下使用`npm-run-all`进行多项目并行打包，结合`Dockerfile`打包镜像，部署项目，实现简化版本CI/CD

使用`--parallel`参数执行并行操作 `cx:v1`是本地测试用的

```
// .package.json
"dev:v1": "nuxt --config-file v1/nuxt.config.js",
"build:v1": "nuxt build --config-file v1/nuxt.config.js",
"start:v1": "nuxt start --config-file v1/nuxt.config.js",
"cx:v1": "npm run build:v1 && npm run start:v1",
"dev:v2": "nuxt --config-file v2/nuxt.config.js",
"build:v2": "nuxt build --config-file v2/nuxt.config.js",
"start:v2": "nuxt start --config-file v2/nuxt.config.js",
"cx:v2": "npm run build:v2 && npm run start:v2",
"all": "npm-run-all --parallel cx:*",
"all-start": "npm-run-all --parallel start:*",
```

打包成docker容器，以后详细再说， 先使用

```
// .Dockerfile
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# 拷贝
COPY package*.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN npm install

ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0

# 拷贝
COPY . /usr/src/app/

# build
RUN npm run build:v1
RUN npm run build:v2
EXPOSE 3001 3002

# Running the app
CMD "npm" "run" "all-start"
```

简单介绍下nuxt.config.js的属性

1. `server` ： 端口设置

   ```
   server: {
       port: 3001, // default: 3000
       host: '0.0.0.0', // default: localhost
     },
   ```

   

2. `buildDir`:  启动路径

   ```
    buildDir: `.nuxt/v1`,
   ```

   

3. `head`: 网站seo设置

   ```
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
   ```

   

4. `css` : 样式文件

   ```
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
   ```

   

5. `public`: 插件

   ```
    plugins: [
       '~/plugins/element-ui',
       '~/plugins/swiper',
       '~/plugins/vue-global.js',
       '~/plugins/axios',
       // '~/plugins/sticky',
       // { src: '~/plugins/sticky', ssr: false },
       { src: '~/static/iconfont/iconfont.js', ssr: false },
     ],
   ```

   

6. `modules`: nuxt提供的插件

   ```
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
   ```

   

7. `axios`: 接口

   ```
     axios: {
       proxy: true,
       credentials: true,
     },
   ```

   

8. `proxy`:转发解决跨域

   ```
    proxy: {
       '/api': {
         target: baseURL,
         pathRewrite: {
           '^/api': '/',
         },
       },
     },
   ```

   

9.  build: 看官网

   ```
   build: {
   transpile: [/^element-ui/],
   extend(config, ctx) {
   }
   }
   ```

   

10. router： 路由， 这里会用到中间件，处理路由拦截

    ```
     router: {
        middleware: ['auth'],
      },
    ```

11. auth：路由的中间件， 拦截路由，里面配置比较多 配置说明请看 [官方auth 验证模块](https://auth.nuxtjs.org/#getting-started)

    ```
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
    ```

    

    api自动化, 这里没有另外引入axios， 毕竟nuxt已经提供了封装好的axios

    ```
    // api 自动化
    const ctx = require.context('.', false, /.api.js$/)
    const APIS = {}
    ctx.keys().forEach((item) => {
      const name = item.split('.')[1].slice(1)
      const config = ctx(item)
      const dft = config.default || config
      APIS[name] = dft
    })
    export default APIS
    ```

    api设计

    ```
    // ./api/repository
    export default ($axios) => (resource) => ({
      index() {
        return $axios.$get(`${resource}`)
      },
    
      show(id) {
        return $axios.$get(`${resource}/${id}`)
      },
    
      create(payload) {
        return $axios.$post(`${resource}`, payload)
      },
    
      update(id, payload) {
        return $axios.$post(`${resource}/${id}`, payload)
      },
    
      delete(id) {
        return $axios.$delete(`${resource}/${id}`)
      },
    })
    ```

    处理async/await异常 , 让代码更优雅

    ```
    // ./api/test.api.js
    const to = (promise) => {
      return promise
        .then((data) => {
          return [null, data]
        })
        .catch((err) => [err, null])
    }
    // 首页banner
    getBanner() {
       return to($axios.$get(`${resource}/banner/json`))
    },
    ```

    使用

    ```
    // ./page/index.vue
    const [err, resList] = await ctx.app.$api_wanandroid.getAllIndex(page - 1)
    ```

    组件自动化

    ```
    // ./components/common/index.js
    // 组件自动化
    export default {
      install(Vue) {
        const components = require.context('~/components/common', false, /\.vue$/)
        // components.keys() 获取文件名数组
        components.keys().forEach((path) => {
          // 获取组件文件名
          const fileName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
          // components(path).default 获取 ES6 规范暴露的内容，components(path) 获取 Common.js 规范暴露的内容
          Vue.component(fileName, components(path).default || components(path))
        })
      },
    }
    ```

    

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## 部署

```
docker run --name web-nuxt01 -p 43001:3001 -d caniuse/web-nuxt:0.0.1
docker run --name web-nuxt01 -p 43001:3001 -p 43002:3002 -d caniuse/web-nuxt:0.0.1
```

## 官方文档

auth 验证模块
https://auth.nuxtjs.org/#getting-started

\$axios 接口模块

https://axios.nuxtjs.org/helpers

websocket 文档
https://nuxt-socket-io.netlify.app/

## 社区

选用@auxtjs/axios 而非 axios 作为 nuxt 的请求模块 方案
https://blog.lichter.io/posts/nuxt-api-call-organization-and-decoupling/

jwt+cookie 的安全处理
https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage

权限验证
https://dev.to/mandeepm91/how-to-add-authentication-to-your-universal-nuxt-app-using-nuxt-auth-module-3ffm

// Nuxt.js + SockJs 实现 webSocket 订单实时消息 语音播报
https://blog.csdn.net/lq099526/article/details/96480959

## 待解决

nuxt sticky 粘性插件没找到合适的
https://github.com/mehwww/vue-sticky-directive/issues/27

nuxt 高并发
https://www.zhihu.com/question/323485389

nuxt 性能
https://www.cnblogs.com/lessfish/p/12411497.html

### nuxt next 性能对比 ssr 方案讨论

https://blog.fundebug.com/2019/05/23/next-nuxt-nest/

https://cnodejs.org/topic/5e0c53b801c0915a9d9bd697
