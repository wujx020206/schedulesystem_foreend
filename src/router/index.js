import Vue from 'vue'
import VueRouter from "vue-router"; //引入vue-router组件

Vue.use(VueRouter);

export const constantRouterMap = [
    //配置默认的路径，默认显示登录页
    { path: '/', component: () => import('@/views/login/login')},

]

export default new VueRouter({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap //指定路由列表
})

