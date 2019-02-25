<template>
    <div>
        <!-- 1.0 面包屑导航 -->
        <MyBreadcrumb level1="商品管理" level2="商品列表"/>
        <!-- 2.0 嵌套路由的占位符 -->
        <router-view></router-view>
    </div>
</template>

<script>
import MyBreadcrumb from '../subcomponents/MyBreadcrumb'
export default {
   components:{
       MyBreadcrumb
   }
}
</script>
