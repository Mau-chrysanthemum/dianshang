import Vue from 'vue'

/**
 * 参数1：全局过滤器的名字
 * 参数2：过滤器函数
 */
Vue.filter('dateFilter',(input,operator = '-')=>{
    // operator = operator || '-'
    const date = new Date(input)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minus = date.getMinutes()
    const second = date.getSeconds()

    // 过滤器必须要有返回值
    return `${year}${operator}${month}${operator}${day} ${hour}:${minus}:${second}`
})