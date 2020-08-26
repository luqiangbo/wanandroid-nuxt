<template>
  <div class="page-index">
    <div class="main">
      <div v-if="s_banner.list.length">
        <el-row>
          <el-col :xs="24" :sm="0" class="banner-m">
            <swiper ref="mySwiperM" :options="s_swiperOptionsM">
              <swiper-slide v-for="t in s_banner.list" :key="t.id">
                <div class="banner-item">
                  <img :src="t.imagePath" alt="title" />
                </div>
              </swiper-slide>
            </swiper>
          </el-col>
          <el-col :xs="0" :sm="24" class="banner-pc">
            <swiper ref="mySwiperPc" :options="s_swiperOptionsPc">
              <swiper-slide v-for="t in s_banner.list" :key="t.id">
                <div
                  class="banner-item"
                  :style="{ backgroundImage: `url(${t.imagePath})` }"
                ></div>
              </swiper-slide>
            </swiper>
            <div class="manage">
              <div class="prev" @click="swiperPc.slidePrev()">
                <el-button>左</el-button>
              </div>
              <div class="pages">
                <div
                  class="item"
                  v-for="(t, i) in s_banner.list"
                  :key="i"
                  @click="onPage(i)"
                >
                  <el-button>{{ i + 1 }}</el-button>
                </div>
              </div>
              <div class="next" @click="swiperPc.slideNext()">
                <el-button>右</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--  -->

      <!-- 登录 -->
      <div>
        <nuxt-link :to="`/login`">
          <el-button>
            <i class="iconfont icon-search"></i>
            登录
          </el-button>
        </nuxt-link>
        <nuxt-link :to="`/shop`">
          <el-button>
            <i class="iconfont icon-shop"></i>
            购物车
          </el-button>
        </nuxt-link>
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

      <nuxt-link :to="`/xiaomi`">
        错误页面
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(ctx) {
    // const [err, res] = await ctx.app.$axiosWan.getArticle(1)
    const [err, resList] = await ctx.app.$axiosWan.getAllIndex(1)
    if (err) {
      return false
    }
    const [list0, list1] = resList
    return {
      s_essay: list0.data.datas,
      s_banner: {
        list: list1.data,
      },
    }
  },
  data() {
    return {
      s_swiperOptionsM: {
        pagination: {
          el: '.swiper-pagination-m',
          clickable: true,
        },
        autoplay: {
          delay: 5 * 1000,
          disableOnInteraction: false,
        },
        loop: true,
      },
      s_swiperOptionsPc: {
        pagination: {
          el: '.swiper-pagination-pc',
          clickable: true,
        },
        autoplay: {
          delay: 5 * 1000,
          disableOnInteraction: false,
        },
        loop: true,
      },
      s_banner: {
        list: [],
      },
      s_essay: [],
    }
  },
  computed: {
    swiperM() {
      return this.$refs.mySwiperM.$swiper
    },
    swiperPc() {
      return this.$refs.mySwiperPc.$swiper
    },
    slicedPosts() {
      return this.s_essay.slice(-4)
    },
  },
  mounted() {
    this.swiperPc.slideTo(1, 1000, false)
    this.swiperM.slideTo(1, 1000, false)
  },

  methods: {
    onPage(v) {
      this.swiperPc.slideTo(v + 1, 1000, false)
    },
    onSlidePrev() {
      this.swiperPc.slidePrev()
    },
  },
}
</script>

<style lang="scss">
@import './index';
</style>
