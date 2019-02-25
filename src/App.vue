<template>
  <div id="app">
    <!-- 这个路由，只会匹配两个组件，要么是Login，要么是Layout -->
    <router-view></router-view>
  </div>
</template>

<style>
@import './assets/iconfont/iconfont.css';
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  overflow-y: hidden;
}
#app {
  height: 100%;
}
</style>
