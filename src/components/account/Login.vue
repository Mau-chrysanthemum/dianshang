<template>
  <div>
    <!-- 表单容器 ref就相当于我们之前给元素添加的id -->
    <el-form
      :model="userForm"
      :rules="rules"
      ref="userForm"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">电商后台管理系统登录</h3>
      <!-- 用户名 prop代表校验规则 -->
      <el-form-item prop="username">
        <el-input
          prefix-icon="iconfont icon-login_user"
          v-model="userForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="iconfont icon-login_password"
          v-model="userForm.password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-checkbox
        class="remember"
        checked
      >记住密码</el-checkbox>
      <el-button
        :loading="loading"
        style="width:100%;"
        @click="login"
        type="primary"
      >登 录</el-button>
    </el-form>
  </div>
</template>

<script>
// 导出一个组件的Vue实例
export default {
  data() {
    return {
      loading: false, //是否登录中
      // 将来登录的时候，提交给服务器的
      userForm: {
        username: 'admin',
        password: '123456'
      },
      // 验证表单项使用的
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      // this.$refs.userForm 拿到了整个el-form，然后调用el-form的validate方法
      this.$refs["userForm"].validate(async valid => {
        if (valid) {
          // valid如果代表true代表该填写都填写了
          // 正在登录中...
          this.loading = true

          // 发送post请求
          /**
          this.$axios
            .post('login', this.userForm)
            .then(res => { //如果想要在回调函数中通过this获取到当前的Vue实例，要用箭头函数
              this.loading = false
              if (res.data.meta.status !== 200) {
                // 登录失败
                this.$message.error(res.data.meta.msg)
              } else {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                
                // 存到本地
                localStorage.setItem('mytoken',res.data.data.token)

                // 编程式导航
                this.$router.push({path:'/layout/users'})
                // this.$router.push({name:'layout'})
              }
            })
             */
            const res = await this.$axios.post('login', this.userForm)

            this.loading = false
            if (res.data.meta.status !== 200) {
              // 登录失败
              this.$message.error(res.data.meta.msg)
            } else {
              this.$message({
                message: '登录成功',
                type: 'success'
              })
              
              // 存到本地
              localStorage.setItem('mytoken',res.data.data.token)

              // 编程式导航
              this.$router.push({path:'/layout/users'})
              // this.$router.push({name:'layout'})
            }
        }
      })
    }
  }
}
</script>

<style scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 100px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
}
</style>

