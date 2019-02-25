// ES6中导入模块的写法，跟CommonJS不一样
/**
 * const Vue = require('vue')
 */
import Vue from 'vue'
// App.vue称之为根组件
import App from './App.vue'

Vue.config.productionTip = false

//导入ElementUI及样式
// import ELEMENT from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// 全局注册
// Vue.use(ELEMENT) //Vue.propertype.$message = ElementUI的Message组件
import {
  Pagination,
  Dialog,
  Button,
  Select,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Switch,
  Option,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Row,
  Col,
  Upload,
  Steps,
  Step,
  Cascader,
  MessageBox,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Footer
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Cascader)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

// 按需导入

// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 导入路由对象
import router from './router'

// 导入utils/axios.js
import './utils/myAxios'

// 导入全局过滤器
import './filter'

// 集成百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'Sd2ZilSLMnz9yjesdPrrVl63onT8vQ56'
})

/**
 * 使用根实例，去渲染根组件到id=app的地方
 */
new Vue({
  // 渲染根组件，让用户在浏览器中能看到
  render: h => h(App),
  router // 注入到根实例
}).$mount('#app')
