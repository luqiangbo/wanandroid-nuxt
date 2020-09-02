<template>
  <div id="page-index">
    <el-row>
      <el-col :xs="24" :sm="17" class="index-left mb20">
        <el-card v-if="s_banner.list.length" class="index-banner">
          <el-row>
            <el-col :xs="24" :sm="0" class="banner-m">
              <swiper ref="mySwiperM" :options="s_swiperOptionsM">
                <swiper-slide v-for="(t, i) in s_banner.list" :key="i">
                  <div class="banner-item">
                    <img :src="t.imagePath" alt="title" />
                  </div>
                </swiper-slide>
              </swiper>
            </el-col>
            <el-col :xs="0" :sm="24" class="banner-pc">
              <swiper ref="mySwiperPc" :options="s_swiperOptionsPc">
                <swiper-slide v-for="(t, i) in s_banner.list" :key="i">
                  <!-- <div
                    class="banner-item"
                    :style="{ backgroundImage: `url(${t.imagePath})` }"
                  ></div> -->
                  <div class="banner-item">
                    <img :src="t.imagePath" alt="title" />
                  </div>
                </swiper-slide>
              </swiper>
              <div class="manage">
                <div class="button prev" @click="swiperPc.slidePrev()">
                  <i class="el-icon-arrow-left"></i>
                </div>
                <div class="pages">
                  <div
                    :class="[s_swiperActive - 1 === i ? 'active' : '', 'item']"
                    v-for="(t, i) in s_banner.list"
                    :key="i"
                    @click="onPage(i + 1)"
                  ></div>
                </div>
                <div class="button next" @click="swiperPc.slideNext()">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <!--  -->
        <el-card class="com-timeline">
          <div>
            <li :key="i" v-for="(t, i) in s_essay.datas" class="timeline-content">
              <div class="timeline-info">
                <div class="meta-row">
                  <ul class="meta-list">
                    <li class="item">姓名</li>
                    <li class="item">时间</li>
                    <li class="item">分类</li>
                  </ul>
                </div>
                <div class="title-row">
                  <a :href="t.link" target="”_blank”" class="title">
                    {{ t.title }}
                  </a>
                </div>
                <div class="action-row">
                  <ul class="action-list">
                    <li class="item">点赞</li>
                    <li class="item">评论</li>
                  </ul>
                </div>
              </div>
            </li>
          </div>
          <div class="com-page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="s_essay.curPage"
              :page-size="s_essay.size"
              :page-sizes="[10, 20, 50, 100]"
              layout="total,sizes , prev, pager, next"
              :total="s_essay.total"
            >
            </el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="7" class="index-right mb20">
        <!-- 搜索 -->
        <el-card class="com-right-search mb20">
          <div>
            <div class="search-content">
              <el-input
                v-model="websocketText"
                suffix-icon="el-icon-search"
                placeholder="搜索文字/标题/用户"
                size="small"
                @change="onSearch"
              ></el-input>
            </div>
          </div>
        </el-card>
        <!-- 搜索热词 -->
        <el-card class="com-right-hotkey">
          <div slot="header">
            <span>搜索热词</span>
          </div>
          <div class="hotkey-list">
            <el-tag type="info" v-for="(t, i) in s_hotkey.list" :key="i" class="item">
              {{ t.name }}
            </el-tag>
          </div>
        </el-card>
        <!-- 个人中心 -->
        <el-card class="com-right-user mb20">
          <div slot="header">
            <span>个人中心</span>
          </div>
          <ul class="user-list">
            <li class="item">
              <nuxt-link to="/collect">
                <i class="el-icon-star-on"></i>
                <span>收藏 : 需登录 </span>
              </nuxt-link>
            </li>
            <li class="item">
              <nuxt-link to="/coin">
                <i class="el-icon-s-finance"></i>
                <span>积分 : 需登录 </span>
              </nuxt-link>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { get, differenceBy } from 'lodash'
export default {
  name: 'PageIndex',
  auth: false,
  watchQuery: ['page'],
  validate({ params, query }) {
    // 校验动态路由参数的有效性
    return true
  },
  fetch({ store, params }) {
    // 修改store数据
  },
  async asyncData(ctx) {
    //
    const context = ctx.app.context
    let { page } = context.query
    console.log(page)
    if (page) {
      page = page * 1
    } else {
      page = 1
    }
    const [err, resList] = await ctx.app.$api_wanandroid.getAllIndex(page - 1)
    if (err) {
      return false
    }
    const [res0, res1, res2] = resList
    console.log(res2)
    return {
      s_essay: res1,
      s_banner: {
        list: res0,
      },
      s_hotkey: {
        list: res2,
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
          delay: 2 * 60 * 1000,
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
          delay: 2 * 60 * 1000,
          disableOnInteraction: false,
        },
        loop: true,
        on: {
          slideChangeTransitionStart: (v) => {
            const swiper = this.$refs.mySwiperPc && this.$refs.mySwiperPc.$swiper
            if (swiper) {
              const leng = this.s_banner.list.length
              let active = swiper.activeIndex
              if (active - 1 === leng) {
                active = 1
              }
              this.onSwiperChange(active)
            }
          },
        },
      },
      s_hotkey: {
        list: [],
      },
      s_essay: {
        curPage: null, // 2
        datas: [],
        offset: null, // 20
        over: null, // false
        pageCount: null, // 456
        size: null, // 20
        total: null, // 9113
      },
      s_swiperActive: 1,
      s_currentPage: 1,
      messageRxd: '',
      websocketText: '',
      abc: '',
    }
  },

  computed: {
    ...mapState('auth', ['loggedIn', 'user']),
    swiperM() {
      return this.$refs.mySwiperM.$swiper
    },
    swiperPc() {
      return this.$refs.mySwiperPc.$swiper
    },
  },
  mounted() {
    // this.swiperPc.slideTo(1, 1000, false)
    // this.swiperM.slideTo(1, 1000, false)
  },
  methods: {
    onPage(v) {
      this.s_swiperActive = v
      this.swiperPc.slideTo(v, 1000, false)
    },
    onSlidePrev() {
      this.swiperPc.slidePrev()
    },
    onSwiperChange(v) {
      this.s_swiperActive = v
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.$router.push({ path: '/', query: { page: val + '' } })
    },
    onSearch(v) {
      // 搜索
      // console.log(v)
      const a = {
        c: 123,
      }
      const haha = differenceBy([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor)
      this.abc = get(a, 'c' + '小明' + haha)
    },
  },
  head() {
    return {
      title: '我就是标题',
      meta: [
        {
          hid: 'hidddd',
          name: 'namess',
          content: '首付款酸辣粉家里看',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
@import './index';
</style>
