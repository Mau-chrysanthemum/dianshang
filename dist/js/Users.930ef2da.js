(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Users"],{"18c4":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("my-breadcrumb",{attrs:{level1:"用户管理",level2:"用户列表"},on:{myevent:e.getChidValue}}),a("el-input",{staticClass:"search",attrs:{placeholder:"请输入要搜索的内容"},model:{value:e.query,callback:function(t){e.query=t},expression:"query"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},slot:"append"})],1),a("el-button",{staticStyle:{"margin-left":"5px"},attrs:{type:"success",plain:""},on:{click:function(t){e.dialogVisible4Add=!0}}},[e._v("添加用户")]),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.userList,stripe:"",border:""}},[a("el-table-column",{attrs:{type:"index",width:"50"}}),a("el-table-column",{attrs:{prop:"username",label:"姓名",width:"120"}}),a("el-table-column",{attrs:{prop:"email",label:"邮箱",width:"180"}}),a("el-table-column",{attrs:{prop:"mobile",label:"电话",width:"120"}}),a("el-table-column",{attrs:{prop:"role_name",label:"角色",width:"120"}}),a("el-table-column",{attrs:{label:"用户状态",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-switch",{on:{change:function(a){e.changeState(t.row.mg_state,t.row.id)}},model:{value:t.row.mg_state,callback:function(a){e.$set(t.row,"mg_state",a)},expression:"scope.row.mg_state"}})]}}])}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{icon:"el-icon-edit",type:"primary",size:"mini",plain:""},on:{click:function(a){e.editUser(t.row.id)}}}),a("el-button",{attrs:{size:"mini",icon:"el-icon-delete",type:"danger",plain:""},on:{click:function(a){e.deleteUser(t.row.id)}}}),a("el-button",{attrs:{size:"mini",icon:"el-icon-check",type:"warning",plain:""},on:{click:function(a){e.allotRole(t.row)}}})]}}])})],1),a("el-pagination",{attrs:{"current-page":e.pagenum,"page-sizes":[5,10,20,50],"page-size":e.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),a("el-dialog",{attrs:{title:"新增用户",visible:e.dialogVisible4Add,width:"50%"},on:{"update:visible":function(t){e.dialogVisible4Add=t}}},[a("el-form",{ref:"addUserRef",attrs:{model:e.addUserObj,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户名",prop:"username"}},[a("el-input",{model:{value:e.addUserObj.username,callback:function(t){e.$set(e.addUserObj,"username",t)},expression:"addUserObj.username"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{type:"password"},model:{value:e.addUserObj.password,callback:function(t){e.$set(e.addUserObj,"password",t)},expression:"addUserObj.password"}})],1),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{model:{value:e.addUserObj.email,callback:function(t){e.$set(e.addUserObj,"email",t)},expression:"addUserObj.email"}})],1),a("el-form-item",{attrs:{label:"电话",prop:"mobile"}},[a("el-input",{model:{value:e.addUserObj.mobile,callback:function(t){e.$set(e.addUserObj,"mobile",t)},expression:"addUserObj.mobile"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible4Add=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.addUser}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"修改用户",visible:e.dialogVisible4Edit,width:"50%"},on:{"update:visible":function(t){e.dialogVisible4Edit=t}}},[a("el-form",{ref:"addUserRef",attrs:{model:e.editUserObj,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户名",prop:"username"}},[a("el-input",{staticStyle:{width:"100px"},attrs:{disabled:""},model:{value:e.editUserObj.username,callback:function(t){e.$set(e.editUserObj,"username",t)},expression:"editUserObj.username"}})],1),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{model:{value:e.editUserObj.email,callback:function(t){e.$set(e.editUserObj,"email",t)},expression:"editUserObj.email"}})],1),a("el-form-item",{attrs:{label:"电话",prop:"mobile"}},[a("el-input",{model:{value:e.editUserObj.mobile,callback:function(t){e.$set(e.editUserObj,"mobile",t)},expression:"editUserObj.mobile"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible4Edit=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.editUser2}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"分配角色",visible:e.dialogVisible4Allot,width:"50%"},on:{"update:visible":function(t){e.dialogVisible4Allot=t}}},[a("el-form",{attrs:{"label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户名："}},[a("span",[e._v(e._s(e.username))])]),a("el-form-item",{attrs:{label:"请选择角色："}},[a("el-select",{attrs:{placeholder:"请选择角色列表"},on:{change:e.selectChange},model:{value:e.selectRole,callback:function(t){e.selectRole=t},expression:"selectRole"}},e._l(e.rolesList,function(e){return a("el-option",{key:e.id,attrs:{label:e.roleName,value:e.id}})}),1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible4Allot=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.submitAllotRole}},[e._v("确 定")])],1)],1)],1)},i=[],l=(a("cadf"),a("551c"),a("097d"),a("a351")),o={components:{MyBreadcrumb:l["a"]},data:function(){return{query:"",pagenum:1,pagesize:5,userList:[],total:0,dialogVisible4Add:!1,dialogVisible4Edit:!1,dialogVisible4Allot:!1,addUserObj:{username:"",password:"",email:"",mobile:""},editUserObj:{},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},username:"",rolesList:[],selectRole:"",userId:null,roleId:null}},created:function(){this.getUserListData()},methods:{getUserListData:function(){var e=this;this.$axios.get("users",{params:{pagenum:this.pagenum,pagesize:this.pagesize,query:this.query}}).then(function(t){e.userList=t.data.data.users,e.total=t.data.data.total})},handleSizeChange:function(e){this.pagesize=e,this.getUserListData()},handleCurrentChange:function(e){this.pagenum=e,this.getUserListData()},addUser:function(){var e=this;this.$refs.addUserRef.validate(function(t){t&&e.$axios.post("users",e.addUserObj).then(function(t){201===t.data.meta.status&&(e.dialogVisible4Add=!1,e.$message({type:"success",message:t.data.meta.msg}),e.getUserListData())})})},changeState:function(e,t){var a=this;this.$axios.put("users/".concat(t,"/state/").concat(e)).then(function(e){200===e.data.meta.status&&a.$message({message:e.data.meta.msg,type:"success"})})},editUser:function(e){var t=this;this.$axios.get("users/".concat(e)).then(function(e){t.editUserObj=e.data.data,t.dialogVisible4Edit=!0})},editUser2:function(){var e=this;this.$axios.put("users/".concat(this.editUserObj.id),this.editUserObj).then(function(t){200===t.data.meta.status&&(e.$message({message:t.data.meta.msg,type:"success"}),e.dialogVisible4Edit=!1,e.getUserListData())})},deleteUser:function(e){var t=this;this.$confirm("确定删除该用户吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$axios.delete("users/".concat(e)).then(function(e){200===e.data.meta.status&&(t.$message({message:e.data.meta.msg,type:"success"}),t.pagenum=1,t.getUserListData())})}).catch(function(){})},getChidValue:function(e){console.log("我是父组件..."),console.log(e)},allotRole:function(e){var t=this;this.userId=e.id,this.username=e.username,this.selectRole=e.role_id,this.$axios.get("roles").then(function(e){t.rolesList=e.data.data,t.dialogVisible4Allot=!0})},selectChange:function(e){this.roleId=e},submitAllotRole:function(){var e=this;this.roleId?this.$axios.put("users/".concat(this.userId,"/role"),{rid:this.roleId}).then(function(t){200===t.data.meta.status&&(e.dialogVisible4Allot=!1,e.$message({type:"success",message:t.data.meta.msg}),e.getUserListData())}):this.$message.error("必须要选择一个角色哦")}}},r=o,n=(a("e422"),a("2877")),d=Object(n["a"])(r,s,i,!1,null,"04daf31c",null);t["default"]=d.exports},4467:function(e,t,a){},a351:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/layout"}}},[e._v("首页")]),a("el-breadcrumb-item",[e._v(e._s(e.level1))]),a("el-breadcrumb-item",[e._v(e._s(e.level2))])],1)],1)},i=[],l=(a("cadf"),a("551c"),a("097d"),{props:{level1:String,level2:String},methods:{sendValueToParent:function(){this.$emit("myevent")}}}),o=l,r=(a("a7a6"),a("2877")),n=Object(r["a"])(o,s,i,!1,null,"d11b0d8a",null);t["a"]=n.exports},a7a6:function(e,t,a){"use strict";var s=a("b61b"),i=a.n(s);i.a},b61b:function(e,t,a){},e422:function(e,t,a){"use strict";var s=a("4467"),i=a.n(s);i.a}}]);