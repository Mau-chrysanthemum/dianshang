(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Layout"],{"0950":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-container",[n("el-aside",{attrs:{width:"auto"}},[n("div",{staticClass:"logo"}),n("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":t.defaultActive,"unique-opened":"",router:"",collapse:t.isCollapse,"background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"}},t._l(t.menus,function(e){return n("el-submenu",{key:e.id,attrs:{index:e.id+""}},[n("template",{slot:"title"},[n("i",{staticClass:"el-icon-location"}),n("span",[t._v(t._s(e.authName))])]),t._l(e.children,function(e){return n("el-menu-item",{key:e.id,attrs:{index:"/layout/"+e.path}},[n("i",{staticClass:"el-icon-menu"}),t._v(t._s(e.authName)+"\n        ")])})],2)}),1)],1),n("el-container",[n("el-header",[n("i",{staticClass:"iconfont icon-webicon03",staticStyle:{"font-size":"30px",color:"orange"},on:{click:t.toggleMenu}}),n("div",{staticClass:"stitle"},[t._v("电商后台管理系统")]),n("a",{staticClass:"logoutbtn",attrs:{href:"javascript:;"},on:{click:t.logout}},[t._v("退出")])]),n("el-main",[n("router-view")],1)],1)],1)},a=[],o=(n("cadf"),n("551c"),n("097d"),{data:function(){return{isCollapse:!1,menus:[],defaultActive:"/layout/users"}},created:function(){this.defaultActive=this.$route.path,this.getMenus()},methods:{toggleMenu:function(){this.isCollapse=!this.isCollapse},logout:function(){var t=this;this.$confirm("确定退出吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){localStorage.removeItem("mytoken"),t.$router.push("/login")}).catch(function(){})},getMenus:function(){var t=this;this.$axios.get("menus").then(function(e){t.menus=e.data.data})}}}),s=o,c=(n("4762"),n("2877")),l=Object(c["a"])(s,i,a,!1,null,"64ba58ce",null);e["default"]=l.exports},4762:function(t,e,n){"use strict";var i=n("5455"),a=n.n(i);a.a},5455:function(t,e,n){}}]);