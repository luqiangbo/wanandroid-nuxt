<template>
  <div class="container">
    <div>
      <swiper ref="mySwiper" :options="s_swiperOptions">
        <swiper-slide v-for="(t, i) in s_banner.list" :key="i">
          <div>{{ t.title }}</div>
          <div>
            <!-- <img src="@/assets/banner1.jpg" alt="" /> -->
            <img src="@/static/image/banner/banner1.jpg" alt="" />
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
  </div>
</template>

<script>
export default {
  name: 'Index',
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
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
  },
  mounted() {
    this.swiper.slideTo(1, 1000, false)
  },
  methods: {
    onPage(v) {
      this.swiper.slideTo(v + 1, 1000, false)
    },
    onSlidePrev() {
      this.swiper.slidePrev()
    },
  },
}
</script>

<style lang="scss">
@import './index';
</style>
