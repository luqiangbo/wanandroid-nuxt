<template>
  <div class="page-enroll">
    <div class="main">
      <el-card>
        <el-form
          :model="ruleForm"
          :rules="rules"
          status-icon
          ref="ruleForm"
          label-width="100px"
          label-position="top"
          class="demo-ruleForm"
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model.number="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <div class="submit">
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              class="submit-main"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
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
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('名称不能为空'))
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        name: '',
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        age: [{ validator: checkName, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
