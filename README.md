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
