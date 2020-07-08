<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form ref="myForm" style="margin-top:20px" :model="loginForm" :rules=" loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:65%" placeholder="请输入验证码"></el-input>
          <el-button style="float:right" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
            <el-checkbox v-model="loginForm.check">我已经阅读并且同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button @click="submitLogin" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }],
        code: [{ required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }],
        check: [{
          validator: function (rule, value, callback) {
            if (value) {
              callback()
            } else {
              callback(new Error('请认真阅读并且同意'))
            }
          }
        }]
      }
    }
  },
  methods: {
    submitLogin () {
      // this.$refs.myForm.validate(function (isOk) {
      //   if (isOk) {
      //     console.log('校验成功')
      //   }
      // })
      // 第二种方法 使用promise
      this.$refs.myForm.validate().then(() => {
        this.$axios({
          url: '/authorizations', // 请求地址
          data: this.loginForm,
          // data: { ...this.loginForm, checked: null }, // body请求体参数
          method: 'post'
        }).then(result => {
          // 成功 之后打印结果
          window.localStorage.setItem('user-token', result.data.data.token)
          this.$router.push('/home')
        }).catch(() => {
          this.$message.error('用户名或者密码错误')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-image: url(../../assets/img/11.jpg);
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    height: 340px;
    width: 440px;
    background-color: transparent;
    .title {
      text-align: center;
      .img {
        height: 45px;
      }
    }

  }
}
</style>
