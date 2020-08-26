<template>
  <section>
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <p>by User with id {{ post.userId }}</p>
  </section>
</template>

<script>
export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      post: {},
    }
  },
  asyncData({ app, params }) {
    return {
      post: {
        title: 'xiaomin',
        body: 'enen',
        userId: 'dddd',
      },
    }
  },
  // seo
  head() {
    return {
      title: '链接库流量卡',
      meta: [{ hid: 'description', name: 'news', content: '厨房用品' }],
      script: [
        {
          innerHTML: require('@/static/js/haha'),
          type: 'text/javascript',
          charset: 'utf-8',
        },
      ],
      __dangerouslyDisableSanitizers: ['script'],
    }
  },
}
</script>
