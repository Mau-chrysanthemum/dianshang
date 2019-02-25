//导入Vue
import Vue from 'vue'
//导入Vue-Router
import VueRouter from 'vue-router'

//集成VueRouter中间件
Vue.use(VueRouter) //Vue.prototype.$router Vue.prototype.$route

//导入组件
/**
import Login from '../components/account/Login'
import Layout from '../components/layout/Layout'
import Users from '../components/users/Users'
import Welcome from '../components/welcome/Welcome'
import Rigths from '../components/rights/Rights'
import Roles from '../components/roles/Roles'
import Categories from '../components/goods/Categories'
import Params from '../components/goods/Params'
import Goods from '../components/goods/Goods'
import GoodsList from '../components/goods/GoodsList'
import AddGoods from '../components/goods/AddGoods'
import EditGoods from '../components/goods/EditGoods'
import Orders from '../components/orders/Orders'
import Reports from '../components/reports/Reports'
 */

const Login = () => import(/* webpackChunkName: "Login" */ '../components/account/Login')
const Layout = () => import(/* webpackChunkName: "Layout" */ '../components/layout/Layout')
const Users = () => import(/* webpackChunkName: "Users" */ '../components/users/Users')
const Welcome = () => import(/* webpackChunkName: "Welcome" */ '../components/welcome/Welcome')
const Rigths = () => import(/* webpackChunkName: "Rigths" */ '../components/rights/Rights')
const Roles = () => import(/* webpackChunkName: "Roles" */ '../components/roles/Roles')
const Categories = () => import(/* webpackChunkName: "Categories" */ '../components/goods/Categories')
const Params = () => import(/* webpackChunkName: "Params" */ '../components/goods/Params')
const Goods = () => import(/* webpackChunkName: "Goods" */ '../components/goods/Goods')
const GoodsList = () => import(/* webpackChunkName: "GoodsList" */ '../components/goods/GoodsList')
const AddGoods = () => import(/* webpackChunkName: "AddGoods" */ '../components/goods/AddGoods')
const EditGoods = () => import(/* webpackChunkName: "EditGoods" */ '../components/goods/EditGoods')
const Orders = () => import(/* webpackChunkName: "Orders" */ '../components/orders/Orders')
const Reports = () => import('../components/reports/Reports')

import Parent from '../test/Parent'
import Child from '../test/Child'

//创建路由对象，导出去
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/login'},
        // 为了测试父子组件
        {path:'/parent',meta:{unRequiresAuth:true},component:Parent},
        {path:'/child',meta:{unRequiresAuth:true},component:Child},
        {path:'/login',meta:{unRequiresAuth:true},component:Login},
        {path:'/layout',component:Layout,children:[
            {path:'',component:Welcome},
            // 嵌套路由中的path前面不要加/
            {path:'users',component:Users},
            {path:'rights',component:Rigths},
            {path:'roles',component:Roles},
            {path:'categories',component:Categories},
            {path:'params',component:Params},
            {path:'goods',component:Goods,children:[
                {path:'',component:GoodsList},
                {path:'add',name:'AddGoods',component:AddGoods},
                {path:'edit',component:EditGoods}
            ]},
            {path:'orders',component:Orders},
            {path:'reports',component:Reports}
        ]} // name 相当于这条路由规则的小名
    ]
})

//导航守卫
/**
 * to 要去那个路由
 * from 从哪个路由而来
 * next 控制是否能继续
 */
router.beforeEach((to,from,next)=>{
    // 根据路径判断的这种方式其实拓展性不是特别好
    /**
    if (to.fullPath !== '/login') {
         // 判断本地是否有token，如果有则代表登录，如果没有跳转到login页面
        if (localStorage.getItem('mytoken')){
            next()
        } else { // 没有登录，跳转到登录页面【编程式】
            return router.push({path:'/login'})
        }
    }

    next()
    */
    if (to.meta.unRequiresAuth){ // 不需要权限验证
        next()
    } else { // 需要权限验证
         // 判断本地是否有token，如果有则代表登录，如果没有跳转到login页面
         if (localStorage.getItem('mytoken')){
            next()
        } else { // 没有登录，跳转到登录页面【编程式】
            return router.push({path:'/login'})
        }
    }
})

//es6导出
export default router