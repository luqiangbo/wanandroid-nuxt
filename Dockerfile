FROM node:12

# 新建文件夹
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
CMD ["npm" "all-start"]
# ENTRYPOINT ["./entrypoint.sh"]