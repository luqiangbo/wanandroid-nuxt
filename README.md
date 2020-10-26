# web-nuxt

# 前言

基于鸿洋大佬的 [api](https://www.wanandroid.com/blog/show/2) ，从零开始实现一个 nuxt ，偏实战，项目的设计思路和主要实现步骤，列出坑点, 基础 api 请参照官方文档。有需要的小伙伴可以从零实现自己 nuxt（实现起来并不复杂，该教程只是提供思路，并非最佳实践）

Github：[传送门](https://github.com/luqiangbo/web-nuxt)

演示地址：[传送门](https://nuxt.commok.com/)

nuxt 官网：[Nuxt.js docs](https://nuxtjs.org).

![预览](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7c05763341040fb853efcc6cc7c84b0~tplv-k3u1fbpfcp-watermark.image)

## 技术栈

---

### 前端：

`vue`: 三选一，毕竟是 nuxt。

`vuex`: 状态管理

`sass`: 样式

`element-ui`: 优秀

`lodash`: 工具类

`swiper`: 知名滑动插件, 不要用最新的 6 版本， 有 坑

### 服务端

`nginx`: 端口转发

`docker`: 部署

## 工程搭建

---

基于 nuxt 官网搭建，详细步骤请查看官网， 我这里只展示有差异的地方。

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

这里简单介绍下使用`npm-run-all`进行多项目并行打包，结合`Dockerfile`打包镜像，部署项目，实现简化版本 CI/CD

使用`--parallel`参数执行并行操作 `cx:v1`是本地测试用的，本地调试也就是 `npm dev：v1`

```javascript
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

打包成 docker 容器，拷贝项目到创建的文件夹，npm i， 设置环境变量， 打包项目 暴漏端口，坐等启动，这里需要 dockerhub 账号关联 github，监听分支提交，自动打包。github 今年新出的 action 也很好用。小伙伴们可以试一试

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

简单介绍下 nuxt.config.js 的属性

1. `server` ： 端口设置

   ```javascript
   server: {
       port: 3001, // default: 3000
       host: '0.0.0.0', // default: localhost
     },
   ```

2. `buildDir`: 启动路径

   ```javascript
    buildDir: `.nuxt/v1`,
   ```

3. `head`: 网站 seo 设置

   ```javascript
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

   ```javascript
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

   ```javascript
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

6. `modules`: nuxt 提供的插件 axios 处理前后接口，auth 官方提供的权限管理，proxy 提供处理跨域

   ```javascript
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

   ```javascript
     axios: {
       proxy: true,
       credentials: true,
     },
   ```

8. `proxy`:转发解决跨域

   ```javascript
    proxy: {
       '/api': {
         target: baseURL,
         pathRewrite: {
           '^/api': '/',
         },
       },
     },
   ```

9. build: 引入 UI 组件

   ```javascript
   build: {
      transpile: [/^element-ui/],
      extend(config, ctx) {
      }
   }
   ```

10. router： 路由， 这里会用到中间件，处理路由拦截

    ```javascript
    router: {
      middleware: ['auth'],
    },
    ```

11. auth：路由的中间件， 拦截路由，里面配置比较多 配置说明请看 [官方 auth 验证模块](https://auth.nuxtjs.org/#getting-started)

    ```javascript
      auth: {
        plugins: ['~/plugins/auth.js'], // 扩展auth插件
        localStorage: false,
        cookie: {
          prefix: '123cookie.', // 自定义cookie名称
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

api 自动化, 这里没有另外引入 axios， 毕竟 nuxt 已经提供了封装好的 axios

```javascript
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

api 设计 增删改查

```javascript
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

处理 async/await 异常 , 让代码更优雅

```javascript
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

```javascript
// ./page/index.vue
const [err, resList] = await ctx.app.$api_wanandroid.getAllIndex(page - 1)
if (err) return
```

组件自动化,省事省心

```javascript
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

## 部署

```

- 停止容器：docker stop <CONTAINER>
- 删除容器：docker rm <CONTAINER>
- 更新镜像：docker pull <IMAGE>
- 启动容器：docker run <ARG> ... <IMAGE>

// 单项目部署
docker run --name web-nuxt01 -p 43001:3001 -d caniuse/web-nuxt:0.0.1
// 多项目部署
docker run --name web-nuxt01 -p 43001:3001 -p 43002:3002 -d caniuse/web-nuxt:0.0.1
```

## watchtower

这里推荐一款自动更新所有镜像的镜像 watchtower 常用的命令

### 每小时更新一次

```
docker run -d \
    --name watchtower \
    --restart always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --cleanup \
    -i 3600
```

### 每天凌晨一点更新(北京时间)

```
docker run -d \
    --name watchtower \
    --restart always \
    -e TZ=Asia/Shanghai \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --cleanup \
    -s "0 0 1 * * *"
```

### watchtower 手动更新

```
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower -cR \
    web01
```

```
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --cleanup \
    --run-once \
    web01
```

> 注意指定容器需填写 容器名 ,并非镜像名.由于部分容器启动时可能没有定义 --name 参数,请执行 docker ps 查询核对容器名.

#### 手动更新所有容器

```
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    containrrr/watchtower \
    --cleanup \
    --run-once

```

## 官方文档

auth 验证模块
https://auth.nuxtjs.org/#getting-started

\$axios 接口模块

https://axios.nuxtjs.org/helpers

websocket 文档
https://nuxt-socket-io.netlify.app/

## 社区好文章

选用@auxtjs/axios 而非 axios 作为 nuxt 的请求模块 方案
https://blog.lichter.io/posts/nuxt-api-call-organization-and-decoupling/

jwt+cookie 的安全处理
https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage

权限验证
https://dev.to/mandeepm91/how-to-add-authentication-to-your-universal-nuxt-app-using-nuxt-auth-module-3ffm

// Nuxt.js + SockJs 实现 webSocket 订单实时消息 语音播报
https://blog.csdn.net/lq099526/article/details/96480959

## 待解决 待学习

nuxt sticky 粘性插件没找到合适的
https://github.com/mehwww/vue-sticky-directive/issues/27

nuxt 的性能问题
https://www.zhihu.com/question/323485389

nuxt 性能
https://www.cnblogs.com/lessfish/p/12411497.html

### nuxt next 性能对比 ssr 方案讨论

https://blog.fundebug.com/2019/05/23/next-nuxt-nest/

https://cnodejs.org/topic/5e0c53b801c0915a9d9bd697
