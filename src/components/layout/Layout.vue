<template>
  <!-- 整个容器 -->
  <el-container>
    <!-- 左边 -->
    <el-aside width="auto">
      <!-- 左边上边的是Logo -->
      <div class="logo"></div>
      <!-- 各类菜单 -->
      <el-menu
        :default-active = "defaultActive"
        unique-opened
        router
        :collapse="isCollapse"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- 每一大项 -->
        <el-submenu v-for="item in menus" :key="item.id" :index="item.id+''">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.authName}}</span>
          </template>
          <el-menu-item v-for="subitem in item.children" :key="subitem.id" :index="'/layout/'+subitem.path">
            <i class="el-icon-menu"></i>{{subitem.authName}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 右边 -->
    <el-container>
      <!-- 右边上边 -->
      <el-header>
        <!-- 菜单图标 -->
        <i
          @click="toggleMenu"
          style="font-size:30px;color:orange;"
          class="iconfont icon-webicon03"
        ></i>
        <!-- 标题 -->
        <div class="stitle">电商后台管理系统</div>
        <!-- 退出的链接 -->
        <a
          href="javascript:;"
          @click="logout"
          class="logoutbtn"
        >退出</a>
      </el-header>
      <!-- 右边下边 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      isCollapse: false, // 是否收起，默认让它展开
      menus:[], // 登录用户拥有的菜单的列表
      defaultActive:'/layout/users' //给defaultActive设置了一个默认值
    }
  },
  created(){
    // console.log(this.$route)
    // 设置让当前的路径对应的菜单高亮
    this.defaultActive = this.$route.path

    this.getMenus()
  },
  methods: {
    // 左边菜单的展开和收起
    toggleMenu() {
      this.isCollapse = !this.isCollapse
    },
    // 退出
    logout() {
      this.$confirm('确定退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 退出的逻辑
          //1、删除localStorage中的信息
          localStorage.removeItem('mytoken')

          //2、跳转到登录页面
          this.$router.push('/login')
        }).catch(() => {
          // 取消了         
        })
    },
    // 获取登录用户的菜单列表
    getMenus(){
      this.$axios.get('menus').then(response=>{
        this.menus = response.data.data
      })
    }
  }
}
</script>

<style scoped>
.logo {
  height: 60px;
  background: url(../../assets/logo.png);
  background-size: cover;
  background-color: #989898;
}
.el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}
.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: left;
  display: block;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  overflow: '';
}
.el-menu{
  border-right: 0px;
}
.el-header {
  background-color: #545c64;
}
.stitle {
  position: absolute;
  font-size: 28px;
  overflow: hidden;
  width: 300px;
  color: #fff;
  left: 600px;
  top: 0px;
}
.logoutbtn {
  position: absolute;
  right: 10px;
  color: orange;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

