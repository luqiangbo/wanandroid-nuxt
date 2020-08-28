<template>
  <div class="com-header">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#20a0ff"
      :default-active="s_activeIndex2"
      @select="onSelect"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">其他页面</template>
        <el-menu-item index="2-1">页面一</el-menu-item>
        <el-menu-item index="2-2">页面二</el-menu-item>
        <el-menu-item index="2-3">页面三</el-menu-item>
      </el-submenu>
      <span class="header-user">
        <div class="name">123</div>
        <el-dropdown>
          <el-avatar icon="el-icon-user-solid"> </el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      s_activeIndex2: '1',
    }
  },
  methods: {
    onSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    async onLogout() {
      console.log('tuichu')
      const [err, res] = await this.$auth.logout()
      console.log('退出', err, res)
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.com-header {
  .header-user {
    float: right;
    margin: 10px 15px 0 0;
    display: flex;
    align-items: center;
    color: #fff;
    .name {
      margin-right: 15px;
    }
  }
}
</style>
