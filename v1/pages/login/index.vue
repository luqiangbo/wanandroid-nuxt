<template>
  <div class="page-login">
    <div class="main">
      <el-card>
        <el-form ref="ruleForm" :model="s_ruleForm" :rules="s_rules">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="s_ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="s_ruleForm.password"></el-input>
          </el-form-item>
          <div class="submit">
            <el-button type="primary" @click="onLogin">
              登录
            </el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      s_rules: {},
      s_ruleForm: {
        username: 'caniuse',
        password: 'password',
      },
    }
  },
  methods: {
    async onLogin() {
      const res1 = await this.$axiosWan.postPayload(
        'user/login',
        this.s_ruleForm
      )
      console.log('登录', res1)
    },
  },
}
</script>

<style lang="scss" scoped>
.page-login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .main {
    width: 500px;
  }
  .submit {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
