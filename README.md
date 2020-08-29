# web-nuxt

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

## 社区

选用@auxtjs/axios 而非 axios 作为 nuxt 的请求模块 方案
https://blog.lichter.io/posts/nuxt-api-call-organization-and-decoupling/

jwt+cookie 的安全处理
https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage

权限验证
https://dev.to/mandeepm91/how-to-add-authentication-to-your-universal-nuxt-app-using-nuxt-auth-module-3ffm
