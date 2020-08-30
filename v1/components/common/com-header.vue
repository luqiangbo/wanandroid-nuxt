<template>
  <div id="com-header">
    <div class="container">
      <el-menu
        :default-active="s_activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="onSelect"
      >
        <el-menu-item
          :index="item.label"
          :key="index"
          v-for="(item, index) in s_routers.list"
        >
          <nuxt-link :to="item.label" class="com-menu-link">
            {{ item.value }}
          </nuxt-link>
        </el-menu-item>

        <span class="header-user">
          <div class="header-login">
            <nuxt-link to="/login">
              登录
            </nuxt-link>
            <nuxt-link to="/enroll">
              注册
            </nuxt-link>
          </div>
          <el-dropdown
            size="medium"
            type="primary"
            trigger="click"
            placement="bottom"
            @command="onCommand"
          >
            <el-avatar
              shape="square"
              :size="40"
              :fit="s_user.fit"
              :src="s_user.url"
              class="user-img"
            ></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">个人中心</el-dropdown-item>
              <el-dropdown-item command="b">购物车</el-dropdown-item>
              <el-dropdown-item command="c">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
        url:
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      },
    }
  },
  methods: {
    onSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    onCommand(v) {
      console.log(v)
      if (v === 'a') {
        this.$router.push('/user')
      } else if (v === 'b') {
        this.$router.push('/shop')
      } else if (v === 'c') {
        this.onLogout()
      }
    },
    async onLogout() {
      Cookies.remove('loginUserName')
      Cookies.remove('token_pass')
      const [err, res] = await this.$auth.logout()
      // console.log('退出', err, res)
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
    margin: 10px 15px 0 0;
    display: flex;
    align-items: center;
    color: #606266;
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
  }
  .is-active {
    border: none;
    color: #007fff;
  }
  .el-menu.el-menu--horizontal {
    border: none;
  }
}
</style>
