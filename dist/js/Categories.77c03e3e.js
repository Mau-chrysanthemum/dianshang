(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Categories"],{"20fd":function(t,e,a){"use strict";var i=a("d9f6"),n=a("aebd");t.exports=function(t,e,a){e in t?i.f(t,e,n(0,a)):t[e]=a}},"549b":function(t,e,a){"use strict";var i=a("d864"),n=a("63b6"),o=a("241e"),r=a("b0dc"),s=a("3702"),l=a("b447"),d=a("20fd"),c=a("7cd6");n(n.S+n.F*!a("4ee1")(function(t){Array.from(t)}),"Array",{from:function(t){var e,a,n,u,g=o(t),f="function"==typeof this?this:Array,m=arguments.length,p=m>1?arguments[1]:void 0,h=void 0!==p,b=0,y=c(g);if(h&&(p=i(p,m>2?arguments[2]:void 0,2)),void 0==y||f==Array&&s(y))for(e=l(g.length),a=new f(e);e>b;b++)d(a,b,h?p(g[b],b):g[b]);else for(u=y.call(g),a=new f;!(n=u.next()).done;b++)d(a,b,h?r(u,p,[n.value,b],!0):n.value);return a.length=b,a}})},"774e":function(t,e,a){t.exports=a("d2d5")},"942f":function(t,e,a){},"9da7":function(t,e,a){"use strict";var i=a("b9e0"),n=a.n(i);n.a},a351:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/layout"}}},[t._v("首页")]),a("el-breadcrumb-item",[t._v(t._s(t.level1))]),a("el-breadcrumb-item",[t._v(t._s(t.level2))])],1)],1)},n=[],o=(a("cadf"),a("551c"),a("097d"),{props:{level1:String,level2:String},methods:{sendValueToParent:function(){this.$emit("myevent")}}}),r=o,s=(a("a7a6"),a("2877")),l=Object(s["a"])(r,i,n,!1,null,"d11b0d8a",null);e["a"]=l.exports},a7a6:function(t,e,a){"use strict";var i=a("b61b"),n=a.n(i);n.a},ac6a:function(t,e,a){for(var i=a("cadf"),n=a("0d58"),o=a("2aba"),r=a("7726"),s=a("32e9"),l=a("84f2"),d=a("2b4c"),c=d("iterator"),u=d("toStringTag"),g=l.Array,f={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},m=n(f),p=0;p<m.length;p++){var h,b=m[p],y=f[b],_=r[b],v=_&&_.prototype;if(v&&(v[c]||s(v,c,g),v[u]||s(v,u,b),l[b]=g,y))for(h in i)v[h]||o(v,h,i[h],!0)}},b61b:function(t,e,a){},b9e0:function(t,e,a){},d2d5:function(t,e,a){a("1654"),a("549b"),t.exports=a("584a").Array.from},e0ab:function(t,e,a){"use strict";var i=a("942f"),n=a.n(i);n.a},fb9f:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("MyBreadcrumb",{attrs:{level1:"商品管理",level2:"商品分类"}}),a("el-button",{attrs:{type:"success",plain:""},on:{click:t.addCategory}},[t._v("添加分类")]),a("dzh-tree-grid",{attrs:{columns:t.columns,loading:t.loading,dataSource:t.categories},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{plain:"",title:"修改商品分类",type:"primary",size:"small",icon:"el-icon-edit"},on:{click:function(a){t.editCategory(e.row)}}}),a("el-button",{attrs:{plain:"",title:"删除商品分类",type:"danger",size:"small",icon:"el-icon-delete"},on:{click:function(a){t.deleteCategory(e.row.cat_id)}}})]}}])}),a("el-pagination",{attrs:{"current-page":t.pagenum,"page-sizes":[10,20,30],"page-size":t.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}),a("el-dialog",{attrs:{title:"添加分类",visible:t.dialogVisible4Add,width:"50%"},on:{"update:visible":function(e){t.dialogVisible4Add=e}}},[a("el-form",{ref:"addCategoryForm",staticClass:"demo-ruleForm",attrs:{model:t.addCategoryObj,rules:t.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"分类名称：",prop:"cat_name"}},[a("el-input",{model:{value:t.addCategoryObj.cat_name,callback:function(e){t.$set(t.addCategoryObj,"cat_name",e)},expression:"addCategoryObj.cat_name"}})],1),a("el-form-item",{attrs:{label:"父级名称："}},[a("el-cascader",{attrs:{placeholder:"不选就创建第一级",props:t.defaultProps,"change-on-select":"",options:t.options},on:{change:t.categoryChange}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible4Add=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.submitAddCategory}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"修改分类名称",visible:t.dialogVisible4Edit,width:"50%"},on:{"update:visible":function(e){t.dialogVisible4Edit=e}}},[a("el-form",{ref:"editCategoryForm",staticClass:"demo-ruleForm",attrs:{model:t.editCategoryObj,rules:t.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"分类名称：",prop:"cat_name"}},[a("el-input",{model:{value:t.editCategoryObj.cat_name,callback:function(e){t.$set(t.editCategoryObj,"cat_name",e)},expression:"editCategoryObj.cat_name"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogVisible4Edit=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.submitEditCategory}},[t._v("确 定")])],1)],1)],1)},n=[],o=a("a351"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.data,border:"","row-style":t.showRow}},[t._l(t.columns,function(e,i){return a("el-table-column",{key:i,attrs:{width:e.width,label:e.label},scopedSlots:t._u([{key:"default",fn:function(n){return[t._l(n.row._level,function(t){return a("span",{key:t,class:0===i?"ms-tree-space":""})}),t.toggleIconShow(i,n.row)?a("el-button",{attrs:{type:"success",plain:"",size:"mini",round:""},on:{click:function(e){t.toggle(n.$index)}}},[n.row._expanded?t._e():a("i",{staticClass:"el-icon-plus",attrs:{"aria-hidden":"true"}}),n.row._expanded?a("i",{staticClass:"el-icon-minus",attrs:{"aria-hidden":"true"}}):t._e()]):0===i?a("el-button",{attrs:{size:"mini",disabled:"",round:""}},[a("i",{staticClass:"el-icon-minus"})]):t._e(),t._v("\n      "+t._s(n.row[e.prop])+"\n    ")]}}])})}),"normal"===t.treeType?a("el-table-column",{attrs:{label:"操作",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._t("default",null,{row:e.row,column:e.column,$index:e.$index})]}}])}):t._e()],2)},s=[],l=a("774e"),d=a.n(l),c=(a("ac6a"),a("cadf"),a("551c"),a("097d"),{name:"dzh-tree-grid",props:{loading:{type:Boolean,default:!1},treeStructure:{type:Boolean,default:function(){return!0}},columns:{type:Array,default:function(){return[]}},dataSource:{type:Array,default:function(){return[]}},treeType:{type:String,default:function(){return"normal"}},defaultExpandAll:{type:Boolean,default:function(){return!1}}},data:function(){return{}},computed:{data:function(){var t=this;if(t.treeStructure){var e=this.handleData(t.dataSource,null,null,t.defaultExpandAll);return e}return t.dataSource}},methods:{handleData:function(t,e,a,i){var n=this,o=[];return d()(t).forEach(function(t){void 0===t._expanded&&n.$set(t,"_expanded",i),e&&n.$set(t,"_parent",e);var r=0;if(void 0!==a&&null!==a&&(r=a+1),n.$set(t,"_level",r),o.push(t),t.children&&t.children.length>0){var s=n.handleData(t.children,t,r,i);o=o.concat(s)}}),o},showRow:function(t){var e=t.row,a=(t.rowIndex,!e._parent||e._parent._expanded&&e._parent._show);return e._show=a,a?"":"display:none;"},toggle:function(t){var e=this,a=e.data[t];a._expanded=!a._expanded},spaceIconShow:function(t){var e=this;return!(!e.treeStructure||0!==t)},toggleIconShow:function(t,e){var a=this;return!!(a.treeStructure&&0===t&&e.children&&e.children.length>0)},getCateInfoById:function(t){this.$emit("showForm",{cat_id:t.cat_id,cat_name:t.cat_name})},deleteCategory:function(t){var e=this;this.$confirm("确定要删除该分类吗?","提示",{type:"error",confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(a){e.$emit("deleteCate",t.cat_id)}).catch(function(){e.$message({type:"info",message:"已取消删除"})})}}}),u=c,g=(a("9da7"),a("2877")),f=Object(g["a"])(u,r,s,!1,null,"18025511",null),m=f.exports,p={components:{MyBreadcrumb:o["a"],"dzh-tree-grid":m},data:function(){return{categories:[],pagenum:1,pagesize:10,total:0,columns:[{label:"分类名称",prop:"cat_name"},{label:"级别",prop:"cat_level_name",width:500}],loading:!0,dialogVisible4Add:!1,dialogVisible4Edit:!1,addCategoryObj:{cat_pid:0,cat_name:"",cat_level:0},rules:{cat_name:[{required:!0,message:"请输入分类名称",trigger:"blur"}]},options:[],defaultProps:{label:"cat_name",children:"children",value:"cat_id"},editCategoryObj:{cat_id:0,cat_name:""}}},created:function(){this.getCategoriesData()},methods:{getCategoriesData:function(){var t=this;this.loading=!0,this.$axios.get("categories",{params:{type:3,pagenum:this.pagenum,pagesize:this.pagesize}}).then(function(e){t.loading=!1,t.categories=e.data.data.result,t.total=e.data.data.total})},handleSizeChange:function(t){this.pagesize=t,this.getCategoriesData()},handleCurrentChange:function(t){this.pagenum=t,this.getCategoriesData()},addCategory:function(){var t=this;this.$axios.get("categories",{params:{type:2}}).then(function(e){t.options=e.data.data,t.dialogVisible4Add=!0})},categoryChange:function(t){1==t.length?(this.addCategoryObj.cat_pid=t[0],this.addCategoryObj.cat_level=1):2==t.length?(this.addCategoryObj.cat_pid=t[1],this.addCategoryObj.cat_level=2):(this.addCategoryObj.cat_pid=0,this.addCategoryObj.level=0)},submitAddCategory:function(){var t=this;this.$refs.addCategoryForm.validate(function(e){e&&t.$axios.post("categories",t.addCategoryObj).then(function(e){201===e.data.meta.status&&(t.addCategoryObj.cat_name="",t.$message({message:e.data.meta.msg,type:"success"}),t.dialogVisible4Add=!1,t.getCategoriesData())})})},editCategory:function(t){this.editCategoryObj.cat_id=t.cat_id,this.editCategoryObj.cat_name=t.cat_name,this.dialogVisible4Edit=!0},submitEditCategory:function(){var t=this;this.$refs.editCategoryForm.validate(function(e){e&&t.$axios.put("categories/".concat(t.editCategoryObj.cat_id),{cat_name:t.editCategoryObj.cat_name}).then(function(e){200===e.data.meta.status&&(t.$message({message:e.data.meta.msg,type:"success"}),t.dialogVisible4Edit=!1,t.getCategoriesData())})})},deleteCategory:function(t){var e=this;this.$axios.delete("categories/".concat(t)).then(function(t){200===t.data.meta.status&&(e.$message({message:t.data.meta.msg,type:"success"}),e.getCategoriesData())})}}},h=p,b=(a("e0ab"),Object(g["a"])(h,i,n,!1,null,"bc7475f2",null));e["default"]=b.exports}}]);