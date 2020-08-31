<template>
  <div class="page-enroll">
    <div class="main">
      <el-card>
        <el-form
          :model="ruleForm"
          status-icon
          ref="ruleForm"
          label-width="100px"
          label-position="top"
          class="demo-ruleForm"
        >
          <el-form-item label="名称">
            <el-input v-model.trim="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              v-model.trim="ruleForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              type="password"
              v-model.trim="ruleForm.repassword"
            ></el-input>
          </el-form-item>

          <div class="submit">
            <el-button type="primary" @click="submitForm">提交</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  auth: false,
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        repassword: '',
      },
    }
  },
  methods: {
    async fetchRegister() {
      const [err, res] = await this.$api_wanandroid.postRegister(this.ruleForm)
      if (err) {
        return false
      }
      this.$router.push('/login')
    },
    submitForm() {
      const { username, password, repassword } = this.ruleForm
      if (!username) {
        this.$message.error('名称不能为空')
        return
      }
      if (!password) {
        this.$message.error('请输入密码')
        return
      }
      if (!repassword) {
        this.$message.error('请再次输入密码')
        return
      }
      if (password !== repassword) {
        this.$message.error('两次输入密码不一致')
        return
      }
      this.fetchRegister()
    },
  },
}
</script>
<style lang="scss">
.page-enroll {
  display: flex;
  justify-content: center;
  align-items: center;
  .main {
    padding-top: 100px;
    width: 500px;
  }
  .submit {
    display: flex;
    flex-direction: row-reverse;
    .submit-main {
      margin-left: 20px;
    }
  }
}
</style>
