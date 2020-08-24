<template>
  <div id="index">
    <div>
      <swiper ref="mySwiper" :options="s_swiperOptions">
        <swiper-slide v-for="(t, i) in s_banner.list" :key="i">
          <div>{{ t.title }}</div>
          <div>
            <!-- <img src="@/assets/banner1.jpg" alt="" /> -->
            <!-- <img src="@/static/image/banner/banner1.jpg" alt="" /> -->
            <img src="~static/image/banner/banner1.jpg" alt="" />
          </div>
        </swiper-slide>
      </swiper>
      <div>
        <div class="press" @click="swiper.slidePrev()">左</div>
        <div class="pages">
          <div
            class="item"
            v-for="(t, i) in s_banner.list"
            :key="i"
            @click="onPage(i)"
          >
            {{ i + 1 }}
          </div>
        </div>
        <div class="next" @click="swiper.slideNext()">右</div>
      </div>
      <div>
        <i class="iconfont icon-search"></i>
      </div>
    </div>
    <!-- 测试 -->
    <div>
      <ul>
        <li :key="chapterId" v-for="{ chapterId, title } in slicedPosts">
          <nuxt-link :to="`/${chapterId}`">
            {{ title }}
          </nuxt-link>
        </li>
      </ul>
      <div class="links">
        <button @click="createPost" class="button--grey">
          Create a post (send POST request)
        </button>
      </div>
      <nuxt-link :to="`/xiaomi`">
        错误页面
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      s_swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        loop: true,
        autoplay: {
          delay: 5 * 1000,
          disableOnInteraction: false,
        },
      },
      s_banner: {
        list: [
          {
            title: '1',
            url: 'cdn',
          },
          {
            title: '2',
            url: 'cdn',
          },
          {
            title: '3',
            url: 'cdn',
          },
          {
            title: '4',
            url: 'cdn',
          },
        ],
      },
      posts: [],
    }
  },
  async asyncData(ctx) {
    const res1 = await ctx.app.$axiosWan.page('article/list/1/json')
    // console.log(res1.data.datas[0])
    return {
      posts: res1.data.datas,
    }
  },
  mounted() {
    this.swiper.slideTo(1, 1000, false)
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
    slicedPosts() {
      return this.posts.slice(-3)
    },
  },
  methods: {
    onPage(v) {
      this.swiper.slideTo(v + 1, 1000, false)
    },
    onSlidePrev() {
      this.swiper.slidePrev()
    },
    async createPost() {
      // const result = await this.$postRepository.create({
      //   title: 'foo',
      //   body: 'bar',
      //   userId: 1,
      // })
      // console.log(result)
      // // Fix ids to be unique
      // this.posts.push({ ...result, id: Number(this.posts.slice(-1)[0].id) + 1 })
    },
  },
}
</script>

<style lang="scss">
@import './index';
</style>
