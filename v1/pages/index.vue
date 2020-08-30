<template>
  <div id="page-index">
    <el-row>
      <el-col :xs="24" :sm="18" class="index-left">
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
                  <div
                    class="banner-item"
                    :style="{ backgroundImage: `url(${t.imagePath})` }"
                  ></div>
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
            <li :key="i" v-for="(t, i) in slicedPosts" class="timeline-content">
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
              :current-page.sync="s_currentPage"
              :page-size="s_essay.size"
              :page-sizes="[10, 20, 50, 100]"
              layout="total,sizes , prev, pager, next"
              :total="s_essay.total"
            >
            </el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="6" class="index-right">
        <el-card>
          right
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  auth: false,

  validate({ params, query }) {
    // 校验动态路由参数的有效性
    return true
  },

  fetch({ store, params }) {
    // 修改store数据
  },
  async asyncData(ctx) {
    const [err, resList] = await ctx.app.$api_wanandroid.getAllIndex(1)
    if (err) {
      return false
    }
    // console.log(err, resList)
    const [list0, list1] = resList
    return {
      s_essay: list0,
      s_banner: {
        list: list1,
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
        on: {
          slideChangeTransitionStart: (v) => {
            const swiper =
              this.$refs.mySwiperPc && this.$refs.mySwiperPc.$swiper
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
      s_banner: {
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
    slicedPosts() {
      return this.s_essay.datas
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
