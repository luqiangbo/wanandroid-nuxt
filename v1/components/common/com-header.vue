<template>
  <div id="com-header">
    <div class="container">
      <el-menu :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" @select="onSelect">
        <el-menu-item :index="item.label" :key="index" v-for="(item, index) in s_routers.list">
          <nuxt-link :to="item.label" class="com-menu-link">
            {{ item.value }}
          </nuxt-link>
        </el-menu-item>
        <span class="header-user">
          <div class="header-login">
            <nuxt-link to="/login" v-if="!this.$auth.loggedIn">
              登录
            </nuxt-link>
            <nuxt-link to="/enroll">
              注册
            </nuxt-link>
          </div>
          <div v-if="this.$auth.loggedIn">
            <div class="header-icon">
              <nuxt-link to="/collect">
                <i class="el-icon-star-on"></i>
              </nuxt-link>
              <nuxt-link to="/coin">
                <i class="el-icon-s-finance"></i>
              </nuxt-link>
            </div>
          </div>
          <div v-if="this.$auth.loggedIn">
            <el-dropdown size="medium" type="primary" trigger="click" placement="bottom" @command="onCommand">
              <el-avatar shape="square" :size="40" :fit="s_user.fit" :src="s_user.url" class="user-img"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="user">个人中心</el-dropdown-item>
                <el-dropdown-item command="collect">收藏</el-dropdown-item>
                <el-dropdown-item command="coin">积分</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </span>
      </el-menu>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      s_routers: {
        list: [
          {
            value: '首页',
            label: '/',
          },
          {
            value: '广场',
            label: '/user_article',
          },
          {
            value: '导航',
            label: '/navi',
          },
          {
            value: '问答',
            label: '/wenda',
          },
          {
            value: '体系',
            label: '/tree',
          },
          {
            value: '项目',
            label: '/projectindex',
          },
          {
            value: '公众号',
            label: '/wxarticle',
          },
          {
            value: '项目分类',
            label: '/project',
          },
        ],
      },
      s_activeIndex: '/',
      s_user: {
        fits: 'cover',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      },
      s_stickyOffset: {},
    }
  },
  created() {
    if (process.browser) {
      window.addEventListener('scroll', this.onScroll)
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('scroll', this.onScroll)
    }
  },
  methods: {
    to(promise) {
      return promise
        .then((data) => {
          return [null, data]
        })
        .catch((err) => [err, null])
    },
    onSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    onCommand(v) {
      console.log(v)
      if (v === 'user') {
        this.$router.push('/user')
      } else if (v === 'collect') {
        this.$router.push('/collect')
      } else if (v === 'coin') {
        this.$router.push('/coin')
      } else if (v === 'logout') {
        this.onLogout()
      }
    },
    onScroll(v) {
      const en = this.$util.getViewHeight()
      const en1 = this.$util.getScrollTop()
      const en2 = this.$util.getContentHeight()
      // console.log(en, en1, en2)
    },
    async onLogout() {
      const [err, res] = await this.to(this.$auth.logout())
      if (err) {
        console.log('服务端退出失败')
      }
      Cookies.remove('loginUserName')
      Cookies.remove('token_pass')
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss">
#com-header {
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  color: #909090;
  margin-bottom: 20px;
  .header-user {
    float: right;
    height: 60px;
    display: flex;
    align-items: center;
    color: #606266;
    margin-right: 20px;
    .name {
      margin-right: 15px;
    }
    .user-img {
      cursor: pointer;
    }
  }
  .el-menu-item {
    padding: 0;
    border: none;
    .com-menu-link {
      display: flex;
      height: 100%;
      padding: 0 20px;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        color: #007fff;
        opacity: 0.8;
      }
    }
  }
  .header-login {
    margin-right: 15px;
    a {
      &:hover {
        color: #007fff;
      }
    }
  }
  .is-active {
    border: none;
    color: #007fff;
  }
  .el-menu.el-menu--horizontal {
    border: none;
  }
  .header-icon {
    font-size: 25px;
    margin-top: -3px;
    margin-right: 12px;
    a {
      &:hover {
        color: #007fff;
      }
    }
  }
}
</style>
