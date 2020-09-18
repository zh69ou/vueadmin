import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './menu.js'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalreplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalreplace.call(this, location).catch(err => err)
}
const router = new VueRouter({
	// mode: 'history',
	routes,
})

router.beforeEach((to, from, next) => {
	next()
})


export default router