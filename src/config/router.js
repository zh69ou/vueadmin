import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import menu from './menu.js'

const router = new Router({
	// mode: 'history',
	routes:menu,
})

router.beforeEach((to, from, next) => {
	// console.log(to)
})


export default router