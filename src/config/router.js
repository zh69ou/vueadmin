import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import menu from './menu.js'

const menuroute = [
	{path:'/',name:'index',title:'首页',component:(() => import('~/view/index.vue'))},
	{path:'/error404',name:'404',title:'404',component:(() => import('~/view/error404.vue'))},
	{path:'*',redirect:{name:'404'}}
]

menuroute.push(...menu)

const router = new Router({
	mode: 'history',
	routes:menuroute,
})

export default router